import { IExecuteFunctions, INodeExecutionData } from "n8n-workflow";
import { TripItApi } from "../api";
import {
  TripItService,
  ICreateTransportParams,
  IUpdateTransportParams,
} from "../service";
import { ITripItCredentials } from "../types/ITripItTypes";
import { RESERVATION_FIELD_ORDER } from "../../../interfaces/TripItInterfaces";

export const TRANSPORT_FIELD_UPDATE_ORDER = [
  "uuid",
  "trip_uuid",
  "is_client_traveler",
  "relative_url",
  "display_name",
  "Image",
  "is_purchased",
  "is_tripit_booking",
  "has_possible_cancellation",
  "Segment",
];

export const TRANSPORT_FIELD_ORDER = [
  "uuid",
  "trip_uuid",
  "is_client_traveler",
  "relative_url",
  "display_name",
  "Image",
  "is_display_name_auto_generated",
  "last_modified",
  "is_purchased",
  "is_tripit_booking",
  "Segment",
];

export const TRANSPORT_SEGMENT_FIELD_ORDER = [
  "uuid",
  "StartLocationAddress",
  "StartDateTime",
  "EndLocationAddress",
  "EndDateTime",
  "vehicle_description",
  "start_location_name",
  "number_passengers",
  "end_location_name",
  "confirmation_num",
  "carrier_name",
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
      isClientTraveler: this.getNodeParameter("isClientTraveler", 0) as boolean,
      isPurchased: this.getNodeParameter("isPurchased", 0) as boolean,
      isTripitBooking: this.getNodeParameter("isTripitBooking", 0) as boolean,
      hasPossibleCancellation: this.getNodeParameter(
        "hasPossibleCancellation",
        0
      ) as boolean,
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

    console.log("params", params);

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
      "tripId",
      "isClientTraveler",
      "isPurchased",
      "isTripitBooking",
      "hasPossibleCancellation",
      "timezone",
      "startAddress",
      "startDate",
      "startTime",
      "endAddress",
      "endDate",
      "endTime",
      "startLocationName",
      "endLocationName",
      "vehicleDescription",
      "confirmationNum",
      "carrierName",
      "numberPassengers",
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
    const documentContent = this.getNodeParameter(
      "documentContent",
      0
    ) as string;
    const documentType = this.getNodeParameter(
      "documentType",
      0,
      "application/pdf"
    ) as string;

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
