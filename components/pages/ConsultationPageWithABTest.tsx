"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
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
  ChevronDown,
  Timer,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useABTest, trackABTestConversion } from "@/hooks/useABTest"
import { ConsultationHeroVariants } from "@/components/ab-tests/ConsultationHeroVariants"
import { ConsultationCTAVariants } from "@/components/ab-tests/ConsultationCTAVariants"
import { ConsultationFormVariants } from "@/components/ab-tests/ConsultationFormVariants"

const consultationBenefits = [
  {
    icon: Target,
    title: "Project Clarity",
    description: "Get clear understanding of your project scope, requirements, and feasibility",
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    hoverColor: "hover:bg-blue-100 dark:hover:bg-blue-900/30",
  },
  {
    icon: TrendingUp,
    title: "Market Analysis",
    description: "Receive insights about your target market and competitive landscape",
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    hoverColor: "hover:bg-green-100 dark:hover:bg-green-900/30",
  },
  {
    icon: Lightbulb,
    title: "Technical Guidance",
    description: "Expert advice on technology stack, architecture, and best practices",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
    hoverColor: "hover:bg-yellow-100 dark:hover:bg-yellow-900/30",
  },
  {
    icon: Shield,
    title: "Risk Assessment",
    description: "Identify potential challenges and mitigation strategies early",
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-950/20",
    hoverColor: "hover:bg-red-100 dark:hover:bg-red-900/30",
  },
  {
    icon: Clock,
    title: "Timeline Planning",
    description: "Realistic project timeline with milestones and deliverables",
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    hoverColor: "hover:bg-purple-100 dark:hover:bg-purple-900/30",
  },
  {
    icon: Award,
    title: "Cost Estimation",
    description: "Transparent pricing breakdown with no hidden costs",
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
    hoverColor: "hover:bg-orange-100 dark:hover:bg-orange-900/30",
  },
]

const consultationProcess = [
  {
    step: 1,
    title: "Initial Discussion",
    duration: "15-20 minutes",
    description: "We'll discuss your project idea, goals, and basic requirements",
    icon: MessageSquare,
    details: ["Project overview", "Business goals", "Target audience", "Basic requirements"],
  },
  {
    step: 2,
    title: "Requirement Analysis",
    duration: "20-25 minutes",
    description: "Deep dive into technical requirements, features, and user experience",
    icon: Target,
    details: ["Feature specifications", "User journey mapping", "Technical constraints", "Integration needs"],
  },
  {
    step: 3,
    title: "Solution Design",
    duration: "15-20 minutes",
    description: "Propose technical solutions, architecture, and development approach",
    icon: Lightbulb,
    details: ["Technology recommendations", "Architecture design", "Development approach", "Best practices"],
  },
  {
    step: 4,
    title: "Project Planning",
    duration: "10-15 minutes",
    description: "Timeline, milestones, pricing, and next steps discussion",
    icon: Calendar,
    details: ["Project timeline", "Milestone planning", "Cost breakdown", "Next steps"],
  },
]

