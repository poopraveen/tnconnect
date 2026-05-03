import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = req.nextUrl;
  const action = searchParams.get("action");

  if (action === "approve" || action === "reject") {
    const status = action === "approve" ? "APPROVED" : "REJECTED";
    await prisma.property.update({ where: { id: params.id }, data: { status } });
    return NextResponse.redirect(new URL("/admin/properties", req.url));
  }

  const property = await prisma.property.findUnique({
    where: { id: params.id },
    include: { seller: { select: { id: true, name: true, email: true } } },
  });

  return NextResponse.json(property);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { status, verified, featured } = body;

  const updated = await prisma.property.update({
    where: { id: params.id },
    data: {
      ...(status && { status }),
      ...(verified !== undefined && { verified }),
      ...(featured !== undefined && { featured }),
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.property.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
