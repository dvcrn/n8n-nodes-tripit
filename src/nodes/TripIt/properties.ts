import { INodeProperties } from "n8n-workflow";

export const tripProperties: INodeProperties[] = [
  // Create operation properties
  {
    displayName: "Display Name",
    name: "displayName",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["trip"],
        operation: ["create"],
      },
    },
    description: "Trip Name",
  },
  {
    displayName: "Start Date",
    name: "startDate",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["trip"],
        operation: ["create"],
      },
    },
    description: "The Start Date of the trip",
  },
  {
    displayName: "End Date",
    name: "endDate",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["trip"],
        operation: ["create"],
      },
    },
    description: "The End Date of the trip",
  },
  {
    displayName: "Primary Location",
    name: "primaryLocation",
    type: "string",
    required: true,
    default: "Tokyo, Japan",
    displayOptions: {
      show: {
        resource: ["trip"],
        operation: ["create"],
      },
    },
    description: "Primary Location of the trip",
  },

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
  {
    displayName: "Include Past Trips",
    name: "past",
    type: "boolean",
    default: true,
    displayOptions: {
      show: {
        resource: ["trip"],
        operation: ["list"],
      },
    },
    description: "Whether to include past trips in the results",
  },
  {
    displayName: "Page Size",
    name: "pageSize",
    type: "number",
    default: 50,
    displayOptions: {
      show: {
        resource: ["trip"],
        operation: ["list"],
      },
    },
    description: "Number of trips to return per page",
  },
  {
    displayName: "Page Number",
    name: "pageNum",
    type: "number",
    default: 1,
    displayOptions: {
      show: {
        resource: ["trip"],
        operation: ["list"],
      },
    },
    description: "Page number to return",
  },
  {
    displayName: "Modified Since",
    name: "modifiedSince",
    type: "number",
    default: 0,
    displayOptions: {
      show: {
        resource: ["trip"],
        operation: ["list"],
      },
    },
    description: "Only return trips modified since this Unix timestamp",
  },
  {
    displayName: "Include Objects",
    name: "includeObjects",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["trip"],
        operation: ["list"],
      },
    },
    description: "Whether to include detailed objects in the response",
  },
  {
    displayName: "Traveler Filter",
    name: "traveler",
    type: "options",
    default: "all",
    options: [
      {
        name: "All",
        value: "all",
      },
      {
        name: "Only True",
        value: "true",
      },
      {
        name: "Only False",
        value: "false",
      },
    ],
    displayOptions: {
      show: {
        resource: ["trip"],
        operation: ["list"],
      },
    },
    description: "Filter trips by traveler status",
  },
  {
    displayName: "Exclude Types",
    name: "excludeTypes",
    type: "string",
    default: "weather",
    displayOptions: {
      show: {
        resource: ["trip"],
        operation: ["list"],
      },
    },
    description: "Comma-separated list of object types to exclude",
  },
];

export const transportProperties: INodeProperties[] = [
  {
    displayName: "Trip ID",
    name: "tripId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["addToTrip"],
      },
    },
    description: "The ID of the trip to add the transport to",
  },
  {
    displayName: "Is Client Traveler",
    name: "isClientTraveler",
    type: "string",
    required: true,
    default: "true",
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["addToTrip"],
      },
    },
    description: "Whether this is for the client traveler",
  },
  {
    displayName: "Is Purchased",
    name: "isPurchased",
    type: "string",
    required: true,
    default: "true",
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["addToTrip"],
      },
    },
    description: "Whether the transport has been purchased",
  },
  {
    displayName: "Is TripIt Booking",
    name: "isTripitBooking",
    type: "string",
    required: true,
    default: "false",
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["addToTrip"],
      },
    },
    description: "Whether this was booked through TripIt",
  },
  {
    displayName: "Has Possible Cancellation",
    name: "hasPossibleCancellation",
    type: "string",
    required: true,
    default: "false",
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["addToTrip"],
      },
    },
    description: "Whether the transport can be cancelled",
  },
  {
    displayName: "Start Address",
    name: "startAddress",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["addToTrip"],
      },
    },
    description: "The starting address",
  },
  {
    displayName: "Start Date",
    name: "startDate",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["addToTrip"],
      },
    },
    description: "The start date (YYYY-MM-DD)",
  },
  {
    displayName: "Start Time",
    name: "startTime",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["addToTrip"],
      },
    },
    description: "The start time (HH:mm:ss)",
  },
  {
    displayName: "End Address",
    name: "endAddress",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["addToTrip"],
      },
    },
    description: "The ending address",
  },
  {
    displayName: "End Date",
    name: "endDate",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["addToTrip"],
      },
    },
    description: "The end date (YYYY-MM-DD)",
  },
  {
    displayName: "End Time",
    name: "endTime",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["addToTrip"],
      },
    },
    description: "The end time (HH:mm:ss)",
  },
  {
    displayName: "Timezone",
    name: "timezone",
    type: "string",
    required: true,
    default: "UTC",
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["addToTrip"],
      },
    },
    description: "The timezone",
  },
  {
    displayName: "Start Location Name",
    name: "startLocationName",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["addToTrip"],
      },
    },
    description: "Name of the start location",
  },
  {
    displayName: "End Location Name",
    name: "endLocationName",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["addToTrip"],
      },
    },
    description: "Name of the end location",
  },
  {
    displayName: "Vehicle Description",
    name: "vehicleDescription",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["addToTrip"],
      },
    },
    description: "Description of the vehicle",
  },
  {
    displayName: "Confirmation Number",
    name: "confirmationNum",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["addToTrip"],
      },
    },
    description: "The confirmation number",
  },
  {
    displayName: "Carrier Name",
    name: "carrierName",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["addToTrip"],
      },
    },
    description: "Name of the carrier",
  },
  {
    displayName: "Number of Passengers",
    name: "numberPassengers",
    type: "string",
    required: true,
    default: "1",
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["addToTrip"],
      },
    },
    description: "Number of passengers",
  },
];

