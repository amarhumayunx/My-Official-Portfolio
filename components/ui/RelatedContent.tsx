"use client"

import { motion } from "framer-motion"
import { getRelatedProjects } from "@/lib/project-utils"
import ProjectCard from "@/components/ProjectCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface RelatedProjectsProps {
  currentSlug: string
  limit?: number
  className?: string
}

/**
 * RelatedProjects Component
 * Displays related projects based on shared categories.
 * Uses the getRelatedProjects utility to fetch related projects.
 */
export function RelatedProjects({ currentSlug, limit = 3, className = "" }: RelatedProjectsProps) {
  const relatedProjects = getRelatedProjects(currentSlug, limit)

  if (!relatedProjects || relatedProjects.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`space-y-6 ${className}`}
    >
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Related Projects</h2>
        <p className="text-muted-foreground">Explore other projects in similar categories</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedProjects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </motion.div>
  )
}
