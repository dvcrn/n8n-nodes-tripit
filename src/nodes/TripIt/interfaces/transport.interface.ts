import {
  IBaseTravelObject,
  IDateTime,
  IAddress,
  IImage,
  ITraveler,
  IWarning,
} from "./common.interface";

/**
 * Interface for transport segment location information
 */
export interface ITransportLocation {
  address: string;
  latitude?: string;
  longitude?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

/**
 * Interface for transport segment information
 */
export interface ITransportSegment {
  uuid?: string;
  StartDateTime: IDateTime;
  EndDateTime: IDateTime;
  StartLocationAddress: ITransportLocation;
  EndLocationAddress: ITransportLocation;
  start_location_name?: string;
  end_location_name?: string;
  carrier_name?: string;
  confirmation_num?: string;
  number_passengers?: string;
  vehicle_description?: string;
}

/**
 * Interface representing a transport booking in TripIt
 */
export interface ITransport extends IBaseTravelObject {
  is_client_traveler?: boolean;
  is_purchased?: boolean;
  is_tripit_booking?: boolean;
  has_possible_cancellation?: boolean;
  Segment: ITransportSegment;
  Traveler?: ITraveler;
  Image?: IImage | IImage[];
}

/**
 * Interface for transport response from TripIt API
 */
export interface ITransportResponse {
  timestamp?: string;
  num_bytes?: string;
  Warning?: IWarning;
  TransportObject: ITransport;
}

/**
 * Interface for creating a new transport booking
 */
export interface ICreateTransportParams {
  tripId: string;
  timezone: string;
  startAddress: string;
  startDate: string;
  startTime: string;
  endAddress: string;
  endDate: string;
  endTime: string;
  startLocationName: string;
  endLocationName: string;
  vehicleDescription: string;
  confirmationNum: string;
  carrierName: string;
  numberPassengers: string;
  isClientTraveler?: boolean;
  isPurchased?: boolean;
  isTripitBooking?: boolean;
  hasPossibleCancellation?: boolean;
}

/**
 * Interface for updating an existing transport booking
 */
export interface IUpdateTransportParams {
  uuid: string;
  tripId?: string;
  timezone?: string;
  startAddress?: string;
  startDate?: string;
  startTime?: string;
  endAddress?: string;
  endDate?: string;
  endTime?: string;
  startLocationName?: string;
  endLocationName?: string;
  vehicleDescription?: string;
  confirmationNum?: string;
  carrierName?: string;
  numberPassengers?: string;
  isClientTraveler?: boolean;
  isPurchased?: boolean;
  isTripitBooking?: boolean;
  hasPossibleCancellation?: boolean;
  Image?: IImage | IImage[];
}
