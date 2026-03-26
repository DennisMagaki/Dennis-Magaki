"use client";

import Link from "next/link";
import { FaEnvelope, FaChartLine } from "react-icons/fa";
import { MusicCard } from "../components/MusicCard";

export default function AdminHome() {
  return (
    <div className="min-h-screen bg-black text-white font-montserrat mt-20">
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Music */}
        <div className="mb-12">
          <MusicCard />
        </div>

        {/* Section Title */}
        <h2 className="text-sm text-gray-400 mb-4 uppercase tracking-wider">
          Admin
        </h2>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/admin/messages">
            <Card
              title="Messages"
              description="Manage user messages"
              icon={<FaEnvelope size={18} />}
            />
          </Link>

          <Link href="/admin/analytics">
            <Card
              title="Analytics"
              description="Traffic & performance"
              icon={<FaChartLine size={18} />}
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
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className=" group rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.04]
      "
    >
      {/* Icon */}
      <div className="text-gray-400 mb-3 group-hover:text-white transition-colors">
        {icon}
      </div>

      {/* Text */}
      <h3 className="text-base font-medium tracking-tight">
        {title}
      </h3>
      <p className="text-sm text-gray-500 mt-1">
        {description}
      </p>
    </div>
  );
}