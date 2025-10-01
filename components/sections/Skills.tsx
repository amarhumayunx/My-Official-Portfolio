"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Code2, Smartphone, Database, Cloud, Palette, Brain, Wrench, ChevronDown, ChevronUp } from "lucide-react"

interface Skill {
  name: string
  level: number
  icon?: string
}

interface SkillCategory {
  title: string
  icon: React.ReactNode
  skills: Skill[]
  color: string
}

const skillCategories: SkillCategory[] = [
  {
    title: "Mobile Development",
    icon: <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" />,
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "Flutter", level: 95 },
      { name: "Dart", level: 95 },
      { name: "Android Studio", level: 88 },
      { name: "Kotlin", level: 82 },
      { name: "State Management", level: 93 },
      { name: "Cross-platform Development", level: 92 },
      { name: "Performance Optimization", level: 85 },
    ],
  },
  {
    title: "Backend & APIs",
    icon: <Code2 className="w-5 h-5 sm:w-6 sm:h-6" />,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "REST APIs", level: 90 },
      { name: "GraphQL", level: 78 },
      { name: "WebSocket APIs", level: 75 },
      { name: "API Design & Integration", level: 88 },
      { name: "API Security", level: 82 },
      { name: "Authentication Systems", level: 85 },
    ],
  },
  {
    title: "Databases & Storage",
    icon: <Database className="w-5 h-5 sm:w-6 sm:h-6" />,
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Firebase (NoSQL)", level: 93 },
      { name: "Cloud Firestore", level: 92 },
      { name: "MongoDB", level: 80 },
      { name: "PostgreSQL", level: 75 },
      { name: "MySQL", level: 78 },
      { name: "SQLite", level: 90 },
      { name: "Cloud Storage", level: 88 },
      { name: "Database Architecture", level: 83 },
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: <Cloud className="w-5 h-5 sm:w-6 sm:h-6" />,
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "Google Cloud Platform", level: 85 },
      { name: "Firebase Services", level: 93 },
      { name: "AWS", level: 72 },
      { name: "Docker", level: 70 },
      { name: "CI/CD Pipelines", level: 75 },
      { name: "Cloud Functions", level: 85 },
    ],
  },
  {
    title: "AI & Machine Learning",
    icon: <Brain className="w-5 h-5 sm:w-6 sm:h-6" />,
    color: "from-violet-500 to-purple-500",
    skills: [
      { name: "TensorFlow", level: 80 },
      { name: "TensorFlow Lite", level: 85 },
      { name: "OCR Integration", level: 85 },
      { name: "ML Model Integration", level: 78 },
      { name: "PyTorch", level: 72 },
      { name: "Python", level: 82 },
      { name: "Data Analysis", level: 75 },
    ],
  },
  {
    title: "Design & UI/UX",
    icon: <Palette className="w-5 h-5 sm:w-6 sm:h-6" />,
    color: "from-pink-500 to-rose-500",
    skills: [
      { name: "UI/UX Design", level: 90 },
      { name: "Material Design", level: 92 },
      { name: "Responsive Design", level: 93 },
      { name: "Figma", level: 85 },
      { name: "Adobe XD", level: 80 },
      { name: "Animation & Transitions", level: 88 },
    ],
  },
  {
    title: "Tools & Platforms",
    icon: <Wrench className="w-5 h-5 sm:w-6 sm:h-6" />,
    color: "from-cyan-500 to-blue-500",
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "VS Code", level: 93 },
      { name: "Postman", level: 88 },
      { name: "Linux", level: 80 },
      { name: "Agile/Scrum", level: 82 },
      { name: "Jira", level: 78 },
      { name: "Code Review", level: 85 },
    ],
  },
]

// Additional language skills
const languages = [
  { name: "Urdu", level: "Native", flag: "🇵🇰" },
  { name: "English", level: "Professional", flag: "🇬🇧" },
]

export default function Skills() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(skillCategories.map((cat) => cat.title))

  const toggleCategory = (title: string) => {
    setExpandedCategories((prev) => (prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]))
  }

  return (
    <section id="skills" className="section-padding bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Technical <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
            A comprehensive overview of my technical skills and proficiency levels across various domains
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-3 sm:pb-4">
                  <button
                    onClick={() => toggleCategory(category.title)}
                    className="w-full flex items-center justify-between group cursor-pointer"
                    aria-expanded={expandedCategories.includes(category.title)}
                    aria-controls={`skills-${category.title}`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <motion.div
                        className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-br ${category.color}`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        {category.icon}
                      </motion.div>
                      <CardTitle className="text-lg sm:text-xl group-hover:text-primary transition-colors">
                        {category.title}
                      </CardTitle>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedCategories.includes(category.title) ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {expandedCategories.includes(category.title) ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </motion.div>
                  </button>
                </CardHeader>

                <AnimatePresence>
                  {expandedCategories.includes(category.title) && (
                    <motion.div
                      id={`skills-${category.title}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent className="space-y-2.5 sm:space-y-3 pt-0 px-4 sm:px-6 pb-4 sm:pb-6">
                        {category.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: skillIndex * 0.05 }}
                            viewport={{ once: true }}
                            className="space-y-1.5 sm:space-y-2"
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-xs sm:text-sm font-medium truncate leading-tight flex-1 mr-2">
                                {skill.name}
                              </span>
                              <span className="text-xs sm:text-sm font-semibold text-primary whitespace-nowrap flex-shrink-0">
                                {skill.level}%
                              </span>
                            </div>
                            <Progress value={skill.level} className="h-1.5 sm:h-2" />
                          </motion.div>
                        ))}
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-12"
        >
          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl flex items-center gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl">🗣️</span>
                Languages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {languages.map((lang) => (
                  <motion.div key={lang.name} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                    <Badge variant="secondary" className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium">
                      <span className="mr-1.5 sm:mr-2">{lang.flag}</span>
                      {lang.name} - {lang.level}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
