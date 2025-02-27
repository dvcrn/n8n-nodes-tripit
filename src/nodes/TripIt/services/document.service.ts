import { BaseService } from "./base.service";
import { ITripItCredentials } from "../types/ITripItTypes";
import { IMAGE_FIELD_ORDER } from "../../../interfaces/TripItInterfaces";
import orderObjectByKeys from "../../../util/orderObjectByKeys";
import { ActivityService } from "./activity.service";
import { FlightService } from "./flight.service";
import { HotelService } from "./hotel.service";
import { TransportService } from "./transport.service";

type ObjectType = "lodging" | "activity" | "air" | "transport";

export class DocumentService extends BaseService {
  constructor(
    api: any,
    private activityService: ActivityService,
    private flightService: FlightService,
    private hotelService: HotelService,
    private transportService: TransportService
  ) {
    super(api);
  }

  /**
   * Attaches a document to an existing TripIt object
   */
  async attachDocument(
    credentials: ITripItCredentials,
    objectType: ObjectType,
    objectUuid: string,
    documentName: string,
    documentContent: string,
    documentType: string = "application/pdf"
  ) {
    // Fetch the existing object using the appropriate API method
    let existingObject;
    switch (objectType) {
      case "lodging":
        existingObject = await this.api.getHotel(credentials, objectUuid);
        break;
      case "activity":
        existingObject = await this.api.getActivity(credentials, objectUuid);
        break;
      case "air":
        existingObject = await this.api.getFlight(credentials, objectUuid);
        break;
      case "transport":
        existingObject = await this.api.getTransport(credentials, objectUuid);
        break;
      default:
        throw new Error(`Unsupported object type: ${objectType}`);
    }

    if (!existingObject || !existingObject.data) {
      throw new Error(`Object ${objectType} with UUID ${objectUuid} not found`);
    }

    // Extract the object data
    const objectTypeCapitalized =
      objectType.charAt(0).toUpperCase() + objectType.slice(1);
    const objectKey = `${objectTypeCapitalized}Object`;
    const objectData = existingObject.data[objectKey];

    // Create the new Image data
    const newImageData = orderObjectByKeys(
      {
        caption: documentName,
        ImageData: {
          content: documentContent,
          mime_type: documentType,
        },
      },
      IMAGE_FIELD_ORDER
    );

    // Prepare the update params with uuid and image
    const updateParams: any = {
      uuid: objectUuid,
      Image: objectData.Image
        ? Array.isArray(objectData.Image)
          ? [...objectData.Image, newImageData]
          : [objectData.Image, newImageData]
        : newImageData,
    };

    // Call the appropriate service update method
    switch (objectType) {
      case "lodging":
        return await this.hotelService.updateHotel(credentials, updateParams);
      case "activity":
        return await this.activityService.updateActivity(
          credentials,
          updateParams
        );
      case "air":
        return await this.flightService.updateFlight(credentials, updateParams);
      case "transport":
        return await this.transportService.updateTransport(
          credentials,
          updateParams
        );
    }
  }
}
