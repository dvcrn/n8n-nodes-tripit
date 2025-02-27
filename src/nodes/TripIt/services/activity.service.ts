import { BaseService } from "./base.service";
import { ITripItCredentials } from "../types/ITripItTypes";
import { ICreateActivityParams, IUpdateActivityParams } from "../interfaces";
import orderObjectByKeys from "../../../util/orderObjectByKeys";
import normalizeTime from "../../../util/normalizeTime";
import {
  ACTIVITY_FIELD_ORDER,
  ADDRESS_FIELD_ORDER,
  IMAGE_FIELD_ORDER,
} from "../../../interfaces/TripItInterfaces";
import { IActivityResponse } from "../types/responses";

export class ActivityService extends BaseService {
  /**
   * Creates a new activity in TripIt
   */
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

    const { key, value } = this.normalizeId(params.tripId);
    activityObj[key] = value;

    const endpoint = this.buildEndpoint("activity");
    const data = new URLSearchParams({
      json: JSON.stringify({
        ActivityObject: orderObjectByKeys(activityObj, ACTIVITY_FIELD_ORDER),
      }),
    });

    return this.makeRequest<IActivityResponse>(
      "POST",
      endpoint,
      credentials,
      data.toString()
    );
  }

  /**
   * Updates an existing activity in TripIt
   */
  async updateActivity(
    credentials: ITripItCredentials,
    params: IUpdateActivityParams
  ) {
    // First, fetch the existing activity object
    const existingActivityResponse = await this.api.getActivity(
      credentials,
      params.uuid
    );
    const existingActivity = existingActivityResponse.data.ActivityObject;

    if (!existingActivity) {
      throw new Error(`Activity with UUID ${params.uuid} not found`);
    }

    // Create a merged object with existing data and updates
    const activityObj: any = { ...existingActivity };

    // Map param keys to API object keys for top-level properties
    const paramMapping = {
      displayName: "display_name",
      locationName: "location_name",
    };

    // Update object properties from params using the mapping
    Object.entries(paramMapping).forEach(([paramKey, objectKey]) => {
      const value = params[paramKey as keyof typeof paramMapping];
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
      if (params.startTime)
        activityObj.StartDateTime.time = normalizeTime(params.startTime);
      if (params.timezone) activityObj.StartDateTime.timezone = params.timezone;
    }

    // Handle EndDateTime updates
    if (params.endDate || params.endTime || params.timezone) {
      if (!activityObj.EndDateTime) {
        activityObj.EndDateTime = {};
      }

      if (params.endDate) activityObj.EndDateTime.date = params.endDate;
      if (params.endTime)
        activityObj.EndDateTime.time = normalizeTime(params.endTime);
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
      const { key, value } = this.normalizeId(params.tripId);
      activityObj[key] = value;
    }

    // Handle Image if provided
    if (params.Image) {
      activityObj.Image = params.Image;

      if (Array.isArray(activityObj.Image)) {
        activityObj.Image = activityObj.Image.map((img) => {
          if (!img.ImageData) {
            return img;
          }
          return orderObjectByKeys(img, IMAGE_FIELD_ORDER);
        });
      } else {
        activityObj.Image = orderObjectByKeys(
          activityObj.Image,
          IMAGE_FIELD_ORDER
        );
      }
    }

    // Order the address fields if they exist
    if (activityObj.Address) {
      activityObj.Address = orderObjectByKeys(
        activityObj.Address,
        ADDRESS_FIELD_ORDER
      );
    }

    const endpoint = this.buildEndpoint("activity", params.uuid);
    const data = new URLSearchParams({
      json: JSON.stringify({
        ActivityObject: orderObjectByKeys(activityObj, ACTIVITY_FIELD_ORDER),
      }),
    });

    return this.makeRequest<IActivityResponse>(
      "POST",
      endpoint,
      credentials,
      data.toString()
    );
  }
}
