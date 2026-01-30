"use client"

import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github, Calendar, Search, X, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ParallaxSection } from "@/components/ui/ParallaxSection"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { getProjectsWithSlugs } from "@/lib/project-utils"
import Link from "next/link"
import { categories } from "@/data/categories"
import GitHubRepos from "@/components/sections/github-repos"
import { ProjectsTimelineVisualization } from "@/components/ui/ProjectsTimelineVisualization"
import { CardSkeleton } from "@/components/ui/EnhancedSkeleton"
import { MicroInteraction } from "@/components/ui/MicroInteractions"

const ProjectCardSkeleton = () => (
  <Card className="h-full shadow-lg border-0 overflow-hidden">
    <motion.div
      className="relative w-full h-48 bg-gradient-to-r from-muted via-muted-foreground/10 to-muted rounded-t-lg"
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 2,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
      }}
      style={{
        backgroundSize: "200% 100%",
      }}
    />
    <CardHeader>
      <motion.div
        className="h-4 w-24 bg-muted-foreground/20 rounded mb-2"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="h-6 w-3/4 bg-muted-foreground/30 rounded mb-2"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.1 }}
      />
      <motion.div
        className="h-4 w-1/2 bg-muted-foreground/20 rounded"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
      />
    </CardHeader>
    <CardContent className="space-y-4">
      <motion.div
        className="h-4 w-full bg-muted-foreground/20 rounded"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
      />
      <motion.div
        className="h-4 w-5/6 bg-muted-foreground/20 rounded"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
      />
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="h-6 w-16 bg-muted-foreground/10 rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 + i * 0.1 }}
          />
        ))}
      </div>
      <div className="flex gap-2 pt-4">
        <motion.div
          className="h-9 flex-1 bg-primary/20 rounded-md"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.8 }}
        />
        <motion.div
          className="h-9 w-9 bg-muted-foreground/10 rounded-md"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.9 }}
        />
      </div>
    </CardContent>
  </Card>
)

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const allProjects = useMemo(() => getProjectsWithSlugs(), [])

  // Extract all unique technologies from projects
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>()
    allProjects.forEach((project) => {
      project.technologies.forEach((tech) => techSet.add(tech))
    })
    return Array.from(techSet).sort()
  }, [allProjects])

  // Get project count per technology
  const technologyCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    allTechnologies.forEach((tech) => {
      counts[tech] = allProjects.filter((project) => project.technologies.includes(tech)).length
    })
    return counts
  }, [allTechnologies, allProjects])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
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

    if (selectedTechnologies.length > 0) {
      filtered = filtered.filter((project) =>
        selectedTechnologies.some((tech) => project.technologies.includes(tech))
      )
    }

    return filtered
  }, [searchTerm, selectedCategory, selectedTechnologies, allProjects])

  const toggleTechnology = (tech: string) => {
    setSelectedTechnologies((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    )
  }

  const clearAllFilters = () => {
    setSelectedTechnologies([])
    setSelectedCategory("All")
    setSearchTerm("")
  }

  return (
    <section id="projects" className="section-padding section-bg">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            viewport={{ once: true }}
          >
            A showcase of my recent work, demonstrating expertise in mobile development, AI integration, and
            cross-platform solutions.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          viewport={{ once: true, margin: "-50px" }}
          className="relative max-w-xl mx-auto mb-8"
        >
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none"
            aria-hidden="true"
          />
          <Input
            type="text"
            placeholder="Search projects by title, tech, or description..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-input focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 shadow-sm hover:shadow-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search projects"
          />
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap justify-center gap-2 mb-6"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03, duration: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full transition-all duration-200"
                aria-pressed={selectedCategory === category}
              >
                {category}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Technology Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Filter by Technology:</span>
            {(selectedTechnologies.length > 0 || selectedCategory !== "All" || searchTerm) && (
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
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {allTechnologies.map((tech, index) => {
              const isSelected = selectedTechnologies.includes(tech)
              const count = technologyCounts[tech]
              return (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.02, duration: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleTechnology(tech)}
                    className="rounded-full transition-all duration-200 text-xs sm:text-sm"
                    aria-pressed={isSelected}
                  >
                    {tech}
                    <Badge
                      variant="secondary"
                      className="ml-2 h-5 px-1.5 text-xs bg-background/50"
                    >
                      {count}
                    </Badge>
                  </Button>
                </motion.div>
              )
            })}
          </div>
          {selectedTechnologies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap justify-center gap-2 mt-4"
            >
              {selectedTechnologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="default"
                  className="gap-1 px-2 py-1"
                >
                  {tech}
                  <button
                    onClick={() => toggleTechnology(tech)}
                    className="ml-1 hover:bg-background/20 rounded-full p-0.5"
                    aria-label={`Remove ${tech} filter`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Results Count */}
        {filteredProjects.length !== allProjects.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-6 text-sm text-muted-foreground"
          >
            Showing {filteredProjects.length} of {allProjects.length} projects
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                <CardSkeleton />
              </motion.div>
            ))
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ParallaxSection key={project.slug} offset={15}>
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.04,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="h-full"
                >
                  <MicroInteraction variant="lift" intensity="normal">
                    <Card className="h-full hover:shadow-2xl transition-all duration-500 group border-0 shadow-lg overflow-hidden hover-lift card-3d">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <motion.div
                          className="relative w-full h-48 overflow-hidden"
                          whileHover={{ scale: 1.08 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={index === 0 || index === 1}
                          />
                        </motion.div>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div className="absolute top-4 right-4">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Badge
                              variant={project.status === "Completed" ? "default" : "secondary"}
                              className="shadow-lg backdrop-blur-sm"
                            >
                              {project.status}
                            </Badge>
                          </motion.div>
                        </div>
                      </div>

                      <CardHeader className="pb-3">
                        <motion.div
                          className="flex items-center gap-2 text-sm text-muted-foreground mb-2"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Calendar className="w-4 h-4" aria-hidden="true" />
                          <span className="sr-only">Project period:</span>
                          {project.period}
                        </motion.div>
                        <CardTitle className="text-lg sm:text-xl mb-2 group-hover:text-primary transition-colors duration-300">
                          {project.title}
                        </CardTitle>
                        <p className="text-sm text-primary font-medium">{project.subtitle}</p>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech, techIndex) => (
                            <motion.div
                              key={tech}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: techIndex * 0.05 }}
                              whileHover={{ scale: 1.08, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Badge
                                variant="outline"
                                className="text-xs hover:bg-primary hover:text-primary-foreground transition-all duration-300"
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
                            {project.categories.map((category, catIndex) => (
                              <motion.div
                                key={category}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: catIndex * 0.05 + 0.2 }}
                              >
                                <Badge variant="secondary" className="text-xs">
                                  {category}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        )}

                        <div className="flex gap-2 pt-4">
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            className="flex-1"
                          >
                            <Button variant="default" size="sm" className="w-full shadow-md" asChild>
                              <Link href={`/projects/${project.slug}`} aria-label={`View details for ${project.title}`}>
                                View Details
                              </Link>
                            </Button>
                          </motion.div>

                          {project.liveDemoUrl && (
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Button variant="outline" size="sm" className="shadow-sm bg-transparent" asChild>
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

                          <motion.div
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Button variant="outline" size="sm" className="shadow-sm bg-transparent" asChild>
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
                  </MicroInteraction>
                </motion.div>
              </ParallaxSection>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="col-span-full text-center text-muted-foreground text-lg py-16"
            >
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
                🔍
              </motion.div>
              <div className="text-center space-y-2">
                <p className="text-lg font-medium">No projects found</p>
                <p className="text-sm text-muted-foreground">
                  {selectedTechnologies.length > 0 || selectedCategory !== "All" || searchTerm
                    ? "Try adjusting your filters or search terms"
                    : "No projects available"}
                </p>
                {(selectedTechnologies.length > 0 || selectedCategory !== "All" || searchTerm) && (
                  <Button variant="outline" onClick={clearAllFilters} className="mt-4">
                    Clear all filters
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mt-12 sm:mt-16"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="lg"
              className="shadow-lg hover:shadow-xl transition-all bg-transparent"
              asChild
            >
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
        </motion.div>

        {/* Project Timeline View */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Project <span className="gradient-text">Timeline</span>
            </h2>
            <p className="text-muted-foreground">
              A chronological view of all my projects and their development journey
            </p>
          </div>
          <ProjectsTimelineVisualization projects={allProjects} />
        </motion.div>

        {/* GitHub Repositories Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <GitHubRepos showHeader={true} />
        </motion.div>
      </div>
    </section>
  )
}
