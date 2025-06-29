import { apodSchema, type ApodData } from "@schemas";

export async function getApod(): Promise<ApodData> {
  const apodUrl = process.env.NEXT_PUBLIC_NASA_APOD_URL;
  const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY;
  if (!apodUrl) {
    throw new Error("Missing env: NEXT_PUBLIC_NASA_APOD_URL");
  }
  const url = new URL(apodUrl);
  if (!apiKey) {
    throw new Error("Missing env: NEXT_PUBLIC_NASA_API_KEY");
  }
  url.searchParams.set("api_key", apiKey);
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(
      `NASA API error: ${response.status} ${response.statusText}`
    );
  }
  const data = await response.json();
  return apodSchema.parse(data);
}
