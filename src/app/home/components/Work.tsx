"use client";

export default function Work() {
  const projects = [
    {
      name: "Fit360°",
      description:
        "A fitness optimization dashboard for players, coaches, and trainers with role-based access control.",
      tech: ["HTML", "Python", "Vanilla CSS/JS", "PostgreSQL", "Flask"],
      repo: "https://github.com/DennisMagaki/Fit360",
      image: "/images/fit360.png",
    },
    {
      name: "Github Widgets",
      description:
        "A collection of customizable GitHub profile widgets to showcase user stats and repositories.",
      tech: ["Javascript", "HTML", "CSS", "GitHub APIs"],
      liveDemo: "https://git-hub-widgets.vercel.app/",
      repo: "https://github.com/DennisMagaki/Github-Widgets",
      image: "/images/widgets.png",
    },
    {
      name: "TOL Rankings",
      description: (
        <>
          A web application, part of{" "}
          <a
            href="https://theopenleague.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            The Open League
          </a>{" "}
          ecosystem, that calculates data-driven rankings.
        </>
      ),
      tech: ["React", "Next.js", "Tailwind CSS", "Supabase", "PostgreSQL"],
      image: "/images/tol.png",
    },
  ];

  return (
    <section className="relative flex flex-col items-center bg-black text-white py-32 px-6 font-montserrat space-y-24">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-20">
        Projects I’ve Done
      </h1>

      {projects.map((project, idx) => (
        <div
          key={idx}
          className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-8"
        >
          {/* IMAGE */}
          <div className="w-full md:w-1/2 h-64 md:h-80 relative overflow-hidden rounded-2xl">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* DETAILS */}
          <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4">
            <h2 className="text-3xl font-bold text-blue-300">{project.name}</h2>
            <p className="text-gray-300 text-base md:text-lg">
              {project.description}
            </p>

            {/* TECH TAGS */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="bg-white/10 px-3 py-1 rounded-full text-gray-300 text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* LINKS */}
            <div className="flex gap-4 mt-2">
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  className="text-blue-400 hover:underline"
                >
                  Live Demo
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  className="text-green-400 hover:underline"
                >
                  GitHub Repo
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
