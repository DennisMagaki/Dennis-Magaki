"use client";

export default function Experience() {
  const schoolData = [
    {
      institution: "Zetech University",
      achievement: "Bachelor’s Degree in Business Information Technology",
      period: "September 2022 — November 2025",
    },
    {
      institution: "Modcom Institute of Technology",
      achievement: "Certificate in Software Development",
      period: "May 2022 — August 2022",
    },
  ];

  const workData = [
    {
      institution: "Dukatech Solutions",
      role: "Front-end Developer (Attaché)",
      period: "August 2025 — October 2025",
    },
  ];

  return (
    <>
      <section className="relative flex flex-col items-center bg-black text-white py-24 px-6 font-montserrat">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide text-center mb-20">
          School & Work Experience
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full md:w-4/5">
          <div>
            <h2 className="text-3xl font-bold text-blue-300 mb-10">School</h2>

            <div className="relative border-l border-white/20 pl-8 space-y-12">
              {schoolData.map((item, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-4 top-2 w-3 h-3 bg-blue-400 rounded-full" />
                  <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
                    <h3 className="text-xl font-semibold text-blue-200">
                      {item.institution}
                    </h3>
                    <p className="text-gray-200 mt-1">{item.achievement}</p>
                    <p className="text-gray-400 text-sm mt-2">{item.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-purple-300 mb-10">Work</h2>

            <div className="relative border-l border-white/20 pl-8 space-y-12">
              {workData.map((item, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-4 top-2 w-3 h-3 bg-purple-400 rounded-full" />
                  <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
                    <h3 className="text-xl font-semibold text-purple-200">
                      {item.institution}
                    </h3>
                    <p className="text-gray-200 mt-1">{item.role}</p>
                    <p className="text-gray-400 text-sm mt-2">{item.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
