import { INodeProperties } from "n8n-workflow";
import {
  LODGING_FIELD_ORDER,
  ACTIVITY_FIELD_ORDER,
  AIR_FIELD_ORDER,
  CREATE_TRIP_FIELD_ORDER,
  LIST_TRIP_FIELD_ORDER,
} from "../../interfaces/TripItInterfaces";
import { generateProperties } from "./propertyUtils";
import {
  ICreateLodgingParams,
  ICreateTripParams,
  IListTripsParams,
  IUpdateLodgingParams,
} from "./interfaces";
import {
  ICreateActivityParams,
  IUpdateActivityParams,
} from "./interfaces/activity.interface";
import {
  ICreateTransportParams,
  IUpdateTransportParams,
} from "./interfaces/transport.interface";
import { ICreateAirParams, IUpdateAirParams } from "./interfaces/air.interface";
import {
  CreateTripParamsSchema,
  ListTripsParamsSchema,
} from "./interfaces/trip.gen";
import {
  CreateTransportParamsSchema,
  UpdateTransportParamsSchema,
} from "./interfaces/transport.gen";
import { TRANSPORT_FIELD_ORDER } from "./handlers/transport.handler";
import {
  CreateAirParamsSchema,
  UpdateAirParamsSchema,
} from "./interfaces/air.gen";
import {
  CreateActivityParamsSchema,
  UpdateActivityParamsSchema,
} from "./interfaces/activity.gen";
import {
  CreateLodgingParamsSchema,
  UpdateLodgingParamsSchema,
} from "./interfaces/lodging.gen";

const createTripProperties = generateProperties<ICreateTripParams>(
  CreateTripParamsSchema,
  CREATE_TRIP_FIELD_ORDER, // todo update
  "create",
  "trip"
);

const listTripProperties = generateProperties<IListTripsParams>(
  ListTripsParamsSchema,
  LIST_TRIP_FIELD_ORDER, // todo update
  "list",
  "trip"
);

export const tripProperties: INodeProperties[] = [
  ...createTripProperties,
  ...listTripProperties,

  // getWithObjects operation properties
  {
    displayName: "Trip UUID",
    name: "tripUuid",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["trip"],
        operation: ["getWithObjects"],
      },
    },
    description: "UUID of the trip to retrieve",
  },

  // list operation properties
  // {
  //   displayName: "Traveler Filter",
  //   name: "traveler",
  //   type: "options",
  //   default: "all",
  //   options: [
  //     {
  //       name: "All",
  //       value: "all",
  //     },
  //     {
  //       name: "Only True",
  //       value: "true",
  //     },
  //     {
  //       name: "Only False",
  //       value: "false",
  //     },
  //   ],
  //   displayOptions: {
  //     show: {
  //       resource: ["trip"],
  //       operation: ["list"],
  //     },
  //   },
  //   description: "Filter trips by traveler status",
  // },
];

console.log("tripProperties:", JSON.stringify(tripProperties, null, 2));
// Generate transport properties for create operation
const createTransportProperties = generateProperties<ICreateTransportParams>(
  CreateTransportParamsSchema,
  TRANSPORT_FIELD_ORDER,
  "addToTrip",
  "transport"
);

// Generate transport properties for update operation
const updateTransportProperties = generateProperties<IUpdateTransportParams>(
  UpdateTransportParamsSchema,
  TRANSPORT_FIELD_ORDER,
  "update",
  "transport"
);

export const transportProperties: INodeProperties[] = [
  ...createTransportProperties,
  ...updateTransportProperties,
];

// Generate flight properties for create operation
const createFlightProperties = generateProperties<ICreateAirParams>(
  CreateAirParamsSchema,
  AIR_FIELD_ORDER,
  "addToTrip",
  "flight"
);

// Generate flight properties for update operation
const updateFlightProperties = generateProperties<IUpdateAirParams>(
  UpdateAirParamsSchema,
  AIR_FIELD_ORDER,
  "update",
  "flight"
);

export const flightProperties: INodeProperties[] = [
  ...createFlightProperties,
  ...updateFlightProperties,
  // Additional flight-specific properties for getInfo operation
  // {
  //   displayName: "Flight Number",
  //   name: "flightNumber",
  //   type: "string",
  //   required: true,
  //   default: "",
  //   displayOptions: {
  //     show: {
  //       resource: ["flight"],
  //       operation: ["getInfo"],
  //     },
  //   },
  //   description: "The flight number to get information for",
  // },
];

// Generate activity properties for create operation
const createActivityProperties = generateProperties<ICreateActivityParams>(
  CreateActivityParamsSchema,
  ACTIVITY_FIELD_ORDER,
  "addToTrip",
  "activity"
);

// Generate activity properties for update operation
const updateActivityProperties = generateProperties<IUpdateActivityParams>(
  UpdateActivityParamsSchema,
  ACTIVITY_FIELD_ORDER,
  "update",
  "activity"
);

