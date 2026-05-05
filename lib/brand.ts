/**
 * ─────────────────────────────────────────────────────────────────────────────
 * WHITE-LABEL BRAND CONFIG
 * ─────────────────────────────────────────────────────────────────────────────
 * Every value here can be overridden by a NEXT_PUBLIC_* environment variable.
 * To white-label for a new real-estate company, just set these env vars in
 * Vercel (or .env.local) — no code changes needed.
 *
 * Required env vars for a fresh deployment:
 *   NEXT_PUBLIC_BRAND_NAME
 *   NEXT_PUBLIC_BRAND_WORDMARK_PREFIX
 *   NEXT_PUBLIC_BRAND_WORDMARK_ACCENT
 *   NEXT_PUBLIC_BRAND_TAGLINE
 *   NEXT_PUBLIC_BRAND_SUPPORT_EMAIL
 *   NEXT_PUBLIC_BRAND_PHONE
 *   NEXT_PUBLIC_BRAND_OFFICE_ADDRESS
 *   NEXT_PUBLIC_BRAND_FOOTER_DESCRIPTION
 *   NEXT_PUBLIC_BRAND_DOMAIN
 *   NEXT_PUBLIC_APP_URL
 * ─────────────────────────────────────────────────────────────────────────────
 */

function e(value: string | undefined, fallback: string): string {
  const t = value?.trim();
  return t && t.length > 0 ? t : fallback;
}

const name = e(process.env.NEXT_PUBLIC_BRAND_NAME, "PooPrav TrustNest");

export const brand = {
  /** Full product / legal name used in metadata, copyright, emails */
  name,

  /** Logo split: prefix + accent color part (e.g. "PooPrav Trust" + "Nest") */
  wordmarkPrefix: e(process.env.NEXT_PUBLIC_BRAND_WORDMARK_PREFIX, "PooPrav Trust"),
  wordmarkAccent: e(process.env.NEXT_PUBLIC_BRAND_WORDMARK_ACCENT, "Nest"),

  /** One-line tagline shown in hero, meta tags, footer */
  tagline: e(
    process.env.NEXT_PUBLIC_BRAND_TAGLINE,
    "India's Most Trusted Real Estate Platform"
  ),

  /** 2-3 sentence footer description */
  footerDescription: e(
    process.env.NEXT_PUBLIC_BRAND_FOOTER_DESCRIPTION,
    "India's most trusted real estate platform. Find verified properties for sale and rent across 50+ cities with AI-powered recommendations."
  ),

  /** Contact details */
  supportEmail: e(process.env.NEXT_PUBLIC_BRAND_SUPPORT_EMAIL, "support@poopravtrustnest.in"),
  phone: e(process.env.NEXT_PUBLIC_BRAND_PHONE, "1800-123-4567"),
  officeAddress: e(
    process.env.NEXT_PUBLIC_BRAND_OFFICE_ADDRESS,
    "Corporate Office, Anna Salai, Chennai 600002"
  ),

  /** Canonical domain (no trailing slash) */
  domain: e(process.env.NEXT_PUBLIC_BRAND_DOMAIN, "https://poopravtrustnest.in"),

  /** Social media links — set to "" to hide an icon */
  social: {
    facebook:  e(process.env.NEXT_PUBLIC_BRAND_FACEBOOK,  "#"),
    twitter:   e(process.env.NEXT_PUBLIC_BRAND_TWITTER,   "#"),
    instagram: e(process.env.NEXT_PUBLIC_BRAND_INSTAGRAM, "#"),
    linkedin:  e(process.env.NEXT_PUBLIC_BRAND_LINKEDIN,  "#"),
    youtube:   e(process.env.NEXT_PUBLIC_BRAND_YOUTUBE,   "#"),
  },

  /** SEO meta description */
  metaDescription: e(
    process.env.NEXT_PUBLIC_BRAND_META_DESCRIPTION,
    `Find your dream home with ${name}. Buy, sell, or rent apartments, villas, plots, and commercial properties across India. Verified listings, AI recommendations, and transparent pricing.`
  ),

  /** Footer city list — override to focus on specific regions */
  footerCities: (process.env.NEXT_PUBLIC_BRAND_FOOTER_CITIES ?? "")
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean)
    .slice(0, 8)
    .concat(
      ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad"]
    )
    .slice(0, 8),
} as const;

export function pageTitleWithTagline(): string {
  return `${brand.name} – ${brand.tagline}`;
}
