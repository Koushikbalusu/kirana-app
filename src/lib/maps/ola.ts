export interface PlaceSuggestion {
  description: string;
  placeId: string;
}

const OLA_BASE = "https://api.olamaps.io";

function getKey(): string | null {
  return process.env.NEXT_PUBLIC_OLA_MAPS_API_KEY || process.env.OLA_MAPS_API_KEY || null;
}

export const isOlaMapsConfigured = () => Boolean(getKey());

/** Degrades to an empty list if no API key is configured — caller falls back to manual entry. */
export async function autocompleteAddress(input: string): Promise<PlaceSuggestion[]> {
  const key = getKey();
  if (!key || !input.trim()) return [];
  try {
    const res = await fetch(
      `${OLA_BASE}/places/v1/autocomplete?input=${encodeURIComponent(input)}&api_key=${key}`
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.predictions ?? []).map((p: { description: string; place_id: string }) => ({
      description: p.description,
      placeId: p.place_id,
    }));
  } catch {
    return [];
  }
}

export async function getPlaceCoordinates(placeId: string): Promise<{ lat: number; lng: number } | null> {
  const key = getKey();
  if (!key) return null;
  try {
    const res = await fetch(`${OLA_BASE}/places/v1/details?place_id=${placeId}&api_key=${key}`);
    if (!res.ok) return null;
    const data = await res.json();
    const loc = data.result?.geometry?.location;
    if (!loc) return null;
    return { lat: loc.lat, lng: loc.lng };
  } catch {
    return null;
  }
}

export async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  const key = getKey();
  if (!key) return null;
  try {
    const res = await fetch(
      `${OLA_BASE}/places/v1/reverse-geocode?latlng=${lat},${lng}&api_key=${key}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.results?.[0]?.formatted_address ?? null;
  } catch {
    return null;
  }
}
