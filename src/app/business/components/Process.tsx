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

const process = [
  {
    num: "01",
    title: "Discovery",
    desc: "We talk through your goals, audience, and vision for the project.",
  },
  {
    num: "02",
    title: "Design",
    desc: "I sketch out layouts and share a wireframe or mockup for feedback.",
  },
  {
    num: "03",
    title: "Build",
    desc: "Clean, maintainable code — built iteratively with regular check-ins.",
  },
  {
    num: "04",
    title: "Launch",
    desc: "Deployed to Vercel or your host of choice, tested across all devices.",
  },
  {
    num: "05",
    title: "Support",
    desc: "Post-launch support and updates to keep everything running smoothly.",
  },
];

export default function Process() {
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
          How it works
        </p>
        <h2 className="text-4xl md:text-5xl font-bold">My Process</h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {process.map((p, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center"
          >
            <p className="text-3xl font-extrabold text-blue-400/40 mb-3">
              {p.num}
            </p>
            <h4 className="font-bold mb-2">{p.title}</h4>
            <p className="text-gray-400 text-xs leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
