import { NextRequest, NextResponse } from "next/server";
import { signupSchema } from "@/lib/schemas";
import { generateOtp, hashOtp, getOtpExpiry } from "@/lib/otp";
import { sendOtpEmail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = signupSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
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
        purpose: "SIGNUP",
        name,
        expiresAt: getOtpExpiry(),
      },
    });

    // Send OTP email
    try {
      await sendOtpEmail(email, otp, name);
    } catch (emailError) {
      console.error("[v0] Email send error (non-critical):", emailError);
      // Don't fail signup if email sending fails - still continue
    }

    return NextResponse.json(
      { message: "OTP sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[v0] Signup OTP error:", error);
    return NextResponse.json(
      { error: "Failed to process signup. Please try again." },
      { status: 500 }
    );
  }
}
