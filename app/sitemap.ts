import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { brand } from "@/lib/brand";

const BASE = brand.domain || process.env.NEXT_PUBLIC_APP_URL || "https://trustnest-tsgz.vercel.app";

const CITIES = [
  "Chennai", "Mumbai", "Delhi", "Bangalore", "Hyderabad",
  "Pune", "Kolkata", "Ahmedabad", "Coimbatore", "Madurai",
  "Trichy", "Salem", "Vellore", "Tirunelveli", "Erode", "Noida",
];

const PROPERTY_TYPES = ["APARTMENT", "VILLA", "INDEPENDENT_HOUSE", "PLOT", "COMMERCIAL", "PG"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const statics: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE}/properties`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
    { url: `${BASE}/login`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE}/register`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  ];

  // City + listing type pages
  const cityPages: MetadataRoute.Sitemap = CITIES.flatMap((city) => [
    {
      url: `${BASE}/properties?city=${encodeURIComponent(city)}&listingType=BUY`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${BASE}/properties?city=${encodeURIComponent(city)}&listingType=RENT`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
  ]);

  // Property type pages
  const typePages: MetadataRoute.Sitemap = PROPERTY_TYPES.map((type) => ({
    url: `${BASE}/properties?propertyType=${type}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  // Individual property pages
  let propertyPages: MetadataRoute.Sitemap = [];
  try {
    const properties = await prisma.property.findMany({
      where: { status: "APPROVED" },
      select: { id: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });
    propertyPages = properties.map((p) => ({
      url: `${BASE}/properties/${p.id}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch {
    // DB might be unavailable during build
  }

  return [...statics, ...cityPages, ...typePages, ...propertyPages];
}
