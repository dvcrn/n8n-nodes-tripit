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

export interface IUpdateHotelParams {
  uuid: string;
  tripId?: string;
  hotelName?: string;
  checkInDate?: string;
  checkOutDate?: string;
  checkInTime?: string;
  checkOutTime?: string;
  timezone?: string;
  numberGuests?: number;
  numberRooms?: number;
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
  isPurchased?: boolean;
}

export interface IUpdateActivityParams {
  uuid: string;
  tripId?: string;
  displayName?: string;
  startDate?: string;
  startTime?: string;
  timezone?: string;
  endDate?: string;
  endTime?: string;
  locationName?: string;
  address?: string;
}

export interface IUpdateFlightParams {
  uuid: string;
  tripId?: string;
  departureAirport?: string;
  arrivalAirport?: string;
  departureTime?: string;
  arrivalTime?: string;
  flightNumber?: string;
  marketingAirline?: string;
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
  isPurchased?: boolean;
}

export interface IUpdateTransportParams {
  uuid: string;
  tripId?: string;
  isClientTraveler?: string;
  isPurchased?: string;
  isTripitBooking?: string;
  hasPossibleCancellation?: string;
  timezone?: string;
  startAddress?: string;
  startDate?: string;
  startTime?: string;
  endAddress?: string;
  endDate?: string;
  endTime?: string;
  startLocationName?: string;
  endLocationName?: string;
  vehicleDescription?: string;
  confirmationNum?: string;
  carrierName?: string;
  numberPassengers?: string;
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

