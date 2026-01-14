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
    <section id="repositories" className="py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto w-full px-4">
        {showHeader && (
          <div className="mb-8 sm:mb-10">
            <div className="flex items-center gap-3 mb-3">
              <Github className="w-6 h-6 sm:w-8 sm:h-8 text-primary flex-shrink-0" aria-hidden="true" />
              <h2 className="text-2xl sm:text-4xl font-bold">
                GitHub <span className="gradient-text">Repositories</span>
              </h2>
            </div>
            <p className="text-muted-foreground text-sm sm:text-base ml-9">
              These are all my public GitHub repositories. Explore my projects and open source contributions.
            </p>
          </div>
        )}

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8 w-full">
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm text-muted-foreground">Total Repos</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl sm:text-3xl font-bold">{loading ? "…" : (data?.total ?? 0)}</CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm text-muted-foreground">Languages</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl sm:text-3xl font-bold">
              {loading ? "…" : data ? data.languages.length : 0}
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm text-muted-foreground">Last Sync</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl sm:text-3xl font-bold">
              {loading ? "…" : data ? new Date(data.fetchedAt).toLocaleDateString() : "—"}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-end mb-8 w-full">
          <div className="relative col-span-1 sm:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none flex-shrink-0" />
            <Input
              placeholder="Search repositories…"
              className="pl-10 text-sm w-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search repositories"
            />
          </div>
          <div className="flex gap-2 items-center w-full">
            <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full text-sm">
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
            <SelectTrigger className="w-full text-sm">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pushed">Recently updated</SelectItem>
              <SelectItem value="stars">Most starred</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {error && (
          <div className="mb-6 text-xs sm:text-sm text-red-600 dark:text-red-500 break-words">
            Failed to load repositories: {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full mb-8">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="border-0 shadow-md overflow-hidden">
                  <CardHeader>
                    <div className="h-6 w-2/3 bg-muted rounded mb-2" />
                    <div className="h-4 w-1/2 bg-muted rounded" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 w-full bg-muted rounded mb-2" />
                    <div className="h-4 w-3/4 bg-muted rounded mb-4" />
                    <div className="flex gap-2 flex-wrap">
                      <div className="h-6 w-16 bg-muted rounded-full" />
                      <div className="h-6 w-16 bg-muted rounded-full" />
                    </div>
                  </CardContent>
                </Card>
              ))
            : visible.map((repo) => (
                <Card
                  key={repo.id}
                  className="group hover:shadow-xl transition-all border-0 shadow-md overflow-hidden flex flex-col h-full"
                >
                  <CardHeader className="pb-3 flex-shrink-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline flex-1 min-w-0 group/link"
                        aria-label={`Open ${repo.full_name} on GitHub`}
                        title={repo.full_name}
                      >
                        <CardTitle className="text-base sm:text-lg font-bold text-foreground break-words line-clamp-2 group-hover/link:text-primary transition-colors">
                          {repo.name}
                        </CardTitle>
                      </a>
                      <Badge
                        variant={repo.archived ? "secondary" : "outline"}
                        className="flex-shrink-0 text-xs whitespace-nowrap"
                      >
                        {repo.archived ? "Archived" : repo.visibility}
                      </Badge>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 mt-2">
                      {repo.description || "No description provided."}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1 flex flex-col pt-0">
                    <div className="flex flex-wrap gap-2">
                      {repo.language && (
                        <Badge variant="secondary" className="text-xs">
                          {repo.language}
                        </Badge>
                      )}
                      {repo.topics?.slice(0, 2).map((t) => (
                        <Badge key={t} variant="outline" className="text-xs">
                          {t}
                        </Badge>
                      ))}
                      {repo.topics && repo.topics.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{repo.topics.length - 2}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-end gap-2 flex-wrap mt-auto pt-2 border-t border-border/50">
                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Open project homepage"
                          className="inline-flex items-center gap-1 text-primary hover:underline text-xs sm:text-sm whitespace-nowrap"
                        >
                          <Globe className="w-3.5 h-3.5 flex-shrink-0" />
                          Demo
                        </a>
                      )}
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open on GitHub"
                        className="inline-flex items-center gap-1 text-primary hover:underline text-xs sm:text-sm whitespace-nowrap"
                      >
                        <Github className="w-3.5 h-3.5 flex-shrink-0" />
                        Code
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>

        {!loading && filtered.length === 0 && !error && (
          <div className="text-center text-muted-foreground py-12 text-sm sm:text-base">No repositories found.</div>
        )}

        {visible.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
              Showing{" "}
              <span className="font-medium">
                {(currentPage - 1) * perPage + 1}-{Math.min(currentPage * perPage, filtered.length)}
              </span>{" "}
              of <span className="font-medium">{filtered.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="text-xs"
              >
                Previous
              </Button>
              <span className="text-xs sm:text-sm px-3 py-1 rounded border border-border">
                {currentPage} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="text-xs"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <Button variant="outline" asChild className="text-xs sm:text-sm bg-transparent">
            <a
              href={`https://github.com/${encodeURIComponent(username)}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
              aria-label="Open GitHub profile repositories"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              View All Projects on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
