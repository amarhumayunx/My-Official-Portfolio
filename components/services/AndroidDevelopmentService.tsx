"use client"

import { motion } from "framer-motion"
import { Code, CheckCircle, Palette, Shield, Clock, ExternalLink, Layers, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FluidTransition } from "@/components/ui/FluidTransition"
import Link from "next/link"
import Image from "next/image"

const features = [
  {
    icon: Code,
    title: "Kotlin Development",
    description: "Modern, concise, and safe programming language for robust Android applications.",
  },
  {
    icon: Palette,
    title: "Material Design",
    description: "Beautiful, intuitive interfaces following Google's Material Design guidelines.",
  },
  {
    icon: Layers,
    title: "Jetpack Compose",
    description: "Modern UI toolkit for building native Android interfaces with declarative programming.",
  },
  {
    icon: Settings,
    title: "Architecture Components",
    description: "MVVM, LiveData, Room, and other architecture components for maintainable code.",
  },
]

const technologies = [
  "Kotlin",
  "Android Studio",
  "Jetpack Compose",
  "Material Design",
  "MVVM Architecture",
  "Room Database",
  "Retrofit",
  "Coroutines",
  "LiveData",
  "Navigation Component",
  "WorkManager",
  "CameraX",
]

const advantages = [
  {
    title: "Native Performance",
    description: "Direct access to Android APIs and hardware features for optimal performance",
    icon: "⚡",
  },
  {
    title: "Platform Integration",
    description: "Deep integration with Android ecosystem and Google services",
    icon: "🔗",
  },
  {
    title: "Advanced Features",
    description: "Access to latest Android features and capabilities as they're released",
    icon: "🚀",
  },
  {
    title: "Optimized UX",
    description: "Platform-specific UI patterns that Android users expect and love",
    icon: "🎨",
  },
]

const portfolioProjects = [
  {
    name: "BalanceBite Android",
    description: "Native Android version with enhanced performance and platform-specific features",
    image: "/images/balancebite-app.png",
    technologies: ["Kotlin", "Jetpack Compose", "Room", "Retrofit"],
    features: ["Material You Design", "Adaptive UI", "Background Processing"],
    href: "/projects/balancebite-mobile-app",
  },
  {
    name: "Enterprise Security App",
    description: "High-security Android application for enterprise data management",
    image: "/images/safecrypt-app.png",
    technologies: ["Kotlin", "Biometrics", "Encryption", "WorkManager"],
    features: ["Biometric Security", "Offline Sync", "Enterprise MDM"],
    href: "/projects/safecrypt-password-manager",
  },
]

const pricingTiers = [
  {
    name: "Standard Android App",
    price: "Rs 20,000 - 40,000",
    duration: "3-6 weeks",
    features: [
      "Native Kotlin development",
      "Material Design UI",
      "5-10 screens",
      "Local database integration",
      "Play Store deployment",
      "Basic testing",
    ],
    popular: false,
  },
  {
    name: "Advanced Android App",
    price: "Rs 40,000 - 80,000",
    duration: "6-12 weeks",
    features: [
      "Complex architecture (MVVM)",
      "Jetpack Compose UI",
      "API integrations",
      "Advanced animations",
      "Push notifications",
      "Comprehensive testing",
      "Performance optimization",
    ],
    popular: true,
  },
  {
    name: "Enterprise Android App",
    price: "Rs 80,000+",
    duration: "12+ weeks",
    features: [
      "Enterprise-grade security",
      "Custom architecture",
      "Advanced integrations",
      "Offline capabilities",
      "Multi-module structure",
      "CI/CD pipeline",
      "Long-term support",
    ],
    popular: false,
  },
]

