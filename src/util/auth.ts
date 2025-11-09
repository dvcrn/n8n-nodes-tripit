import fetch, { RequestInit, Response, Headers } from "node-fetch";
import fetchCookie from "fetch-cookie";
import { CookieJar as NodeFetchCookieJar } from "tough-cookie";
import * as crypto from "crypto";
import * as cheerio from "cheerio";

// TripIt mobile app client ID (public, extracted from iOS/Android app)
const TRIPIT_CLIENT_ID = "e400234a-f684-11e7-9d05-9cb654932688";

interface TokenResponse {
  access_token: string;
  refresh_token?: string; // Optional since we don't always get it
  token_type: string;
  expires_in: number;
  scope: string;
}

interface TokenCache {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
}

interface LoginFormResponse {
  html: string;
  formAction: string;
  codeVerifier: string;
  state: string;
}

interface TripItAuthConfig {
  username: string;
  password: string;
}

export class TripItAuth {
  private baseUrl = "https://www.tripit.com";
  private apiBaseUrl = "https://api.tripit.com";
  private fetchWithCookie: (
    url: string,
    init?: RequestInit
  ) => Promise<Response>;
  private debug = false;

  constructor(private config: TripItAuthConfig, debug = false) {
    this.debug = debug;
    this.fetchWithCookie = fetchCookie(fetch as any, new NodeFetchCookieJar());
  }
  private redirectUri = "com.tripit://completeAuthorize";
  private scopes = "openid offline_access email";
  private static tokenCache: Map<string, TokenCache> = new Map();

  private log(...args: any[]) {
    if (this.debug) {
      console.log("[TripItAuth]", ...args);
    }
  }

  private generateRandomString(length: number): string {
    return crypto.randomBytes(length).toString("hex");
  }

