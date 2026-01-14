"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { getProjectsWithSlugs } from "@/lib/project-utils"

export default function ProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [dragStart, setDragStart] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const projects = getProjectsWithSlugs().slice(0, 6)

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => (prev + newDirection + projects.length) % projects.length)
  }

  const handleDragEnd = (e: any) => {
    const dragEnd = e.clientX || e.changedTouches?.[0]?.clientX || 0
    const difference = dragStart - dragEnd

    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        paginate(1)
      } else {
        paginate(-1)
      }
    }
  }

  const project = projects[currentIndex]

  return (
    <section id="portfolio" className="section-padding bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Featured <span className="gradient-text">Project Showcase</span>
          </h2>
          <p className="text-muted-foreground">Swipe or use arrows to explore projects</p>
        </motion.div>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          onMouseDown={(e) => setDragStart(e.clientX)}
          onTouchStart={(e) => setDragStart(e.changedTouches[0].clientX)}
          onMouseUp={handleDragEnd}
          onTouchEnd={handleDragEnd}
          className="cursor-grab active:cursor-grabbing"
        >
          <Card className="border-0 shadow-2xl overflow-hidden">
            <div className="relative overflow-hidden">
              <motion.div
                className="relative w-full h-64 sm:h-80 md:h-96"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-4">
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Badge className="mb-2">{project.status}</Badge>
                  </motion.div>
                </div>
                <div className="text-white text-sm font-medium">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    {currentIndex + 1} / {projects.length}
                  </motion.div>
                </div>
              </div>
            </div>

            <CardContent className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${currentIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2">{project.title}</h3>
                  <p className="text-primary font-medium mb-4">{project.subtitle}</p>
                  <p className="text-muted-foreground mb-6 line-clamp-2">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <motion.div
                        key={tech}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Badge variant="secondary">{tech}</Badge>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button asChild className="flex-1 rounded-lg">
                      <Link href={`/projects/${project.slug}`}>View Project</Link>
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="icon"
              onClick={() => paginate(-1)}
              className="rounded-full w-12 h-12"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </motion.div>

          <div className="flex gap-2">
            {projects.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1)
                  setCurrentIndex(i)
                }}
                className={`h-2 rounded-full transition-all ${
                  i === currentIndex ? "bg-primary w-8" : "bg-muted-foreground/30 w-2"
                }`}
                whileHover={{ scale: 1.2 }}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="icon"
              onClick={() => paginate(1)}
              className="rounded-full w-12 h-12"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
