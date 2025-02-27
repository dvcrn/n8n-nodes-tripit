import {
  IBaseTravelObject,
  IDateTime,
  IAddress,
  IAgency,
  IImage,
} from "./common.interface";

/**
 * Interface for activity participant information
 */
export interface IParticipant {
  first_name: string;
  last_name: string;
  frequent_traveler_num?: string;
  ticket_num?: string;
}

/**
 * Interface representing an activity in TripIt
 */
export interface IActivity extends IBaseTravelObject {
  StartDateTime: IDateTime;
  EndDateTime: IDateTime;
  Address: IAddress;
  location_name?: string;
  Agency?: IAgency;
  Participant?: IParticipant[];
  Image?: IImage | IImage[];
}

/**
 * Interface for activity response from TripIt API
 */
export interface IActivityResponse {
  timestamp?: string;
  num_bytes?: string;
  ActivityObject: IActivity;
}

/**
 * Interface for creating a new activity
 */
export interface ICreateActivityParams {
  tripId: string;
  displayName: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  timezone: string;
  address: string;
  locationName: string;
}

/**
 * Interface for updating an existing activity
 */
export interface IUpdateActivityParams {
  uuid: string;
  tripId?: string;
  displayName?: string;
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  timezone?: string;
  address?: string;
  locationName?: string;
  Image?: IImage | IImage[];
  isPurchased?: string;
}
