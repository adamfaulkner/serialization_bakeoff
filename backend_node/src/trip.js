// Constants for enum values
export const RideableType = {
  UNKNOWN_RIDEABLE_TYPE: 0,
  ELECTRIC_BIKE: 1,
  CLASSIC_BIKE: 2
};

export const MemberCasual = {
  UNKNOWN_MEMBER_CASUAL: 0,
  MEMBER: 1,
  CASUAL: 2
};

// Helper function to convert string to RideableType enum
export function stringToRideableType(str) {
  if (!str) return RideableType.UNKNOWN_RIDEABLE_TYPE;
  
  const normalized = str.toLowerCase().trim();
  if (normalized === 'electric_bike') return RideableType.ELECTRIC_BIKE;
  if (normalized === 'classic_bike') return RideableType.CLASSIC_BIKE;
  return RideableType.UNKNOWN_RIDEABLE_TYPE;
}

// Helper function to convert string to MemberCasual enum
export function stringToMemberCasual(str) {
  if (!str) return MemberCasual.UNKNOWN_MEMBER_CASUAL;
  
  const normalized = str.toLowerCase().trim();
  if (normalized === 'member') return MemberCasual.MEMBER;
  if (normalized === 'casual') return MemberCasual.CASUAL;
  return MemberCasual.UNKNOWN_MEMBER_CASUAL;
}

// Parse a datetime string to milliseconds since epoch
export function parseDateTime(dateTimeStr) {
  if (!dateTimeStr) return null;
  
  const dateObj = new Date(dateTimeStr);
  return dateObj.getTime();
}