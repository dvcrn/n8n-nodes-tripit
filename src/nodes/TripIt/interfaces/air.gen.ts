// Auto-generated sample data - Do not modify manually
import { IAirSegment, IAir, IAirResponse, ICreateAirParams, IUpdateAirParams } from "./air.interface";

export const airSegmentSample = {
  "uuid": {
    "default": "",
    "required": false
  },
  "marketing_airline": {
    "default": "",
    "required": true
  },
  "marketing_flight_number": {
    "default": "",
    "required": true
  },
  "operating_airline": {
    "default": "",
    "required": false
  },
  "aircraft": {
    "default": "",
    "required": false
  },
  "seats": {
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
  "start_airport_code": {
    "default": "",
    "required": true
  },
  "end_airport_code": {
    "default": "",
    "required": true
  }
};

export const airSample = {
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
  "Segment": {
    "default": [],
    "required": true
  },
  "Image": {
    "default": [],
    "required": false
  }
};

export const airSampleResponse = {
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
  "AirObject": {
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
    "Segment": {
      "default": [],
      "required": true
    },
    "Image": {
      "default": [],
      "required": false
    }
  }
};

export const createCreateAirParams = {
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
  "departureAirport": {
    "default": "",
    "required": true
  },
  "arrivalAirport": {
    "default": "",
    "required": true
  },
  "departureTime": {
    "default": "",
    "required": true
  },
  "arrivalTime": {
    "default": "",
    "required": true
  },
  "flightNumber": {
    "default": "",
    "required": true
  },
  "marketingAirline": {
    "default": "",
    "required": true
  },
  "operatingAirline": {
    "default": "",
    "required": false
  },
  "seatAssignment": {
    "default": "",
    "required": false
  },
  "aircraft": {
    "default": "",
    "required": false
  }
};

export const updateUpdateAirParams = {
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
  "departureAirport": {
    "default": "",
    "required": false
  },
  "arrivalAirport": {
    "default": "",
    "required": false
  },
  "departureTime": {
    "default": "",
    "required": false
  },
  "arrivalTime": {
    "default": "",
    "required": false
  },
  "flightNumber": {
    "default": "",
    "required": false
  },
  "marketingAirline": {
    "default": "",
    "required": false
  },
  "operatingAirline": {
    "default": "",
    "required": false
  },
  "seatAssignment": {
    "default": "",
    "required": false
  },
  "aircraft": {
    "default": "",
    "required": false
  }
};

