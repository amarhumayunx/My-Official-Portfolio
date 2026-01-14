"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Github, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

interface Project {
  title: string
  subtitle: string
  description: string
  image?: string
  technologies: string[]
  categories: string[]
  period: string
  status: string
  githubUrl?: string
  liveDemoUrl?: string
  slug: string
}

interface ProjectPreviewModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectPreviewModal({ project, isOpen, onClose }: ProjectPreviewModalProps) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleEscape)
    }
    return () => {
      window.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-4xl md:max-h-[90vh] w-full bg-background border border-border rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 md:h-80 overflow-hidden">
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm"
              >
                <X className="w-5 h-5" />
              </Button>
              <div className="absolute bottom-4 left-4 right-4">
                <Badge variant={project.status === "Completed" ? "default" : "secondary"}>
                  {project.status}
                </Badge>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{project.title}</h2>
                <p className="text-lg text-primary font-medium mb-4">{project.subtitle}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>{project.period}</span>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">{project.description}</p>

              <div>
                <h3 className="font-semibold mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {project.categories.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.categories.map((category) => (
                      <Badge key={category} variant="secondary">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button asChild className="flex-1">
                  <Link href={`/projects/${project.slug}`}>View Details</Link>
                </Button>
                {project.liveDemoUrl && (
                  <Button variant="outline" asChild>
                    <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button variant="outline" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
