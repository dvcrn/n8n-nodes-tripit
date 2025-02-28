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
  createCreateActivityParams,
  updateUpdateActivityParams,
} from "./interfaces/activity.gen";
import {
  createCreateTransportParams,
  updateUpdateTransportParams,
} from "./interfaces/transport.gen";
import {
  createCreateAirParams,
  updateUpdateAirParams,
} from "./interfaces/air.gen";
import {
  createCreateLodgingParams,
  updateUpdateLodgingParams,
} from "./interfaces/lodging.gen";
import { TRANSPORT_FIELD_ORDER } from "./handlers/transport.handler";

import {
  createCreateTripParams,
  listTripsSampleParams,
} from "./interfaces/trip.gen";

const createTripProperties = generateProperties<ICreateTripParams>(
  createCreateTripParams,
  CREATE_TRIP_FIELD_ORDER, // todo update
  "create",
  "trip"
);

const listTripProperties = generateProperties<IListTripsParams>(
  listTripsSampleParams,
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
  createCreateTransportParams,
  TRANSPORT_FIELD_ORDER,
  "addToTrip",
  "transport"
);

// Generate transport properties for update operation
const updateTransportProperties = generateProperties<IUpdateTransportParams>(
  updateUpdateTransportParams,
  TRANSPORT_FIELD_ORDER,
  "update",
  "transport"
);

export const transportProperties: INodeProperties[] = [
  ...createTransportProperties,
  ...updateTransportProperties,
  {
    displayName: "Document Name",
    name: "documentName",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["transport"],
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
        resource: ["transport"],
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
        resource: ["transport"],
        operation: ["attachDocument"],
      },
    },
    description: "The MIME type of the document to attach",
  },
];

// Generate flight properties for create operation
const createFlightProperties = generateProperties<ICreateAirParams>(
  createCreateAirParams,
  AIR_FIELD_ORDER,
  "addToTrip",
  "flight"
);

// Generate flight properties for update operation
const updateFlightProperties = generateProperties<IUpdateAirParams>(
  updateUpdateAirParams,
  AIR_FIELD_ORDER,
  "update",
  "flight"
);

export const flightProperties: INodeProperties[] = [
  ...createFlightProperties,
  ...updateFlightProperties,
  {
    displayName: "Document Name",
    name: "documentName",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["flight"],
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
        resource: ["flight"],
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
        resource: ["flight"],
        operation: ["attachDocument"],
      },
    },
    description: "The MIME type of the document to attach",
  },
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
  createCreateActivityParams,
  ACTIVITY_FIELD_ORDER,
  "addToTrip",
  "activity"
);

// Generate activity properties for update operation
const updateActivityProperties = generateProperties<IUpdateActivityParams>(
  updateUpdateActivityParams,
  ACTIVITY_FIELD_ORDER,
  "update",
  "activity"
);

export const activityProperties: INodeProperties[] = [
  ...createActivityProperties,
  ...updateActivityProperties,
  {
    displayName: "Document Name",
    name: "documentName",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["activity"],
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
        resource: ["activity"],
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
        resource: ["activity"],
        operation: ["attachDocument"],
      },
    },
    description: "The MIME type of the document to attach",
  },
];

// Generate hotel properties for create operation
const createHotelProperties = generateProperties<ICreateLodgingParams>(
  createCreateLodgingParams,
  LODGING_FIELD_ORDER,
  "addToTrip",
  "hotel"
);

// Generate hotel properties for update operation
const updateHotelProperties = generateProperties<IUpdateLodgingParams>(
  updateUpdateLodgingParams,
  LODGING_FIELD_ORDER,
  "update",
  "hotel"
);

export const hotelProperties: INodeProperties[] = [
  ...createHotelProperties,
  ...updateHotelProperties,
  // Hotel Address Fields
  {
    displayName: "Document Name",
    name: "documentName",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["hotel"],
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
        resource: ["hotel"],
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
        resource: ["hotel"],
        operation: ["attachDocument"],
      },
    },
    description: "The MIME type of the document to attach",
  },
];

export const commonReservationProperties: INodeProperties[] = [
  {
    displayName: "Trip ID",
    name: "tripId",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        operation: ["addToTrip"],
      },
    },
    description: "The ID of the trip to add the reservation to",
  },
  {
    displayName: "UUID",
    name: "uuid",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        operation: ["update", "attachDocument"],
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
        operation: ["attachDocument"],
      },
    },
    description: "The MIME type of the document to attach",
  },
  {
    displayName: "Booking Rate",
    name: "bookingRate",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        operation: ["addToTrip"],
      },
    },
    description: "The booking rate",
  },
  {
    displayName: "Booking Site Confirmation Number",
    name: "bookingSiteConfNum",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        operation: ["addToTrip"],
      },
    },
    description: "The confirmation number from the booking site",
  },
  {
    displayName: "Booking Site Name",
    name: "bookingSiteName",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        operation: ["addToTrip"],
      },
    },
    description: "The name of the booking site",
  },
  {
    displayName: "Booking Site Phone",
    name: "bookingSitePhone",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        operation: ["addToTrip"],
      },
    },
    description: "The phone number of the booking site",
  },
  {
    displayName: "Booking Site URL",
    name: "bookingSiteUrl",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        operation: ["addToTrip"],
      },
    },
    description: "The URL of the booking site",
  },
  {
    displayName: "Record Locator",
    name: "recordLocator",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        operation: ["addToTrip"],
      },
    },
    description: "The record locator number",
  },
  {
    displayName: "Supplier Confirmation Number",
    name: "supplierConfNum",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        operation: ["addToTrip"],
      },
    },
    description: "The confirmation number from the supplier",
  },
  {
    displayName: "Supplier Contact",
    name: "supplierContact",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        operation: ["addToTrip"],
      },
    },
    description: "The contact information for the supplier",
  },
  {
    displayName: "Supplier Email",
    name: "supplierEmailAddress",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        operation: ["addToTrip"],
      },
    },
    description: "The email address of the supplier",
  },
  {
    displayName: "Supplier Phone",
    name: "supplierPhone",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        operation: ["addToTrip"],
      },
    },
    description: "The phone number of the supplier",
  },
  {
    displayName: "Supplier URL",
    name: "supplierUrl",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        operation: ["addToTrip"],
      },
    },
    description: "The URL of the supplier",
  },
  {
    displayName: "Notes",
    name: "notes",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        operation: ["addToTrip"],
      },
    },
    description: "Additional notes about the reservation",
  },
  {
    displayName: "Restrictions",
    name: "restrictions",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        operation: ["addToTrip"],
      },
    },
    description: "Any restrictions on the reservation",
  },
  {
    displayName: "Total Cost",
    name: "totalCost",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        operation: ["addToTrip"],
      },
    },
    description: "The total cost of the reservation",
  },
  {
    displayName: "Cancellation Date/Time",
    name: "cancellationDateTime",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        operation: ["addToTrip"],
      },
    },
    description: "The cancellation deadline (YYYY-MM-DDTHH:mm:ss)",
  },
  {
    displayName: "Booking Date",
    name: "bookingDate",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        operation: ["addToTrip"],
      },
    },
    description: "The date the reservation was booked (YYYY-MM-DD)",
  },
  {
    displayName: "Is Purchased",
    name: "isPurchased",
    type: "boolean",
    default: true,
    displayOptions: {
      show: {
        operation: ["addToTrip"],
      },
    },
    description: "Whether the reservation has been purchased",
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
