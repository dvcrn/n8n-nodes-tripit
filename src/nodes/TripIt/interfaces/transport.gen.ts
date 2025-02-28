// Auto-generated sample data - Do not modify manually
import { ITransportLocation, ITransportSegment, ITransport, ITransportResponse, ICreateTransportParams, IUpdateTransportParams } from "./transport.interface";

export const TransportLocationSchema = {
  "address": {
    "default": "",
    "required": true
  },
  "latitude": {
    "default": "",
    "required": false
  },
  "longitude": {
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
  }
};

export const TransportSegmentSchema = {
  "uuid": {
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
  "StartLocationAddress": {
    "address": {
      "default": "",
      "required": true
    },
    "latitude": {
      "default": "",
      "required": false
    },
    "longitude": {
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
    }
  },
  "EndLocationAddress": {
    "address": {
      "default": "",
      "required": true
    },
    "latitude": {
      "default": "",
      "required": false
    },
    "longitude": {
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
    }
  },
  "start_location_name": {
    "default": "",
    "required": false
  },
  "end_location_name": {
    "default": "",
    "required": false
  },
  "carrier_name": {
    "default": "",
    "required": false
  },
  "confirmation_num": {
    "default": "",
    "required": false
  },
  "number_passengers": {
    "default": "",
    "required": false
  },
  "vehicle_description": {
    "default": "",
    "required": false
  }
};

export const TransportSchema = {
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
  "has_possible_cancellation": {
    "default": false,
    "required": false
  },
  "Segment": {
    "uuid": {
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
    "StartLocationAddress": {
      "address": {
        "default": "",
        "required": true
      },
      "latitude": {
        "default": "",
        "required": false
      },
      "longitude": {
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
      }
    },
    "EndLocationAddress": {
      "address": {
        "default": "",
        "required": true
      },
      "latitude": {
        "default": "",
        "required": false
      },
      "longitude": {
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
      }
    },
    "start_location_name": {
      "default": "",
      "required": false
    },
    "end_location_name": {
      "default": "",
      "required": false
    },
    "carrier_name": {
      "default": "",
      "required": false
    },
    "confirmation_num": {
      "default": "",
      "required": false
    },
    "number_passengers": {
      "default": "",
      "required": false
    },
    "vehicle_description": {
      "default": "",
      "required": false
    }
  },
  "Traveler": {
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
  },
  "Image": {
    "default": [],
    "required": false
  }
};

export const TransportResponseSchema = {
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
  "TransportObject": {
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
    "has_possible_cancellation": {
      "default": false,
      "required": false
    },
    "Segment": {
      "uuid": {
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
      "StartLocationAddress": {
        "address": {
          "default": "",
          "required": true
        },
        "latitude": {
          "default": "",
          "required": false
        },
        "longitude": {
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
        }
      },
      "EndLocationAddress": {
        "address": {
          "default": "",
          "required": true
        },
        "latitude": {
          "default": "",
          "required": false
        },
        "longitude": {
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
        }
      },
      "start_location_name": {
        "default": "",
        "required": false
      },
      "end_location_name": {
        "default": "",
        "required": false
      },
      "carrier_name": {
        "default": "",
        "required": false
      },
      "confirmation_num": {
        "default": "",
        "required": false
      },
      "number_passengers": {
        "default": "",
        "required": false
      },
      "vehicle_description": {
        "default": "",
        "required": false
      }
    },
    "Traveler": {
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
    },
    "Image": {
      "default": [],
      "required": false
    }
  }
};

export const CreateTransportParamsSchema = {
  "tripId": {
    "default": "",
    "required": true
  },
  "timezone": {
    "default": "",
    "required": true
  },
  "startAddress": {
    "default": "",
    "required": true
  },
  "startDate": {
    "default": "",
    "required": true
  },
  "startTime": {
    "default": "",
    "required": true
  },
  "endAddress": {
    "default": "",
    "required": true
  },
  "endDate": {
    "default": "",
    "required": true
  },
  "endTime": {
    "default": "",
    "required": true
  },
  "startLocationName": {
    "default": "",
    "required": true
  },
  "endLocationName": {
    "default": "",
    "required": true
  },
  "vehicleDescription": {
    "default": "",
    "required": true
  },
  "confirmationNum": {
    "default": "",
    "required": true
  },
  "carrierName": {
    "default": "",
    "required": true
  },
  "numberPassengers": {
    "default": "",
    "required": true
  },
  "isClientTraveler": {
    "default": false,
    "required": false
  },
  "isPurchased": {
    "default": false,
    "required": false
  },
  "isTripitBooking": {
    "default": false,
    "required": false
  },
  "hasPossibleCancellation": {
    "default": false,
    "required": false
  }
};

export const UpdateTransportParamsSchema = {
  "uuid": {
    "default": "",
    "required": true
  },
  "tripId": {
    "default": "",
    "required": false
  },
  "timezone": {
    "default": "",
    "required": false
  },
  "startAddress": {
    "default": "",
    "required": false
  },
  "startDate": {
    "default": "",
    "required": false
  },
  "startTime": {
    "default": "",
    "required": false
  },
  "endAddress": {
    "default": "",
    "required": false
  },
  "endDate": {
    "default": "",
    "required": false
  },
  "endTime": {
    "default": "",
    "required": false
  },
  "startLocationName": {
    "default": "",
    "required": false
  },
  "endLocationName": {
    "default": "",
    "required": false
  },
  "vehicleDescription": {
    "default": "",
    "required": false
  },
  "confirmationNum": {
    "default": "",
    "required": false
  },
  "carrierName": {
    "default": "",
    "required": false
  },
  "numberPassengers": {
    "default": "",
    "required": false
  },
  "isClientTraveler": {
    "default": false,
    "required": false
  },
  "isPurchased": {
    "default": false,
    "required": false
  },
  "isTripitBooking": {
    "default": false,
    "required": false
  },
  "hasPossibleCancellation": {
    "default": false,
    "required": false
  },
  "Image": {
    "default": [],
    "required": false
  }
};

