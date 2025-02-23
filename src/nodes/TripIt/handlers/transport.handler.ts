import { IExecuteFunctions, INodeExecutionData } from "n8n-workflow";
import { TripItApi } from "../api";
import { ITripItCredentials } from "../types/ITripItTypes";
import orderObjectByKeys from "../../../util/orderObjectByKeys";
import normalizeTime from "../../../util/normalizeTime";
// You will need to add TRANSPORT_FIELD_ORDER and ITransportObject to your interfaces (TripItInterfaces.ts)

export const TRANSPORT_FIELD_ORDER = [
  "trip_uuid",
  "is_client_traveler",
  "is_purchased",
  "is_tripit_booking",
  "has_possible_cancellation",
  "Segment",
];

export interface ITransportSegment {
  StartLocationAddress: {
    address: string;
    longitude: string;
    latitude: string;
  };
  StartDateTime: {
    date: string;
    time: string;
    timezone: string;
  };
  EndLocationAddress: {
    address: string;
    longitude: string;
    latitude: string;
  };
  EndDateTime: {
    date: string;
    time: string;
    timezone: string;
  };
  vehicle_description: string;
  start_location_name: string;
  number_passengers: string;
  end_location_name: string;
  confirmation_num: string;
  carrier_name: string;
}

export interface ITransportObject {
  trip_uuid: string;
  is_client_traveler: string;
  is_purchased: string;
  is_tripit_booking: string;
  has_possible_cancellation: string;
  Segment: ITransportSegment[];
}

export async function handleTransportOperation(
  this: IExecuteFunctions,
  tripIt: TripItApi,
  operation: string,
  credentials: ITripItCredentials
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];

  if (operation === "addToTrip") {
    // Main transport fields
    const tripId = this.getNodeParameter("tripId", 0) as string;
    const isClientTraveler = this.getNodeParameter(
      "isClientTraveler",
      0
    ) as string;
    const isPurchased = this.getNodeParameter("isPurchased", 0) as string;
    const isTripitBooking = this.getNodeParameter(
      "isTripitBooking",
      0
    ) as string;
    const hasPossibleCancellation = this.getNodeParameter(
      "hasPossibleCancellation",
      0
    ) as string;
    const timezone = this.getNodeParameter("timezone", 0) as string;

    // Segment fields
    const startAddress = this.getNodeParameter("startAddress", 0) as string;
    const startDate = this.getNodeParameter("startDate", 0) as string;
    const startTime = this.getNodeParameter("startTime", 0) as string;
    const endAddress = this.getNodeParameter("endAddress", 0) as string;
    const endDate = this.getNodeParameter("endDate", 0) as string;
    const endTime = this.getNodeParameter("endTime", 0) as string;
    const normalizedStartTime: string = normalizeTime(startTime) || "";
    const normalizedEndTime: string = normalizeTime(endTime) || "";
    const startLocationName = this.getNodeParameter(
      "startLocationName",
      0
    ) as string;
    const endLocationName = this.getNodeParameter(
      "endLocationName",
      0
    ) as string;
    const vehicleDescription = this.getNodeParameter(
      "vehicleDescription",
      0
    ) as string;
    const confirmationNum = this.getNodeParameter(
      "confirmationNum",
      0
    ) as string;
    const carrierName = this.getNodeParameter("carrierName", 0) as string;
    const numberPassengers = this.getNodeParameter(
      "numberPassengers",
      0
    ) as string;

    const transportObj: ITransportObject = {
      trip_uuid: tripId,
      is_client_traveler: isClientTraveler,
      is_purchased: isPurchased,
      is_tripit_booking: isTripitBooking,
      has_possible_cancellation: hasPossibleCancellation,
      Segment: [
        {
          StartLocationAddress: {
            address: startAddress,
            longitude: "0",
            latitude: "0",
          },
          StartDateTime: {
            date: startDate,
            time: normalizedStartTime,
            timezone: timezone,
          },
          EndLocationAddress: {
            address: endAddress,
            longitude: "0",
            latitude: "0",
          },
          EndDateTime: {
            date: endDate,
            time: normalizedEndTime,
            timezone: timezone,
          },
          vehicle_description: vehicleDescription,
          start_location_name: startLocationName,
          number_passengers: numberPassengers,
          end_location_name: endLocationName,
          confirmation_num: confirmationNum,
          carrier_name: carrierName,
        },
      ],
    };

    const endpoint = "/v2/create/transport/format/json";
    const data = new URLSearchParams({
      json: JSON.stringify({
        TransportObject: orderObjectByKeys(transportObj, TRANSPORT_FIELD_ORDER),
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
