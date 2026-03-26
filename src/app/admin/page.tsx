"use client";

import Link from "next/link";
import { FaEnvelope, FaChartLine } from "react-icons/fa";
import { MusicCard } from "../components/MusicCard";

export default function AdminHome() {
  return (
    <div className="min-h-screen bg-black text-white font-montserrat mt-20">

      <div className="relative max-w-7xl mx-auto px-6 py-12 mt-20">

        {/* Music Card – full width */}
        <div className="mb-12">
          <div className="relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
            <MusicCard />
          </div>
        </div>

        {/* Cards Grid */}
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

// Card Component – Reliable gradient border with solid interior
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
  const gradientFromTo = {
    blue: "from-blue-600 to-cyan-600",
    purple: "from-purple-600 to-pink-600",
  };
  const accentColor = {
    blue: "text-blue-400",
    purple: "text-purple-400",
  };
  const iconBg = {
    blue: "bg-blue-500/10 text-blue-400",
    purple: "bg-purple-500/10 text-purple-400",
  };

  return (
    <div className="group relative">
      {/* Gradient border – visible because inner card has a solid background */}
      <div
        className={`
          absolute -inset-0.5 rounded-2xl 
          bg-gradient-to-r ${gradientFromTo[color]} 
          opacity-75 group-hover:opacity-100 blur-sm 
          transition duration-500
        `}
      />
      <div
        className={`
          relative rounded-2xl p-6 
          bg-gray-900/90 backdrop-blur-sm 
          border border-white/10 
          transition-all duration-300 
          group-hover:scale-[1.02] group-hover:border-white/20
        `}
      >
        {/* Icon */}
        <div
          className={`
            w-14 h-14 flex items-center justify-center rounded-xl 
            ${iconBg[color]}
            transition-transform duration-300 group-hover:scale-110
          `}
        >
          {icon}
        </div>

        {/* Text */}
        <div className="mt-4">
          <h3 className="text-xl font-semibold tracking-tight group-hover:text-white transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}