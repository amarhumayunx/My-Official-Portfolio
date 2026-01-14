"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Code2, Smartphone, Database, Palette, Brain, Wrench, ChevronDown, ChevronUp } from "lucide-react"

interface Skill {
  name: string
  level: number
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
      { name: "Linux", level: 80 },
      { name: "Agile/Scrum", level: 82 },
      { name: "Code Review", level: 85 },
    ],
  },
]

const languages = [
  { name: "Urdu", level: "Native", flag: "🇵🇰", percentage: 100 },
  { name: "English", level: "Professional", flag: "🇬🇧", percentage: 90 },
]

export default function Skills() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(skillCategories.map((cat) => cat.title))

  const toggleCategory = (title: string) => {
    setExpandedCategories((prev) => (prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]))
  }

  return (
    <section id="skills" className="section-padding section-bg">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Technical <span className="gradient-text">Expertise</span>
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            A comprehensive overview of my technical skills and proficiency levels across various domains
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="h-full"
            >
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full"
              >
                <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
                  <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-5">
                    <button
                      onClick={() => toggleCategory(category.title)}
                      className="w-full flex items-center justify-between group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-1 -m-1 transition-all"
                      aria-expanded={expandedCategories.includes(category.title)}
                      aria-controls={`skills-${category.title}`}
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <motion.div
                          className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-br ${category.color} shadow-md`}
                          whileHover={{ rotate: 12, scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                          {category.icon}
                        </motion.div>
                        <CardTitle className="text-base sm:text-lg lg:text-xl group-hover:text-primary transition-colors duration-300">
                          {category.title}
                        </CardTitle>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedCategories.includes(category.title) ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        {expandedCategories.includes(category.title) ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        )}
                      </motion.div>
                    </button>
                  </CardHeader>

                  <AnimatePresence initial={false}>
                    {expandedCategories.includes(category.title) && (
                      <motion.div
                        id={`skills-${category.title}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <CardContent className="space-y-2.5 sm:space-y-3 pt-0 px-4 sm:px-5 pb-4 sm:pb-5">
                          {category.skills.map((skill, skillIndex) => (
                            <motion.div
                              key={skill.name}
                              initial={{ opacity: 0, x: -15 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: skillIndex * 0.04,
                                duration: 0.4,
                                ease: "easeOut",
                              }}
                              className="space-y-1.5 sm:space-y-2"
                            >
                              <div className="flex justify-between items-center gap-2">
                                <span className="text-xs sm:text-sm font-medium truncate leading-tight flex-1">
                                  {skill.name}
                                </span>
                                <motion.span
                                  className="text-xs sm:text-sm font-semibold text-primary whitespace-nowrap flex-shrink-0 tabular-nums"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: skillIndex * 0.04 + 0.2, type: "spring", stiffness: 200 }}
                                >
                                  {skill.level}%
                                </motion.span>
                              </div>
                              <motion.div
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={{ scaleX: 1, opacity: 1 }}
                                transition={{
                                  delay: skillIndex * 0.04 + 0.1,
                                  duration: 0.8,
                                  ease: [0.25, 0.46, 0.45, 0.94],
                                }}
                                style={{ transformOrigin: "left" }}
                                className="relative"
                              >
                                <Progress 
                                  value={skill.level} 
                                  className="h-1.5 sm:h-2 bg-muted/50 shadow-inner"
                                />
                              </motion.div>
                            </motion.div>
                          ))}
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-10 sm:mt-12 lg:mt-16"
        >
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-lg sm:text-xl lg:text-2xl flex items-center gap-2 sm:gap-3">
                <motion.span
                  className="text-2xl sm:text-3xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                >
                  🗣️
                </motion.span>
                Languages
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {languages.map((lang, index) => (
                  <motion.div
                    key={lang.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.15, duration: 0.4 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.03, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-muted/50 rounded-xl p-4 sm:p-5 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="text-2xl sm:text-3xl">{lang.flag}</span>
                        <div>
                          <h4 className="font-semibold text-sm sm:text-base">{lang.name}</h4>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {lang.level}
                          </Badge>
                        </div>
                      </div>
                      <motion.span
                        className="text-lg sm:text-xl font-bold text-primary tabular-nums"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: index * 0.15 + 0.2, type: "spring", stiffness: 200 }}
                        viewport={{ once: true }}
                      >
                        {lang.percentage}%
                      </motion.span>
                    </div>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: index * 0.15 + 0.3, duration: 0.8, ease: "easeOut" }}
                      viewport={{ once: true }}
                      style={{ transformOrigin: "left" }}
                    >
                      <Progress value={lang.percentage} className="h-2.5 sm:h-3" />
                    </motion.div>
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
