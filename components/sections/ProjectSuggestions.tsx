"use client"

import InlineSuggestions from "@/components/ui/InlineSuggestions"

interface ProjectSuggestionsProps {
  currentProject?: string
  relatedTechnologies?: string[]
  className?: string
}

const projectSuggestions = [
  {
    id: "balancebite",
    title: "BalanceBite",
    description: "AI-powered nutrition tracking with personalized meal plans",
    href: "/projects/balancebite",
    category: "project" as const,
    icon: "🍎",
    cta: "View Project",
    technologies: ["Flutter", "AI/ML", "Firebase", "Health"],
  },
  {
    id: "safecrypt",
    title: "SafeCrypt",
    description: "Secure password manager with AES-256 encryption",
    href: "/projects/safecrypt",
    category: "project" as const,
    icon: "🔐",
    cta: "View Project",
    technologies: ["Flutter", "Security", "Encryption", "Biometrics"],
  },
  {
    id: "surah-yaseen",
    title: "Surah Yaseen",
    description: "Islamic app for reading and listening to Quran",
    href: "/projects/surah-yaseen-app",
    category: "project" as const,
    icon: "📖",
    cta: "View Project",
    technologies: ["Flutter", "Audio", "UI/UX", "Islamic"],
  },
  {
    id: "toolkit-app",
    title: "Toolkit Collection",
    description: "Multi-utility app with various tools and features",
    href: "/projects/toolkit-app",
    category: "project" as const,
    icon: "🛠️",
    cta: "View Project",
    technologies: ["Flutter", "Utilities", "Multi-feature", "Tools"],
  },
]

export default function ProjectSuggestions({
  currentProject,
  relatedTechnologies = [],
  className = "",
}: ProjectSuggestionsProps) {
  // Filter out current project and prioritize by related technologies
  let suggestions = projectSuggestions.filter((p) => p.id !== currentProject)

  if (relatedTechnologies.length > 0) {
    suggestions = suggestions.sort((a, b) => {
      const aMatches = a.technologies.filter((tech) =>
        relatedTechnologies.some((rt) => tech.toLowerCase().includes(rt.toLowerCase())),
      ).length
      const bMatches = b.technologies.filter((tech) =>
        relatedTechnologies.some((rt) => tech.toLowerCase().includes(rt.toLowerCase())),
      ).length
      return bMatches - aMatches
    })
  }

  return (
    <InlineSuggestions
      title="Related Projects"
      suggestions={suggestions}
      maxItems={3}
      columns={3}
      showCategories={false}
      className={className}
    />
  )
}
