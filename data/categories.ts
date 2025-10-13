import { projects } from "./projects"

export function getUniqueCategories(): string[] {
  if (!projects || !Array.isArray(projects)) {
    return ["All"]
  }

  const categoriesSet = new Set<string>(["All"])

  projects.forEach((project) => {
    if (project.categories && Array.isArray(project.categories)) {
      project.categories.forEach((category) => {
        if (category && typeof category === "string") {
          categoriesSet.add(category)
        }
      })
    }
  })

  return Array.from(categoriesSet)
}

export const categories = getUniqueCategories()
