/**
 * Common interface for date and time information
 */
export interface IDateTime {
  date: string;
  time: string;
  timezone: string;
  utc_offset?: string;
  is_timezone_manual?: string;
}

/**
 * Common interface for address information
 */
export interface IAddress {
  address: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  latitude?: string;
  longitude?: string;
  risk_level?: string;
}

export interface IImageData {
  content: string;
  mime_type: string;
}

/**
 * Common interface for image attachments
 */
export interface IImage {
  url?: string;
  caption?: string;
  id?: string;
  uuid?: string;
  thumbnail_url?: string;
  ImageData?: IImageData;
  segment_uuid?: string; // Used in flight segments
}

/**
 * Common interface for agency information
 */
export interface IAgency {
  agency_conf_num?: string;
  agency_name?: string;
  agency_phone?: string;
  agency_email_address?: string;
  agency_url?: string;
  agency_contact?: string;
}

/**
 * Common interface for warning information
 */
export interface IWarning {
  description: string;
  entity_type: string;
  timestamp: string;
}

/**
 * Base interface for travel objects with common fields
 */
export interface IBaseTravelObject {
  id?: string;
  uuid?: string;
  trip_id?: string;
  trip_uuid?: string;
  is_client_traveler?: boolean;
  relative_url?: string;
  display_name: string;
  is_display_name_auto_generated?: string;
  last_modified?: string;
  booking_rate?: string;
  booking_site_conf_num?: string;
  booking_site_name?: string;
  booking_site_phone?: string;
  booking_site_url?: string;
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
  is_tripit_booking?: boolean;
  is_concur_booked?: string;
}

/**
 * Common interface for traveler information
 */
export interface ITraveler {
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  frequent_traveler_num?: string;
  ticket_num?: string;
}

/**
 * Common interface for booking details
 */
export interface IBookingDetails {
  bookingRate?: string;
  bookingSiteConfNum?: string;
  bookingSiteName?: string;
  bookingSitePhone?: string;
  bookingSiteUrl?: string;
  recordLocator?: string;
  supplierConfNum?: string;
  supplierContact?: string;
  supplierEmailAddress?: string;
  supplierPhone?: string;
  supplierUrl?: string;
  notes?: string;
  restrictions?: string;
  totalCost?: string;
  bookingDate?: string;
  isPurchased?: boolean;
}

/**
 * Base interface for update parameters
 */
export interface IBaseUpdateParams {
  uuid: string;
  tripId?: string;
  isPurchased?: boolean;
  Image?: IImage | IImage[];
}

/**
 * Base interface for create parameters
 */
export interface IBaseCreateParams {
  tripId: string;
  isPurchased?: boolean;
}

/**
 * Status fields interface
 */
export interface IStatusFields {
  is_client_traveler?: boolean;
  is_purchased?: boolean;
  is_tripit_booking?: boolean;
  has_possible_cancellation?: boolean;
}