export default function AndroidDevelopmentService() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-900/20 dark:to-teal-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FluidTransition>
              <div className="space-y-6">
                <Badge className="bg-green-100 text-green-800 border-green-200">Android Development Services</Badge>
                <h1 className="text-4xl sm:text-5xl font-bold">
                  Native <span className="gradient-text">Android Apps</span> with Kotlin
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Build powerful, native Android applications using modern Kotlin, Jetpack Compose, and Material Design.
                  Get the best performance and user experience for Android users.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <Link href="#pricing">View Pricing</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#advantages">Why Native Android?</Link>
                  </Button>
                </div>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>3-16 weeks delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>Enterprise-grade security</span>
                  </div>
                </div>
              </div>
            </FluidTransition>

            <FluidTransition delay={0.2}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-2xl blur-3xl" />
                <Card className="relative bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
                  <CardContent className="p-8">
                    <div className="text-center space-y-4">
                      <Code className="w-16 h-16 text-green-600 mx-auto" />
                      <h3 className="text-2xl font-bold">Kotlin Expertise</h3>
                      <p className="text-muted-foreground">
                        Specialized in modern Android development with Kotlin and Jetpack libraries
                      </p>
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">100%</div>
                          <div className="text-sm text-muted-foreground">Kotlin Code</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">Latest</div>
                          <div className="text-sm text-muted-foreground">Android APIs</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </FluidTransition>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <FluidTransition className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Modern <span className="gradient-text">Android Development</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Leveraging the latest Android technologies and best practices for superior app performance and user
              experience.
            </p>
          </FluidTransition>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FluidTransition key={feature.title} delay={index * 0.1}>
                <Card className="text-center hover:shadow-lg transition-all duration-300 group h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 dark:group-hover:bg-green-900/40 transition-colors">
                      <feature.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-bold mb-3 group-hover:text-green-600 transition-colors">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </FluidTransition>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section id="advantages" className="section-padding bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <FluidTransition className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Choose <span className="gradient-text">Native Android</span>?
            </h2>
            <p className="text-lg text-muted-foreground">
              Native Android development offers unmatched performance and platform integration
            </p>
          </FluidTransition>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <FluidTransition key={advantage.title} delay={index * 0.1}>
                <Card className="text-center hover:shadow-lg transition-all duration-300 group h-full">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{advantage.icon}</div>
                    <h3 className="font-bold mb-3 group-hover:text-primary transition-colors">{advantage.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{advantage.description}</p>
                  </CardContent>
                </Card>
              </FluidTransition>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <FluidTransition className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="gradient-text">Android</span> Tech Stack
            </h2>
            <p className="text-lg text-muted-foreground">
              Modern Android development tools and libraries for robust applications
            </p>
          </FluidTransition>

          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <FluidTransition key={tech} delay={index * 0.05}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Badge
                    variant="secondary"
                    className="px-4 py-2 text-sm hover:bg-green-600 hover:text-white transition-colors cursor-pointer"
                  >
                    {tech}
                  </Badge>
                </motion.div>
              </FluidTransition>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="section-padding bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <FluidTransition className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Android <span className="gradient-text">Portfolio Projects</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Native Android applications showcasing modern development practices
            </p>
          </FluidTransition>

          <div className="grid md:grid-cols-2 gap-8">
            {portfolioProjects.map((project, index) => (
              <FluidTransition key={project.name} delay={index * 0.1}>
                <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 group h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <CardContent className="p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-green-600 transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-muted-foreground text-sm">{project.description}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Key Features</h4>
                        <div className="space-y-1">
                          {project.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              <span className="text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button asChild className="w-full group/btn bg-green-600 hover:bg-green-700">
                        <Link href={project.href} className="flex items-center gap-2">
                          View Details
                          <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </FluidTransition>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <FluidTransition className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="gradient-text">Android Development</span> Pricing
            </h2>
            <p className="text-lg text-muted-foreground">
              Competitive pricing for professional native Android development services
            </p>
          </FluidTransition>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <FluidTransition key={tier.name} delay={index * 0.1}>
                <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }}>
                  <Card className={`relative h-full ${tier.popular ? "border-green-500 shadow-lg" : ""}`}>
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-green-600 text-white">Most Popular</Badge>
                      </div>
                    )}

                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-2xl">{tier.name}</CardTitle>
                      <div className="text-3xl font-bold text-green-600">{tier.price}</div>
                      <div className="text-sm text-muted-foreground">{tier.duration}</div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        {tier.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Button
                        className={`w-full ${tier.popular ? "bg-green-600 hover:bg-green-700" : ""}`}
                        variant={tier.popular ? "default" : "outline"}
                        asChild
                      >
                        <Link href="#contact">Get Started</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </FluidTransition>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="section-padding bg-green-50 dark:bg-green-900/10">
        <div className="max-w-4xl mx-auto text-center">
          <FluidTransition>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Build Your <span className="gradient-text">Android App</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's create a powerful native Android application that leverages the full potential of the platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
                <Link href="/contact">Start Your Project</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="mailto:amarhumayun@outlook.com">Discuss Requirements</Link>
              </Button>
            </div>
          </FluidTransition>
        </div>
      </section>
    </div>
  )
}
