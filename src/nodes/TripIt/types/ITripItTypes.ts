import { IDataObject } from "n8n-workflow";

export interface ITripItCredentials {
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
}

export interface IDateTime {
  date: string;
  time: string;
  timezone?: string;
}

export interface IAddress {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

export interface IFlightSegment {
  start_airport_code: string;
  end_airport_code: string;
  StartDateTime: IDateTime;
  EndDateTime: IDateTime;
  marketing_airline: string;
  marketing_flight_number: string;
  operating_airline?: string;
  seat_assignment?: string;
  aircraft?: string;
}

export interface IReservationBase {
  trip_id: string;
  booking_rate?: string;
  booking_site_conf_num?: string;
  booking_site_name?: string;
  booking_site_phone?: string;
  booking_site_url?: string;
  record_locator?: string;
  supplier_conf_num?: string;
  supplier_contact?: string;
  supplier_email_address?: string;
  supplier_phone?: string;
  supplier_url?: string;
  notes?: string;
  restrictions?: string;
  total_cost?: string;
  cancellation_date_time?: string;
  booking_date?: string;
  is_purchased: boolean;
}

export interface IFlightReservation extends IReservationBase {
  Segment: IFlightSegment[];
}

export interface IHotelReservation extends IReservationBase {
  supplier_name: string;
  StartDateTime: IDateTime;
  EndDateTime: IDateTime;
  number_guests: number;
  number_rooms: number;
  room_type?: string;
  Address?: IAddress;
}

export interface IPrimaryLocationAddress {
  address: string;
  city: string;
  state?: string;
  country: string;
  latitude: string;
  longitude: string;
}

export interface ITripInvitee {
  "@attributes": {
    profile_ref: string;
  };
  is_read_only: string;
  is_traveler: string;
  is_owner: string;
}

export interface ITripInvitees {
  Invitee: ITripInvitee | ITripInvitee[];
}

export interface ITrip {
  id: string;
  relative_url: string;
  start_date: string;
  end_date: string;
  display_name: string;
  image_url: string;
  is_private: string;
  primary_location: string;
  PrimaryLocationAddress?: IPrimaryLocationAddress;
  TripInvitees: ITripInvitees;
  is_pro_enabled: string;
  TripPurposes?: {
    purpose_type_code: string;
    is_auto_generated: string;
  };
  last_modified: string;
  is_concur_linked: string;
  public_guid: string;
  is_trip_owner_inner_circle_sharer: string;
}

export interface ITripListResponse {
  timestamp: string;
  num_bytes: string;
  Trip: ITrip[];
  page_num: string;
  page_size: string;
  max_page: string;
}

export interface ITripItApiResponse extends IDataObject {
  // Add specific response types as needed
}
