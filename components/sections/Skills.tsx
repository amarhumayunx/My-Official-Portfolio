"use client"

import { motion } from "framer-motion"
import { Code, Database, Smartphone, Brain, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { FluidTransition } from "@/components/ui/FluidTransition"
import { ParallaxSection } from "@/components/ui/ParallaxSection"

const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code,
    skills: [
      { name: "Dart", level: 95 },
      { name: "Kotlin", level: 90 },
      { name: "Python", level: 85 },
      { name: "C++", level: 80 },
      { name: "C#", level: 75 },
    ],
  },
  {
    title: "Mobile Development",
    icon: Smartphone,
    skills: [
      { name: "Flutter", level: 95 },
      { name: "Android Studio", level: 90 },
      { name: "Cross-platform Development", level: 90 },
      { name: "UI/UX Implementation", level: 85 },
      { name: "App Store Deployment", level: 80 },
    ],
  },
  {
    title: "Backend & Database",
    icon: Database,
    skills: [
      { name: "Firebase", level: 90 },
      { name: "REST APIs", level: 85 },
      { name: "Database Design", level: 80 },
      { name: "Authentication Systems", level: 85 },
      { name: "Cloud Integration", level: 75 },
    ],
  },
  {
    title: "AI & Machine Learning",
    icon: Brain,
    skills: [
      { name: "TensorFlow", level: 75 },
      { name: "PyTorch", level: 70 },
      { name: "Scikit-Learn", level: 80 },
      { name: "Pandas", level: 85 },
      { name: "OCR Integration", level: 80 },
    ],
  },
  {
    title: "Tools & Platforms",
    icon: Settings,
    skills: [
      { name: "Git/GitHub", level: 90 },
      { name: "Visual Studio Code", level: 95 },
      { name: "Google Cloud", level: 75 },
      { name: "Jupyter Notebook", level: 80 },
      { name: "Agile Development", level: 85 },
    ],
  },
]

const languages = [
  { name: "English", level: "Advanced", percentage: 90 },
  { name: "Urdu", level: "Superior", percentage: 100 },
]

export default function Skills() {
  return (
    <section id="skills" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency levels across various technologies and
            frameworks.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {skillCategories.map((category, categoryIndex) => (
            <ParallaxSection key={category.title} offset={20}>
              <FluidTransition delay={categoryIndex * 0.1} duration={0.8}>
                <motion.div
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                    <CardHeader className="text-center pb-4">
                      <motion.div
                        className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center"
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "hsl(var(--primary))",
                          transition: { duration: 0.3 },
                        }}
                      >
                        <category.icon className="w-6 h-6 text-primary" />
                      </motion.div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          className="space-y-2"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: categoryIndex * 0.1 + skillIndex * 0.05,
                            duration: 0.5,
                          }}
                          viewport={{ once: true }}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <span className="text-sm text-muted-foreground">{skill.level}%</span>
                          </div>
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{
                              duration: 1.2,
                              delay: categoryIndex * 0.1 + skillIndex * 0.05,
                              ease: "easeOut",
                            }}
                            viewport={{ once: true }}
                          >
                            <Progress value={skill.level} className="h-2" />
                          </motion.div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              </FluidTransition>
            </ParallaxSection>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                <span>🌐</span>
                Languages
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {languages.map((language, index) => (
                <div key={language.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{language.name}</span>
                    <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">{language.level}</span>
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                  >
                    <Progress value={language.percentage} className="h-3" />
                  </motion.div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
