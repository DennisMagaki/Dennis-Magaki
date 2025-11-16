"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const canvas = document.getElementById("matrix") as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%";
    const fontSize = 18;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff41"; // Matrix green
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    }

    const interval = setInterval(draw, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="h-screen flex">
      {/* LEFT SIDE – TEXT */}
      <div className="w-1/2 flex items-center justify-center px-10 bg-white dark:bg-black">
        <h1 className="text-4xl font-montserrat font-semibold leading-tight text-black dark:text-white">
          Hello, I am{" "}
          <span className="text-[#006200] text-6xl uppercase block">
            Dennis Magaki
          </span>
          I am a{" "}
          <span className="text-[#006200]">Software Developer</span>
        </h1>
      </div>

      {/* RIGHT SIDE – MATRIX CANVAS + OVERLAY */}
      <div className="relative w-1/2 h-full bg-black dark:bg-[#0a0a0a] overflow-hidden">
        <canvas id="matrix" className="absolute inset-0 w-full h-full"></canvas>

        {/* Light mode overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/40 to-transparent dark:hidden"></div>

        {/* Dark mode overlay */}
        <div className="absolute inset-0 hidden dark:block bg-gradient-to-l from-white/10 via-white/5 to-transparent"></div>
      </div>
    </section>
  );
}
