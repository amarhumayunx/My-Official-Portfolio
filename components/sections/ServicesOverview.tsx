"use client"

import { motion } from "framer-motion"
import {
  Smartphone,
  Code,
  Database,
  Shield,
  Globe,
  Zap,
  Palette,
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Star,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FluidTransition } from "@/components/ui/FluidTransition"
import { MicroInteraction } from "@/components/ui/MicroInteractions"
import Link from "next/link"

const serviceCategories = [
  {
    id: "flutter-development",
    title: "Flutter Mobile Development",
    description: "Cross-platform iOS & Android applications with native performance",
    icon: Smartphone,
    color: "from-blue-500 to-cyan-600",
    features: ["Cross-platform compatibility", "Native performance", "Custom UI/UX", "State management"],
    projects: ["BalanceBite", "SafeCrypt", "Surah Yaseen"],
    startingPrice: "Rs 15,000",
    deliveryTime: "2-6 weeks",
    href: "/services/flutter-development",
  },
  {
    id: "android-development",
    title: "Android Native Development",
    description: "Native Android applications using Kotlin and modern architecture",
    icon: Code,
    color: "from-green-500 to-emerald-600",
    features: ["Kotlin development", "Material Design", "Jetpack Compose", "Architecture Components"],
    projects: ["BalanceBite Android", "Custom Enterprise Apps"],
    startingPrice: "Rs 20,000",
    deliveryTime: "3-8 weeks",
    href: "/services/android-development",
  },
  {
    id: "firebase-integration",
    title: "Firebase Backend Solutions",
    description: "Complete backend infrastructure with real-time capabilities",
    icon: Database,
    color: "from-orange-500 to-red-600",
    features: ["Authentication systems", "Real-time database", "Cloud functions", "Analytics"],
    projects: ["BalanceBite Backend", "SafeCrypt Sync"],
    startingPrice: "Rs 10,000",
    deliveryTime: "1-3 weeks",
    href: "/services/firebase-integration",
  },
  {
    id: "ai-ml-integration",
    title: "AI & Machine Learning",
    description: "Smart features with machine learning and AI capabilities",
    icon: Shield,
    color: "from-purple-500 to-pink-600",
    features: ["TensorFlow Lite", "OCR integration", "Chatbots", "Recommendation systems"],
    projects: ["BalanceBite AI", "Toolkit OCR"],
    startingPrice: "Rs 25,000",
    deliveryTime: "4-10 weeks",
    href: "/services/ai-ml-integration",
  },
  {
    id: "app-deployment",
    title: "App Store Deployment",
    description: "End-to-end app publishing and optimization services",
    icon: Globe,
    color: "from-indigo-500 to-blue-600",
    features: ["Play Store publishing", "App Store submission", "ASO optimization", "Beta testing"],
    projects: ["All Portfolio Apps", "Client App Launches"],
    startingPrice: "Rs 5,000",
    deliveryTime: "1-2 weeks",
    href: "/services/app-deployment",
  },
  {
    id: "security-solutions",
    title: "Security & Encryption",
    description: "Data protection and privacy-focused security implementations",
    icon: Shield,
    color: "from-red-500 to-pink-600",
    features: ["AES encryption", "Biometric authentication", "Secure storage", "GDPR compliance"],
    projects: ["SafeCrypt", "Enterprise Security Apps"],
    startingPrice: "Rs 18,000",
    deliveryTime: "2-5 weeks",
    href: "/services/security-solutions",
  },
  {
    id: "realtime-features",
    title: "Real-time Features",
    description: "Live data synchronization and communication features",
    icon: Zap,
    color: "from-yellow-500 to-orange-600",
    features: ["Chat systems", "Live updates", "Push notifications", "WebSocket integration"],
    projects: ["Real-time Chat Apps", "Live Tracking Systems"],
    startingPrice: "Rs 12,000",
    deliveryTime: "2-4 weeks",
    href: "/services/realtime-features",
  },
  {
    id: "maintenance-support",
    title: "Maintenance & Support",
    description: "Ongoing app maintenance, updates, and technical support",
    icon: Palette,
    color: "from-teal-500 to-green-600",
    features: ["Bug fixes", "Feature updates", "Performance monitoring", "24/7 support"],
    projects: ["All Client Apps", "Long-term Partnerships"],
    startingPrice: "Rs 8,000/month",
    deliveryTime: "Ongoing",
    href: "/services/maintenance-support",
  },
]

