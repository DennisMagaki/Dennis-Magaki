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
        <p className="text-sm md:text-lg text-gray-300 leading-relaxed">
          Hi, I am{" "}
          <span className="text-blue-400 font-semibold">Dennis Magaki</span>, a
          software developer based in Kiserian, Kajiado, Kenya. I specialize in front-end
          development, with a strong passion for building clean, responsive, and
          user-focused web applications. <br /><br />I enjoy turning ideas into interactive
          digital experiences that are not only visually appealing but also
          performant and intuitive. Over time, I&apos;ve gained hands-on
          experience working with modern web technologies, crafting interfaces
          that prioritize usability, accessibility, and seamless user
          interaction. <br /><br />I pay close attention to detail, from layout and
          responsiveness to subtle animations that enhance the overall
          experience. <br /><br />Beyond front-end development, I&apos;m actively expanding
          my skills toward full-stack development. I&apos;ve been working with
          backend technologies, databases, and APIs, aiming to build complete,
          scalable systems end-to-end. <br /><br />Whether it&apos;s improving
          performance, refining UI/UX, or implementing new features, I&apos;m
          always focused on writing clean, maintainable code and delivering
          high-quality work.
        </p>
      </motion.div>

      <div className="relative w-full md:w-1/2 h-48 md:h-full">
        <Image
          src="/images/hero2.jpeg"
          alt="Dennis Magaki"
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
    </section>
  );
}
