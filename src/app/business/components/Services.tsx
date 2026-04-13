"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const services = [
  {
    icon: "🖥️",
    title: "Website Development",
    description:
      "Custom websites built with Next.js and React. Fast, responsive, and optimised for all devices and screen sizes.",
    tags: ["Next.js", "React", "Tailwind CSS"],
    accent: "border-blue-400/30 hover:border-blue-400/60",
    iconBg: "bg-blue-400/10",
  },
  {
    icon: "🎨",
    title: "UI/UX Design & Build",
    description:
      "Pixel-perfect interfaces designed in Figma and translated into interactive, accessible web components with smooth animations.",
    tags: ["Figma", "Framer Motion", "CSS"],
    accent: "border-purple-400/30 hover:border-purple-400/60",
    iconBg: "bg-purple-400/10",
  },
  {
    icon: "🏢",
    title: "Corporate & Portfolio Sites",
    description:
      "Professional online presence for businesses, startups, and creatives — showcasing what you do best.",
    tags: ["Responsive", "SEO-friendly", "Vercel"],
    accent: "border-teal-400/30 hover:border-teal-400/60",
    iconBg: "bg-teal-400/10",
  },
  {
    icon: "⚙️",
    title: "Full-Stack Development",
    description:
      "Backend integration with APIs, databases, and auth flows for complete, scalable web applications.",
    tags: ["Node.js", "Supabase", "PostgreSQL"],
    accent: "border-yellow-400/30 hover:border-yellow-400/60",
    iconBg: "bg-yellow-400/10",
  },
];

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section className="relative px-6 py-24 max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="mb-16 text-center"
      >
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
          What I offer
        </p>
        <h2 className="text-4xl md:text-5xl font-bold">Services</h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className={`relative bg-white/5 backdrop-blur border rounded-3xl p-8 transition-all duration-300 ${s.accent}`}
          >
            <div
              className={`w-12 h-12 ${s.iconBg} rounded-2xl flex items-center justify-center text-2xl mb-6`}
            >
              {s.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{s.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {s.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {s.tags.map((t, j) => (
                <span
                  key={j}
                  className="bg-white/10 text-gray-300 text-xs px-3 py-1 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
