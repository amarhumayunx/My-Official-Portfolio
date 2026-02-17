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
        id="about"
        loader={() => import("@/components/sections/About")}
        minHeight="min-h-[50vh]"
      />
      <LazySection
        id="stats"
        loader={() => import("@/components/sections/StatsSection")}
        minHeight="min-h-[30vh]"
      />
      <LazySection
        id="skills"
        loader={() => import("@/components/sections/Skills")}
        minHeight="min-h-[50vh]"
      />
      <LazySection
        id="certifications"
        loader={() => import("@/components/sections/Certifications")}
        minHeight="min-h-[40vh]"
      />
      <LazySection
        id="projects"
        loader={() => import("@/components/sections/Projects")}
        minHeight="min-h-[60vh]"
      />
      <LazySection
        id="portfolio"
        loader={() => import("@/components/sections/ProjectsCarousel")}
        minHeight="min-h-[40vh]"
      />
      <LazySection
        id="services"
        loader={() => import("@/components/sections/ServicesOverview")}
        minHeight="min-h-[40vh]"
      />
      <LazySection
        id="testimonials"
        loader={() => import("@/components/sections/Testimonials")}
        minHeight="min-h-[50vh]"
      />
      <LazySection
        id="blog"
        loader={() => import("@/components/sections/Blog")}
        minHeight="min-h-[50vh]"
      />
      <LazySection
        id="contact"
        loader={() => import("@/components/sections/Contact")}
        minHeight="min-h-[50vh]"
      />
    </>
  )
}
