"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { GraduationCap, Briefcase, Award, Calendar, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { FluidTransition } from "@/components/ui/FluidTransition"
import { useRef } from "react"
import { ParallaxSection } from "@/components/ui/ParallaxSection"

const experiences = [
  {
    title: "Flutter Developer Intern",
    company: "Haachi Technologies Pvt. Ltd.",
    period: "Jan 2025 - Mar 2025",
    description:
      "Completed a Flutter Developer internship at Haachi Technologies Pvt. Ltd., contributing to the development of cross-platform mobile applications using Flutter and Dart. Designed and implemented responsive UI components to ensure smooth user experiences, assisted in developing and enhancing app features, and performed debugging, testing, and performance optimization across multiple devices. Integrated Firebase services for authentication and data storage, and collaborated with UI/UX designers and backend developers in an agile environment. Actively participated in stand-up meetings, sprint planning, and code reviews, gaining hands-on experience with Flutter, Firebase, UI/UX practices, and agile workflows.",
    icon: Briefcase,
  },
  {
    title: "Full Stack Flutter Developer",
    company: "Haachi Technologies Pvt. Ltd.",
    period: "Jan 2025 - Jul 2025",
    description:
      "Worked as a Full Stack Flutter Developer at Haachi Technologies Pvt. Ltd., responsible for designing and developing high-quality cross-platform mobile applications using Flutter and Dart. Created responsive and visually appealing user interfaces, wrote clean and efficient Dart code, and developed new features for ongoing applications. Handled debugging, testing, and performance optimization across multiple devices, and integrated Firebase services for authentication and data management. Collaborated closely with UI/UX designers and backend developers within an agile framework, actively participating in daily stand-ups, sprint planning, and code reviews. This role provided end-to-end experience across the mobile app development lifecycle and strengthened expertise in Flutter, Firebase, UI/UX principles, and agile methodologies.",
    icon: Briefcase,
  },
  {
    title: "Full Stack Flutter Developer",
    company: "Zee Palm Pvt. Ltd.",
    period: "Aug 2025 - Sep 2025",
    description:
      "Worked as a Flutter Developer, designing and developing high-performance, cross-platform mobile applications using Flutter and Dart. Focused on building responsive, user-friendly interfaces and robust application architectures to deliver seamless experiences across both Android and iOS platforms. Collaborated closely with cross-functional teams, including UI/UX designers and backend developers, to implement new features, optimize application performance, and maintain high code quality through clean, scalable, and maintainable code. Actively contributed to improving existing applications through iterative updates, bug fixes, and the integration of modern development best practices.",
    icon: Briefcase,
  },
  {
    title: "Freelance Full Stack Flutter Developer",
    company: "Fiverr",
    period: "Sep 2025 - Present",
    description:
      "Working as a freelance Flutter developer, delivering custom cross-platform mobile applications using Flutter and Dart. Specializing in building scalable, high-performance apps, optimizing UI/UX and application performance, and collaborating closely with clients to transform ideas into functional, production-ready solutions. Responsible for requirement analysis, implementation, testing, and ongoing support to ensure high-quality outcomes.",
    icon: Briefcase,
  },
]

