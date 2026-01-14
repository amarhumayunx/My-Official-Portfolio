"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
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
  ArrowLeft,
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
  Loader2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useABTest } from "@/hooks/useABTest"
import { HeroVariantA, HeroVariantB } from "@/components/ab-tests/ConsultationHeroVariants"
import { CTAVariantA, CTAVariantB } from "@/components/ab-tests/ConsultationCTAVariants"
import { FormVariantA, FormVariantB } from "@/components/ab-tests/ConsultationFormVariants"
import Link from "next/link"

// Smooth loading component
const SmoothLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="w-16 h-16 mx-auto mb-4"
      >
        <Loader2 className="w-16 h-16 text-blue-600" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
      >
        Optimizing Your Experience
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-gray-600 dark:text-gray-300"
      >
        Personalizing content just for you...
      </motion.p>
    </motion.div>
  </div>
)

// Enhanced smooth animations for sections
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const staggerItem = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

// Rest of the consultation data remains the same...
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

// Enhanced FAQ Component with smoother animations
const FAQItem = ({ faq, index }: { faq: any; index: number }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      variants={staggerItem}
      className="border border-border rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/30 transition-colors duration-200"
        whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
        whileTap={{ scale: 0.995 }}
      >
        <span className="font-semibold text-gray-900 dark:text-white">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-muted-foreground leading-relaxed">{faq.answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Enhanced Testimonial Card with smoother hover effects
const TestimonialCard = ({ testimonial, index }: { testimonial: any; index: number }) => {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
      }}
      className="h-full"
    >
      <Card className="h-full hover:shadow-2xl transition-all duration-500 border-l-4 border-l-primary bg-white dark:bg-gray-800 overflow-hidden">
        <CardContent className="p-6">
          <motion.div
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center font-bold shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              {testimonial.avatar}
            </motion.div>
            <div>
              <p className="font-semibold text-sm text-gray-900 dark:text-white">{testimonial.name}</p>
              <p className="text-xs text-muted-foreground">{testimonial.role}</p>
              <Badge variant="outline" className="text-xs mt-1 border-primary/20 text-primary">
                {testimonial.industry}
              </Badge>
            </div>
          </motion.div>

          <motion.div
            className="flex mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            {[...Array(testimonial.rating)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  delay: index * 0.1 + 0.4 + i * 0.1,
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            className="text-muted-foreground mb-4 italic text-sm leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            "{testimonial.content}"
          </motion.p>

          <motion.div
            className="border-t pt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.6 }}
          >
            <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
              <Award className="w-3 h-3 mr-1" />
              {testimonial.project}
            </Badge>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Enhanced Floating Action Button with smoother animations
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
    const formElement = document.getElementById("consultation-form")
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 100 }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className="fixed bottom-6 right-6 z-50"
        >
          <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
            <Button
              size="lg"
              className="rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 border-2 border-white/20 backdrop-blur-sm"
              onClick={handleClick}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <Calendar className="w-5 h-5 mr-2" />
              </motion.div>
              Book Now
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Test configurations
const HERO_TEST_CONFIG = {
  testId: "consultation_hero_test",
  variants: [
    { id: "hero_a", name: "Professional Hero", weight: 50 },
    { id: "hero_b", name: "Urgency Hero", weight: 50 },
  ],
}

const CTA_TEST_CONFIG = {
  testId: "consultation_cta_test",
  variants: [
    { id: "cta_a", name: "Simple CTA", weight: 50 },
    { id: "cta_b", name: "High-pressure CTA", weight: 50 },
  ],
}

const FORM_TEST_CONFIG = {
  testId: "consultation_form_test",
  variants: [
    { id: "form_a", name: "Standard Form", weight: 50 },
    { id: "form_b", name: "Enhanced Form", weight: 50 },
  ],
}

