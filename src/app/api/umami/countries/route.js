// app/api/umami/countries/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const res = await fetch(
    `${process.env.UMAMI_API_URL}/websites/${process.env.UMAMI_WEBSITE_ID}/countries`,
    {
      headers: {
        Authorization: `Bearer ${process.env.UMAMI_API_TOKEN}`,
      },
    }
  )

  const data = await res.json()
  return NextResponse.json(data)
}