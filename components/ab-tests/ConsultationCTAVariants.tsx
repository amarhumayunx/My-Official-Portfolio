"use client"

import { motion } from "framer-motion"
import { Calendar, ArrowRight, CheckCircle, Clock, Star, Zap } from "lucide-react"
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

function ConsultationCTAVariantA({ onCTAClick }: { onCTAClick: () => void }) {
  return (
    <section className="section-padding bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Start Your <span className="gradient-text">Project?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Book your free consultation today and take the first step towards bringing your app idea to life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button size="lg" onClick={onCTAClick} className="px-8 py-6 text-lg group">
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Free Consultation
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Free consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>60-minute session</span>
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

function ConsultationCTAVariantB({ onCTAClick }: { onCTAClick: () => void }) {
  return (
    <section className="section-padding bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="destructive" className="mb-4 px-4 py-2 animate-pulse">
            <Zap className="w-4 h-4 mr-2" />
            Only 5 Slots Left This Week!
          </Badge>

          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Don't Let Your Million-Dollar Idea <span className="gradient-text">Slip Away</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            Every day you wait is a day your competitors get ahead. Join the entrepreneurs who took action and turned
            their ideas into profitable businesses.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="border-2 border-primary/20 shadow-xl">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-primary mb-2">Rs 12,000</div>
                  <div className="text-sm text-muted-foreground mb-4">Professional Consultation Value</div>
                  <Badge className="bg-green-500 text-white px-4 py-2">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    100% FREE Today
                  </Badge>
                </div>

                <div className="space-y-4 mb-6">
                  {[
                    "Complete project feasibility analysis",
                    "Technology stack recommendations",
                    "Detailed cost breakdown",
                    "Risk assessment and mitigation",
                    "Market analysis and insights",
                    "Written summary within 24 hours",
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-800 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-red-500" />
                    <span className="font-medium text-red-700 dark:text-red-300 text-sm">Limited Time Offer</span>
                  </div>
                  <p className="text-xs text-red-600 dark:text-red-400">
                    This free consultation offer expires in 48 hours. Only 5 slots remaining this week.
                  </p>
                </div>

                <Button
                  size="lg"
                  onClick={onCTAClick}
                  className="w-full py-6 text-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 group"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Claim Your FREE Rs 12,000 Consultation
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-bold text-green-700 dark:text-green-300 mb-3">Success Stories</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>"Saved me 6 months of research" - Sarah M.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>"ROI was 10x within first year" - Ahmed K.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>"Best investment decision ever" - Lisa R.</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-3">What Happens Next?</h3>
              <div className="space-y-2 text-sm text-blue-600 dark:text-blue-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>We'll contact you within 24 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>Schedule at your convenient time</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>Receive detailed project roadmap</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">🔒 Your information is 100% secure</div>
              <div className="flex justify-center gap-4 text-xs text-muted-foreground">
                <span>✓ No spam</span>
                <span>✓ No commitment</span>
                <span>✓ Completely confidential</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
