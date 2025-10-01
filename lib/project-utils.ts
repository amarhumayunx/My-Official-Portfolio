import { projects } from "@/data/projects"

export interface ProjectWithSlug {
  title: string
  subtitle: string
  period: string
  description: string
  longDescription: string
  technologies: string[]
  features: string[]
  status: string
  image: string
  githubUrl: string
  liveDemoUrl: string | null
  categories: string[]
  slug: string
}

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

// Get all projects with slugs
export function getProjectsWithSlugs(): ProjectWithSlug[] {
  return projects.map((project) => ({
    ...project,
    slug: generateSlug(project.title),
  }))
}

// Get a single project by slug
export function getProjectBySlug(slug: string): ProjectWithSlug | undefined {
  const projectsWithSlugs = getProjectsWithSlugs()
  return projectsWithSlugs.find((project) => project.slug === slug)
}

// Get all project slugs for static generation
export function getAllProjectSlugs(): string[] {
  return projects.map((project) => generateSlug(project.title))
}

// Filter projects by category
export function getProjectsByCategory(category: string): ProjectWithSlug[] {
  const projectsWithSlugs = getProjectsWithSlugs()

  if (category === "All") {
    return projectsWithSlugs
  }

  return projectsWithSlugs.filter((project) => project.categories && project.categories.includes(category))
}