  private base64URLEncode(buffer: Buffer): string {
    return buffer
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  private sha256(buffer: string): Buffer {
    return crypto.createHash("sha256").update(buffer).digest();
  }

  private extractErrorMessages($: cheerio.CheerioAPI): string[] {
    const errors: string[] = [];
    $(".error-message, .alert-error, .field-error").each((_, el) => {
      const text = $(el).text().trim();
      if (text) errors.push(text);
    });
    return errors;
  }

  private async getInitialSession(): Promise<void> {
    // First hit the main TripIt page to get initial cookies
    const homeRes = await this.fetchWithCookie(`${this.baseUrl}/home`, {
      headers: {
        Accept: "text/html,*/*",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      },
    });
    this.log("Initial session status:", homeRes.status);
  }

  private async getLoginForm(): Promise<LoginFormResponse> {
    await this.getInitialSession();

    const codeVerifier = this.generateRandomString(32);
    const codeChallenge = this.base64URLEncode(this.sha256(codeVerifier));
    const state = this.generateRandomString(16);

    const authUrl =
      `${this.baseUrl}/auth/oauth2/authorize?` +
      `client_id=${encodeURIComponent(TRIPIT_CLIENT_ID)}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(this.redirectUri)}` +
      `&scope=${encodeURIComponent(this.scopes)}` +
      `&state=${encodeURIComponent(state)}` +
      `&code_challenge=${encodeURIComponent(codeChallenge)}` +
      `&code_challenge_method=S256` +
      `&response_mode=query` +
      `&prompt=consent` +
      `&action=sign_in`;

    this.log("Auth URL:", authUrl);

    // Follow redirects manually to capture all cookies
    let currentUrl = authUrl;
    let finalHtml = "";
    let attempts = 0;
    const maxAttempts = 5;

    while (attempts < maxAttempts) {
      attempts++;
      this.log(`Request ${attempts} to: ${currentUrl}`);

      const res = await this.fetchWithCookie(currentUrl, {
        headers: {
          Accept: "text/html,*/*",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        },
        redirect: "manual",
      });

      const html = await res.text();
      this.log(`Response ${attempts} status:`, res.status);

      if (res.status === 302 || res.status === 303) {
        const location = res.headers.get("location");
        if (!location) throw new Error("Redirect without location header");
        currentUrl = new URL(location, currentUrl).href;
        continue;
      }

      finalHtml = html;
      currentUrl = res.url;
      break;
    }

    if (attempts >= maxAttempts) {
      throw new Error("Too many redirects while getting login form");
    }

    // Verify we have a login form
    const $ = cheerio.load(finalHtml);
    const hasLoginForm =
      $('form input[name="username"]').length > 0 &&
      $('form input[name="password"]').length > 0;

    if (!hasLoginForm) {
      this.log("No login form found in HTML:", finalHtml);
      throw new Error("Could not find login form elements");
    }

    return { html: finalHtml, formAction: currentUrl, codeVerifier, state };
  }

  private async submitLoginForm(
    formHtml: string,
    formAction: string
  ): Promise<string> {
    const $ = cheerio.load(formHtml);
    const submitData: { [key: string]: string } = {};

    // Only get inputs within the main login form
    $("form input").each((_, el) => {
      const name = $(el).attr("name");
      const value = $(el).attr("value") || "";
      if (name) {
        submitData[name] = value;
        this.log(
          "Form field:",
          name,
          value.includes("password") ? "***" : value
        );
      }
    });

    submitData.username = this.config.username;
    submitData.password = this.config.password;

    // Look for the form's actual action URL
    let formActionUrl = $("form").attr("action");
    if (!formActionUrl) {
      throw new Error("Could not find form action URL");
    }

    // Ensure we have an absolute URL
    const finalFormAction = new URL(formActionUrl, formAction).href;
    this.log("Form action URL:", finalFormAction);

    const res = await this.fetchWithCookie(finalFormAction, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko)",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Upgrade-Insecure-Requests": "1",
        Origin: "https://www.tripit.com",
        Referer: formAction,
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-User": "?1",
      },
      body: new URLSearchParams(submitData).toString(),
      redirect: "manual",
    });

    this.log("Response status:", res.status);
    this.log("Response headers:", JSON.stringify(res.headers.raw(), null, 2));

    const responseText = await res.text();

    // For 500 or error responses, try to parse JSON error
    if (!res.ok && res.status !== 302 && res.status !== 303) {
      try {
        const errorJson = JSON.parse(responseText);
        if (errorJson.errors) {
          throw new Error(
            `Server error: ${errorJson.errors.code} - ${errorJson.errors.message}`
          );
        }
      } catch (e) {
        // If not JSON, continue with normal error handling
      }
    }

    if (res.status === 403) {
      this.log("Response body:", responseText);
      const $error = cheerio.load(responseText);
      const errors = this.extractErrorMessages($error);

      if (errors.length > 0) {
        throw new Error(`Login failed (403): ${errors.join(", ")}`);
      }

      // Look for any error indicators in the response
      if (responseText.includes("CSRF")) {
        throw new Error("CSRF token validation failed");
      }
      if (responseText.includes("rate limit")) {
        throw new Error("Rate limit exceeded");
      }

      throw new Error(
        `Login failed (403): ${responseText.substring(0, 200)}...`
      );
    }

    // For 200 responses, check if we got success page or error page
    if (res.status === 200) {
      const $response = cheerio.load(responseText);

      // Check for any error messages first
      const errors = this.extractErrorMessages($response);
      if (errors.length > 0) {
        this.log("Form errors:", errors);
        throw new Error(`Login validation failed: ${errors.join(", ")}`);
      }

      // Look for explicit error message classes
      const errorMessage =
        $response(".error-message").text() || $response(".alert-error").text();
      if (errorMessage) {
        throw new Error(`Login failed: ${errorMessage}`);
      }

      // Check for redirect in meta refresh
      const meta = $response('meta[http-equiv="refresh"]').attr("content");
      if (meta) {
        const match = meta.match(/URL=(.+)$/);
        if (match) return match[1];
      }

      // Check for redirect in JavaScript
      const scripts = $response("script").text();
      const redirectMatch = scripts.match(
        /(?:window\.location|window\.location\.href)\s*=\s*["']([^"']+)["']/
      );
      if (redirectMatch) {
        return redirectMatch[1];
      }

      this.log("Response body:", responseText);
      throw new Error("Could not find redirect URL in response");
    }

    if (res.status === 302 || res.status === 303) {
      const location = res.headers.get("location");
      if (!location) throw new Error("No redirect location after login");
      return location;
    }

    this.log("Response body:", responseText);
    throw new Error(`Unexpected response status: ${res.status}`);
  }

  private async exchangeCodeForToken(
    code: string,
    codeVerifier: string
  ): Promise<TokenResponse> {
    const tokenParams = new URLSearchParams();
    tokenParams.append("grant_type", "authorization_code");
    tokenParams.append("code", code);
    tokenParams.append("redirect_uri", this.redirectUri);
    tokenParams.append("client_id", TRIPIT_CLIENT_ID);
    tokenParams.append("code_verifier", codeVerifier);

    this.log("Exchanging authorization code for tokens...");
    const res = await fetch(`${this.apiBaseUrl}/oauth2/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: tokenParams.toString(),
    });

    if (!res.ok) {
      throw new Error(
        `Token request failed: ${res.status} ${await res.text()}`
      );
    }

    const tokenResponse = (await res.json()) as TokenResponse;
    this.log("Token response:", JSON.stringify(tokenResponse, null, 2));
    return tokenResponse;
  }

  private getCacheKey(): string {
    return `${TRIPIT_CLIENT_ID}:${this.config.username}`;
  }

  private getCachedToken(): TokenCache | undefined {
    const cached = TripItAuth.tokenCache.get(this.getCacheKey());
    if (cached && Date.now() < cached.expiresAt) {
      return cached;
    }
    return undefined;
  }

  private cacheToken(tokenResponse: TokenResponse): void {
    const expiresAt = Date.now() + tokenResponse.expires_in * 1000;
    TripItAuth.tokenCache.set(this.getCacheKey(), {
      accessToken: tokenResponse.access_token,
      refreshToken: tokenResponse.refresh_token,
      expiresAt,
    });
  }

  private async refreshAccessToken(refreshToken: string): Promise<TokenResponse> {
    this.log("Attempting to refresh access token...");

    const refreshParams = new URLSearchParams();
    refreshParams.append("grant_type", "refresh_token");
    refreshParams.append("refresh_token", refreshToken);
    refreshParams.append("client_id", TRIPIT_CLIENT_ID);
    // NO client_secret needed for PKCE

    const res = await fetch(`${this.apiBaseUrl}/oauth2/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: refreshParams.toString(),
    });

    if (!res.ok) {
      const errorText = await res.text();
      this.log("Token refresh failed:", res.status, errorText);
      throw new Error(`Token refresh failed: ${res.status} ${errorText}`);
    }

    const tokenResponse = (await res.json()) as TokenResponse;
    this.log("Token refreshed successfully");
    return tokenResponse;
  }

  async getAccessToken(): Promise<TokenResponse> {
    // Check if we have a valid cached token
    const cached = this.getCachedToken();
    if (cached) {
      return {
        access_token: cached.accessToken,
        token_type: "Bearer",
        expires_in: Math.floor((cached.expiresAt - Date.now()) / 1000),
        scope: this.scopes,
        refresh_token: cached.refreshToken,
      };
    }

    // Check if we have an expired token with a refresh token
    const expiredCache = TripItAuth.tokenCache.get(this.getCacheKey());
    if (expiredCache?.refreshToken) {
      try {
        this.log("Access token expired, attempting refresh...");
        const tokenResponse = await this.refreshAccessToken(expiredCache.refreshToken);
        this.cacheToken(tokenResponse);
        return tokenResponse;
      } catch (error) {
        this.log("Token refresh failed, falling back to full authentication:", error);
        // Continue to full authentication flow below
      }
    }

    // Full authentication flow (no cached token or refresh failed)
    this.log("Performing full authentication flow...");
    const { html, formAction, codeVerifier, state } = await this.getLoginForm();
    const redirectUrl = await this.submitLoginForm(html, formAction);

    const parsedUrl = new URL(redirectUrl, "http://localhost");
    const returnedState = parsedUrl.searchParams.get("state");
    if (returnedState !== state) {
      throw new Error("State mismatch");
    }

    const code = parsedUrl.searchParams.get("code");
    if (!code) {
      throw new Error("Authorization code not found");
    }

    const tokenResponse = await this.exchangeCodeForToken(code, codeVerifier);
    this.cacheToken(tokenResponse);
    return tokenResponse;
  }
}