    if (params.tripId.includes("-")) {
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

    if (params.tripId.includes("-")) {
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

    if (params.tripId.includes("-")) {
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

  async updateHotel(
    credentials: ITripItCredentials,
    params: IUpdateHotelParams
  ) {
    const lodgingObject: any = {
      uuid: params.uuid,
    };

    if (!params.tripId) {
      throw new Error("tripId is required");
    }

    if (params.tripId.includes("-")) {
      lodgingObject.trip_uuid = params.tripId;
    } else {
      lodgingObject.trip_id = params.tripId;
    }

    if (params.hotelName) lodgingObject.supplier_name = params.hotelName;
    if (params.supplierConfNum)
      lodgingObject.supplier_conf_num = params.supplierConfNum;
    if (params.supplierPhone)
      lodgingObject.supplier_phone = params.supplierPhone;
    if (params.supplierUrl) lodgingObject.supplier_url = params.supplierUrl;
    if (params.bookingRate) lodgingObject.booking_rate = params.bookingRate;
    if (params.bookingSiteConfNum)
      lodgingObject.booking_site_conf_num = params.bookingSiteConfNum;
    if (params.bookingSiteName)
      lodgingObject.booking_site_name = params.bookingSiteName;
    if (params.bookingSitePhone)
      lodgingObject.booking_site_phone = params.bookingSitePhone;
    if (params.bookingSiteUrl)
      lodgingObject.booking_site_url = params.bookingSiteUrl;
    if (params.recordLocator)
      lodgingObject.record_locator = params.recordLocator;
    if (params.supplierContact)
      lodgingObject.supplier_contact = params.supplierContact;
    if (params.supplierEmailAddress)
      lodgingObject.supplier_email_address = params.supplierEmailAddress;
    if (params.notes) lodgingObject.notes = params.notes;
    if (params.restrictions) lodgingObject.restrictions = params.restrictions;
    if (params.totalCost) lodgingObject.total_cost = params.totalCost;
    if (params.bookingDate) lodgingObject.booking_date = params.bookingDate;
    if (params.isPurchased !== undefined)
      lodgingObject.is_purchased = params.isPurchased;

    if (params.checkInDate || params.checkInTime || params.timezone) {
      lodgingObject.StartDateTime = {
        ...(params.checkInDate && { date: params.checkInDate }),
        ...(params.checkInTime && { time: normalizeTime(params.checkInTime) }),
        ...(params.timezone && { timezone: params.timezone }),
      };
    }

    if (params.checkOutDate || params.checkOutTime || params.timezone) {
      lodgingObject.EndDateTime = {
        ...(params.checkOutDate && { date: params.checkOutDate }),
        ...(params.checkOutTime && {
          time: normalizeTime(params.checkOutTime),
        }),
        ...(params.timezone && { timezone: params.timezone }),
      };
    }

    if (params.numberGuests !== undefined)
      lodgingObject.number_guests = params.numberGuests;
    if (params.numberRooms !== undefined)
      lodgingObject.number_rooms = params.numberRooms;
    if (params.roomType) lodgingObject.room_type = params.roomType;

    if (
      params.street ||
      params.city ||
      params.state ||
      params.zip ||
      params.country
    ) {
      lodgingObject.Address = {
        ...(params.street && { address: params.street }),
        ...(params.city && { city: params.city }),
        ...(params.state && { state: params.state }),
        ...(params.zip && { zip: params.zip }),
        ...(params.country && { country: params.country }),
      };
    }

    console.log(lodgingObject);

    const endpoint = "/v2/replace/lodging/uuid/" + params.uuid + "/format/json";
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

  async updateActivity(
    credentials: ITripItCredentials,
    params: IUpdateActivityParams
  ) {
    const activityObj: any = {
      uuid: params.uuid,
    };

    if (params.displayName) activityObj.display_name = params.displayName;

    if (params.startDate || params.startTime || params.timezone) {
      activityObj.StartDateTime = {
        ...(params.startDate && { date: params.startDate }),
        ...(params.startTime && { time: normalizeTime(params.startTime) }),
        ...(params.timezone && { timezone: params.timezone }),
      };
    }

    if (params.endDate || params.endTime || params.timezone) {
      activityObj.EndDateTime = {
        ...(params.endDate && { date: params.endDate }),
        ...(params.endTime && { time: normalizeTime(params.endTime) }),
        ...(params.timezone && { timezone: params.timezone }),
      };
    }

    if (params.address) activityObj.address = params.address;
    if (params.locationName) activityObj.location_name = params.locationName;

    if (params.tripId) {
      if (params.tripId.includes("-")) {
        activityObj.trip_uuid = params.tripId;
      } else {
        activityObj.trip_id = params.tripId;
      }
    }

    const endpoint =
      "/v2/replace/activity/uuid/" + params.uuid + "/format/json";
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

  async updateFlight(
    credentials: ITripItCredentials,
    params: IUpdateFlightParams
  ) {
    const airObj: any = {
      uuid: params.uuid,
    };

    if (params.bookingRate) airObj.booking_rate = params.bookingRate;
    if (params.bookingSiteConfNum)
      airObj.booking_site_conf_num = params.bookingSiteConfNum;
    if (params.bookingSiteName)
      airObj.booking_site_name = params.bookingSiteName;
    if (params.bookingSitePhone)
      airObj.booking_site_phone = params.bookingSitePhone;
    if (params.bookingSiteUrl) airObj.booking_site_url = params.bookingSiteUrl;
    if (params.recordLocator) airObj.record_locator = params.recordLocator;
    if (params.supplierConfNum)
      airObj.supplier_conf_num = params.supplierConfNum;
    if (params.supplierContact)
      airObj.supplier_contact = params.supplierContact;
    if (params.supplierEmailAddress)
      airObj.supplier_email_address = params.supplierEmailAddress;
    if (params.supplierPhone) airObj.supplier_phone = params.supplierPhone;
    if (params.supplierUrl) airObj.supplier_url = params.supplierUrl;
    if (params.notes) airObj.notes = params.notes;
    if (params.restrictions) airObj.restrictions = params.restrictions;
    if (params.totalCost) airObj.total_cost = params.totalCost;
    if (params.bookingDate) airObj.booking_date = params.bookingDate;
    if (params.isPurchased !== undefined)
      airObj.is_purchased = params.isPurchased;

    if (
      params.departureTime ||
      params.departureAirport ||
      params.arrivalTime ||
      params.arrivalAirport ||
      params.marketingAirline ||
      params.flightNumber ||
      params.operatingAirline ||
      params.aircraft ||
      params.seatAssignment
    ) {
      airObj.Segment = [
        {
          ...(params.marketingAirline && {
            marketing_airline: params.marketingAirline,
          }),
          ...(params.flightNumber && {
            marketing_flight_number: params.flightNumber,
          }),
          ...(params.operatingAirline && {
            operating_airline: params.operatingAirline,
          }),
          ...(params.aircraft && { aircraft: params.aircraft }),
          ...(params.seatAssignment && { seats: params.seatAssignment }),
        },
      ];

      if (params.departureTime) {
        airObj.Segment[0].StartDateTime = {
          date: params.departureTime.split("T")[0],
          time: normalizeTime(params.departureTime.split("T")[1]),
        };
      }

      if (params.arrivalTime) {
        airObj.Segment[0].EndDateTime = {
          date: params.arrivalTime.split("T")[0],
          time: normalizeTime(params.arrivalTime.split("T")[1]),
        };
      }

      if (params.departureAirport)
        airObj.Segment[0].start_airport_code = params.departureAirport;
      if (params.arrivalAirport)
        airObj.Segment[0].end_airport_code = params.arrivalAirport;
    }

    if (params.tripId) {
      if (params.tripId.includes("-")) {
        airObj.trip_uuid = params.tripId;
      } else {
        airObj.trip_id = params.tripId;
      }
    }

    const endpoint = "/v2/replace/air/uuid/" + params.uuid + "/format/json";
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

  async updateTransport(
    credentials: ITripItCredentials,
    params: IUpdateTransportParams
  ) {
    const transportObj: any = {
      uuid: params.uuid,
    };

    if (params.isClientTraveler)
      transportObj.is_client_traveler = params.isClientTraveler;
    if (params.isPurchased) transportObj.is_purchased = params.isPurchased;
    if (params.isTripitBooking)
      transportObj.is_tripit_booking = params.isTripitBooking;
    if (params.hasPossibleCancellation)
      transportObj.has_possible_cancellation = params.hasPossibleCancellation;

    const segmentUpdated =
      params.startAddress ||
      params.startDate ||
      params.startTime ||
      params.endAddress ||
      params.endDate ||
      params.endTime ||
      params.startLocationName ||
      params.endLocationName ||
      params.vehicleDescription ||
      params.confirmationNum ||
      params.carrierName ||
      params.numberPassengers;

    if (segmentUpdated) {
      transportObj.Segment = [{}];

      if (params.startAddress) {
        transportObj.Segment[0].StartLocationAddress = {
          address: params.startAddress,
          longitude: "0",
          latitude: "0",
        };
      }

      if (params.startDate || params.startTime || params.timezone) {
        transportObj.Segment[0].StartDateTime = {
          ...(params.startDate && { date: params.startDate }),
          ...(params.startTime && { time: normalizeTime(params.startTime) }),
          ...(params.timezone && { timezone: params.timezone }),
        };
      }

      if (params.endAddress) {
        transportObj.Segment[0].EndLocationAddress = {
          address: params.endAddress,
          longitude: "0",
          latitude: "0",
        };
      }

      if (params.endDate || params.endTime || params.timezone) {
        transportObj.Segment[0].EndDateTime = {
          ...(params.endDate && { date: params.endDate }),
          ...(params.endTime && { time: normalizeTime(params.endTime) }),
          ...(params.timezone && { timezone: params.timezone }),
        };
      }

      if (params.vehicleDescription)
        transportObj.Segment[0].vehicle_description = params.vehicleDescription;
      if (params.startLocationName)
        transportObj.Segment[0].start_location_name = params.startLocationName;
      if (params.numberPassengers)
        transportObj.Segment[0].number_passengers = params.numberPassengers;
      if (params.endLocationName)
        transportObj.Segment[0].end_location_name = params.endLocationName;
      if (params.confirmationNum)
        transportObj.Segment[0].confirmation_num = params.confirmationNum;
      if (params.carrierName)
        transportObj.Segment[0].carrier_name = params.carrierName;
    }

    if (params.tripId) {
      if (params.tripId.includes("-")) {
        transportObj.trip_uuid = params.tripId;
      } else {
        transportObj.id = params.tripId;
      }
    }

    const endpoint =
      "/v2/replace/transport/uuid/" + params.uuid + "/format/json";
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

  async attachDocument(
    credentials: ITripItCredentials,
    objectType: string,
    objectUuid: string,
    documentName: string,
    documentContent: string,
    documentType: string = "application/pdf"
  ) {
    // Construct the endpoint for the replace API
    const endpoint = `/v2/replace/${objectType}/uuid/${objectUuid}/format/json`;

    // Create the JSON payload
    const objectTypeCapitalized =
      objectType.charAt(0).toUpperCase() + objectType.slice(1);
    const objectKey = `${objectTypeCapitalized}Object`;

    // {"LodgingObject":{"uuid":"0450e8bf-b92a-9000-0004-00004ee5619e","trip_uuid":"921c6656-9e4b-9000-0001-0000159404a0","is_client_traveler":"true","relative_url":"/reservation/show/uuid/0450e8bf-b92a-9000-0004-00004ee5619e","display_name":"The Bridge Club","Image":{"caption":"e-Ticket Customer Copy01 (1).pdf","ImageData":{"content":"JVBERi0xLjQNJeLjz9MNMyAwIG9iag0KPDwNCi9DcmVhdG9yIDxGRUZGMDA1MzAwNTYwMDQ2MDAyMDAwNjYwMDZGMDA3MjAwMjAwMDRBMDA2MTAwNzYwMDYxMDAyMDAwNTAwMDcyMDA2OTAwNkUwMDc0MDAyMDAwMzkwMDJFMDAzMTAwMjAwMDI4MDA1MjAwNjUwMDc2MDA2OTAwNzMwMDY5MDA2RjAwNkUwMDIwMDAzOTAwMkUwMDMxMDAyRTAwMzEwMDM1MDAyRTAwMzAwMDIwMDA2MjAwNzUwMDY5MDA2QzAwNjQwMDIwMDAzMjAwMzAwMDMxMDAzMzAwMzAwMDMzMDAzMDAwMzgwMDMxMDAzMDAwMzMwMDMwMDAyOT4gL1Byb2R1Y2VyIDxGRUZGMDA1MzAwNTYwMDQ2MDAyMDAwNjYwMDZGMDA3MjAwMjAwMDRBMDA2MTAwNzYwMDYxMDAyMDAwNTAwMDcyMDA2OTAwNkUwMDc0PiAvQXV0aG9yIDxGRUZGMDA2MzAwNjEwMDcwMDA3MzAwNzYwMDY2MDAzMDAwMzE

    const payload: any = {
      [objectKey]: {
        uuid: objectUuid,
        trip_uuid: "",
        is_client_traveler: "true",
        relative_url: `/reservation/show/uuid/${objectUuid}`,
        display_name: "",
        // Image: {
        //   caption: documentName,
        //   ImageData: {
        //     content: documentContent,
        //     mime_type: documentType,
        //   },
        // },
        is_display_name_auto_generated: "true",
        last_modified: Math.floor(Date.now() / 1000).toString(),
        booking_site_conf_num: "",
        booking_site_name: "",
        supplier_conf_num: "",
        supplier_name: "",
        supplier_url: "",
        is_purchased: "true",
        total_cost: "",
        is_tripit_booking: "false",
        EstimatedStartDateTime: {
          date: "",
          time: "",
          timezone: "",
          utc_offset: "",
        },
        StartDateTime: {
          date: "",
          time: "",
          timezone: "",
          utc_offset: "",
          is_timezone_manual: "false",
        },
        EndDateTime: {
          date: "",
          time: "",
          timezone: "",
          utc_offset: "",
          is_timezone_manual: "false",
        },
        Address: {
          address: "",
          city: "",
          state: "",
          country: "",
          latitude: "",
          longitude: "",
        },
        number_guests: "",
        number_rooms: "",
      },
    };
    // Convert the payload to JSON string and then URL encode it
    const jsonPayload = JSON.stringify(payload);
    const formData = new URLSearchParams();
    formData.append("json", jsonPayload);

    console.log("Endpoint:", endpoint);
    console.log("Object Type:", objectType);
    console.log("Object UUID:", objectUuid);
    console.log("Document Name:", documentName);
    console.log(
      "Payload Structure:",
      JSON.stringify(
        payload,
        (key, value) => (key === "content" ? "[BASE64_CONTENT]" : value),
        2
      )
    );
    console.log(formData.toString());

    // Make the API request
    const response = await this.api.makeApiRequest(
      "POST",
      endpoint,
      credentials,
      formData.toString(),
      undefined,
      "application/x-www-form-urlencoded"
    );

    return response.data;
  }
}