const consultationTypes = [
  {
    type: "Quick Consultation",
    duration: "30 minutes",
    price: "Free",
    originalPrice: "Rs 5,000",
    description: "Perfect for initial project discussion and basic guidance",
    features: [
      "Project feasibility assessment",
      "Basic technical guidance",
      "Rough cost estimation",
      "Technology recommendations",
    ],
    icon: Zap,
    popular: false,
    color: "border-blue-200 hover:border-blue-300",
    savings: "Save Rs 5,000",
  },
  {
    type: "Detailed Consultation",
    duration: "60 minutes",
    price: "Free",
    originalPrice: "Rs 12,000",
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
    color: "border-primary hover:border-primary/80",
    savings: "Save Rs 12,000",
  },
  {
    type: "Follow-up Session",
    duration: "30 minutes",
    price: "Free",
    originalPrice: "Rs 3,000",
    description: "Additional session for clarifications and updates",
    features: [
      "Project updates discussion",
      "Requirement modifications",
      "Technical clarifications",
      "Timeline adjustments",
    ],
    icon: Users,
    popular: false,
    color: "border-green-200 hover:border-green-300",
    savings: "Save Rs 3,000",
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
    avatar: "SM",
    industry: "Healthcare",
  },
  {
    name: "Ahmed Al-Rashid",
    role: "E-commerce Business Owner",
    content:
      "The consultation exceeded my expectations. Muhammad not only analyzed my requirements but also suggested innovative features I hadn't considered. His cost breakdown was transparent and realistic. Highly recommend!",
    rating: 5,
    project: "ShopEase Platform",
    avatar: "AR",
    industry: "E-commerce",
  },
  {
    name: "Jennifer Chen",
    role: "Fitness Industry Entrepreneur",
    content:
      "Professional, knowledgeable, and patient. Muhammad took time to understand my vision and provided valuable insights about user experience and monetization strategies. The consultation was worth every minute.",
    rating: 5,
    project: "FitTracker Pro",
    avatar: "JC",
    industry: "Fitness",
  },
  {
    name: "Omar Hassan",
    role: "Restaurant Chain Owner",
    content:
      "Muhammad's technical guidance was spot-on. He identified potential scalability issues early and proposed solutions that would save us significant costs in the long run. His consultation was a game-changer for our project.",
    rating: 5,
    project: "FoodieHub App",
    avatar: "OH",
    industry: "Food & Beverage",
  },
  {
    name: "Lisa Rodriguez",
    role: "EdTech Startup Co-founder",
    content:
      "The consultation was incredibly valuable. Muhammad helped us refine our concept and provided detailed technical specifications. His experience with educational apps was evident, and his advice was actionable.",
    rating: 5,
    project: "LearnSmart Platform",
    avatar: "LR",
    industry: "Education",
  },
  {
    name: "Khalid Mahmood",
    role: "Real Estate Developer",
    content:
      "Excellent consultation experience. Muhammad understood our complex requirements and suggested a phased development approach that fit our budget perfectly. His expertise in property management apps was impressive.",
    rating: 5,
    project: "PropertyPro Suite",
    avatar: "KM",
    industry: "Real Estate",
  },
]

const contactMethods = [
  {
    icon: Video,
    title: "Video Call",
    description: "Google Meet or Zoom",
    availability: "Preferred method",
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
  },
  {
    icon: Phone,
    title: "Phone Call",
    description: "Voice call discussion",
    availability: "Available on request",
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-950/20",
  },
  {
    icon: Mail,
    title: "Email Discussion",
    description: "Detailed email exchange",
    availability: "For follow-ups",
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
  },
]

const faqs = [
  {
    question: "How long does a consultation take?",
    answer:
      "Consultations range from 30-60 minutes depending on your project complexity. Quick consultations are 30 minutes, while detailed consultations are 60 minutes.",
  },
  {
    question: "What should I prepare for the consultation?",
    answer:
      "Come with your project idea, target audience information, any existing designs or wireframes, and your budget range. The more details you provide, the better guidance I can offer.",
  },
  {
    question: "Will I receive a written summary?",
    answer:
      "Yes! After every consultation, you'll receive a detailed written summary including recommendations, cost estimates, timeline, and next steps within 24 hours.",
  },
  {
    question: "Can I book multiple consultations?",
    answer:
      "You can book follow-up sessions to discuss project updates, requirement changes, or get additional clarifications as your project evolves.",
  },
]

// Enhanced FAQ Component
const FAQItem = ({ faq, index }: { faq: any; index: number }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="border border-border rounded-lg overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <span className="font-medium">{faq.question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-4 pt-0 text-muted-foreground">{faq.answer}</div>
      </motion.div>
    </motion.div>
  )
}

// Enhanced Testimonial Card
const TestimonialCard = ({ testimonial, index }: { testimonial: any; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="h-full hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              {testimonial.avatar}
            </div>
            <div>
              <p className="font-semibold text-sm">{testimonial.name}</p>
              <p className="text-xs text-muted-foreground">{testimonial.role}</p>
              <Badge variant="outline" className="text-xs mt-1">
                {testimonial.industry}
              </Badge>
            </div>
          </div>

          <div className="flex mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </motion.div>
            ))}
          </div>

          <p className="text-muted-foreground mb-4 italic text-sm leading-relaxed">"{testimonial.content}"</p>

          <div className="border-t pt-4">
            <Badge variant="secondary" className="text-xs">
              <Award className="w-3 h-3 mr-1" />
              {testimonial.project}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Floating Action Button
const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const handleClick = () => {
    trackABTestConversion("floating_cta", "click")
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <Button
        size="lg"
        className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 px-6"
        asChild
        onClick={handleClick}
      >
        <Link href="#consultation-form">
          <Calendar className="w-5 h-5 mr-2" />
          Book Now
        </Link>
      </Button>
    </motion.div>
  )
}

