import { TripItApi } from "./api";
import { ITripItCredentials } from "./types/ITripItTypes";
import orderObjectByKeys from "../../util/orderObjectByKeys";
import normalizeTime from "../../util/normalizeTime";
import {
  ACTIVITY_FIELD_ORDER,
  AIR_FIELD_ORDER,
  LODGING_FIELD_ORDER,
} from "../../interfaces/TripItInterfaces";
import { TRANSPORT_FIELD_ORDER } from "./handlers/transport.handler";

export interface ICreateTripParams {
  displayName: string;
  startDate: string;
  endDate: string;
  primaryLocation: string;
}

export interface IListTripsParams {
  past: boolean;
  pageSize: number;
  pageNum: number;
  modifiedSince: number;
  includeObjects: boolean;
  excludeTypes: string;
  traveler: string;
}

export interface ICreateActivityParams {
  tripId: string;
  displayName: string;
  startDate: string;
  startTime: string;
  timezone: string;
  endDate: string;
  endTime: string;
  locationName: string;
  address: string;
}

export interface ICreateFlightParams {
  tripId: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
  flightNumber: string;
  marketingAirline: string;
  operatingAirline?: string;
  seatAssignment?: string;
  aircraft?: string;
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
  isPurchased: boolean;
}

export interface ICreateHotelParams {
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
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
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
  isPurchased: boolean;
}

export interface ICreateTransportParams {
  tripId: string;
  isClientTraveler: string;
  isPurchased: string;
  isTripitBooking: string;
  hasPossibleCancellation: string;
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
}

export class TripItService {
  constructor(private api: TripItApi) {}

  async createTrip(credentials: ITripItCredentials, params: ICreateTripParams) {
    const endpoint = "/v1/create/trip/format/json";
    const data = {
      json: JSON.stringify({
        Trip: {
          display_name: params.displayName,
          start_date: params.startDate,
          end_date: params.endDate,
          primary_location: params.primaryLocation,
        },
      }),
    };

    const response = await this.api.makeApiRequest(
      "POST",
      endpoint,
      credentials,
      data
    );
    return response.data;
  }

  async listTrips(credentials: ITripItCredentials, params: IListTripsParams) {
    const endpoint = "/v1/list/trip";
    const queryParams = {
      format: "json",
      page_size: params.pageSize,
      page_num: params.pageNum,
      past: params.past.toString(),
      modified_since: params.modifiedSince,
      include_objects: params.includeObjects.toString(),
      exclude_types: params.excludeTypes,
      traveler: params.traveler,
    };

    const response = await this.api.makeApiRequest(
      "GET",
      endpoint,
      credentials,
      undefined,
      queryParams
    );
    return response.data;
  }

  async getTripWithObjects(credentials: ITripItCredentials, tripUuid: string) {
    const response = await this.api.getTripWithObjects(credentials, tripUuid);
    const data = await response.data;
    if (data.Profile) {
      delete data.Profile;
    }
    return data;
  }

  async createActivity(
    credentials: ITripItCredentials,
    params: ICreateActivityParams
  ) {
    const activityObj: any = {
      display_name: params.displayName,
      StartDateTime: {
        date: params.startDate,
        time: normalizeTime(params.startTime),
        timezone: params.timezone,
      },
      EndDateTime: {
        date: params.endDate,
        time: normalizeTime(params.endTime),
        timezone: params.timezone,
      },
      Address: {
        address: params.address,
      },
      location_name: params.locationName,
    };

    if (params.tripId.includes('-')) {
      activityObj.trip_uuid = params.tripId;
    } else {
      activityObj.trip_id = params.tripId;
    }

    const endpoint = "/v1/create/activity/format/json";
    const data = new URLSearchParams({
      json: JSON.stringify({
        ActivityObject: orderObjectByKeys(activityObj, ACTIVITY_FIELD_ORDER),
      }),
    });

    const response = await this.api.makeApiRequest(
      "POST",
      endpoint,
      credentials,
      data.toString()
    );
    return response.data;
  }

  async createFlight(
    credentials: ITripItCredentials,
    params: ICreateFlightParams
  ) {
    const airObj: any = {
      booking_rate: params.bookingRate,
      booking_site_conf_num: params.bookingSiteConfNum,
      booking_site_name: params.bookingSiteName,
      booking_site_phone: params.bookingSitePhone,
      booking_site_url: params.bookingSiteUrl,
      record_locator: params.recordLocator,
      supplier_conf_num: params.supplierConfNum,
      supplier_contact: params.supplierContact,
      supplier_email_address: params.supplierEmailAddress,
      supplier_phone: params.supplierPhone,
      supplier_url: params.supplierUrl,
      notes: params.notes,
      restrictions: params.restrictions,
      total_cost: params.totalCost,
      booking_date: params.bookingDate,
      is_purchased: params.isPurchased,
      Segment: [
        {
          marketing_airline: params.marketingAirline,
          marketing_flight_number: params.flightNumber,
          operating_airline: params.operatingAirline,
          aircraft: params.aircraft,
          seats: params.seatAssignment,
          StartDateTime: {
            date: params.departureTime.split("T")[0],
            time: normalizeTime(params.departureTime.split("T")[1]),
          },
          EndDateTime: {
            date: params.arrivalTime.split("T")[0],
            time: normalizeTime(params.arrivalTime.split("T")[1]),
          },
          start_airport_code: params.departureAirport,
          end_airport_code: params.arrivalAirport,
        },
      ],
    };

    if (params.tripId.includes('-')) {
      airObj.trip_uuid = params.tripId;
    } else {
      airObj.trip_id = params.tripId;
    }

    const endpoint = "/v1/create/air/format/json";
    const data = new URLSearchParams({
      json: JSON.stringify({
        AirObject: orderObjectByKeys(airObj, AIR_FIELD_ORDER),
      }),
    });

    const response = await this.api.makeApiRequest(
      "POST",
      endpoint,
      credentials,
      data.toString()
    );
    return response.data;
  }

