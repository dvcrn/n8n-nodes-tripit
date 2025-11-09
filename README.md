# n8n-nodes-tripit

This is an n8n community node for interacting with the TripIt API. It provides functionality to create trips, add flights and hotels to trips, and get flight information.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

```bash
npm install n8n-nodes-tripit
```

## Operations

### Trip

- Create: Create a new trip with display name, start date, end date, and primary location

### Flight

- Add to Trip: Add a flight to an existing trip using flight number and marketing airline
- Get Flight Info: Get detailed information about a flight using the flight number

### Hotel

- Add to Trip: Add a hotel reservation to an existing trip with check-in and check-out dates
