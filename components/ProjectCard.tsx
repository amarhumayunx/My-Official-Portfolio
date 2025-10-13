"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ExternalLink, Github } from "lucide-react"

export type Project = {
  slug: string
  title: string
  subtitle?: string
  description: string
  image?: string
  period?: string
  status?: "Completed" | "In Progress" | "Planned" | string
  technologies: string[]
  categories: string[]
  githubUrl?: string
  liveDemoUrl?: string
}

/**
 - ProjectCard
 - A reusable card used to display a project in a grid.
 - Matches the visual style used in components/sections/Projects.tsx
 */
export default function ProjectCard({
  project,
  index = 0,
}: {
  project: Project
  index?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      viewport={{ once: true, margin: "-50px" }}
      className="h-full"
    >
      <motion.div
        whileHover={{
          y: -8,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
        className="h-full"
      >
        <Card className="h-full hover:shadow-2xl transition-all duration-500 group border-0 shadow-lg overflow-hidden bg-card/80 backdrop-blur-sm">
          <div className="relative overflow-hidden rounded-t-lg">
            <motion.div
              className="relative w-full h-48 overflow-hidden"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Image
                src={project.image || "/placeholder.svg?height=400&width=800&query=project%20cover%20image"}
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
            {project.status && (
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
            )}
          </div>

          <CardHeader className="pb-3">
            {project.period && (
              <motion.div
                className="flex items-center gap-2 text-sm text-muted-foreground mb-2"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <span className="sr-only">Project period:</span>
                {project.period}
              </motion.div>
            )}
            <CardTitle className="text-lg sm:text-xl mb-2 group-hover:text-primary transition-colors duration-300">
              {project.title}
            </CardTitle>
            {project.subtitle && <p className="text-sm text-primary font-medium">{project.subtitle}</p>}
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{project.description}</p>

            {project.technologies?.length > 0 && (
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
            )}

            {project.categories?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.categories.map((category, catIndex) => (
                  <motion.div
                    key={`${project.slug}-${category}-${catIndex}`}
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

              {project.githubUrl && (
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
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
