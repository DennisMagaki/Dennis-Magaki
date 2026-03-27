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
      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-white/10 text-gray-400 text-center">
        No recent tracks
      </div>
    );
  }

  return (
    <div className="group relative w-full overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl p-4 sm:p-5 transition-all duration-300 hover:border-white/20">

      {/* Background Glow */}
      <div
        className="absolute inset-0 opacity-50 blur-sm scale-110"
        style={{
          backgroundImage: `url(${track.image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className="absolute inset-0 bg-black/10" />

      {/* Content */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start sm:items-stretch gap-4 sm:gap-5">

        {/* Album Art */}
        <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 flex-shrink-0">
          <img
            src={track.image}
            alt={track.name}
            className="h-full w-full rounded-xl object-cover shadow-lg"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center flex-1 min-w-0 text-center sm:text-left">

          {/* Now Playing Row */}
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
            <p
              className={`text-[12px] uppercase tracking-[0.2em] font-bold ${
                isPlaying
                  ? "text-green-400 animate-pulse"
                  : "text-gray-400"
              }`}
            >
              {isPlaying ? "Now Playing" : "Last Played"}
            </p>

            {isPlaying && (
              <div className="flex items-end gap-[2px] h-3">
                <div className="w-[3px] bg-green-400 animate-[eq_1s_ease-in-out_infinite]" />
                <div className="w-[3px] bg-green-400 animate-[eq_0.8s_ease-in-out_infinite_0.2s]" />
                <div className="w-[3px] bg-green-400 animate-[eq_1.2s_ease-in-out_infinite_0.4s]" />
              </div>
            )}
          </div>

          {/* Track Name */}
          <h4 className="truncate text-lg sm:text-xl font-semibold text-white">
            {track.name}
          </h4>

          {/* Artist */}
          <p className="truncate text-sm sm:text-base text-gray-400">
            {track.artist}
          </p>
        </div>
      </div>
    </div>
  );
}