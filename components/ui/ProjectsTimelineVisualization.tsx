"use client"

import { motion } from "framer-motion"
import { Calendar, ExternalLink, Github } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import type { Project } from "@/data/projects"

interface ProjectsTimelineVisualizationProps {
  projects: Project[]
  className?: string
}

export function ProjectsTimelineVisualization({ projects, className }: ProjectsTimelineVisualizationProps) {
  if (!projects || projects.length === 0) {
    return null
  }

  // Sort projects by period (most recent first)
  const sortedProjects = [...projects].sort((a, b) => {
    // Extract year from period string (e.g., "Jan 2024 - Feb 2025" -> 2024)
    const getYear = (period: string) => {
      const match = period.match(/\d{4}/)
      return match ? parseInt(match[0]) : 0
    }
    return getYear(b.period) - getYear(a.period)
  })

  return (
    <div className={cn("relative", className)}>
      {/* Timeline Line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/20" />

      <div className="space-y-8">
        {sortedProjects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="relative pl-16"
          >
            {/* Timeline Dot */}
            <div className="absolute left-4 top-1 w-4 h-4 rounded-full border-4 border-background bg-primary" />

            {/* Content Card */}
            <div className="bg-transparent border border-primary/20 rounded-lg p-6 backdrop-blur-sm hover:border-primary/40 transition-colors">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Project Image */}
                {project.image && (
                  <div className="relative w-full md:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 128px"
                    />
                  </div>
                )}

                {/* Project Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{project.subtitle}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>{project.period}</span>
                        <Badge variant="secondary" className="ml-2">
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 5} more
                      </Badge>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex gap-2">
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      <Github className="w-3 h-3" />
                      GitHub
                    </Link>
                    {project.liveDemoUrl && (
                      <Link
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Live Demo
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
