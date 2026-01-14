"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"

type Repo = {
  id: number
  name: string
  full_name: string
  url: string
  description: string | null
  language: string | null
  topics: string[]
  stars: number
  forks: number
  watchers: number
  issues: number
  archived: boolean
  disabled: boolean
  visibility: "public" | "private" | "internal"
  homepage: string | null
  createdAt: string
  updatedAt: string
  pushedAt: string
}

type ApiResponse = {
  username: string
  total: number
  totalStars: number
  languages: string[]
  repos: Repo[]
  fetchedAt: string
}

function groupStarsByMonth(repos: Repo[]) {
  // Approximate: assign each repo's star count to its last update month
  const bucket = new Map<string, number>()
  for (const r of repos) {
    const d = new Date(r.pushedAt)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
    bucket.set(key, (bucket.get(key) || 0) + (r.stars ?? 0))
  }
  const items = Array.from(bucket.entries())
    .map(([k, v]) => {
      const [y, m] = k.split("-")
      const label = `${y}-${m}`
      return { month: label, stars: v }
    })
    .sort((a, b) => a.month.localeCompare(b.month))
  return items
}

function languageBreakdown(repos: Repo[]) {
  const map = new Map<string, number>()
  for (const r of repos) {
    const lang = r.language || "Other"
    map.set(lang, (map.get(lang) || 0) + 1)
  }
  return Array.from(map.entries())
    .map(([language, count]) => ({ language, count }))
    .sort((a, b) => b.count - a.count)
}

function forksByLanguage(repos: Repo[]) {
  const map = new Map<string, number>()
  for (const r of repos) {
    const lang = r.language || "Other"
    map.set(lang, (map.get(lang) || 0) + (r.forks || 0))
  }
  return Array.from(map.entries())
    .map(([language, forks]) => ({ language, forks }))
    .sort((a, b) => b.forks - a.forks)
    .slice(0, 8)
}

function reposByYear(repos: Repo[]) {
  const map = new Map<number, number>()
  for (const r of repos) {
    const year = new Date(r.createdAt).getFullYear()
    map.set(year, (map.get(year) || 0) + 1)
  }
  return Array.from(map.entries())
    .map(([year, count]) => ({ year: year.toString(), count }))
    .sort((a, b) => a.year.localeCompare(b.year))
}

export default function GitHubCharts() {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    fetch("/api/github/repos")
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text())
        return r.json()
      })
      .then((json) => {
        if (!active) return
        setData(json)
      })
      .catch((e) => {
        if (!active) return
        setError(typeof e?.message === "string" ? e.message : "Failed to load GitHub data")
      })
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  const starsByMonth = useMemo(() => (data ? groupStarsByMonth(data.repos) : []), [data])
  const langBreakdown = useMemo(() => (data ? languageBreakdown(data.repos) : []), [data])
  const forksByLang = useMemo(() => (data ? forksByLanguage(data.repos) : []), [data])
  const reposByYearData = useMemo(() => (data ? reposByYear(data.repos) : []), [data])

  if (loading) {
    return (
      <div className="grid gap-6 lg:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="border-0 shadow-md">
            <CardHeader>
              <div className="h-6 w-32 bg-muted rounded animate-pulse" />
              <div className="h-4 w-48 bg-muted rounded animate-pulse mt-2" />
            </CardHeader>
            <CardContent>
              <div className="h-[320px] bg-muted rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border-0 shadow-md">
        <CardContent className="p-6 text-center text-muted-foreground">
          Failed to load GitHub statistics: {error}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Stars Over Time</CardTitle>
          <CardDescription>Approximate stars allocated by the month of last update</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              stars: { label: "Stars", color: "hsl(var(--chart-1))" },
            }}
            className="h-[320px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={starsByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" minTickGap={20} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="stars" stroke="var(--color-stars)" fill="var(--color-stars)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Languages Breakdown</CardTitle>
          <CardDescription>Count of repositories by primary language</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              count: { label: "Repos", color: "hsl(var(--chart-2))" },
            }}
            className="h-[320px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={langBreakdown}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="language" />
                <YAxis allowDecimals={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="count" fill="var(--color-count)" name="Repos" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      </div>

      {/* Additional Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Forks by Language */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Forks by Language</CardTitle>
            <CardDescription>Total forks across repositories grouped by programming language</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                forks: { label: "Forks", color: "hsl(var(--chart-3))" },
              }}
              className="h-[320px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={forksByLang}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="language" />
                  <YAxis allowDecimals={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="forks" fill="var(--color-forks)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Repositories Created by Year */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Repositories by Year</CardTitle>
            <CardDescription>Number of repositories created each year</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: { label: "Repos", color: "hsl(var(--chart-4))" },
              }}
              className="h-[320px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={reposByYearData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis allowDecimals={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="var(--color-count)"
                    fill="var(--color-count)"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
