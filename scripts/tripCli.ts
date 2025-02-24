import { TripItApi } from "../src/nodes/TripIt/api";
import { TripItService } from "../src/nodes/TripIt/service";
import { ITripItCredentials } from "../src/nodes/TripIt/types/ITripItTypes";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  // Verify required environment variables
  const requiredEnvVars = [
    "TRIPIT_CLIENT_ID",
    "TRIPIT_CLIENT_SECRET",
    "TRIPIT_USERNAME",
    "TRIPIT_PASSWORD",
  ];

  const missingVars = requiredEnvVars.filter((v) => !process.env[v]);
  if (missingVars.length > 0) {
    console.error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
    process.exit(1);
  }

  const credentials: ITripItCredentials = {
    clientId: process.env.TRIPIT_CLIENT_ID!,
    clientSecret: process.env.TRIPIT_CLIENT_SECRET!,
    username: process.env.TRIPIT_USERNAME!,
    password: process.env.TRIPIT_PASSWORD!,
  };

  const api = new TripItApi();
  const service = new TripItService(api);

  try {
    // Example: Create a new trip
    console.log("Creating a new trip...");
    const tripResponse = await service.createTrip(credentials, {
      displayName: "Test Trip",
      startDate: "2024-03-01",
      endDate: "2024-03-05",
      primaryLocation: "San Francisco, CA",
    });
    console.log("Trip created:", tripResponse);

    const tripId = tripResponse.Trip.id;

    // Add a 'transport'
    const transportResponse = await service.createTransport(credentials, {
      tripId,
      isClientTraveler: "true",
      isPurchased: "true",
      isTripitBooking: "false",
      hasPossibleCancellation: "false",
      timezone: "America/Los_Angeles",
      startAddress: "123 Pickup St, San Francisco, CA",
      startDate: "2024-03-02",
      startTime: "09:00",
      endAddress: "456 Dropoff St, San Francisco, CA",
      endDate: "2024-03-02",
      endTime: "10:00",
      startLocationName: "Hotel Pickup",
      endLocationName: "Airport Dropoff",
      vehicleDescription: "Black SUV",
      confirmationNum: "TR123456",
      carrierName: "Example Transport Co",
      numberPassengers: "2",
    });

    // // Example: Add a flight to the trip
    // console.log("\nAdding a flight...");
    // const flightResponse = await service.createFlight(credentials, {
    //   tripId,
    //   departureAirport: "SFO",
    //   arrivalAirport: "JFK",
    //   departureTime: "2024-03-01T10:00:00",
    //   arrivalTime: "2024-03-01T18:30:00",
    //   flightNumber: "UA123",
    //   marketingAirline: "United",
    //   isPurchased: true,
    // });
    // console.log("Flight added:", flightResponse);

    // // Example: Add a hotel to the trip
    // console.log("\nAdding a hotel...");
    // const hotelResponse = await service.createHotel(credentials, {
    //   tripId,
    //   hotelName: "Test Hotel",
    //   checkInDate: "2024-03-01",
    //   checkOutDate: "2024-03-05",
    //   checkInTime: "15:00",
    //   checkOutTime: "11:00",
    //   timezone: "America/Los_Angeles",
    //   numberGuests: 2,
    //   numberRooms: 1,
    //   street: "123 Test St",
    //   city: "San Francisco",
    //   state: "CA",
    //   zip: "94105",
    //   country: "US",
    //   isPurchased: true,
    // });
    // console.log("Hotel added:", hotelResponse);

    // // Example: Add an activity to the trip
    // console.log("\nAdding an activity...");
    // const activityResponse = await service.createActivity(credentials, {
    //   tripId,
    //   displayName: "City Tour",
    //   startDate: "2024-03-02",
    //   startTime: "10:00",
    //   endDate: "2024-03-02",
    //   endTime: "14:00",
    //   timezone: "America/Los_Angeles",
    //   locationName: "Downtown Tour",
    //   address: "Union Square, San Francisco, CA",
    // });
    // console.log("Activity added:", activityResponse);

    // Example: List all trips
    // console.log("\nListing all trips...");
    // const tripsResponse = await service.listTrips(credentials, {
    //   past: false,
    //   pageSize: 5,
    //   pageNum: 1,
    //   modifiedSince: 0,
    //   includeObjects: true,
    //   excludeTypes: "",
    //   traveler: "all",
    // });
    // console.log("Trips:", JSON.stringify(tripsResponse, null, 2));

    // console.log("Getting detail from trip...");
    // const trip = tripsResponse.Trip[0];

    // console.log(JSON.stringify(trip, null, 2));

    // const tripId = trip.id;
    // console.log("trip id -- ", tripId);
    // const tripDetailResponse = await service.getTripWithObjects(
    //   credentials,
    //   tripId
    // );

    // console.log(tripDetailResponse);
    // console.log("Trip detail:", JSON.stringify(tripDetailResponse, null, 2));
  } catch (error) {
    console.error("Error:", error);
  }
}

main().catch(console.error);
