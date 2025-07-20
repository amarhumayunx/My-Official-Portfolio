"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { GraduationCap, Briefcase, Award, Calendar, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { FluidTransition } from "@/components/ui/FluidTransition"
import { useRef } from "react"
import { ParallaxSection } from "@/components/ui/ParallaxSection"

const experiences = [
  {
    title: "Flutter Developer",
    company: "Haachi Technologies Pvt. Ltd.",
    period: "Jan 2025 - Jul 2025",
    description:
      "Designing and building high-performance, cross-platform mobile apps using Flutter and Dart. Collaborating with UI/UX designers and working in agile environments.",
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
      <div ref={sectionRef} className="max-w-7xl mx-auto">
        <FluidTransition className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A passionate software developer with a focus on creating innovative mobile solutions that make a difference
            in people's lives.
          </p>
        </FluidTransition>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <ParallaxSection offset={30}>
            <FluidTransition delay={0.2} className="space-y-6">
              {/* Profile Image Section */}
              <motion.div
                className="flex justify-center lg:justify-start mb-8"
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
                    className="w-48 h-48 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1"
                    whileHover={{
                      scale: 1.05,
                      rotate: 5,
                      transition: { duration: 0.3 },
                    }}
                    aria-hidden="true" // Decorative element
                  >
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                      <div className="w-44 h-44 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
                        <User className="w-20 h-20 text-primary" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating badges around the profile */}
                  <motion.div
                    className="absolute -top-2 -right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium"
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    aria-hidden="true" // Decorative element
                  >
                    Flutter Dev
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-2 -left-2 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium"
                    animate={{
                      y: [0, 5, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                    aria-hidden="true" // Decorative element
                  >
                    Mobile Expert
                  </motion.div>
                </div>
              </motion.div>

              <div className="prose prose-lg dark:prose-invert max-w-none" style={{ y: proseY }}>
                <p className="text-muted-foreground leading-relaxed">
                  I'm a dedicated Flutter developer currently working at Haachi Technologies, where I design and build
                  high-performance, cross-platform mobile applications. My journey in software development has been
                  driven by a passion for creating intuitive user experiences and robust backend solutions.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  With expertise in Flutter, Dart, Kotlin, and various modern frameworks, I contribute to all stages of
                  the mobile app lifecycle—from conceptualization and prototyping to deployment and maintenance. I
                  thrive in agile environments and enjoy collaborating with UI/UX designers to bring ideas to life.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I have completed my Bachelor's in Computer Science, maintaining academic excellence throughout my
                  studies while gaining hands-on industry experience. My final year project, BalanceBite, showcased my
                  ability to integrate AI and machine learning into practical applications.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <motion.div
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Calendar className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span className="text-sm font-medium">1 Year Experience</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Award className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span className="text-sm font-medium">FYP A Grade</span>
                </motion.div>
              </div>
            </FluidTransition>
          </ParallaxSection>

          <ParallaxSection offset={20}>
            <FluidTransition delay={0.4} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-primary" aria-hidden="true" />
                  Experience
                </h3>
                <div className="space-y-4">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      style={{ y: experienceTransform }}
                    >
                      <Card className="border-l-4 border-l-primary hover:shadow-md transition-shadow duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-lg">{exp.title}</h4>
                            <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                              {exp.period}
                            </span>
                          </div>
                          <p className="text-primary font-medium mb-3">{exp.company}</p>
                          <p className="text-muted-foreground text-sm leading-relaxed">{exp.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-primary" aria-hidden="true" />
                  Education
                </h3>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      style={{ y: educationTransform }}
                    >
                      <Card className="border-l-4 border-l-secondary hover:shadow-md transition-shadow duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-lg">{edu.degree}</h4>
                            <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                              {edu.period}
                            </span>
                          </div>
                          <p className="text-primary font-medium mb-2">{edu.institution}</p>
                          {edu.grade && (
                            <div className="flex items-center gap-2">
                              <Award className="w-4 h-4 text-yellow-500" aria-hidden="true" />
                              <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
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
