"use client"

import { motion } from "framer-motion"
import { Quote, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { FluidTransition } from "@/components/ui/FluidTransition"
import { ParallaxSection } from "@/components/ui/ParallaxSection"
import { testimonials, getFeaturedTestimonials } from "@/data/testimonials"

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <ParallaxSection key={testimonial.id} offset={15}>
              <FluidTransition delay={index * 0.1} duration={0.8}>
                <motion.div
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                >
                  <Card className="h-full flex flex-col justify-between p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                    <CardContent className="p-0">
                      <div className="flex items-start justify-between mb-4">
                        <Quote className="w-8 h-8 text-primary opacity-70" />
                        {testimonial.rating && (
                          <div className="flex items-center gap-1">
                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-muted-foreground text-base italic leading-relaxed mb-6">
                        "{testimonial.quote}"
                      </p>
                      <div>
                        <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                        <p className="text-sm text-primary">
                          {testimonial.title}
                          {testimonial.company && ` • ${testimonial.company}`}
                        </p>
                        {testimonial.date && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(testimonial.date).toLocaleDateString("en-US", {
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </FluidTransition>
            </ParallaxSection>
          ))}
        </div>
      </div>
    </section>
  )
}
