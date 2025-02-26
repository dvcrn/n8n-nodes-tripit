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
    params?: any,
    contentType: string = "application/x-www-form-urlencoded"
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
          "Content-Type": contentType,
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
        return this.makeApiRequest(
          method,
          endpoint,
          credentials,
          data,
          params,
          contentType
        );
      }
      throw error;
    }
  }

  async getTripWithObjects(
    credentials: ITripItCredentials,
    tripUuid: string
  ): Promise<AxiosResponse> {
    const endpoint = "/v2/get/trip";
    const params = {
      uuid: tripUuid,
      include_objects: "true",
      exclude_types: "weather",
    };
    return this.makeApiRequest("GET", endpoint, credentials, undefined, params);
  }

  async getObject(
    credentials: ITripItCredentials,
    objectType: string,
    objectUuid: string,
    includeObjects: boolean = false,
    excludeTypes: string = "weather"
  ): Promise<AxiosResponse> {
    let endpoint = `/v2/get/${objectType}/uuid/${objectUuid}`;

    // Add path-based parameters if including all objects
    if (includeObjects) {
      endpoint += `/include_objects/true`;
      if (excludeTypes) {
        endpoint += `/exclude_types/${excludeTypes}`;
      }
    }

    return this.makeApiRequest("GET", endpoint, credentials);
  }
  async getActivity(
    credentials: ITripItCredentials,
    objectUuid: string
  ): Promise<AxiosResponse> {
    return this.getObject(credentials, "activity", objectUuid);
  }

  async getFlight(
    credentials: ITripItCredentials,
    objectUuid: string
  ): Promise<AxiosResponse> {
    return this.getObject(credentials, "air", objectUuid);
  }

  async getHotel(
    credentials: ITripItCredentials,
    objectUuid: string
  ): Promise<AxiosResponse> {
    return this.getObject(credentials, "lodging", objectUuid);
  }

  async getTransport(
    credentials: ITripItCredentials,
    objectUuid: string
  ): Promise<AxiosResponse> {
    return this.getObject(credentials, "transport", objectUuid);
  }
}
