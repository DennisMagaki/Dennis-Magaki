"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const projects = [
  {
    url: "https://dukatech.vercel.app",
    title: "Dukatech Solutions Corporate Website",
    description:
      "Corporate website for a talent acquisition startup. Built with Next.js and Tailwind.",
    tags: ["Next.js", "React", "Tailwind CSS"],
    image: "/images/dukatech.png",
  },
  {
    url: "https://shoecompany-dennis.vercel.app",
    title: "The Shoe Company",
    description:
      "A thrift shoe business landing page. Built with NextJS, React and TailwindCSS.",
    tags: ["Next.js", "React", "Tailwind CSS"],
    image: "/images/shoecompany.png",
  },
  {
    url: "https://dennis-magaki.is-a.dev",
    title: "This Portfolio",
    description:
      "This is the very portfolio site you are on. Built with NextJS, React and TailwindCSS, alongside many other technologies and libraries like Umami for Analytics, Lottie for motion graphics.",
    tags: ["Next.js", "React", "Tailwind CSS", "Lottie"],
    image: "/images/portfolio.png",
  },
  {
    url: "https://batuk-peach.vercel.app",
    title: "Battuk and Arts Gallery Website",
    description:
      "This is a minimalistic art gallery website for Battuk and Arts. Built with NextJS and Tailwind CSS, it features a simple, minimalistic design that allows the artwork to take center stage. Built under attachment at Dukatech Solutions.",
    tags: ["Next.js", "React", "Tailwind CSS", "Responsive Design"],
    image: "/images/batuk.png",
  },
  {
    url: "https://harbor-of-hope.vercel.app",
    title: "Harbor of Hope Rehabilitation Center Website",
    description:
      "This is a proposed website for Harbor of Hope Rehabilitation Center. Built with NextJS and Tailwind CSS, it features a design that speaks to the center's mission of providing compassionate care and support to individuals on their journey to recovery. Built under attachment at Dukatech Solutions.",
    tags: ["Next.js", "React", "Tailwind CSS", "Responsive Design"],
    image: "/images/harborofhope.png",
  },
  {
    url: "https://taheera-portfolio.vercel.app",
    title: "Taheera Portfolio Website",
    description:
      "A modern portfolio built with Lovable AI, Vite React, Tailwind CSS, and Framer Motion, focused on smooth animations and clean UI/UX.",
    tags: ["Lovable", "React", "Tailwind CSS", "Vite", "Framer Motion"],
    image: "/images/taheeraa.png",
  },
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <section className="relative px-6 py-24 max-w-7xl mx-auto">
      {/* TITLE */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-16 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        Projects
      </motion.h2>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-10">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            className="group rounded-2xl overflow-hidden border border-white/10 bg-black/40"
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            {/* IMAGE */}
            <div className="relative h-[300px]">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-contain md:object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => {
                    setLoading(true);
                    setActiveProject(i);
                  }}
                  className="bg-white text-black px-4 py-2 rounded-lg font-semibold"
                >
                  Live Preview
                </button>
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>

              <p className="text-gray-400 text-sm mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-white/10 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🔥 MODAL */}
      <AnimatePresence>
        {activeProject !== null && (
          <motion.div
            className="fixed inset-0 backdrop-blur-xs z-100 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)} // ✅ close on backdrop
          >
            {/* MODAL CONTENT */}
            <motion.div
              className="relative w-full max-w-6xl h-[80vh] bg-black rounded-2xl overflow-hidden border border-white/10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // ❗ prevent closing when clicking inside
            >
              {/* HEADER */}
              <div className="flex justify-between items-center px-4 py-3 border-b border-white/10">
                <h3 className="text-sm text-gray-300">
                  {projects[activeProject].title}
                </h3>

                <div className="flex gap-3">
                  <a
                    href={projects[activeProject].url}
                    target="_blank"
                    className="text-blue-400 text-sm hover:underline"
                  >
                    Open ↗
                  </a>

                  <button
                    onClick={() => setActiveProject(null)}
                    className="text-white text-sm"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* 🔥 IFRAME WRAPPER (ZOOMED OUT) */}
              <div className="relative w-full h-full bg-black">
                {/* ✅ LOADING SPINNER */}
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  </div>
                )}

                {/* ✅ ZOOM CONTAINER */}
                <div className="w-[125%] h-[125%] scale-[0.8] origin-top-left">
                  <iframe
                    src={projects[activeProject].url}
                    className="w-full h-full"
                    loading="lazy"
                    onLoad={() => setLoading(false)}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