const stats = [
  { number: "4+", label: "Apps Delivered", icon: Smartphone },
  { number: "100%", label: "Client Satisfaction", icon: Star },
  { number: "24h", label: "Response Time", icon: Clock },
  { number: "1+", label: "Years Experience", icon: Users },
]

export default function ServicesOverview() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto text-center">
          <FluidTransition>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Professional <span className="gradient-text">Development Services</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              From concept to deployment, I provide comprehensive mobile development services using cutting-edge
              technologies like Flutter, Kotlin, and Firebase.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="#services">Explore Services</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#contact">Get Free Consultation</Link>
              </Button>
            </div>
          </FluidTransition>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <FluidTransition key={stat.label} delay={index * 0.1}>
                <Card className="text-center hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                    <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              </FluidTransition>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="section-padding bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto">
          <FluidTransition className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Complete <span className="gradient-text">Service Portfolio</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Specialized services tailored to bring your mobile app vision to life with modern technologies and best
              practices.
            </p>
          </FluidTransition>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCategories.map((service, index) => (
              <FluidTransition key={service.id} delay={index * 0.1}>
                <MicroInteraction variant="lift" intensity="normal">
                  <Card className="h-full hover:shadow-2xl transition-all duration-500 group border-0 shadow-lg overflow-hidden hover-lift">
                    {/* Service Header */}
                    <div className={`h-2 bg-gradient-to-r ${service.color}`} />

                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center shadow-lg`}
                        >
                          <service.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">
                            {service.title}
                          </CardTitle>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Key Features */}
                      <div>
                        <h4 className="font-semibold mb-3 text-sm">Key Features</h4>
                        <div className="space-y-2">
                          {service.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Example Projects */}
                      <div>
                        <h4 className="font-semibold mb-3 text-sm">Example Projects</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.projects.map((project) => (
                            <Badge key={project} variant="secondary" className="text-xs">
                              {project}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Pricing & Timeline */}
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Starting from</div>
                          <div className="font-bold text-primary">{service.startingPrice}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Delivery</div>
                          <div className="font-medium text-sm">{service.deliveryTime}</div>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Button asChild className="w-full group/btn">
                        <Link href={service.href} className="flex items-center gap-2">
                          Learn More
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </MicroInteraction>
              </FluidTransition>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <FluidTransition className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              My <span className="gradient-text">Development Process</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A proven methodology that ensures quality delivery and client satisfaction.
            </p>
          </FluidTransition>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery & Planning",
                description: "Understanding your requirements, target audience, and project goals.",
                icon: "🔍",
              },
              {
                step: "02",
                title: "Design & Architecture",
                description: "Creating wireframes, UI designs, and technical architecture.",
                icon: "🎨",
              },
              {
                step: "03",
                title: "Development & Testing",
                description: "Agile development with continuous testing and quality assurance.",
                icon: "⚡",
              },
              {
                step: "04",
                title: "Deployment & Support",
                description: "App store deployment and ongoing maintenance support.",
                icon: "🚀",
              },
            ].map((process, index) => (
              <FluidTransition key={process.step} delay={index * 0.1}>
                <Card className="text-center hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{process.icon}</div>
                    <div className="text-sm font-bold text-primary mb-2">STEP {process.step}</div>
                    <h3 className="font-bold mb-3 group-hover:text-primary transition-colors">{process.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{process.description}</p>
                  </CardContent>
                </Card>
              </FluidTransition>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <FluidTransition>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Start Your <span className="gradient-text">Next Project</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's discuss your requirements and create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Get Free Consultation</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/projects">View Portfolio</Link>
              </Button>
            </div>
          </FluidTransition>
        </div>
      </section>
    </div>
  )
}
