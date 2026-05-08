export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyGallery from "@/components/PropertyGallery";
import PropertyMap from "@/components/PropertyMap";
import EMICalculator from "@/components/EMICalculator";
import ChatWidget from "@/components/ChatWidget";
import PropertyCard from "@/components/PropertyCard";
import { prisma } from "@/lib/prisma";
import { deserializeProperty } from "@/lib/db";
import {
  BedDouble, Bath, Square, MapPin, Calendar, CheckCircle,
  Star, Shield, Phone, Share2, Heart, Building2, Layers,
  Home, Car, ArrowLeft, Eye, Tag, Clock,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  formatPrice, getPropertyTypeLabel, getFurnishingLabel, timeAgo,
} from "@/lib/utils";
import { brand } from "@/lib/brand";
import { PropertyJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import LeadForm from "@/components/LeadForm";

interface PageProps {
  params: { id: string };
}

async function getProperty(id: string) {
  const property = await prisma.property.findUnique({
    where: { id },
    include: {
      seller: { select: { id: true, name: true, email: true, phone: true, avatar: true, isVerified: true, bio: true, createdAt: true } },
    },
  });

  if (!property) return null;

  // Increment views
  await prisma.property.update({ where: { id }, data: { views: { increment: 1 } } });

  return deserializeProperty(property);
}

async function getSimilarProperties(property: any) {
  const props = await prisma.property.findMany({
    where: {
      status: "APPROVED",
      id: { not: property.id },
      city: property.city,
      listingType: property.listingType,
      bhk: { in: [property.bhk - 1, property.bhk, property.bhk + 1].filter((n) => n > 0) },
    },
    include: {
      seller: { select: { id: true, name: true, email: true, phone: true, avatar: true, isVerified: true } },
    },
    take: 3,
    orderBy: { createdAt: "desc" },
  });
  return props.map(deserializeProperty);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const property = await prisma.property.findUnique({
    where: { id: params.id },
    select: { title: true, description: true, city: true, images: true, price: true, bhk: true },
  });

  if (!property) return { title: "Property Not Found" };

  return {
    title: `${property.bhk} BHK ${property.title} in ${property.city}`,
    description: property.description.substring(0, 160),
    openGraph: {
      title: property.title,
      description: property.description.substring(0, 160),
      images: property.images[0] ? [property.images[0]] : [],
    },
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const [property, ] = await Promise.all([getProperty(params.id)]);

  if (!property) notFound();

  const similar = await getSimilarProperties(property);

  const amenityGroups = [
    { label: "Indoor", items: property.amenities.filter((a: string) => ["Gym", "Club House", "Indoor Games", "Library"].includes(a)) },
    { label: "Outdoor", items: property.amenities.filter((a: string) => ["Swimming Pool", "Garden", "Jogging Track", "Tennis Court", "Basketball Court"].includes(a)) },
    { label: "Safety", items: property.amenities.filter((a: string) => ["24/7 Security", "CCTV Surveillance", "Fire Safety", "Intercom"].includes(a)) },
    { label: "Utilities", items: property.amenities.filter((a: string) => !["Gym", "Club House", "Indoor Games", "Library", "Swimming Pool", "Garden", "Jogging Track", "Tennis Court", "Basketball Court", "24/7 Security", "CCTV Surveillance", "Fire Safety", "Intercom"].includes(a)) },
  ].filter((g) => g.items.length > 0);

  const BASE = brand.domain || process.env.NEXT_PUBLIC_APP_URL || "https://trustnest-tsgz.vercel.app";

  return (
    <div className="min-h-screen bg-surface">
      {/* Structured data for Google rich results */}
      <PropertyJsonLd property={property} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Properties", url: "/properties" },
        { name: property.city, url: `/properties?city=${property.city}` },
        { name: property.title, url: `/properties/${property.id}` },
      ]} />

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-4">
          <Link href="/" className="hover:text-primary-700">Home</Link>
          <span>/</span>
          <Link href="/properties" className="hover:text-primary-700">Properties</Link>
          <span>/</span>
          <Link href={`/properties?city=${property.city}`} className="hover:text-primary-700">{property.city}</Link>
          <span>/</span>
          <span className="text-slate-700 truncate max-w-xs">{property.title}</span>
        </nav>

        {/* Gallery */}
        <PropertyGallery images={property.images} title={property.title} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Price */}
            <div className="card p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className={`badge ${property.listingType === "BUY" ? "badge-blue" : "badge-green"}`}>
                      {property.listingType === "BUY" ? "For Sale" : "For Rent"}
                    </span>
                    {property.verified && (
                      <span className="badge-green flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                    {property.featured && (
                      <span className="badge-orange">Featured</span>
                    )}
                  </div>
                  <h1 className="text-2xl font-bold text-slate-800">{property.title}</h1>
                  <p className="flex items-center gap-1.5 text-slate-500 mt-1">
                    <MapPin className="w-4 h-4 text-brand-orange flex-shrink-0" />
                    {property.address}, {property.locality}, {property.city} – {property.pincode}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary-800">
                    {formatPrice(property.price)}
                    {property.listingType === "RENT" && (
                      <span className="text-base font-normal text-slate-500">/mo</span>
                    )}
                  </p>
                  {property.priceNegotiable && (
                    <p className="text-xs text-emerald-600 font-medium mt-0.5">Price Negotiable</p>
                  )}
                  {property.listingType === "BUY" && (
                    <p className="text-xs text-slate-400 mt-0.5">
                      ₹{Math.round(property.price / property.area).toLocaleString("en-IN")}/{property.areaUnit}
                    </p>
                  )}
                </div>
              </div>

              {/* Key specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 pt-5 border-t border-slate-100">
                <SpecItem icon={BedDouble} label="BHK" value={`${property.bhk} Bedroom${property.bhk > 1 ? "s" : ""}`} />
                <SpecItem icon={Bath} label="Bathrooms" value={`${property.bathrooms} Bath`} />
                <SpecItem icon={Square} label="Area" value={`${property.area} ${property.areaUnit}`} />
                <SpecItem icon={Building2} label="Type" value={getPropertyTypeLabel(property.propertyType)} />
              </div>
            </div>

            {/* Property Details */}
            <div className="card p-6">
              <h2 className="font-bold text-slate-800 text-lg mb-4">Property Details</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-5 gap-x-4">
                {[
                  { label: "Property Type", value: getPropertyTypeLabel(property.propertyType) },
                  { label: "Listing Type", value: property.listingType === "BUY" ? "For Sale" : "For Rent" },
                  { label: "Furnishing", value: getFurnishingLabel(property.furnishing) },
                  { label: "Floor", value: property.floor ? `${property.floor} of ${property.totalFloors ?? "?"}` : "Ground" },
                  { label: "Parking", value: property.parking ? "Available" : "Not Available" },
                  { label: "Facing", value: property.facing ?? "N/A" },
                  { label: "Age of Property", value: property.ageOfProperty ? `${property.ageOfProperty} years` : "New" },
                  { label: "Available From", value: property.availableFrom ? new Date(property.availableFrom).toLocaleDateString("en-IN") : "Immediately" },
                  { label: "Listed", value: timeAgo(property.createdAt) },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xs text-slate-400">{item.label}</p>
                    <p className="text-sm font-semibold text-slate-700 mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="card p-6">
              <h2 className="font-bold text-slate-800 text-lg mb-3">About This Property</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line text-sm">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            {property.amenities.length > 0 && (
              <div className="card p-6">
                <h2 className="font-bold text-slate-800 text-lg mb-4">
                  Amenities & Features
                </h2>
                {amenityGroups.length > 0 ? (
                  <div className="space-y-4">
                    {amenityGroups.map((group) => (
                      <div key={group.label}>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{group.label}</p>
                        <div className="flex flex-wrap gap-2">
                          {group.items.map((a: string) => (
                            <span key={a} className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-xs font-medium border border-primary-100">
                              <CheckCircle className="w-3 h-3" />
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((a: string) => (
                      <span key={a} className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-xs font-medium">
                        <CheckCircle className="w-3 h-3" />
                        {a}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Map */}
            {property.latitude && property.longitude ? (
              <div className="card p-6">
                <h2 className="font-bold text-slate-800 text-lg mb-4">Location & Neighbourhood</h2>
                <Suspense fallback={<div className="h-72 bg-slate-100 rounded-xl animate-pulse" />}>
                  <PropertyMap
                    latitude={property.latitude}
                    longitude={property.longitude}
                    title={property.title}
                    address={`${property.address}, ${property.city}`}
                  />
                </Suspense>
              </div>
            ) : null}

            {/* EMI Calculator */}
            {property.listingType === "BUY" && (
              <div className="card p-6">
                <h2 className="font-bold text-slate-800 text-lg mb-4">EMI Calculator</h2>
                <EMICalculator propertyPrice={property.price} />
              </div>
            )}
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-5">
            {/* Seller info */}
            <div className="card p-5">
              <h3 className="font-bold text-slate-800 mb-4">Listed By</h3>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {property.seller.avatar ? (
                    <Image
                      src={property.seller.avatar}
                      alt={property.seller.name ?? ""}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-primary-700 font-bold text-lg">
                      {property.seller.name?.charAt(0) ?? "S"}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 truncate">{property.seller.name ?? "Seller"}</p>
                  {property.seller.isVerified && (
                    <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                      <Shield className="w-3 h-3" />
                      Verified Seller
                    </span>
                  )}
                  <p className="text-xs text-slate-400 mt-0.5">
                    Member since {new Date(property.seller.createdAt).getFullYear()}
                  </p>
                </div>
              </div>

              {property.seller.bio && (
                <p className="text-sm text-slate-500 mb-4 line-clamp-2">{property.seller.bio}</p>
              )}

              <div className="space-y-2">
                {property.seller.phone && (
                  <a
                    href={`tel:${property.seller.phone}`}
                    className="btn-primary w-full justify-center"
                  >
                    <Phone className="w-4 h-4" />
                    Call Seller
                  </a>
                )}
                <ChatWidget
                  propertyId={property.id}
                  propertyTitle={property.title}
                  sellerId={property.sellerId}
                  sellerName={property.seller.name}
                />
              </div>
            </div>

            {/* Lead / Enquiry Form */}
            <LeadForm
              propertyId={property.id}
              propertyTitle={property.title}
              sellerPhone={property.seller.phone}
              source="property-detail"
            />

            {/* Quick Actions */}
            <div className="card p-5">
              <h3 className="font-bold text-slate-800 mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                <button className="flex flex-col items-center gap-1.5 p-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-xs font-medium text-slate-600">
                  <Heart className="w-4 h-4 text-red-400" />
                  Save
                </button>
                <button className="flex flex-col items-center gap-1.5 p-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-xs font-medium text-slate-600">
                  <Share2 className="w-4 h-4 text-blue-400" />
                  Share
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-primary-50 rounded-xl p-4 border border-primary-100">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary-800">{property.views}</p>
                  <p className="text-xs text-slate-500">Total Views</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary-800">
                    {Math.round(property.price / property.area).toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-slate-500">₹/{property.areaUnit}</p>
                </div>
              </div>
            </div>

            {/* Safety tips */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-semibold text-amber-800">Safety Tips</span>
              </div>
              <ul className="text-xs text-amber-700 space-y-1">
                <li>• Never pay advance without visiting the property</li>
                <li>• Verify all documents before making payment</li>
                <li>• Meet seller at the property location</li>
                <li>• Use the {brand.name} secure payment gateway</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similar.length > 0 && (
          <div className="mt-10">
            <h2 className="section-title mb-6">Similar Properties in {property.city}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {similar.map((p) => <PropertyCard key={p.id} property={p as any} />)}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

function SpecItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
      <div className="w-9 h-9 bg-white rounded-lg shadow-sm flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-primary-600" />
      </div>
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-sm font-semibold text-slate-700">{value}</p>
      </div>
    </div>
  );
}
