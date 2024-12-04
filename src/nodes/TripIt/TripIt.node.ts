import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
} from "n8n-workflow";
import { AxiosError } from "axios";
import { TripItApi } from "./api";
import { handleTripOperation } from "./handlers/trip.handler";
import { handleFlightOperation } from "./handlers/flight.handler";
import { handleHotelOperation } from "./handlers/hotel.handler";
import { ITripItCredentials } from "./types/ITripItTypes";
import {
  resourceOptions,
  operationOptions,
  tripProperties,
  flightProperties,
  hotelProperties,
  commonReservationProperties,
} from "./properties";

export class TripIt implements INodeType {
  description: INodeTypeDescription = {
    displayName: "TripIt",
    name: "tripIt",
    icon: "file:tripit.svg",
    group: ["transform"],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: "Interact with TripIt API",
    defaults: {
      name: "TripIt",
    },
    inputs: ["main"],
    outputs: ["main"],
    // usableAsTool: true,
    credentials: [
      {
        name: "tripitApi",
        required: true,
      },
    ],
    properties: [
      resourceOptions,
      ...operationOptions,
      ...tripProperties,
      ...flightProperties,
      ...hotelProperties,
      ...commonReservationProperties,
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const resource = this.getNodeParameter("resource", 0) as string;
    const operation = this.getNodeParameter("operation", 0) as string;
    const credentials = (await this.getCredentials(
      "tripitApi"
    )) as unknown as ITripItCredentials;

    const tripIt = new TripItApi();

    try {
      let returnData: INodeExecutionData[] = [];

      if (resource === "trip") {
        returnData = await handleTripOperation.call(
          this,
          tripIt,
          operation,
          credentials
        );
      }

      if (resource === "flight") {
        returnData = await handleFlightOperation.call(
          this,
          tripIt,
          operation,
          credentials
        );
      }

      if (resource === "hotel") {
        returnData = await handleHotelOperation.call(
          this,
          tripIt,
          operation,
          credentials
        );
      }

      return [returnData];
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new NodeOperationError(
          this.getNode(),
          `TripIt API error: ${error.response.data.message || error.message}`
        );
      }
      throw error;
    }
  }
}