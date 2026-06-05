export const SITE_URL = "https://www.usedpooltablesvancouver.com";

export const BUSINESS_NAME = "Used Pool Tables Vancouver";
export const SITE_DESCRIPTION =
  "Shop quality used pool tables in Vancouver with professional installation included in Metro Vancouver. Browse billiards, ping pong, foosball, and game-room products across British Columbia.";
export const BUSINESS_PHONE = "+16047794196";
export const BUSINESS_PHONE_DISPLAY = "604-779-4196";
export const CURRENCY = "CAD";

export const BUSINESS_ADDRESS = {
  streetAddress: "1644 Marine Drive SE",
  addressLocality: "Vancouver",
  addressRegion: "BC",
  postalCode: "V5P 2R6",
  addressCountry: "CA",
} as const;

export const SERVICE_AREAS = ["Metro Vancouver", "British Columbia"] as const;

export function absoluteUrl(path = "") {
  return new URL(path, SITE_URL).toString();
}
