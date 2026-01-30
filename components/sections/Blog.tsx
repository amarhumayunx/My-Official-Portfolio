"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Calendar, BookOpen, Search, Timer, X, Filter, Tag as TagIcon, SortAsc, SortDesc } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FluidTransition } from "@/components/ui/FluidTransition"
import { ParallaxSection } from "@/components/ui/ParallaxSection"
import Image from "next/image"
import { getBlogPosts } from "@/lib/blog-utils"
import { Input } from "@/components/ui/input"
import { PaginationControls } from "@/components/ui/PaginationControls"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CardSkeleton, ImageSkeleton } from "@/components/ui/EnhancedSkeleton"
import { MicroInteraction } from "@/components/ui/MicroInteractions"
import { debounce, highlightText, saveSearchHistory } from "@/lib/search-utils"

// Enhanced Skeleton component for loading states
const BlogCardSkeleton = () => (
  <Card className="h-full flex flex-col shadow-lg border-0 overflow-hidden">
    <ImageSkeleton className="w-full h-48 rounded-t-lg" />
    <CardHeader className="pb-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <div className="h-4 w-20 bg-muted-foreground/20 rounded" />
      </div>
      <div className="h-6 w-3/4 bg-muted-foreground/30 rounded mb-2" />
    </CardHeader>
    <CardContent className="flex-grow">
      <div className="h-4 w-full bg-muted-foreground/20 rounded mb-2" />
      <div className="h-4 w-5/6 bg-muted-foreground/20 rounded" />
    </CardContent>
    <div className="p-6 pt-0">
      <div className="h-4 w-24 bg-primary/20 rounded" />
    </div>
  </Card>
)

