import {
  IBaseTravelObject,
  IDateTime,
  IAddress,
  IImage,
  IBookingDetails,
  IBaseUpdateParams,
} from "./common.interface";

/**
 * Interface representing a lodging/hotel in TripIt
 */
export interface ILodging extends IBaseTravelObject {
  StartDateTime: IDateTime;
  EndDateTime: IDateTime;
  EstimatedStartDateTime?: IDateTime;
  Address: IAddress;
  number_guests?: string;
  number_rooms?: string;
  room_type?: string;
  Image?: IImage | IImage[];
}

/**
 * Interface for lodging response from TripIt API
 */
export interface ILodgingResponse {
  timestamp?: string;
  num_bytes?: string;
  Warning?: {
    description: string;
    entity_type: string;
    timestamp: string;
  };
  LodgingObject: ILodging;
}

/**
 * Interface for creating a new lodging booking
 * Note: number and boolean fields are converted to strings by the service
 */
export interface ICreateLodgingParams
  extends Omit<IBookingDetails, "isPurchased"> {
  tripId: string;
  hotelName: string;
  checkInDate: string;
  checkOutDate: string;
  checkInTime: string;
  checkOutTime: string;
  timezone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  numberGuests?: number;
  numberRooms?: number;
  roomType?: string;
  isPurchased?: boolean;
  notes?: string;
  totalCost?: string;
  bookingRate?: string;
  restrictions?: string;
}

/**
 * Interface for updating an existing lodging booking
 * Note: number and boolean fields are converted to strings by the service
 */
export interface IUpdateLodgingParams
  extends Omit<IBaseUpdateParams & Partial<IBookingDetails>, "isPurchased"> {
  hotelName?: string;
  checkInDate?: string;
  checkOutDate?: string;
  checkInTime?: string;
  checkOutTime?: string;
  timezone?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  numberGuests?: number;
  numberRooms?: number;
  roomType?: string;
  isPurchased?: boolean;
  notes?: string;
  totalCost?: string;
  bookingRate?: string;
  restrictions?: string;
  Image?: IImage | IImage[];
}

// Aliases for backward compatibility
export type ICreateHotelParams = ICreateLodgingParams;
export type IUpdateHotelParams = IUpdateLodgingParams;
export type IHotelResponse = ILodgingResponse;
