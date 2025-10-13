"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Github, Globe, Search, Filter } from "lucide-react"

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
  error?: boolean
  message?: string
}

interface GitHubReposProps {
  username?: string
  perPage?: number
  initialPage?: number
  showHeader?: boolean
}

export default function GitHubRepos({
  username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "amarhumayunx",
  perPage = 12,
  initialPage = 1,
  showHeader = true,
}: GitHubReposProps) {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [query, setQuery] = useState("")
  const [language, setLanguage] = useState<string>("All")
  const [sort, setSort] = useState<"pushed" | "stars" | "name">("pushed")
  const [page, setPage] = useState(initialPage)
  const [showArchived, setShowArchived] = useState(false)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)
    fetch(`/api/github/repos?username=${encodeURIComponent(username)}`)
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text())
        return r.json() as Promise<ApiResponse>
      })
      .then((json) => {
        if (!active) return
        setData(json)
      })
      .catch((e) => {
        if (!active) return
        setError(typeof e?.message === "string" ? e.message : "Failed to load repositories")
      })
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [username])

  useEffect(() => {
    setPage(1)
  }, [query, language, sort, showArchived])

  const languages = useMemo(() => {
    const base = ["All"]
    const rest = data?.languages ?? []
    return [...base, ...rest]
  }, [data])

  const filtered = useMemo(() => {
    const repos = data?.repos ?? []
    const q = query.trim().toLowerCase()
    let out = repos.filter((r) => (showArchived ? true : !r.archived))
    if (q) {
      out = out.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          (r.description?.toLowerCase().includes(q) ?? false) ||
          r.topics.some((t) => t.toLowerCase().includes(q)),
      )
    }
    if (language !== "All") {
      out = out.filter((r) => r.language === language)
    }
    switch (sort) {
      case "stars":
        out = out.sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0))
        break
      case "name":
        out = out.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "pushed":
      default:
        out = out.sort((a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime())
        break
    }
    return out
  }, [data, query, language, sort, showArchived])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const currentPage = Math.min(page, totalPages)
  const visible = filtered.slice((currentPage - 1) * perPage, currentPage * perPage)

  return (
    <section id="github-repos" className="section-padding bg-muted/20">
      <div className="max-w-7xl mx-auto">
        {showHeader && (
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">
              Public <span className="gradient-text">Repositories</span>
            </h2>
            <p className="text-muted-foreground">Automatically fetched from GitHub for {username}.</p>
          </div>
        )}

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Repos</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">{loading ? "…" : (data?.total ?? 0)}</CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Languages</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">{loading ? "…" : data ? data.languages.length : 0}</CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Last Sync</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {loading ? "…" : data ? new Date(data.fetchedAt).toLocaleDateString() : "—"}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 items-center mb-6">
          <div className="relative sm:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none" />
            <Input
              placeholder="Search by name, description, or topic…"
              className="pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search repositories"
            />
          </div>
          <div className="flex gap-2 items-center">
            <Filter className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Select value={sort} onValueChange={(v) => setSort(v as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pushed">Recently updated</SelectItem>
              <SelectItem value="stars">Most starred</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {error && (
          <div className="mb-6 text-sm text-red-600 dark:text-red-500">Failed to load repositories: {error}</div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="border-0 shadow-md">
                  <CardHeader>
                    <div className="h-6 w-2/3 bg-muted rounded mb-2" />
                    <div className="h-4 w-1/2 bg-muted rounded" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 w-full bg-muted rounded mb-2" />
                    <div className="h-4 w-3/4 bg-muted rounded mb-4" />
                    <div className="flex gap-2">
                      <div className="h-6 w-16 bg-muted rounded-full" />
                      <div className="h-6 w-16 bg-muted rounded-full" />
                    </div>
                  </CardContent>
                </Card>
              ))
            : visible.map((repo) => (
                <Card key={repo.id} className="group hover:shadow-xl transition-all border-0 shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between gap-2">
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline truncate"
                        aria-label={`Open ${repo.full_name} on GitHub`}
                      >
                        {repo.name}
                      </a>
                      <Badge variant={repo.archived ? "secondary" : "outline"}>
                        {repo.archived ? "Archived" : repo.visibility}
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {repo.description || "No description provided."}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {repo.language && <Badge variant="secondary">{repo.language}</Badge>}
                      {repo.topics?.slice(0, 3).map((t) => (
                        <Badge key={t} variant="outline" className="text-xs">
                          {t}
                        </Badge>
                      ))}
                      {repo.topics && repo.topics.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{repo.topics.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Open project homepage"
                          className="inline-flex items-center gap-1 text-primary hover:underline"
                        >
                          <Globe className="w-4 h-4" aria-hidden="true" />
                          Demo
                        </a>
                      )}
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open on GitHub"
                        className="inline-flex items-center gap-1 text-primary hover:underline"
                      >
                        <Github className="w-4 h-4" aria-hidden="true" />
                        Code
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>

        {!loading && filtered.length === 0 && !error && (
          <div className="text-center text-muted-foreground py-12">No repositories found.</div>
        )}

        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium">
              {filtered.length === 0 ? 0 : (currentPage - 1) * perPage + 1}-
              {Math.min(currentPage * perPage, filtered.length)}
            </span>{" "}
            of <span className="font-medium">{filtered.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" asChild>
            <a
              href={`https://github.com/${encodeURIComponent(username)}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
              aria-label="Open GitHub profile repositories"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              View on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
