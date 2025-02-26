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
      displayName: this.getNodeParameter("displayName", 0) as string,
      address: this.getNodeParameter("address", 0) as string,
      startDate: this.getNodeParameter("startDate", 0) as string,
      endDate: this.getNodeParameter("endDate", 0) as string,
      roomType: this.getNodeParameter("roomType", 0) as string,
      numberOfGuests: this.getNodeParameter("numberOfGuests", 0) as string,
      numberOfRooms: this.getNodeParameter("numberOfRooms", 0) as string,
      roomRate: this.getNodeParameter("roomRate", 0) as string,
      currency: this.getNodeParameter("currency", 0) as string,
      cancellationDate: this.getNodeParameter("cancellationDate", 0) as string,
      cancellationTime: this.getNodeParameter("cancellationTime", 0) as string,
      timezone: this.getNodeParameter("timezone", 0) as string,
      notes: this.getNodeParameter("notes", 0) as string,
      supplierName: this.getNodeParameter("supplierName", 0) as string,
      supplierPhone: this.getNodeParameter("supplierPhone", 0) as string,
      supplierUrl: this.getNodeParameter("supplierUrl", 0) as string,
      supplierEmailAddress: this.getNodeParameter(
        "supplierEmailAddress",
        0
      ) as string,
      supplierConfNum: this.getNodeParameter("supplierConfNum", 0) as string,
    };

    const response = await tripItService.createHotel(credentials, params);
    returnData.push({ json: response });
  }

  if (operation === "update") {
    const params = {
      uuid: this.getNodeParameter("uuid", 0) as string,
    };

    // Add optional parameters
    const optionalFields = [
      "tripId", "displayName", "address", "startDate", "endDate", "roomType", 
      "numberOfGuests", "numberOfRooms", "roomRate", "currency", "cancellationDate", 
      "cancellationTime", "timezone", "notes", "supplierName", "supplierPhone", 
      "supplierUrl", "supplierEmailAddress", "supplierConfNum"
    ];

    // Add each field that is provided by the user
    for (const field of optionalFields) {
      const hasField = this.getNodeParameter(`update_${field}`, 0, false);
      if (hasField) {
        params[field] = this.getNodeParameter(field, 0);
      }
    }

    const response = await tripItService.updateHotel(credentials, params);
    returnData.push({ json: response });
  }

  if (operation === "attachDocument") {
    const hotelUuid = this.getNodeParameter("uuid", 0) as string;
    const documentName = this.getNodeParameter("documentName", 0) as string;
    const documentContent = this.getNodeParameter("documentContent", 0) as string;
    const documentType = this.getNodeParameter("documentType", 0, "application/pdf") as string;
    
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
