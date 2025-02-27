import { TripItApi } from "../api";
import { ITripItCredentials } from "../types/ITripItTypes";
import {
  ICreateTripParams,
  IListTripsParams,
  ICreateActivityParams,
  IUpdateActivityParams,
  ICreateFlightParams,
  IUpdateFlightParams,
  ICreateHotelParams,
  IUpdateHotelParams,
  ICreateTransportParams,
  IUpdateTransportParams,
} from "../interfaces";

import {
  ActivityService,
  FlightService,
  HotelService,
  TransportService,
  TripService,
  DocumentService,
} from "./index";

/**
 * Main TripIt service that coordinates between specialized services
 */
export class TripItService {
  private readonly tripService: TripService;
  private readonly activityService: ActivityService;
  private readonly flightService: FlightService;
  private readonly hotelService: HotelService;
  private readonly transportService: TransportService;
  private readonly documentService: DocumentService;

  constructor(api: TripItApi) {
    // Initialize specialized services
    this.tripService = new TripService(api);
    this.activityService = new ActivityService(api);
    this.flightService = new FlightService(api);
    this.hotelService = new HotelService(api);
    this.transportService = new TransportService(api);

    // Initialize document service with dependencies
    this.documentService = new DocumentService(
      api,
      this.activityService,
      this.flightService,
      this.hotelService,
      this.transportService
    );
  }

  // Trip operations
  async createTrip(credentials: ITripItCredentials, params: ICreateTripParams) {
    return this.tripService.createTrip(credentials, params);
  }

  async listTrips(credentials: ITripItCredentials, params: IListTripsParams) {
    return this.tripService.listTrips(credentials, params);
  }

  async getTripWithObjects(credentials: ITripItCredentials, tripUuid: string) {
    return this.tripService.getTripWithObjects(credentials, tripUuid);
  }

  // Activity operations
  async createActivity(
    credentials: ITripItCredentials,
    params: ICreateActivityParams
  ) {
    return this.activityService.createActivity(credentials, params);
  }

  async updateActivity(
    credentials: ITripItCredentials,
    params: IUpdateActivityParams
  ) {
    return this.activityService.updateActivity(credentials, params);
  }

  // Flight operations
  async createFlight(
    credentials: ITripItCredentials,
    params: ICreateFlightParams
  ) {
    return this.flightService.createFlight(credentials, params);
  }

  async updateFlight(
    credentials: ITripItCredentials,
    params: IUpdateFlightParams
  ) {
    return this.flightService.updateFlight(credentials, params);
  }

  // Hotel operations
  async createHotel(
    credentials: ITripItCredentials,
    params: ICreateHotelParams
  ) {
    return this.hotelService.createHotel(credentials, params);
  }

  async updateHotel(
    credentials: ITripItCredentials,
    params: IUpdateHotelParams
  ) {
    return this.hotelService.updateHotel(credentials, params);
  }

  // Transport operations
  async createTransport(
    credentials: ITripItCredentials,
    params: ICreateTransportParams
  ) {
    return this.transportService.createTransport(credentials, params);
  }

  async updateTransport(
    credentials: ITripItCredentials,
    params: IUpdateTransportParams
  ) {
    return this.transportService.updateTransport(credentials, params);
  }

  // Document operations
  async attachDocument(
    credentials: ITripItCredentials,
    objectType: "lodging" | "activity" | "air" | "transport",
    objectUuid: string,
    documentName: string,
    documentContent: string,
    documentType: string = "application/pdf"
  ) {
    return this.documentService.attachDocument(
      credentials,
      objectType,
      objectUuid,
      documentName,
      documentContent,
      documentType
    );
  }
}
