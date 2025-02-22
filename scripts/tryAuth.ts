import fetch, { RequestInit } from "node-fetch";
import fetchCookie from "fetch-cookie";
import * as crypto from "crypto";
import * as cheerio from "cheerio";

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

// Wrap fetch with a cookie jar so that session cookies persist.
const fetchWithCookie = fetchCookie(fetch);

// --- Helper functions ---
function generateRandomString(length: number): string {
  // generate a hex string (each byte = 2 hex digits)
  return crypto.randomBytes(length).toString("hex");
}

function base64URLEncode(buffer: Buffer): string {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function sha256(buffer: string): Buffer {
  return crypto.createHash("sha256").update(buffer).digest();
}

// --- PKCE and state generation ---
const codeVerifier = generateRandomString(32);
const codeChallenge = base64URLEncode(sha256(codeVerifier));
const state = generateRandomString(16);

// --- OAuth configuration ---
const clientId = "";
const clientSecret = "";
const redirectUri = "com.tripit://completeAuthorize";
const scopes = "offline_access email";

const authorizationEndpoint = "https://www.tripit.com/auth/oauth2/authorize";
const tokenEndpoint = "https://api.tripit.com/oauth2/token";

// Build the authorization URL
const authUrl =
  `${authorizationEndpoint}?` +
  `client_id=${encodeURIComponent(clientId)}` +
  `&response_type=code` +
  `&redirect_uri=${encodeURIComponent(redirectUri)}` +
  `&scope=${encodeURIComponent(scopes)}` +
  `&state=${encodeURIComponent(state)}` +
  `&code_challenge=${encodeURIComponent(codeChallenge)}` +
  `&code_challenge_method=S256` +
  `&response_mode=query` +
  `&action=sign_in`;

// Function to extract any error messages from the form
function extractErrorMessages($: cheerio.CheerioAPI): string[] {
  const errors: string[] = [];
  $(".error-message, .alert-error, .field-error").each((_, el) => {
    const text = $(el).text().trim();
    if (text) errors.push(text);
  });
  return errors;
}

// Function to determine if form is for login or signup
function isLoginForm($: cheerio.CheerioAPI): boolean {
  const buttonText = $('button[type="submit"]').text().trim().toLowerCase();
  return !buttonText.includes("create");
}

console.log("Open the following URL to begin the OAuth flow:");
console.log(authUrl);
console.log(
  "Since this is a CLI flow, the script will now simulate the login process."
);

// Prompt for credentials
const username = process.env.TRIPIT_USERNAME || "";
const password = process.env.TRIPIT_PASSWORD || "";

// --- Step 1: Get the login form ---
async function getLoginForm(): Promise<{ html: string; formAction: string }> {
  // Initial GET to the authorization URL
  const res = await fetchWithCookie(authUrl, { redirect: "manual" });
  // If the server returns a redirect (302) to the login form:
  if (res.status === 302) {
    const location = res.headers.get("location");
    if (!location) throw new Error("No Location header on redirect");
    // Follow the redirect manually
    const loginRes = await fetchWithCookie(location, { redirect: "manual" });
    const html = await loginRes.text();
    return { html, formAction: loginRes.url };
  }
  // Otherwise assume the response contains the login form HTML
  const html = await res.text();
  return { html, formAction: res.url };
}

// --- Step 2: Submit the login form ---
async function submitLoginForm(
  formHtml: string,
  formAction: string
): Promise<string> {
  const $ = cheerio.load(formHtml);
  // Gather all hidden input fields (these often carry state, CSRF tokens, etc.)
  const formData: { [key: string]: string } = {};
  $('form input[type="hidden"]').each((_, el) => {
    const name = $(el).attr("name");
    const value = $(el).attr("value") || "";
    if (name) formData[name] = value;
  });
  // Get the form action URL from the form element
  const formActionUrl = $("form").attr("action");
  if (!formActionUrl) {
    throw new Error("Could not find form action URL");
  }

  // Update formAction to use the form's action URL
  formAction = new URL(formActionUrl, formAction).href;

  // Get all form fields including hidden ones
  const submitData: { [key: string]: string } = {};
  $("form input").each((_, el) => {
    const name = $(el).attr("name");
    const value = $(el).attr("value") || "";
    if (name) submitData[name] = value;
  });

  // Add our credentials
  submitData.username = username;
  submitData.password = password;

  // For debugging, show what we're submitting
  console.log("Form data being submitted:", {
    ...submitData,
    password: "***hidden***",
  });

  // Prepare URL-encoded form body
  const body = new URLSearchParams(submitData).toString();

  // Submit the form via POST
  const res = await fetchWithCookie(formAction, {
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
    body,
    redirect: "manual",
  });

  // Log the response details for debugging
  console.log("Form submission response status:", res.status);
  const responseText = await res.text();
  console.log("Response headers:", res.headers.raw());

  if (res.status === 403) {
    console.log("Response body:", responseText);
    throw new Error(
      `Form submission failed with 403 Forbidden. Response: ${responseText}`
    );
  }

  // For 500 or error responses, try to parse the JSON error
  if (!res.ok) {
    try {
      const errorJson = JSON.parse(responseText);
      console.log("Error response:", errorJson);
      if (errorJson.errors) {
        throw new Error(
          `Server error: ${errorJson.errors.code} - ${errorJson.errors.message}`
        );
      }
    } catch (e) {
      // If it's not JSON, continue with normal error handling
    }
  }

  // For 200 responses, check if we got a success page or error page
  if (res.status === 200) {
    const $ = cheerio.load(responseText);

    // Check for any error messages
    const errors = extractErrorMessages($);
    if (errors.length > 0) {
      console.log("Form errors:", errors);
      throw new Error(`Login failed: ${errors.join(", ")}`);
    }

    // Look for error messages
    const errorMessage = $(".error-message").text() || $(".alert-error").text();
    if (errorMessage) {
      throw new Error(`Login failed: ${errorMessage}`);
    }

    // If no error, look for success indicators or automatic redirects
    const meta = $('meta[http-equiv="refresh"]').attr("content");
    if (meta) {
      const match = meta.match(/URL=(.+)$/);
      if (match) return match[1];
    }

    // Look for redirect URLs in the page
    const redirectScript = $("script")
      .text()
      .match(/window\.location\.href\s*=\s*["']([^"']+)["']/);
    if (redirectScript) {
      return redirectScript[1];
    }

    console.log("Response body:", responseText);
    throw new Error("Could not find redirect URL in response");
  }

  if (res.status === 302 || res.status === 303) {
    const redirectLocation = res.headers.get("location");
    if (!redirectLocation) throw new Error("No redirect location after login");
    return redirectLocation;
  }

  console.log("Response body:", responseText);
  throw new Error(`Unexpected response status after login: ${res.status}`);
}

async function refreshAccessToken(
  refreshToken: string
): Promise<TokenResponse> {
  const refreshParams = new URLSearchParams();
  refreshParams.append("grant_type", "refresh_token");
  refreshParams.append("refresh_token", refreshToken);
  refreshParams.append("client_id", clientId);
  refreshParams.append("client_secret", clientSecret);

  const res = await fetch(tokenEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: refreshParams.toString(),
  });

  if (!res.ok) {
    throw new Error(`Token refresh failed: ${res.status} ${await res.text()}`);
  }

  return res.json() as unknown as TokenResponse;
}

