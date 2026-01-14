"use client"

import { useMemo } from "react"
import { projects } from "@/data/projects"
import { getBlogPosts } from "@/lib/blog-utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Search, FileText, Code } from "lucide-react"
import { motion } from "framer-motion"

interface SearchResultsProps {
  query: string
}

export default function SearchResults({ query }: SearchResultsProps) {
  const blogPosts = useMemo(() => getBlogPosts(), [])

  const results = useMemo(() => {
    if (!query.trim()) {
      return { projects: [], posts: [] }
    }

    const lowerQuery = query.toLowerCase()

    const matchingProjects = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(lowerQuery) ||
        project.description.toLowerCase().includes(lowerQuery) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(lowerQuery)) ||
        project.categories.some((cat) => cat.toLowerCase().includes(lowerQuery)),
    )

    const matchingPosts = blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.description.toLowerCase().includes(lowerQuery) ||
        post.technologies.some((tech) => tech.toLowerCase().includes(lowerQuery)),
    )

    return { projects: matchingProjects, posts: matchingPosts }
  }, [query, blogPosts])

  if (!query.trim()) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>Enter a search query to find projects and blog posts</p>
      </div>
    )
  }

  const totalResults = results.projects.length + results.posts.length

  return (
    <div className="space-y-8">
      <div className="text-sm text-muted-foreground">
        Found {totalResults} result{totalResults !== 1 ? "s" : ""} for &quot;{query}&quot;
      </div>

      {totalResults === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No results found. Try different keywords.</p>
        </div>
      ) : (
        <>
          {results.projects.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Code className="w-5 h-5" />
                Projects ({results.projects.length})
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.projects.map((project, index) => {
                  const slug = project.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
                  return (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg">{project.title}</CardTitle>
                          <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <Badge key={tech} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <Link
                            href={`/projects/${slug}`}
                            className="text-primary hover:underline text-sm font-medium"
                          >
                            View Project →
                          </Link>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )}

          {results.posts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Blog Posts ({results.posts.length})
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.posts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{post.title}</CardTitle>
                        <p className="text-sm text-muted-foreground line-clamp-2">{post.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.technologies.slice(0, 3).map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <Link href={`/blog/${post.slug}`} className="text-primary hover:underline text-sm font-medium">
                          Read More →
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
