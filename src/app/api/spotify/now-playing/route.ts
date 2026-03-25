// app/api/spotify/now-playing/route.ts
import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/spotify";

// helper: safely parse JSON
function tryParseJSON(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function GET() {
  const { access_token } = await getAccessToken();

  // 1️⃣ Try current track
  const nowPlayingRes = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );

  const nowText = await nowPlayingRes.text();
  const now = tryParseJSON(nowText);

  if (now?.item) {
    return NextResponse.json({
      track: now.item,
      isPlaying: true,
    });
  }

  // 2️⃣ Fallback to last played
  const lastRes = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played?limit=1",
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );

  const lastText = await lastRes.text();
  const last = tryParseJSON(lastText);

  // debug log: shows what Spotify returned if not JSON
  if (!last) {
    console.warn("Spotify last-played returned invalid JSON:", lastText);
    return NextResponse.json({ track: null, isPlaying: false });
  }

  if (!last.items?.length) {
    return NextResponse.json({ track: null, isPlaying: false });
  }

  return NextResponse.json({
    track: last.items[0].track,
    isPlaying: false,
  });
}