// --- Step 3: Exchange authorization code for token ---
async function exchangeCodeForToken(code: string): Promise<any> {
  const tokenParams = new URLSearchParams();
  tokenParams.append("grant_type", "authorization_code");
  tokenParams.append("code", code);
  tokenParams.append("redirect_uri", redirectUri);
  tokenParams.append("client_id", clientId);
  // tokenParams.append("client_secret", clientSecret);
  tokenParams.append("code_verifier", codeVerifier);

  const res = await fetch(tokenEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: tokenParams.toString(),
  });
  if (!res.ok) {
    throw new Error(`Token request failed: ${res.status} ${await res.text()}`);
  }

  const tokenResponse: TokenResponse =
    (await res.json()) as unknown as TokenResponse;

  console.log("token response -- ");
  console.log(tokenResponse);

  return tokenResponse;
}

// --- Main flow ---
(async () => {
  try {
    // Get the login form HTML
    const { html, formAction } = await getLoginForm();
    // Submit the form with credentials
    const redirectUrl = await submitLoginForm(html, formAction);
    console.log("Redirect URL after login:", redirectUrl);

    // Since the redirect URL uses the custom scheme, parse it using a dummy base
    const parsedUrl = new URL(redirectUrl, "http://localhost");
    const returnedState = parsedUrl.searchParams.get("state");
    if (returnedState !== state) {
      throw new Error("State mismatch");
    }
    const code = parsedUrl.searchParams.get("code");
    if (!code) {
      throw new Error("Authorization code not found");
    }
    console.log("Authorization code:", code);

    // Exchange the authorization code for tokens
    const tokenResponse = await exchangeCodeForToken(code);
    console.log("Token response:");
    console.log(JSON.stringify(tokenResponse, null, 2));
  } catch (error) {
    console.error("Error during OAuth flow:", error);
  }
})();
