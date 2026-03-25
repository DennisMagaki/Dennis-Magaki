// lib/spotify.ts

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

const basic = Buffer.from(
  `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
).toString("base64");

export async function getAccessToken() {
  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN!,
    }),
  });

  return res.json();
}