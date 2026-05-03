import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { resolveUploadBackend, uploadPropertyImage } from "@/lib/uploads";

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Only JPEG, PNG, WebP allowed" }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
  }

  if (!resolveUploadBackend()) {
    console.error(
      "Upload: configure S3 (AWS_*) or Cloudinary (CLOUDINARY_*), or set UPLOAD_PROVIDER=s3|cloudinary"
    );
    return NextResponse.json(
      {
        error:
          "Upload is not configured. Set AWS S3 env vars and/or Cloudinary (see .env.example).",
      },
      { status: 503 }
    );
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split(".").pop() ?? "jpg";
    const { url } = await uploadPropertyImage(buffer, file.type, session.user.id, ext);
    return NextResponse.json({ url });
  } catch (error) {
    const err = error as Error & { name?: string; Code?: string; $metadata?: { httpStatusCode?: number } };
    console.error("Upload error:", err.name, err.message, (err as { Code?: string }).Code ?? err.$metadata);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
