// Auto-generated sample data - Do not modify manually
import { IParticipant, IActivity, IActivityResponse, ICreateActivityParams, IUpdateActivityParams } from "./activity.interface";

export const participantSample = {
  "first_name": {
    "default": "",
    "required": true
  },
  "last_name": {
    "default": "",
    "required": true
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

export const activitySample = {
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
  "location_name": {
    "default": "",
    "required": false
  },
  "Agency": {
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
  },
  "Participant": {
    "default": [],
    "required": false
  },
  "Image": {
    "default": [],
    "required": false
  }
};

export const activitySampleResponse = {
  "timestamp": {
    "default": "",
    "required": false
  },
  "num_bytes": {
    "default": "",
    "required": false
  },
  "ActivityObject": {
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
    "location_name": {
      "default": "",
      "required": false
    },
    "Agency": {
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
    },
    "Participant": {
      "default": [],
      "required": false
    },
    "Image": {
      "default": [],
      "required": false
    }
  }
};

export const createCreateActivityParams = {
  "tripId": {
    "default": "",
    "required": true
  },
  "displayName": {
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
  "endDate": {
    "default": "",
    "required": true
  },
  "endTime": {
    "default": "",
    "required": true
  },
  "timezone": {
    "default": "",
    "required": true
  },
  "address": {
    "default": "",
    "required": true
  },
  "locationName": {
    "default": "",
    "required": true
  }
};

export const updateUpdateActivityParams = {
  "uuid": {
    "default": "",
    "required": true
  },
  "tripId": {
    "default": "",
    "required": false
  },
  "displayName": {
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
  "endDate": {
    "default": "",
    "required": false
  },
  "endTime": {
    "default": "",
    "required": false
  },
  "timezone": {
    "default": "",
    "required": false
  },
  "address": {
    "default": "",
    "required": false
  },
  "locationName": {
    "default": "",
    "required": false
  },
  "Image": {
    "default": [],
    "required": false
  },
  "isPurchased": {
    "default": "",
    "required": false
  }
};

