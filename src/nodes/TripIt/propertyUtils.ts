import {
  INodeProperties,
  NodeParameterValue,
  NodePropertyTypes,
} from "n8n-workflow";

/**
 * Converts a camelCase property name to display name format
 */
export function toDisplayName(propertyName: string): string {
  // Convert camelCase to Title Case with spaces
  const displayName = propertyName
    .replace(/([A-Z])/g, " $1") // Insert space before capital letters
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter

  return displayName.trim();
}

/**
 * Determines the n8n property type based on TypeScript type
 */
export function getPropertyType(value: unknown): NodePropertyTypes {
  if (typeof value === "string") return "string";
  if (typeof value === "number") return "number";
  if (typeof value === "boolean") return "boolean";
  // Default to string for complex types
  return "string";
}

/**
 * Orders properties according to the required API field order
 */
export function orderProperties(
  props: INodeProperties[],
  fieldOrder: readonly string[]
): INodeProperties[] {
  return [...props].sort((a, b) => {
    const aIndex = fieldOrder.indexOf(a.name);
    const bIndex = fieldOrder.indexOf(b.name);

    // If both fields are in the order array, sort by their position
    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }

    // If only one field is in the order array, prioritize it
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;

    // If neither field is in the order array, maintain original order
    return 0;
  });
}

/**
 * Generates n8n properties from TypeScript interfaces
 */
export function generateProperties<T>(
  params: T,
  fieldOrder: readonly string[],
  operation: "create" | "update" | "list" | "addToTrip",
  resource: string
): INodeProperties[] {
  const props: INodeProperties[] = [];
  const paramEntries = Object.entries(params as Record<string, unknown>);

  for (const [field, value] of paramEntries) {
    // Skip tripId for update operations as it's handled separately
    if (operation === "update" && field === "tripId") continue;
    // Skip uuid for create operations as it's not needed
    if (operation === "addToTrip" && field === "uuid") continue;

    const displayName = toDisplayName(field);

    // Determine the property type
    const propType = getPropertyType(value);
    const prop: INodeProperties = {
      displayName,
      name: field,
      type: propType,
      default: value as NodeParameterValue,
      required:
        operation === "create" &&
        !field.endsWith("?") &&
        field !== "isPurchased" &&
        field !== "notes" &&
        field !== "totalCost" &&
        field !== "bookingRate" &&
        field !== "restrictions" &&
        field !== "numberGuests" &&
        field !== "numberRooms" &&
        field !== "roomType",
      displayOptions: {
        show: {
          resource: [resource],
          operation: [operation],
        },
      },
      description: `The ${displayName.toLowerCase()}`,
    };

    props.push(prop);
  }

  return orderProperties(props, fieldOrder);
}
