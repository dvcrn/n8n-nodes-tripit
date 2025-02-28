// Common interfaces
export * from "./common.interface";

// Main object interfaces
export * from "./activity.interface";
export * from "./air.interface";
export * from "./lodging.interface";
export * from "./transport.interface";
export * from "./trip.interface";

export type SchemaDefinition<T> = {
  [P in keyof T]: {
    default: T[P];
    required: boolean;
  };
};
