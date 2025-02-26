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
    // First, fetch the existing hotel object
    const existingHotelResponse = await this.api.getHotel(credentials, params.uuid);
    const existingHotel = existingHotelResponse.data.LodgingObject;
    
    if (!existingHotel) {
      throw new Error(`Hotel with UUID ${params.uuid} not found`);
    }

    // Create a merged object with existing data and updates
    const lodgingObject: any = { ...existingHotel };

    // Map param keys to API object keys for top-level properties
    const paramMapping: Record<string, string> = {
      hotelName: 'supplier_name',
      supplierConfNum: 'supplier_conf_num',
      supplierPhone: 'supplier_phone',
      supplierUrl: 'supplier_url',
      bookingRate: 'booking_rate',
      bookingSiteConfNum: 'booking_site_conf_num',
      bookingSiteName: 'booking_site_name',
      bookingSitePhone: 'booking_site_phone',
      bookingSiteUrl: 'booking_site_url',
      recordLocator: 'record_locator',
      supplierContact: 'supplier_contact',
      supplierEmailAddress: 'supplier_email_address',
      notes: 'notes',
      restrictions: 'restrictions',
      totalCost: 'total_cost',
      bookingDate: 'booking_date',
      isPurchased: 'is_purchased',
      numberGuests: 'number_guests',
      numberRooms: 'number_rooms',
      roomType: 'room_type'
    };
    
    // Update object properties from params using the mapping
    Object.entries(paramMapping).forEach(([paramKey, objectKey]) => {
      const value = params[paramKey as keyof IUpdateHotelParams];
      if (value !== undefined) {
        lodgingObject[objectKey] = value;
      }
    });

    // Handle StartDateTime updates
    if (params.checkInDate || params.checkInTime || params.timezone) {
      if (!lodgingObject.StartDateTime) {
        lodgingObject.StartDateTime = {};
      }
      
      if (params.checkInDate) lodgingObject.StartDateTime.date = params.checkInDate;
      if (params.checkInTime) lodgingObject.StartDateTime.time = normalizeTime(params.checkInTime);
      if (params.timezone) lodgingObject.StartDateTime.timezone = params.timezone;
    }
    
    // Handle EndDateTime updates
    if (params.checkOutDate || params.checkOutTime || params.timezone) {
      if (!lodgingObject.EndDateTime) {
        lodgingObject.EndDateTime = {};
      }
      
      if (params.checkOutDate) lodgingObject.EndDateTime.date = params.checkOutDate;
      if (params.checkOutTime) lodgingObject.EndDateTime.time = normalizeTime(params.checkOutTime);
      if (params.timezone) lodgingObject.EndDateTime.timezone = params.timezone;
    }
    
    // Handle Address updates
    if (params.street || params.city || params.state || params.zip || params.country) {
      if (!lodgingObject.Address) {
        lodgingObject.Address = {};
      }
      
      // Map Address parameters
      const addressMapping: Record<string, string> = {
        street: 'address',
        city: 'city',
        state: 'state',
        zip: 'zip',
        country: 'country'
      };
      
      Object.entries(addressMapping).forEach(([paramKey, objectKey]) => {
        const value = params[paramKey as keyof IUpdateHotelParams];
        if (value !== undefined) {
          lodgingObject.Address[objectKey] = value;
        }
      });
    }
    
    // Update trip ID if provided
    if (params.tripId) {
      if (params.tripId.includes("-")) {
        lodgingObject.trip_uuid = params.tripId;
      } else {
        lodgingObject.trip_id = params.tripId;
      }
    }

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
    // First, fetch the existing activity object
    const existingActivityResponse = await this.api.getActivity(credentials, params.uuid);
    const existingActivity = existingActivityResponse.data.ActivityObject;
    
    if (!existingActivity) {
      throw new Error(`Activity with UUID ${params.uuid} not found`);
    }

    // Create a merged object with existing data and updates
    const activityObj: any = { ...existingActivity };

    // Map param keys to API object keys for top-level properties
    const paramMapping: Record<string, string> = {
      displayName: 'display_name',
      locationName: 'location_name',
    };
    
    // Update object properties from params using the mapping
    Object.entries(paramMapping).forEach(([paramKey, objectKey]) => {
      const value = params[paramKey as keyof IUpdateActivityParams];
      if (value !== undefined) {
        activityObj[objectKey] = value;
      }
    });

    // Handle StartDateTime updates
    if (params.startDate || params.startTime || params.timezone) {
      if (!activityObj.StartDateTime) {
        activityObj.StartDateTime = {};
      }
      
      if (params.startDate) activityObj.StartDateTime.date = params.startDate;
      if (params.startTime) activityObj.StartDateTime.time = normalizeTime(params.startTime);
      if (params.timezone) activityObj.StartDateTime.timezone = params.timezone;
    }

    // Handle EndDateTime updates
    if (params.endDate || params.endTime || params.timezone) {
      if (!activityObj.EndDateTime) {
        activityObj.EndDateTime = {};
      }
      
      if (params.endDate) activityObj.EndDateTime.date = params.endDate;
      if (params.endTime) activityObj.EndDateTime.time = normalizeTime(params.endTime);
      if (params.timezone) activityObj.EndDateTime.timezone = params.timezone;
    }

    // Handle Address update
    if (params.address) {
      if (!activityObj.Address) {
        activityObj.Address = {};
      }
      activityObj.Address.address = params.address;
    }
    
    // Update trip ID if provided
    if (params.tripId) {
      if (params.tripId.includes("-")) {
        activityObj.trip_uuid = params.tripId;
      } else {
        activityObj.trip_id = params.tripId;
      }
    }

    const endpoint = "/v2/replace/activity/uuid/" + params.uuid + "/format/json";
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
    // First, fetch the existing flight object
    const existingFlightResponse = await this.api.getFlight(credentials, params.uuid);
    const existingFlight = existingFlightResponse.data.AirObject;
    
    if (!existingFlight) {
      throw new Error(`Flight with UUID ${params.uuid} not found`);
    }

    // Create a merged object with existing data
    const airObj: any = { ...existingFlight };

    // Update top-level fields that were provided
    const topLevelFields = [
      'booking_rate', 'booking_site_conf_num', 'booking_site_name', 
      'booking_site_phone', 'booking_site_url', 'record_locator', 
      'supplier_conf_num', 'supplier_contact', 'supplier_email_address', 
      'supplier_phone', 'supplier_url', 'notes', 'restrictions', 
      'total_cost', 'booking_date', 'is_purchased'
    ];
    
    // Map param keys to API object keys
    const paramMapping: Record<string, string> = {
      bookingRate: 'booking_rate',
      bookingSiteConfNum: 'booking_site_conf_num',
      bookingSiteName: 'booking_site_name',
      bookingSitePhone: 'booking_site_phone',
      bookingSiteUrl: 'booking_site_url',
      recordLocator: 'record_locator',
      supplierConfNum: 'supplier_conf_num',
      supplierContact: 'supplier_contact',
      supplierEmailAddress: 'supplier_email_address',
      supplierPhone: 'supplier_phone',
      supplierUrl: 'supplier_url',
      notes: 'notes',
      restrictions: 'restrictions',
      totalCost: 'total_cost',
      bookingDate: 'booking_date',
      isPurchased: 'is_purchased',
    };
    
    // Update object properties from params using the mapping
    Object.entries(paramMapping).forEach(([paramKey, objectKey]) => {
      const value = params[paramKey as keyof IUpdateFlightParams];
      if (value !== undefined) {
        airObj[objectKey] = value;
      }
    });
    
    // Handle segment properties
    if (airObj.Segment && airObj.Segment.length > 0) {
      // Update segment-specific fields
      const segmentParamMapping: Record<string, string> = {
        marketingAirline: 'marketing_airline',
        flightNumber: 'marketing_flight_number',
        operatingAirline: 'operating_airline',
        aircraft: 'aircraft',
        seatAssignment: 'seats',
        departureAirport: 'start_airport_code',
        arrivalAirport: 'end_airport_code',
      };
      
      Object.entries(segmentParamMapping).forEach(([paramKey, objectKey]) => {
        const value = params[paramKey as keyof IUpdateFlightParams];
        if (value !== undefined) {
          airObj.Segment[0][objectKey] = value;
        }
      });
      
      // Handle departure date/time
      if (params.departureTime) {
        const [date, time] = params.departureTime.split('T');
        if (!airObj.Segment[0].StartDateTime) {
          airObj.Segment[0].StartDateTime = {};
        }
        airObj.Segment[0].StartDateTime.date = date;
        airObj.Segment[0].StartDateTime.time = normalizeTime(time);
      }
      
      // Handle arrival date/time
      if (params.arrivalTime) {
        const [date, time] = params.arrivalTime.split('T');
        if (!airObj.Segment[0].EndDateTime) {
          airObj.Segment[0].EndDateTime = {};
        }
        airObj.Segment[0].EndDateTime.date = date;
        airObj.Segment[0].EndDateTime.time = normalizeTime(time);
      }
    }

    // Update trip ID if provided
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
    // First, fetch the existing transport object
    const existingTransportResponse = await this.api.getTransport(credentials, params.uuid);
    const existingTransport = existingTransportResponse.data.TransportObject;
    
    if (!existingTransport) {
      throw new Error(`Transport with UUID ${params.uuid} not found`);
    }
    
    // Create a merged object with existing data
    const transportObj: any = { ...existingTransport };
    
    // Map param keys to API object keys for top-level properties
    const paramMapping: Record<string, string> = {
      isClientTraveler: 'is_client_traveler',
      isPurchased: 'is_purchased',
      isTripitBooking: 'is_tripit_booking',
      hasPossibleCancellation: 'has_possible_cancellation'
    };
    
    // Update object properties from params using the mapping
    Object.entries(paramMapping).forEach(([paramKey, objectKey]) => {
      const value = params[paramKey as keyof IUpdateTransportParams];
      if (value !== undefined) {
        transportObj[objectKey] = value;
      }
    });
    
    // Handle segment properties if they exist
    if (transportObj.Segment && transportObj.Segment.length > 0) {
      // Update segment-specific fields
      const segmentParamMapping: Record<string, string> = {
        vehicleDescription: 'vehicle_description',
        startLocationName: 'start_location_name',
        numberPassengers: 'number_passengers',
        endLocationName: 'end_location_name',
        confirmationNum: 'confirmation_num',
        carrierName: 'carrier_name'
      };
      
      Object.entries(segmentParamMapping).forEach(([paramKey, objectKey]) => {
        const value = params[paramKey as keyof IUpdateTransportParams];
        if (value !== undefined) {
          transportObj.Segment[0][objectKey] = value;
        }
      });
      
      // Handle start location address
      if (params.startAddress) {
        if (!transportObj.Segment[0].StartLocationAddress) {
          transportObj.Segment[0].StartLocationAddress = {
            longitude: "0",
            latitude: "0"
          };
        }
        transportObj.Segment[0].StartLocationAddress.address = params.startAddress;
      }
      
      // Handle end location address
      if (params.endAddress) {
        if (!transportObj.Segment[0].EndLocationAddress) {
          transportObj.Segment[0].EndLocationAddress = {
            longitude: "0",
            latitude: "0"
          };
        }
        transportObj.Segment[0].EndLocationAddress.address = params.endAddress;
      }
      
      // Handle StartDateTime updates
      if (params.startDate || params.startTime || params.timezone) {
        if (!transportObj.Segment[0].StartDateTime) {
          transportObj.Segment[0].StartDateTime = {};
        }
        
        if (params.startDate) transportObj.Segment[0].StartDateTime.date = params.startDate;
        if (params.startTime) transportObj.Segment[0].StartDateTime.time = normalizeTime(params.startTime);
        if (params.timezone) transportObj.Segment[0].StartDateTime.timezone = params.timezone;
      }
      
      // Handle EndDateTime updates
      if (params.endDate || params.endTime || params.timezone) {
        if (!transportObj.Segment[0].EndDateTime) {
          transportObj.Segment[0].EndDateTime = {};
        }
        
        if (params.endDate) transportObj.Segment[0].EndDateTime.date = params.endDate;
        if (params.endTime) transportObj.Segment[0].EndDateTime.time = normalizeTime(params.endTime);
        if (params.timezone) transportObj.Segment[0].EndDateTime.timezone = params.timezone;
      }
    }
    
    // Update trip ID if provided
    if (params.tripId) {
      if (params.tripId.includes("-")) {
        transportObj.trip_uuid = params.tripId;
      } else {
        transportObj.trip_id = params.tripId;
      }
    }

    const endpoint = "/v2/replace/transport/uuid/" + params.uuid + "/format/json";
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