type SortOption = "newest" | "oldest" | "reading-time" | "alphabetical"

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortOption>("newest")
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  const allBlogPosts = useMemo(() => getBlogPosts(), [])

  // Extract all unique tags from blog posts
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    allBlogPosts.forEach((post) => {
      post.technologies.forEach((tech) => tagSet.add(tech))
    })
    return Array.from(tagSet).sort()
  }, [allBlogPosts])

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setDebouncedSearchTerm(term)
      if (term.trim()) {
        saveSearchHistory(term)
      }
    }, 300),
    []
  )

  useEffect(() => {
    debouncedSearch(searchTerm)
  }, [searchTerm, debouncedSearch])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const filteredAndSearchedPosts = useMemo(() => {
    let filtered = allBlogPosts

    // Filter by search term
    if (debouncedSearchTerm.trim()) {
      const lowerCaseSearchTerm = debouncedSearchTerm.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          post.description.toLowerCase().includes(lowerCaseSearchTerm) ||
          post.longDescription.toLowerCase().includes(lowerCaseSearchTerm) ||
          post.technologies.some((tech) => tech.toLowerCase().includes(lowerCaseSearchTerm)),
      )
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((post) =>
        selectedTags.some((tag) => post.technologies.includes(tag))
      )
    }

    // Sort posts
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "reading-time":
          return b.readTimeMinutes - a.readTimeMinutes
        case "alphabetical":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    return sorted
  }, [debouncedSearchTerm, selectedTags, sortBy, allBlogPosts])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
    setCurrentPage(1)
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setDebouncedSearchTerm("")
    setSelectedTags([])
    setSortBy("newest")
    setCurrentPage(1)
  }

  const totalPages = useMemo(() => {
    return Math.ceil(filteredAndSearchedPosts.length / postsPerPage)
  }, [filteredAndSearchedPosts.length, postsPerPage])

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage
    const endIndex = startIndex + postsPerPage
    return filteredAndSearchedPosts.slice(startIndex, endIndex)
  }, [currentPage, postsPerPage, filteredAndSearchedPosts])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchTerm, selectedTags, sortBy])

  const handleClearSearch = () => {
    setSearchTerm("")
    setDebouncedSearchTerm("")
  }

  // Keyboard shortcut: Ctrl/Cmd + K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        const searchInput = document.querySelector('input[aria-label="Search blog posts"]') as HTMLInputElement
        if (searchInput) {
          searchInput.focus()
          searchInput.select()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <section id="blog" className="section-padding section-bg">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            My <span className="gradient-text">Blog Posts</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Dive into my thoughts on mobile development, technology trends, and coding best practices.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          viewport={{ once: true }}
          className="relative max-w-xl mx-auto mb-12"
        >
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 z-10"
            aria-hidden="true"
          />
          <Input
            type="text"
            placeholder="Search blog posts by title, tech, or description... (Ctrl/Cmd + K)"
            className="w-full pl-10 pr-10 py-2 rounded-full border border-input focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                handleClearSearch()
                ;(e.target as HTMLInputElement).blur()
              }
            }}
            aria-label="Search blog posts"
          />
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {filteredAndSearchedPosts.length > 0 && (debouncedSearchTerm || selectedTags.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-6 left-0 right-0 text-center text-sm text-muted-foreground"
            >
              Found {filteredAndSearchedPosts.length} result{filteredAndSearchedPosts.length !== 1 ? "s" : ""}
            </motion.div>
          )}
        </motion.div>

        {/* Filters and Sort */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.12 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Filter by tags:</span>
              {(selectedTags.length > 0 || debouncedSearchTerm || sortBy !== "newest") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-xs h-7 px-2 text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-1.5 rounded-md border border-input bg-background text-sm focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="reading-time">Reading Time</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => {
              const isSelected = selectedTags.includes(tag)
              return (
                <Badge
                  key={tag}
                  variant={isSelected ? "default" : "outline"}
                  className="cursor-pointer transition-all hover:scale-105"
                  onClick={() => toggleTag(tag)}
                >
                  <TagIcon className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              )
            })}
          </div>

          {/* Active Filters */}
          {selectedTags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-2 mt-4"
            >
              {selectedTags.map((tag) => (
                <Badge key={tag} variant="default" className="gap-1">
                  {tag}
                  <button
                    onClick={() => toggleTag(tag)}
                    className="ml-1 hover:bg-background/20 rounded-full p-0.5"
                    aria-label={`Remove ${tag} filter`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </motion.div>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: postsPerPage }).map((_, i) => <BlogCardSkeleton key={i} />)
          ) : paginatedPosts.length > 0 ? (
            paginatedPosts.map((post, index) => (
              <ParallaxSection key={post.slug} offset={15}>
                <FluidTransition delay={index * 0.1} duration={0.8}>
                  <MicroInteraction variant="lift" intensity="normal">
                    <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-all duration-200 border-0 overflow-hidden hover-lift group">
                      <div className="relative w-full h-48 overflow-hidden">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={index === 0}
                        />
                      </div>
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Calendar className="w-4 h-4" aria-hidden="true" />
                          <span className="sr-only">Published on</span>
                          {post.date}
                          <span className="mx-1">•</span>
                          <Timer className="w-4 h-4" aria-hidden="true" />
                          <span className="sr-only">Read time</span>
                          {post.readTimeMinutes} min read
                        </div>
                        <CardTitle
                          className="text-xl group-hover:text-primary transition-colors duration-200"
                          dangerouslySetInnerHTML={{
                            __html: debouncedSearchTerm ? highlightText(post.title, debouncedSearchTerm) : post.title,
                          }}
                        />
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p
                          className="text-muted-foreground text-sm leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: debouncedSearchTerm
                              ? highlightText(post.description, debouncedSearchTerm)
                              : post.description,
                          }}
                        />
                      </CardContent>
                      <div className="p-6 pt-0">
                        <MicroInteraction variant="scale" intensity="subtle">
                          <Button variant="default" size="sm" asChild className="hover-glow">
                            <Link
                              href={`/blog/${post.slug}`}
                              className="flex items-center gap-1 text-sm font-medium"
                              aria-label={`Read more about ${post.title}`}
                            >
                              Read More <BookOpen className="w-4 h-4" aria-hidden="true" />
                            </Link>
                          </Button>
                        </MicroInteraction>
                      </div>
                    </Card>
                  </MicroInteraction>
                </FluidTransition>
              </ParallaxSection>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="col-span-full text-center text-muted-foreground text-lg py-10"
            >
              No blog posts found matching your search.
            </motion.div>
          )}
        </div>

        {totalPages > 1 && (
          <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        )}
      </div>
    </section>
  )
}
