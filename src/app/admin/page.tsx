"use client";

import Link from "next/link";
import { FaEnvelope, FaChartLine } from "react-icons/fa";

export default function AdminHome() {
  return (
    <div className="bg-black text-white min-h-screen px-6 py-10 font-montserrat space-y-10 mt-20">
      
      {/* CARDS GRID */}
      <div className="grid sm:grid-cols-2 gap-6 mt-6">
        {/* Messages Card */}
        <Link href="/admin/messages">
          <Card color="blue" icon={<FaEnvelope size={24} />}>
            Messages
          </Card>
        </Link>

        {/* Analytics Card */}
        <Link href="/admin/analytics">
          <Card color="purple" icon={<FaChartLine size={24} />}>
            Analytics
          </Card>
        </Link>
      </div>
    </div>
  );
}

// ---- REUSABLE CARD COMPONENT ----
function Card({
  children,
  color = "blue",
  icon,
}: {
  children: React.ReactNode;
  color?: "blue" | "purple";
  icon: React.ReactNode;
}) {
  return (
    <div
      className={`
        flex items-center gap-4 p-6 rounded-2xl 
        bg-white/5 border border-white/10 backdrop-blur-xl
        hover:border-${color}-400/50 hover:scale-105 transition
        cursor-pointer
      `}
    >
      <div
        className={`
          text-${color}-400 p-3 bg-${color}-400/10 rounded-xl
        `}
      >
        {icon}
      </div>
      <p className="text-lg font-semibold">{children}</p>
    </div>
  );
}