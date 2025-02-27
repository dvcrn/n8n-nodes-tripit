import { TripItApi } from "../api";
import { ITripItCredentials } from "../types/ITripItTypes";

export abstract class BaseService {
  constructor(protected api: TripItApi) {}

  protected async makeRequest<T>(
    method: "GET" | "POST",
    endpoint: string,
    credentials: ITripItCredentials,
    data?: any,
    queryParams?: Record<string, string | number | boolean>
  ): Promise<T> {
    const response = await this.api.makeApiRequest(
      method,
      endpoint,
      credentials,
      data,
      queryParams
    );
    return response.data as T;
  }

  protected normalizeId(tripId: string): { key: string; value: string } {
    if (tripId.includes("-")) {
      return { key: "trip_uuid", value: tripId };
    }
    return { key: "trip_id", value: tripId };
  }

  protected buildEndpoint(
    objectType: string,
    uuid?: string,
    format: string = "json"
  ): string {
    if (uuid) {
      return `/v2/replace/${objectType}/uuid/${uuid}/format/${format}`;
    }
    return `/v1/create/${objectType}/format/${format}`;
  }
}