export const ConsultationPageWithABTest: React.FC = () => {
  const heroTest = useABTest(HERO_TEST_CONFIG)
  const ctaTest = useABTest(CTA_TEST_CONFIG)
  const formTest = useABTest(FORM_TEST_CONFIG)

  // Track page views when tests are ready
  useEffect(() => {
    if (heroTest.isReady && ctaTest.isReady && formTest.isReady) {
      // Smooth tracking with slight delays
      setTimeout(() => heroTest.trackView(), 100)
      setTimeout(() => ctaTest.trackView(), 200)
      setTimeout(() => formTest.trackView(), 300)
    }
  }, [heroTest.isReady, ctaTest.isReady, formTest.isReady])

  const handleCTAClick = () => {
    // Smooth conversion tracking
    requestAnimationFrame(() => {
      heroTest.trackConversion("cta_click")
      ctaTest.trackConversion("cta_click")
    })

    // Smooth scroll to form
    const formElement = document.getElementById("consultation-form")
    if (formElement) {
      formElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      })
    }
  }

  const handleFormSubmit = async (formData: any) => {
    try {
      // Smooth conversion tracking
      requestAnimationFrame(() => {
        heroTest.trackConversion("form_submit")
        ctaTest.trackConversion("form_submit")
        formTest.trackConversion("form_submit")
      })

      // Simulate form submission with smooth feedback
      console.log("Form submitted:", formData)

      // Show smooth success message
      alert("Thank you! We'll get back to you within 24 hours.")
    } catch (error) {
      console.error("Form submission error:", error)
      alert("There was an error submitting your form. Please try again.")
    }
  }

  // Show smooth loading state while tests are initializing
  if (!heroTest.isReady || !ctaTest.isReady || !formTest.isReady) {
    return <SmoothLoader />
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Back to Home Button - Top Right Corner */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50"
      >
        <Button
          asChild
          variant="outline"
          className="backdrop-blur-xl bg-white/85 dark:bg-zinc-900/85 border-zinc-200/30 dark:border-zinc-800/30 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl px-4 py-2 sm:px-5 sm:py-2.5 group"
        >
          <Link href="/" className="flex items-center gap-2 text-sm sm:text-base font-medium">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Main Homepage Portfolio</span>
            <span className="sm:hidden">Home</span>
          </Link>
        </Button>
      </motion.div>

      {/* Hero Section A/B Test with smooth transitions */}
      <AnimatePresence mode="wait">
        {heroTest.variant === "hero_a" ? (
          <motion.div
            key="hero-a"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <HeroVariantA onCTAClick={handleCTAClick} />
          </motion.div>
        ) : (
          <motion.div
            key="hero-b"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <HeroVariantB onCTAClick={handleCTAClick} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Consultation Types with enhanced animations */}
      <section className="section-padding py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Choose Your{" "}
              <span className="gradient-text bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Consultation Type
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select the consultation format that best fits your needs and project complexity
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            {consultationTypes.map((consultation, index) => (
              <motion.div
                key={consultation.type}
                variants={staggerItem}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
                }}
                className="relative"
              >
                <AnimatePresence>
                  {consultation.popular && (
                    <motion.div
                      initial={{ scale: 0, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      transition={{
                        delay: 0.5 + index * 0.1,
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10"
                    >
                      <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-1 shadow-lg">
                        <Star className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Card
                  className={`h-full ${consultation.popular ? "border-primary shadow-xl scale-105 bg-gradient-to-br from-white to-primary/5 dark:from-gray-800 dark:to-primary/10" : consultation.color} hover:shadow-2xl transition-all duration-500 overflow-hidden`}
                >
                  <CardHeader className="text-center relative">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <consultation.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    </motion.div>

                    <CardTitle className="text-xl font-bold">{consultation.type}</CardTitle>

                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-2xl font-bold text-primary">{consultation.price}</span>
                        <span className="text-sm text-muted-foreground line-through">{consultation.originalPrice}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        <Timer className="w-3 h-3 mr-1" />
                        {consultation.duration}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-xs text-green-600 border-green-200 bg-green-50 dark:bg-green-900/20"
                      >
                        {consultation.savings}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-muted-foreground mb-6 text-center leading-relaxed">{consultation.description}</p>
                    <ul className="space-y-3">
                      {consultation.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1, duration: 0.4 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-2"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                      <Button
                        className="w-full mt-6 group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
                        onClick={() =>
                          heroTest.trackConversion(`select_${consultation.type.toLowerCase().replace(" ", "_")}`)
                        }
                      >
                        Select This Plan
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section with enhanced animations */}
      <section className="section-padding py-20 bg-gradient-to-br from-muted/30 via-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What You'll{" "}
              <span className="gradient-text bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Get
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every consultation is designed to provide maximum value and actionable insights for your project
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {consultationBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                variants={staggerItem}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
                }}
              >
                <Card
                  className={`h-full hover:shadow-2xl transition-all duration-500 ${benefit.hoverColor} group overflow-hidden bg-white dark:bg-gray-800`}
                >
                  <CardContent className="p-6">
                    <motion.div
                      className={`w-16 h-16 rounded-full ${benefit.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      whileHover={{ rotate: 10 }}
                    >
                      <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section with enhanced step animations */}
      <section id="process" className="section-padding py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Consultation{" "}
              <span className="gradient-text bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Process
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A structured approach to understand your needs and provide valuable insights
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {consultationProcess.map((step, index) => (
              <motion.div
                key={step.step}
                variants={staggerItem}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative"
              >
                <Card className="h-full text-center hover:shadow-2xl transition-all duration-500 group bg-white dark:bg-gray-800 overflow-hidden">
                  <CardContent className="p-6">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center font-bold text-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      {step.step}
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.2 }}>
                      <step.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    </motion.div>
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{step.title}</h3>

                    <Badge variant="outline" className="mb-3 border-primary/20 text-primary">
                      <Clock className="w-3 h-3 mr-1" />
                      {step.duration}
                    </Badge>

                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{step.description}</p>

                    <div className="space-y-1">
                      {step.details.map((detail, idx) => (
                        <motion.div
                          key={idx}
                          className="text-xs text-muted-foreground flex items-center gap-1"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="w-1 h-1 bg-primary rounded-full" />
                          {detail}
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {index < consultationProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <motion.div
                      animate={{ x: [0, 8, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-6 h-6 text-primary/60" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Methods with smooth hover effects */}
      <section className="section-padding py-20 bg-gradient-to-br from-muted/30 via-background to-muted/20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How We'll{" "}
              <span className="gradient-text bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Connect
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose your preferred method of communication for the consultation
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                variants={staggerItem}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
                }}
              >
                <Card className="text-center h-full hover:shadow-2xl transition-all duration-500 group bg-white dark:bg-gray-800 overflow-hidden">
                  <CardContent className="p-6">
                    <motion.div
                      className={`w-16 h-16 rounded-full ${method.bgColor} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      whileHover={{ rotate: 10 }}
                    >
                      <method.icon className={`w-8 h-8 ${method.color}`} />
                    </motion.div>
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{method.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                    <Badge variant="outline" className="text-xs border-primary/20 text-primary">
                      {method.availability}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials with enhanced animations */}
      <section id="testimonials" className="section-padding py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What Clients{" "}
              <span className="gradient-text bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Say
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Hear from entrepreneurs and businesses who benefited from our consultations
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {testimonials.slice(0, 6).map((testimonial, index) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section with smooth animations */}
      <section className="section-padding py-20 bg-gradient-to-br from-muted/30 via-background to-muted/20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Frequently Asked{" "}
              <span className="gradient-text bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Get answers to common questions about the consultation process
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Form Section A/B Test with smooth transitions */}
      <div id="consultation-form">
        <AnimatePresence mode="wait">
          {formTest.variant === "form_a" ? (
            <motion.div
              key="form-a"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <FormVariantA onSubmit={handleFormSubmit} />
            </motion.div>
          ) : (
            <motion.div
              key="form-b"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <FormVariantB onSubmit={handleFormSubmit} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA Section A/B Test with smooth transitions */}
      <AnimatePresence mode="wait">
        {ctaTest.variant === "cta_a" ? (
          <motion.div
            key="cta-a"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <CTAVariantA onCTAClick={handleCTAClick} />
          </motion.div>
        ) : (
          <motion.div
            key="cta-b"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <CTAVariantB onCTAClick={handleCTAClick} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Floating CTA */}
      <FloatingCTA />
    </div>
  )
}

// Named export for the component
export { ConsultationPageWithABTest as default }
