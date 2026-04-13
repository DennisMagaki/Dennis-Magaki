"use client";

import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "../business/components/Projects";
import Stack from "./components/Stack";
import Contact from "./components/Contact";

export default function Home() {
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
    </main>
  );
}
