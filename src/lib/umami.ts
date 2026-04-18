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

type Metric = {
  x: string;
  y: number;
  country?: string;
};

type ExpandedMetric = {
  name: string;
  pageviews: number;
  visitors: number;
  visits: number;
  bounces: number;
  totaltime: number;
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
  hostname?: string;
};

type PageViewsResponse = {
  pageviews: { x: string; y: number }[];
  sessions: { x: string; y: number }[];
};

type ActiveVisitors = {
  visitors: number;
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

export function getMetrics(
  websiteId: string,
  startAt: number,
  endAt: number,
  type: string,
) {
  return umamiFetch<Metric[]>(
    `/websites/${websiteId}/metrics?${buildParams({
      startAt,
      endAt,
      type,
    })}`,
  );
}

export function getExpandedMetrics(
  websiteId: string,
  startAt: number,
  endAt: number,
  type: string,
) {
  return umamiFetch<ExpandedMetric[]>(
    `/websites/${websiteId}/metrics/expanded?${buildParams({
      startAt,
      endAt,
      type,
    })}`,
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

export function getPageViews(
  websiteId: string,
  startAt: number,
  endAt: number,
) {
  return umamiFetch<PageViewsResponse>(
    `/websites/${websiteId}/pageviews?${buildParams({
      startAt,
      endAt,
    })}`,
  );
}

export function getActiveVisitors(websiteId: string) {
  return umamiFetch<ActiveVisitors>(`/websites/${websiteId}/active`);
}

export async function getPageViewsByUrl(
  websiteId: string,
  startAt: number,
  endAt: number,
) {
  const data = await getMetrics(websiteId, startAt, endAt, "url");

  // Convert to map: { "/blog/post-slug": views }
  const map: Record<string, number> = {};

  data.forEach((item) => {
    map[item.x] = item.y;
  });

  return map;
}
