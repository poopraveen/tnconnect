import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const saved = await prisma.savedProperty.findMany({
    where: { userId: session.user.id },
    include: {
      property: {
        include: {
          seller: { select: { id: true, name: true, email: true, phone: true, avatar: true, isVerified: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(saved.map((s) => s.property));
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { propertyId } = await req.json();

  try {
    const saved = await prisma.savedProperty.create({
      data: { userId: session.user.id, propertyId },
    });
    return NextResponse.json(saved, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Already saved" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { propertyId } = await req.json();

  await prisma.savedProperty.deleteMany({
    where: { userId: session.user.id, propertyId },
  });

  return NextResponse.json({ success: true });
}
