import { BaseService } from "./base.service";
import { ITripItCredentials } from "../types/ITripItTypes";
import {
  ICreateTripParams,
  IListTripsParams,
  ITrip,
  ITripResponse,
} from "../interfaces";
import { ITripWithObjectsResponse } from "../types/responses";

export class TripService extends BaseService {
  /**
   * Creates a new trip in TripIt
   */
  async createTrip(credentials: ITripItCredentials, params: ICreateTripParams) {
    const endpoint = this.buildEndpoint("trip");
    const data = {
      json: JSON.stringify({
        Trip: {
          display_name: params.displayName,
          start_date: params.startDate,
          end_date: params.endDate,
          primary_location: params.primaryLocation,
        },
      }),
    };

    return this.makeRequest<ITripResponse>("POST", endpoint, credentials, data);
  }

  /**
   * Lists trips based on provided parameters
   */
  async listTrips(credentials: ITripItCredentials, params: IListTripsParams) {
    const endpoint = "/v1/list/trip";
    const queryParams = {
      format: "json",
      page_size: params.pageSize.toString(),
      page_num: params.pageNum.toString(),
      past: params.past.toString(),
      modified_since: params.modifiedSince.toString(),
      include_objects: params.includeObjects.toString(),
      exclude_types: params.excludeTypes,
      traveler: params.traveler,
    };

    return this.makeRequest<{ Trip: Array<{ id: string }> }>(
      "GET",
      endpoint,
      credentials,
      undefined,
      queryParams
    );
  }

  /**
   * Gets a specific trip with all its objects
   */
  async getTripWithObjects(credentials: ITripItCredentials, tripUuid: string) {
    const response = await this.api.getTripWithObjects(credentials, tripUuid);
    const data = response.data as ITripWithObjectsResponse;

    // Remove profile information for privacy/security
    if (data.Profile) {
      delete data.Profile;
    }

    return data;
  }
}