export const flightProperties: INodeProperties[] = [
  {
    displayName: "Departure Airport",
    name: "departureAirport",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["flight"],
        operation: ["addToTrip"],
      },
    },
    description: "The departure airport code (e.g., LAX)",
  },
  {
    displayName: "Arrival Airport",
    name: "arrivalAirport",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["flight"],
        operation: ["addToTrip"],
      },
    },
    description: "The arrival airport code (e.g., JFK)",
  },
  {
    displayName: "Departure Time",
    name: "departureTime",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["flight"],
        operation: ["addToTrip"],
      },
    },
    description: "The departure time (YYYY-MM-DDTHH:mm:ss)",
  },
  {
    displayName: "Arrival Time",
    name: "arrivalTime",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["flight"],
        operation: ["addToTrip"],
      },
    },
    description: "The arrival time (YYYY-MM-DDTHH:mm:ss)",
  },
  {
    displayName: "Flight Number",
    name: "flightNumber",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["flight"],
        operation: ["addToTrip", "getInfo"],
      },
    },
    description: "The flight number",
  },
  {
    displayName: "Marketing Airline",
    name: "marketingAirline",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["flight"],
        operation: ["addToTrip"],
      },
    },
    description: "The marketing airline code",
  },
  {
    displayName: "Operating Airline",
    name: "operatingAirline",
    type: "string",
    required: false,
    default: "",
    displayOptions: {
      show: {
        resource: ["flight"],
        operation: ["addToTrip"],
      },
    },
    description:
      "The operating airline code (if different from marketing airline)",
  },
  {
    displayName: "Seat Assignment",
    name: "seatAssignment",
    type: "string",
    required: false,
    default: "",
    displayOptions: {
      show: {
        resource: ["flight"],
        operation: ["addToTrip"],
      },
    },
    description: "The seat assignment",
  },
  {
    displayName: "Aircraft Type",
    name: "aircraft",
    type: "string",
    required: false,
    default: "",
    displayOptions: {
      show: {
        resource: ["flight"],
        operation: ["addToTrip"],
      },
    },
    description: "The aircraft type",
  },
];

export const activityProperties: INodeProperties[] = [
  {
    displayName: "Trip ID",
    name: "tripId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["addToTrip"],
      },
    },
    description: "The ID of the trip to add the activity to",
  },
  {
    displayName: "Display Name",
    name: "displayName",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["addToTrip"],
      },
    },
    description: "The name of the activity",
  },
  {
    displayName: "Start Date",
    name: "startDate",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["addToTrip"],
      },
    },
    description: "The start date of the activity (YYYY-MM-DD)",
  },
  {
    displayName: "Start Time",
    name: "startTime",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["addToTrip"],
      },
    },
    description: "The start time of the activity (HH:mm:ss)",
  },
  {
    displayName: "End Date",
    name: "endDate",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["addToTrip"],
      },
    },
    description: "The end date of the activity (YYYY-MM-DD)",
  },
  {
    displayName: "End Time",
    name: "endTime",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["addToTrip"],
      },
    },
    description: "The end time of the activity (HH:mm:ss)",
  },
  {
    displayName: "Timezone",
    name: "timezone",
    type: "string",
    required: true,
    default: "UTC",
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["addToTrip"],
      },
    },
    description: "The timezone of the activity",
  },
  {
    displayName: "Location Name",
    name: "locationName",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["addToTrip"],
      },
    },
    description: "The name of the activity location",
  },
  {
    displayName: "Address",
    name: "address",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["addToTrip"],
      },
    },
    description: "The address of the activity location",
  },
];