  async createHotel(
    credentials: ITripItCredentials,
    params: ICreateHotelParams
  ) {
    const lodgingObject: any = {
      supplier_name: params.hotelName,
      supplier_conf_num: params.supplierConfNum,
      supplier_phone: params.supplierPhone,
      supplier_url: params.supplierUrl,
      booking_rate: params.bookingRate,
      booking_site_conf_num: params.bookingSiteConfNum,
      booking_site_name: params.bookingSiteName,
      booking_site_phone: params.bookingSitePhone,
      booking_site_url: params.bookingSiteUrl,
      record_locator: params.recordLocator,
      supplier_contact: params.supplierContact,
      supplier_email_address: params.supplierEmailAddress,
      notes: params.notes,
      restrictions: params.restrictions,
      total_cost: params.totalCost,
      booking_date: params.bookingDate,
      is_purchased: params.isPurchased,
      StartDateTime: {
        date: params.checkInDate,
        time: normalizeTime(params.checkInTime),
        timezone: params.timezone,
      },
      EndDateTime: {
        date: params.checkOutDate,
        time: normalizeTime(params.checkOutTime),
        timezone: params.timezone,
      },
      number_guests: params.numberGuests,
      number_rooms: params.numberRooms,
      room_type: params.roomType,
      Address: {
        address: params.street,
        city: params.city,
        state: params.state,
        zip: params.zip,
        country: params.country,
      },
    };

    if (params.tripId.includes('-')) {
      lodgingObject.trip_uuid = params.tripId;
    } else {
      lodgingObject.trip_id = params.tripId;
    }

    const endpoint = "/v1/create/lodging/format/json";
    const data = new URLSearchParams({
      json: JSON.stringify({
        LodgingObject: orderObjectByKeys(lodgingObject, LODGING_FIELD_ORDER),
      }),
    }).toString();

    const response = await this.api.makeApiRequest(
      "POST",
      endpoint,
      credentials,
      data
    );
    return response.data;
  }

  async createTransport(
    credentials: ITripItCredentials,
    params: ICreateTransportParams
  ) {
    const transportObj: {
      trip_uuid?: string;
      id?: string;
      is_client_traveler: string;
      is_purchased: string;
      is_tripit_booking: string;
      has_possible_cancellation: string;
      Segment: Array<{
        StartLocationAddress: {
          address: string;
          longitude: string;
          latitude: string;
        };
        StartDateTime: {
          date: string;
          time: string | undefined;
          timezone: string;
        };
        EndLocationAddress: {
          address: string;
          longitude: string;
          latitude: string;
        };
        EndDateTime: {
          date: string;
          time: string | undefined;
          timezone: string;
        };
        vehicle_description: string;
        start_location_name: string;
        number_passengers: string;
        end_location_name: string;
        confirmation_num: string;
        carrier_name: string;
      }>;
    } = {
      is_client_traveler: params.isClientTraveler,
      is_purchased: params.isPurchased,
      is_tripit_booking: params.isTripitBooking,
      has_possible_cancellation: params.hasPossibleCancellation,
      Segment: [
        {
          StartLocationAddress: {
            address: params.startAddress,
            longitude: "0",
            latitude: "0",
          },
          StartDateTime: {
            date: params.startDate,
            time: normalizeTime(params.startTime),
            timezone: params.timezone,
          },
          EndLocationAddress: {
            address: params.endAddress,
            longitude: "0",
            latitude: "0",
          },
          EndDateTime: {
            date: params.endDate,
            time: normalizeTime(params.endTime),
            timezone: params.timezone,
          },
          vehicle_description: params.vehicleDescription,
          start_location_name: params.startLocationName,
          number_passengers: params.numberPassengers,
          end_location_name: params.endLocationName,
          confirmation_num: params.confirmationNum,
          carrier_name: params.carrierName,
        },
      ],
    };

    if (params.tripId.includes("-")) {
      transportObj.trip_uuid = params.tripId;
    } else {
      transportObj.id = params.tripId;
    }

    const endpoint = "/v2/create/transport/format/json";
    const data = new URLSearchParams({
      json: JSON.stringify({
        TransportObject: orderObjectByKeys(transportObj, TRANSPORT_FIELD_ORDER),
      }),
    });

    const response = await this.api.makeApiRequest(
      "POST",
      endpoint,
      credentials,
      data.toString()
    );
    return response.data;
  }
}
