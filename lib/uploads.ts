import { randomUUID } from "crypto";
import { isS3Configured, uploadToS3 } from "@/lib/s3";
import { isCloudinaryConfigured, uploadBufferToCloudinary } from "@/lib/cloudinary-store";

export type UploadBackend = "s3" | "cloudinary";

/**
 * Which storage to use:
 * - UPLOAD_PROVIDER=s3 → S3 only
 * - UPLOAD_PROVIDER=cloudinary → Cloudinary only
 * - unset / auto → S3 if configured, else Cloudinary if configured
 */
export function resolveUploadBackend(): UploadBackend | null {
  const explicit = process.env.UPLOAD_PROVIDER?.trim().toLowerCase();
  if (explicit === "s3") {
    return isS3Configured() ? "s3" : null;
  }
  if (explicit === "cloudinary") {
    return isCloudinaryConfigured() ? "cloudinary" : null;
  }
  if (isS3Configured()) return "s3";
  if (isCloudinaryConfigured()) return "cloudinary";
  return null;
}

export async function uploadPropertyImage(
  buffer: Buffer,
  contentType: string,
  userId: string,
  originalExt: string
): Promise<{ url: string; backend: UploadBackend }> {
  const backend = resolveUploadBackend();
  if (!backend) {
    throw new Error("No upload backend configured");
  }

  if (backend === "s3") {
    const key = `properties/${userId}/${randomUUID()}.${originalExt}`;
    const url = await uploadToS3(buffer, key, contentType);
    return { url, backend };
  }

  const folder = `trustnest/properties/${userId}`;
  const publicId = randomUUID();
  const url = await uploadBufferToCloudinary(buffer, contentType, folder, publicId);
  return { url, backend };
}
