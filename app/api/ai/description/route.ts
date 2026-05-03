export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generatePropertyDescription } from "@/lib/openai";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  try {
    const description = await generatePropertyDescription({
      title: body.title,
      bhk: body.bhk,
      area: body.area,
      city: body.city,
      amenities: body.amenities ?? [],
      price: body.price,
    });

    return NextResponse.json({ description });
  } catch {
    return NextResponse.json({ error: "AI description generation failed" }, { status: 500 });
  }
}
