import { NextResponse } from "next/server";
import { reverseGeocode } from "@/lib/maps/ola";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));
  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    return NextResponse.json({ error: "lat/lng required" }, { status: 400 });
  }
  const label = await reverseGeocode(lat, lng);
  return NextResponse.json({ label });
}
