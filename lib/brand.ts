/**
 * White-label branding for real-estate deployments.
 * Override via NEXT_PUBLIC_* env vars (see .env.example).
 */

function envTrim(value: string | undefined, fallback: string): string {
  const t = value?.trim();
  return t && t.length > 0 ? t : fallback;
}

const defaultName = "PooPrav TrustNest";

const name = envTrim(process.env.NEXT_PUBLIC_BRAND_NAME, defaultName);

export const brand = {
  /** Full legal / product name (metadata, copy, copyright) */
  name,
  /** Logo text before the accent color */
  wordmarkPrefix: envTrim(process.env.NEXT_PUBLIC_BRAND_WORDMARK_PREFIX, "PooPrav Trust"),
  /** Logo text in accent color (e.g. “Nest”) */
  wordmarkAccent: envTrim(process.env.NEXT_PUBLIC_BRAND_WORDMARK_ACCENT, "Nest"),
  tagline: envTrim(
    process.env.NEXT_PUBLIC_BRAND_TAGLINE,
    "India's Most Trusted Real Estate Platform"
  ),
  supportEmail: envTrim(process.env.NEXT_PUBLIC_BRAND_SUPPORT_EMAIL, "support@trustnest.in"),
  officeAddress: envTrim(
    process.env.NEXT_PUBLIC_BRAND_OFFICE_ADDRESS,
    "Corporate Office, Bandra Kurla Complex, Mumbai 400051"
  ),
  metaDescription: envTrim(
    process.env.NEXT_PUBLIC_BRAND_META_DESCRIPTION,
    `Find your dream home with ${name}. Buy, sell, or rent apartments, villas, plots, and commercial properties across India. Verified listings, AI recommendations, and transparent pricing.`
  ),
} as const;

export function pageTitleWithTagline(): string {
  return `${brand.name} – ${brand.tagline}`;
}
