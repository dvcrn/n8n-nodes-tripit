import { IExecuteFunctions, INodeExecutionData } from "n8n-workflow";
import { TripItApi } from "../api";
import { ITripItCredentials, ITripListResponse } from "../types/ITripItTypes";

export async function handleTripOperation(
  this: IExecuteFunctions,
  tripIt: TripItApi,
  operation: string,
  credentials: ITripItCredentials
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];

  if (operation === "create") {
    const displayName = this.getNodeParameter("displayName", 0) as string;
    const startDate = this.getNodeParameter("startDate", 0) as string;
    const endDate = this.getNodeParameter("endDate", 0) as string;
    const primaryLocation = this.getNodeParameter(
      "primaryLocation",
      0
    ) as string;

    const endpoint = "/v1/create/trip/format/json";
    const data = {
      json: JSON.stringify({
        Trip: {
          display_name: displayName,
          start_date: startDate,
          end_date: endDate,
          primary_location: primaryLocation,
        },
      }),
    };

    const response = await tripIt.makeApiRequest(
      "POST",
      endpoint,
      credentials,
      data
    );
    returnData.push({ json: response.data });
  }

  if (operation === "list") {
    const past = this.getNodeParameter("past", 0) as boolean;
    const pageSize = this.getNodeParameter("pageSize", 0) as number;
    const pageNum = this.getNodeParameter("pageNum", 0) as number;
    const modifiedSince = this.getNodeParameter("modifiedSince", 0) as number;
    const includeObjects = this.getNodeParameter(
      "includeObjects",
      0
    ) as boolean;
    const excludeTypes = this.getNodeParameter("excludeTypes", 0) as string;
    const traveler = this.getNodeParameter("traveler", 0) as string;

    const endpoint = "/v1/list/trip";
    const params = {
      format: "json",
      page_size: pageSize,
      page_num: pageNum,
      past: past.toString(),
      modified_since: modifiedSince,
      include_objects: includeObjects.toString(),
      exclude_types: excludeTypes,
      traveler,
    };

    const response = await tripIt.makeApiRequest(
      "GET",
      endpoint,
      credentials,
      undefined,
      params
    );

    const tripListResponse = response.data as ITripListResponse;

    // Transform the response to include only the relevant trip data
    const trips = tripListResponse.Trip.map((trip) => ({
      id: trip.id,
      displayName: trip.display_name,
      startDate: trip.start_date,
      endDate: trip.end_date,
      primaryLocation: trip.primary_location,
      imageUrl: trip.image_url,
      isPrivate: trip.is_private === "true",
      location: {
        address: trip.PrimaryLocationAddress.address,
        city: trip.PrimaryLocationAddress.city,
        state: trip.PrimaryLocationAddress.state,
        country: trip.PrimaryLocationAddress.country,
        latitude: trip.PrimaryLocationAddress.latitude,
        longitude: trip.PrimaryLocationAddress.longitude,
      },
      lastModified: trip.last_modified,
      publicGuid: trip.public_guid,
    }));

    returnData.push({
      json: {
        trips,
        pageInfo: {
          currentPage: tripListResponse.page_num,
          pageSize: tripListResponse.page_size,
          maxPage: tripListResponse.max_page,
          totalTrips: trips.length,
        },
      },
    });
  }

  return returnData;
}
