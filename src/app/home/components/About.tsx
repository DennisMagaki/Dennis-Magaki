"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="relative flex flex-col md:flex-row h-screen bg-black text-white overflow-hidden font-montserrat">
      <motion.div
        className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-20 py-20 md:py-0 z-10"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">About Me</h1>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          Hi, I am{" "}
          <span className="text-blue-400 font-semibold">Dennis Magaki</span>, a
          software developer based in Nairobi, Kenya. I am a passionate
          front-end developer, aspiring to become a full-stack developer. With
          experience building engaging web applications, I constantly seek to
          learn new technologies and enhance my craft.
        </p>
      </motion.div>

      <div className="relative w-full md:w-1/2 h-64 md:h-full">
        <Image
          src="/images/hero.jpeg"
          alt="Dennis Magaki"
          fill
          className="object-cover object-center brightness-90"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
    </section>
  );
}
