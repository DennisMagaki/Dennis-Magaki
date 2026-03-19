"use client";

import { useState } from "react";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    // Handle empty responses gracefully
    const text = await res.text();
    const data = text ? JSON.parse(text) : { success: false };

    if (data.success) {
      toast.success("Message sent!", {
        duration: 5000,
        style: {
          background: "#111",
          color: "#0ac400",
          border: "1px solid #0ac400",
          fontFamily: "var(--font-montserrat)",
          width: "300px",
          textAlign: "center",
        },
      });
      setForm({ name: "", email: "", message: "" });
    } else {
      toast.error(data.error || "Error sending message", {
        duration: 5000,
        style: {
          background: "#111",
          color: "#ba0000",
          border: "1px solid #ba0000",
          fontFamily: "var(--font-montserrat)",
          width: "300px",
          textAlign: "center",
        },
      });
    }
  } catch (err) {
    console.error(err);
    toast.error("Unexpected error", {
      duration: 5000,
      style: {
        background: "#111",
        color: "#ba0000",
        border: "1px solid #ba0000",
        fontFamily: "var(--font-montserrat)",
        width: "300px",
        textAlign: "center",
      },
    });
  }
};
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
            Feel free to reach out via email, phone, or social media. I&apos;m
            always open to discussing new projects, collaborations, or
            opportunities.
          </p>

          <div className="space-y-3">
            <p className="text-gray-300">
              <span className="font-semibold">Phone:</span> +254 748 960 028
            </p>
            <p className="text-gray-300">
              <span className="font-semibold">Email:</span>{" "}
              dennismagaki.26@gmail.com
            </p>
          </div>

          {/* SOCIAL LINKS */}
          <div className="flex gap-4 mt-4 text-gray-300 text-2xl">
            <a
              href="https://linkedin.com/in/dennismagaki26"
              target="_blank"
              className="hover:text-blue-500"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/DennisMagaki"
              target="_blank"
              className="hover:text-gray-100"
            >
              <FaGithub />
            </a>
            <a
              href="https://x.com/Dennis_Magaki"
              target="_blank"
              className="hover:text-blue-400"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* CONTACT FORM */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">
            Send a Message
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="Your Name"
              required
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="Your Email"
              required
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={5}
              required
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
            />
            <p className="text-sm text-gray-400">The email you provide in this form will be used to contact you through dennismagaki.26@gmail.com</p>
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-500 transition-colors text-black font-semibold rounded-xl px-6 py-3 mt-2 cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
