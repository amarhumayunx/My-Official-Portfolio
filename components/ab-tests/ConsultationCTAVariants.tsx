"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, CheckCircle, Star, Zap, Timer, ArrowRight, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface CTAVariantProps {
  onCTAClick: () => void
}

// Variant A: Simple and Professional CTA
export const CTAVariantA = ({ onCTAClick }: CTAVariantProps) => {
  return (
    <section className="section-padding bg-gradient-to-r from-primary/5 via-background to-primary/5">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Start Your <span className="gradient-text">App Journey</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Book your free consultation today and get expert guidance on turning your app idea into a successful
            product.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              size="lg"
              className="px-8 py-4 text-lg font-semibold group hover:scale-105 transition-all duration-300"
              onClick={onCTAClick}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Free Consultation
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>30-60 minutes • Completely free</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>No commitment required</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-500" />
              <span>100% confidential</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>Expert guidance</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Variant B: High-Pressure Sales CTA
export const CTAVariantB = ({ onCTAClick }: CTAVariantProps) => {
  return (
    <section className="section-padding bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 dark:from-red-950/20 dark:via-orange-950/20 dark:to-yellow-950/20 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "linear" }}
      />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Badge className="mb-4 px-4 py-2 text-sm font-bold bg-red-600 text-white animate-pulse">
            <Timer className="w-4 h-4 mr-2" />
            FINAL WARNING: Offer Expires Soon!
          </Badge>

          <h2 className="text-3xl sm:text-5xl font-black mb-6 leading-tight">
            <span className="text-red-600">DON'T MISS OUT!</span>
            <br />
            Last Chance for <span className="gradient-text">FREE</span> Expert Consultation
          </h2>

          <div className="bg-yellow-100 dark:bg-yellow-900/30 border-2 border-yellow-400 rounded-lg p-6 mb-8 max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 mb-2">WITHOUT CONSULTATION</div>
                <ul className="text-sm text-left space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-red-500">❌</span>
                    <span>90% chance of project failure</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-500">❌</span>
                    <span>Waste $10,000+ on wrong approach</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-500">❌</span>
                    <span>Months of development delays</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-500">❌</span>
                    <span>Technical debt and scalability issues</span>
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">WITH OUR CONSULTATION</div>
                <ul className="text-sm text-left space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✅</span>
                    <span>Clear roadmap to success</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✅</span>
                    <span>Save thousands in development costs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✅</span>
                    <span>Avoid common pitfalls</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✅</span>
                    <span>Future-proof architecture</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <Card className="border-4 border-red-500 bg-red-50 dark:bg-red-950/20 mb-8 max-w-2xl mx-auto">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-lg font-bold text-red-600 mb-2">⚠️ URGENT NOTICE ⚠️</div>
                <p className="text-sm mb-4">
                  This free consultation offer (worth Rs 12,000) is ending soon. Only{" "}
                  <span className="font-bold text-red-600">2 slots remaining</span> this week!
                </p>
                <div className="flex justify-center items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span>High demand</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                    <span>Limited availability</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>Book now</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="px-12 py-6 text-xl font-black bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 animate-pulse border-4 border-yellow-400"
                onClick={onCTAClick}
              >
                <Zap className="w-6 h-6 mr-3" />
                SECURE MY FREE SLOT NOW!
                <motion.div
                  className="ml-3"
                  animate={{ x: [0, 10, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                >
                  🚀
                </motion.div>
              </Button>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto text-sm">
            <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-lg border border-green-300">
              <div className="font-bold text-green-700 dark:text-green-300 mb-1">💰 SAVE MONEY</div>
              <div className="text-green-600 dark:text-green-400">
                Avoid costly mistakes that could cost you $10,000+
              </div>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-300">
              <div className="font-bold text-blue-700 dark:text-blue-300 mb-1">⏰ SAVE TIME</div>
              <div className="text-blue-600 dark:text-blue-400">Get months of research done in 60 minutes</div>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-300">
              <div className="font-bold text-purple-700 dark:text-purple-300 mb-1">🎯 GUARANTEE SUCCESS</div>
              <div className="text-purple-600 dark:text-purple-400">
                100% success rate with our consultation clients
              </div>
            </div>
          </div>

          <motion.div
            className="mt-8 p-4 bg-yellow-200 dark:bg-yellow-900/30 border-2 border-yellow-500 rounded-lg max-w-xl mx-auto"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          >
            <div className="text-sm font-bold text-yellow-800 dark:text-yellow-200">
              ⚡ BONUS: Book in the next 24 hours and get a FREE project timeline worth Rs 5,000!
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Export both variants with proper names
export const ConsultationCTAVariants = ({ variant, onCTAClick }: { variant: string; onCTAClick: () => void }) => {
  if (variant === "cta-b") {
    return <CTAVariantB onCTAClick={onCTAClick} />
  }
  return <CTAVariantA onCTAClick={onCTAClick} />
}
