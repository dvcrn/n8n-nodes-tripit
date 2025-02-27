export const RESERVATION_FIELD_ORDER = [
  "uuid",
  "trip_uuid",
  "is_client_traveler",
  "relative_url",
  "display_name",
  "Image",
  // "is_display_name_auto_generated",
  // "last_modified",
  "cancellation_date_time",
  "booking_date",
  "booking_rate",
  "booking_site_conf_num",
  "booking_site_name",
  "booking_site_phone",
  "booking_site_url",
  // "record_locator",
  "supplier_conf_num",
  "supplier_contact",
  "supplier_email_address",
  "supplier_name",
  "supplier_phone",
  "supplier_url",
  "is_purchased",
  "notes",
  "restrictions",
  "total_cost",
] as const;

// Type-safe ordered keys
export type ReservationKeys = (typeof RESERVATION_FIELD_ORDER)[number];

export const DATE_TIME_FIELD_ORDER = [
  "date",
  "time",
  "timezone",
  "utc_offset",
  "is_timezone_manual",
] as const;

export const IMAGE_FIELD_ORDER = [
  "caption",
  "segment_uuid",
  "ImageData",
] as const;

export const ADDRESS_FIELD_ORDER = [
  "street",
  "city",
  "state",
  "zip",
  "country",
] as const;

export const LODGING_FIELD_ORDER = [
  ...RESERVATION_FIELD_ORDER,
  // "is_tripit_booking",
  // "has_possible_cancellation",
  // "is_concur_booked",
  // "EstimatedStartDateTime",
  "StartDateTime",
  "EndDateTime",
  "Address",
  "number_guests",
  "number_rooms",
] as const;

export const AIR_FIELD_ORDER = [
  ...RESERVATION_FIELD_ORDER,
  "Segment",
  "Traveler",
] as const;

export const AIR_SEGMENT_FIELD_ORDER = [
  "Status",
  "StartDateTime",
  "EndDateTime",
  "start_airport_code",
  "start_airport_name",
  "start_airport_latitude",
  "start_airport_longitude",
  "start_city_name",
  "start_country_code",
  "end_airport_code",
  "end_airport_name",
  "end_airport_latitude",
  "end_airport_longitude",
  "end_city_name",
  "end_country_code",
  "marketing_airline",
  "marketing_airline_code",
  "marketing_flight_number",
  "alternate_flights_url",
  "aircraft",
  "aircraft_display_name",
  "distance",
  "duration",
  "service_class",
  "stops",
  "check_in_url",
  "mobile_check_in_url",
  "refund_info_url",
  "change_reservation_url",
  "customer_support_url",
  "web_home_url",
  "is_eligible_seattracker",
  "is_hidden",
  "uuid",
  "is_international",
  "does_cross_idl",
] as const;
export interface ITraveler {
  name: string;
  email?: string;
}

