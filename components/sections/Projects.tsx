"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github, Calendar, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
// Removed Dialog imports as we are now routing to a dedicated page
import { ParallaxSection } from "@/components/ui/ParallaxSection"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { getProjectsWithSlugs } from "@/lib/project-utils" // Import from new project-utils
import Link from "next/link" // Import Link for navigation

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("")
  const allProjects = useMemo(() => getProjectsWithSlugs(), []) // Get projects with slugs once

  const filteredProjects = useMemo(() => {
    if (!searchTerm) {
      return allProjects
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase()
    return allProjects.filter(
      (project) =>
        project.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        project.subtitle.toLowerCase().includes(lowerCaseSearchTerm) ||
        project.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(lowerCaseSearchTerm)),
    )
  }, [searchTerm, allProjects])

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

        {/* Search Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative max-w-xl mx-auto mb-12"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search projects by title, tech, or description..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-input focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search projects"
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ParallaxSection key={project.slug} offset={20}>
                {" "}
                {/* Use project.slug as key */}
                <motion.div
                  key={project.slug} // Use project.slug as key
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
                        whileHover={{ scale: 1.05 }} // Subtle scale on hover for the container
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill // Use fill to cover the parent div
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive sizes
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
                        <Calendar className="w-4 h-4" />
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

                      <div className="flex gap-2 pt-4">
                        {/* Changed to Link for routing to dedicated project page */}
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                          <Button variant="default" size="sm" className="w-full" asChild>
                            <Link href={`/projects/${project.slug}`}>View Details</Link>
                          </Button>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              <Github className="w-4 h-4" />
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
              No projects found matching your search.
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
            >
              <Github className="w-5 h-5" />
              View All Projects on GitHub
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
