"use client";
import { useEffect, useState } from "react";

type Track = {
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
  external_urls: { spotify: string };
};

export default function SpotifyWidget() {
  const [track, setTrack] = useState<Track | null>(null);

  useEffect(() => {
  async function fetchTrack() {
    try {
      const res = await fetch("/api/spotify/now-playing");

      if (!res.ok) {
        setTrack(null);
        return;
      }

      const text = await res.text();

      if (!text) {
        setTrack(null);
        return;
      }

      const data = JSON.parse(text);
      setTrack(data.track);
    } catch (err) {
      console.error("Spotify fetch error:", err);
      setTrack(null);
    }
  }

  fetchTrack();
  const interval = setInterval(fetchTrack, 30_000);
  return () => clearInterval(interval);
}, []);

  if (!track) return <p className="text-gray-400">No track playing</p>;

  return (
    <a
      href={track.external_urls.spotify}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-white hover:text-green-400 transition mt-20"
    >
      <img
        src={track.album.images[0].url}
        alt={track.name}
        className="w-12 h-12 rounded"
      />
      <div className="truncate">
        <p className="text-sm font-semibold truncate">{track.name}</p>
        <p className="text-xs text-gray-300 truncate">
          {track.artists.map((a) => a.name).join(", ")}
        </p>
      </div>
    </a>
  );
}