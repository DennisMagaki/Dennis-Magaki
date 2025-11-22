"use client";

import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaHtml5,
  FaCss3Alt,
  FaGithub,
  FaFigma,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiSupabase,
  SiPostgresql,
  SiFirebase,
  SiXampp,
} from "react-icons/si";

export default function Stack() {
  const stackCategories = [
    {
      title: "Frontend",
      color: "text-blue-400",
      items: [
        { name: "React", icon: <FaReact size={36} /> },
        { name: "Next.js", icon: <SiNextdotjs size={36} /> },
        { name: "TypeScript", icon: <SiTypescript size={36} /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss size={36} /> },
        { name: "HTML", icon: <FaHtml5 size={36} /> },
        { name: "CSS", icon: <FaCss3Alt size={36} /> },
      ],
    },
    {
      title: "Backend",
      color: "text-purple-400",
      items: [
        { name: "Node.js", icon: <FaNodeJs size={36} /> },
        { name: "Python", icon: <FaPython size={36} /> },
      ],
    },
    {
      title: "Databases",
      color: "text-green-400",
      items: [
        { name: "Supabase", icon: <SiSupabase size={36} /> },
        { name: "PostgreSQL", icon: <SiPostgresql size={36} /> },
        { name: "Firebase", icon: <SiFirebase size={36} /> },
        { name: "XAMPP", icon: <SiXampp size={36} /> },
      ],
    },
    {
      title: "Version Control & Other Tools",
      color: "text-yellow-400",
      items: [
        { name: "GitHub", icon: <FaGithub size={36} /> },
        { name: "Git", icon: <FaGitAlt size={36} /> },
        { name: "Figma", icon: <FaFigma size={36} /> },
      ],
    },
  ];

  return (
    <section className="relative flex flex-col items-center bg-black text-white py-24 px-6 font-montserrat">
      <h1 className="text-4xl md:text-5xl font-bold tracking-wide text-center mb-20">
        My Tech Stack
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 w-full md:w-4/5">
        {stackCategories.map((category, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
          >
            <h2
              className={`text-2xl font-bold mb-6 ${category.color} text-center`}
            >
              {category.title}
            </h2>

            <div className="grid grid-cols-3 md:grid-cols-2 gap-6 justify-items-center">
              {category.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center transition-transform duration-200 hover:-translate-y-1 hover:scale-110"
                >
                  <div
                    className={`mb-3 text-white hover:text-${category.color}`}
                  >
                    {item.icon}
                  </div>
                  <p className="text-gray-300 text-sm md:text-base font-medium">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
