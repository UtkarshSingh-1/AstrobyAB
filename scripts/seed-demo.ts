import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seedDemo() {
  try {
    console.log("🌱 Seeding demo data...");

    // Clear existing demo accounts
    await prisma.user.deleteMany({
      where: {
        email: {
          in: ["demo@user.com", "demo@admin.com"],
        },
      },
    });

    // Create demo user
    const demoUser = await prisma.user.create({
      data: {
        name: "Demo User",
        email: "demo@user.com",
        passwordHash: await bcrypt.hash("Demo@123", 10),
        emailVerified: new Date(),
        role: "USER",
      },
    });

    console.log("✅ Demo User created:");
    console.log(`   Email: demo@user.com`);
    console.log(`   Password: Demo@123`);
    console.log(`   Role: USER`);

    // Create demo admin
    const demoAdmin = await prisma.user.create({
      data: {
        name: "Demo Admin",
        email: "demo@admin.com",
        passwordHash: await bcrypt.hash("Admin@123", 10),
        emailVerified: new Date(),
        role: "ADMIN",
      },
    });

    console.log("\n✅ Demo Admin created:");
    console.log(`   Email: demo@admin.com`);
    console.log(`   Password: Admin@123`);
    console.log(`   Role: ADMIN`);

    // Create sample service prices
    const services = [
      { serviceName: "Janam Kundli", price: 501 },
      { serviceName: "Career Guidance", price: 1001 },
      { serviceName: "Marriage Matching", price: 1501 },
      { serviceName: "Health & Wealth", price: 801 },
      { serviceName: "Gemstone Remedies", price: 601 },
      { serviceName: "Mantra Remedies", price: 401 },
    ];

    for (const service of services) {
      await prisma.servicePrice.upsert({
        where: { serviceName: service.serviceName },
        update: { price: service.price },
        create: {
          serviceName: service.serviceName,
          price: service.price,
          description: `Professional ${service.serviceName} consultation`,
        },
      });
    }

    console.log("\n✅ Service prices seeded");

    // Create sample consultation
    await prisma.consultation.create({
      data: {
        userId: demoUser.id,
        email: demoUser.email,
        name: demoUser.name || "Demo User",
        serviceName: "Janam Kundli",
        price: 501,
        paymentStatus: "pending",
      },
    });

    console.log("✅ Sample consultation created for demo user");

    console.log("\n✨ Demo seeding completed successfully!\n");
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedDemo();
