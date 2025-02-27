import { BaseService } from "./base.service";
import { ITripItCredentials } from "../types/ITripItTypes";
import { ICreateFlightParams, IUpdateFlightParams } from "../interfaces";
import orderObjectByKeys from "../../../util/orderObjectByKeys";
import normalizeTime from "../../../util/normalizeTime";
import {
  AIR_FIELD_ORDER,
  AIR_SEGMENT_FIELD_ORDER,
  IMAGE_FIELD_ORDER,
} from "../../../interfaces/TripItInterfaces";
import { IFlightResponse } from "../types/responses";

export class FlightService extends BaseService {
  /**
   * Creates a new flight in TripIt
   */
  async createFlight(
    credentials: ITripItCredentials,
    params: ICreateFlightParams
  ) {
    const airObj: any = {
      booking_rate: params.bookingRate,
      booking_site_conf_num: params.bookingSiteConfNum,
      booking_site_name: params.bookingSiteName,
      booking_site_phone: params.bookingSitePhone,
      booking_site_url: params.bookingSiteUrl,
      record_locator: params.recordLocator,
      supplier_conf_num: params.supplierConfNum,
      supplier_contact: params.supplierContact,
      supplier_email_address: params.supplierEmailAddress,
      supplier_phone: params.supplierPhone,
      supplier_url: params.supplierUrl,
      notes: params.notes,
      restrictions: params.restrictions,
      total_cost: params.totalCost,
      booking_date: params.bookingDate,
      is_purchased: params.isPurchased,
      Segment: [
        {
          marketing_airline: params.marketingAirline,
          marketing_flight_number: params.flightNumber,
          operating_airline: params.operatingAirline,
          aircraft: params.aircraft,
          seats: params.seatAssignment,
          StartDateTime: {
            date: params.departureTime.split("T")[0],
            time: normalizeTime(params.departureTime.split("T")[1]),
          },
          EndDateTime: {
            date: params.arrivalTime.split("T")[0],
            time: normalizeTime(params.arrivalTime.split("T")[1]),
          },
          start_airport_code: params.departureAirport,
          end_airport_code: params.arrivalAirport,
        },
      ],
    };

    const { key, value } = this.normalizeId(params.tripId);
    airObj[key] = value;

    const endpoint = this.buildEndpoint("air");
    const data = new URLSearchParams({
      json: JSON.stringify({
        AirObject: orderObjectByKeys(airObj, AIR_FIELD_ORDER),
      }),
    });

    return this.makeRequest<IFlightResponse>(
      "POST",
      endpoint,
      credentials,
      data.toString()
    );
  }

  /**
   * Updates an existing flight in TripIt
   */
  async updateFlight(
    credentials: ITripItCredentials,
    params: IUpdateFlightParams
  ) {
    // First, fetch the existing flight object
    const existingFlightResponse = await this.api.getFlight(
      credentials,
      params.uuid
    );
    const existingFlight = existingFlightResponse.data.AirObject;

    if (!existingFlight) {
      throw new Error(`Flight with UUID ${params.uuid} not found`);
    }

    // Create a merged object with existing data
    const airObj: any = { ...existingFlight };

    // Update top-level fields that were provided
    const topLevelFields = [
      ["bookingRate", "booking_rate"],
      ["bookingSiteConfNum", "booking_site_conf_num"],
      ["bookingSiteName", "booking_site_name"],
      ["bookingSitePhone", "booking_site_phone"],
      ["bookingSiteUrl", "booking_site_url"],
      ["recordLocator", "record_locator"],
      ["supplierConfNum", "supplier_conf_num"],
      ["supplierContact", "supplier_contact"],
      ["supplierEmailAddress", "supplier_email_address"],
      ["supplierPhone", "supplier_phone"],
      ["supplierUrl", "supplier_url"],
      ["notes", "notes"],
      ["restrictions", "restrictions"],
      ["totalCost", "total_cost"],
      ["bookingDate", "booking_date"],
      ["isPurchased", "is_purchased"],
    ] as const;

    for (const [paramKey, objectKey] of topLevelFields) {
      if (params[paramKey] !== undefined) {
        airObj[objectKey] = params[paramKey];
      }
    }

    // Handle segment properties
    if (airObj.Segment && airObj.Segment.length > 0) {
      // Update segment-specific fields
      const segmentFields = [
        ["marketingAirline", "marketing_airline"],
        ["flightNumber", "marketing_flight_number"],
        ["operatingAirline", "operating_airline"],
        ["aircraft", "aircraft"],
        ["seatAssignment", "seats"],
        ["departureAirport", "start_airport_code"],
        ["arrivalAirport", "end_airport_code"],
      ] as const;

      for (const [paramKey, objectKey] of segmentFields) {
        if (params[paramKey] !== undefined) {
          airObj.Segment[0][objectKey] = params[paramKey];
        }
      }

      // Handle departure date/time
      if (params.departureTime) {
        const [date, time] = params.departureTime.split("T");
        if (!airObj.Segment[0].StartDateTime) {
          airObj.Segment[0].StartDateTime = {};
        }
        airObj.Segment[0].StartDateTime.date = date;
        airObj.Segment[0].StartDateTime.time = normalizeTime(time);
      }

      // Handle arrival date/time
      if (params.arrivalTime) {
        const [date, time] = params.arrivalTime.split("T");
        if (!airObj.Segment[0].EndDateTime) {
          airObj.Segment[0].EndDateTime = {};
        }
        airObj.Segment[0].EndDateTime.date = date;
        airObj.Segment[0].EndDateTime.time = normalizeTime(time);
      }
    }

    // Update trip ID if provided
    if (params.tripId) {
      const { key, value } = this.normalizeId(params.tripId);
      airObj[key] = value;
    }

    // Handle Image if provided
    if (params.Image) {
      airObj.Image = params.Image;

      if (Array.isArray(airObj.Image)) {
        airObj.Image = airObj.Image.map((img) => {
          if (img.segment_uuid) {
            return img;
          }

          img.segment_uuid = img.segment_uuid || airObj.Segment.uuid;
          return orderObjectByKeys(img, IMAGE_FIELD_ORDER);
        });
      } else {
        airObj.Image.segment_uuid = airObj.Segment.uuid;
        airObj.Image = orderObjectByKeys(airObj.Image, IMAGE_FIELD_ORDER);
      }
    }

    airObj.Segment = orderObjectByKeys(airObj.Segment, AIR_SEGMENT_FIELD_ORDER);

    const endpoint = this.buildEndpoint("air", params.uuid);
    const data = new URLSearchParams({
      json: JSON.stringify({
        AirObject: orderObjectByKeys(airObj, AIR_FIELD_ORDER),
      }),
    });

    return this.makeRequest<IFlightResponse>(
      "POST",
      endpoint,
      credentials,
      data.toString()
    );
  }
}
