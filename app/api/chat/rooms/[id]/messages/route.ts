import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const room = await prisma.chatRoom.findUnique({ where: { id: params.id } });
  if (!room) return NextResponse.json({ error: "Room not found" }, { status: 404 });

  const property = await prisma.property.findUnique({ where: { id: room.propertyId } });
  if (room.buyerId !== session.user.id && property?.sellerId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const messages = await prisma.message.findMany({
    where: { chatRoomId: params.id },
    include: {
      sender: { select: { id: true, name: true, avatar: true } },
    },
    orderBy: { createdAt: "asc" },
    take: 100,
  });

  // Mark messages as read
  await prisma.message.updateMany({
    where: { chatRoomId: params.id, senderId: { not: session.user.id }, read: false },
    data: { read: true },
  });

  return NextResponse.json(messages);
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const room = await prisma.chatRoom.findUnique({ where: { id: params.id } });
  if (!room) return NextResponse.json({ error: "Room not found" }, { status: 404 });

  const property = await prisma.property.findUnique({ where: { id: room.propertyId } });
  if (room.buyerId !== session.user.id && property?.sellerId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { content } = await req.json();
  if (!content?.trim()) {
    return NextResponse.json({ error: "Message cannot be empty" }, { status: 400 });
  }

  const message = await prisma.message.create({
    data: {
      content: content.trim(),
      senderId: session.user.id,
      chatRoomId: params.id,
    },
    include: {
      sender: { select: { id: true, name: true, avatar: true } },
    },
  });

  await prisma.chatRoom.update({
    where: { id: params.id },
    data: { updatedAt: new Date() },
  });

  return NextResponse.json(message, { status: 201 });
}
