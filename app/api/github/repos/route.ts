import { NextResponse } from "next/server"
import { fetchAllRepos } from "@/lib/github"

type GitHubRepo = {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  language: string | null
  topics?: string[]
  stargazers_count: number
  forks_count: number
  watchers_count: number
  open_issues_count: number
  archived: boolean
  disabled: boolean
  private: boolean
  visibility?: "public" | "private" | "internal"
  homepage?: string | null
  created_at: string
  updated_at: string
  pushed_at: string
}

export async function GET() {
  try {
    const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "amarhumayunx"
    const token = process.env.GITHUB_TOKEN || ""
    console.log("[v0] GitHub API - Username:", username, "Token exists:", !!token)
    const repos = await fetchAllRepos(username, token)

    const total = repos.length
    const totalStars = repos.reduce((acc, r) => acc + (r.stars ?? 0), 0)
    const languages = Array.from(new Set(repos.map((r) => r.language).filter(Boolean) as string[])).sort()

    return new NextResponse(
      JSON.stringify({
        username,
        total,
        totalStars,
        languages,
        repos,
        fetchedAt: new Date().toISOString(),
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    )
  } catch (err: any) {
    console.log("[v0] GitHub API error caught:", err?.message)
    return new NextResponse(JSON.stringify({ error: true, message: err?.message ?? "Unknown error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
