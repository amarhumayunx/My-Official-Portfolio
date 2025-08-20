"use client"

import { motion } from "framer-motion"
import { Smartphone, CheckCircle, Zap, Palette, Shield, Clock, Star, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FluidTransition } from "@/components/ui/FluidTransition"
import Link from "next/link"
import Image from "next/image"

const features = [
  {
    icon: Smartphone,
    title: "Cross-Platform Development",
    description: "Single codebase for both iOS and Android platforms with native performance.",
  },
  {
    icon: Palette,
    title: "Custom UI/UX Design",
    description: "Pixel-perfect designs that match your brand and provide excellent user experience.",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Optimized apps with fast loading times and smooth animations.",
  },
  {
    icon: Shield,
    title: "Secure & Scalable",
    description: "Built with security best practices and scalable architecture.",
  },
]

const technologies = [
  "Flutter SDK",
  "Dart Programming",
  "Provider/Riverpod",
  "BLoC Pattern",
  "GetX",
  "Firebase Integration",
  "REST APIs",
  "SQLite/Hive",
  "Material Design",
  "Cupertino Design",
]

const portfolioProjects = [
  {
    name: "BalanceBite",
    description: "AI-powered nutrition tracking app with personalized meal plans",
    image: "/images/balancebite-app.png",
    technologies: ["Flutter", "AI/ML", "Firebase", "Provider"],
    features: ["AI Chatbot", "Meal Planning", "Progress Tracking"],
    href: "/projects/balancebite-mobile-app",
  },
  {
    name: "SafeCrypt",
    description: "Secure password manager with AES-256 encryption",
    image: "/images/safecrypt-app.png",
    technologies: ["Flutter", "Encryption", "Biometrics", "Hive"],
    features: ["AES-256 Encryption", "Biometric Auth", "Cross-platform Sync"],
    href: "/projects/safecrypt-password-manager",
  },
  {
    name: "Surah Yaseen",
    description: "Islamic app for reading and listening to Quran",
    image: "/images/surah-yaseen-app.png",
    technologies: ["Flutter", "Audio", "Local Storage", "UI/UX"],
    features: ["Audio Playback", "Text Highlighting", "Bookmarks"],
    href: "/projects/surah-yaseen-app",
  },
]

const pricingTiers = [
  {
    name: "Basic App",
    price: "Rs 15,000 - 30,000",
    duration: "2-4 weeks",
    features: [
      "Simple UI with 3-5 screens",
      "Basic functionality",
      "Local data storage",
      "Basic animations",
      "Play Store deployment",
    ],
    popular: false,
  },
  {
    name: "Standard App",
    price: "Rs 30,000 - 60,000",
    duration: "4-8 weeks",
    features: [
      "Complex UI with 8-15 screens",
      "API integration",
      "User authentication",
      "Push notifications",
      "Advanced animations",
      "Both store deployments",
    ],
    popular: true,
  },
  {
    name: "Premium App",
    price: "Rs 60,000+",
    duration: "8-16 weeks",
    features: [
      "Enterprise-level features",
      "Custom backend integration",
      "Advanced security",
      "Real-time features",
      "AI/ML integration",
      "Ongoing support included",
    ],
    popular: false,
  },
]

const process = [
  {
    step: "01",
    title: "Requirements Analysis",
    description: "Detailed discussion of your app requirements, target audience, and business goals.",
    duration: "1-2 days",
  },
  {
    step: "02",
    title: "UI/UX Design",
    description: "Creating wireframes, mockups, and interactive prototypes for your approval.",
    duration: "3-7 days",
  },
  {
    step: "03",
    title: "Development",
    description: "Agile development with regular updates and milestone deliveries.",
    duration: "2-12 weeks",
  },
  {
    step: "04",
    title: "Testing & Deployment",
    description: "Comprehensive testing, bug fixes, and app store deployment.",
    duration: "3-5 days",
  },
]

export default function FlutterDevelopmentService() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FluidTransition>
              <div className="space-y-6">
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">Flutter Development Services</Badge>
                <h1 className="text-4xl sm:text-5xl font-bold">
                  Cross-Platform <span className="gradient-text">Mobile Apps</span> with Flutter
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Build high-performance mobile applications for both iOS and Android with a single codebase. Get native
                  performance with faster development time and cost-effective solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <Link href="#pricing">View Pricing</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#portfolio">See Examples</Link>
                  </Button>
                </div>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>2-16 weeks delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>100% satisfaction rate</span>
                  </div>
                </div>
              </div>
            </FluidTransition>

            <FluidTransition delay={0.2}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl" />
                <Card className="relative bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
                  <CardContent className="p-8">
                    <div className="text-center space-y-4">
                      <Smartphone className="w-16 h-16 text-primary mx-auto" />
                      <h3 className="text-2xl font-bold">Flutter Expertise</h3>
                      <p className="text-muted-foreground">
                        Specialized in creating beautiful, performant cross-platform applications
                      </p>
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">4+</div>
                          <div className="text-sm text-muted-foreground">Apps Built</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">100%</div>
                          <div className="text-sm text-muted-foreground">Success Rate</div>
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
              Why Choose <span className="gradient-text">Flutter Development</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Flutter offers the perfect balance of performance, development speed, and cost-effectiveness for modern
              mobile applications.
            </p>
          </FluidTransition>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FluidTransition key={feature.title} delay={index * 0.1}>
                <Card className="text-center hover:shadow-lg transition-all duration-300 group h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-bold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </FluidTransition>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="section-padding bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <FluidTransition className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="gradient-text">Technologies</span> & Tools
            </h2>
            <p className="text-lg text-muted-foreground">
              Modern Flutter ecosystem tools and libraries I use for development
            </p>
          </FluidTransition>

          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <FluidTransition key={tech} delay={index * 0.05}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Badge
                    variant="secondary"
                    className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
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
      <section id="portfolio" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <FluidTransition className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Flutter <span className="gradient-text">Portfolio Projects</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Real-world Flutter applications I've built for various industries
            </p>
          </FluidTransition>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
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

                      <Button asChild className="w-full group/btn">
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
      <section id="pricing" className="section-padding bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <FluidTransition className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="gradient-text">Transparent</span> Pricing
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose the package that best fits your project requirements and budget
            </p>
          </FluidTransition>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <FluidTransition key={tier.name} delay={index * 0.1}>
                <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }}>
                  <Card className={`relative h-full ${tier.popular ? "border-primary shadow-lg" : ""}`}>
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                      </div>
                    )}

                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-2xl">{tier.name}</CardTitle>
                      <div className="text-3xl font-bold text-primary">{tier.price}</div>
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

                      <Button className="w-full" variant={tier.popular ? "default" : "outline"} asChild>
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

      {/* Process Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <FluidTransition className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Development <span className="gradient-text">Process</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              A structured approach ensuring quality delivery and client satisfaction
            </p>
          </FluidTransition>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <FluidTransition key={step.step} delay={index * 0.1}>
                <Card className="text-center hover:shadow-lg transition-all duration-300 group relative">
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                  )}

                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                      {step.step}
                    </div>
                    <h3 className="font-bold mb-3 group-hover:text-primary transition-colors">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{step.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {step.duration}
                    </Badge>
                  </CardContent>
                </Card>
              </FluidTransition>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="section-padding bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <FluidTransition>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Build Your <span className="gradient-text">Flutter App</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's discuss your project requirements and create a custom solution that exceeds your expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your Project</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="mailto:amarhumayun@outlook.com">Email Me Directly</Link>
              </Button>
            </div>
          </FluidTransition>
        </div>
      </section>
    </div>
  )
}
