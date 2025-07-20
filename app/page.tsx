import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Skills from "@/components/sections/Skills"
import Projects from "@/components/sections/Projects"
import Testimonials from "@/components/sections/Testimonials"
import Blog from "@/components/sections/Blog" // New import
import Contact from "@/components/sections/Contact"
import BackToTop from "@/components/ui/BackToTop"

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Testimonials />
      <Blog /> {/* New section */}
      <Contact />
      <BackToTop />
    </main>
  )
}
