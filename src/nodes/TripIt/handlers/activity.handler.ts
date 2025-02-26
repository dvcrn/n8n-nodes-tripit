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

  if (operation === "update") {
    const params = {
      uuid: this.getNodeParameter("uuid", 0) as string,
    };

    // Add optional parameters
    const optionalFields = [
      "tripId", "displayName", "startDate", "startTime", "timezone", 
      "endDate", "endTime", "locationName", "address"
    ];

    // Add each field that is provided by the user
    for (const field of optionalFields) {
      const hasField = this.getNodeParameter(`update_${field}`, 0, false);
      if (hasField) {
        params[field] = this.getNodeParameter(field, 0);
      }
    }

    const response = await tripItService.updateActivity(credentials, params);
    returnData.push({ json: response });
  }

  if (operation === "attachDocument") {
    const activityUuid = this.getNodeParameter("uuid", 0) as string;
    const documentName = this.getNodeParameter("documentName", 0) as string;
    const documentContent = this.getNodeParameter("documentContent", 0) as string;
    const documentType = this.getNodeParameter("documentType", 0, "application/pdf") as string;
    
    const response = await tripItService.attachDocument(
      credentials, 
      "activity", 
      activityUuid, 
      documentName,
      documentContent,
      documentType
    );
    
    returnData.push({ json: response });
  }

  return returnData;
}
