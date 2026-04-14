"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "../business/components/Projects";
import Stack from "./components/Stack";
import Contact from "./components/Contact";

export default function Home() {
  const [openResume, setOpenResume] = useState(false);

  return (
    <main className="text-white font-montserrat bg-black">
      {/* BACKGROUND EFFECT */}
      <div className="fixed z-99 inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_50%)] pointer-events-none" />

      <section id="home"><Hero /></section>
      <section id="about"><About /></section>
      <section id="stack"><Stack /></section>
      <section id="experience"><Experience /></section>
      <section id="work"><Projects /></section>
      <section id="contact"><Contact /></section>

      {/* 🔥 FLOATING BUTTON */}
      <button
        onClick={() => setOpenResume(true)}
        className="fixed top-18 right-6 z-50 bg-blue-500 text-sm font-bold text-black px-4 py-1 uppercase rounded-lg hover:bg-white cursor-pointer transition"
      >
        View CV/Resume
      </button>

      {/* 🔥 MODAL */}
      <AnimatePresence>
        {openResume && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur z-100 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenResume(false)}
          >
            <motion.div
              className="relative w-full max-w-5xl h-[85vh] mt-10 bg-black rounded-2xl overflow-hidden border border-white/10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER */}
              <div className="flex justify-between items-center px-4 py-3 border-b border-white/10">
                <h3 className="text-sm text-gray-300">
                  Resume
                </h3>

                <div className="flex gap-3">
                  <a
                    href="/cv.pdf"
                    target="_blank"
                    className="text-blue-400 text-sm hover:underline"
                  >
                    Open ↗
                  </a>

                  <button
                    onClick={() => setOpenResume(false)}
                    className="text-white text-sm"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* 🔥 PDF VIEWER */}
              <iframe
                src="/cv.pdf"
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
