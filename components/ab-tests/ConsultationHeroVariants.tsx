"use client"

import { motion } from "framer-motion"
import { Calendar, Star, Users, Award, TrendingUp, Clock } from "lucide-react"
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

export function ConsultationHeroVariantA({ onCTAClick }: { onCTAClick: () => void }) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 pt-16">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Badge variant="outline" className="mb-6 px-4 py-2">
            <Star className="w-4 h-4 mr-2" />
            Free Consultation Available
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Get Expert <span className="gradient-text">Consultation</span>
            <br />
            For Your Next Project
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Transform your ideas into reality with professional guidance. Get personalized advice, technical insights,
            and a clear roadmap for your mobile app or web development project.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" onClick={onCTAClick} className="group">
              <Calendar className="w-5 h-5 mr-2" />
              Book Free Consultation
              <motion.span
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              >
                →
              </motion.span>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <a href="#process">Learn More</a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-primary mb-2">5+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-primary mb-2">24h</div>
              <div className="text-sm text-muted-foreground">Response Time</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function ConsultationHeroVariantB({ onCTAClick }: { onCTAClick: () => void }) {
  return (
    <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 pt-16">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <Badge variant="destructive" className="mb-4 px-4 py-2 animate-pulse">
              <Clock className="w-4 h-4 mr-2" />
              Limited Time: Free Consultation Worth Rs 12,000
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Turn Your Ideas Into
              <span className="gradient-text block">Profitable Apps</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-6">
              Don't waste months figuring it out alone. Get expert guidance that has helped 500+ entrepreneurs build
              successful mobile apps and web platforms.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span>Clear project roadmap in 60 minutes</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span>Accurate cost estimation & timeline</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span>Technology recommendations & best practices</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={onCTAClick} className="group bg-gradient-to-r from-primary to-primary/80">
                <Calendar className="w-5 h-5 mr-2" />
                Claim Your Free Consultation
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                >
                  →
                </motion.span>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              ⚡ Usually Rs 12,000 • Free for limited time • No commitment required
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-card border rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">What You'll Get</h3>
                <p className="text-muted-foreground">In your free consultation</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Market Analysis</h4>
                    <p className="text-sm text-muted-foreground">Competitive landscape & opportunity assessment</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Technical Strategy</h4>
                    <p className="text-sm text-muted-foreground">Architecture design & technology stack</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Project Planning</h4>
                    <p className="text-sm text-muted-foreground">Timeline, milestones & budget breakdown</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">Rs 12,000 Value</div>
                  <div className="text-sm text-muted-foreground">Completely Free</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