export const hotelProperties: INodeProperties[] = [
  {
    displayName: "Hotel Name",
    name: "hotelName",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["hotel"],
        operation: ["addToTrip"],
      },
    },
    description: "The name of the hotel",
  },
  {
    displayName: "Check-in Date",
    name: "checkInDate",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["hotel"],
        operation: ["addToTrip"],
      },
    },
    description: "The check-in date (YYYY-MM-DD)",
  },
  {
    displayName: "Check-out Date",
    name: "checkOutDate",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["hotel"],
        operation: ["addToTrip"],
      },
    },
    description: "The check-out date (YYYY-MM-DD)",
  },
  {
    displayName: "Check-in Time",
    name: "checkInTime",
    type: "string",
    default: "15:00:00",
    displayOptions: {
      show: {
        resource: ["hotel"],
        operation: ["addToTrip"],
      },
    },
    description: "The check-in time (HH:mm:ss)",
  },
  {
    displayName: "Check-out Time",
    name: "checkOutTime",
    type: "string",
    default: "11:00:00",
    displayOptions: {
      show: {
        resource: ["hotel"],
        operation: ["addToTrip"],
      },
    },
    description: "The check-out time (HH:mm:ss)",
  },
  {
    displayName: "Timezone",
    name: "timezone",
    type: "string",
    default: "UTC",
    displayOptions: {
      show: {
        resource: ["hotel"],
        operation: ["addToTrip"],
      },
    },
    description: "The timezone of the hotel",
  },
  {
    displayName: "Number of Guests",
    name: "numberGuests",
    type: "number",
    default: 1,
    displayOptions: {
      show: {
        resource: ["hotel"],
        operation: ["addToTrip"],
      },
    },
    description: "The number of guests",
  },
  {
    displayName: "Number of Rooms",
    name: "numberRooms",
    type: "number",
    default: 1,
    displayOptions: {
      show: {
        resource: ["hotel"],
        operation: ["addToTrip"],
      },
    },
    description: "The number of rooms",
  },
  {
    displayName: "Room Type",
    name: "roomType",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["hotel"],
        operation: ["addToTrip"],
      },
    },
    description: "The room type",
  },
  // Hotel Address Fields
  {
    displayName: "Street",
    name: "street",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["hotel"],
        operation: ["addToTrip"],
      },
    },
    description: "The street address of the hotel",
  },
  {
    displayName: "City",
    name: "city",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["hotel"],
        operation: ["addToTrip"],
      },
    },
    description: "The city where the hotel is located",
  },
  {
    displayName: "State",
    name: "state",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["hotel"],
        operation: ["addToTrip"],
      },
    },
    description: "The state where the hotel is located",
  },
  {
    displayName: "ZIP Code",
    name: "zip",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["hotel"],
        operation: ["addToTrip"],
      },
    },
    description: "The ZIP code of the hotel",
  },
  {
    displayName: "Country",
    name: "country",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["hotel"],
        operation: ["addToTrip"],
      },
    },
    description: "The country where the hotel is located",
  },
];

export const commonReservationProperties: INodeProperties[] = [
  {
    displayName: "Trip ID",
    name: "tripId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["flight", "hotel"],
        operation: ["addToTrip"],
      },
    },
    description: "The ID of the trip to add the flight/hotel to",
  },
  {
    displayName: "Booking Rate",
    name: "bookingRate",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["flight", "hotel"],
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
        resource: ["flight", "hotel"],
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
        resource: ["flight", "hotel"],
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
        resource: ["flight", "hotel"],
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
        resource: ["flight", "hotel"],
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
        resource: ["flight", "hotel"],
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
        resource: ["flight", "hotel"],
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
        resource: ["flight", "hotel"],
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
        resource: ["flight", "hotel"],
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
        resource: ["flight", "hotel"],
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
        resource: ["flight", "hotel"],
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
        resource: ["flight", "hotel"],
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
        resource: ["flight", "hotel"],
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
        resource: ["flight", "hotel"],
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
        resource: ["flight", "hotel"],
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
        resource: ["flight", "hotel"],
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
        resource: ["flight", "hotel"],
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
      {
        name: "Get Flight Info",
        value: "getInfo",
        description: "Get flight information",
        action: "Get flight information",
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
    ],
    default: "addToTrip",
  },
];
