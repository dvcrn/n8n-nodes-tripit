import { IExecuteFunctions, INodeExecutionData } from "n8n-workflow";
import { TripItApi } from "../api";
import { TripItService, ICreateTransportParams, IUpdateTransportParams } from "../service";
import { ITripItCredentials } from "../types/ITripItTypes";

export const TRANSPORT_FIELD_ORDER = [
  "trip_uuid",
  "is_client_traveler",
  "is_purchased",
  "is_tripit_booking",
  "has_possible_cancellation",
  "Segment",
];

export async function handleTransportOperation(
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
      isClientTraveler: this.getNodeParameter("isClientTraveler", 0) as string,
      isPurchased: this.getNodeParameter("isPurchased", 0) as string,
      isTripitBooking: this.getNodeParameter("isTripitBooking", 0) as string,
      hasPossibleCancellation: this.getNodeParameter(
        "hasPossibleCancellation",
        0
      ) as string,
      timezone: this.getNodeParameter("timezone", 0) as string,
      startAddress: this.getNodeParameter("startAddress", 0) as string,
      startDate: this.getNodeParameter("startDate", 0) as string,
      startTime: this.getNodeParameter("startTime", 0) as string,
      endAddress: this.getNodeParameter("endAddress", 0) as string,
      endDate: this.getNodeParameter("endDate", 0) as string,
      endTime: this.getNodeParameter("endTime", 0) as string,
      startLocationName: this.getNodeParameter(
        "startLocationName",
        0
      ) as string,
      endLocationName: this.getNodeParameter("endLocationName", 0) as string,
      vehicleDescription: this.getNodeParameter(
        "vehicleDescription",
        0
      ) as string,
      confirmationNum: this.getNodeParameter("confirmationNum", 0) as string,
      carrierName: this.getNodeParameter("carrierName", 0) as string,
      numberPassengers: this.getNodeParameter("numberPassengers", 0) as string,
    };

    const response = await tripItService.createTransport(credentials, params);
    returnData.push({ json: response });
  }

  if (operation === "update") {
    const transportUuid = this.getNodeParameter("uuid", 0) as string;
    
    // Create params object with index signature to allow string indexing
    const params: IUpdateTransportParams & { [key: string]: any } = {
      uuid: transportUuid,
    };

    const optionalFields = [
      "tripId", "isClientTraveler", "isPurchased", "isTripitBooking", 
      "hasPossibleCancellation", "timezone", "startAddress", "startDate", 
      "startTime", "endAddress", "endDate", "endTime", "startLocationName", 
      "endLocationName", "vehicleDescription", "confirmationNum", 
      "carrierName", "numberPassengers"
    ];

    // Add each field that is provided by the user
    for (const field of optionalFields) {
      const hasField = this.getNodeParameter(`update_${field}`, 0, false);
      if (hasField) {
        params[field] = this.getNodeParameter(field, 0);
      }
    }

    const response = await tripItService.updateTransport(credentials, params);
    returnData.push({ json: response });
  }

  if (operation === "attachDocument") {
    const transportUuid = this.getNodeParameter("uuid", 0) as string;
    const documentName = this.getNodeParameter("documentName", 0) as string;
    const documentContent = this.getNodeParameter("documentContent", 0) as string;
    const documentType = this.getNodeParameter("documentType", 0, "application/pdf") as string;
    
    const response = await tripItService.attachDocument(
      credentials, 
      "transport", 
      transportUuid, 
      documentName,
      documentContent,
      documentType
    );
    
    returnData.push({ json: response });
  }

  return returnData;
}
