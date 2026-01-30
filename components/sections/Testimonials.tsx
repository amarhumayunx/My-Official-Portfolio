"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Quote, ChevronLeft, ChevronRight, Star, Pause, Play } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { FluidTransition } from "@/components/ui/FluidTransition"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useCallback } from "react"

const testimonials = [
  {
    quote:
      "Humayun is an exceptional Flutter developer. His ability to translate complex designs into pixel-perfect, high-performance mobile applications is truly impressive. He's a great communicator and a valuable asset to any team.",
    name: "Hayan Haroon",
    title: "CEO, HAACHI Technologies Pvt Ltd",
    rating: 5,
    company: "HAACHI Technologies",
    avatar: "HH",
  },
  {
    quote:
      "Working with Humayun was a fantastic experience. He delivered our mobile app ahead of schedule, with outstanding quality and attention to detail. His problem-solving skills and dedication are top-notch.",
    name: "Muhammad Sabir",
    title: "Project Manager & Developer, HAACHI Technologies Pvt Ltd",
    rating: 5,
    company: "HAACHI Technologies",
    avatar: "MS",
  },
  {
    quote:
      "Humayun's expertise in Flutter and his understanding of user experience made a significant impact on our project. He's proactive, innovative, and consistently goes the extra mile to ensure client satisfaction.",
    name: "Mubashra Jabeen",
    title: "HR Executive, HAACHI Technologies Pvt Ltd",
    rating: 5,
    company: "HAACHI Technologies",
    avatar: "MJ",
  },
  {
    quote:
      "I highly recommend Humayun for any mobile development needs. His dedication to clean code and efficient solutions is remarkable. He transformed our ideas into a beautiful and functional app.",
    name: "Hafiz Muhammad Bilal Shahid",
    title: "Senior Lecturer of Computer Science (UCP)",
    rating: 5,
    company: "University of Central Punjab",
    avatar: "HM",
  },
  {
    quote:
      "Humayun's problem-solving approach is truly commendable. He tackled complex challenges in our project with ease and delivered a robust solution that exceeded our expectations. A pleasure to work with!",
    name: "Nida Fatima",
    title: "Senior Software Engineer",
    rating: 5,
    company: "Tech Industry",
    avatar: "NF",
  },
  {
    quote:
      "His attention to detail in UI/UX implementation is outstanding. Humayun has a keen eye for design and ensures the user experience is always top-notch. Very impressed with his work ethic.",
    name: "Kamran Khan",
    title: "Product Designer",
    rating: 5,
    company: "Design Studio",
    avatar: "KK",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [direction, setDirection] = useState(0)

  // Auto-rotate carousel every 5 seconds
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      setDirection(1)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused])

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }, [currentIndex])

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  return (
    <section id="testimonials" className="section-padding section-bg">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Client <span className="gradient-text">Testimonials</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Hear what my clients have to say about working with me and the impact of my development work.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Carousel Controls */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsPaused(!isPaused)}
              className="rounded-full"
              aria-label={isPaused ? "Resume carousel" : "Pause carousel"}
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Carousel Slides */}
          <div className="relative h-[400px] overflow-hidden rounded-lg">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0"
              >
                <Card className="h-full flex flex-col justify-between p-8 shadow-xl border-0">
                  <CardContent className="p-0 flex flex-col h-full">
                    <Quote className="w-10 h-10 text-primary mb-6 opacity-70" />
                    <p className="text-foreground text-lg italic leading-relaxed mb-8 flex-grow">
                      "{testimonials[currentIndex].quote}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-lg">
                        {testimonials[currentIndex].avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{testimonials[currentIndex].name}</h3>
                          <div className="flex gap-0.5">
                            {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-primary">{testimonials[currentIndex].title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{testimonials[currentIndex].company}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === currentIndex ? "true" : "false"}
              />
            ))}
          </div>
        </div>

        {/* Grid View (Desktop) - Show all testimonials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              viewport={{ once: true }}
              className="hidden md:block"
            >
              <Card
                className={`h-full p-6 shadow-lg hover:shadow-xl transition-all duration-200 border-0 cursor-pointer ${
                  index === currentIndex ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => goToSlide(index)}
              >
                <CardContent className="p-0">
                  <Quote className="w-6 h-6 text-primary mb-3 opacity-70" />
                  <p className="text-muted-foreground text-sm italic leading-relaxed mb-4 line-clamp-4">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-semibold text-xs">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-primary">{testimonial.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
