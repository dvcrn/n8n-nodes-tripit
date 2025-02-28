// Auto-generated sample data - Do not modify manually
import { IDateTime, IAddress, IImageData, IImage, IAgency, IWarning, IBaseTravelObject, ITraveler, IBookingDetails, IBaseUpdateParams, IBaseCreateParams, IStatusFields } from "./common.interface";

export const DateTimeSchema = {
  "date": {
    "default": "",
    "required": true
  },
  "time": {
    "default": "",
    "required": true
  },
  "timezone": {
    "default": "",
    "required": true
  },
  "utc_offset": {
    "default": "",
    "required": false
  },
  "is_timezone_manual": {
    "default": "",
    "required": false
  }
};

export const AddressSchema = {
  "address": {
    "default": "",
    "required": true
  },
  "city": {
    "default": "",
    "required": false
  },
  "state": {
    "default": "",
    "required": false
  },
  "zip": {
    "default": "",
    "required": false
  },
  "country": {
    "default": "",
    "required": false
  },
  "latitude": {
    "default": "",
    "required": false
  },
  "longitude": {
    "default": "",
    "required": false
  },
  "risk_level": {
    "default": "",
    "required": false
  }
};

export const ImageDataSchema = {
  "content": {
    "default": "",
    "required": true
  },
  "mime_type": {
    "default": "",
    "required": true
  }
};

export const ImageSchema = {
  "url": {
    "default": "",
    "required": false
  },
  "caption": {
    "default": "",
    "required": false
  },
  "id": {
    "default": "",
    "required": false
  },
  "uuid": {
    "default": "",
    "required": false
  },
  "thumbnail_url": {
    "default": "",
    "required": false
  },
  "ImageData": {
    "content": {
      "default": "",
      "required": true
    },
    "mime_type": {
      "default": "",
      "required": true
    }
  },
  "segment_uuid": {
    "default": "",
    "required": false
  }
};

export const AgencySchema = {
  "agency_conf_num": {
    "default": "",
    "required": false
  },
  "agency_name": {
    "default": "",
    "required": false
  },
  "agency_phone": {
    "default": "",
    "required": false
  },
  "agency_email_address": {
    "default": "",
    "required": false
  },
  "agency_url": {
    "default": "",
    "required": false
  },
  "agency_contact": {
    "default": "",
    "required": false
  }
};

export const WarningSchema = {
  "description": {
    "default": "",
    "required": true
  },
  "entity_type": {
    "default": "",
    "required": true
  },
  "timestamp": {
    "default": "",
    "required": true
  }
};

export const TravelerSchema = {
  "first_name": {
    "default": "",
    "required": false
  },
  "middle_name": {
    "default": "",
    "required": false
  },
  "last_name": {
    "default": "",
    "required": false
  },
  "frequent_traveler_num": {
    "default": "",
    "required": false
  },
  "ticket_num": {
    "default": "",
    "required": false
  }
};

export const BookingDetailsSchema = {
  "bookingRate": {
    "default": "",
    "required": false
  },
  "bookingSiteConfNum": {
    "default": "",
    "required": false
  },
  "bookingSiteName": {
    "default": "",
    "required": false
  },
  "bookingSitePhone": {
    "default": "",
    "required": false
  },
  "bookingSiteUrl": {
    "default": "",
    "required": false
  },
  "recordLocator": {
    "default": "",
    "required": false
  },
  "supplierConfNum": {
    "default": "",
    "required": false
  },
  "supplierContact": {
    "default": "",
    "required": false
  },
  "supplierEmailAddress": {
    "default": "",
    "required": false
  },
  "supplierPhone": {
    "default": "",
    "required": false
  },
  "supplierUrl": {
    "default": "",
    "required": false
  },
  "notes": {
    "default": "",
    "required": false
  },
  "restrictions": {
    "default": "",
    "required": false
  },
  "totalCost": {
    "default": "",
    "required": false
  },
  "bookingDate": {
    "default": "",
    "required": false
  },
  "isPurchased": {
    "default": false,
    "required": false
  }
};

export const StatusFieldsSchema = {
  "is_client_traveler": {
    "default": false,
    "required": false
  },
  "is_purchased": {
    "default": false,
    "required": false
  },
  "is_tripit_booking": {
    "default": false,
    "required": false
  },
  "has_possible_cancellation": {
    "default": false,
    "required": false
  }
};

