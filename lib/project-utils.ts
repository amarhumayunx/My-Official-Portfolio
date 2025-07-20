import { projects } from "@/data/projects"

// Define the base Project type (from components/ui/ProjectCard.tsx)
interface BaseProject {
  title: string
  subtitle: string
  period: string
  description: string
  longDescription: string
  technologies: string[]
  status: string
  image: string
  githubUrl: string
  liveDemoUrl: string | null // Added liveDemoUrl
  features: string[]
  categories: string[] // Added categories
}

// Extend the base Project type to include a slug
export interface ProjectWithSlug extends BaseProject {
  slug: string
}

// Function to convert title to slug (reused from blog-utils)
export const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric characters except spaces and hyphens
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
}

// Function to get all projects with generated slugs
export const getProjectsWithSlugs = (): ProjectWithSlug[] => {
  return projects.map((project) => ({
    ...project,
    slug: createSlug(project.title),
  }))
}

// Function to get a single project by slug
export const getProjectBySlug = (slug: string): ProjectWithSlug | undefined => {
  const allProjects = getProjectsWithSlugs()
  return allProjects.find((project) => project.slug === slug)
}
