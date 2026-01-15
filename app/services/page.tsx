import type { Metadata } from "next"
import { Smartphone, Code, Database, Brain, Shield, Wrench, Globe, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FluidTransition } from "@/components/ui/FluidTransition"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Professional Development Services | Muhammad Humayun Amar",
  description:
    "Comprehensive mobile development services including Flutter, Android, Firebase integration, AI/ML, and security solutions. Get your app built by an expert developer.",
  keywords:
    "Flutter development, Android development, Firebase integration, AI ML integration, mobile app security, app maintenance",
  openGraph: {
    title: "Professional Development Services | Muhammad Humayun Amar",
    description:
      "Comprehensive mobile development services including Flutter, Android, Firebase integration, AI/ML, and security solutions.",
    type: "website",
  },
}

const services = [
  {
    id: "flutter-development",
    title: "Flutter Development",
    description: "Cross-platform mobile applications with native performance and beautiful UI",
    icon: Smartphone,
    color: "from-blue-500 to-cyan-600",
    features: ["Cross-platform compatibility", "Native performance", "Custom UI/UX", "State management"],
    startingPrice: "Rs 15,000",
    deliveryTime: "2-6 weeks",
    popular: true,
  },
  {
    id: "android-development",
    title: "Android Development",
    description: "Native Android applications using Kotlin with modern architecture patterns",
    icon: Code,
    color: "from-green-500 to-emerald-600",
    features: ["Kotlin development", "Material Design", "Jetpack Compose", "Architecture Components"],
    startingPrice: "Rs 20,000",
    deliveryTime: "3-8 weeks",
    popular: false,
  },
  {
    id: "firebase-integration",
    title: "Firebase Integration",
    description: "Complete backend infrastructure with real-time capabilities and cloud functions",
    icon: Database,
    color: "from-orange-500 to-red-600",
    features: ["Authentication systems", "Real-time database", "Cloud functions", "Analytics"],
    startingPrice: "Rs 10,000",
    deliveryTime: "1-3 weeks",
    popular: false,
  },
  {
    id: "ai-ml-integration",
    title: "AI & ML Integration",
    description: "Smart features with machine learning models and AI-powered capabilities",
    icon: Brain,
    color: "from-purple-500 to-pink-600",
    features: ["TensorFlow Lite", "OCR integration", "Chatbots", "Recommendation systems"],
    startingPrice: "Rs 25,000",
    deliveryTime: "4-10 weeks",
    popular: false,
  },
  {
    id: "security-solutions",
    title: "Security Solutions",
    description: "Data protection and privacy-focused security implementations",
    icon: Shield,
    color: "from-red-500 to-pink-600",
    features: ["AES encryption", "Biometric authentication", "Secure storage", "GDPR compliance"],
    startingPrice: "Rs 18,000",
    deliveryTime: "2-5 weeks",
    popular: false,
  },
  {
    id: "maintenance-support",
    title: "Maintenance & Support",
    description: "Ongoing app maintenance, updates, and comprehensive technical support",
    icon: Wrench,
    color: "from-teal-500 to-green-600",
    features: ["Bug fixes", "Feature updates", "Performance monitoring", "24/7 support"],
    startingPrice: "Rs 8,000/month",
    deliveryTime: "Ongoing",
    popular: false,
  },
  {
    id: "app-deployment",
    title: "App Store Deployment",
    description: "End-to-end app publishing and optimization for Play Store and App Store",
    icon: Globe,
    color: "from-indigo-500 to-blue-600",
    features: ["Play Store publishing", "App Store submission", "ASO optimization", "Beta testing"],
    startingPrice: "Rs 5,000",
    deliveryTime: "1-2 weeks",
    popular: false,
  },
  {
    id: "realtime-features",
    title: "Real-time Features",
    description: "Live data synchronization and real-time communication capabilities",
    icon: Zap,
    color: "from-yellow-500 to-orange-600",
    features: ["Chat systems", "Live updates", "Push notifications", "WebSocket integration"],
    startingPrice: "Rs 12,000",
    deliveryTime: "2-4 weeks",
    popular: false,
  },
]

const stats = [
  { number: "8+", label: "Services Offered" },
  { number: "4+", label: "Apps Delivered" },
  { number: "100%", label: "Client Satisfaction" },
  { number: "24h", label: "Response Time" },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen section-bg pt-24 pb-16">
      <div className="max-w-7xl mx-auto section-padding">
        {/* Hero Section */}
        <FluidTransition className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Professional <span className="gradient-text">Development Services</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed">
            From concept to deployment, I provide comprehensive mobile development services using cutting-edge
            technologies like Flutter, Kotlin, Firebase, and AI/ML integration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/#contact">Get Free Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/#projects">View Portfolio</Link>
            </Button>
          </div>
        </FluidTransition>

        {/* Stats Section */}
        <FluidTransition delay={0.2} className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={stat.label} className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </FluidTransition>

        {/* Services Grid */}
        <FluidTransition delay={0.3}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <Card key={service.id} className="h-full hover:shadow-lg transition-all duration-300 group">
                <div className={`h-2 bg-gradient-to-r ${service.color}`} />
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center`}
                    >
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {service.title}
                        </CardTitle>
                        {service.popular && (
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">Popular</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Key Features</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature) => (
                        <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <div className="text-xs text-muted-foreground">Starting from</div>
                      <div className="font-bold text-primary">{service.startingPrice}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Delivery</div>
                      <div className="font-medium text-sm">{service.deliveryTime}</div>
                    </div>
                  </div>
                  <Button asChild className="w-full">
                    <Link href={`/services/${service.id}`}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </FluidTransition>

        {/* CTA Section */}
        <FluidTransition delay={0.4}>
          <Card className="bg-transparent border-primary/20 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Let's discuss your requirements and create something amazing together. Get a free consultation and
                detailed project quote.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/#contact">Start Your Project</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/#projects">View My Work</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </FluidTransition>
      </div>
    </div>
  )
}
