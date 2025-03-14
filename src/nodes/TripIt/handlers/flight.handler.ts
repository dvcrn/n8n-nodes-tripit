import { IExecuteFunctions, INodeExecutionData } from "n8n-workflow";
import { TripItApi } from "../api";
import { ITripItCredentials } from "../types/ITripItTypes";
import { TripItService, IUpdateFlightParams } from "../service";

export async function handleFlightOperation(
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
      departureAirport: this.getNodeParameter("departureAirport", 0) as string,
      arrivalAirport: this.getNodeParameter("arrivalAirport", 0) as string,
      departureTime: this.getNodeParameter("departureTime", 0) as string,
      arrivalTime: this.getNodeParameter("arrivalTime", 0) as string,
      flightNumber: this.getNodeParameter("flightNumber", 0) as string,
      marketingAirline: this.getNodeParameter("marketingAirline", 0) as string,
      operatingAirline: this.getNodeParameter("operatingAirline", 0) as string,
      seatAssignment: this.getNodeParameter("seatAssignment", 0) as string,
      aircraft: this.getNodeParameter("aircraft", 0) as string,
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

    const response = await tripItService.createFlight(credentials, params);
    returnData.push({ json: response });
  }

  // if (operation === "getInfo") {
  //   const flightNumber = this.getNodeParameter("flightNumber", 0) as string;
  //   const endpoint = "/v2/flightInfo";
  //   const params = {
  //     format: "json",
  //     flight_num: flightNumber,
  //   };

  //   const response = await tripIt.makeApiRequest(
  //     "GET",
  //     endpoint,
  //     credentials,
  //     undefined,
  //     params
  //   );
  //   returnData.push({ json: response.data });
  // }

  if (operation === "update") {
    const params: IUpdateFlightParams = {
      uuid: this.getNodeParameter("uuid", 0) as string,
    };

    // Add optional parameters
    const optionalFields = [
      "departureAirport",
      "arrivalAirport",
      "departureTime",
      "arrivalTime",
      "flightNumber",
      "marketingAirline",
      "operatingAirline",
      "seatAssignment",
      "aircraft",
      "bookingRate",
      "bookingSiteConfNum",
      "bookingSiteName",
      "bookingSitePhone",
      "bookingSiteUrl",
      "recordLocator",
      "supplierConfNum",
      "supplierContact",
      "supplierEmailAddress",
      "supplierPhone",
      "supplierUrl",
      "notes",
      "restrictions",
      "totalCost",
      "bookingDate",
      "isPurchased",
    ] as const;

    // Add each field that is provided by the user
    for (const field of optionalFields) {
      const hasField = this.getNodeParameter(`update_${field}`, 0, false);
      if (hasField) {
        if (field === "isPurchased") {
          params[field] = this.getNodeParameter(field, 0, false) as boolean;
        } else {
          params[field] = this.getNodeParameter(field, 0) as string;
        }
      }
    }

    const response = await tripItService.updateFlight(credentials, params);
    returnData.push({ json: response });
  }

  if (operation === "attachDocument") {
    const flightUuid = this.getNodeParameter("uuid", 0) as string;
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
      "air",
      flightUuid,
      documentName,
      documentContent,
      documentType
    );

    returnData.push({ json: response });
  }

  return returnData;
}
