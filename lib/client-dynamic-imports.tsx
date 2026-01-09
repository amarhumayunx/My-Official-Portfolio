"use client"

import dynamic from "next/dynamic"

export const DynamicAnalyticsChart = dynamic(() => import("@/components/sections/Analytics"), {
  loading: () => <div className="h-80 bg-muted animate-pulse rounded-lg" />,
  ssr: false, // Analytics charts don't need SSR - safe in client component
})
