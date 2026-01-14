"use client"

import { motion } from "framer-motion"
import { Calendar, Code, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/data/projects"

interface ProjectTimelineProps {
  projects: Project[]
}

export function ProjectTimeline({ projects }: ProjectTimelineProps) {
  // Sort projects by period (most recent first)
  const sortedProjects = [...projects].sort((a, b) => {
    const getEndDate = (period: string) => {
      const match = period.match(/\d{4}/g)
      return match ? parseInt(match[match.length - 1]) : 0
    }
    return getEndDate(b.period) - getEndDate(a.period)
  })

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-pink-500 hidden md:block" />

      <div className="space-y-8">
        {sortedProjects.map((project, index) => {
          const isEven = index % 2 === 0
          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-start gap-6"
            >
              {/* Timeline dot */}
              <div className="relative z-10 flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg border-4 border-background">
                  <Code className="w-6 h-6 text-white" />
                </div>
                {index < sortedProjects.length - 1 && (
                  <div className="absolute top-16 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-primary to-purple-500 md:hidden" />
                )}
              </div>

              {/* Project card */}
              <Card className="flex-1 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{project.subtitle}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                        <Calendar className="w-3 h-3" />
                        <span>{project.period}</span>
                        <span className="mx-1">•</span>
                        <Badge
                          variant={project.status === "Completed" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                    {project.status === "Completed" && (
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 5}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
