"use client"

import { motion } from "framer-motion"
import { Calendar, ArrowRight, Clock, Star, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface ConsultationCTAVariantsProps {
  variant: "A" | "B"
  onCTAClick: () => void
}

export function ConsultationCTAVariants({ variant, onCTAClick }: ConsultationCTAVariantsProps) {
  if (variant === "A") {
    return <ConsultationCTAVariantA onCTAClick={onCTAClick} />
  }
  return <ConsultationCTAVariantB onCTAClick={onCTAClick} />
}

export function ConsultationCTAVariantA({ onCTAClick }: { onCTAClick: () => void }) {
  return (
    <section className="section-padding bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Start Your <span className="gradient-text">Project Journey</span>?
          </h2>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Book your free consultation today and get expert guidance to turn your ideas into successful digital
            products.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" onClick={onCTAClick} className="group">
              <Calendar className="w-5 h-5 mr-2" />
              Book Free Consultation
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button size="lg" variant="outline" asChild>
              <a href="#testimonials">Read Success Stories</a>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>No commitment required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>100% Free consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Expert guidance</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function ConsultationCTAVariantB({ onCTAClick }: { onCTAClick: () => void }) {
  return (
    <section className="section-padding bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
      <div className="max-w-6xl mx-auto">
        <Card className="border-2 border-red-200 dark:border-red-800 shadow-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 text-center">
              <Badge variant="secondary" className="mb-2 bg-white text-red-600">
                <Clock className="w-3 h-3 mr-1" />
                Limited Time Offer
              </Badge>
              <h3 className="text-lg font-bold">Free Consultation Worth Rs 12,000</h3>
            </div>

            <div className="p-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Don't Let Your Ideas <span className="text-red-600">Remain Just Ideas</span>
                </h2>

                <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
                  Every day you wait is a day your competitors get ahead. Book your free consultation now and get the
                  expert guidance you need to build a successful digital product.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-3">
                      <Star className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold mb-2">Expert Analysis</h4>
                    <p className="text-sm text-muted-foreground">Get professional insights worth Rs 12,000</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold mb-2">Clear Roadmap</h4>
                    <p className="text-sm text-muted-foreground">Step-by-step plan to success</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="font-semibold mb-2">Save Time</h4>
                    <p className="text-sm text-muted-foreground">Avoid costly mistakes and delays</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6 rounded-lg mb-6">
                  <div className="text-2xl font-bold mb-2">⚡ Act Fast - Limited Spots Available</div>
                  <p className="text-primary-foreground/90">
                    Only 5 free consultations available this month. Don't miss your chance to get expert guidance worth
                    Rs 12,000 absolutely free.
                  </p>
                </div>

                <Button
                  size="lg"
                  onClick={onCTAClick}
                  className="group bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-4 text-lg"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Claim Your Free Consultation Now
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </Button>

                <p className="text-sm text-muted-foreground mt-4">
                  ⏰ Offer expires soon • No credit card required • 100% risk-free
                </p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
