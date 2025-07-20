"use client"

import { Calendar, Tag, Github, ExternalLink } from "lucide-react"
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Project {
  title: string
  subtitle: string
  period: string
  longDescription: string
  technologies: string[]
  features: string[]
  image: string
  githubUrl: string
}

interface ProjectModalProps {
  project: Project
}

export function ProjectModal({ project }: ProjectModalProps) {
  return (
    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-2xl">{project.title}</DialogTitle>
        <p className="text-primary font-medium">{project.subtitle}</p>
      </DialogHeader>

      <div className="space-y-6">
        <div className="relative h-64 w-full rounded-lg overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Project Timeline
              </h4>
              <p className="text-muted-foreground">{project.period}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Github className="w-4 h-4" />
                Repository
              </h4>
              <Button variant="outline" size="sm" asChild>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  View on GitHub
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Key Features</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Project Description</h4>
          <p className="text-muted-foreground leading-relaxed">{project.longDescription}</p>
        </div>
      </div>
    </DialogContent>
  )
}
