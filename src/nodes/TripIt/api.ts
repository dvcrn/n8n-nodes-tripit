import axios, { AxiosResponse } from "axios";
import { ITripItCredentials } from "./types/ITripItTypes";

export class TripItApi {
  private baseUrl = "https://api.tripit.com";

  async refreshAccessToken(credentials: ITripItCredentials): Promise<string> {
    const tokenEndpoint = "/oauth2/token";
    const data = {
      grant_type: "refresh_token",
      client_id: credentials.clientId,
      client_secret: credentials.clientSecret,
      refresh_token: credentials.refreshToken,
    };

    try {
      const response = await axios.post(
        `${this.baseUrl}${tokenEndpoint}`,
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.data && response.data.access_token) {
        return response.data.access_token;
      }
      throw new Error("Failed to refresh access token: No token in response");
    } catch (error) {
      throw new Error(
        `Failed to refresh access token: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async makeApiRequest(
    method: string,
    endpoint: string,
    credentials: ITripItCredentials,
    data?: any,
    params?: any
  ): Promise<AxiosResponse> {
    console.log("making api request");
    const newAccessToken = await this.refreshAccessToken(credentials);
    const headers = {
      Authorization: `Bearer ${newAccessToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    };

    console.debug("endpoint", endpoint);
    console.debug("method", method);
    console.debug("headers", headers);
    console.debug("data", data);
    console.debug("params", params);

    try {
      const response = await axios({
        method,
        url: `${this.baseUrl}${endpoint}`,
        headers,
        data,
        params,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}
