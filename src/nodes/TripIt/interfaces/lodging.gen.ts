// Auto-generated sample data - Do not modify manually
import { ILodging, ILodgingResponse, ICreateLodgingParams, IUpdateLodgingParams } from "./lodging.interface";

export const LodgingSchema = {
  "id": {
    "default": "",
    "required": false
  },
  "uuid": {
    "default": "",
    "required": false
  },
  "trip_id": {
    "default": "",
    "required": false
  },
  "trip_uuid": {
    "default": "",
    "required": false
  },
  "is_client_traveler": {
    "default": false,
    "required": false
  },
  "relative_url": {
    "default": "",
    "required": false
  },
  "display_name": {
    "default": "",
    "required": true
  },
  "is_display_name_auto_generated": {
    "default": "",
    "required": false
  },
  "last_modified": {
    "default": "",
    "required": false
  },
  "booking_rate": {
    "default": "",
    "required": false
  },
  "booking_site_conf_num": {
    "default": "",
    "required": false
  },
  "booking_site_name": {
    "default": "",
    "required": false
  },
  "booking_site_phone": {
    "default": "",
    "required": false
  },
  "booking_site_url": {
    "default": "",
    "required": false
  },
  "supplier_conf_num": {
    "default": "",
    "required": false
  },
  "supplier_contact": {
    "default": "",
    "required": false
  },
  "supplier_email_address": {
    "default": "",
    "required": false
  },
  "supplier_name": {
    "default": "",
    "required": false
  },
  "supplier_phone": {
    "default": "",
    "required": false
  },
  "supplier_url": {
    "default": "",
    "required": false
  },
  "is_purchased": {
    "default": false,
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
  "total_cost": {
    "default": "",
    "required": false
  },
  "is_tripit_booking": {
    "default": false,
    "required": false
  },
  "is_concur_booked": {
    "default": "",
    "required": false
  },
  "StartDateTime": {
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
  },
  "EndDateTime": {
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
  },
  "EstimatedStartDateTime": {
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
  },
  "Address": {
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
  },
  "number_guests": {
    "default": "",
    "required": false
  },
  "number_rooms": {
    "default": "",
    "required": false
  },
  "room_type": {
    "default": "",
    "required": false
  },
  "Image": {
    "default": [],
    "required": false
  }
};

export const LodgingResponseSchema = {
  "timestamp": {
    "default": "",
    "required": false
  },
  "num_bytes": {
    "default": "",
    "required": false
  },
  "Warning": {
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
  },
  "LodgingObject": {
    "id": {
      "default": "",
      "required": false
    },
    "uuid": {
      "default": "",
      "required": false
    },
    "trip_id": {
      "default": "",
      "required": false
    },
    "trip_uuid": {
      "default": "",
      "required": false
    },
    "is_client_traveler": {
      "default": false,
      "required": false
    },
    "relative_url": {
      "default": "",
      "required": false
    },
    "display_name": {
      "default": "",
      "required": true
    },
    "is_display_name_auto_generated": {
      "default": "",
      "required": false
    },
    "last_modified": {
      "default": "",
      "required": false
    },
    "booking_rate": {
      "default": "",
      "required": false
    },
    "booking_site_conf_num": {
      "default": "",
      "required": false
    },
    "booking_site_name": {
      "default": "",
      "required": false
    },
    "booking_site_phone": {
      "default": "",
      "required": false
    },
    "booking_site_url": {
      "default": "",
      "required": false
    },
    "supplier_conf_num": {
      "default": "",
      "required": false
    },
    "supplier_contact": {
      "default": "",
      "required": false
    },
    "supplier_email_address": {
      "default": "",
      "required": false
    },
    "supplier_name": {
      "default": "",
      "required": false
    },
    "supplier_phone": {
      "default": "",
      "required": false
    },
    "supplier_url": {
      "default": "",
      "required": false
    },
    "is_purchased": {
      "default": false,
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
    "total_cost": {
      "default": "",
      "required": false
    },
    "is_tripit_booking": {
      "default": false,
      "required": false
    },
    "is_concur_booked": {
      "default": "",
      "required": false
    },
    "StartDateTime": {
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
    },
    "EndDateTime": {
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
    },
    "EstimatedStartDateTime": {
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
    },
    "Address": {
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
    },
    "number_guests": {
      "default": "",
      "required": false
    },
    "number_rooms": {
      "default": "",
      "required": false
    },
    "room_type": {
      "default": "",
      "required": false
    },
    "Image": {
      "default": [],
      "required": false
    }
  }
};

export const CreateLodgingParamsSchema = {
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
  },
  "tripId": {
    "default": "",
    "required": true
  },
  "hotelName": {
    "default": "",
    "required": true
  },
  "checkInDate": {
    "default": "",
    "required": true
  },
  "checkOutDate": {
    "default": "",
    "required": true
  },
  "checkInTime": {
    "default": "",
    "required": true
  },
  "checkOutTime": {
    "default": "",
    "required": true
  },
  "timezone": {
    "default": "",
    "required": true
  },
  "street": {
    "default": "",
    "required": true
  },
  "city": {
    "default": "",
    "required": true
  },
  "state": {
    "default": "",
    "required": true
  },
  "zip": {
    "default": "",
    "required": true
  },
  "country": {
    "default": "",
    "required": true
  },
  "numberGuests": {
    "default": 0,
    "required": false
  },
  "numberRooms": {
    "default": 0,
    "required": false
  },
  "roomType": {
    "default": "",
    "required": false
  }
};

export const UpdateLodgingParamsSchema = {
  "uuid": {
    "default": "",
    "required": true
  },
  "tripId": {
    "default": "",
    "required": false
  },
  "isPurchased": {
    "default": false,
    "required": false
  },
  "Image": {
    "default": [],
    "required": false
  },
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
  "hotelName": {
    "default": "",
    "required": false
  },
  "checkInDate": {
    "default": "",
    "required": false
  },
  "checkOutDate": {
    "default": "",
    "required": false
  },
  "checkInTime": {
    "default": "",
    "required": false
  },
  "checkOutTime": {
    "default": "",
    "required": false
  },
  "timezone": {
    "default": "",
    "required": false
  },
  "street": {
    "default": "",
    "required": false
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
  "numberGuests": {
    "default": 0,
    "required": false
  },
  "numberRooms": {
    "default": 0,
    "required": false
  },
  "roomType": {
    "default": "",
    "required": false
  }
};

