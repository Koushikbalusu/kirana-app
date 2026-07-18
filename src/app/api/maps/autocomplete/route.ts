import { NextResponse } from "next/server";
import { autocompleteAddress, getPlaceCoordinates } from "@/lib/maps/ola";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const placeId = searchParams.get("placeId");

  if (placeId) {
    const coords = await getPlaceCoordinates(placeId);
    return NextResponse.json({ coords });
  }

  const suggestions = await autocompleteAddress(q);
  return NextResponse.json({ suggestions });
}
