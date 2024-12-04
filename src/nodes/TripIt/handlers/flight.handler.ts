import { IExecuteFunctions, INodeExecutionData } from "n8n-workflow";
import { TripItApi } from "../api";
import { ITripItCredentials } from "../types/ITripItTypes";
import orderObjectByKeys from "../../../util/orderObjectByKeys";
import {
  AIR_FIELD_ORDER,
  IAirObject,
} from "../../../interfaces/TripItInterfaces";
import normalizeTime from "../../../util/normalizeTime";

export async function handleFlightOperation(
  this: IExecuteFunctions,
  tripIt: TripItApi,
  operation: string,
  credentials: ITripItCredentials
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];

  if (operation === "addToTrip") {
    const tripId = this.getNodeParameter("tripId", 0) as string;

    // Get flight-specific fields
    const departureAirport = this.getNodeParameter(
      "departureAirport",
      0
    ) as string;
    const arrivalAirport = this.getNodeParameter("arrivalAirport", 0) as string;
    const departureTime = this.getNodeParameter("departureTime", 0) as string;
    const arrivalTime = this.getNodeParameter("arrivalTime", 0) as string;
    const flightNumber = this.getNodeParameter("flightNumber", 0) as string;
    const marketingAirline = this.getNodeParameter(
      "marketingAirline",
      0
    ) as string;
    const operatingAirline = this.getNodeParameter(
      "operatingAirline",
      0
    ) as string;
    const seatAssignment = this.getNodeParameter("seatAssignment", 0) as string;
    const aircraft = this.getNodeParameter("aircraft", 0) as string;

    // Get reservation fields
    const bookingRate = this.getNodeParameter("bookingRate", 0) as string;
    const bookingSiteConfNum = this.getNodeParameter(
      "bookingSiteConfNum",
      0
    ) as string;
    const bookingSiteName = this.getNodeParameter(
      "bookingSiteName",
      0
    ) as string;
    const bookingSitePhone = this.getNodeParameter(
      "bookingSitePhone",
      0
    ) as string;
    const bookingSiteUrl = this.getNodeParameter("bookingSiteUrl", 0) as string;
    const recordLocator = this.getNodeParameter("recordLocator", 0) as string;
    const supplierConfNum = this.getNodeParameter(
      "supplierConfNum",
      0
    ) as string;
    const supplierContact = this.getNodeParameter(
      "supplierContact",
      0
    ) as string;
    const supplierEmailAddress = this.getNodeParameter(
      "supplierEmailAddress",
      0
    ) as string;
    const supplierPhone = this.getNodeParameter("supplierPhone", 0) as string;
    const supplierUrl = this.getNodeParameter("supplierUrl", 0) as string;
    const notes = this.getNodeParameter("notes", 0) as string;
    const restrictions = this.getNodeParameter("restrictions", 0) as string;
    const totalCost = this.getNodeParameter("totalCost", 0) as string;
    const cancellationDateTime = this.getNodeParameter(
      "cancellationDateTime",
      0
    ) as string;
    const bookingDate = this.getNodeParameter("bookingDate", 0) as string;
    const isPurchased = this.getNodeParameter("isPurchased", 0) as boolean;

    const airObj: IAirObject = {
      trip_id: tripId,
      booking_rate: bookingRate || undefined,
      booking_site_conf_num: bookingSiteConfNum || undefined,
      booking_site_name: bookingSiteName || undefined,
      booking_site_phone: bookingSitePhone || undefined,
      booking_site_url: bookingSiteUrl || undefined,
      record_locator: recordLocator || undefined,
      supplier_conf_num: supplierConfNum || undefined,
      supplier_contact: supplierContact || undefined,
      supplier_email_address: supplierEmailAddress || undefined,
      supplier_phone: supplierPhone || undefined,
      supplier_url: supplierUrl || undefined,
      notes: notes || undefined,
      restrictions: restrictions || undefined,
      total_cost: totalCost || undefined,
      // cancellation_date_time: cancellationDateTime || undefined,
      booking_date: bookingDate || undefined,
      is_purchased: isPurchased,
      Segment: [
        {
          marketing_airline: marketingAirline,
          marketing_flight_number: flightNumber,
          operating_airline: operatingAirline || undefined,
          aircraft: aircraft || undefined,
          seats: seatAssignment || undefined,
          StartDateTime: {
            date: departureTime.split("T")[0],
            time: normalizeTime(departureTime.split("T")[1]),
          },
          EndDateTime: {
            date: arrivalTime.split("T")[0],
            time: normalizeTime(arrivalTime.split("T")[1]),
          },
          start_airport_code: departureAirport,
          end_airport_code: arrivalAirport,
        },
      ],
    };

    console.log(airObj);
    const endpoint = "/v1/create/air/format/json";
    const data = new URLSearchParams({
      json: JSON.stringify({
        AirObject: orderObjectByKeys(airObj, AIR_FIELD_ORDER),
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

  if (operation === "getInfo") {
    const flightNumber = this.getNodeParameter("flightNumber", 0) as string;
    const endpoint = "/v2/flightInfo";
    const params = {
      format: "json",
      flight_num: flightNumber,
    };

    const response = await tripIt.makeApiRequest(
      "GET",
      endpoint,
      credentials,
      undefined,
      params
    );
    returnData.push({ json: response.data });
  }

  return returnData;
}
