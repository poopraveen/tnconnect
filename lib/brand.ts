function e(value: string | undefined, fallback: string): string {
  const t = value?.trim();
  return t && t.length > 0 ? t : fallback;
}

const name = e(process.env.NEXT_PUBLIC_BRAND_NAME, "TN Vettri");

export const brand = {
  name,

  // Wordmark: "TN" prefix + "Vettri" accent
  wordmarkPrefix: e(process.env.NEXT_PUBLIC_BRAND_WORDMARK_PREFIX, "TN"),
  wordmarkAccent: e(process.env.NEXT_PUBLIC_BRAND_WORDMARK_ACCENT, "Vettri"),

  // Tamil: தமிழ்நாடு வெற்றி — Transparency platform tagline
  tagline: e(
    process.env.NEXT_PUBLIC_BRAND_TAGLINE,
    "Tamil Nadu Public Transparency Platform"
  ),
  taglineTamil: "தமிழ்நாடு வெளிப்படைத்தன்மை தளம்",

  footerDescription: e(
    process.env.NEXT_PUBLIC_BRAND_FOOTER_DESCRIPTION,
    "Track Tamil Nadu government spending, project progress, scheme benefits, and grievance resolution in real time. Open data for every citizen."
  ),

  supportEmail: e(process.env.NEXT_PUBLIC_BRAND_SUPPORT_EMAIL, "transparency@tn.gov.in"),
  phone: e(process.env.NEXT_PUBLIC_BRAND_PHONE, "1800-425-1188"),
  officeAddress: e(
    process.env.NEXT_PUBLIC_BRAND_OFFICE_ADDRESS,
    "Secretariat, Fort St. George, Chennai 600009"
  ),

  domain: e(process.env.NEXT_PUBLIC_BRAND_DOMAIN, "https://tnvettri.gov.in"),

  social: {
    facebook:  e(process.env.NEXT_PUBLIC_BRAND_FACEBOOK,  "#"),
    twitter:   e(process.env.NEXT_PUBLIC_BRAND_TWITTER,   "#"),
    youtube:   e(process.env.NEXT_PUBLIC_BRAND_YOUTUBE,   "#"),
  },

  metaDescription: e(
    process.env.NEXT_PUBLIC_BRAND_META_DESCRIPTION,
    "Track Tamil Nadu budget expenditure, government project progress, scheme beneficiaries, and file grievances. Open, transparent governance for every citizen."
  ),

  // The 38 TN districts used across the app
  districts: [
    "Ariyalur","Chengalpattu","Chennai","Coimbatore","Cuddalore",
    "Dharmapuri","Dindigul","Erode","Kallakurichi","Kancheepuram",
    "Kanyakumari","Karur","Krishnagiri","Madurai","Mayiladuthurai",
    "Nagapattinam","Namakkal","Nilgiris","Perambalur","Pudukkottai",
    "Ramanathapuram","Ranipet","Salem","Sivaganga","Tenkasi",
    "Thanjavur","Theni","Thoothukudi","Tiruchirappalli","Tirunelveli",
    "Tirupathur","Tiruppur","Tiruvallur","Tiruvannamalai","Vellore",
    "Viluppuram","Virudhunagar","Tiruvarur",
  ],
} as const;

export function pageTitleWithTagline(): string {
  return `${brand.name} – ${brand.tagline}`;
}
