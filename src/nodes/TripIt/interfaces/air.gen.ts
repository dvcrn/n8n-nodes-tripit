// Auto-generated sample data - Do not modify manually
import { IAirSegment, IAir, IAirResponse, ICreateAirParams, IUpdateAirParams } from "./air.interface";

export const airSegmentSample: IAirSegment = {
  "uuid": "",
  "marketing_airline": "",
  "marketing_flight_number": "",
  "operating_airline": "",
  "aircraft": "",
  "seats": "",
  "StartDateTime": {
    "date": "",
    "time": "",
    "timezone": "",
    "utc_offset": "",
    "is_timezone_manual": ""
  },
  "EndDateTime": {
    "date": "",
    "time": "",
    "timezone": "",
    "utc_offset": "",
    "is_timezone_manual": ""
  },
  "start_airport_code": "",
  "end_airport_code": ""
};

export const airSample: IAir = {
  "id": "",
  "uuid": "",
  "trip_id": "",
  "trip_uuid": "",
  "is_client_traveler": false,
  "relative_url": "",
  "display_name": "",
  "is_display_name_auto_generated": "",
  "last_modified": "",
  "booking_rate": "",
  "booking_site_conf_num": "",
  "booking_site_name": "",
  "booking_site_phone": "",
  "booking_site_url": "",
  "supplier_conf_num": "",
  "supplier_contact": "",
  "supplier_email_address": "",
  "supplier_name": "",
  "supplier_phone": "",
  "supplier_url": "",
  "is_purchased": false,
  "notes": "",
  "restrictions": "",
  "total_cost": "",
  "is_tripit_booking": false,
  "is_concur_booked": "",
  "Segment": [],
  "Image": []
};

export const airSampleResponse: IAirResponse = {
  "timestamp": "",
  "num_bytes": "",
  "Warning": {
    "description": "",
    "entity_type": "",
    "timestamp": ""
  },
  "AirObject": {
    "id": "",
    "uuid": "",
    "trip_id": "",
    "trip_uuid": "",
    "is_client_traveler": false,
    "relative_url": "",
    "display_name": "",
    "is_display_name_auto_generated": "",
    "last_modified": "",
    "booking_rate": "",
    "booking_site_conf_num": "",
    "booking_site_name": "",
    "booking_site_phone": "",
    "booking_site_url": "",
    "supplier_conf_num": "",
    "supplier_contact": "",
    "supplier_email_address": "",
    "supplier_name": "",
    "supplier_phone": "",
    "supplier_url": "",
    "is_purchased": false,
    "notes": "",
    "restrictions": "",
    "total_cost": "",
    "is_tripit_booking": false,
    "is_concur_booked": "",
    "Segment": [],
    "Image": []
  }
};

export const createCreateAirParams: ICreateAirParams = {
  "bookingRate": "",
  "bookingSiteConfNum": "",
  "bookingSiteName": "",
  "bookingSitePhone": "",
  "bookingSiteUrl": "",
  "recordLocator": "",
  "supplierConfNum": "",
  "supplierContact": "",
  "supplierEmailAddress": "",
  "supplierPhone": "",
  "supplierUrl": "",
  "notes": "",
  "restrictions": "",
  "totalCost": "",
  "bookingDate": "",
  "isPurchased": false,
  "tripId": "",
  "departureAirport": "",
  "arrivalAirport": "",
  "departureTime": "",
  "arrivalTime": "",
  "flightNumber": "",
  "marketingAirline": "",
  "operatingAirline": "",
  "seatAssignment": "",
  "aircraft": ""
};

export const updateUpdateAirParams: IUpdateAirParams = {
  "uuid": "",
  "tripId": "",
  "isPurchased": false,
  "Image": [],
  "departureAirport": "",
  "arrivalAirport": "",
  "departureTime": "",
  "arrivalTime": "",
  "flightNumber": "",
  "marketingAirline": "",
  "operatingAirline": "",
  "seatAssignment": "",
  "aircraft": ""
};

