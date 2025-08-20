"use client"

import { motion } from "framer-motion"
import {
  Calendar,
  Clock,
  CheckCircle,
  MessageSquare,
  Users,
  Target,
  Lightbulb,
  ArrowRight,
  Star,
  Award,
  Zap,
  Shield,
  TrendingUp,
  Phone,
  Video,
  Mail,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ParallaxSection } from "@/components/ui/ParallaxSection"
import { MultiStepForm } from "@/components/ui/MultiStepForm"
import Link from "next/link"

const consultationBenefits = [
  {
    icon: Target,
    title: "Project Clarity",
    description: "Get clear understanding of your project scope, requirements, and feasibility",
    color: "text-blue-500",
  },
  {
    icon: TrendingUp,
    title: "Market Analysis",
    description: "Receive insights about your target market and competitive landscape",
    color: "text-green-500",
  },
  {
    icon: Lightbulb,
    title: "Technical Guidance",
    description: "Expert advice on technology stack, architecture, and best practices",
    color: "text-yellow-500",
  },
  {
    icon: Shield,
    title: "Risk Assessment",
    description: "Identify potential challenges and mitigation strategies early",
    color: "text-red-500",
  },
  {
    icon: Clock,
    title: "Timeline Planning",
    description: "Realistic project timeline with milestones and deliverables",
    color: "text-purple-500",
  },
  {
    icon: Award,
    title: "Cost Estimation",
    description: "Transparent pricing breakdown with no hidden costs",
    color: "text-orange-500",
  },
]

const consultationProcess = [
  {
    step: 1,
    title: "Initial Discussion",
    duration: "15-20 minutes",
    description: "We'll discuss your project idea, goals, and basic requirements",
    icon: MessageSquare,
  },
  {
    step: 2,
    title: "Requirement Analysis",
    duration: "20-25 minutes",
    description: "Deep dive into technical requirements, features, and user experience",
    icon: Target,
  },
  {
    step: 3,
    title: "Solution Design",
    duration: "15-20 minutes",
    description: "Propose technical solutions, architecture, and development approach",
    icon: Lightbulb,
  },
  {
    step: 4,
    title: "Project Planning",
    duration: "10-15 minutes",
    description: "Timeline, milestones, pricing, and next steps discussion",
    icon: Calendar,
  },
]

const consultationTypes = [
  {
    type: "Quick Consultation",
    duration: "30 minutes",
    price: "Free",
    description: "Perfect for initial project discussion and basic guidance",
    features: [
      "Project feasibility assessment",
      "Basic technical guidance",
      "Rough cost estimation",
      "Technology recommendations",
    ],
    icon: Zap,
    popular: false,
  },
  {
    type: "Detailed Consultation",
    duration: "60 minutes",
    price: "Free",
    description: "Comprehensive project analysis with detailed planning",
    features: [
      "Complete requirement analysis",
      "Detailed technical architecture",
      "Accurate cost breakdown",
      "Project timeline with milestones",
      "Risk assessment",
      "Market analysis",
    ],
    icon: Star,
    popular: true,
  },
  {
    type: "Follow-up Session",
    duration: "30 minutes",
    price: "Free",
    description: "Additional session for clarifications and updates",
    features: [
      "Project updates discussion",
      "Requirement modifications",
      "Technical clarifications",
      "Timeline adjustments",
    ],
    icon: Users,
    popular: false,
  },
]

const testimonials = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Healthcare Startup Founder",
    content:
      "Muhammad's consultation was incredibly thorough. He helped me understand the complexities of developing a healthcare app and provided a clear roadmap with HIPAA compliance considerations. His technical expertise saved me months of research.",
    rating: 5,
    project: "MedConnect App",
  },
  {
    name: "Ahmed Al-Rashid",
    role: "E-commerce Business Owner",
    content:
      "The consultation exceeded my expectations. Muhammad not only analyzed my requirements but also suggested innovative features I hadn't considered. His cost breakdown was transparent and realistic. Highly recommend!",
    rating: 5,
    project: "ShopEase Platform",
  },
  {
    name: "Jennifer Chen",
    role: "Fitness Industry Entrepreneur",
    content:
      "Professional, knowledgeable, and patient. Muhammad took time to understand my vision and provided valuable insights about user experience and monetization strategies. The consultation was worth every minute.",
    rating: 5,
    project: "FitTracker Pro",
  },
  {
    name: "Omar Hassan",
    role: "Restaurant Chain Owner",
    content:
      "Muhammad's technical guidance was spot-on. He identified potential scalability issues early and proposed solutions that would save us significant costs in the long run. His consultation was a game-changer for our project.",
    rating: 5,
    project: "FoodieHub App",
  },
  {
    name: "Lisa Rodriguez",
    role: "EdTech Startup Co-founder",
    content:
      "The consultation was incredibly valuable. Muhammad helped us refine our concept and provided detailed technical specifications. His experience with educational apps was evident, and his advice was actionable.",
    rating: 5,
    project: "LearnSmart Platform",
  },
  {
    name: "Khalid Mahmood",
    role: "Real Estate Developer",
    content:
      "Excellent consultation experience. Muhammad understood our complex requirements and suggested a phased development approach that fit our budget perfectly. His expertise in property management apps was impressive.",
    rating: 5,
    project: "PropertyPro Suite",
  },
]

