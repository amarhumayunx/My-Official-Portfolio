"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Database, Shield, Zap, Cloud, CheckCircle, ArrowRight, Server } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const firebaseFeatures = [
  {
    icon: Shield,
    title: "Authentication",
    description: "Secure user authentication with multiple providers",
    features: ["Email/Password", "Google Sign-in", "Phone Auth", "Anonymous Auth"],
  },
  {
    icon: Database,
    title: "Firestore Database",
    description: "Real-time NoSQL database with offline support",
    features: ["Real-time sync", "Offline support", "Scalable queries", "Security rules"],
  },
  {
    icon: Zap,
    title: "Cloud Functions",
    description: "Serverless backend logic and API endpoints",
    features: ["HTTP triggers", "Database triggers", "Auth triggers", "Scheduled functions"],
  },
  {
    icon: Cloud,
    title: "Cloud Storage",
    description: "Secure file storage and management",
    features: ["Image/Video storage", "File compression", "CDN delivery", "Access control"],
  },
]

const pricingTiers = [
  {
    name: "Basic Integration",
    price: "Rs 25,000",
    duration: "1-2 weeks",
    description: "Essential Firebase setup for small apps",
    features: [
      "Firebase project setup",
      "Authentication integration",
      "Basic Firestore database",
      "Security rules configuration",
      "Basic cloud storage",
      "Documentation",
    ],
    popular: false,
  },
  {
    name: "Advanced Integration",
    price: "Rs 45,000",
    duration: "2-3 weeks",
    description: "Complete Firebase backend solution",
    features: [
      "Everything in Basic",
      "Cloud Functions development",
      "Advanced database design",
      "Push notifications",
      "Analytics integration",
      "Performance monitoring",
      "Crashlytics setup",
      "Testing & deployment",
    ],
    popular: true,
  },
  {
    name: "Enterprise Solution",
    price: "Rs 80,000+",
    duration: "3-4 weeks",
    description: "Full-scale Firebase architecture",
    features: [
      "Everything in Advanced",
      "Multi-environment setup",
      "Advanced security rules",
      "Custom cloud functions",
      "Data migration tools",
      "Performance optimization",
      "Team collaboration setup",
      "Ongoing support",
    ],
    popular: false,
  },
]

const technologies = [
  "Firebase Auth",
  "Firestore",
  "Cloud Functions",
  "Cloud Storage",
  "FCM",
  "Analytics",
  "Crashlytics",
  "Performance",
  "Remote Config",
  "Dynamic Links",
]

const portfolioProjects = [
  {
    name: "BalanceBite",
    description: "Real-time nutrition tracking with Firebase backend",
    features: ["User authentication", "Real-time data sync", "Cloud storage for images"],
    image: "/images/balancebite-app.png",
  },
  {
    name: "SafeCrypt",
    description: "Secure password manager with Firebase security",
    features: ["Encrypted data storage", "Secure authentication", "Cloud backup"],
    image: "/images/safecrypt-app.png",
  },
]

const developmentProcess = [
  {
    step: 1,
    title: "Requirements Analysis",
    description: "Analyze your app requirements and design Firebase architecture",
    duration: "1-2 days",
  },
  {
    step: 2,
    title: "Firebase Setup",
    description: "Configure Firebase project, authentication, and database structure",
    duration: "2-3 days",
  },
  {
    step: 3,
    title: "Integration Development",
    description: "Implement Firebase services in your mobile/web application",
    duration: "5-10 days",
  },
  {
    step: 4,
    title: "Testing & Deployment",
    description: "Comprehensive testing, security review, and production deployment",
    duration: "2-3 days",
  },
]

export default function FirebaseIntegrationService() {
  const [selectedTier, setSelectedTier] = useState(1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="mb-4 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
              <Server className="w-4 h-4 mr-2" />
              Firebase Backend Integration
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Powerful Firebase
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                {" "}
                Backend Solutions
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Transform your mobile and web applications with scalable Firebase backend services. Real-time databases,
              secure authentication, and serverless functions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                asChild
              >
                <Link href="#pricing">
                  View Pricing <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#portfolio">View Portfolio</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Firebase Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Firebase Services I Integrate
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Complete Firebase ecosystem integration for modern applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {firebaseFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <feature.icon className="w-12 h-12 text-orange-600 mb-4" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Firebase Technologies & Services</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Projects */}
      <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Firebase Integration Portfolio
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Real projects showcasing Firebase backend implementations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {portfolioProjects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900 flex items-center justify-center">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                    <div className="space-y-2">
                      {project.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Firebase Integration Process
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Structured approach to Firebase backend implementation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {developmentProcess.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{step.description}</p>
                <Badge variant="outline">{step.duration}</Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Firebase Integration Pricing
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Transparent pricing for Firebase backend services
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`relative h-full ${tier.popular ? "ring-2 ring-orange-500 shadow-xl" : ""}`}>
                  {tier.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <div className="text-3xl font-bold text-orange-600">{tier.price}</div>
                    <CardDescription>{tier.description}</CardDescription>
                    <Badge variant="outline">{tier.duration}</Badge>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full mt-6 ${tier.popular ? "bg-orange-600 hover:bg-orange-700" : ""}`}
                      variant={tier.popular ? "default" : "outline"}
                      asChild
                    >
                      <Link href="/#contact">Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Build Your Firebase Backend?</h2>
            <p className="text-xl text-orange-100 mb-8">
              Let's discuss your project requirements and create a scalable Firebase solution
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/#contact">
                  Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600 bg-transparent"
                asChild
              >
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
