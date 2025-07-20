import { projects } from "@/data/projects"

// Define a type for the blog post structure
export interface BlogPost {
  title: string
  date: string
  description: string
  longDescription: string // Added for full content
  slug: string
  image: string
  technologies: string[]
  githubUrl: string
  features: string[]
}

// Function to convert title to slug
export const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric characters except spaces and hyphens
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
}

// Function to get all blog posts (derived from projects)
export const getBlogPosts = (): BlogPost[] => {
  return projects.map((project) => ({
    title: `Deep Dive: ${project.title}`,
    date: project.period,
    description: `An in-depth look at the development process, challenges, and solutions behind ${project.title}. ${project.description}`,
    longDescription: project.longDescription, // Use the full description
    slug: createSlug(`deep-dive-${project.title}`),
    image: project.image,
    technologies: project.technologies,
    githubUrl: project.githubUrl,
    features: project.features,
  }))
}

// Function to get a single blog post by slug
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  const posts = getBlogPosts()
  return posts.find((post) => post.slug === slug)
}
