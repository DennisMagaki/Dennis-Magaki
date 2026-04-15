import { NextResponse } from "next/server";
import { getPageViewsByUrl } from "@/lib/umami";

export const revalidate = 300; // ⏱ cache for 5 minutes

export async function GET() {
  try {
    const websiteId = process.env.UMAMI_WEBSITE_ID!;

    const views = await getPageViewsByUrl(
      websiteId,
      0,
      Date.now()
    );

    return NextResponse.json(views);
  } catch (err) {
    console.error("Views API error:", err);

    // fallback (VERY important)
    return NextResponse.json({});
  }
}