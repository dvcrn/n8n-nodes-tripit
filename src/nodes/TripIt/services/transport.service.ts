import { BaseService } from "./base.service";
import { ITripItCredentials } from "../types/ITripItTypes";
import { ICreateTransportParams, IUpdateTransportParams } from "../interfaces";
import orderObjectByKeys from "../../../util/orderObjectByKeys";
import normalizeTime from "../../../util/normalizeTime";
import { IMAGE_FIELD_ORDER } from "../../../interfaces/TripItInterfaces";
import {
  TRANSPORT_FIELD_ORDER,
  TRANSPORT_FIELD_UPDATE_ORDER,
  TRANSPORT_SEGMENT_FIELD_ORDER,
} from "../handlers/transport.handler";
import { ITransportResponse } from "../types/responses";

export class TransportService extends BaseService {
  /**
   * Creates a new transport booking in TripIt
   */
  async createTransport(
    credentials: ITripItCredentials,
    params: ICreateTransportParams
  ) {
    const transportObj: any = {
      is_client_traveler: params.isClientTraveler,
      is_purchased: params.isPurchased,
      is_tripit_booking: params.isTripitBooking,
      has_possible_cancellation: params.hasPossibleCancellation,
      Segment: [
        {
          StartLocationAddress: {
            address: params.startAddress,
            longitude: "0",
            latitude: "0",
          },
          StartDateTime: {
            date: params.startDate,
            time: normalizeTime(params.startTime),
            timezone: params.timezone,
          },
          EndLocationAddress: {
            address: params.endAddress,
            longitude: "0",
            latitude: "0",
          },
          EndDateTime: {
            date: params.endDate,
            time: normalizeTime(params.endTime),
            timezone: params.timezone,
          },
          vehicle_description: params.vehicleDescription,
          start_location_name: params.startLocationName,
          number_passengers: params.numberPassengers,
          end_location_name: params.endLocationName,
          confirmation_num: params.confirmationNum,
          carrier_name: params.carrierName,
        },
      ],
    };

    const { key, value } = this.normalizeId(params.tripId);
    transportObj[key] = value;

    const endpoint = this.buildEndpoint("transport");
    const data = new URLSearchParams({
      json: JSON.stringify({
        TransportObject: orderObjectByKeys(transportObj, TRANSPORT_FIELD_ORDER),
      }),
    });

    return this.makeRequest<ITransportResponse>(
      "POST",
      endpoint,
      credentials,
      data.toString()
    );
  }

  /**
   * Updates an existing transport booking in TripIt
   */
  async updateTransport(
    credentials: ITripItCredentials,
    params: IUpdateTransportParams
  ) {
    // First, fetch the existing transport object
    const existingTransportResponse = await this.api.getTransport(
      credentials,
      params.uuid
    );
    const existingTransport = existingTransportResponse.data.TransportObject;

    if (!existingTransport) {
      throw new Error(`Transport with UUID ${params.uuid} not found`);
    }

    // Create a merged object with existing data
    const transportObj: any = { ...existingTransport };

    // Map param keys to API object keys for top-level properties
    const paramMapping = {
      isClientTraveler: "is_client_traveler",
      isPurchased: "is_purchased",
      isTripitBooking: "is_tripit_booking",
      hasPossibleCancellation: "has_possible_cancellation",
    } as const;

    Object.entries(paramMapping).forEach(([paramKey, objectKey]) => {
      const value = params[paramKey as keyof typeof paramMapping];
      if (value !== undefined) {
        transportObj[objectKey] = value;
      }
    });

    // Handle segment properties if they exist
    if (transportObj.Segment && transportObj.Segment.length > 0) {
      // Update segment-specific fields
      const segmentMapping = {
        vehicleDescription: "vehicle_description",
        startLocationName: "start_location_name",
        numberPassengers: "number_passengers",
        endLocationName: "end_location_name",
        confirmationNum: "confirmation_num",
        carrierName: "carrier_name",
      } as const;

      Object.entries(segmentMapping).forEach(([paramKey, objectKey]) => {
        const value = params[paramKey as keyof typeof segmentMapping];
        if (value !== undefined) {
          transportObj.Segment[0][objectKey] = value;
        }
      });

      // Handle start location address
      if (params.startAddress) {
        if (!transportObj.Segment[0].StartLocationAddress) {
          transportObj.Segment[0].StartLocationAddress = {
            longitude: "0",
            latitude: "0",
          };
        }
        transportObj.Segment[0].StartLocationAddress.address =
          params.startAddress;
      }

      // Handle end location address
      if (params.endAddress) {
        if (!transportObj.Segment[0].EndLocationAddress) {
          transportObj.Segment[0].EndLocationAddress = {
            longitude: "0",
            latitude: "0",
          };
        }
        transportObj.Segment[0].EndLocationAddress.address = params.endAddress;
      }

      // Handle StartDateTime updates
      if (params.startDate || params.startTime || params.timezone) {
        if (!transportObj.Segment[0].StartDateTime) {
          transportObj.Segment[0].StartDateTime = {};
        }

        if (params.startDate)
          transportObj.Segment[0].StartDateTime.date = params.startDate;
        if (params.startTime)
          transportObj.Segment[0].StartDateTime.time = normalizeTime(
            params.startTime
          );
        if (params.timezone)
          transportObj.Segment[0].StartDateTime.timezone = params.timezone;
      }

      // Handle EndDateTime updates
      if (params.endDate || params.endTime || params.timezone) {
        if (!transportObj.Segment[0].EndDateTime) {
          transportObj.Segment[0].EndDateTime = {};
        }

        if (params.endDate)
          transportObj.Segment[0].EndDateTime.date = params.endDate;
        if (params.endTime)
          transportObj.Segment[0].EndDateTime.time = normalizeTime(
            params.endTime
          );
        if (params.timezone)
          transportObj.Segment[0].EndDateTime.timezone = params.timezone;
      }
    }

    // Update trip ID if provided
    if (params.tripId) {
      const { key, value } = this.normalizeId(params.tripId);
      transportObj[key] = value;
    }

    // Handle Image if provided
    if (params.Image) {
      transportObj.Image = params.Image;

      if (
        typeof transportObj.Image === "object" &&
        !Array.isArray(transportObj.Image)
      ) {
        transportObj.Image.segment_uuid = transportObj.Segment.uuid;
      }

      transportObj.Image = orderObjectByKeys(
        transportObj.Image,
        IMAGE_FIELD_ORDER
      );
    }

    const orderedTransportObj = orderObjectByKeys(
      transportObj,
      TRANSPORT_FIELD_UPDATE_ORDER
    );
    orderedTransportObj.Segment = orderObjectByKeys(
      orderedTransportObj.Segment,
      TRANSPORT_SEGMENT_FIELD_ORDER
    );

    const endpoint = this.buildEndpoint("transport", params.uuid);
    const data = new URLSearchParams({
      json: JSON.stringify({
        TransportObject: orderedTransportObj,
      }),
    });

    return this.makeRequest<ITransportResponse>(
      "POST",
      endpoint,
      credentials,
      data.toString()
    );
  }
}
