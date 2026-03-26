// app/api/now-playing/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.LASTFM_API_KEY!;
  const username = process.env.LASTFM_USERNAME!;

  const res = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`,
    { next: { revalidate: 5 } }
  );

  const data = await res.json();

  const track = data?.recenttracks?.track?.[0];

  if (!track) {
    return NextResponse.json({ track: null, isPlaying: false });
  }

  const isPlaying = track["@attr"]?.nowplaying === "true";

  return NextResponse.json({
    track: {
      name: track.name,
      artist: track.artist["#text"],
      album: track.album["#text"],
      image: track.image?.[2]?.["#text"], // medium image
      url: track.url,
    },
    isPlaying,
  });
}