import { IExecuteFunctions, INodeExecutionData } from "n8n-workflow";
import { TripItApi } from "../api";
import { ITripItCredentials } from "../types/ITripItTypes";
import { TripItService, IUpdateHotelParams } from "../service";

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

      street: this.getNodeParameter("street", 0) as string,
      city: this.getNodeParameter("city", 0) as string,
      state: this.getNodeParameter("state", 0) as string,
      zip: this.getNodeParameter("zip", 0) as string,
      country: this.getNodeParameter("country", 0) as string,
      roomType: this.getNodeParameter("roomType", 0) as string,
      numberGuests: parseInt(
        this.getNodeParameter("numberGuests", 0, "1") as string
      ),
      numberRooms: parseInt(
        this.getNodeParameter("numberRooms", 0, "1") as string
      ),

      bookingRate: this.getNodeParameter("bookingRate", 0) as string,
      bookingDate: this.getNodeParameter("bookingDate", 0) as string,
      notes: this.getNodeParameter("notes", 0) as string,
      supplierConfNum: this.getNodeParameter("supplierConfNum", 0) as string,
      supplierContact: this.getNodeParameter("supplierContact", 0) as string,
      supplierEmailAddress: this.getNodeParameter(
        "supplierEmailAddress",
        0
      ) as string,
      supplierPhone: this.getNodeParameter("supplierPhone", 0) as string,
      supplierUrl: this.getNodeParameter("supplierUrl", 0) as string,
      bookingSiteConfNum: this.getNodeParameter(
        "bookingSiteConfNum",
        0
      ) as string,
      bookingSiteName: this.getNodeParameter("bookingSiteName", 0) as string,
      bookingSitePhone: this.getNodeParameter("bookingSitePhone", 0) as string,
      bookingSiteUrl: this.getNodeParameter("bookingSiteUrl", 0) as string,
      recordLocator: this.getNodeParameter("recordLocator", 0) as string,
      totalCost: this.getNodeParameter("totalCost", 0) as string,
      restrictions: this.getNodeParameter("restrictions", 0) as string,
      isPurchased: this.getNodeParameter("isPurchased", 0) as boolean,
    };

    const response = await tripItService.createHotel(credentials, params);
    returnData.push({ json: response });
  }

  if (operation === "update") {
    // Create the params object with the appropriate type
    const params: IUpdateHotelParams = {
      uuid: this.getNodeParameter("uuid", 0) as string,
    };

    // Add optional parameters
    const optionalFields = [
      "tripId",
      "hotelName",
      "checkInDate",
      "checkOutDate",
      "checkInTime",
      "checkOutTime",
      "timezone",
      "street",
      "city",
      "state",
      "zip",
      "country",
      "roomType",
      "numberGuests",
      "numberRooms",
      "bookingRate",
      "bookingDate",
      "notes",
      "supplierPhone",
      "supplierUrl",
      "supplierEmailAddress",
      "supplierConfNum",
      "supplierContact",
      "bookingSiteConfNum",
      "bookingSiteName",
      "bookingSitePhone",
      "bookingSiteUrl",
      "recordLocator",
      "totalCost",
      "restrictions",
      "isPurchased",
    ] as const;

    // Add each field that is provided by the user
    for (const field of optionalFields) {
      const hasField = this.getNodeParameter(`update_${field}`, 0, false);
      if (hasField) {
        // Handle numeric fields
        if (field === "numberGuests" || field === "numberRooms") {
          params[field] = parseInt(
            this.getNodeParameter(field, 0, "1") as string
          );
        }
        // Handle boolean fields
        else if (field === "isPurchased") {
          params[field] = this.getNodeParameter(field, 0, false) as boolean;
        }
        // Handle all other fields as strings
        else {
          params[field] = this.getNodeParameter(field, 0) as string;
        }
      }
    }

    const response = await tripItService.updateHotel(credentials, params);
    returnData.push({ json: response });
  }

  if (operation === "attachDocument") {
    const hotelUuid = this.getNodeParameter("uuid", 0) as string;
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
      "lodging",
      hotelUuid,
      documentName,
      documentContent,
      documentType
    );

    returnData.push({ json: response });
  }

  return returnData;
}
