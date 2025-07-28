import { apodSchema, apodArraySchema, type ApodData } from "@schemas";

const APOD_URL = process.env.NEXT_PUBLIC_NASA_APOD_URL;
const APOD_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY;

function createBaseUrl() {
  if (!APOD_URL) {
    throw new Error("Missing env: NEXT_PUBLIC_NASA_APOD_URL");
  }
  if (!APOD_KEY) {
    throw new Error("Missing env: NEXT_PUBLIC_NASA_API_KEY");
  }
  const url = new URL(APOD_URL);
  url.searchParams.set("api_key", APOD_KEY);
  url.searchParams.set("thumbs", "true");
  return url;
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function responseCheck(response: Response) {
  if (!response.ok) {
    throw new Error(
      `NASA API error: ${response.status} ${response.statusText}`
    );
  }
  return undefined;
}

export async function getApodByDate(date: Date): Promise<ApodData> {
  const url = createBaseUrl();
  url.searchParams.set("date", formatDate(date));
  const response = await fetch(url.toString());
  responseCheck(response);
  console.log(response);
  const data = await response.json();
  return apodSchema.parse(data);
}

export async function getApodByDateRange(dateRange: {
  start: Date;
  end: Date;
}): Promise<ApodData[]> {
  const url = createBaseUrl();
  console.log(url);
  url.searchParams.set("start_date", formatDate(dateRange.start));
  url.searchParams.set("end_date", formatDate(dateRange.end));
  console.log(url);
  const response = await fetch(url.toString());
  responseCheck(response);
  const data = await response.json();
  return apodArraySchema.parse(data);
}

export async function getApodByCount(count: number): Promise<ApodData[]> {
  const url = createBaseUrl();
  url.searchParams.set("count", count.toString());
  const response = await fetch(url.toString());
  responseCheck(response);
  const data = await response.json();
  return apodArraySchema.parse(data);
}
