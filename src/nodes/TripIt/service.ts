// Re-export everything from the new modular service structure
export * from "./services/tripit.service";
export * from "./interfaces";

// This file now serves as a compatibility layer, re-exporting from the new modular structure.
// All actual implementation has been moved to specialized service classes.
