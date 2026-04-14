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

const plans = [
  {
    badge: "Starter",
    name: "Landing Page",
    price: "KES 5,000",
    suffix: "/ project",
    desc: "A single, polished page to establish your online presence.",
    features: [
      "Responsive design",
      "Contact form",
      "Vercel deployment",
      "1 revision round",
    ],
    featured: true,
    inactive: false,
    color: "blue-500",
    text_color: "text-blue-400",
    bg_color: "bg-blue-400",
    bg_transparent: "bg-blue-400/10",
    border_color: "border-blue-400",
    hover_color: "hover:bg-blue-500",
  },
  {
    badge: "Popular",
    name: "Business Website",
    price: "KES 20,000",
    suffix: "/ project",
    desc: "Multi-page site with full branding, animations, and custom features.",
    features: [
      "Up to 6 pages",
      "Animations & interactions",
      "CMS or admin panel",
      "SEO optimisation",
      "3 revision rounds",
    ],
    featured: false,
    inactive: true,
    color: "green-400",
    text_color: "text-green-400",
    bg_color: "bg-green-400",
    bg_transparent: "bg-green-400/10",
    border_color: "border-green-400",
    hover_color: "hover:bg-green-500",
  },
  {
    badge: "Full-Stack",
    name: "Web Application",
    price: "KES 50,000",
    suffix: "/ project",
    desc: "Full web app with backend, database, and user authentication.",
    features: [
      "API integration",
      "Database (Supabase)",
      "Authentication",
      "Dashboard / admin",
      "Ongoing support",
    ],
    featured: false,
    inactive: true,
    color: "red-400",
    text_color: "text-red-400",
    bg_color: "bg-red-400",
    bg_transparent: "bg-red-400/10",
    border_color: "border-red-400",
    hover_color: "hover:bg-red-500",
  },
];

export default function Pricing() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section className="relative px-6 py-24 max-w-6xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="mb-16 text-center"
      >
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
          Investment
        </p>
        <h2 className="text-4xl md:text-5xl font-bold">Pricing</h2>
        <p className="text-gray-400 mt-4 max-w-md mx-auto text-sm">
          Transparent starting prices — final quotes depend on project scope and
          complexity.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className={`relative rounded-3xl p-8 flex flex-col gap-4 ${
              plan.featured
                ? `${plan.bg_transparent} border-2 ${plan.border_color}`
                : "bg-white/5 border border-white/10"
            }`}
          >
            {plan.featured && (
              <span
                className={`absolute -top-3 left-1/2 -translate-x-1/2 ${plan.bg_color} text-black text-xs font-bold px-4 py-1 rounded-full`}
              >
                Most popular
              </span>
            )}
            {plan.inactive && (
              <span className="absolute inset-0 bg-black/10 rounded-2xl z-10 backdrop-blur-xs flex items-center justify-center ">
                <p
                  className={`text-center bg-${plan.color} text-black px-4 py-1 rounded-full font-bold text-xs`}
                >
                  Coming Soon
                </p>
              </span>
            )}
            <span className="text-xs uppercase tracking-widest text-gray-500">
              {plan.badge}
            </span>
            <h3 className="text-xl font-bold">{plan.name}</h3>
            <div>
              <span className={`text-3xl font-extrabold ${plan.text_color}`}>
                <span className="text-sm text-gray-200 font-semibold">
                  from{" "}
                </span>
                {plan.price}
              </span>
              <span className="text-gray-400 text-sm ml-1">{plan.suffix}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{plan.desc}</p>
            <ul className="flex flex-col gap-2 mt-2">
              {plan.features.map((f, j) => (
                <li
                  key={j}
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  <span className="text-teal-400 text-base">✓</span> {f}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className={`mt-auto text-center font-semibold py-3 rounded-xl transition-colors ${
                plan.featured
                  ? `${plan.bg_color} ${plan.hover_color} text-black`
                  : "border border-white/20 hover:border-white/40 text-gray-300 hover:text-white"
              }`}
            >
              Get started
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
