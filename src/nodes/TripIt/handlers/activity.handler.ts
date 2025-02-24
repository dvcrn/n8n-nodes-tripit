import { IExecuteFunctions, INodeExecutionData } from "n8n-workflow";
import { TripItApi } from "../api";
import { ITripItCredentials } from "../types/ITripItTypes";
import { TripItService } from "../service";

export async function handleActivityOperation(
  this: IExecuteFunctions,
  tripIt: TripItApi,
  operation: string,
  credentials: ITripItCredentials
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const tripItService = new TripItService(tripIt);

  if (operation === "addToTrip") {
    const params = {
      tripId: this.getNodeParameter("tripId", 0) as string,
      displayName: this.getNodeParameter("displayName", 0) as string,
      startDate: this.getNodeParameter("startDate", 0) as string,
      startTime: this.getNodeParameter("startTime", 0) as string,
      timezone: this.getNodeParameter("timezone", 0) as string,
      endDate: this.getNodeParameter("endDate", 0) as string,
      endTime: this.getNodeParameter("endTime", 0) as string,
      locationName: this.getNodeParameter("locationName", 0) as string,
      address: this.getNodeParameter("address", 0) as string,
    };

    const response = await tripItService.createActivity(credentials, params);
    returnData.push({ json: response });
  }

  return returnData;
}
