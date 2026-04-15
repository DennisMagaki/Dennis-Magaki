---
title: "Adding Umami Cloud Analytics on your NextJS Website"
date: "April 9, 2026"
description: "Easy way to add analytics onto you website for insights using Umami"
image: "/blogs/umami-nextjs-cover.jpg"
tags: ["Analytics", "Umami", "NextJS", "API"]
author: "Dennis Magaki"
---

## Introduction

Umami is a lightweight, open-source web analytics platform that helps you track your website's traffic while respecting user privacy in compliance with GDPR principles.

In this article, I am going to show you how to integrate Umami Cloud analytics, a hosted version of the Umami application, onto your NextJS project. We'll add a tracking script to your project and then use Umami API to access the analytics data.

You can sign up for free at [https://cloud.umami.is/signup](https://cloud.umami.is/signup).

### Key features:

- **Core analytics** — Pageviews, visitors, bounce rate, session duration, referrers, browsers, operating systems, devices, and countries.
- **Custom events** — Track button clicks, form submissions, or any user interaction with a simple data attribute or JavaScript call.
- **Advanced insights** — Funnels, user journeys, retention analysis, goals, UTM campaign tracking, and cohort breakdowns.
- **Sessions** — View individual visitor activity and session properties without identifying personal information.
- **API** — Full REST API for programmatic access to all your analytics data.

For more information not covered in this article, head over to [Umami Cloud Documentation](https://docs.umami.is/docs/cloud).

---

## Step 1: Set up Umami

You have two options:

### Option A: Use hosted Umami (this is the one we'll use in this article)

- Go to [https://cloud.umami.is/signup](https://cloud.umami.is/signup)
- Create an account
- Add your website
- Copy your **Website ID** and script URL

### Option B: Self-host Umami

You can deploy it using:

- Docker
- Vercel
- Railway

Official repo:


https://github.com/umami-software/umami


---

## Step 2: Add Umami to your Next.js app

Add the script to your root layout.

### Using `app/layout.tsx` (App Router)

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="your-website-id"
          data-auto-track="true"
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

### Using `pages/app.tsx` (Pages Router)

```tsx
import Script from "next/script";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />

      <Script
        async
        src="https://cloud.umami.is/script.js"
        data-website-id="your-website-id"
        data-auto-track="true"
        strategy="afterInteractive"
      />
    </>
  );
}
```

At this point, Umami can now track your website's traffic. You can navigate a few pages and then go to [https://cloud.umami.is](https://cloud.umami.is), click on your website and see the data collected on your site.

---

## Step 3: Getting started with Umami Cloud API

Umami provides endpoints like:

- `/api/websites`
- `/api/websites/{websiteId}/stats`
- `/api/websites/{websiteId}/sessions`
- `/api/websites/{websiteId}/metrics`

We will mainly use `/stats` and `/sessions` in this tutorial.

For Authentication, Umami uses API tokens. You need to

1. Go to Umami Dashboard
2. Settings >> API Keys
3. Generate a key

You'll now need to get your API key and Website ID from Umami and set them into your `.env.local` file as follows:

```env
UMAMI_API_KEY=<your-api-key>

UMAMI_WEBSITE_ID=<your-website-id>

UMAMI_API_URL=https://api.umami.is/v1
```

---

## Step 4: Setting up Umami helper and displaying our data on NextJS

We will now create an external helper in NextJS to connect our app to Umami.

```tsx
// lib/umami.ts
const UMAMI_BASE_URL = process.env.UMAMI_API_URL!;
const UMAMI_API_KEY = process.env.UMAMI_API_KEY!;

type UmamiStats = {
  pageviews: number;
  visitors: number;
  visits: number;
  bounces: number;
  totaltime: number;
  comparison?: Partial<UmamiStats>;
};

type SessionItem = {
  id: string;
  firstAt: number;
  lastAt: number;
  pageviews: number;
  device?: string;
  browser?: string;
  os?: string;
  country?: string;
  city?: string;
  referrer?: string;
  createdAt: number;
  visits: number;
  views: number;
};

async function umamiFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${UMAMI_BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${UMAMI_API_KEY}`,
      "Content-Type": "application/json",
    },
    cache: "no-store", // important for fresh analytics
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Umami API error (${res.status}): ${errorText}`);
  }

  return res.json();
}

function buildParams(params: Record<string, string | number | undefined>) {
  return new URLSearchParams(
    Object.entries(params).reduce(
      (acc, [k, v]) => {
        if (v !== undefined) acc[k] = String(v);
        return acc;
      },
      {} as Record<string, string>,
    ),
  ).toString();
}

// ---- API functions ----

export function getWebsiteStats(
  websiteId: string,
  startAt: number,
  endAt: number,
) {
  return umamiFetch<UmamiStats>(
    `/websites/${websiteId}/stats?${buildParams({ startAt, endAt })}`,
  );
}

export async function getSessions(
  websiteId: string,
  startAt: number,
  endAt: number,
  page: number = 1,
  pageSize: number = 20,
): Promise<{
  data: SessionItem[];
  pagination: { total: number; totalPages: number };
}> {
  const res = await umamiFetch<any>(
    `/websites/${websiteId}/sessions?${buildParams({
      startAt,
      endAt,
      page,
      pageSize,
      timezone: "Africa/Nairobi",
    })}`,
  );

  return {
    data: res.data || res,
    pagination: res.pagination || { total: res.length, totalPages: 1 },
  };
}
```

We will then create a simple page that fetches this data from our helper, to display on our page. This is an example of a simple dashboard that we'll use to view the stats on our site.

```tsx
import { getWebsiteStats, getSessions } from "@/lib/umami";
import Link from "next/link";

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const websiteId = process.env.UMAMI_WEBSITE_ID!;

  const [stats, sessionsData] = await Promise.all([
    getWebsiteStats(websiteId, startAt, endAt),
    getSessions(websiteId, startAt, endAt, 1, 50),
  ]);

  const sessions = sessionsData.data || sessionsData;
  const sortedSessions = [...sessions]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 30);

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
    <div className="bg-black text-white min-h-screen px-4 py-6 mt-16">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-2 mb-6">
        <h1 className="text-xl font-semibold">Analytics</h1>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <div className="border border-gray-800 rounded p-3">
          <div className="text-xs text-gray-400">Visits</div>
          <div className="text-2xl font-semibold">{stats.visits}</div>
        </div>
        <div className="border border-gray-800 rounded p-3">
          <div className="text-xs text-gray-400">Unique visitors</div>
          <div className="text-2xl font-semibold">{stats.visitors}</div>
        </div>
        <div className="border border-gray-800 rounded p-3">
          <div className="text-xs text-gray-400">Pageviews</div>
          <div className="text-2xl font-semibold">{stats.pageviews}</div>
        </div>
        <div className="border border-gray-800 rounded p-3">
          <div className="text-xs text-gray-400">Bounce rate</div>
          <div className="text-2xl font-semibold">
            {stats.visits ? ((stats.bounces / stats.visits) * 100).toFixed(1) : 0}%
          </div>
        </div>
      </div>

      {/* Sessions table */}
      <div>
        <h2 className="text-sm font-medium text-gray-400 mb-2">Recent sessions</h2>
        <div className="border border-gray-800 rounded overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-400 border-b border-gray-800">
              <tr>
                <th className="text-left p-2">Visitor</th>
                <th className="text-left p-2">Device</th>
                <th className="text-left p-2">Browser</th>
                <th className="text-left p-2">OS</th>
                <th className="text-left p-2">Country</th>
                <th className="text-left p-2">Duration</th>
                <th className="text-left p-2">Last activity</th>
              </tr>
            </thead>
            <tbody>
              {sortedSessions.map((session) => (
                <tr key={session.id} className="border-b border-gray-800/50">
                  <td className="p-2 font-mono text-xs">{session.id.slice(0, 6)}…</td>
                  <td className="p-2">{session.device || "—"}</td>
                  <td className="p-2">{session.browser || "—"}</td>
                  <td className="p-2">{session.os || "—"}</td>
                  <td className="p-2">{session.country || "—"}</td>
                  <td className="p-2">{formatTime(session.duration)}</td>
                  <td className="p-2 text-xs">{new Date(session.lastAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
```

---

## Aftermath

After doing all these steps, you are likely to see the Umami data we fetched on your dashboard. You can compare them to the data on Umami website and see that they are accurate. There are alot more endpoints on the Umami Cloud API that you could use to enhance your analytics and tailor them to your needs. The full documentation can always be found on the official Umami Docs website. This was just a simple setup and you can freely tweak inside your code to learn even more.

---

## Performance impact

Umami is extremely lightweight:

- Script size \~2KB
- Loads asynchronously
- Doesn’t block rendering

This makes it perfect for performance-focused apps.

---

## Testing your setup

After setup:

1. Open your site
2. Visit a few pages
3. Go to your Umami dashboard
4. You should see your data

---

## Conclusion

Umami is a powerful alternative to traditional analytics tools, especially if you value privacy, simplicity, and performance.

With just a few lines of code, you can gain meaningful insights into your users without compromising their trust.

---

## Resources

- [Umami Cloud Documentation](https://docs.umami.is/docs/cloud)
- [GitHub Repo to self host Umami](https://github.com/umami-software/umami)

---