import { BaseService } from "./base.service";
import { ITripItCredentials } from "../types/ITripItTypes";
import { ICreateHotelParams, IUpdateHotelParams } from "../interfaces";
import orderObjectByKeys from "../../../util/orderObjectByKeys";
import normalizeTime from "../../../util/normalizeTime";
import {
  LODGING_FIELD_ORDER,
  ADDRESS_FIELD_ORDER,
  IMAGE_FIELD_ORDER,
} from "../../../interfaces/TripItInterfaces";
import { IHotelResponse } from "../types/responses";

export class HotelService extends BaseService {
  /**
   * Creates a new hotel booking in TripIt
   */
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

    const { key, value } = this.normalizeId(params.tripId);
    lodgingObject[key] = value;

    const endpoint = this.buildEndpoint("lodging");
    const data = new URLSearchParams({
      json: JSON.stringify({
        LodgingObject: orderObjectByKeys(lodgingObject, LODGING_FIELD_ORDER),
      }),
    });

    return this.makeRequest<IHotelResponse>(
      "POST",
      endpoint,
      credentials,
      data.toString()
    );
  }

  /**
   * Updates an existing hotel booking in TripIt
   */
  async updateHotel(
    credentials: ITripItCredentials,
    params: IUpdateHotelParams
  ) {
    // First, fetch the existing hotel object
    const existingHotelResponse = await this.api.getHotel(
      credentials,
      params.uuid
    );
    const existingHotel = existingHotelResponse.data.LodgingObject;

    if (!existingHotel) {
      throw new Error(`Hotel with UUID ${params.uuid} not found`);
    }

    // Create a merged object with existing data and updates
    const lodgingObject: any = { ...existingHotel };

    // Map param keys to API object keys for top-level properties
    const paramMapping = {
      hotelName: "supplier_name",
      supplierConfNum: "supplier_conf_num",
      supplierPhone: "supplier_phone",
      supplierUrl: "supplier_url",
      bookingRate: "booking_rate",
      bookingSiteConfNum: "booking_site_conf_num",
      bookingSiteName: "booking_site_name",
      bookingSitePhone: "booking_site_phone",
      bookingSiteUrl: "booking_site_url",
      recordLocator: "record_locator",
      supplierContact: "supplier_contact",
      supplierEmailAddress: "supplier_email_address",
      notes: "notes",
      restrictions: "restrictions",
      totalCost: "total_cost",
      bookingDate: "booking_date",
      isPurchased: "is_purchased",
      numberGuests: "number_guests",
      numberRooms: "number_rooms",
      roomType: "room_type",
    } as const;

    // Update object properties from params using the mapping
    Object.entries(paramMapping).forEach(([paramKey, objectKey]) => {
      const value = params[paramKey as keyof typeof paramMapping];
      if (value !== undefined) {
        lodgingObject[objectKey] = value;
      }
    });

    // Handle StartDateTime updates
    if (params.checkInDate || params.checkInTime || params.timezone) {
      if (!lodgingObject.StartDateTime) {
        lodgingObject.StartDateTime = {};
      }

      if (params.checkInDate)
        lodgingObject.StartDateTime.date = params.checkInDate;
      if (params.checkInTime)
        lodgingObject.StartDateTime.time = normalizeTime(params.checkInTime);
      if (params.timezone)
        lodgingObject.StartDateTime.timezone = params.timezone;
    }

    // Handle EndDateTime updates
    if (params.checkOutDate || params.checkOutTime || params.timezone) {
      if (!lodgingObject.EndDateTime) {
        lodgingObject.EndDateTime = {};
      }

      if (params.checkOutDate)
        lodgingObject.EndDateTime.date = params.checkOutDate;
      if (params.checkOutTime)
        lodgingObject.EndDateTime.time = normalizeTime(params.checkOutTime);
      if (params.timezone) lodgingObject.EndDateTime.timezone = params.timezone;
    }

    // Handle Address updates
    if (
      params.street ||
      params.city ||
      params.state ||
      params.zip ||
      params.country
    ) {
      if (!lodgingObject.Address) {
        lodgingObject.Address = {};
      }

      const addressMapping = {
        street: "address",
        city: "city",
        state: "state",
        zip: "zip",
        country: "country",
      } as const;

      Object.entries(addressMapping).forEach(([paramKey, objectKey]) => {
        const value = params[paramKey as keyof typeof addressMapping];
        if (value !== undefined) {
          lodgingObject.Address[objectKey] = value;
        }
      });
    }

    // Update trip ID if provided
    if (params.tripId) {
      const { key, value } = this.normalizeId(params.tripId);
      lodgingObject[key] = value;
    }

    // Handle Image if provided
    if (params.Image) {
      lodgingObject.Image = params.Image;

      if (Array.isArray(lodgingObject.Image)) {
        lodgingObject.Image = lodgingObject.Image.map((img) => {
          if (!img.ImageData) {
            return img;
          }
          return orderObjectByKeys(img, IMAGE_FIELD_ORDER);
        });
      } else {
        lodgingObject.Image = orderObjectByKeys(
          lodgingObject.Image,
          IMAGE_FIELD_ORDER
        );
      }
    }

    // Order the address fields if they exist
    if (lodgingObject.Address) {
      lodgingObject.Address = orderObjectByKeys(
        lodgingObject.Address,
        ADDRESS_FIELD_ORDER
      );
    }

    const endpoint = this.buildEndpoint("lodging", params.uuid);
    const data = new URLSearchParams({
      json: JSON.stringify({
        LodgingObject: orderObjectByKeys(lodgingObject, LODGING_FIELD_ORDER),
      }),
    });

    return this.makeRequest<IHotelResponse>(
      "POST",
      endpoint,
      credentials,
      data.toString()
    );
  }
}
