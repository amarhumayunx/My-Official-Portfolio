"use client"

import dynamic from "next/dynamic"

export const DynamicAnalyticsChart = dynamic(() => import("@/components/ui/ProjectAnalytics").then((m) => ({ default: m.ProjectAnalytics })), {
  loading: () => <div className="h-80 bg-muted animate-pulse rounded-lg" />,
  ssr: false,
})
