import {
  IBaseTravelObject,
  IDateTime,
  IImage,
  IBookingDetails,
  IBaseUpdateParams,
  IWarning,
} from "./common.interface";

/**
 * Interface for flight segment information
 */
export interface IAirSegment {
  uuid?: string;
  marketing_airline: string;
  marketing_flight_number: string;
  operating_airline?: string;
  aircraft?: string;
  seats?: string;
  StartDateTime: IDateTime;
  EndDateTime: IDateTime;
  start_airport_code: string;
  end_airport_code: string;
}

/**
 * Interface representing a flight/air segment in TripIt
 */
export interface IAir extends IBaseTravelObject {
  Segment: IAirSegment[];
  Image?: IImage | IImage[];
}

/**
 * Interface for flight response from TripIt API
 */
export interface IAirResponse {
  timestamp?: string;
  num_bytes?: string;
  Warning?: IWarning;
  AirObject: IAir;
}

/**
 * Interface for creating a new flight booking
 */
export interface ICreateAirParams extends IBookingDetails {
  tripId: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
  flightNumber: string;
  marketingAirline: string;
  operatingAirline?: string;
  seatAssignment?: string;
  aircraft?: string;
}

/**
 * Interface for updating an existing flight booking
 */
export interface IUpdateAirParams
  extends IBaseUpdateParams,
    Partial<IBookingDetails> {
  departureAirport?: string;
  arrivalAirport?: string;
  departureTime?: string;
  arrivalTime?: string;
  flightNumber?: string;
  marketingAirline?: string;
  operatingAirline?: string;
  seatAssignment?: string;
  aircraft?: string;
}

// Aliases for backward compatibility
export type ICreateFlightParams = ICreateAirParams;
export type IUpdateFlightParams = IUpdateAirParams;
export type IFlightResponse = IAirResponse;
