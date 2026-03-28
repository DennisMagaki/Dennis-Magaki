"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEnvelope, FaChartLine } from "react-icons/fa";

type Track = {
  name: string;
  artist: string;
  image: string;
  album: string;
};

export default function AdminHome() {
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
    const interval = setInterval(fetchTrack, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen text-white font-montserrat overflow-hidden">
      {/* 🎵 BACKGROUND IMAGE (TOP HALF) */}
      {track && (
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${track.image})` }}
        />
      )}

      {/* 🎨 GRADIENT FADE */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/20 via-black/50 to-black backdrop-blur-md" />

      {/* CONTENT */}
      <div className=" px-6 py-12 max-w-7xl mx-auto mt-20">
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start sm:items-stretch gap-4 sm:gap-5 mb-10">
          {track && (
            <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 flex-shrink-0">
              <img
                src={track.image}
                alt={track.name}
                className="h-full w-full rounded-xl object-cover shadow-lg"
              />
            </div>
          )}

          {/* HEADER (Music context) */}
          {track && (
            <div className="mb-10 text-center lg:text-start">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <p
                  className={`text-[12px] uppercase tracking-[0.2em] font-bold ${
                    isPlaying ? "text-green-400 animate-pulse" : "text-gray-400"
                  }`}
                >
                  {isPlaying ? "Now Playing" : "Last Played"}
                </p>

                {isPlaying && (
                  <div className="flex items-center gap-[2px] h-3">
                    <div className="w-[3px] bg-green-400 animate-[eq_1s_ease-in-out_infinite]" />
                    <div className="w-[3px] bg-green-400 animate-[eq_0.8s_ease-in-out_infinite_0.2s]" />
                    <div className="w-[3px] bg-green-400 animate-[eq_1.2s_ease-in-out_infinite_0.4s]" />
                  </div>
                )}
              </div>

              <h1 className="text-2xl sm:text-5xl font-bold">
                {track.name}
              </h1>

              <p className="text-gray-100 mt-1 text-xl">{track.artist}</p>
            </div>
          )}
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <Link href="/admin/messages">
            <Card
              title="Messages"
              description="View and manage user messages"
              color="blue"
              icon={<FaEnvelope size={24} />}
            />
          </Link>

          <Link href="/admin/analytics">
            <Card
              title="Analytics"
              description="Traffic, sessions & performance"
              color="purple"
              icon={<FaChartLine size={24} />}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  description,
  color = "blue",
  icon,
}: {
  title: string;
  description: string;
  color?: "blue" | "purple";
  icon: React.ReactNode;
}) {
  const styles = {
    blue: {
      gradient: "from-blue-500/20 to-cyan-500/10",
      border: "hover:border-blue-400/40",
      icon: "text-blue-300 bg-blue-500/10",
      glow: "group-hover:shadow-blue-500/20",
    },
    purple: {
      gradient: "from-purple-500/20 to-pink-500/10",
      border: "hover:border-purple-400/40",
      icon: "text-purple-300 bg-purple-500/10",
      glow: "group-hover:shadow-purple-500/20",
    },
  };

  return (
    <div
      className={`
        group relative rounded-2xl p-[1px]
        bg-gradient-to-br ${styles[color].gradient}
        transition-all duration-300
        hover:scale-[1.02]
      `}
    >
      <div
        className={`
          relative h-full rounded-2xl p-6
          bg-black/50 backdrop-blur-xl
          border border-white/10
          ${styles[color].border}
          transition-all duration-300
          ${styles[color].glow}
        `}
      >
        {/* subtle hover shine */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <div className="relative z-10 flex flex-col gap-4">
          {/* Icon */}
          <div
            className={`
              w-12 h-12 flex items-center justify-center rounded-xl
              ${styles[color].icon}
              transition-transform duration-300 group-hover:scale-110
            `}
          >
            {icon}
          </div>

          {/* Text */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight">
              {title}
            </h3>
            <p className="text-sm text-gray-400 mt-1">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
