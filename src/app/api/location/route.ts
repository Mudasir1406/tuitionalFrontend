// app/api/location/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Get IP from query parameter (passed by client) or from headers
    const { searchParams } = new URL(req.url);
    const clientIp = searchParams.get("ip");

    // Extract user's real IP from headers (works with Vercel, Netlify, and most hosting providers)
    const forwarded = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const headerIp = forwarded?.split(",")[0] || realIp || req.ip || "";

    // Prefer client IP (from ipify), then header IP
    const userIp = clientIp || headerIp;

    // Skip localhost IPs
    const isLocalhost = userIp === "127.0.0.1" || userIp === "::1" || userIp?.startsWith("192.168.") || userIp?.startsWith("10.");

    // Fetch geolocation data for the user's IP
    const apiUrl = userIp && !isLocalhost
      ? `http://ip-api.com/json/${userIp}`
      : "http://ip-api.com/json/";

    const res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error(`IP API request failed: ${res.status}`);
    }

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=600", // optional caching
      },
    });
  } catch (error: any) {
    console.error("IP fetch error:", error.message || error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch location data" }),
      { status: 500 }
    );
  }
}
