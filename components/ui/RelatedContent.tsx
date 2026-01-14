"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import type { Project } from "@/data/projects"
import type { BlogPost } from "@/lib/blog-utils"

interface RelatedContentProps {
  currentSlug: string
  type: "projects" | "blog"
  limit?: number
}

export function RelatedContent({ currentSlug, type, limit = 3 }: RelatedContentProps) {
  // This will be populated by the parent component
  return null
}

interface RelatedProjectsProps {
  currentProject: Project
  allProjects: Project[]
  limit?: number
}

export function RelatedProjects({ currentProject, allProjects, limit = 3 }: RelatedProjectsProps) {
  const getSlug = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
  }

  // Find related projects based on shared technologies and categories
  const related = allProjects
    .filter((project) => project.title !== currentProject.title)
    .map((project) => {
      const sharedTechs = project.technologies.filter((tech) =>
        currentProject.technologies.includes(tech),
      ).length
      const sharedCategories = project.categories.filter((cat) =>
        currentProject.categories.includes(cat),
      ).length
      return {
        project,
        score: sharedTechs * 2 + sharedCategories * 3, // Categories weighted more
      }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.project)

  if (related.length === 0) return null

  return (
    <section className="mt-16 pt-12 border-t">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold">Related Projects</h2>
        <Link
          href="/#projects"
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
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
                  href={`/projects/${getSlug(project.title)}`}
                  className="text-primary hover:underline text-sm font-medium inline-flex items-center gap-1"
                >
                  View Project <ArrowRight className="w-3 h-3" />
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

interface RelatedPostsProps {
  currentPost: BlogPost
  allPosts: BlogPost[]
  limit?: number
}

export function RelatedPosts({ currentPost, allPosts, limit = 3 }: RelatedPostsProps) {
  // Find related posts based on shared technologies
  const related = allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      const sharedTechs = post.technologies.filter((tech) =>
        currentPost.technologies.includes(tech),
      ).length
      return {
        post,
        score: sharedTechs,
      }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post)

  if (related.length === 0) return null

  return (
    <section className="mt-16 pt-12 border-t">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold">Related Posts</h2>
        <Link
          href="/#blog"
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
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
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-primary hover:underline text-sm font-medium inline-flex items-center gap-1"
                >
                  Read More <ArrowRight className="w-3 h-3" />
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
