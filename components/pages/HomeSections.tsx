"use client"

import Hero from "@/components/sections/Hero"
import { LazySection } from "@/components/ui/LazySection"
import { PrefetchManager } from "@/components/ui/PrefetchManager"

export function HomeSections() {
  return (
    <>
      <PrefetchManager />
      <Hero />
      <LazySection
        loader={() => import("@/components/sections/About")}
        minHeight="min-h-[50vh]"
      />
      <LazySection
        loader={() => import("@/components/sections/StatsSection")}
        minHeight="min-h-[30vh]"
      />
      <LazySection
        loader={() => import("@/components/sections/Skills")}
        minHeight="min-h-[50vh]"
      />
      <LazySection
        loader={() => import("@/components/sections/Certifications")}
        minHeight="min-h-[40vh]"
      />
      <LazySection
        loader={() => import("@/components/sections/Projects")}
        minHeight="min-h-[60vh]"
      />
      <LazySection
        loader={() => import("@/components/sections/ProjectsCarousel")}
        minHeight="min-h-[40vh]"
      />
      <LazySection
        loader={() => import("@/components/sections/ServicesOverview")}
        minHeight="min-h-[40vh]"
      />
      <LazySection
        loader={() => import("@/components/sections/Testimonials")}
        minHeight="min-h-[50vh]"
      />
      <LazySection
        loader={() => import("@/components/sections/Blog")}
        minHeight="min-h-[50vh]"
      />
      <LazySection
        loader={() => import("@/components/sections/Contact")}
        minHeight="min-h-[50vh]"
      />
    </>
  )
}
