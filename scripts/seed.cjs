import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

async function seed() {
  console.log("[v0] Starting database seed...");

  try {
    // Clear existing demo users
    await prisma.user.deleteMany({
      where: {
        email: {
          in: ["demo@user.com", "demo@admin.com"],
        },
      },
    });

    console.log("[v0] Creating demo users...");

    // Create demo user
    const demoUser = await prisma.user.create({
      data: {
        email: "demo@user.com",
        name: "Demo User",
        passwordHash: await bcrypt.hash("Demo@123", 10),
        role: "USER",
        emailVerified: new Date(),
      },
    });

    console.log("[v0] Created user:", demoUser.email);

    // Create demo admin
    const demoAdmin = await prisma.user.create({
      data: {
        email: "demo@admin.com",
        name: "Demo Admin",
        passwordHash: await bcrypt.hash("Admin@123", 10),
        role: "ADMIN",
        emailVerified: new Date(),
      },
    });

    console.log("[v0] Created admin:", demoAdmin.email);

    console.log("[v0] Demo accounts created successfully");

    // Create services
    console.log("[v0] Creating services...");
    
    const services = [
      { name: "Janam Kundli Analysis", price: 501, description: "Comprehensive birth chart analysis" },
      { name: "Career & Education Guidance", price: 1001, description: "Professional astrology guidance" },
      { name: "Marriage & Relationship Matching", price: 1501, description: "Kundli matching and compatibility" },
      { name: "Health & Wealth Astrology", price: 751, description: "Health and prosperity readings" },
      { name: "Gemstone Remedies", price: 501, description: "Personalized gemstone recommendations" },
      { name: "Mantra & Spiritual Remedies", price: 251, description: "Sacred mantras and rituals" },
    ];

    for (const service of services) {
      await prisma.service.upsert({
        where: { name: service.name },
        update: {},
        create: service,
      });
    }

    console.log("[v0] Services created successfully");

    // Create sample consultations
    const createdServices = await prisma.service.findMany();
    if (createdServices.length > 0) {
      await prisma.consultation.create({
        data: {
          userId: demoUser.id,
          email: demoUser.email,
          name: demoUser.name || "Demo User",
          serviceName: createdServices[0].name,
          price: createdServices[0].price,
          paymentStatus: "completed",
          consultationDate: new Date(),
          notes: "Sample consultation for demonstration",
        },
      });
    }

    console.log("[v0] Sample consultation created");

    // Create demo user profile
    await prisma.userProfile.create({
      data: {
        userId: demoUser.id,
        dateOfBirth: new Date("1990-01-15"),
        timeOfBirth: "10:30 AM",
        birthPlace: "Mumbai",
        birthCity: "Mumbai",
        birthCountry: "India",
        latitude: "19.0760",
        longitude: "72.8777",
        gender: "Male",
        maritalStatus: "Single",
        profession: "Software Engineer",
      },
    });

    console.log("[v0] User profile created");

    console.log("[v0] Database seed completed successfully!");
    console.log("[v0] Demo Credentials:");
    console.log("[v0] User: demo@user.com / Demo@123");
    console.log("[v0] Admin: demo@admin.com / Admin@123");
  } catch (error) {
    console.error("[v0] Seed error:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seed();