export interface IAddress {
  street?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

export interface IDateTime {
  date?: string;
  time?: string;
  timezone?: string;
  utc_offset?: string;
  is_timezone_manual?: boolean;
}

export interface IReservationBase {
  cancellation_date_time?: string;
  booking_date?: string;
  booking_rate?: string;
  booking_site_conf_num?: string;
  booking_site_name?: string;
  booking_site_phone?: string;
  booking_site_url?: string;
  record_locator?: string;
  supplier_conf_num?: string;
  supplier_contact?: string;
  supplier_email_address?: string;
  supplier_name?: string;
  supplier_phone?: string;
  supplier_url?: string;
  is_purchased?: boolean;
  notes?: string;
  restrictions?: string;
  total_cost?: string;
}

export interface IFlightSegment {
  status?: any;
  start_airport_latitude?: string;
  start_airport_longitude?: string;
  end_airport_latitude?: string;
  end_airport_longitude?: string;
  marketing_airline_code?: string;
  operating_airline_code?: string;
  alternate_flights_url?: string;
  aircraft_display_name?: string;
  conflict_resolution_url?: string;
  is_hidden?: boolean;
  id?: string;
  start_city_name?: string;
  start_gate?: string;
  start_terminal?: string;
  end_city_name?: string;
  end_gate?: string;
  end_terminal?: string;
  marketing_airline?: string;
  marketing_flight_number?: string;
  operating_airline?: string;
  operating_flight_number?: string;
  aircraft?: string;
  distance?: string;
  duration?: string;
  entertainment?: string;
  meal?: string;
  notes?: string;
  ontime_perc?: string;
  seats?: string;
  service_class?: string;
  stops?: string;
  baggage_claim?: string;
  check_in_url?: string;
  StartDateTime?: IDateTime;
  EndDateTime?: IDateTime;
  start_airport_code?: string;
  end_airport_code?: string;
}

export interface IAirObject extends IReservationBase {
  trip_id: string;
  // flight_number: string;
  // departure_airport: string;
  // arrival_airport: string;
  // departure_time: string;
  // arrival_time: string;
  // marketing_airline: string;
  Segment: IFlightSegment[];
  // operating_airline?: string;
  // seat_assignment?: string;
  // distance?: string;
  // aircraft?: string;
}

export interface ILodgingObject extends IReservationBase {
  trip_id: string;
  StartDateTime?: IDateTime;
  EndDateTime?: IDateTime;
  check_in_date?: string;
  check_out_date?: string;
  check_in_time?: string;
  check_out_time?: string;
  timezone?: string;
  number_guests?: number;
  number_rooms?: number;
  room_type?: string;
  Address?: IAddress;
  guest?: ITraveler[];
}

export interface ITripItApiResponse {
  Trip?: {
    id: string;
    display_name: string;
    start_date: string;
    end_date: string;
    primary_location: string;
    description?: string;
  };
  AirObject?: {
    trip_id: string;
    Segment: IFlightSegment[];
  };
  LodgingObject?: {
    trip_id: string;
    is_client_traveler: string;
    supplier_name?: string;
    supplier_phone?: string;
    supplier_url?: string;
    is_purchased: string;
    is_tripit_booking: string;
    has_possible_cancellation: string;
    StartDateTime: IDateTime;
    EndDateTime: IDateTime;
    Address?: IAddress;
  };
}

export interface IAutocompletePlaceResult {
  label: string;
  id: string;
}

export interface IAutocompleteAirlineResult {
  label: string;
  id: string;
}

export interface IFlightInfo {
  orig_airport_code: string;
  orig_airport_display_name: string;
  orig_location_display_name: string;
  dest_airport_code: string;
  dest_airport_display_name: string;
  dest_location_display_name: string;
  departure_time: string;
  arrival_time: string;
  arrival_date_diff: string;
}

export interface IFlightInfoResponse {
  timestamp: string;
  num_bytes: string;
  FlightInfo: IFlightInfo;
}

export const ACTIVITY_FIELD_ORDER = [
  ...RESERVATION_FIELD_ORDER,
  "StartDateTime",
  "EndDateTime",
  "end_time",
  "Address",
  "Participant",
  "location_name",
] as const;

export interface IActivityObject extends IReservationBase {
  trip_id: string;
  display_name: string;
  booking_site_conf_num?: string;
  notes?: string;
  StartDateTime?: IDateTime;
  EndDateTime?: IDateTime;
  end_time?: string;
  Address?: IAddress;
  participant?: ITraveler[];
  detail_type_code?: string;
  location_name?: string;
}

export interface ICreateActivityRequest {
  ActivityObject: {
    trip_id: string;
    is_client_traveler: string;
    display_name: string;
    supplier_phone?: string;
    supplier_url?: string;
    is_purchased: string;
    is_tripit_booking: string;
    has_possible_cancellation?: boolean;
    StartDateTime: IDateTime;
    EndDateTime: IDateTime;
    Address: {
      longitude: string;
      latitude: string;
      address: string;
    };
    detail_type_code: string;
    location_name: string;
  };
}

export interface ICreateActivityResponse {
  timestamp: string;
  num_bytes: string;
  Warning?: Array<{
    description: string;
    entity_type: string;
    timestamp: string;
  }>;
  ActivityObject: {
    id: string;
    trip_id: string;
    is_client_traveler: string;
    relative_url: string;
    display_name: string;
    is_display_name_auto_generated: string;
    last_modified: string;
    is_purchased: string;
    is_tripit_booking: string;
    is_concur_booked: string;
    StartDateTime: IDateTime;
    EndDateTime: IDateTime;
    end_time: string;
    Address: IAddress & {
      latitude: string;
      longitude: string;
    };
    detail_type_code: string;
    location_name: string;
  };
}
