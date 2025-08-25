"use client"

import { motion } from "framer-motion"
import { Calendar, Star, CheckCircle, Zap, Clock, Award, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ConsultationHeroVariantsProps {
  variant: "A" | "B"
  onCTAClick: () => void
}

export function ConsultationHeroVariants({ variant, onCTAClick }: ConsultationHeroVariantsProps) {
  if (variant === "A") {
    return <ConsultationHeroVariantA onCTAClick={onCTAClick} />
  }
  return <ConsultationHeroVariantB onCTAClick={onCTAClick} />
}

function ConsultationHeroVariantA({ onCTAClick }: { onCTAClick: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Badge variant="outline" className="mb-6 px-4 py-2">
            <Star className="w-4 h-4 mr-2" />
            Free Professional Consultation
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Get Expert Guidance for Your <span className="gradient-text">Next Project</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Schedule a free consultation to discuss your app idea, get technical guidance, and receive a detailed
            project roadmap from an experienced developer.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" onClick={onCTAClick} className="px-8 py-6 text-lg group">
              <Calendar className="w-5 h-5 mr-2" />
              Book Free Consultation
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>No commitment required</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Clock,
                title: "60-Minute Session",
                description: "Comprehensive project discussion",
              },
              {
                icon: Award,
                title: "Expert Analysis",
                description: "Professional technical guidance",
              },
              {
                icon: CheckCircle,
                title: "Detailed Roadmap",
                description: "Clear next steps and timeline",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-card/50 backdrop-blur-sm border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
              >
                <feature.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ConsultationHeroVariantB({ onCTAClick }: { onCTAClick: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Badge variant="destructive" className="mb-6 px-4 py-2 animate-pulse">
            <Zap className="w-4 h-4 mr-2" />
            Worth Rs 12,000 - FREE for Limited Time
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Turn Your App Idea Into a <span className="gradient-text">Profitable Reality</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Join 500+ successful entrepreneurs who got expert guidance worth Rs 12,000 absolutely free. Limited slots
            available - claim yours now!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              onClick={onCTAClick}
              className="px-8 py-6 text-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 group"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Claim Your FREE Rs 12,000 Consultation
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12 text-sm">
            {[
              "✅ No spam, ever",
              "✅ 100% confidential",
              "✅ No commitment required",
              "✅ 24-hour response guarantee",
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                className="bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 px-3 py-1 rounded-full border border-green-200 dark:border-green-800"
              >
                {benefit}
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Star,
                title: "Project Analysis",
                description: "Complete feasibility study",
                value: "Rs 3,000",
              },
              {
                icon: Award,
                title: "Technical Roadmap",
                description: "Detailed development plan",
                value: "Rs 4,000",
              },
              {
                icon: CheckCircle,
                title: "Cost Breakdown",
                description: "Transparent pricing",
                value: "Rs 2,500",
              },
              {
                icon: Clock,
                title: "Risk Assessment",
                description: "Challenge identification",
                value: "Rs 2,500",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-card/50 backdrop-blur-sm border rounded-lg p-6 hover:shadow-lg transition-all duration-300 group"
              >
                <feature.icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{feature.description}</p>
                <Badge variant="outline" className="text-xs">
                  Value: {feature.value}
                </Badge>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/20 max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="w-5 h-5 text-primary" />
              <span className="font-semibold">Total Value: Rs 12,000</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Professional consultation normally costs Rs 12,000. Get it absolutely free for a limited time.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
