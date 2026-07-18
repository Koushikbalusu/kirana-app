export const isBunnyConfigured = Boolean(
  process.env.BUNNY_STORAGE_API_KEY && process.env.BUNNY_STORAGE_ZONE && process.env.BUNNY_CDN_URL
);

/**
 * Uploads a buffer to Bunny Storage and returns the public CDN URL.
 * Degrades to null if Bunny isn't configured yet — callers should handle
 * that by skipping image storage rather than failing the whole request.
 */
export async function uploadToBunny(
  buffer: Buffer,
  filename: string,
  folder: string
): Promise<string | null> {
  if (!isBunnyConfigured) return null;

  const zone = process.env.BUNNY_STORAGE_ZONE!;
  const endpoint =
    process.env.BUNNY_STORAGE_ENDPOINT || `https://sg.storage.bunnycdn.com/${zone}`;
  const path = `${endpoint}/${folder}/${filename}`;

  const res = await fetch(path, {
    method: "PUT",
    headers: {
      AccessKey: process.env.BUNNY_STORAGE_API_KEY!,
      "Content-Type": "application/octet-stream",
    },
    body: new Uint8Array(buffer),
  });

  if (!res.ok) return null;

  return `${process.env.BUNNY_CDN_URL}/${folder}/${filename}`;
}
