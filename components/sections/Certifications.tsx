"use client"

import { motion } from "framer-motion"
import { Award, Calendar, ExternalLink, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FluidTransition } from "@/components/ui/FluidTransition"

const certifications = [
  {
    title: "AI Python for Beginners",
    issuer: "DeepLearning.AI",
    date: "Feb 2025",
    credentialId: "LP64U3U6NTHO",
    credentialUrl: "https://www.coursera.org/verify/LP64U3U6NTHO",
    skills: ["Python", "AI", "Machine Learning", "Deep Learning"],
    description: "Comprehensive introduction to Python programming for artificial intelligence and machine learning applications.",
  },
  {
    title: "Introduction to Google SEO",
    issuer: "University of California, Davis",
    date: "Feb 2025",
    credentialId: "BAALWLJ6TJ18",
    credentialUrl: "https://www.coursera.org/verify/BAALWLJ6TJ18",
    skills: ["SEO", "Digital Marketing", "Google Analytics", "Search Optimization"],
    description: "Professional certification covering search engine optimization strategies, keyword research, and website optimization techniques.",
  },
  {
    title: "Artificial Intelligence AI",
    issuer: "DeepLearning.AI",
    date: "Jan 2025",
    credentialId: "MNTTPCX2M8FW",
    credentialUrl: "https://www.coursera.org/verify/MNTTPCX2M8FW",
    skills: ["Artificial Intelligence", "Machine Learning", "Deep Learning", "Neural Networks"],
    description: "Advanced certification in artificial intelligence covering machine learning algorithms, neural networks, and AI applications.",
  },
  {
    title: "Introduction to Generative AI",
    issuer: "Google Cloud",
    date: "Jan 2025",
    credentialId: "STT9GFGRQN6R",
    credentialUrl: "https://www.coursera.org/verify/STT9GFGRQN6R",
    skills: ["Generative AI", "Google Cloud", "LLMs", "AI Models"],
    description: "Professional certification in generative AI technologies, large language models, and Google Cloud AI services.",
  },
  {
    title: "Getting started with Flutter Development",
    issuer: "Google Cloud",
    date: "Dec 2024",
    credentialId: "KEMU25BZPE4S",
    credentialUrl: "https://www.coursera.org/verify/KEMU25BZPE4S",
    skills: ["Flutter", "Dart", "Mobile Development", "Cross-platform"],
    description: "Official Google Cloud certification covering Flutter framework fundamentals and cross-platform mobile app development.",
  },
  {
    title: "Copyright Law",
    issuer: "University of Pennsylvania",
    date: "Jan 2025",
    credentialId: "R8THBORKSIH5",
    credentialUrl: "https://www.coursera.org/verify/R8THBORKSIH5",
    skills: ["Copyright Law", "Intellectual Property", "Legal", "Business Law"],
    description: "Professional certification in copyright law and intellectual property rights from Wharton School of Business.",
  },
  {
    title: "Trademark Law",
    issuer: "University of Pennsylvania",
    date: "Jan 2025",
    credentialId: "25LI072ACO0S",
    credentialUrl: "https://www.coursera.org/verify/25LI072ACO0S",
    skills: ["Trademark Law", "Intellectual Property", "Legal", "Business Law"],
    description: "Comprehensive certification covering trademark law, brand protection, and intellectual property management.",
  },
  {
    title: "Introduction to Intellectual Property",
    issuer: "University of Pennsylvania",
    date: "Jan 2025",
    credentialId: "BZYIAITBAJAF",
    credentialUrl: "https://www.coursera.org/verify/BZYIAITBAJAF",
    skills: ["Intellectual Property", "Legal", "Business Law", "IP Rights"],
    description: "Foundational course on intellectual property law, covering patents, trademarks, copyrights, and trade secrets.",
  },
  {
    title: "Flutter Development",
    issuer: "Programming Hub",
    date: "Oct 2024",
    credentialId: "",
    credentialUrl: "https://www.linkedin.com/in/amarhumayun/",
    skills: ["Flutter", "Dart", "Object-Oriented Programming", "Mobile Development"],
    description: "Comprehensive Flutter development certification covering framework fundamentals, widgets, state management, and app architecture.",
  },
  {
    title: "Dart Language",
    issuer: "Programming Hub",
    date: "Oct 2024",
    credentialId: "",
    credentialUrl: "https://www.linkedin.com/in/amarhumayun/",
    skills: ["Dart", "Programming", "Mobile Development"],
    description: "Professional certification in Dart programming language, the foundation for Flutter development.",
  },
  {
    title: "Machine Learning",
    issuer: "Programming Hub",
    date: "Oct 2024",
    credentialId: "",
    credentialUrl: "https://www.linkedin.com/in/amarhumayun/",
    skills: ["Machine Learning", "AI", "Data Science"],
    description: "Certification in machine learning fundamentals, algorithms, and practical applications.",
  },
  {
    title: "Android Development",
    issuer: "Programming Hub",
    date: "Feb 2024",
    credentialId: "",
    credentialUrl: "https://www.linkedin.com/in/amarhumayun/",
    skills: ["Android", "Mobile Development", "Object-Oriented Programming"],
    description: "Professional Android development certification covering app architecture, UI/UX design, and native Android development.",
  },
  {
    title: "Kotlin Development",
    issuer: "Programming Hub",
    date: "Feb 2024",
    credentialId: "",
    credentialUrl: "https://www.linkedin.com/in/amarhumayun/",
    skills: ["Kotlin", "Android", "Object-Oriented Programming"],
    description: "Comprehensive Kotlin programming certification for modern Android app development.",
  },
  {
    title: "Python Development",
    issuer: "Programming Hub",
    date: "Sep 2023",
    credentialId: "",
    credentialUrl: "https://www.linkedin.com/in/amarhumayun/",
    skills: ["Python", "Programming", "Software Development"],
    description: "Professional Python programming certification covering fundamentals, data structures, and best practices.",
  },
]

export default function Certifications() {
  return (
    <section className="section-padding section-bg">
      <div className="max-w-7xl mx-auto px-4">
        <FluidTransition className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Certifications & <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
            Continuous learning and professional development through industry-recognized certifications and courses.
          </p>
        </FluidTransition>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.15 } }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-200 border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <CardTitle className="text-lg sm:text-xl mb-2">{cert.title}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <Award className="w-4 h-4 text-primary" aria-hidden="true" />
                          <span className="font-medium">{cert.issuer}</span>
                        </div>
                      </div>
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" aria-hidden="true" />
                    </div>
                    <div className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{cert.date}</span>
                      </div>
                      {cert.credentialId && (
                        <Badge variant="outline" className="text-xs">
                          ID: {cert.credentialId}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{cert.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {cert.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    {cert.credentialUrl && cert.credentialUrl !== "#" && (
                      <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                          aria-label={`View ${cert.title} certificate`}
                        >
                          <ExternalLink className="w-4 h-4" aria-hidden="true" />
                          {cert.credentialId ? "Verify Certificate" : "View Certificate"}
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
