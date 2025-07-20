"use client"

import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, BookOpen, Search, Timer } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FluidTransition } from "@/components/ui/FluidTransition"
import { ParallaxSection } from "@/components/ui/ParallaxSection"
import Image from "next/image"
import { getBlogPosts } from "@/lib/blog-utils"
import { Input } from "@/components/ui/input"
import { PaginationControls } from "@/components/ui/PaginationControls"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Simple Skeleton component for loading states
const BlogCardSkeleton = () => (
  <Card className="h-full flex flex-col shadow-lg border-0 overflow-hidden animate-pulse">
    <div className="relative w-full h-48 bg-muted rounded-t-lg" />
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

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  const allBlogPosts = useMemo(() => getBlogPosts(), [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const filteredAndSearchedPosts = useMemo(() => {
    if (!searchTerm) {
      return allBlogPosts
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase()
    return allBlogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        post.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        post.longDescription.toLowerCase().includes(lowerCaseSearchTerm) ||
        post.technologies.some((tech) => tech.toLowerCase().includes(lowerCaseSearchTerm)),
    )
  }, [searchTerm, allBlogPosts])

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
  }, [searchTerm])

  return (
    <section id="blog" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative max-w-xl mx-auto mb-12"
        >
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5"
            aria-hidden="true"
          />
          <Input
            type="text"
            placeholder="Search blog posts by title, tech, or description..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-input focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search blog posts"
          />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: postsPerPage }).map((_, i) => <BlogCardSkeleton key={i} />)
          ) : paginatedPosts.length > 0 ? (
            paginatedPosts.map((post, index) => (
              <ParallaxSection key={post.slug} offset={15}>
                <FluidTransition delay={index * 0.1} duration={0.8}>
                  <motion.div
                    whileHover={{
                      y: -5,
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                  >
                    <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
                      <div className="relative w-full h-48 overflow-hidden">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                        <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-muted-foreground text-sm leading-relaxed">{post.description}</p>
                      </CardContent>
                      <div className="p-6 pt-0">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button variant="default" size="sm" asChild>
                            <Link
                              href={`/blog/${post.slug}`}
                              className="flex items-center gap-1 text-sm font-medium"
                              aria-label={`Read more about ${post.title}`}
                            >
                              Read More <BookOpen className="w-4 h-4" aria-hidden="true" />
                            </Link>
                          </Button>
                        </motion.div>
                      </div>
                    </Card>
                  </motion.div>
                </FluidTransition>
              </ParallaxSection>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
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
