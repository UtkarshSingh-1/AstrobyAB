import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html,
    });
    console.log("[v0] Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("[v0] Email error:", error);
    throw error;
  }
}

export async function sendOtpEmail(email: string, otp: string, name?: string) {
  const subject = "Your OTP Code";
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #900 0%, #f84 100%); padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0;">ASTRO BY AB</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">Vedic Astrology & Cosmic Guidance</p>
      </div>
      <div style="padding: 30px; background: #f5f5f5;">
        <p style="font-size: 16px; color: #333;">Hello${name ? ` ${name}` : ""},</p>
        <p style="font-size: 14px; color: #666; line-height: 1.6;">
          Your verification code is:
        </p>
        <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
          <p style="font-size: 32px; font-weight: bold; color: #900; letter-spacing: 5px; margin: 0;">
            ${otp}
          </p>
        </div>
        <p style="font-size: 14px; color: #999;">
          This code will expire in 10 minutes.
        </p>
        <p style="font-size: 12px; color: #999; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 20px;">
          If you didn't request this code, please ignore this email.
        </p>
      </div>
      <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
        <p style="margin: 0;">© 2025 ASTRO BY AB. All rights reserved.</p>
      </div>
    </div>
  `;

  return sendEmail({ to: email, subject, html });
}
