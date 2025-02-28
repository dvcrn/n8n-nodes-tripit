import { IDataObject } from "n8n-workflow";
import { IActivity, IAir, ILodging, ITransport, ITrip } from "../interfaces";

// TripIt API specific response types
export interface ITripResponse extends IDataObject {
  Trip: ITrip;
}

export interface IListTripsResponse extends IDataObject {
  Trip: ITrip[];
  page_num: string;
  page_size: string;
  max_page: string;
}

export interface IActivityResponse extends IDataObject {
  ActivityObject: IActivity;
}

export interface IFlightResponse extends IDataObject {
  AirObject: IAir;
}

export interface IHotelResponse extends IDataObject {
  LodgingObject: ILodging;
}

export interface ITransportResponse extends IDataObject {
  TransportObject: ITransport;
}

export interface IProfileResponse extends IDataObject {
  Profile: IDataObject;
}

// Response type for getTripWithObjects which can include multiple object types
export interface ITripWithObjectsResponse extends IDataObject {
  Trip?: IDataObject;
  Profile?: IDataObject;
  ActivityObject?: IDataObject[];
  AirObject?: IDataObject[];
  LodgingObject?: IDataObject[];
  TransportObject?: IDataObject[];
}
