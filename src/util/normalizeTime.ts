// normalizeTime takes a time string, for example 15:00, and makes sure it is formatted to 15:00:00 (if not already)
// This is needed because the TripIt API expects the time to be formatted
// if undefined, will return undefined
function normalizeTime(time: string): string | undefined {
  if (!time) {
    return undefined;
  }
  const timeParts = time.split(":");
  if (timeParts.length === 2) {
    return `${time}:00`;
  }
  return time;
}

export default normalizeTime;
