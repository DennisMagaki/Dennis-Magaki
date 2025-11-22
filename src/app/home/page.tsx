"use client";

import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Work from "./components/Work";
import Stack from "./components/Stack";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <>
      <section id="home"><Hero /></section>
      <section id="about"><About /></section>
      <section id="stack"><Stack /></section>
      <section id="experience"><Experience /></section>
      <section id="work"><Work /></section>
      <section id="contact"><Contact /></section>
    </>
  );
}
