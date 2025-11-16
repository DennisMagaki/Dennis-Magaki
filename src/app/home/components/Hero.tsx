"use client";

import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { MousePointerClick } from "lucide-react";

export default function Hero() {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i = 1) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          delay: 0.2 * i,
          type: "spring",
          duration: 1.6,
          bounce: 0,
        },
        opacity: { delay: 0.2 * i, duration: 0.4 },
      },
    }),
  };

  return (
    <>
      <section className="relative flex flex-col md:flex-row items-center justify-center h-screen overflow-hidden bg-white dark:bg-black">
        {/* BACKGROUND EFFECT */}
        <div className="absolute inset-0 opacity-20 dark:opacity-30 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-b from-[#006200]/20 to-transparent animate-pulse" />
        </div>

        {/* LEFT SIDE – TEXT */}
        <div className="relative z-10 w-full md:w-1/2 flex flex-col justify-center px-6 md:px-16 text-center md:text-left font-montserrat">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white leading-tight"
          >
            Hello, I am
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="mt-2"
          >
            <span className="block text-[#ffffff] text-5xl sm:text-6xl md:text-8xl font-extrabold">
              Dennis
            </span>
            <span className="block uppercase tracking-wide text-6xl sm:text-7xl md:text-9xl text-[#ffffff] font-extrabold">
              Magaki
            </span>
          </motion.div>
        </div>

        {/* RIGHT SIDE – LOTTIE ANIMATION */}
        <div className="relative z-10 w-full md:w-1/2 flex justify-center items-center px-4 md:px-0 mt-6 md:mt-0">
          <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-[28rem] md:h-[28rem]">
            <DotLottieReact
              src="https://lottie.host/a71624db-313c-4dc9-bd5e-ed7dba6118bc/G8IwdcuQYT.lottie"
              loop
              autoplay
            />
          </div>
        </div>
      </section>
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-300 z-10"
      >
        <MousePointerClick className="w-6 h-6 mb-2 animate-bounce" />
        <span className="text-xs uppercase tracking-wider font-montserrat">
          Scroll
        </span>
      </motion.div>
    </>
  );
}
