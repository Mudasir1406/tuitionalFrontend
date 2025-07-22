import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  // For best practice, use environment variables in production
  const pixelId = process.env.META_PIXEL_ID || "1950457082424995";
  const accessToken =
    process.env.META_PIXEL_ACCESS_TOKEN ||
    "EAALq11J7hlkBPKDoyPgtBJIwZAsXoAAd0QeGgwFGOMHyOFkrItzWZAxeBl4ZAPemTIOvfNf5st5561eogsR7qtr1pAWZBCQErGPCZCAqwqkvUXk766pGZCuIRrj61BX90wRjfgWpZBiYt08C4N0NTuhmsh5kUr9qNFfLUU9ZCk75H94DtWSdTTk253kqcBBA9AsiCgZDZD";

  // Extract cookies from the request
  const cookieStore = cookies();
  const fbp = cookieStore.get("_fbp")?.value;
  const fbc = cookieStore.get("_fbc")?.value;

  try {
    const body = await request.json();

    // Merge incoming user_data with cookies
    const user_data = {
      ...(body.user_data || {}),
      ...(fbp ? { fbp } : {}),
      ...(fbc ? { fbc } : {}),
    };

    // Build event payload
    const eventPayload = {
      ...body,
      user_data,
      action_source: "website",
    };

    const fbRes = await fetch(
      `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [eventPayload],
          test_event_code: "TEST9876",
        }),
      }
    );

    const data = await fbRes.json();

    if (!fbRes.ok) {
      console.error("Meta API error:", data);
      return new Response(JSON.stringify(data), { status: fbRes.status });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    console.error("Server error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