export const activityProperties: INodeProperties[] = [
  ...createActivityProperties,
  ...updateActivityProperties,
];

// Generate hotel properties for create operation
const createHotelProperties = generateProperties<ICreateLodgingParams>(
  CreateLodgingParamsSchema,
  LODGING_FIELD_ORDER,
  "addToTrip",
  "hotel"
);

// Generate hotel properties for update operation
const updateHotelProperties = generateProperties<IUpdateLodgingParams>(
  UpdateLodgingParamsSchema,
  LODGING_FIELD_ORDER,
  "update",
  "hotel"
);

export const hotelProperties: INodeProperties[] = [
  ...createHotelProperties,
  ...updateHotelProperties,
  // Hotel Address Fields
];

export const commonReservationProperties: INodeProperties[] = [
  {
    displayName: "Object UUID",
    name: "uuid",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["hotel", "flight", "activity", "transport"],
        operation: ["attachDocument"],
      },
    },
    description: "The UUID of the object to update or attach document to",
  },
  {
    displayName: "Document Name",
    name: "documentName",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["hotel", "flight", "activity", "transport"],
        operation: ["attachDocument"],
      },
    },
    description: "The name of the document to attach",
  },
  {
    displayName: "Document Content",
    name: "documentContent",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["hotel", "flight", "activity", "transport"],
        operation: ["attachDocument"],
      },
    },
    description: "The content of the document to attach (base64 encoded)",
  },
  {
    displayName: "Document Type",
    name: "documentType",
    type: "string",
    default: "application/pdf",
    displayOptions: {
      show: {
        resource: ["hotel", "flight", "activity", "transport"],
        operation: ["attachDocument"],
      },
    },
    description: "The MIME type of the document to attach",
  },
];

export const resourceOptions: INodeProperties = {
  displayName: "Resource",
  name: "resource",
  type: "options",
  noDataExpression: true,
  options: [
    {
      name: "Trip",
      value: "trip",
    },
    {
      name: "Flight",
      value: "flight",
    },
    {
      name: "Hotel",
      value: "hotel",
    },
    {
      name: "Activity",
      value: "activity",
    },
    {
      name: "Transport",
      value: "transport",
    },
  ],
  default: "trip",
};

export const operationOptions: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["trip"],
      },
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a new trip",
        action: "Create a trip",
      },
      {
        name: "List",
        value: "list",
        description: "List all trips",
        action: "List all trips",
      },
      {
        name: "Get With Objects",
        value: "getWithObjects",
        description: "Get a trip with all its objects",
        action: "Get a trip with all its objects",
      },
    ],
    default: "create",
  },
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["flight"],
      },
    },
    options: [
      {
        name: "Add to Trip",
        value: "addToTrip",
        description: "Add a flight to an existing trip",
        action: "Add a flight to a trip",
      },
      // {
      //   name: "Get Flight Info",
      //   value: "getInfo",
      //   description: "Get flight information",
      //   action: "Get flight information",
      // },
      {
        name: "Update",
        value: "update",
        description: "Update a flight",
        action: "Update a flight",
      },
      {
        name: "Attach Document",
        value: "attachDocument",
        description: "Attach a document to a flight",
        action: "Attach a document to a flight",
      },
    ],
    default: "addToTrip",
  },
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["hotel"],
      },
    },
    options: [
      {
        name: "Add to Trip",
        value: "addToTrip",
        description: "Add a hotel to an existing trip",
        action: "Add a hotel to a trip",
      },
      {
        name: "Update",
        value: "update",
        description: "Update a hotel",
        action: "Update a hotel",
      },
      {
        name: "Attach Document",
        value: "attachDocument",
        description: "Attach a document to a hotel",
        action: "Attach a document to a hotel",
      },
    ],
    default: "addToTrip",
  },
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["activity"],
      },
    },
    options: [
      {
        name: "Add to Trip",
        value: "addToTrip",
        description: "Add a activity to an existing trip",
        action: "Add a activity to a trip",
      },
      {
        name: "Update",
        value: "update",
        description: "Update an activity",
        action: "Update an activity",
      },
      {
        name: "Attach Document",
        value: "attachDocument",
        description: "Attach a document to an activity",
        action: "Attach a document to an activity",
      },
    ],
    default: "addToTrip",
  },
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["transport"],
      },
    },
    options: [
      {
        name: "Add to Trip",
        value: "addToTrip",
        description: "Add a transport to an existing trip",
        action: "Add a transport to a trip",
      },
      {
        name: "Update",
        value: "update",
        description: "Update a transport",
        action: "Update a transport",
      },
      {
        name: "Attach Document",
        value: "attachDocument",
        description: "Attach a document to a transport",
        action: "Attach a document to a transport",
      },
    ],
    default: "addToTrip",
  },
];
