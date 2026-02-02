import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const [totalUsers, totalConsultations, pendingPayments, completedConsultations] = await Promise.all([
      prisma.user.count(),
      prisma.consultation.count(),
      prisma.consultation.count({ where: { paymentStatus: "pending" } }),
      prisma.consultation.count({ where: { paymentStatus: "completed" } }),
    ]);

    const completedConsultationsData = await prisma.consultation.findMany({
      where: { paymentStatus: "completed" },
      select: { price: true },
    });

    const totalRevenue = completedConsultationsData.reduce((sum, c) => sum + c.price, 0);

    return NextResponse.json(
      {
        totalUsers,
        totalConsultations,
        pendingPayments,
        totalRevenue,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[v0] Admin stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
