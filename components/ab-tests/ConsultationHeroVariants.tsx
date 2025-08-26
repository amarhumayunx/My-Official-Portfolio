"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, CheckCircle, Star, Zap, Timer, TrendingUp, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface HeroVariantProps {
  onCTAClick: () => void
}

// Variant A: Professional and Value-Focused
export const HeroVariantA = ({ onCTAClick }: HeroVariantProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Badge className="mb-6 px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20">
            <Star className="w-4 h-4 mr-2" />
            Free Professional Consultation
          </Badge>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Transform Your <span className="gradient-text">App Idea</span>
          <br />
          Into Reality
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Get expert guidance on your mobile app project with a comprehensive consultation. From concept validation to
          technical architecture, I'll help you build a roadmap for success.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Button
            size="lg"
            className="px-8 py-4 text-lg font-semibold group hover:scale-105 transition-all duration-300"
            onClick={onCTAClick}
          >
            <Calendar className="w-5 h-5 mr-2" />
            Book Free Consultation
            <motion.div
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            >
              →
            </motion.div>
          </Button>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>30-60 minutes • No commitment required</span>
          </div>
        </motion.div>

        {/* Value Propositions */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {[
            {
              icon: CheckCircle,
              title: "Project Validation",
              description: "Validate your idea and identify potential challenges early",
            },
            {
              icon: TrendingUp,
              title: "Technical Roadmap",
              description: "Get a clear development plan with realistic timelines",
            },
            {
              icon: Award,
              title: "Cost Transparency",
              description: "Receive accurate pricing with no hidden surprises",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-card border hover:shadow-lg transition-all duration-300"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
            >
              <item.icon className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span>50+ Happy Clients</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <span>5+ Years Experience</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-primary" />
            <span>100% Success Rate</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Variant B: Urgency and Scarcity-Focused
export const HeroVariantB = ({ onCTAClick }: HeroVariantProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-50 via-background to-orange-50 dark:from-red-950/20 dark:via-background dark:to-orange-950/20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <motion.div
        className="absolute top-10 left-10 w-64 h-64 bg-red-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-6 px-4 py-2 text-sm font-bold bg-red-500 text-white border-red-600 animate-pulse">
            <Timer className="w-4 h-4 mr-2" />
            LIMITED TIME: Free Consultation Worth Rs 12,000
          </Badge>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span className="text-red-600 dark:text-red-400">STOP</span> Wasting Time!
          <br />
          Get Your App <span className="gradient-text">Built Right</span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-muted-foreground mb-6 max-w-3xl mx-auto leading-relaxed font-medium"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-red-600 font-bold">WARNING:</span> 90% of app projects fail due to poor planning. Don't
          be another statistic! Get expert consultation NOW before it's too late.
        </motion.p>

        <motion.div
          className="bg-yellow-100 dark:bg-yellow-900/20 border-2 border-yellow-400 rounded-lg p-4 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-center gap-2 text-yellow-800 dark:text-yellow-200 font-bold">
            <Timer className="w-5 h-5" />
            <span>URGENT: Only 3 consultation slots left this week!</span>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="px-8 py-4 text-lg font-bold bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
              onClick={onCTAClick}
            >
              <Calendar className="w-5 h-5 mr-2" />
              CLAIM YOUR FREE SLOT NOW!
              <motion.div
                className="ml-2"
                animate={{ x: [0, 8, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
              >
                ⚡
              </motion.div>
            </Button>
          </motion.div>

          <div className="text-center">
            <div className="text-sm text-muted-foreground line-through">Regular Price: Rs 12,000</div>
            <div className="text-lg font-bold text-green-600">TODAY ONLY: FREE</div>
          </div>
        </motion.div>

        {/* Urgency Indicators */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {[
            {
              icon: Timer,
              title: "Act Fast!",
              description: "Limited slots available - book before they're gone",
              color: "text-red-600",
            },
            {
              icon: TrendingUp,
              title: "Instant Results",
              description: "Get immediate clarity on your project's potential",
              color: "text-orange-600",
            },
            {
              icon: Award,
              title: "Risk-Free",
              description: "100% free consultation with no strings attached",
              color: "text-green-600",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-card border-2 border-dashed hover:border-solid hover:shadow-lg transition-all duration-300"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            >
              <item.icon className={`w-8 h-8 ${item.color} mb-3`} />
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Proof with Urgency */}
        <motion.div
          className="mt-12 p-6 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="font-semibold">50+ Success Stories</span>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-700 dark:text-green-300 font-medium">Last booking: 2 hours ago</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Export both variants with proper names
export const ConsultationHeroVariants = ({ variant, onCTAClick }: { variant: string; onCTAClick: () => void }) => {
  if (variant === "hero-b") {
    return <HeroVariantB onCTAClick={onCTAClick} />
  }
  return <HeroVariantA onCTAClick={onCTAClick} />
}
