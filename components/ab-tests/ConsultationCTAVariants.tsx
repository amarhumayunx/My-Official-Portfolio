"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Calendar, ArrowRight, Star, Zap, Clock, CheckCircle, Award, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface CTAVariantProps {
  onCTAClick: () => void
}

// Enhanced animations
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
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
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

// Variant A: Simple CTA
export const CTAVariantA: React.FC<CTAVariantProps> = ({ onCTAClick }) => {
  return (
    <section className="section-padding py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Simple Badge */}
          <motion.div variants={staggerItem}>
            <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 text-sm font-medium shadow-lg">
              <Star className="w-4 h-4 mr-2" />
              Ready to Get Started?
            </Badge>
          </motion.div>

          {/* Simple Heading */}
          <motion.div variants={staggerItem}>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-gray-900 to-blue-800 dark:from-white dark:to-blue-200 bg-clip-text text-transparent">
                Let's Discuss Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Project Today
              </span>
            </h2>
          </motion.div>

          {/* Simple Description */}
          <motion.div variants={staggerItem}>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Schedule your free consultation and get expert guidance for your mobile app project. No commitment
              required.
            </p>
          </motion.div>

          {/* Simple Features */}
          <motion.div variants={staggerItem}>
            <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
              {[
                { icon: CheckCircle, text: "Free Consultation" },
                { icon: Clock, text: "30-60 Minutes" },
                { icon: Award, text: "Expert Guidance" },
              ].map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200/50 dark:border-gray-700/50"
                >
                  <feature.icon className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Simple CTA Button */}
          <motion.div variants={staggerItem}>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
              <Button
                size="lg"
                onClick={onCTAClick}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <Calendar className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-200" />
                Schedule Free Consultation
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Simple Trust Indicator */}
          <motion.div variants={staggerItem}>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </div>
              <span className="font-medium">Trusted by 100+ entrepreneurs</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Variant B: High-pressure CTA
export const CTAVariantB: React.FC<CTAVariantProps> = ({ onCTAClick }) => {
  return (
    <section className="section-padding py-20 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-red-900/20 dark:to-orange-900/20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-400/20 to-orange-600/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Urgent Badge */}
          <motion.div variants={staggerItem}>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Badge className="bg-gradient-to-r from-red-500 to-orange-600 text-white px-8 py-3 text-base font-bold shadow-xl animate-pulse">
                <Zap className="w-5 h-5 mr-2" />
                ⚠️ DON'T WAIT - ACT NOW!
              </Badge>
            </motion.div>
          </motion.div>

          {/* Urgent Heading */}
          <motion.div variants={staggerItem}>
            <h2 className="text-4xl md:text-6xl font-black leading-tight">
              <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Last Chance to Save
              </span>
              <br />
              <span className="bg-gradient-to-r from-gray-900 to-red-800 dark:from-white dark:to-red-200 bg-clip-text text-transparent">
                Your Project!
              </span>
            </h2>
          </motion.div>

          {/* Urgent Description */}
          <motion.div variants={staggerItem}>
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border-2 border-red-200 dark:border-red-800">
              <p className="text-xl text-gray-700 dark:text-gray-200 font-bold leading-relaxed">
                <span className="text-red-600 dark:text-red-400">🚨 URGENT:</span> Every day you delay costs you money!
                Don't join the 90% of failed app projects. Get expert consultation NOW before it's too late!
              </p>
            </div>
          </motion.div>

          {/* Scarcity Indicators */}
          <motion.div variants={staggerItem}>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: Timer, text: "Only 3 Slots Left Today", color: "text-red-600" },
                { icon: Zap, text: "Free Offer Ends Soon", color: "text-orange-600" },
                { icon: Award, text: "Save $10,000+ in Mistakes", color: "text-green-600" },
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border-l-4 border-l-red-500"
                >
                  <item.icon className={`w-6 h-6 ${item.color} mx-auto mb-2`} />
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Countdown Effect */}
          <motion.div variants={staggerItem}>
            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl p-6 shadow-2xl max-w-md mx-auto">
              <p className="text-lg font-black mb-3">⏰ FREE CONSULTATION EXPIRES IN:</p>
              <div className="flex justify-center gap-4 text-3xl font-black">
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    className="bg-white/20 rounded-lg p-2 mb-1"
                  >
                    23
                  </motion.div>
                  <p className="text-xs">HOURS</p>
                </div>
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
                    className="bg-white/20 rounded-lg p-2 mb-1"
                  >
                    47
                  </motion.div>
                  <p className="text-xs">MINUTES</p>
                </div>
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.6 }}
                    className="bg-white/20 rounded-lg p-2 mb-1"
                  >
                    32
                  </motion.div>
                  <p className="text-xs">SECONDS</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* High-pressure CTA */}
          <motion.div variants={staggerItem}>
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(239, 68, 68, 0.7)",
                  "0 0 0 15px rgba(239, 68, 68, 0)",
                  "0 0 0 0 rgba(239, 68, 68, 0)",
                ],
              }}
              style={{
                animationDuration: "2s",
                animationIterationCount: "infinite",
              }}
            >
              <Button
                size="lg"
                onClick={onCTAClick}
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-12 py-6 text-xl font-black rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 group relative overflow-hidden"
              >
                <motion.div
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
                <Zap className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-200" />
                CLAIM YOUR FREE CONSULTATION NOW!
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Urgent Social Proof */}
          <motion.div variants={staggerItem}>
            <div className="space-y-4">
              <div className="flex justify-center items-center gap-2 bg-green-100 dark:bg-green-900/30 px-6 py-3 rounded-full">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-sm text-green-700 dark:text-green-300 font-bold">
                  🔥 Sarah just booked her consultation 2 minutes ago!
                </p>
              </div>

              <div className="flex items-center justify-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1, duration: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 font-bold">
                  4.9/5 - "This saved my startup $50K!" - Mike T.
                </span>
              </div>
            </div>
          </motion.div>

          {/* Risk Reversal */}
          <motion.div variants={staggerItem}>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 border-2 border-yellow-300 dark:border-yellow-700 rounded-xl p-4 max-w-2xl mx-auto">
              <p className="text-sm text-yellow-800 dark:text-yellow-200 font-bold">
                ⚡ 100% FREE - No Credit Card Required - No Strings Attached ⚡
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
