import { projects, type Project } from "@/data/projects"
import { fetchAllRepos, type TrimmedRepo, monthRangeString } from "@/lib/github"

// Existing functions
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function getProjectsWithSlugs(): (Project & { slug: string })[] {
  if (!projects || !Array.isArray(projects)) {
    return []
  }
  return projects.map((project) => ({
    ...project,
    slug: generateSlug(project.title),
  }))
}

export function getProjectBySlug(slug: string): (Project & { slug: string }) | undefined {
  const projectsWithSlugs = getProjectsWithSlugs()
  return projectsWithSlugs.find((project) => project.slug === slug)
}

export function getRelatedProjects(currentSlug: string, limit = 3): (Project & { slug: string })[] {
  const currentProject = getProjectBySlug(currentSlug)
  if (!currentProject) return []

  const allProjects = getProjectsWithSlugs()
  const relatedProjects = allProjects
    .filter((project) => {
      if (project.slug === currentSlug) return false
      if (!project.categories || !currentProject.categories) return false

      const hasCommonCategory = project.categories.some((cat) => currentProject.categories.includes(cat))
      return hasCommonCategory
    })
    .slice(0, limit)

  if (relatedProjects.length < limit) {
    const remaining = limit - relatedProjects.length
    const otherProjects = allProjects
      .filter((project) => project.slug !== currentSlug && !relatedProjects.some((rp) => rp.slug === project.slug))
      .slice(0, remaining)

    return [...relatedProjects, ...otherProjects]
  }

  return relatedProjects
}

// NEW: Map GitHub repos to local Project shape
function mapRepoToProject(repo: TrimmedRepo): Project {
  const language = repo.language || "General"
  const cats = ["Open Source", language]
  return {
    title: repo.name,
    subtitle: repo.full_name,
    period: monthRangeString(repo.createdAt, repo.pushedAt),
    description: repo.description || "Open-source repository",
    longDescription:
      repo.description ||
      "An open-source repository imported from GitHub and displayed alongside curated portfolio projects.",
    technologies: [language].filter(Boolean),
    features: [],
    status: "Completed",
    image: "/open-source-github-repository-cover-image.jpg",
    githubUrl: repo.url,
    liveDemoUrl: repo.homepage || undefined,
    categories: cats,
    challenges: [],
    solutions: [],
    results: [],
  }
}

// NEW: Fetch GitHub repos and expose as Project[]
export async function getGitHubProjects(): Promise<Project[]> {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "amarhumayunx"
  const token = process.env.GITHUB_TOKEN
  const repos = await fetchAllRepos(username, token)
  return repos.map(mapRepoToProject)
}

// NEW: Unified list (local + GitHub) with slugs
export async function getAllProjectsWithSlugs(): Promise<(Project & { slug: string; source: "local" | "github" })[]> {
  const local = getProjectsWithSlugs().map((p) => ({ ...p, source: "local" as const }))
  const githubProjects = (await getGitHubProjects()).map((p) => ({
    ...p,
    slug: generateSlug(p.title),
    source: "github" as const,
  }))

  // Avoid duplicate slugs: namespace GitHub collisions if needed
  const slugSet = new Set(local.map((p) => p.slug))
  const dedupedGithub = githubProjects.map((p) => {
    let slug = p.slug
    if (slugSet.has(slug)) {
      slug = `${slug}-gh`
    }
    slugSet.add(slug)
    return { ...p, slug }
  })

  // Sort: prefer recently pushed GitHub repos first by pushedAt embedded in period end date
  const all = [...local, ...dedupedGithub]
  return all
}

// NEW: Aggregate categories (existing + GitHub-derived)
export async function getAllCategories(): Promise<string[]> {
  const unified = await getAllProjectsWithSlugs()
  const set = new Set<string>()
  unified.forEach((p) => p.categories?.forEach((c) => set.add(c)))
  return Array.from(set).sort((a, b) => a.localeCompare(b))
}
