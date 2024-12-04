import { IExecuteFunctions, INodeExecutionData } from "n8n-workflow";
import { TripItApi } from "../api";
import { ITripItCredentials } from "../types/ITripItTypes";
import {
  ILodgingObject,
  LODGING_FIELD_ORDER,
} from "../../../interfaces/TripItInterfaces";
import orderObjectByKeys from "../../../util/orderObjectByKeys";
import normalizeTime from "../../../util/normalizeTime";

export async function handleHotelOperation(
  this: IExecuteFunctions,
  tripIt: TripItApi,
  operation: string,
  credentials: ITripItCredentials
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];

  if (operation === "addToTrip") {
    const tripId = this.getNodeParameter("tripId", 0) as string;

    // Get hotel-specific fields
    const hotelName = this.getNodeParameter("hotelName", 0) as string;
    const checkInDate = this.getNodeParameter("checkInDate", 0) as string;
    const checkOutDate = this.getNodeParameter("checkOutDate", 0) as string;
    const checkInTime = this.getNodeParameter("checkInTime", 0) as string;
    const checkOutTime = this.getNodeParameter("checkOutTime", 0) as string;
    const timezone = this.getNodeParameter("timezone", 0) as string;
    const numberGuests = this.getNodeParameter("numberGuests", 0) as number;
    const numberRooms = this.getNodeParameter("numberRooms", 0) as number;
    const roomType = this.getNodeParameter("roomType", 0) as string;

    // Get address fields
    const street = this.getNodeParameter("street", 0) as string;
    const city = this.getNodeParameter("city", 0) as string;
    const state = this.getNodeParameter("state", 0) as string;
    const zip = this.getNodeParameter("zip", 0) as string;
    const country = this.getNodeParameter("country", 0) as string;

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

    const lodgingObject: ILodgingObject = {
      trip_id: tripId,
      supplier_name: hotelName,
      supplier_conf_num: supplierConfNum || undefined,
      supplier_phone: supplierPhone || undefined,
      supplier_url: supplierUrl || undefined,
      booking_rate: bookingRate || undefined,
      booking_site_conf_num: bookingSiteConfNum || undefined,
      booking_site_name: bookingSiteName || undefined,
      booking_site_phone: bookingSitePhone || undefined,
      booking_site_url: bookingSiteUrl || undefined,
      record_locator: recordLocator || undefined,
      supplier_contact: supplierContact || undefined,
      supplier_email_address: supplierEmailAddress || undefined,
      notes: notes || undefined,
      restrictions: restrictions || undefined,
      total_cost: totalCost || undefined,
      // cancellation_date_time: cancellationDateTime || undefined,
      booking_date: bookingDate || undefined,
      is_purchased: isPurchased,
      StartDateTime: {
        date: checkInDate,
        time: normalizeTime(checkInTime),
        timezone: timezone,
      },
      EndDateTime: {
        date: checkOutDate,
        time: normalizeTime(checkOutTime),
        timezone: timezone,
      },
      number_guests: numberGuests,
      number_rooms: numberRooms,
      room_type: roomType || undefined,
      Address: {
        address: street || undefined,
        // street: street || undefined,
        // longitude: 0,
        // latitude: 0,
        city: city || undefined,
        state: state || undefined,
        zip: zip || undefined,
        country: country || undefined,
      },
    };

    const endpoint = "/v1/create/lodging/format/json";
    const data = new URLSearchParams({
      json: JSON.stringify({
        LodgingObject: orderObjectByKeys(lodgingObject, LODGING_FIELD_ORDER),
      }),
    }).toString();

    const response = await tripIt.makeApiRequest(
      "POST",
      endpoint,
      credentials,
      data
    );
    returnData.push({ json: response.data });
  }

  return returnData;
}
