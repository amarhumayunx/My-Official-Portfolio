import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Skills from "@/components/sections/Skills"
import Projects from "@/components/sections/Projects"
import GitHubRepos from "@/components/sections/github-repos"
import StatsSection from "@/components/sections/StatsSection"
import ServicesOverview from "@/components/sections/ServicesOverview"
import Testimonials from "@/components/sections/Testimonials"
import Blog from "@/components/sections/Blog"
import Contact from "@/components/sections/Contact"
import ProjectsCarousel from "@/components/sections/ProjectsCarousel"
import { PrefetchManager } from "@/components/ui/PrefetchManager"

export default function Home() {
  return (
    <>
      <PrefetchManager />
    <>
      <Hero />
      <About />
      <StatsSection />
      <Skills />
      <Projects />
      <ProjectsCarousel />
      <GitHubRepos showHeader={false} />
      <ServicesOverview />
      <Testimonials />
      <Blog />
      <Contact />
    </>
  )
}
