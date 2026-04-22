"use client";

import { useState } from "react";

export default function RankingsConverterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  function slugify(text: string) {
    return text.toLowerCase().replace(/\s+/g, "-");
  }

  function parseServerLine(line: string) {
    const match = line.match(
      /^(\d+)\.\s+([A-Z0-9-]+)\s+-\s+([\d.]+)\s+POINTS$/i
    );

    if (!match) return null;

    return {
      rank: Number(match[1]),
      name: match[2],
      points: Number(match[3]),
    };
  }

  function parseClubLine(line: string) {
    const match = line.match(
      /^(\d+)\.\s+([A-Z0-9-]+)\s+([A-Z0-9]+)\s+-\s+([\d.]+)\s+POINTS$/i
    );

    if (!match) return null;

    return {
      rank: Number(match[1]),
      server: match[2],
      club: match[3],
      points: Number(match[4]),
    };
  }

  function convert() {
    const lines = input
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    let mode = "";

    const lastSeason: any[] = [];
    const last5: any[] = [];
    const clubs: any[] = [];

    for (const line of lines) {
      if (line.includes("LAST SEASON")) {
        mode = "season";
        continue;
      }

      if (line.includes("LAST 5 SEASONS")) {
        mode = "five";
        continue;
      }

      if (line.includes("CLUBS")) {
        mode = "clubs";
        continue;
      }

      if (mode === "season") {
        const row = parseServerLine(line);
        if (row) lastSeason.push(row);
      }

      if (mode === "five") {
        const row = parseServerLine(line);
        if (row) last5.push(row);
      }

      if (mode === "clubs") {
        const row = parseClubLine(line);
        if (row) clubs.push(row);
      }
    }

    const serverMap = new Map();

    function ensureServer(name: string) {
      if (!serverMap.has(name)) {
        serverMap.set(name, {
          name,
          slug: slugify(name),
          lastSeasonPoints: 0,
          lastSeasonRank: 0,
          last5SeasonsPoints: 0,
          last5SeasonsRank: 0,
          clubs: [],
        });
      }

      return serverMap.get(name);
    }

    lastSeason.forEach((item) => {
      const server = ensureServer(item.name);
      server.lastSeasonPoints = item.points;
      server.lastSeasonRank = item.rank;
    });

    last5.forEach((item) => {
      const server = ensureServer(item.name);
      server.last5SeasonsPoints = item.points;
      server.last5SeasonsRank = item.rank;
    });

    clubs.forEach((item) => {
      const server = ensureServer(item.server);

      server.clubs.push({
        name: `${item.server} ${item.club}`,
        slug: slugify(`${item.server}-${item.club}`),
        points: item.points,
        rank: item.rank,
      });
    });

    const result = {
      servers: Array.from(serverMap.values()).sort((a, b) =>
        a.name.localeCompare(b.name)
      ),
    };

    setOutput(JSON.stringify(result, null, 2));
  }

  async function copyOutput() {
    await navigator.clipboard.writeText(output);
    alert("Copied JSON");
  }

  return (
    <main className="bg-zinc-100 p-6 font-mono text-black">
      <div className="max-w-7xl mx-auto mt-20">
        <h1 className="text-4xl font-bold mb-2">
          Rankings Converter Tool
        </h1>

        <p className="text-sm text-zinc-600 mb-8">
          Paste raw rankings text → Convert to JSON
        </p>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* INPUT */}
          <section className="bg-white rounded-2xl shadow border overflow-hidden">
            <div className="px-5 py-4 border-b font-bold">
              Raw Input
            </div>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste rankings text here..."
              className="w-full h-[350px] p-5 outline-none resize-none text-sm"
            />
          </section>

          {/* OUTPUT */}
          <section className="bg-white rounded-2xl shadow border overflow-hidden">
            <div className="px-5 py-4 border-b flex justify-between items-center">
              <span className="font-bold">JSON Output</span>

              <button
                onClick={copyOutput}
                className="px-4 py-2 bg-black text-white rounded-lg text-sm"
              >
                Copy
              </button>
            </div>

            <pre className="h-[350px] overflow-auto p-5 text-sm whitespace-pre-wrap">
              {output || "Converted JSON will appear here"}
            </pre>
          </section>
        </div>

        <div className="mt-6">
          <button
            onClick={convert}
            className="px-6 py-3 bg-black text-white rounded-xl font-bold"
          >
            Convert Data
          </button>
        </div>
      </div>
    </main>
  );
}