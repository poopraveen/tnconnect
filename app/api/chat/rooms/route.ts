import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rooms = await prisma.chatRoom.findMany({
    where: {
      OR: [
        { buyerId: session.user.id },
        { property: { sellerId: session.user.id } },
      ],
    },
    include: {
      property: { select: { id: true, title: true, images: true, price: true } },
      buyer: { select: { id: true, name: true, avatar: true } },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(rooms);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { propertyId } = await req.json();

  const property = await prisma.property.findUnique({ where: { id: propertyId } });
  if (!property) return NextResponse.json({ error: "Property not found" }, { status: 404 });

  if (property.sellerId === session.user.id) {
    return NextResponse.json({ error: "Cannot chat with yourself" }, { status: 400 });
  }

  const room = await prisma.chatRoom.upsert({
    where: { propertyId_buyerId: { propertyId, buyerId: session.user.id } },
    create: { propertyId, buyerId: session.user.id },
    update: {},
  });

  return NextResponse.json(room);
}
