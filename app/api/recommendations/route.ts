import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAIRecommendations } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { city, budget, bhk, propertyType, listingType, preferences } = body;

    const where: any = { status: "APPROVED" };
    if (city) where.city = { contains: city, mode: "insensitive" };
    if (listingType) where.listingType = listingType;

    const properties = await prisma.property.findMany({
      where,
      include: {
        seller: { select: { id: true, name: true, email: true, phone: true, avatar: true, isVerified: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    if (!process.env.OPENAI_API_KEY) {
      // Fallback: simple rule-based recommendations
      const scored = properties
        .map((p) => {
          let score = 0;
          if (budget && p.price <= budget) score += 3;
          if (bhk && p.bhk === bhk) score += 2;
          if (propertyType && p.propertyType === propertyType) score += 2;
          if (p.verified) score += 1;
          if (p.featured) score += 1;
          return { property: p, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

      return NextResponse.json({
        properties: scored.map((s) => s.property),
        reasoning: "Based on your preferences for budget, BHK, and property type.",
      });
    }

    const { propertyIds, reasoning } = await getAIRecommendations(
      { city, budget, bhk, propertyType, listingType, preferences },
      properties
    );

    const recommended = propertyIds
      .map((id) => properties.find((p) => p.id === id))
      .filter(Boolean);

    return NextResponse.json({ properties: recommended, reasoning });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to get recommendations" }, { status: 500 });
  }
}
