import { IActivity } from "./activity.interface";
import { IAir } from "./air.interface";
import { ILodging } from "./lodging.interface";
import { ITransport } from "./transport.interface";

/**
 * Interface representing a trip in TripIt
 */
export interface ITrip {
  id?: string;
  uuid?: string;
  display_name: string;
  start_date: string;
  end_date: string;
  primary_location?: string;
  is_private?: string;
  trip_name?: string;
  image_url?: string;
  relative_url?: string;
  start_date_display?: string;
  end_date_display?: string;
}

/**
 * Interface for trip response from TripIt API
 */
export interface ITripResponse {
  timestamp?: string;
  num_bytes?: string;
  Trip: ITrip;
}

/**
 * Interface for trip response with all objects
 */
export interface ITripWithObjectsResponse extends ITripResponse {
  ActivityObject?: IActivity[];
  LodgingObject?: ILodging[];
  TransportObject?: ITransport[];
  AirObject?: IAir[];
}

/**
 * Interface for creating a new trip
 */
export interface ICreateTripParams {
  displayName: string;
  startDate: string;
  endDate: string;
  primaryLocation?: string;
}

/**
 * Interface for listing trips
 */
export interface IListTripsParams {
  pageSize: number;
  pageNum: number;
  past: boolean;
  modifiedSince: number;
  includeObjects: boolean;
  excludeTypes?: string;
  traveler?: string;
}
