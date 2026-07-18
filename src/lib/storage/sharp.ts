import sharp from "sharp";

export async function processProductImage(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer)
    .resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();
}

export async function generateThumbnail(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer).resize(300, 300, { fit: "cover" }).webp({ quality: 70 }).toBuffer();
}
