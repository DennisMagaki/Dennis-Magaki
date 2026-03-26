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
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d0d] p-6 transition-transform hover:scale-[1.02] w-full h-[140px]">
      {/* Background Glow */}
      <div
        className="absolute inset-0 opacity-20 blur-3xl pointer-events-none"
        style={{
          backgroundImage: `url(${track.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 flex items-center gap-6">
        {/* Album Art Container */}
        <div className="relative h-24 w-24 flex-shrink-0">
          <img
            src={track.image}
            alt=""
            className="h-full w-full rounded-xl object-cover shadow-2xl"
          />

          {/* Equalizer Overlay */}
          {isPlaying && (
            <div
              style={{
                position: "absolute",
                inset: 5,
                display: "flex",
                alignItems: "end",
                justifyContent: "end",
                backgroundColor: "rgba(0,0,0,0.35)",
                borderRadius: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "end",
                  gap: "4px",
                  height: "25px",
                  padding: "2px",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  backdropFilter: "blur(32px)",
                  WebkitBackdropFilter: "blur(32px)",
                  borderRadius: "6px",
                }}
              >
                <style>{`
                  @keyframes eq-bounce {
                    0%, 100% { height: 10px; }
                    50% { height: 20px; }
                  }
                  .eq-bar {
                    width: 4px;
                    background-color: #22c55e;
                    animation: eq-bounce 0.8s ease-in-out infinite;
                  }
                `}</style>
                <div className="eq-bar" style={{ animationDelay: "0.1s" }} />
                <div className="eq-bar" style={{ animationDelay: "0.3s" }} />
                <div className="eq-bar" style={{ animationDelay: "0.5s" }} />
              </div>
            </div>
          )}
        </div>

        {/* Info & Progress */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold uppercase tracking-widest text-gray-400">
            {isPlaying ? "Now Playing" : "Last Played"}
          </p>
          <h4 className="truncate text-3xl font-bold text-white mb-1">
            {track.name}
          </h4>
          <p className="truncate text-lg text-gray-400">{track.artist}</p>
        </div>
      </div>
    </div>
  );
}
