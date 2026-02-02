import { NextRequest, NextResponse } from "next/server";
import { verifyResetOtpSchema } from "@/lib/schemas";
import { verifyOtp } from "@/lib/otp";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, otp, password } = verifyResetOtpSchema.parse(body);

    // Find OTP record
    const otpRecord = await prisma.otp.findFirst({
      where: {
        email,
        purpose: "RESET_PASSWORD",
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

    // Update password
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { email },
      data: { passwordHash: hashedPassword },
    });

    // Delete OTP record
    await prisma.otp.delete({ where: { id: otpRecord.id } });

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[v0] Update password error:", error);
    return NextResponse.json(
      { error: "Failed to update password" },
      { status: 500 }
    );
  }
}
