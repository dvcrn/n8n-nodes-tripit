# n8n-nodes-tripit Development Guide

## Build & Development Commands
- `npm run build` - Build the project
- `npm run dev` - Start development mode with watch
- `npm run format` - Format code with Prettier
- `npm run prepublishOnly` - Prepare for publishing

## Testing
- Create a `.env` file with TripIt credentials for testing:
  ```
  TRIPIT_CLIENT_ID=xxx
  TRIPIT_CLIENT_SECRET=xxx
  TRIPIT_USERNAME=xxx
  TRIPIT_PASSWORD=xxx
  ```
- Run scripts with `ts-node scripts/tripCli.ts` to test API functionality

## Code Style Guidelines
- TypeScript with strict mode enabled
- Use interfaces for all parameter types
- Follow camelCase for variables/parameters, PascalCase for classes
- Properly handle errors with try/catch blocks
- Use optional chaining for possibly undefined values
- Use strict equality comparison (===)
- Order object properties consistently using utility functions

## Credential Management
- Never hard-code credentials
- Use environment variables or n8n credential store
- Handle token refresh automatically when expired

## TripIt API Requirements
- Field order in API requests is CRITICAL - fields must be in the exact order defined in TripitInterfaces
- Object updates require full replacement - to update an object:
  1. Fetch the current object
  2. Update the necessary properties 
  3. Submit a complete replacement with all properties
- Never modify the order of fields in request objects as this will cause API failures