import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

export const runtime = "nodejs";

let handler: any;

try {
  handler = NextAuth(authOptions);
} catch (error) {
  console.error("[v0] NextAuth initialization error:", error);
  handler = async () => {
    return new Response(JSON.stringify({ error: "Authentication service unavailable" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  };
}

export const GET = handler;
export const POST = handler;
