'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'

// Types
type Stats = {
  visitors: number
  pageviews: number
  bounceRate: number
  avgTime: number
}

type ChartItem = {
  x: string
  y: number
}

// --------------------
// SPA Tracker Component
// --------------------
function UmamiTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if ((window as any).umami) {
      (window as any).umami.track() // SPA pageview
    }
  }, [pathname])

  return null
}

// --------------------
// Card Component
// --------------------
function Card({ title, value }: { title: string; value: any }) {
  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5 flex flex-col gap-2 hover:border-blue-400/40 transition">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  )
}

// --------------------
// Main Analytics Dashboard
// --------------------
export default function AnalyticsDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [countries, setCountries] = useState<ChartItem[]>([])
  const [devices, setDevices] = useState<ChartItem[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch data from API
  const fetchData = async () => {
    try {
      const [statsRes, countriesRes, devicesRes] = await Promise.all([
        fetch('/api/umami/stats'),
        fetch('/api/umami/countries'),
        fetch('/api/umami/devices'),
      ])

      const statsData: Stats = await statsRes.json()
      const countriesData = await countriesRes.json()
      const devicesData = await devicesRes.json()

      setStats(statsData)
      setCountries(countriesData?.data || [])
      setDevices(devicesData?.data || [])
    } catch (err) {
      console.error('Failed to load analytics', err)
    } finally {
      setLoading(false)
    }
  }

  // Initial fetch + polling
  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 10000) // 10s polling
    return () => clearInterval(interval)
  }, [])

  if (loading)
    return <div className="p-6 text-white font-semibold">Loading analytics...</div>

  return (
    <div className="p-10 bg-black text-white min-h-screen font-montserrat mt-20">
      {/* Umami Script */}
      <Script
        src="https://cloud.umami.is/script.js"
        data-website-id="db1dd232-3950-4f3f-9242-20fd47935f78"
        data-auto-track="true"
        strategy="afterInteractive"
      />
      <UmamiTracker />

      {/* Title */}
      <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <Card title="Visitors" value={stats?.visitors ?? 0} />
        <Card title="Pageviews" value={stats?.pageviews ?? 0} />
        <Card
          title="Bounce Rate"
          value={`${((stats?.bounceRate ?? 0) * 100).toFixed(1)}%`}
        />
        <Card title="Avg Time" value={`${stats?.avgTime ?? 0}s`} />
      </div>

      {/* Countries & Devices */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Countries */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-blue-400 mb-4">
            Top Countries
          </h2>
          {countries.length === 0 ? (
            <p className="text-gray-400">No data yet</p>
          ) : (
            <ul className="space-y-3">
              {countries.map((c, i) => (
                <li
                  key={i}
                  className="flex justify-between text-gray-300 border-b border-white/10 pb-2"
                >
                  <span>{c.x}</span>
                  <span className="text-white font-medium">{c.y}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Devices */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-purple-400 mb-4">
            Devices / Browsers
          </h2>
          {devices.length === 0 ? (
            <p className="text-gray-400">No data yet</p>
          ) : (
            <ul className="space-y-3">
              {devices.map((d, i) => (
                <li
                  key={i}
                  className="flex justify-between text-gray-300 border-b border-white/10 pb-2"
                >
                  <span>{d.x}</span>
                  <span className="text-white font-medium">{d.y}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}