const contactMethods = [
  {
    icon: Video,
    title: "Video Call",
    description: "Google Meet or Zoom",
    availability: "Preferred method",
  },
  {
    icon: Phone,
    title: "Phone Call",
    description: "Voice call discussion",
    availability: "Available on request",
  },
  {
    icon: Mail,
    title: "Email Discussion",
    description: "Detailed email exchange",
    availability: "For follow-ups",
  },
]

export default function ConsultationPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">100% Free • No Obligations</Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Get Your <span className="gradient-text">Free Consultation</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Transform your app idea into reality with expert guidance. Get personalized advice, technical insights,
              and a clear development roadmap - completely free.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No commitment required</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Expert technical advice</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Detailed project proposal</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Quick Response</h3>
                  <p className="text-sm text-muted-foreground">Response within 2-4 hours</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Award className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Expert Guidance</h3>
                  <p className="text-sm text-muted-foreground">5+ years of experience</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Confidential</h3>
                  <p className="text-sm text-muted-foreground">Your ideas are safe</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Consultation Types */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Choose Your <span className="gradient-text">Consultation Type</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select the consultation format that best fits your needs and project complexity
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {consultationTypes.map((consultation, index) => (
              <motion.div
                key={consultation.type}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {consultation.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                <Card className={`h-full ${consultation.popular ? "border-primary shadow-lg" : ""}`}>
                  <CardHeader className="text-center">
                    <consultation.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <CardTitle className="text-xl">{consultation.type}</CardTitle>
                    <div className="text-2xl font-bold text-primary">{consultation.price}</div>
                    <p className="text-sm text-muted-foreground">{consultation.duration}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">{consultation.description}</p>
                    <ul className="space-y-3">
                      {consultation.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
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

      {/* Benefits Section */}
      <section className="section-padding bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What You'll <span className="gradient-text">Get</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every consultation is designed to provide maximum value and actionable insights for your project
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {consultationBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <benefit.icon className={`w-10 h-10 ${benefit.color} mb-4`} />
                    <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Consultation <span className="gradient-text">Process</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A structured approach to understand your needs and provide valuable insights
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {consultationProcess.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="h-full text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mx-auto mb-4">
                      {step.step}
                    </div>
                    <step.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <Badge variant="outline" className="mb-3">
                      {step.duration}
                    </Badge>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
                {index < consultationProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="section-padding bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How We'll <span className="gradient-text">Connect</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose your preferred method of communication for the consultation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full">
                  <CardContent className="p-6">
                    <method.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">{method.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {method.availability}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What Clients <span className="gradient-text">Say</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Hear from entrepreneurs and businesses who benefited from our consultations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 6).map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic text-sm leading-relaxed">"{testimonial.content}"</p>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground mb-1">{testimonial.role}</p>
                      <Badge variant="outline" className="text-xs">
                        {testimonial.project}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section id="consultation-form" className="section-padding bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Book Your <span className="gradient-text">Free Consultation</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Fill out the form below and I'll get back to you within 2-4 hours to schedule your consultation
            </p>
          </motion.div>

          <ParallaxSection offset={-20}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <MultiStepForm />
            </motion.div>
          </ParallaxSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <CardContent className="p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Don't let your great app idea remain just an idea. Get expert guidance and turn it into a successful
                  mobile application.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="#consultation-form">
                      Book Free Consultation
                      <Calendar className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/#contact">
                      Contact Directly
                      <Mail className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
