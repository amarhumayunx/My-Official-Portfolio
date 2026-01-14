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
  Star,
  Clock,
  Users,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FluidTransition } from "@/components/ui/FluidTransition"
import Link from "next/link"

const services = [
  {
    id: "flutter-development",
    title: "Flutter Mobile Development",
    description: "Cross-platform iOS & Android applications with native performance and beautiful UI",
    icon: Smartphone,
    color: "from-blue-500 to-cyan-600",
    features: ["Cross-platform compatibility", "Native performance", "Custom UI/UX", "State management"],
    projects: ["BalanceBite", "SafeCrypt", "Surah Yaseen"],
    startingPrice: "Rs 15,000",
    deliveryTime: "2-6 weeks",
    popular: true,
  },
  {
    id: "android-development",
    title: "Android Native Development",
    description: "Native Android applications using Kotlin with modern architecture patterns",
    icon: Code,
    color: "from-green-500 to-emerald-600",
    features: ["Kotlin development", "Material Design", "Jetpack Compose", "Architecture Components"],
    projects: ["Enterprise Apps", "Custom Solutions"],
    startingPrice: "Rs 20,000",
    deliveryTime: "3-8 weeks",
    popular: false,
  },
  {
    id: "firebase-integration",
    title: "Firebase Backend Solutions",
    description: "Complete backend infrastructure with real-time capabilities and cloud functions",
    icon: Database,
    color: "from-orange-500 to-red-600",
    features: ["Authentication systems", "Real-time database", "Cloud functions", "Analytics"],
    projects: ["BalanceBite Backend", "SafeCrypt Sync"],
    startingPrice: "Rs 10,000",
    deliveryTime: "1-3 weeks",
    popular: false,
  },
  {
    id: "ai-ml-integration",
    title: "AI & Machine Learning",
    description: "Smart features with machine learning models and AI-powered capabilities",
    icon: Shield,
    color: "from-purple-500 to-pink-600",
    features: ["TensorFlow Lite", "OCR integration", "Chatbots", "Recommendation systems"],
    projects: ["BalanceBite AI", "Toolkit OCR"],
    startingPrice: "Rs 25,000",
    deliveryTime: "4-10 weeks",
    popular: false,
  },
  {
    id: "app-deployment",
    title: "App Store Deployment",
    description: "End-to-end app publishing and optimization for Play Store and App Store",
    icon: Globe,
    color: "from-indigo-500 to-blue-600",
    features: ["Play Store publishing", "App Store submission", "ASO optimization", "Beta testing"],
    projects: ["All Portfolio Apps", "Client Launches"],
    startingPrice: "Rs 5,000",
    deliveryTime: "1-2 weeks",
    popular: false,
  },
  {
    id: "security-solutions",
    title: "Security & Encryption",
    description: "Data protection and privacy-focused security implementations",
    icon: Shield,
    color: "from-red-500 to-pink-600",
    features: ["AES encryption", "Biometric authentication", "Secure storage", "GDPR compliance"],
    projects: ["SafeCrypt", "Enterprise Security"],
    startingPrice: "Rs 18,000",
    deliveryTime: "2-5 weeks",
    popular: false,
  },
  {
    id: "realtime-features",
    title: "Real-time Features",
    description: "Live data synchronization and real-time communication capabilities",
    icon: Zap,
    color: "from-yellow-500 to-orange-600",
    features: ["Chat systems", "Live updates", "Push notifications", "WebSocket integration"],
    projects: ["Chat Applications", "Live Tracking"],
    startingPrice: "Rs 12,000",
    deliveryTime: "2-4 weeks",
    popular: false,
  },
  {
    id: "maintenance-support",
    title: "Maintenance & Support",
    description: "Ongoing app maintenance, updates, and comprehensive technical support",
    icon: Palette,
    color: "from-teal-500 to-green-600",
    features: ["Bug fixes", "Feature updates", "Performance monitoring", "24/7 support"],
    projects: ["All Client Apps", "Long-term Partnerships"],
    startingPrice: "Rs 8,000/month",
    deliveryTime: "Ongoing",
    popular: false,
  },
]

const stats = [
  { number: "4+", label: "Apps Delivered", icon: Smartphone },
  { number: "100%", label: "Client Satisfaction", icon: Star },
  { number: "24h", label: "Response Time", icon: Clock },
  { number: "1+", label: "Years Experience", icon: Users },
]

export default function Services() {
  return (
    <section id="services" className="section-padding section-bg">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FluidTransition className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Professional <span className="gradient-text">Development Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            From concept to deployment, I provide comprehensive mobile development services using cutting-edge
            technologies like Flutter, Kotlin, and Firebase.
          </p>
          <Button size="lg" asChild>
            <Link href="/services">View All Services</Link>
          </Button>
        </FluidTransition>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
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

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 6).map((service, index) => (
            <FluidTransition key={service.id} delay={index * 0.1}>
              <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                <Card className="h-full hover:shadow-2xl transition-all duration-500 group border-0 shadow-lg overflow-hidden">
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
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">
                            {service.title}
                          </CardTitle>
                          {service.popular && (
                            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                              Popular
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Key Features */}
                    <div>
                      <h4 className="font-semibold mb-3 text-sm">Key Features</h4>
                      <div className="space-y-2">
                        {service.features.slice(0, 3).map((feature) => (
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
                        {service.projects.slice(0, 2).map((project) => (
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
                      <Link href={`/services/${service.id}`} className="flex items-center gap-2">
                        Learn More
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </FluidTransition>
          ))}
        </div>

        {/* View All Services CTA */}
        <FluidTransition className="text-center mt-12">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Need Something Specific?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Explore my complete service portfolio or get in touch to discuss your custom requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/services">View All Services</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Get Free Consultation</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </FluidTransition>
      </div>
    </section>
  )
}
