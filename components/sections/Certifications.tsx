"use client"

import { motion } from "framer-motion"
import { Award, Calendar, ExternalLink, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FluidTransition } from "@/components/ui/FluidTransition"
import { ParallaxSection } from "@/components/ui/ParallaxSection"

const certifications = [
  {
    title: "Flutter & Dart - The Complete Guide",
    issuer: "Udemy",
    date: "2024",
    credentialId: "UC-12345678",
    credentialUrl: "https://www.udemy.com/certificate/UC-12345678/",
    skills: ["Flutter", "Dart", "Mobile Development"],
    description: "Comprehensive course covering Flutter framework, Dart programming language, and cross-platform mobile app development.",
  },
  {
    title: "Android Development with Kotlin",
    issuer: "Google Developers",
    date: "2024",
    credentialId: "GD-AND-2024",
    credentialUrl: "#",
    skills: ["Kotlin", "Android", "Material Design"],
    description: "Professional Android development certification covering Kotlin, Android SDK, and modern app architecture.",
  },
  {
    title: "Firebase for Mobile Developers",
    issuer: "Firebase",
    date: "2024",
    credentialId: "FB-MOB-2024",
    credentialUrl: "#",
    skills: ["Firebase", "Backend", "Cloud Services"],
    description: "Complete Firebase ecosystem including Authentication, Firestore, Cloud Functions, and Storage.",
  },
  {
    title: "AI & Machine Learning Fundamentals",
    issuer: "Coursera",
    date: "2023",
    credentialId: "CR-AI-2023",
    credentialUrl: "#",
    skills: ["AI", "Machine Learning", "TensorFlow"],
    description: "Introduction to artificial intelligence and machine learning concepts with practical implementation.",
  },
]

export default function Certifications() {
  return (
    <section id="certifications" className="section-padding section-bg">
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
            <ParallaxSection key={index} offset={15}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary">
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
                    {cert.credentialUrl !== "#" && (
                      <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                          aria-label={`View ${cert.title} certificate`}
                        >
                          <ExternalLink className="w-4 h-4" aria-hidden="true" />
                          View Certificate
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </ParallaxSection>
          ))}
        </div>
      </div>
    </section>
  )
}
