// Auto-generated sample data - Do not modify manually
import { ITransportLocation, ITransportSegment, ITransport, ITransportResponse, ICreateTransportParams, IUpdateTransportParams } from "./transport.interface";

export const transportLocationSample: ITransportLocation = {
  "address": "",
  "latitude": "",
  "longitude": "",
  "city": "",
  "state": "",
  "zip": "",
  "country": ""
};

export const transportSegmentSample: ITransportSegment = {
  "uuid": "",
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
  "StartLocationAddress": {
    "address": "",
    "latitude": "",
    "longitude": "",
    "city": "",
    "state": "",
    "zip": "",
    "country": ""
  },
  "EndLocationAddress": {
    "address": "",
    "latitude": "",
    "longitude": "",
    "city": "",
    "state": "",
    "zip": "",
    "country": ""
  },
  "start_location_name": "",
  "end_location_name": "",
  "carrier_name": "",
  "confirmation_num": "",
  "number_passengers": "",
  "vehicle_description": ""
};

export const transportSample: ITransport = {
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
  "has_possible_cancellation": false,
  "Segment": {
    "uuid": "",
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
    "StartLocationAddress": {
      "address": "",
      "latitude": "",
      "longitude": "",
      "city": "",
      "state": "",
      "zip": "",
      "country": ""
    },
    "EndLocationAddress": {
      "address": "",
      "latitude": "",
      "longitude": "",
      "city": "",
      "state": "",
      "zip": "",
      "country": ""
    },
    "start_location_name": "",
    "end_location_name": "",
    "carrier_name": "",
    "confirmation_num": "",
    "number_passengers": "",
    "vehicle_description": ""
  },
  "Traveler": {
    "first_name": "",
    "middle_name": "",
    "last_name": "",
    "frequent_traveler_num": "",
    "ticket_num": ""
  },
  "Image": []
};

export const transportSampleResponse: ITransportResponse = {
  "timestamp": "",
  "num_bytes": "",
  "Warning": {
    "description": "",
    "entity_type": "",
    "timestamp": ""
  },
  "TransportObject": {
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
    "has_possible_cancellation": false,
    "Segment": {
      "uuid": "",
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
      "StartLocationAddress": {
        "address": "",
        "latitude": "",
        "longitude": "",
        "city": "",
        "state": "",
        "zip": "",
        "country": ""
      },
      "EndLocationAddress": {
        "address": "",
        "latitude": "",
        "longitude": "",
        "city": "",
        "state": "",
        "zip": "",
        "country": ""
      },
      "start_location_name": "",
      "end_location_name": "",
      "carrier_name": "",
      "confirmation_num": "",
      "number_passengers": "",
      "vehicle_description": ""
    },
    "Traveler": {
      "first_name": "",
      "middle_name": "",
      "last_name": "",
      "frequent_traveler_num": "",
      "ticket_num": ""
    },
    "Image": []
  }
};

export const createCreateTransportParams: ICreateTransportParams = {
  "tripId": "",
  "timezone": "",
  "startAddress": "",
  "startDate": "",
  "startTime": "",
  "endAddress": "",
  "endDate": "",
  "endTime": "",
  "startLocationName": "",
  "endLocationName": "",
  "vehicleDescription": "",
  "confirmationNum": "",
  "carrierName": "",
  "numberPassengers": "",
  "isClientTraveler": false,
  "isPurchased": false,
  "isTripitBooking": false,
  "hasPossibleCancellation": false
};

export const updateUpdateTransportParams: IUpdateTransportParams = {
  "uuid": "",
  "tripId": "",
  "timezone": "",
  "startAddress": "",
  "startDate": "",
  "startTime": "",
  "endAddress": "",
  "endDate": "",
  "endTime": "",
  "startLocationName": "",
  "endLocationName": "",
  "vehicleDescription": "",
  "confirmationNum": "",
  "carrierName": "",
  "numberPassengers": "",
  "isClientTraveler": false,
  "isPurchased": false,
  "isTripitBooking": false,
  "hasPossibleCancellation": false,
  "Image": []
};

