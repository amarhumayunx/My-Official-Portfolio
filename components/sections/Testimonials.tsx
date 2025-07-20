"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { FluidTransition } from "@/components/ui/FluidTransition"
import { ParallaxSection } from "@/components/ui/ParallaxSection"

const testimonials = [
  {
    quote:
      "Humayun is an exceptional Flutter developer. His ability to translate complex designs into pixel-perfect, high-performance mobile applications is truly impressive. He's a great communicator and a valuable asset to any team.",
    name: "Hayan Haroon",
    title: "CEO, HAACHI Technologies Pvt Ltd",
  },
  {
    quote:
      "Working with Humayun was a fantastic experience. He delivered our mobile app ahead of schedule, with outstanding quality and attention to detail. His problem-solving skills and dedication are top-notch.",
    name: "Muhammad Sabir",
    title: "Project Manager & Developer, HAACHI Technologies Pvt Ltd",
  },
  {
    quote:
      "Humayun's expertise in Flutter and his understanding of user experience made a significant impact on our project. He's proactive, innovative, and consistently goes the extra mile to ensure client satisfaction.",
    name: "Mubashra Jabeen",
    title: "HR Executive, HAACHI Technologies Pvt Ltd",
  },
  {
    quote:
      "I highly recommend Humayun for any mobile development needs. His dedication to clean code and efficient solutions is remarkable. He transformed our ideas into a beautiful and functional app.",
    name: "Dr. Asif Iqbal",
    title: "Professor of Computer Science",
  },
  {
    quote:
      "Humayun's problem-solving approach is truly commendable. He tackled complex challenges in our project with ease and delivered a robust solution that exceeded our expectations. A pleasure to work with!",
    name: "Nida Fatima",
    title: "Senior Software Engineer",
  },
  {
    quote:
      "His attention to detail in UI/UX implementation is outstanding. Humayun has a keen eye for design and ensures the user experience is always top-notch. Very impressed with his work ethic.",
    name: "Kamran Khan",
    title: "Product Designer",
  },
]

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
            <ParallaxSection key={index} offset={15}>
              <FluidTransition delay={index * 0.1} duration={0.8}>
                <motion.div
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                >
                  <Card className="h-full flex flex-col justify-between p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                    <CardContent className="p-0">
                      <Quote className="w-8 h-8 text-primary mb-4 opacity-70" />
                      <p className="text-muted-foreground text-base italic leading-relaxed mb-6">
                        "{testimonial.quote}"
                      </p>
                      <div>
                        <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                        <p className="text-sm text-primary">{testimonial.title}</p>
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
