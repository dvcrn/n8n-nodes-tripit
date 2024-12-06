import { IExecuteFunctions, INodeExecutionData } from "n8n-workflow";
import { TripItApi } from "../api";
import { ITripItCredentials } from "../types/ITripItTypes";
import orderObjectByKeys from "../../../util/orderObjectByKeys";
import {
  ACTIVITY_FIELD_ORDER,
  IActivityObject,
  ICreateActivityRequest,
} from "../../../interfaces/TripItInterfaces";
import normalizeTime from "../../../util/normalizeTime";

export async function handleActivityOperation(
  this: IExecuteFunctions,
  tripIt: TripItApi,
  operation: string,
  credentials: ITripItCredentials
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];

  if (operation === "addToTrip") {
    const tripId = this.getNodeParameter("tripId", 0) as string;
    const displayName = this.getNodeParameter("displayName", 0) as string;
    const startDate = this.getNodeParameter("startDate", 0) as string;
    const startTime = this.getNodeParameter("startTime", 0) as string;
    const timezone = this.getNodeParameter("timezone", 0) as string;
    const endDate = this.getNodeParameter("endDate", 0) as string;
    const endTime = this.getNodeParameter("endTime", 0) as string;
    const locationName = this.getNodeParameter("locationName", 0) as string;
    const address = this.getNodeParameter("address", 0) as string;

    const activityObj: IActivityObject = {
      trip_id: tripId,
      display_name: displayName,
      StartDateTime: {
        date: startDate,
        time: normalizeTime(startTime),
        timezone: timezone,
      },
      EndDateTime: {
        date: endDate,
        time: normalizeTime(endTime),
        timezone: timezone,
      },
      Address: {
        address: address,
      },
      location_name: locationName,
    };

    const endpoint = "/v1/create/activity/format/json";
    const data = new URLSearchParams({
      json: JSON.stringify({
        ActivityObject: orderObjectByKeys(activityObj, ACTIVITY_FIELD_ORDER),
      }),
    });

    const response = await tripIt.makeApiRequest(
      "POST",
      endpoint,
      credentials,
      data.toString()
    );
    returnData.push({ json: response.data });
  }

  return returnData;
}
