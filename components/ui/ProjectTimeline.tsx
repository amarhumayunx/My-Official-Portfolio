"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Code, ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getProjectsWithSlugs } from "@/lib/project-utils"

interface ProjectTimelineProps {
  projects: ReturnType<typeof getProjectsWithSlugs>
}

export function ProjectTimeline({ projects }: ProjectTimelineProps) {
  // Sort projects by period (most recent first)
  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      // Extract year from period string
      const getYear = (period: string) => {
        const match = period.match(/\d{4}/)
        return match ? parseInt(match[0]) : 0
      }
      return getYear(b.period) - getYear(a.period)
    })
  }, [projects])

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/60 to-primary transform md:-translate-x-1/2" />

      <div className="space-y-8">
        {sortedProjects.map((project, index) => {
          const isEven = index % 2 === 0
          const isCompleted = project.status === "Completed"

          return (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`relative flex items-center gap-4 md:gap-8 ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <div className="relative z-10 flex-shrink-0">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                  className={`w-8 h-8 rounded-full border-4 border-background ${
                    isCompleted ? "bg-green-500" : "bg-yellow-500"
                  } shadow-lg`}
                />
              </div>

              {/* Content Card */}
              <motion.div
                className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"} ${
                  isEven ? "md:pr-8" : "md:pl-8"
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className={`relative h-48 md:h-full min-h-[200px] ${isEven ? "md:order-2" : ""}`}>
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 right-4">
                        <Badge
                          variant={isCompleted ? "default" : "secondary"}
                          className="shadow-lg backdrop-blur-sm"
                        >
                          {project.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <CardContent className="p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{project.period}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-primary font-medium mb-3">{project.subtitle}</p>
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                          {project.description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.technologies.length - 4}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                        >
                          View Details
                        </Link>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 border rounded-lg hover:bg-muted transition-colors"
                          aria-label="View on GitHub"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                        {project.liveDemoUrl && (
                          <a
                            href={project.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 border rounded-lg hover:bg-muted transition-colors"
                            aria-label="View live demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
