import { NextResponse } from "next/server"

export async function GET(_: Request, { params }: { params: { owner: string; repo: string } }) {
  const { owner, repo } = params
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    }
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    const res = await fetch(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`, {
      headers,
      // Cache for an hour on the platform
      next: { revalidate: 3600 },
    })
    if (!res.ok) {
      const text = await res.text()
      throw new Error(`GitHub repo error (${res.status}): ${text}`)
    }
    const json = await res.json()
    const data = {
      full_name: json.full_name,
      html_url: json.html_url,
      stargazers_count: json.stargazers_count ?? 0,
      forks_count: json.forks_count ?? 0,
      open_issues_count: json.open_issues_count ?? 0,
      archived: json.archived ?? false,
      fork: json.fork ?? false,
      pushed_at: json.pushed_at,
      language: json.language,
      homepage: json.homepage ?? null,
    }
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch (e: any) {
    return NextResponse.json({ error: true, message: e?.message ?? "Unknown error" }, { status: 500 })
  }
}
