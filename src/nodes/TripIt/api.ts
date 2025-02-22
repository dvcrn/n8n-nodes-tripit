import axios, { AxiosResponse } from "axios";
import { ITripItCredentials } from "./types/ITripItTypes";
import { TripItAuth } from "../../util/auth";

export class TripItApi {
  private baseUrl = "https://api.tripit.com";
  private retryCount = 0;
  private maxRetries = 3;

  async makeApiRequest(
    method: string,
    endpoint: string,
    credentials: ITripItCredentials,
    data?: any,
    params?: any
  ): Promise<AxiosResponse> {
    try {
      const auth = new TripItAuth(
        {
          clientId: credentials.clientId,
          clientSecret: credentials.clientSecret,
          username: credentials.username,
          password: credentials.password,
        },
        this.retryCount > 0
      );

      const { access_token } = await auth.getAccessToken();

      return await axios({
        method,
        url: `${this.baseUrl}${endpoint}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        data,
        params: {
          ...params,
          format: "json",
        },
        maxRedirects: 5,
        validateStatus: (status) => status < 400,
      });
    } catch (error) {
      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        console.log(
          `Request failed, retrying with debug mode (attempt ${this.retryCount})`
        );
        // Add exponential backoff
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, this.retryCount) * 1000)
        );
        return this.makeApiRequest(method, endpoint, credentials, data, params);
      }
      throw error;
    }
  }
}
