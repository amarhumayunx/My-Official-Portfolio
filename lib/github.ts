export type GitHubRepo = {
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
  fork: boolean
  visibility?: "public" | "private" | "internal"
  homepage?: string | null
  created_at: string
  updated_at: string
  pushed_at: string
}

export type TrimmedRepo = {
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

export async function fetchAllRepos(username: string, token?: string): Promise<TrimmedRepo[]> {
  const perPage = 100
  let page = 1
  const collected: GitHubRepo[] = []
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  }
  if (token) headers.Authorization = `Bearer ${token}`

  while (page <= 10) {
    const url = `https://api.github.com/users/${encodeURIComponent(
      username,
    )}/repos?per_page=${perPage}&page=${page}&type=owner&sort=updated&direction=desc`
    const res = await fetch(url, { headers, cache: "no-store" })
    if (!res.ok) {
      const text = await res.text()
      throw new Error(`GitHub API error (${res.status}): ${text}`)
    }
    const batch = (await res.json()) as GitHubRepo[]
    collected.push(...batch)
    if (batch.length < perPage) break
    page += 1
  }

  // Deduplicate by ID
  const unique = new Map<number, GitHubRepo>()
  for (const r of collected) unique.set(r.id, r)

  // Exclude forks and archived by default (as requested)
  const filtered = Array.from(unique.values()).filter((r) => !r.private && !r.fork && !r.archived && !r.disabled)

  // Sort by last push/update desc
  filtered.sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())

  const trimmed: TrimmedRepo[] = filtered.map((r) => ({
    id: r.id,
    name: r.name,
    full_name: r.full_name,
    url: r.html_url,
    description: r.description,
    language: r.language,
    topics: r.topics ?? [],
    stars: r.stargazers_count,
    forks: r.forks_count,
    watchers: r.watchers_count,
    issues: r.open_issues_count,
    archived: r.archived,
    disabled: r.disabled,
    visibility: (r.visibility ?? (r.private ? "private" : "public")) as "public" | "private" | "internal",
    homepage: r.homepage ?? null,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
    pushedAt: r.pushed_at,
  }))

  return trimmed
}

export function monthRangeString(fromISO: string, toISO: string): string {
  const from = new Date(fromISO)
  const to = new Date(toISO)
  const fmt = (d: Date) => `${d.toLocaleString(undefined, { month: "short" })} ${d.getFullYear()}`
  if (from.getFullYear() === to.getFullYear() && from.getMonth() === to.getMonth()) {
    return fmt(to)
  }
  return `${fmt(from)} - ${fmt(to)}`
}
