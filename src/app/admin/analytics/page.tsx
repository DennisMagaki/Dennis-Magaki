import {
  getWebsiteStats,
  getMetrics,
  getExpandedMetrics,
  getSessions,
  getPageViews,
  getActiveVisitors,
} from "@/lib/umami";
import { Modal } from "@/app/components/Modal";
import { getCountryName } from "@/lib/countries";
import { getReferrerName, getReferrerLogo } from "@/lib/referrers";
import Link from "next/link";

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const websiteId = process.env.UMAMI_WEBSITE_ID!;
  const endAt = Date.now();

  const ranges: Record<string, number | null> = {
    "24h": 24 * 60 * 60 * 1000,
    "7d": 7 * 24 * 60 * 60 * 1000,
    "30d": 30 * 24 * 60 * 60 * 1000,
    all: null,
  };

  const selectedRange = (await searchParams).range || "30d";
  const rangeMs = ranges[selectedRange as keyof typeof ranges];

  const startAt = rangeMs != null ? endAt - rangeMs : 0;

  const [
    stats,
    topPages,
    active,
    expanded,
    sessionsData,
    pageViews,
    countries,
    cities,
    devices,
    browsers,
    os,
    referrers,
  ] = await Promise.all([
    getWebsiteStats(websiteId, startAt, endAt),
    getMetrics(websiteId, startAt, endAt, "url"),
    getActiveVisitors(websiteId),
    getExpandedMetrics(websiteId, startAt, endAt, "url"),
    getSessions(websiteId, startAt, endAt, 1, 50),
    getPageViews(websiteId, startAt, endAt),
    getMetrics(websiteId, startAt, endAt, "country"),
    getMetrics(websiteId, startAt, endAt, "city"),
    getMetrics(websiteId, startAt, endAt, "device"),
    getMetrics(websiteId, startAt, endAt, "browser"),
    getMetrics(websiteId, startAt, endAt, "os"),
    getMetrics(websiteId, startAt, endAt, "referrer"),
  ]);

  const sessions = sessionsData.data || sessionsData;

  const sortedSessions = [...sessions]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 24);

  function formatTime(seconds: number) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    let result = "";
    if (hrs > 0) result += `${hrs}h `;
    if (mins > 0 || hrs > 0) result += `${mins}m `;
    result += `${secs}s`;

    return result.trim();
  }

  return (
    <div className="bg-black text-white min-h-screen px-3 sm:px-4 md:px-6 py-4 md:py-6 font-montserrat space-y-4 md:space-y-6 mt-16 md:mt-20">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
        <h1 className="text-lg md:text-3xl font-semibold">Analytics</h1>
        <div className="flex gap-2 text-sm">
          {["24h", "7d", "30d", "all"].map((r) => (
            <Link
              key={r}
              href={`/admin/analytics?range=${r}`}
              className={`px-2 py-1 rounded-md border ${
                selectedRange === r
                  ? "bg-blue-500 text-white border-blue-500"
                  : "border-white/20 text-gray-400 hover:text-white"
              }`}
            >
              {r === "all"
                ? "All"
                : r === "24h"
                  ? "24h"
                  : r === "7d"
                    ? "7d"
                    : "30d"}
            </Link>
          ))}
        </div>
        <p className="text-sm font-semibold text-gray-400">
          {selectedRange === "all"
            ? "All time"
            : selectedRange === "24h"
              ? "Last 24 hours"
              : selectedRange === "7d"
                ? "Last 7 days"
                : "Last 30 days"}
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        <StatCard
          title="Visits/Unique Visitors"
          value={`${stats.visits} / ${stats.visitors}`}
        />
        <StatCard title="Pageviews" value={stats.pageviews} />
        <StatCard title="Active Visitors" value={active.visitors} />
        <StatCard
          title="Total Time (Average Time per Visit)"
          value={
            stats.visits
              ? `${formatTime(stats.totaltime)} (${formatTime(
                  Math.floor(stats.totaltime / stats.visits),
                )})`
              : `${formatTime(stats.totaltime)}`
          }
        />
        <StatCard
          title="Bounces (Bounce Rate)"
          value={`${stats.bounces} (${((stats.bounces / stats.visits) * 100 || 0).toFixed(1)}%)`}
        />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <GlassCard title="Recent Sessions" totalItems={sessions.length}>
            <div className="overflow-x-auto">
              <table className="min-w-[700px] w-full text-xs sm:text-sm text-left border-collapse">
                {/* HEADER */}
                <thead>
                  <tr className="text-gray-400 border-b border-white/10">
                    <th className="py-2 pr-4 font-medium whitespace-nowrap">
                      Visitor
                    </th>
                    <th className="py-2 pr-4 font-medium whitespace-nowrap">
                      Device
                    </th>
                    <th className="py-2 pr-4 font-medium whitespace-nowrap">
                      OS
                    </th>
                    <th className="py-2 pr-4 font-medium whitespace-nowrap">
                      Browser
                    </th>
                    <th className="py-2 pr-4 font-medium whitespace-nowrap">
                      Location
                    </th>
                    <th className="py-2 pr-4 font-medium whitespace-nowrap">
                      Last Seen
                    </th>
                  </tr>
                </thead>

                {/* BODY */}
                <tbody>
                  {sortedSessions.map((session, index) => {
                    const start = new Date(session.firstAt);
                    const end = new Date(session.lastAt);

                    return (
                      <tr
                        key={`${session.id}-${session.createdAt}`}
                        className="border-b border-white/5 hover:bg-white/5 transition"
                      >
                        {/* VISITOR */}
                        <td className="py-2 text-white">
                          {session.id.slice(0, 5)}...
                        </td>

                        {/* DEVICE + BROWSER */}
                        <td className="py-2">
                          <span className="flex gap-1 px-2 py-[2px] text-xs whitespace-nowrap">
                            <img
                              src={`/devices/${session.device}.png`}
                              className="w-4 h-4"
                            />
                            {session.device}
                          </span>
                        </td>
                        <td className="py-2">
                          <span className="flex gap-1 px-2 py-[2px] text-xs whitespace-nowrap">
                            <img
                              src={`/oss/${session.os || "unknown"}.png`}
                              className="w-4 h-4"
                            />
                            {session.os || "Unknown"}
                          </span>
                        </td>
                        <td className="py-2">
                          <span className="flex gap-1 px-2 py-[2px] text-xs whitespace-nowrap">
                            <img
                              src={`/browsers/${session.browser}.png`}
                              className="w-4 h-4"
                            />
                            {session.browser}
                          </span>
                        </td>

                        {/* LOCATION */}
                        <td className="py-2">
                          {session.country ? (
                            <div className="flex items-center gap-2 text-white">
                              <img
                                src={`/flags/${session.country.toLowerCase()}.png`}
                                className="w-4 h-3"
                              />
                              <span>{session.city}</span>
                            </div>
                          ) : (
                            <span className="text-gray-500">—</span>
                          )}
                        </td>

                        {/* TIME */}
                        <td className="py-2 text-gray-400">
                          {end.toLocaleDateString(undefined, {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                            timeZone: "Africa/Nairobi",
                          })}
                          {", "}
                          {end.toLocaleTimeString("en-GB", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: false,
                            timeZone: "Africa/Nairobi",
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="h-full flex flex-col">
            <GlassCard title="Top Pages" totalItems={topPages.length}>
              {topPages.slice(0, 5).map((p) => (
                <Row key={p.x} label={p.x} value={p.y} />
              ))}
            </GlassCard>
            <Modal title="Top Pages" data={topPages} type="pages" />
          </div>

          <div className="h-full flex flex-col">
            <GlassCard title="Countries" totalItems={countries.length}>
              {countries.slice(0, 5).map((c) => (
                <Row
                  key={c.x}
                  label={c.x}
                  value={c.y}
                  countryCode={c.x}
                  type="country"
                />
              ))}
            </GlassCard>
            <Modal title="Countries" data={countries} type="countries" />
          </div>

          <div className="h-full flex flex-col">
            <GlassCard title="Cities" totalItems={cities.length}>
              {cities.slice(0, 5).map((c) => (
                <Row
                  key={c.x}
                  label={c.country ? `${c.x}, ${c.country}` : c.x}
                  value={c.y}
                  countryCode={c.country || c.x}
                  type="city"
                />
              ))}
            </GlassCard>
            <Modal title="Cities" data={cities} type="cities" />
          </div>

          <div className="h-full flex flex-col">
            <GlassCard title="Devices" totalItems={devices.length}>
              {devices.slice(0, 5).map((d) => (
                <Row key={d.x} label={d.x} value={d.y} device={d.x} />
              ))}
            </GlassCard>
            <Modal title="Devices" data={devices} type="devices" />
          </div>
          <div className="h-full flex flex-col">
            <GlassCard title="Browsers" totalItems={browsers.length}>
              {browsers.slice(0, 5).map((b) => (
                <Row key={b.x} label={b.x} value={b.y} browser={b.x} />
              ))}
            </GlassCard>
            <Modal title="Browsers" data={browsers} type="browsers" />
          </div>

          <div className="h-full flex flex-col">
            <GlassCard title="OS" totalItems={os.length}>
              {os.slice(0, 5).map((o) => (
                <Row key={o.x} label={o.x} value={o.y} os={o.x} />
              ))}
            </GlassCard>
            <Modal title="Operating Systems" data={os} type="os" />
          </div>

          <div className="h-full flex flex-col">
            <GlassCard title="Referrers" totalItems={referrers.length}>
              {referrers.slice(0, 5).map((r) => (
                <Row key={r.x} label={r.x} value={r.y} type="referrer" />
              ))}
            </GlassCard>
            <Modal title="Referrers" data={referrers} type="referrers" />
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";

function GlassCard({
  title,
  children,
  totalItems, // new prop
}: {
  title: string;
  children: React.ReactNode;
  totalItems: number;
}) {
  const roundedClass = totalItems > 5 ? "rounded-t-xl" : "rounded-xl";

  return (
    <div
      className={`bg-white/5 border border-white/10 backdrop-blur-xl ${roundedClass} p-3 sm:p-4 h-full flex flex-col`}
    >
      <h2 className="text-sm font-semibold text-blue-400 mb-2">{title}</h2>
      <div className="space-y-1 text-sm flex-1">{children}</div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: any }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-3">
      <p className="text-[11px] text-gray-400">{title}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}

function Row({
  label,
  value,
  countryCode,
  browser,
  device,
  os,
  type,
}: {
  label: string;
  value: any;
  countryCode?: string;
  browser?: string;
  device?: string;
  os?: string;
  type?: "country" | "referrer" | "city" | "default";
}) {
  let displayLabel = label;
  let referrerLogo = null;

  if (type === "country" && countryCode) {
    displayLabel = getCountryName(countryCode);
  } else if (type === "city" && countryCode) {
    displayLabel = label;
  } else if (type === "referrer") {
    displayLabel = getReferrerName(label);
    referrerLogo = getReferrerLogo(label);
  }

  return (
    <div className="flex items-center justify-between text-gray-300 text-sm border-b border-white/5 pb-1">
      <span className="flex items-center truncate max-w-[65%] sm:max-w-[70%] gap-2">
        {countryCode && (
          <img
            src={`/flags/${countryCode.toLowerCase()}.png`}
            alt={countryCode}
            className="w-4 h-3"
          />
        )}
        {type === "referrer" && referrerLogo && (
          <img src={referrerLogo} alt={displayLabel} className="w-6 h-6" />
        )}
        {browser && (
          <img
            src={`/browsers/${browser.toLowerCase()}.png`}
            alt={browser}
            className="w-4 h-4"
          />
        )}
        {device && (
          <img
            src={`/devices/${device.toLowerCase()}.png`}
            alt={device}
            className="w-4 h-4"
          />
        )}
        {os && (
          <img
            src={`/oss/${os || "unknown"}.png`}
            alt={os || "Unknown"}
            className="w-4 h-4"
          />
        )}
        <span
          title={
            type === "country" && countryCode
              ? getCountryName(countryCode)
              : undefined
          }
        >
          {displayLabel || "Unknown"}
        </span>
      </span>
      <span className="text-white font-medium">{value}</span>
    </div>
  );
}
