import { IBaseUpdateParams, IBookingDetails, IImage } from "./common.interface";

export interface ICreateFlightParams extends IBookingDetails {
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

export interface IUpdateFlightParams
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
  Image?: IImage;
}
