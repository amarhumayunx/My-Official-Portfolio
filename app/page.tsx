import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Skills from "@/components/sections/Skills"
import Projects from "@/components/sections/Projects"
import GitHubRepos from "@/components/sections/github-repos"
import ServicesOverview from "@/components/sections/ServicesOverview"
import Testimonials from "@/components/sections/Testimonials"
import Blog from "@/components/sections/Blog"
import Contact from "@/components/sections/Contact"

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <GitHubRepos showHeader={false} />
      <ServicesOverview />
      <Testimonials />
      <Blog />
      <Contact />
    </>
  )
}
