import {
  getWebsiteStats,
  getMetrics,
  getExpandedMetrics,
  getEvents,
  getPageViews,
  getActiveVisitors,
} from "@/lib/umami";

export default async function AnalyticsPage() {
  const websiteId = process.env.UMAMI_WEBSITE_ID!;
  const endAt = Date.now();
  const startAt = endAt - 30 * 24 * 60 * 60 * 1000;

  const [
    stats,
    topPages,
    active,
    expanded,
    events,
    pageViews,
    countries,
    devices,
    browsers,
    os,
    referrers,
  ] = await Promise.all([
    getWebsiteStats(websiteId, startAt, endAt),
    getMetrics(websiteId, startAt, endAt, "url"),
    getActiveVisitors(websiteId),
    getExpandedMetrics(websiteId, startAt, endAt, "url"),
    getEvents(websiteId, startAt, endAt),
    getPageViews(websiteId, startAt, endAt),
    getMetrics(websiteId, startAt, endAt, "country"),
    getMetrics(websiteId, startAt, endAt, "device"),
    getMetrics(websiteId, startAt, endAt, "browser"),
    getMetrics(websiteId, startAt, endAt, "os"),
    getMetrics(websiteId, startAt, endAt, "referrer"),
  ]);

  return (
  <div className="bg-black text-white min-h-screen px-6 py-6 font-montserrat space-y-6 mt-20">

    {/* HEADER */}
    <div className="flex justify-between items-center">
      <h1 className="text-xl font-semibold">Analytics</h1>
      <p className="text-xs text-gray-400">Last 30 days</p>
    </div>

    {/* STATS */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <StatCard title="Visitors" value={stats.visitors} />
      <StatCard title="Pageviews" value={stats.pageviews} />
      <StatCard title="Visits" value={stats.visits} />
      <StatCard title="Active" value={active.visitors} />
    </div>

    {/* SECONDARY */}
    <div className="grid grid-cols-3 gap-3">
      <StatCard title="Bounces" value={stats.bounces} />
      <StatCard title="Time" value={`${stats.totaltime}s`} />
      <StatCard
        title="Rate"
        value={`${((stats.bounces / stats.visits) * 100 || 0).toFixed(1)}%`}
      />
    </div>

    {/* MAIN GRID */}
    <div className="grid md:grid-cols-3 gap-4">

      {/* LEFT */}
      <GlassCard title="Top Pages">
        {topPages.slice(0, 5).map((p) => (
          <Row key={p.x} label={p.x} value={p.y} />
        ))}
      </GlassCard>

      {/* CENTER */}
      <GlassCard title="Countries">
        {countries.slice(0, 5).map((c) => (
          <Row key={c.x} label={c.x} value={c.y} />
        ))}
      </GlassCard>

      {/* RIGHT */}
      <GlassCard title="Devices">
        {devices.slice(0, 5).map((d) => (
          <Row key={d.x} label={d.x} value={d.y} />
        ))}
      </GlassCard>
    </div>

    {/* SECOND GRID */}
    <div className="grid md:grid-cols-3 gap-4">

      <GlassCard title="Browsers">
        {browsers.slice(0, 5).map((b) => (
          <Row key={b.x} label={b.x} value={b.y} />
        ))}
      </GlassCard>

      <GlassCard title="OS">
        {os.slice(0, 5).map((o) => (
          <Row key={o.x} label={o.x} value={o.y} />
        ))}
      </GlassCard>

      <GlassCard title="Referrers">
        {referrers.slice(0, 5).map((r) => (
          <Row key={r.x} label={r.x} value={r.y} />
        ))}
      </GlassCard>
    </div>

    {/* EVENTS + TIMELINE SIDE BY SIDE */}
    <div className="grid md:grid-cols-2 gap-4">

      <GlassCard title="Events">
        {events.slice(0, 5).map((e, i) => (
          <Row key={i} label={`${e.x}`} value={e.y} />
        ))}
      </GlassCard>

      <GlassCard title="Pageviews">
        {pageViews.pageviews.slice(0, 6).map((p, i) => (
          <Row key={i} label={p.x} value={p.y} />
        ))}
      </GlassCard>

    </div>

  </div>
);
}

function GlassCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4">
      <h2 className="text-sm font-semibold text-blue-400 mb-2">
        {title}
      </h2>
      <div className="space-y-1 text-sm">{children}</div>
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

function Row({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex justify-between text-gray-300 text-xs border-b border-white/5 pb-1">
      <span className="truncate max-w-[70%]">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  );
}