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
};

type ExpandedMetric = {
  name: string;
  pageviews: number;
  visitors: number;
  visits: number;
  bounces: number;
  totaltime: number;
};

type EventItem = {
  x: string;
  y: number;
  t: string;
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
    Object.entries(params).reduce((acc, [k, v]) => {
      if (v !== undefined) acc[k] = String(v);
      return acc;
    }, {} as Record<string, string>)
  ).toString();
}

// ---- API functions ----

export function getWebsiteStats(
  websiteId: string,
  startAt: number,
  endAt: number
) {
  return umamiFetch<UmamiStats>(
    `/websites/${websiteId}/stats?${buildParams({ startAt, endAt })}`
  );
}

export function getMetrics(
  websiteId: string,
  startAt: number,
  endAt: number,
  type: string
) {
  return umamiFetch<Metric[]>(
    `/websites/${websiteId}/metrics?${buildParams({
      startAt,
      endAt,
      type,
    })}`
  );
}

export function getExpandedMetrics(
  websiteId: string,
  startAt: number,
  endAt: number,
  type: string
) {
  return umamiFetch<ExpandedMetric[]>(
    `/websites/${websiteId}/metrics/expanded?${buildParams({
      startAt,
      endAt,
      type,
    })}`
  );
}

export async function getEvents(
  websiteId: string,
  startAt: number,
  endAt: number
): Promise<EventItem[]> {
  const res = await umamiFetch<any>(
    `/websites/${websiteId}/events/series?${buildParams({
      startAt,
      endAt,
    })}`
  );

  // normalize shape
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.data)) return res.data;

  return [];
}

export function getPageViews(
  websiteId: string,
  startAt: number,
  endAt: number
) {
  return umamiFetch<PageViewsResponse>(
    `/websites/${websiteId}/pageviews?${buildParams({
      startAt,
      endAt,
    })}`
  );
}

export function getActiveVisitors(websiteId: string) {
  return umamiFetch<ActiveVisitors>(
    `/websites/${websiteId}/active`
  );
}