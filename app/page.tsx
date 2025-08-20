import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Skills from "@/components/sections/Skills"
import Projects from "@/components/sections/Projects"
import Testimonials from "@/components/sections/Testimonials"
import Blog from "@/components/sections/Blog"
import Contact from "@/components/sections/Contact"
import Footer from "@/components/layout/Footer" // Added Footer import
import BackToTop from "@/components/ui/BackToTop"

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Testimonials />
      <Blog />
      <Contact />
      <Footer /> {/* Added Footer component */}
      <BackToTop />
    </main>
  )
}
