import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
  NodeConnectionType,
  ISupplyDataFunctions,
  SupplyData,
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
  activityProperties,
  transportProperties,
} from "./properties";
import { handleActivityOperation } from "./handlers/activity.handler";
import { handleTransportOperation } from "./handlers/transport.handler";

export class TripIt implements INodeType {
  description: INodeTypeDescription = {
    displayName: "TripIt",
    name: "tripIt",
    icon: "file:tripit.svg",
    usableAsTool: true,
    group: ["transform"],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: "Interact with TripIt API",
    defaults: {
      name: "TripIt",
    },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
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
      ...activityProperties,
      ...transportProperties,
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

      if (resource === "activity") {
        returnData = await handleActivityOperation.call(
          this,
          tripIt,
          operation,
          credentials
        );
      }

      if (resource === "transport") {
        returnData = await handleTransportOperation.call(
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
