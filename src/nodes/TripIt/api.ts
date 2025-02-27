import axios, { AxiosResponse } from "axios";
import { ITripItCredentials } from "./types/ITripItTypes";
import {
  IActivityResponse,
  IFlightResponse,
  IHotelResponse,
  ITransportResponse,
  ITripWithObjectsResponse,
} from "./types/responses";
import { TripItAuth } from "../../util/auth";

export class TripItApi {
  private BASE_URL = "https://api.tripit.com";

  async makeApiRequest<T>(
    method: "GET" | "POST",
    endpoint: string,
    credentials: ITripItCredentials,
    data?: string | Record<string, any>,
    queryParams?: Record<string, string | number | boolean>
  ): Promise<AxiosResponse<T>> {
    console.log("requesting", endpoint);

    const auth = new TripItAuth(credentials);
    const tokenResponse = await auth.getAccessToken();

    const url = this.BASE_URL + endpoint;
    const headers = {
      Authorization: `Bearer ${tokenResponse.access_token}`,
      "Content-Type": data
        ? "application/x-www-form-urlencoded"
        : "application/json",
    };

    try {
      return await axios({
        method,
        url,
        headers,
        data,
        params: queryParams,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          `TripIt API Error: ${error.response.status} - ${
            error.response.statusText
          }
           Details: ${JSON.stringify(error.response.data)}`
        );
      }
      throw error;
    }
  }

  async getTripWithObjects(
    credentials: ITripItCredentials,
    tripId: string
  ): Promise<AxiosResponse<ITripWithObjectsResponse>> {
    return this.makeApiRequest(
      "GET",
      `/v1/get/trip/id/${tripId}/include_objects/true/format/json`,
      credentials
    );
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
    uuid: string
  ): Promise<AxiosResponse<IActivityResponse>> {
    return this.getObject(credentials, "activity", uuid) as Promise<
      AxiosResponse<IActivityResponse>
    >;
  }

  async getFlight(
    credentials: ITripItCredentials,
    uuid: string
  ): Promise<AxiosResponse<IFlightResponse>> {
    return this.getObject(credentials, "air", uuid) as Promise<
      AxiosResponse<IFlightResponse>
    >;
  }

  async getHotel(
    credentials: ITripItCredentials,
    uuid: string
  ): Promise<AxiosResponse<IHotelResponse>> {
    return this.getObject(credentials, "lodging", uuid) as Promise<
      AxiosResponse<IHotelResponse>
    >;
  }

  async getTransport(
    credentials: ITripItCredentials,
    uuid: string
  ): Promise<AxiosResponse<ITransportResponse>> {
    return this.getObject(credentials, "transport", uuid) as Promise<
      AxiosResponse<ITransportResponse>
    >;
  }
}
