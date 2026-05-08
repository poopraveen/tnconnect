import { MetadataRoute } from "next";
import { brand } from "@/lib/brand";

const BASE = brand.domain || process.env.NEXT_PUBLIC_APP_URL || "https://trustnest-tsgz.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/properties", "/properties/"],
        disallow: [
          "/admin",
          "/seller/",
          "/api/",
          "/_next/",
          "/login",
          "/register",
        ],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
