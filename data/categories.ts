import { projects } from "./projects"

// Extract unique categories from all projects
export const categories = ["All", ...Array.from(new Set(projects.flatMap((p) => p.categories || [])))]

// Helper function to get unique categories
export function getUniqueCategories(): string[] {
  if (!projects || projects.length === 0) {
    return ["All"]
  }

  const uniqueCategories = new Set<string>()

  projects.forEach((project) => {
    if (project.categories && Array.isArray(project.categories)) {
      project.categories.forEach((category) => {
        if (category && typeof category === "string") {
          uniqueCategories.add(category)
        }
      })
    }
  })

  return ["All", ...Array.from(uniqueCategories).sort()]
}
