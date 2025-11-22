"use client";

import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

export default function Contact() {
  return (
    <section className="relative flex flex-col items-center bg-black text-white py-32 px-6 font-montserrat">
      
      {/* TITLE */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
        Contact Me
      </h1>

      {/* CONTENT WRAPPER */}
      <div className="w-full md:w-4/5 flex flex-col md:flex-row gap-16">

        {/* CONTACT INFO */}
        <div className="md:w-1/2 flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-blue-400">Get in Touch</h2>
          
          <p className="text-gray-300">
            Feel free to reach out via email, phone, or social media. I’m always open to discussing new projects, collaborations, or opportunities.
          </p>

          <div className="space-y-3">
            <p className="text-gray-300"><span className="font-semibold">Phone:</span> +254 748 960 028</p>
            <p className="text-gray-300"><span className="font-semibold">Email:</span> dennismagaki.26@gmail.com</p>
          </div>

          {/* SOCIAL LINKS */}
          <div className="flex gap-4 mt-4 text-gray-300 text-2xl">
            <a href="https://linkedin.com/in/dennismagaki26" target="_blank" className="hover:text-blue-500">
              <FaLinkedin />
            </a>
            <a href="https://github.com/DennisMagaki" target="_blank" className="hover:text-gray-100">
              <FaGithub />
            </a>
            <a href="https://x.com/Dennis_Magaki" target="_blank" className="hover:text-blue-400">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* CONTACT FORM */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Send a Message</h2>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-500 transition-colors text-black font-semibold rounded-xl px-6 py-3 mt-2"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
