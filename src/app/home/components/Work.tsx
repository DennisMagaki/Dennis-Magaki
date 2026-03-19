"use client";

import Image from "next/image";

type Project = {
  name: string;
  description: string;
  tech: string[];
  image: string;
  liveDemo?: string;
  repo?: string;
};

type Section = {
  title: string;
  projects: Project[];
};

export default function Work() {
  const projectSections: Section[] = [
    {
      title: "Personal Projects",
      projects: [
        {
          name: "Portfolio Website",
          description:
            "A modern portfolio built with Lovable AI, Vite React, Tailwind CSS, and Framer Motion, focused on smooth animations and clean UI/UX.",
          tech: [
            "Lovable AI",
            "React",
            "Vite",
            "Tailwind CSS",
            "Framer Motion",
          ],
          liveDemo: "https://taheera-portfolio.vercel.app/",
          image: "/images/taheera.png",
        },
        {
          name: "Github Widgets",
          description:
            "Customizable GitHub widgets that display user stats and repositories using GitHub APIs.",
          tech: ["JavaScript", "HTML", "CSS", "GitHub API"],
          liveDemo: "https://git-hub-widgets.vercel.app/",
          image: "/images/github-widgets.jpeg",
        },
      ],
    },
    {
      title: "Professional Experience",
      projects: [
        {
          name: "Dukatech Solutions Corporate Website",
          description:
            "This is a proposed corporate website for Dukatech Solutions, a talent acquisition startup. Built with NextJS and Tailwind CSS, it features a clean design and responsive layout to showcase the company's portfolio. Built under attachment at Dukatech Solutions.",
          tech: [
            "React",
            "Next.js",
            "Tailwind CSS",
            "Responsive Design",
          ],
          liveDemo: "https://dukatech.vercel.app",
          image: "/images/dukatech.jpeg",
        },
        {
          name: "Harbor of Hope Rehabilitation Center Website",
          description:
            "This is a proposed website for Harbor of Hope Rehabilitation Center. Built with NextJS and Tailwind CSS, it features a design that speaks to the center's mission of providing compassionate care and support to individuals on their journey to recovery. Built under attachment at Dukatech Solutions.",
          tech: [
            "React",
            "Next.js",
            "Tailwind CSS",
            "Responsive Design",
          ],
          liveDemo: "https://harbor-of-hope.vercel.app",
          image: "/images/harbor.png",
        },
        {
          name: "Battuk and Arts Gallery Website",
          description:
            "This is a minimalistic art gallery website for Battuk and Arts. Built with NextJS and Tailwind CSS, it features a simple, minimalistic design that allows the artwork to take center stage. Built under attachment at Dukatech Solutions.",
          tech: [
            "React",
            "Next.js",
            "Tailwind CSS",
            "Responsive Design",
          ],
          liveDemo: "https://batuk-peach.vercel.app",
          image: "/images/batuk.png",
        },
      ],
    },
  ];

  return (
    <section className="relative bg-black text-white py-32 px-6 font-montserrat">
      <div className="max-w-6xl mx-auto flex flex-col gap-24">
        
        {/* PAGE TITLE */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold">
            My Work
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A collection of personal projects and professional work showcasing my
            skills in UI/UX development and frontend development.
          </p>
        </div>

        {/* SECTIONS */}
        {projectSections.map((section, sectionIdx) => (
          <div key={sectionIdx} className="space-y-12">
            
            {/* SECTION TITLE */}
            <h2 className="text-3xl font-semibold text-center text-purple-400">
              {section.title}
            </h2>

            {/* PROJECTS */}
            <div className="flex flex-col gap-16">
              {section.projects.map((project, idx) => (
                <div
                  key={idx}
                  className="flex flex-col md:flex-row items-center gap-10"
                >
                  {/* IMAGE */}
                  <div className="w-full md:w-1/2 h-64 md:h-80 relative overflow-hidden rounded-2xl group">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* DETAILS */}
                  <div className="w-full md:w-1/2 space-y-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-blue-300">
                      {project.name}
                    </h3>

                    <p className="text-gray-300 leading-relaxed">
                      {project.description}
                    </p>

                    {/* TECH STACK */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="bg-white/10 px-3 py-1 rounded-full text-sm text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* LINKS */}
                    <div className="flex gap-6 pt-2">
                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-400 text-black p-2 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
                        >
                          Live Demo
                        </a>
                      )}
                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-400 hover:underline"
                        >
                          GitHub Repo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}