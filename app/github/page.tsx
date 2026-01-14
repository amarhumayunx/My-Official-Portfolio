import GitHubRepos from "@/components/sections/github-repos"
import { GitHubContributionGraph } from "@/components/ui/GitHubContributionGraph"

export const metadata = {
  title: "GitHub Repositories",
  description: "All public repositories fetched from the GitHub API and showcased in your portfolio.",
}

export default function GitHubPage() {
  return (
    <div className="min-h-screen pt-24 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <GitHubContributionGraph className="mb-8" />
        <GitHubRepos showHeader />
      </div>
    </div>
  )
}
