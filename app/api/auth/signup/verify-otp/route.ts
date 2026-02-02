import { NextRequest, NextResponse } from "next/server";
import { verifyOtpSchema } from "@/lib/schemas";
import { verifyOtp } from "@/lib/otp";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, otp, password } = verifyOtpSchema.parse(body);

    // Find OTP record
    const otpRecord = await prisma.otp.findFirst({
      where: {
        email,
        purpose: "SIGNUP",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!otpRecord) {
      return NextResponse.json(
        { error: "OTP not found or expired" },
        { status: 400 }
      );
    }

    // Check if OTP is expired
    if (new Date() > otpRecord.expiresAt) {
      await prisma.otp.delete({ where: { id: otpRecord.id } });
      return NextResponse.json(
        { error: "OTP expired" },
        { status: 400 }
      );
    }

    // Verify OTP
    const isValid = await verifyOtp(otp, otpRecord.otp);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid OTP" },
        { status: 400 }
      );
    }

    // Create user
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: otpRecord.name || "User",
        email,
        passwordHash: hashedPassword,
        emailVerified: new Date(),
      },
    });

    // Delete OTP record
    await prisma.otp.delete({ where: { id: otpRecord.id } });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[v0] Verify OTP error:", error);
    return NextResponse.json(
      { error: "Failed to verify OTP" },
      { status: 500 }
    );
  }
}
