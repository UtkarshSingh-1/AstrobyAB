import { NextRequest, NextResponse } from "next/server";
import { resetPasswordSchema } from "@/lib/schemas";
import { generateOtp, hashOtp, getOtpExpiry } from "@/lib/otp";
import { sendOtpEmail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = resetPasswordSchema.parse(body);

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't reveal if email exists for security
      return NextResponse.json(
        { message: "If email exists, OTP will be sent" },
        { status: 200 }
      );
    }

    // Generate and hash OTP
    const otp = generateOtp();
    const hashedOtp = await hashOtp(otp);

    // Store OTP in database
    await prisma.otp.create({
      data: {
        email,
        otp: hashedOtp,
        purpose: "RESET_PASSWORD",
        expiresAt: getOtpExpiry(),
      },
    });

    // Send OTP email
    try {
      await sendOtpEmail(email, otp, user.name || undefined);
    } catch (emailError) {
      console.error("[v0] Email send error (non-critical):", emailError);
      // Don't fail reset if email sending fails - still continue
    }

    return NextResponse.json(
      { message: "OTP sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[v0] Reset OTP error:", error);
    return NextResponse.json(
      { error: "Failed to process reset request. Please try again." },
      { status: 500 }
    );
  }
}
