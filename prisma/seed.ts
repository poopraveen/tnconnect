import {
  PrismaClient,
  PropertyType,
  ListingType,
  PropertyStatus,
  Furnishing,
} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80",
];

async function main() {
  console.log("🌱 Seeding database...");

  // Admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@trustnest.in" },
    update: {},
    create: {
      name: "TrustNest Admin",
      email: "admin@trustnest.in",
      password: adminPassword,
      role: "ADMIN",
      isVerified: true,
    },
  });

  // Seller user
  const sellerPassword = await bcrypt.hash("seller123", 12);
  const seller = await prisma.user.upsert({
    where: { email: "seller@trustnest.in" },
    update: {},
    create: {
      name: "Rajesh Kumar",
      email: "seller@trustnest.in",
      password: sellerPassword,
      role: "SELLER",
      isVerified: true,
      phone: "+91 9876543210",
      bio: "Premium real estate broker with 10+ years of experience in Mumbai and Pune markets.",
    },
  });

  // Buyer user
  const buyerPassword = await bcrypt.hash("buyer123", 12);
  const buyer = await prisma.user.upsert({
    where: { email: "buyer@trustnest.in" },
    update: {},
    create: {
      name: "Priya Sharma",
      email: "buyer@trustnest.in",
      password: buyerPassword,
      role: "BUYER",
    },
  });

  // Sample properties
  const properties = [
    {
      title: "Luxurious 3 BHK Apartment in Bandra West",
      description: "A stunning sea-facing 3 BHK apartment in the heart of Bandra West. This property offers breathtaking views of the Arabian Sea and features modern amenities including a fully equipped gym, swimming pool, and 24/7 security. The apartment has been recently renovated with premium Italian marble flooring and modular kitchen. Just 5 minutes from Bandra station.",
      price: 18500000,
      city: "Mumbai",
      state: "Maharashtra",
      locality: "Bandra West",
      address: "Silver Heights, 14th Road",
      pincode: "400050",
      bhk: 3,
      bathrooms: 3,
      area: 1450,
      propertyType: PropertyType.APARTMENT,
      listingType: ListingType.BUY,
      furnishing: Furnishing.FULLY_FURNISHED,
      status: PropertyStatus.APPROVED,
      verified: true,
      featured: true,
      parking: true,
      latitude: 19.0596,
      longitude: 72.8295,
      images: [SAMPLE_IMAGES[0], SAMPLE_IMAGES[1], SAMPLE_IMAGES[2]],
      amenities: ["Swimming Pool", "Gym", "24/7 Security", "CCTV Surveillance", "Power Backup", "Lift", "Covered Parking"],
    },
    {
      title: "Spacious 2 BHK Apartment in Koramangala",
      description: "Modern 2 BHK apartment in the posh Koramangala locality of Bangalore. Perfect for IT professionals working in the tech corridor. The apartment features open plan living, large balcony overlooking the park, and fully modular kitchen. Walking distance from top restaurants, cafes and tech parks.",
      price: 8500000,
      city: "Bangalore",
      state: "Karnataka",
      locality: "Koramangala",
      address: "Green Valley Apartments, 5th Block",
      pincode: "560095",
      bhk: 2,
      bathrooms: 2,
      area: 1100,
      propertyType: PropertyType.APARTMENT,
      listingType: ListingType.BUY,
      furnishing: Furnishing.SEMI_FURNISHED,
      status: PropertyStatus.APPROVED,
      verified: true,
      featured: false,
      parking: true,
      latitude: 12.9352,
      longitude: 77.6245,
      images: [SAMPLE_IMAGES[1], SAMPLE_IMAGES[3]],
      amenities: ["Gym", "Club House", "Children's Play Area", "Power Backup", "Lift"],
    },
    {
      title: "Premium Villa in Jubilee Hills",
      description: "Magnificent 4 BHK villa in Jubilee Hills — one of Hyderabad's most exclusive neighborhoods. Spread across 3500 sqft, this villa offers a private garden, home theater, and terrace with panoramic city views. Built with the finest materials, it represents luxury living at its finest.",
      price: 45000000,
      city: "Hyderabad",
      state: "Telangana",
      locality: "Jubilee Hills",
      address: "Road No. 46, Jubilee Hills",
      pincode: "500033",
      bhk: 4,
      bathrooms: 4,
      area: 3500,
      propertyType: PropertyType.VILLA,
      listingType: ListingType.BUY,
      furnishing: Furnishing.FULLY_FURNISHED,
      status: PropertyStatus.APPROVED,
      verified: true,
      featured: true,
      parking: true,
      latitude: 17.4326,
      longitude: 78.4071,
      images: [SAMPLE_IMAGES[3], SAMPLE_IMAGES[4], SAMPLE_IMAGES[5]],
      amenities: ["Swimming Pool", "Garden", "24/7 Security", "CCTV Surveillance", "Gym", "Covered Parking", "Power Backup"],
    },
    {
      title: "Affordable 1 BHK for Rent in Whitefield",
      description: "Well-maintained 1 BHK apartment available for rent in Whitefield's IT corridor. Ideal for working professionals. The apartment is semi-furnished with wardrobe and kitchen appliances. Very close to EPIP Zone, Prestige Tech Park and Varthur Road.",
      price: 18000,
      city: "Bangalore",
      state: "Karnataka",
      locality: "Whitefield",
      address: "Maple Residency, ITPL Main Road",
      pincode: "560066",
      bhk: 1,
      bathrooms: 1,
      area: 650,
      propertyType: PropertyType.APARTMENT,
      listingType: ListingType.RENT,
      furnishing: Furnishing.SEMI_FURNISHED,
      status: PropertyStatus.APPROVED,
      verified: false,
      featured: false,
      parking: false,
      images: [SAMPLE_IMAGES[2]],
      amenities: ["Power Backup", "Lift", "CCTV Surveillance"],
    },
    {
      title: "3 BHK Independent House in Sector 15 Noida",
      description: "Spacious independent house in Noida Sector 15, ready to move in. Ground + 2 floors with separate terrace. Large garden in front with covered parking for 2 cars. Close to metro station, schools and hospitals. Excellent rental yield.",
      price: 12000000,
      city: "Noida",
      state: "Uttar Pradesh",
      locality: "Sector 15",
      address: "House No. 234, Sector 15",
      pincode: "201301",
      bhk: 3,
      bathrooms: 3,
      area: 2200,
      propertyType: PropertyType.INDEPENDENT_HOUSE,
      listingType: ListingType.BUY,
      furnishing: Furnishing.UNFURNISHED,
      status: PropertyStatus.APPROVED,
      verified: true,
      featured: false,
      parking: true,
      images: [SAMPLE_IMAGES[4], SAMPLE_IMAGES[0]],
      amenities: ["Garden", "Covered Parking", "24/7 Security"],
    },
    {
      title: "Commercial Space in Connaught Place",
      description: "Prime commercial office space in the prestigious Connaught Place, New Delhi. Ground floor with excellent visibility. Ideal for retail, showroom or premium office. 24/7 security and power backup. 500m from Rajiv Chowk Metro station.",
      price: 85000,
      city: "Delhi",
      state: "Delhi",
      locality: "Connaught Place",
      address: "Block A, Connaught Place",
      pincode: "110001",
      bhk: 1,
      bathrooms: 2,
      area: 1200,
      propertyType: PropertyType.COMMERCIAL,
      listingType: ListingType.RENT,
      furnishing: Furnishing.UNFURNISHED,
      status: PropertyStatus.APPROVED,
      verified: true,
      featured: true,
      parking: true,
      images: [SAMPLE_IMAGES[5]],
      amenities: ["24/7 Security", "Power Backup", "Lift", "CCTV Surveillance"],
    },
  ];

  for (const prop of properties) {
    await prisma.property.create({
      data: { ...prop, sellerId: seller.id },
    });
  }

  console.log("✅ Seed complete!");
  console.log("📧 Admin: admin@trustnest.in / admin123");
  console.log("📧 Seller: seller@trustnest.in / seller123");
  console.log("📧 Buyer: buyer@trustnest.in / buyer123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
