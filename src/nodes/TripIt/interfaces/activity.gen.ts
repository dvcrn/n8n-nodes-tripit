// Auto-generated sample data - Do not modify manually
import { IParticipant, IActivity, IActivityResponse, ICreateActivityParams, IUpdateActivityParams } from "./activity.interface";

export const participantSample: IParticipant = {
  "first_name": "",
  "last_name": "",
  "frequent_traveler_num": "",
  "ticket_num": ""
};

export const activitySample: IActivity = {
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
  "Address": {
    "address": "",
    "city": "",
    "state": "",
    "zip": "",
    "country": "",
    "latitude": "",
    "longitude": "",
    "risk_level": ""
  },
  "location_name": "",
  "Agency": {
    "agency_conf_num": "",
    "agency_name": "",
    "agency_phone": "",
    "agency_email_address": "",
    "agency_url": "",
    "agency_contact": ""
  },
  "Participant": [],
  "Image": []
};

export const activitySampleResponse: IActivityResponse = {
  "timestamp": "",
  "num_bytes": "",
  "ActivityObject": {
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
    "Address": {
      "address": "",
      "city": "",
      "state": "",
      "zip": "",
      "country": "",
      "latitude": "",
      "longitude": "",
      "risk_level": ""
    },
    "location_name": "",
    "Agency": {
      "agency_conf_num": "",
      "agency_name": "",
      "agency_phone": "",
      "agency_email_address": "",
      "agency_url": "",
      "agency_contact": ""
    },
    "Participant": [],
    "Image": []
  }
};

export const createCreateActivityParams: ICreateActivityParams = {
  "tripId": "",
  "displayName": "",
  "startDate": "",
  "startTime": "",
  "endDate": "",
  "endTime": "",
  "timezone": "",
  "address": "",
  "locationName": ""
};

export const updateUpdateActivityParams: IUpdateActivityParams = {
  "uuid": "",
  "tripId": "",
  "displayName": "",
  "startDate": "",
  "startTime": "",
  "endDate": "",
  "endTime": "",
  "timezone": "",
  "address": "",
  "locationName": "",
  "Image": [],
  "isPurchased": ""
};

