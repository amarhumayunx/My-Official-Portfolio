import dynamic from "next/dynamic"
import type { ComponentType } from "react"
import { DynamicAnalyticsChart } from "./client-dynamic-imports"

/**
 * Create a dynamically imported component with loading and error states
 */
export const createDynamicComponent = <P extends object>(
  importFunc: () => Promise<{ default: ComponentType<P> }>,
  options?: {
    loading?: ComponentType
    ssr?: boolean
  },
) => {
  return dynamic(importFunc, {
    loading: options?.loading,
    ssr: options?.ssr ?? true,
  })
}

// Lazy load components for better initial page load
export const DynamicBlogList = dynamic(() => import("@/components/sections/BlogList"), {
  loading: () => <div className="h-96 bg-muted animate-pulse rounded-lg" />,
  ssr: true,
})

export { DynamicAnalyticsChart }

export const DynamicProjectShowcase = dynamic(() => import("@/components/sections/ProjectShowcase"), {
  loading: () => <div className="h-96 bg-muted animate-pulse rounded-lg" />,
  ssr: true,
})
