// app/api/location/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const res = await fetch("http://ip-api.com/json/");

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