const education = [
  {
    degree: "B.Sc (Computer Science)",
    institution: "University of Central Punjab, Lahore",
    period: "Oct 2019 - Feb 2025",
    grade: "FYP A Grade",
    description:
      "Acquired comprehensive knowledge in Programming Fundamentals, Object-Oriented Programming, Data Structures, and Algorithms. Gained hands-on experience in Mobile Application Development, Artificial Intelligence, and Machine Learning, with a strong focus on creating innovative and impactful software solutions. Developed key projects like BalanceBite and SafeCrypt Password Manager, showcasing expertise in Kotlin, Flutter, and Firebase.",
    icon: GraduationCap,
  },
  {
    degree: "F.Sc (Pre-Engineering)",
    institution: "Punjab College, Multan",
    period: "May 2017 - June 2019",
    description:
      "Built a solid foundation in Mathematics, Physics, and Chemistry, with a focus on analytical problem-solving and logical thinking. This period nurtured my interest in technology and inspired my pursuit of a career in Computer Science.",
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

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <FluidTransition className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
            Full-Stack Flutter and Mobile App Developer | FlutterFlow | GetX | RESTful APIs | Android and iOS Expert |
            Software Developer | Software Engineer
          </p>
        </FluidTransition>

        {/* Profile and Description */}
        <div className="mb-12 sm:mb-16">
          <ParallaxSection offset={30}>
            <FluidTransition delay={0.2} className="max-w-4xl mx-auto">
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
                  My name is Muhammad Humayun Amar, a dedicated Flutter & Mobile App Developer with hands-on experience
                  in designing and developing multiple real-world mobile applications. I specialize in building
                  high-performance, cross-platform apps using Flutter, Dart, Kotlin, and Firebase, with a strong focus
                  on clean UI/UX, app security, and scalable architecture.
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  I have successfully developed 4–5 complete mobile applications, covering areas such as health &
                  nutrition, security, Islamic content, and utility tools. These projects demonstrate my ability to
                  handle the full app development lifecycle, from idea validation and UI design to backend integration,
                  testing, and deployment.
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  I work as a freelance Full Stack Flutter Developer, collaborating with clients worldwide to deliver
                  reliable and user-focused mobile solutions. I take full ownership of projects, ensuring timely
                  delivery, optimized performance, and maintainable, clean code.
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  I hold a Bachelor's degree in Computer Science from the University of Central Punjab, where I earned
                  an A grade in my Final Year Project, BalanceBite — an AI-powered health and nutrition mobile
                  application. My project portfolio also includes applications such as SafeCrypt (an AES-256 encrypted
                  password manager), the Surah Yaseen App, and other utility-based mobile applications, highlighting my
                  versatility and problem-solving skills.
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  I am continuously expanding my expertise in modern mobile technologies and enjoy working on innovative
                  ideas that solve real problems and create meaningful user experiences.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mt-6 px-4">
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
        </div>

        {/* Experience and Education in separate sections */}
        <div className="space-y-12 sm:space-y-16">
          {/* Experience Section */}
          <ParallaxSection offset={20}>
            <FluidTransition delay={0.4}>
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 flex items-center gap-3 px-4 lg:px-0">
                  <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 text-primary" aria-hidden="true" />
                  Professional Experience
                </h3>
                <div className="space-y-4 sm:space-y-5 px-4 lg:px-0">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 8, transition: { duration: 0.2 } }}
                    >
                      <Card className="border-l-4 border-l-primary hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-5 sm:p-6">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
                            <h4 className="font-semibold text-base sm:text-lg">{exp.title}</h4>
                            <span className="text-xs sm:text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full whitespace-nowrap self-start">
                              {exp.period}
                            </span>
                          </div>
                          <p className="text-primary font-medium mb-3 text-sm sm:text-base">{exp.company}</p>
                          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{exp.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FluidTransition>
          </ParallaxSection>

          {/* Education Section */}
          <ParallaxSection offset={20}>
            <FluidTransition delay={0.5}>
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 flex items-center gap-3 px-4 lg:px-0">
                  <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-primary" aria-hidden="true" />
                  Education
                </h3>
                <div className="space-y-4 sm:space-y-5 px-4 lg:px-0">
                  {education.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 8, transition: { duration: 0.2 } }}
                    >
                      <Card className="border-l-4 border-l-secondary hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-5 sm:p-6">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
                            <h4 className="font-semibold text-base sm:text-lg">{edu.degree}</h4>
                            <span className="text-xs sm:text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full whitespace-nowrap self-start">
                              {edu.period}
                            </span>
                          </div>
                          <p className="text-primary font-medium mb-3 text-sm sm:text-base">{edu.institution}</p>
                          {edu.grade && (
                            <div className="flex items-center gap-2 mb-3">
                              <Award className="w-4 h-4 text-yellow-500" aria-hidden="true" />
                              <span className="text-xs sm:text-sm font-medium text-yellow-600 dark:text-yellow-400">
                                {edu.grade}
                              </span>
                            </div>
                          )}
                          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{edu.description}</p>
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
