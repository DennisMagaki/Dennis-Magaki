"use client";

import Hero from "./components/Hero";
import Services from "./components/Services"
import Process from "./components/Process";
import Pricing from "./components/Pricing";
import Contact from "../home/components/Contact";
import Projects from "./components/Projects";

export default function Business() {
  return (
    <main className="relative bg-black text-white font-montserrat overflow-hidden">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <section><Hero /></section>
      <section id="services"><Services /></section>
      <section id="projects"><Projects /></section>
      <section><Process /></section>
      <section id="pricing"><Pricing /></section>
      <section id="contact"><Contact type="business" /></section>
    </main>
  );
}
