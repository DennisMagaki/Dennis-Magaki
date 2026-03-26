"use client";

import { useEffect, useState } from "react";

type Track = {
  name: string;
  artist: string;
  album: string;
  image: string;
  url?: string;
};

export function MusicCard() {
  const [track, setTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    async function fetchTrack() {
      try {
        const res = await fetch("/api/spotify/now-playing");
        const data = await res.json();
        setTrack(data.track);
        setIsPlaying(data.isPlaying);
      } catch {
        setTrack(null);
      }
    }
    fetchTrack();
    const interval = setInterval(fetchTrack, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!track) {
    return (
      <div className="p-8 rounded-3xl bg-[#111111] border border-white/10 text-gray-400 text-center">
        No recent tracks
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] p-5 w-full h-[120px]">

  {/* Background Glow */}
  <div
    className="absolute inset-0 opacity-10 blur-2xl"
    style={{
      backgroundImage: `url(${track.image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  />

  <div className="relative z-10 flex items-center gap-4">
    {/* Album */}
    <div className="relative h-20 w-20 flex-shrink-0">
      <img
        src={track.image}
        alt=""
        className="h-full w-full rounded-lg object-cover"
      />

      {isPlaying && (
        <div className="absolute inset-1 flex items-end justify-end bg-black/40 backdrop-blur-md rounded-lg">
          <div className="flex items-end gap-[3px] h-5 p-1">
            <div className="eq-bar" style={{ animationDelay: "0.1s" }} />
            <div className="eq-bar" style={{ animationDelay: "0.3s" }} />
            <div className="eq-bar" style={{ animationDelay: "0.5s" }} />
          </div>
        </div>
      )}
    </div>

    {/* Info */}
    <div className="flex-1 min-w-0">
      <p className="text-xs uppercase tracking-wider text-gray-500">
        {isPlaying ? "Now Playing" : "Last Played"}
      </p>
      <h4 className="truncate text-xl font-semibold text-white">
        {track.name}
      </h4>
      <p className="truncate text-sm text-gray-400">
        {track.artist}
      </p>
    </div>
  </div>
</div>
  );
}
