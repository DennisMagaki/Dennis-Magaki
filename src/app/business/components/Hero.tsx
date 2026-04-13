"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const stats = [
  { num: "3+", label: "Projects ongoing" },
  { num: "1+", label: "Years building" },
  { num: "100%", label: "Responsive designs" },
];

export default function Hero() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative flex flex-col md:flex-row">
        <div className="relative w-full md:w-1/2 flex flex-col items-center justify-center mt-0 min-h-screen px-6 text-center py-8 lg:py-24 md:ml-20">
          <motion.span
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-block mb-6 px-4 py-1.5 rounded-full bg-blue-500 font-bold text-white text-xs uppercase tracking-widest"
          >
            Available for hire
          </motion.span>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight mb-6"
          >
            Clean, fast websites
            <br />
            <span className="text-blue-400">
              to build your online presence.
            </span>
          </motion.h1>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-wrap gap-4 justify-center"
          >
            <a
              href="#contact"
              className="bg-blue-400 hover:bg-blue-500 transition-colors text-black font-semibold px-8 py-3 rounded-xl"
            >
              Start a project
            </a>
            <a
              href="#projects"
              className="border border-white/20 hover:border-white/40 transition-colors text-gray-300 hover:text-white px-8 py-3 rounded-xl"
            >
              See my work ↗
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="grid grid-cols-3 gap-4 mt-20 w-full max-w-2xl"
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center"
              >
                <p className="text-2xl font-bold text-blue-400">{s.num}</p>
                <p className="text-xs text-gray-400 mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
        {/* RIGHT SIDE – LOTTIE ANIMATION */}
        <div className="relative z-10 w-full md:w-1/2 flex justify-center items-center px-2 md:px-0 mt-[-100] md:mt-0">
          <div className="w-72 h-72 sm:w-96 sm:h-96 md:w-[32rem] md:h-[32rem]">
            <DotLottieReact
              src="https://lottie.host/d42663b5-dfcf-4913-b14e-b0add8783453/HVHySdsHoR.lottie"
              loop
              autoplay
            />
          </div>
        </div>
      </section>
    </>
  );
}
