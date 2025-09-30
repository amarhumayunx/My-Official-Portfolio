"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { GraduationCap, Briefcase, Award, Calendar, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { FluidTransition } from "@/components/ui/FluidTransition"
import { useRef } from "react"
import { ParallaxSection } from "@/components/ui/ParallaxSection"

const experiences = [
  {
    title: "Full Stack Flutter Developer",
    company: "Haachi Technologies Pvt. Ltd.",
    period: "Jan 2025 - Jul 2025",
    description:
      "Developed scalable, cross-platform mobile applications with Flutter & Dart, optimized performance, and integrated RESTful APIs. Collaborated closely with designers and product managers to deliver polished, user-friendly apps.",
    icon: Briefcase,
  },
  {
    title: "Full Stack Flutter Developer",
    company: "Zee Palm",
    period: "Aug 2025 - Sep 2025",
    description:
      "Engineered feature-rich Flutter applications with a focus on clean architecture and maintainable code. Implemented state management solutions and worked in agile sprints to meet strict deadlines.",
    icon: Briefcase,
  },
  {
    title: "Full Stack Flutter Developer",
    company: "Fiverr.co",
    period: "Sep 2025 - Present",
    description:
      "Providing freelance Flutter development services, creating custom mobile apps tailored to client needs. Managing end-to-end delivery including planning, coding, testing, and deployment.",
    icon: Briefcase,
  },
]

const education = [
  {
    degree: "B.Sc (Computer Science)",
    institution: "University of Central Punjab, Lahore",
    period: "Oct 2019 - Feb 2025",
    grade: "FYP A Grade",
    icon: GraduationCap,
  },
  {
    degree: "F.Sc (Pre-Engineering)",
    institution: "Punjab College, Multan",
    period: "May 2017 - June 2019",
    icon: GraduationCap,
  },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress: profileScrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const profileY = useTransform(profileScrollYProgress, [0, 1], ["-20%", "20%"])
  const profileScale = useTransform(profileScrollYProgress, [0, 1], [0.9, 1.1])

  const { scrollYProgress: proseScrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const proseY = useTransform(proseScrollYProgress, [0, 1], ["-10%", "10%"])

  const experienceTransform = useTransform(profileScrollYProgress, [0, 1], ["-5%", "5%"])
  const educationTransform = useTransform(profileScrollYProgress, [0, 1], ["-5%", "5%"])

  return (
    <section id="about" className="section-padding bg-muted/30">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4">
        <FluidTransition className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
            A passionate software developer with a focus on creating innovative mobile solutions that make a difference
            in people's lives.
          </p>
        </FluidTransition>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          <ParallaxSection offset={30}>
            <FluidTransition delay={0.2} className="space-y-6">
              {/* Profile Image Section */}
              <motion.div
                className="flex justify-center mb-8"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                animate={{ y: [0, -5, 0] }}
                transition={{
                  delay: 0.3,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  y: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                }}
                viewport={{ once: true }}
                style={{ y: profileY, scale: profileScale }}
              >
                <div className="relative">
                  <motion.div
                    className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1"
                    whileHover={{
                      scale: 1.05,
                      rotate: 5,
                      transition: { duration: 0.3 },
                    }}
                    aria-hidden="true"
                  >
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                      <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
                        <User className="w-16 h-16 sm:w-20 sm:h-20 text-primary" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating badges around the profile */}
                  <motion.div
                    className="absolute -top-2 -right-2 bg-primary text-primary-foreground px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    aria-hidden="true"
                  >
                    Flutter Dev
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-2 -left-2 bg-secondary text-secondary-foreground px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                    animate={{
                      y: [0, 5, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                    aria-hidden="true"
                  >
                    Mobile Expert
                  </motion.div>
                </div>
              </motion.div>

              <div className="prose prose-sm sm:prose-lg dark:prose-invert max-w-none px-4" style={{ y: proseY }}>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  I'm a passionate freelance Full Stack Flutter Developer, working exclusively on Fiverr where I help
                  clients worldwide build robust, high-performance, cross-platform mobile applications. From
                  brainstorming ideas with clients to designing intuitive UIs and integrating secure, scalable backends,
                  I take ownership of the entire development process. My approach focuses on understanding client needs,
                  delivering on time, and maintaining long-term relationships by ensuring code quality and performance
                  optimization.
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  My technical expertise includes Flutter, Dart, Kotlin, and Firebase, enabling me to handle both
                  front-end and back-end aspects of app development. Whether it's creating responsive user interfaces,
                  integrating real-time databases, or deploying apps to production, I aim to deliver seamless, bug-free
                  experiences.
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  I hold a Bachelor's degree in Computer Science from the University of Central Punjab, where I earned
                  an A grade for my Final Year Project, BalanceBite — a smart health and nutrition app powered by AI. In
                  addition, I have developed projects like SafeCrypt (an AES-256 encrypted password manager), Surah
                  Yaseen App, and Toolkit App, all of which reflect my ability to merge creativity with technical
                  excellence.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start px-4">
                <motion.div
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/10 rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" aria-hidden="true" />
                  <span className="text-xs sm:text-sm font-medium">1 Year Experience</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/10 rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" aria-hidden="true" />
                  <span className="text-xs sm:text-sm font-medium">FYP A Grade</span>
                </motion.div>
              </div>
            </FluidTransition>
          </ParallaxSection>

          <ParallaxSection offset={20}>
            <FluidTransition delay={0.4} className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 px-4 lg:px-0">
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-primary" aria-hidden="true" />
                  Experience
                </h3>
                <div className="space-y-4 px-4 lg:px-0">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      style={{ y: experienceTransform }}
                    >
                      <Card className="border-l-4 border-l-primary hover:shadow-md transition-shadow duration-300">
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
                            <h4 className="font-semibold text-base sm:text-lg">{exp.title}</h4>
                            <span className="text-xs sm:text-sm text-muted-foreground bg-muted px-2 py-1 rounded whitespace-nowrap self-start">
                              {exp.period}
                            </span>
                          </div>
                          <p className="text-primary font-medium mb-2 sm:mb-3 text-sm sm:text-base">{exp.company}</p>
                          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{exp.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 px-4 lg:px-0">
                  <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" aria-hidden="true" />
                  Education
                </h3>
                <div className="space-y-4 px-4 lg:px-0">
                  {education.map((edu, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      style={{ y: educationTransform }}
                    >
                      <Card className="border-l-4 border-l-secondary hover:shadow-md transition-shadow duration-300">
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
                            <h4 className="font-semibold text-base sm:text-lg">{edu.degree}</h4>
                            <span className="text-xs sm:text-sm text-muted-foreground bg-muted px-2 py-1 rounded whitespace-nowrap self-start">
                              {edu.period}
                            </span>
                          </div>
                          <p className="text-primary font-medium mb-2 text-sm sm:text-base">{edu.institution}</p>
                          {edu.grade && (
                            <div className="flex items-center gap-2">
                              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500" aria-hidden="true" />
                              <span className="text-xs sm:text-sm font-medium text-yellow-600 dark:text-yellow-400">
                                {edu.grade}
                              </span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FluidTransition>
          </ParallaxSection>
        </div>
      </div>
    </section>
  )
}
