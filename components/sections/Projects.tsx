"use client"

import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github, Calendar, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ParallaxSection } from "@/components/ui/ParallaxSection"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { getProjectsWithSlugs } from "@/lib/project-utils"
import Link from "next/link"
import { categories } from "@/data/categories" // Corrected import

// Simple Skeleton component for loading states
const ProjectCardSkeleton = () => (
  <Card className="h-full shadow-lg border-0 overflow-hidden animate-pulse">
    <div className="relative w-full h-48 bg-muted rounded-t-lg" />
    <CardHeader>
      <div className="h-4 w-24 bg-muted-foreground/20 rounded mb-2" />
      <div className="h-6 w-3/4 bg-muted-foreground/30 rounded mb-2" />
      <div className="h-4 w-1/2 bg-muted-foreground/20 rounded" />
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="h-4 w-full bg-muted-foreground/20 rounded" />
      <div className="h-4 w-5/6 bg-muted-foreground/20 rounded" />
      <div className="flex flex-wrap gap-2">
        <div className="h-6 w-16 bg-muted-foreground/10 rounded-full" />
        <div className="h-6 w-20 bg-muted-foreground/10 rounded-full" />
        <div className="h-6 w-12 bg-muted-foreground/10 rounded-full" />
      </div>
      <div className="flex gap-2 pt-4">
        <div className="h-9 w-full bg-primary/20 rounded-md" />
        <div className="h-9 w-9 bg-muted-foreground/10 rounded-md" />
      </div>
    </CardContent>
  </Card>
)

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isLoading, setIsLoading] = useState(true)
  const allProjects = useMemo(() => getProjectsWithSlugs(), [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredProjects = useMemo(() => {
    let filtered = allProjects

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          project.subtitle.toLowerCase().includes(lowerCaseSearchTerm) ||
          project.description.toLowerCase().includes(lowerCaseSearchTerm) ||
          project.technologies.some((tech) => tech.toLowerCase().includes(lowerCaseSearchTerm)),
      )
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((project) => project.categories.includes(selectedCategory))
    }

    return filtered
  }, [searchTerm, selectedCategory, allProjects])

  return (
    <section id="projects" className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A showcase of my recent work, demonstrating expertise in mobile development, AI integration, and
            cross-platform solutions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative max-w-xl mx-auto mb-8"
        >
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5"
            aria-hidden="true"
          />
          <Input
            type="text"
            placeholder="Search projects by title, tech, or description..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-input focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search projects"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
              aria-pressed={selectedCategory === category}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <ProjectCardSkeleton key={i} />)
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ParallaxSection key={project.slug} offset={20}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                >
                  <Card className="h-full hover:shadow-2xl transition-all duration-500 group border-0 shadow-lg overflow-hidden">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <motion.div
                        className="relative w-full h-48 overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </motion.div>
                      <motion.div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 right-4">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                          <Badge variant={project.status === "Completed" ? "default" : "secondary"}>
                            {project.status}
                          </Badge>
                        </motion.div>
                      </div>
                    </div>

                    <CardHeader>
                      <motion.div
                        className="flex items-center gap-2 text-sm text-muted-foreground mb-2"
                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      >
                        <Calendar className="w-4 h-4" aria-hidden="true" />
                        <span className="sr-only">Project period:</span>
                        {project.period}
                      </motion.div>
                      <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </CardTitle>
                      <p className="text-sm text-primary font-medium">{project.subtitle}</p>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                          <motion.div key={tech} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Badge
                              variant="outline"
                              className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                            >
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 3} more
                          </Badge>
                        )}
                      </div>

                      {project.categories && project.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.categories.map((category) => (
                            <Badge key={category} variant="secondary" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-2 pt-4">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                          <Button variant="default" size="sm" className="w-full" asChild>
                            <Link href={`/projects/${project.slug}`} aria-label={`View details for ${project.title}`}>
                              View Details
                            </Link>
                          </Button>
                        </motion.div>

                        {project.liveDemoUrl && (
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button variant="outline" size="sm" asChild>
                              <a
                                href={project.liveDemoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2"
                                aria-label={`View live demo of ${project.title}`}
                              >
                                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                              </a>
                            </Button>
                          </motion.div>
                        )}

                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                              aria-label={`View ${project.title} on GitHub`}
                            >
                              <Github className="w-4 h-4" aria-hidden="true" />
                            </a>
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ParallaxSection>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="col-span-full text-center text-muted-foreground text-lg py-10"
            >
              No projects found matching your search or selected category.
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" asChild>
            <a
              href="https://github.com/amarhumayunx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
              aria-label="View all projects on GitHub"
            >
              <Github className="w-5 h-5" aria-hidden="true" />
              View All Projects on GitHub
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
