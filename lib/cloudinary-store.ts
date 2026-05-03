import { v2 as cloudinary } from "cloudinary";

function hasCloudinaryUrl(): boolean {
  const u = process.env.CLOUDINARY_URL?.trim() ?? "";
  return u.length > 0 && u.toLowerCase().startsWith("cloudinary://");
}

export function isCloudinaryConfigured(): boolean {
  if (hasCloudinaryUrl()) return true;
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME?.trim() &&
      process.env.CLOUDINARY_API_KEY?.trim() &&
      process.env.CLOUDINARY_API_SECRET?.trim()
  );
}

function ensureConfigured(): void {
  if (hasCloudinaryUrl()) {
    // Loads api_key, api_secret, cloud_name from CLOUDINARY_URL
    cloudinary.config(true);
    return;
  }
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

/**
 * Upload an image buffer; returns HTTPS URL suitable for storing on Property rows.
 */
export async function uploadBufferToCloudinary(
  buffer: Buffer,
  contentType: string,
  folder: string,
  publicId: string
): Promise<string> {
  ensureConfigured();
  const dataUri = `data:${contentType};base64,${buffer.toString("base64")}`;
  const res = await cloudinary.uploader.upload(dataUri, {
    folder: folder.replace(/^\/+|\/+$/g, ""),
    public_id: publicId,
    overwrite: false,
    resource_type: "image",
  });
  return res.secure_url;
}