export default function ConsultationPageWithABTest() {
  const heroTest = useABTest({
    testName: "consultation_hero",
    variants: { A: { weight: 50 }, B: { weight: 50 } },
  })
  const ctaTest = useABTest({
    testName: "consultation_cta",
    variants: { A: { weight: 50 }, B: { weight: 50 } },
  })
  const formTest = useABTest({
    testName: "consultation_form",
    variants: { A: { weight: 50 }, B: { weight: 50 } },
  })

  useEffect(() => {
    // Track page view
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "page_view", {
        page_title: "Consultation Page",
        page_location: window.location.href,
        hero_variant: heroTest,
        cta_variant: ctaTest,
        form_variant: formTest,
      })
    }
  }, [heroTest, ctaTest, formTest])

  const handleHeroCTA = () => {
    trackABTestConversion("consultation_hero", "hero_cta_click")
    // Scroll to form
    document.getElementById("consultation-form")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleCTAClick = () => {
    trackABTestConversion("consultation_cta", "cta_click")
    // Scroll to form
    document.getElementById("consultation-form")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleFormSubmit = async (formData: any) => {
    try {
      // Track conversion for all tests
      trackABTestConversion("consultation_hero", "form_submit")
      trackABTestConversion("consultation_cta", "form_submit")
      trackABTestConversion("consultation_form", "form_submit")

      // Submit form (implement your form submission logic here)
      console.log("Form submitted:", formData)

      // Show success message or redirect
      alert("Thank you! We'll be in touch within 24 hours.")
    } catch (error) {
      console.error("Form submission error:", error)
      alert("There was an error submitting your form. Please try again.")
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ConsultationHeroVariants variant={heroTest} onCTAClick={handleHeroCTA} />

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
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="relative"
              >
                {consultation.popular && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                    className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10"
                  >
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </motion.div>
                )}

                <Card
                  className={`h-full ${consultation.popular ? "border-primary shadow-lg scale-105" : consultation.color} hover:shadow-xl transition-all duration-300`}
                >
                  <CardHeader className="text-center relative">
                    <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                      <consultation.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    </motion.div>

                    <CardTitle className="text-xl">{consultation.type}</CardTitle>

                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-2xl font-bold text-primary">{consultation.price}</span>
                        <span className="text-sm text-muted-foreground line-through">{consultation.originalPrice}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        <Timer className="w-3 h-3 mr-1" />
                        {consultation.duration}
                      </Badge>
                      <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                        {consultation.savings}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-muted-foreground mb-6 text-center">{consultation.description}</p>
                    <ul className="space-y-3">
                      {consultation.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-2"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <Button
                      className="w-full mt-6 group"
                      asChild
                      onClick={() =>
                        trackABTestConversion(
                          "consultation_types",
                          `select_${consultation.type.toLowerCase().replace(" ", "_")}`,
                        )
                      }
                    >
                      <Link href="#consultation-form">
                        Select This Plan
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
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
                whileHover={{ scale: 1.02 }}
              >
                <Card className={`h-full hover:shadow-lg transition-all duration-300 ${benefit.hoverColor} group`}>
                  <CardContent className="p-6">
                    <div
                      className={`w-16 h-16 rounded-full ${benefit.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
                    </div>
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
      <section id="process" className="section-padding">
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
                whileHover={{ y: -5 }}
                className="relative"
              >
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {step.step}
                    </motion.div>

                    <step.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">{step.title}</h3>

                    <Badge variant="outline" className="mb-3">
                      <Clock className="w-3 h-3 mr-1" />
                      {step.duration}
                    </Badge>

                    <p className="text-sm text-muted-foreground mb-4">{step.description}</p>

                    <div className="space-y-1">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="text-xs text-muted-foreground flex items-center gap-1">
                          <div className="w-1 h-1 bg-primary rounded-full" />
                          {detail}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {index < consultationProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                    >
                      <ArrowRight className="w-6 h-6 text-muted-foreground" />
                    </motion.div>
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
                whileHover={{ scale: 1.05 }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div
                      className={`w-16 h-16 rounded-full ${method.bgColor} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <method.icon className={`w-8 h-8 ${method.color}`} />
                    </div>
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
      <section id="testimonials" className="section-padding">
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
              <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Get answers to common questions about the consultation process
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <div id="consultation-form">
        <ConsultationFormVariants variant={formTest} onSubmit={handleFormSubmit} />
      </div>

      {/* CTA Section */}
      <ConsultationCTAVariants variant={ctaTest} onCTAClick={handleCTAClick} />

      {/* Floating CTA */}
      <FloatingCTA />
    </div>
  )
}

export { ConsultationPageWithABTest }
