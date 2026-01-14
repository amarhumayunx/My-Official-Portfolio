export const dynamicParams = false // Add this line

import { notFound } from "next/navigation"
import { getProjectsWithSlugs, getProjectBySlug } from "@/lib/project-utils"
import { Calendar, Tag, Github, ExternalLink, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FluidTransition } from "@/components/ui/FluidTransition"
import Link from "next/link"
import { DisqusComments } from "@/components/ui/DisqusComments"
import { SocialShareButtons } from "@/components/ui/SocialShareButtons"
import { WebShare } from "@/components/ui/WebShare"
import { Breadcrumbs } from "@/components/ui/Breadcrumbs"
import { RelatedProjects } from "@/components/ui/RelatedContent"
import { projects } from "@/data/projects"

// Generate static params for all projects at build time
export async function generateStaticParams() {
  const projects = getProjectsWithSlugs()
  console.log(
    "Generated slugs for projects:",
    projects.map((project) => project.slug),
  ) // Add this line
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

// Metadata for the dynamic page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  console.log("Generating metadata for project slug:", params.slug) // Add this line
  const project = getProjectBySlug(params.slug)

  if (!project) {
    console.log("Project not found for metadata:", params.slug) // Add this line
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.image],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      creator: "@amarhumayunx", // Assuming your Twitter handle
      images: [project.image],
    },
  }
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  console.log("Rendering ProjectDetailPage for slug:", params.slug) // Add this line
  const project = getProjectBySlug(params.slug)

  if (!project) {
    console.log("Project not found during render:", params.slug) // Add this line
    notFound() // Render 404 page if project not found
  }

  // Construct the full URL for sharing
  const fullUrl = `https://amarhumayun.vercel.app/projects/${project.slug}` // Replace with your actual domain

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 section-padding">
      <div className="max-w-4xl mx-auto">
        <FluidTransition className="mb-8 no-print">
          <Link
            href="/#projects"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
          </Link>
        </FluidTransition>

        <FluidTransition delay={0.1}>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">{project.title}</h1>
          <p className="text-primary font-medium text-lg mb-8">{project.subtitle}</p>
        </FluidTransition>

        <FluidTransition
          delay={0.2}
          className="relative w-full h-80 sm:h-96 rounded-lg overflow-hidden mb-12 shadow-lg"
        >
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            priority // Prioritize loading for the main image
          />
        </FluidTransition>

        <FluidTransition
          delay={0.3}
          className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed mb-12"
        >
          <p>{project.longDescription}</p>
        </FluidTransition>

        <FluidTransition delay={0.4} className="space-y-6 mb-12">
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Project Timeline
            </h3>
            <p className="text-muted-foreground">{project.period}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Display Categories */}
          {project.categories && project.categories.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.categories.map((category) => (
                  <Badge key={category} variant="outline">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Github className="w-4 h-4" />
              Links
            </h3>
            <div className="flex flex-wrap gap-2">
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
              {project.liveDemoUrl && ( // Conditionally render Live Demo button
                <Button variant="default" size="sm" asChild>
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Key Features</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </FluidTransition>

        {/* Social Share Buttons */}
        <FluidTransition delay={0.5} className="mb-12 no-print flex items-center gap-4 flex-wrap">
          <SocialShareButtons url={fullUrl} title={project.title} />
          <WebShare title={project.title} text={project.description} url={fullUrl} />
        </FluidTransition>

        {/* Disqus Comments Section */}
        <FluidTransition delay={0.6} className="no-print">
          <DisqusComments slug={project.slug} title={project.title} />
        </FluidTransition>

        <FluidTransition delay={0.7} className="text-center mt-12 no-print">
          <Link href="/#projects" className="inline-flex items-center text-primary hover:underline font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to all projects
          </Link>
        </FluidTransition>
      </div>
    </div>
  )
}
