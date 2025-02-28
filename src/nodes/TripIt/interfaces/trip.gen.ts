// Auto-generated sample data - Do not modify manually
import { ITrip, ITripResponse, ITripWithObjectsResponse, ICreateTripParams, IListTripsParams } from "./trip.interface";

export const tripSample: ITrip = {
  "id": "",
  "uuid": "",
  "display_name": "",
  "start_date": "",
  "end_date": "",
  "primary_location": "",
  "is_private": "",
  "trip_name": "",
  "image_url": "",
  "relative_url": "",
  "start_date_display": "",
  "end_date_display": "",
  "PrimaryLocationAddress": {
    "address": "",
    "city": "",
    "state": "",
    "zip": "",
    "country": "",
    "latitude": "",
    "longitude": "",
    "risk_level": ""
  },
  "is_pro_enabled": "",
  "last_modified": "",
  "is_concur_linked": "",
  "public_guid": "",
  "is_trip_owner_inner_circle_sharer": ""
};

export const tripSampleResponse: ITripResponse = {
  "timestamp": "",
  "num_bytes": "",
  "Trip": {
    "id": "",
    "uuid": "",
    "display_name": "",
    "start_date": "",
    "end_date": "",
    "primary_location": "",
    "is_private": "",
    "trip_name": "",
    "image_url": "",
    "relative_url": "",
    "start_date_display": "",
    "end_date_display": "",
    "PrimaryLocationAddress": {
      "address": "",
      "city": "",
      "state": "",
      "zip": "",
      "country": "",
      "latitude": "",
      "longitude": "",
      "risk_level": ""
    },
    "is_pro_enabled": "",
    "last_modified": "",
    "is_concur_linked": "",
    "public_guid": "",
    "is_trip_owner_inner_circle_sharer": ""
  }
};

export const tripWithObjectsSampleResponse: ITripWithObjectsResponse = {
  "ActivityObject": [],
  "LodgingObject": [],
  "TransportObject": [],
  "AirObject": [],
  "timestamp": "",
  "num_bytes": "",
  "Trip": {
    "id": "",
    "uuid": "",
    "display_name": "",
    "start_date": "",
    "end_date": "",
    "primary_location": "",
    "is_private": "",
    "trip_name": "",
    "image_url": "",
    "relative_url": "",
    "start_date_display": "",
    "end_date_display": "",
    "PrimaryLocationAddress": {
      "address": "",
      "city": "",
      "state": "",
      "zip": "",
      "country": "",
      "latitude": "",
      "longitude": "",
      "risk_level": ""
    },
    "is_pro_enabled": "",
    "last_modified": "",
    "is_concur_linked": "",
    "public_guid": "",
    "is_trip_owner_inner_circle_sharer": ""
  }
};

export const createCreateTripParams: ICreateTripParams = {
  "displayName": "",
  "startDate": "",
  "endDate": "",
  "primaryLocation": ""
};

export const listTripsSampleParams: IListTripsParams = {
  "pageSize": 0,
  "pageNum": 0,
  "past": false,
  "modifiedSince": 0,
  "includeObjects": false,
  "excludeTypes": "",
  "traveler": ""
};

