import { IExecuteFunctions, INodeExecutionData } from "n8n-workflow";
import { TripItApi } from "../api";
import { ITripItCredentials } from "../types/ITripItTypes";
import { TripItService } from "../service";

export async function handleHotelOperation(
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
      hotelName: this.getNodeParameter("hotelName", 0) as string,
      checkInDate: this.getNodeParameter("checkInDate", 0) as string,
      checkOutDate: this.getNodeParameter("checkOutDate", 0) as string,
      checkInTime: this.getNodeParameter("checkInTime", 0) as string,
      checkOutTime: this.getNodeParameter("checkOutTime", 0) as string,
      timezone: this.getNodeParameter("timezone", 0) as string,
      numberGuests: this.getNodeParameter("numberGuests", 0) as number,
      numberRooms: this.getNodeParameter("numberRooms", 0) as number,
      roomType: this.getNodeParameter("roomType", 0) as string,
      street: this.getNodeParameter("street", 0) as string,
      city: this.getNodeParameter("city", 0) as string,
      state: this.getNodeParameter("state", 0) as string,
      zip: this.getNodeParameter("zip", 0) as string,
      country: this.getNodeParameter("country", 0) as string,
      bookingRate: this.getNodeParameter("bookingRate", 0) as string,
      bookingSiteConfNum: this.getNodeParameter(
        "bookingSiteConfNum",
        0
      ) as string,
      bookingSiteName: this.getNodeParameter("bookingSiteName", 0) as string,
      bookingSitePhone: this.getNodeParameter("bookingSitePhone", 0) as string,
      bookingSiteUrl: this.getNodeParameter("bookingSiteUrl", 0) as string,
      recordLocator: this.getNodeParameter("recordLocator", 0) as string,
      supplierConfNum: this.getNodeParameter("supplierConfNum", 0) as string,
      supplierContact: this.getNodeParameter("supplierContact", 0) as string,
      supplierEmailAddress: this.getNodeParameter(
        "supplierEmailAddress",
        0
      ) as string,
      supplierPhone: this.getNodeParameter("supplierPhone", 0) as string,
      supplierUrl: this.getNodeParameter("supplierUrl", 0) as string,
      notes: this.getNodeParameter("notes", 0) as string,
      restrictions: this.getNodeParameter("restrictions", 0) as string,
      totalCost: this.getNodeParameter("totalCost", 0) as string,
      bookingDate: this.getNodeParameter("bookingDate", 0) as string,
      isPurchased: this.getNodeParameter("isPurchased", 0) as boolean,
    };

    const response = await tripItService.createHotel(credentials, params);
    returnData.push({ json: response });
  }

  return returnData;
}
