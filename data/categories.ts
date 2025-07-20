import { projects } from "./projects"

// Function to get all unique categories from projects
export const getUniqueCategories = (): string[] => {
  const allCategories = new Set<string>()
  projects.forEach((project) => {
    project.categories.forEach((category) => allCategories.add(category))
  })
  return ["All", ...Array.from(allCategories).sort()]
}

export const categories = getUniqueCategories()
