// app/api/umami/stats/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getWebsiteStats } from '@/lib/umami';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const websiteId = searchParams.get('websiteId');
  const startAt = searchParams.get('startAt');
  const endAt = searchParams.get('endAt');

  if (!websiteId || !startAt || !endAt) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  try {
    const data = await getWebsiteStats(
      websiteId,
      parseInt(startAt),
      parseInt(endAt)
    );
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}