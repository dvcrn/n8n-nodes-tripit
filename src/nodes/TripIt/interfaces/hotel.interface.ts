import { IBaseUpdateParams, IBookingDetails, IImage } from "./common.interface";

// Common address fields that could be moved to common.interface.ts if needed by other types
export interface IAddress {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

export interface ICreateHotelParams extends IBookingDetails, IAddress {
  tripId: string;
  hotelName: string;
  checkInDate: string;
  checkOutDate: string;
  checkInTime: string;
  checkOutTime: string;
  timezone: string;
  numberGuests: number;
  numberRooms: number;
  roomType?: string;
}

export interface IUpdateHotelParams
  extends IBaseUpdateParams,
    Partial<IBookingDetails>,
    Partial<IAddress> {
  hotelName?: string;
  checkInDate?: string;
  checkOutDate?: string;
  checkInTime?: string;
  checkOutTime?: string;
  timezone?: string;
  numberGuests?: number;
  numberRooms?: number;
  roomType?: string;
  Image?: IImage;
}
