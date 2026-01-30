"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Github, Globe, Search, Filter } from "lucide-react"
import { projects } from "@/data/projects"
import { MicroInteraction } from "@/components/ui/MicroInteractions"
import { CardSkeleton, GitHubRepoSkeleton } from "@/components/ui/EnhancedSkeleton"
import { PullToRefresh } from "@/components/ui/PullToRefresh"
import { getProjectsWithSlugs } from "@/lib/project-utils"
import { GitHubContributionGraph } from "@/components/ui/GitHubContributionGraph"

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

  // Extract GitHub repo names from projects (Project Timeline, Featured Projects, Projects section)
  const projectRepoNames = useMemo(() => {
    // Get all projects from getProjectsWithSlugs (used in Timeline, Featured, and Projects sections)
    const allProjects = getProjectsWithSlugs()
    
    // Extract repo names from all project GitHub URLs
    // These projects appear in:
    // 1. Project Timeline (all projects)
    // 2. Featured Projects Carousel (first 6)
    // 3. Projects section (all projects)
    const repoNames = allProjects
      .map((project) => {
        // Extract repo name from GitHub URL (e.g., "https://github.com/amarhumayunx/balancebite" -> "balancebite")
        const match = project.githubUrl?.match(/github\.com\/[^/]+\/([^/]+)/)
        return match ? match[1].toLowerCase() : null
      })
      .filter((name): name is string => name !== null)
    
    // Return unique repo names
    return [...new Set(repoNames)]
  }, [])

  const filtered = useMemo(() => {
    const repos = data?.repos ?? []
    const q = query.trim().toLowerCase()
    
    // Filter to only show repos that match projects
    let out = repos.filter((r) => {
      const repoName = r.name.toLowerCase()
      return projectRepoNames.includes(repoName) && (showArchived ? true : !r.archived)
    })
    
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
  }, [data, query, language, sort, showArchived, projectRepoNames])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const currentPage = Math.min(page, totalPages)
  const visible = filtered.slice((currentPage - 1) * perPage, currentPage * perPage)

  return (
    <section id="repositories" className="section-padding section-bg">
      <div className="max-w-7xl mx-auto w-full px-4">
        {showHeader && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            viewport={{ once: true }}
          >
            GitHub <span className="gradient-text">Repositories</span>
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            viewport={{ once: true }}
          >
            Explore the GitHub repositories for projects featured in my portfolio timeline.
          </motion.p>
        </motion.div>
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
              {loading ? "…" : data ? new Date(data.fetchedAt).toLocaleDateString("en-US") : "—"}
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

        <PullToRefresh
          onRefresh={async () => {
            setLoading(true)
            setError(null)
            try {
              const response = await fetch(`/api/github/repos?username=${encodeURIComponent(username)}`)
              if (!response.ok) throw new Error(await response.text())
              const json = await response.json() as ApiResponse
              setData(json)
            } catch (e) {
              setError(typeof e?.message === "string" ? e.message : "Failed to refresh repositories")
            } finally {
              setLoading(false)
            }
          }}
          disabled={loading}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full mb-8">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <GitHubRepoSkeleton key={i} />
                ))
            : visible.map((repo) => (
                <MicroInteraction key={repo.id} variant="lift" intensity="subtle">
                  <Card className="group hover:shadow-xl transition-all border-0 shadow-md overflow-hidden flex flex-col h-full hover-lift">
                  <CardHeader className="pb-3 flex-shrink-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline flex-1 min-w-0 group/link"
                        aria-label={`Open ${repo.full_name} on GitHub`}
                        title={repo.name}
                      >
                        <CardTitle className="text-base sm:text-lg font-bold break-words line-clamp-2 group-hover/link:text-primary transition-colors">
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
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">
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
                </MicroInteraction>
              ))}
          </div>
        </PullToRefresh>

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

        {/* GitHub Contribution Graph */}
        <div className="mt-12">
          <GitHubContributionGraph username={username} />
        </div>
      </div>
    </section>
  )
}
