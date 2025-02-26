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
    displayName: "Start Date Time",
    name: "startDateTime",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["addToTrip"],
      },
    },
    description: "The start date and time (ISO format: YYYY-MM-DDTHH:MM:SS)",
  },
  {
    displayName: "Update Start Date Time",
    name: "update_startDateTime",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["update"],
      },
    },
    description: "Whether to update the start date and time",
  },
  {
    displayName: "Start Date Time",
    name: "startDateTime",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["update"],
        update_startDateTime: [true],
      },
    },
    description: "The new start date and time (ISO format: YYYY-MM-DDTHH:MM:SS)",
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
    displayName: "End Date Time",
    name: "endDateTime",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["addToTrip"],
      },
    },
    description: "The end date and time (ISO format: YYYY-MM-DDTHH:MM:SS)",
  },
  {
    displayName: "Update End Date Time",
    name: "update_endDateTime",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["update"],
      },
    },
    description: "Whether to update the end date and time",
  },
  {
    displayName: "End Date Time",
    name: "endDateTime",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["update"],
        update_endDateTime: [true],
      },
    },
    description: "The new end date and time (ISO format: YYYY-MM-DDTHH:MM:SS)",
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
    displayName: "Start Location",
    name: "startLocation",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["addToTrip"],
      },
    },
    description: "The start location",
  },
  {
    displayName: "Update Start Location",
    name: "update_startLocation",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["update"],
      },
    },
    description: "Whether to update the start location",
  },
  {
    displayName: "Start Location",
    name: "startLocation",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["update"],
        update_startLocation: [true],
      },
    },
    description: "The new start location",
  },
  {
    displayName: "End Location",
    name: "endLocation",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["addToTrip"],
      },
    },
    description: "The end location",
  },
  {
    displayName: "Update End Location",
    name: "update_endLocation",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["update"],
      },
    },
    description: "Whether to update the end location",
  },
  {
    displayName: "End Location",
    name: "endLocation",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["update"],
        update_endLocation: [true],
      },
    },
    description: "The new end location",
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
    displayName: "Update Vehicle Description",
    name: "update_vehicleDescription",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["update"],
      },
    },
    description: "Whether to update the vehicle description",
  },
  {
    displayName: "Vehicle Description",
    name: "vehicleDescription",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["update"],
        update_vehicleDescription: [true],
      },
    },
    description: "The new vehicle description",
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
  {
    displayName: "Transport Type",
    name: "transportType",
    type: "options",
    required: true,
    default: "car",
    options: [
      {
        name: "Car",
        value: "car",
      },
      {
        name: "Train",
        value: "train",
      },
      {
        name: "Bus",
        value: "bus",
      },
      {
        name: "Boat",
        value: "boat",
      },
      {
        name: "Other",
        value: "other",
      },
    ],
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["addToTrip"],
      },
    },
    description: "The type of transport",
  },
  {
    displayName: "Update Transport Type",
    name: "update_transportType",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["update"],
      },
    },
    description: "Whether to update the transport type",
  },
  {
    displayName: "Transport Type",
    name: "transportType",
    type: "options",
    default: "car",
    options: [
      {
        name: "Car",
        value: "car",
      },
      {
        name: "Train",
        value: "train",
      },
      {
        name: "Bus",
        value: "bus",
      },
      {
        name: "Boat",
        value: "boat",
      },
      {
        name: "Other",
        value: "other",
      },
    ],
    displayOptions: {
      show: {
        resource: ["transport"],
        operation: ["update"],
        update_transportType: [true],
      },
    },
    description: "The new type of transport",
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
    description: "The departure airport code (e.g., SFO)",
  },
  {
    displayName: "Update Departure Airport",
    name: "update_departureAirport",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["flight"],
        operation: ["update"],
      },
    },
    description: "Whether to update the departure airport",
  },
  {
    displayName: "Departure Airport",
    name: "departureAirport",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["flight"],
        operation: ["update"],
        update_departureAirport: [true],
      },
    },
    description: "The new departure airport code (e.g., SFO)",
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
    displayName: "Update Arrival Airport",
    name: "update_arrivalAirport",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["flight"],
        operation: ["update"],
      },
    },
    description: "Whether to update the arrival airport",
  },
  {
    displayName: "Arrival Airport",
    name: "arrivalAirport",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["flight"],
        operation: ["update"],
        update_arrivalAirport: [true],
      },
    },
    description: "The new arrival airport code (e.g., JFK)",
  },
  {
    displayName: "Departure Date Time",
    name: "departureDateTime",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["flight"],
        operation: ["addToTrip"],
      },
    },
    description: "The departure date and time (ISO format: YYYY-MM-DDTHH:MM:SS)",
  },
  {
    displayName: "Update Departure Date Time",
    name: "update_departureDateTime",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["flight"],
        operation: ["update"],
      },
    },
    description: "Whether to update the departure date and time",
  },
  {
    displayName: "Departure Date Time",
    name: "departureDateTime",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["flight"],
        operation: ["update"],
        update_departureDateTime: [true],
      },
    },
    description: "The new departure date and time (ISO format: YYYY-MM-DDTHH:MM:SS)",
  },
  {
    displayName: "Arrival Date Time",
    name: "arrivalDateTime",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["flight"],
        operation: ["addToTrip"],
      },
    },
    description: "The arrival date and time (ISO format: YYYY-MM-DDTHH:MM:SS)",
  },
  {
    displayName: "Update Arrival Date Time",
    name: "update_arrivalDateTime",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["flight"],
        operation: ["update"],
      },
    },
    description: "Whether to update the arrival date and time",
  },
  {
    displayName: "Arrival Date Time",
    name: "arrivalDateTime",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["flight"],
        operation: ["update"],
        update_arrivalDateTime: [true],
      },
    },
    description: "The new arrival date and time (ISO format: YYYY-MM-DDTHH:MM:SS)",
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
    displayName: "Update Flight Number",
    name: "update_flightNumber",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["flight"],
        operation: ["update"],
      },
    },
    description: "Whether to update the flight number",
  },
  {
    displayName: "Flight Number",
    name: "flightNumber",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["flight"],
        operation: ["update"],
        update_flightNumber: [true],
      },
    },
    description: "The new flight number",
  },
  {
    displayName: "Update Trip ID",
    name: "update_tripId",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["flight"],
        operation: ["update"],
      },
    },
    description: "Whether to update the trip ID",
  },
  {
    displayName: "Trip ID",
    name: "tripId",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["flight"],
        operation: ["update"],
        update_tripId: [true],
      },
    },
    description: "The new trip ID for the flight",
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
    displayName: "Update Marketing Airline",
    name: "update_marketingAirline",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["flight"],
        operation: ["update"],
      },
    },
    description: "Whether to update the marketing airline",
  },
  {
    displayName: "Marketing Airline",
    name: "marketingAirline",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["flight"],
        operation: ["update"],
        update_marketingAirline: [true],
      },
    },
    description: "The new marketing airline code",
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
    description: "The operating airline code (if different from marketing airline)",
  },
  {
    displayName: "Update Operating Airline",
    name: "update_operatingAirline",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["flight"],
        operation: ["update"],
      },
    },
    description: "Whether to update the operating airline",
  },
  {
    displayName: "Operating Airline",
    name: "operatingAirline",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["flight"],
        operation: ["update"],
        update_operatingAirline: [true],
      },
    },
    description: "The new operating airline code",
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
    displayName: "Update Trip ID",
    name: "update_tripId",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["update"],
      },
    },
    description: "Whether to update the trip ID",
  },
  {
    displayName: "Trip ID",
    name: "tripId",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["update"],
        update_tripId: [true],
      },
    },
    description: "The new trip ID for the activity",
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
    displayName: "Update Display Name",
    name: "update_displayName",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["update"],
      },
    },
    description: "Whether to update the display name",
  },
  {
    displayName: "Display Name",
    name: "displayName",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["update"],
        update_displayName: [true],
      },
    },
    description: "The new display name for the activity",
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
    displayName: "Update Start Date",
    name: "update_startDate",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["update"],
      },
    },
    description: "Whether to update the start date",
  },
  {
    displayName: "Start Date",
    name: "startDate",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["update"],
        update_startDate: [true],
      },
    },
    description: "The new start date for the activity (YYYY-MM-DD)",
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
    displayName: "Update Start Time",
    name: "update_startTime",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["update"],
      },
    },
    description: "Whether to update the start time",
  },
  {
    displayName: "Start Time",
    name: "startTime",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["update"],
        update_startTime: [true],
      },
    },
    description: "The new start time for the activity (HH:mm:ss)",
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
    displayName: "Update End Date",
    name: "update_endDate",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["update"],
      },
    },
    description: "Whether to update the end date",
  },
  {
    displayName: "End Date",
    name: "endDate",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["update"],
        update_endDate: [true],
      },
    },
    description: "The new end date for the activity (YYYY-MM-DD)",
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
    displayName: "Update End Time",
    name: "update_endTime",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["update"],
      },
    },
    description: "Whether to update the end time",
  },
  {
    displayName: "End Time",
    name: "endTime",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["update"],
        update_endTime: [true],
      },
    },
    description: "The new end time for the activity (HH:mm:ss)",
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
    displayName: "Update Timezone",
    name: "update_timezone",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["update"],
      },
    },
    description: "Whether to update the timezone",
  },
  {
    displayName: "Timezone",
    name: "timezone",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["update"],
        update_timezone: [true],
      },
    },
    description: "The new timezone for the activity",
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
    displayName: "Update Location Name",
    name: "update_locationName",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["update"],
      },
    },
    description: "Whether to update the location name",
  },
  {
    displayName: "Location Name",
    name: "locationName",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["update"],
        update_locationName: [true],
      },
    },
    description: "The new location name for the activity",
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
  {
    displayName: "Update Address",
    name: "update_address",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["update"],
      },
    },
    description: "Whether to update the address",
  },
  {
    displayName: "Address",
    name: "address",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["activity"],
        operation: ["update"],
        update_address: [true],
      },
    },
    description: "The new address for the activity",
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
    displayName: "Update Hotel Name",
    name: "update_hotelName",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["hotel"],
        operation: ["update"],
      },
    },
    description: "Whether to update the hotel name",
  },
  {
    displayName: "Hotel Name",
    name: "hotelName",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["hotel"],
        operation: ["update"],
        update_hotelName: [true],
      },
    },
    description: "The new name of the hotel",
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
    displayName: "Update Check-in Date",
    name: "update_checkInDate",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["hotel"],
        operation: ["update"],
      },
    },
    description: "Whether to update the check-in date",
  },
  {
    displayName: "Check-in Date",
    name: "checkInDate",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["hotel"],
        operation: ["update"],
        update_checkInDate: [true],
      },
    },
    description: "The new check-in date (YYYY-MM-DD)",
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
    displayName: "Update Check-out Date",
    name: "update_checkOutDate",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["hotel"],
        operation: ["update"],
      },
    },
    description: "Whether to update the check-out date",
  },
  {
    displayName: "Check-out Date",
    name: "checkOutDate",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["hotel"],
        operation: ["update"],
        update_checkOutDate: [true],
      },
    },
    description: "The new check-out date (YYYY-MM-DD)",
  },
  {
    displayName: "Check-in Time",
    name: "checkInTime",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["hotel"],
        operation: ["addToTrip"],
      },
    },
    description: "The check-in time (HH:MM)",
  },
  {
    displayName: "Update Check-in Time",
    name: "update_checkInTime",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["hotel"],
        operation: ["update"],
      },
    },
    description: "Whether to update the check-in time",
  },
  {
    displayName: "Check-in Time",
    name: "checkInTime",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["hotel"],
        operation: ["update"],
        update_checkInTime: [true],
      },
    },
    description: "The new check-in time (HH:MM)",
  },
  {
    displayName: "Check-out Time",
    name: "checkOutTime",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        resource: ["hotel"],
        operation: ["addToTrip"],
      },
    },
    description: "The check-out time (HH:MM)",
  },
  {
    displayName: "Update Check-out Time",
    name: "update_checkOutTime",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: ["hotel"],
        operation: ["update"],
      },
    },
    description: "Whether to update the check-out time",
  },
  {
    displayName: "Check-out Time",
    name: "checkOutTime",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: ["hotel"],
        operation: ["update"],
        update_checkOutTime: [true],
      },
    },
    description: "The new check-out time (HH:MM)",
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
      {
        name: "Update",
        value: "update",
        description: "Update a trip",
        action: "Update a trip",
      },
      {
        name: "Attach Document",
        value: "attachDocument",
        description: "Attach a document to a trip",
        action: "Attach a document to a trip",
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
