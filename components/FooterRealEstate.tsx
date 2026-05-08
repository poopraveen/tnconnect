import Link from "next/link";
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { BrandWordmark } from "@/components/BrandWordmark";

const BRAND = {
  name: "TrustNest",
  footerDescription: "Find your dream property with TrustNest. Browse thousands of verified listings across Tamil Nadu's top cities.",
  supportEmail: "support@trustnest.in",
  phone: "+91 99400 00000",
  officeAddress: "No. 1, Anna Salai, Chennai 600002, Tamil Nadu",
  footerCities: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
  social: {
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    youtube: "",
  },
};

export default function FooterRealEstate() {
  const socialLinks = [
    [Facebook,  BRAND.social.facebook],
    [Twitter,   BRAND.social.twitter],
    [Instagram, BRAND.social.instagram],
    [Linkedin,  BRAND.social.linkedin],
    [Youtube,   BRAND.social.youtube],
  ] as const;

  return (
    <footer className="bg-primary-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-hero-gradient rounded-lg flex items-center justify-center">
                <Home className="w-4 h-4 text-white" />
              </div>
              <BrandWordmark className="text-xl text-white" prefixClassName="text-white" />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-xs">
              {BRAND.footerDescription}
            </p>
            <div className="flex gap-3">
              {socialLinks.filter(([, href]) => href && href !== "").map(([Icon, href], i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-primary-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary-700 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                ["Buy Property",       "/properties?listingType=BUY"],
                ["Rent Property",      "/properties?listingType=RENT"],
                ["New Projects",       "/projects"],
                ["Post Property Free", "/seller/properties/new"],
                ["All Properties",     "/properties"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-400 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Cities */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Top Cities</h3>
            <ul className="space-y-2.5">
              {BRAND.footerCities.map((city) => (
                <li key={city}>
                  <Link href={`/properties?city=${city}`} className="text-sm text-slate-400 hover:text-white transition-colors">
                    Properties in {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400">{BRAND.officeAddress}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <a href={`tel:${BRAND.phone.replace(/[^+\d]/g, "")}`} className="text-sm text-slate-400 hover:text-white transition-colors">
                  {BRAND.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <a href={`mailto:${BRAND.supportEmail}`} className="text-sm text-slate-400 hover:text-white transition-colors">
                  {BRAND.supportEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-900 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {[["Privacy Policy", "/privacy"], ["Terms of Service", "/terms"], ["Cookie Policy", "/cookies"]].map(([label, href]) => (
              <Link key={href} href={href} className="text-xs text-slate-500 hover:text-white transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
