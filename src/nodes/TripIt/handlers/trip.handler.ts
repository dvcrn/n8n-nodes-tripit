import { IExecuteFunctions, INodeExecutionData } from "n8n-workflow";
import { TripItApi } from "../api";
import { ITripItCredentials, ITripListResponse } from "../types/ITripItTypes";
import { TripItService } from "../service";

export async function handleTripOperation(
  this: IExecuteFunctions,
  tripIt: TripItApi,
  operation: string,
  credentials: ITripItCredentials
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const tripItService = new TripItService(tripIt);

  if (operation === "create") {
    const params = {
      displayName: this.getNodeParameter("displayName", 0) as string,
      startDate: this.getNodeParameter("startDate", 0) as string,
      endDate: this.getNodeParameter("endDate", 0) as string,
      primaryLocation: this.getNodeParameter("primaryLocation", 0) as string,
    };

    const response = await tripItService.createTrip(credentials, params);
    returnData.push({ json: response });
  }

  if (operation === "list") {
    const params = {
      past: this.getNodeParameter("past", 0) as boolean,
      pageSize: this.getNodeParameter("pageSize", 0) as number,
      pageNum: this.getNodeParameter("pageNum", 0) as number,
      modifiedSince: this.getNodeParameter("modifiedSince", 0) as number,
      includeObjects: this.getNodeParameter("includeObjects", 0) as boolean,
      excludeTypes: this.getNodeParameter("excludeTypes", 0) as string,
      traveler: this.getNodeParameter("traveler", 0) as string,
    };

    if (
      params.traveler !== "all" &&
      params.traveler !== "true" &&
      params.traveler !== "false"
    ) {
      throw new Error(
        "Invalid traveler parameter. Must be 'all', 'true', or 'false'"
      );
    }

    const response = (await tripItService.listTrips(
      credentials,
      params
    )) as ITripListResponse;

    // when only one trip is returned, the response is not an array
    if (!Array.isArray(response.Trip)) {
      response.Trip = [response.Trip];
    }

    // Transform the response to include only the relevant trip data
    const trips = response.Trip.map((trip) => ({
      id: trip.id,
      displayName: trip.display_name,
      startDate: trip.start_date,
      endDate: trip.end_date,
      primaryLocation: trip.primary_location,
      imageUrl: trip.image_url,
      isPrivate: trip.is_private === "true",
      location: trip.PrimaryLocationAddress
        ? {
            address: trip.PrimaryLocationAddress.address,
            city: trip.PrimaryLocationAddress.city,
            state: trip.PrimaryLocationAddress.state,
            country: trip.PrimaryLocationAddress.country,
            latitude: trip.PrimaryLocationAddress.latitude,
            longitude: trip.PrimaryLocationAddress.longitude,
          }
        : undefined,
      lastModified: trip.last_modified,
      publicGuid: trip.public_guid,
    }));

    returnData.push({
      json: {
        trips,
        pageInfo: {
          currentPage: response.page_num,
          pageSize: response.page_size,
          maxPage: response.max_page,
          totalTrips: trips.length,
        },
      },
    });
  }

  if (operation === "getWithObjects") {
    const tripUuid = this.getNodeParameter("tripUuid", 0) as string;
    const response = await tripItService.getTripWithObjects(
      credentials,
      tripUuid
    );
    returnData.push({ json: response });
  }

  return returnData;
}
