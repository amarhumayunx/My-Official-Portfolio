"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Star, Zap, ArrowRight, CheckCircle, Award, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface HeroVariantProps {
  onCTAClick: () => void
}

// Enhanced animations
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
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

// Variant A: Professional Hero
export const HeroVariantA: React.FC<HeroVariantProps> = ({ onCTAClick }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
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
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
          {/* Badge */}
          <motion.div variants={staggerItem} className="flex justify-center">
            <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 text-sm font-medium shadow-lg">
              <Star className="w-4 h-4 mr-2" />
              Professional Consultation Services
            </Badge>
          </motion.div>

          {/* Main Heading */}
          <motion.div variants={staggerItem}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent">
                Expert Mobile App
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Consultation
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={staggerItem}>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Get professional guidance for your mobile app project with comprehensive analysis, technical
              recommendations, and strategic planning from an experienced developer.
            </p>
          </motion.div>

          {/* Features */}
          <motion.div variants={staggerItem}>
            <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
              {[
                { icon: CheckCircle, text: "Free Consultation" },
                { icon: Clock, text: "30-60 Minutes" },
                { icon: Award, text: "Expert Analysis" },
                { icon: Timer, text: "24h Response" },
              ].map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                  className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200/50 dark:border-gray-700/50"
                >
                  <feature.icon className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
              <Button
                size="lg"
                onClick={onCTAClick}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <Calendar className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-200" />
                Book Free Consultation
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 bg-transparent"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div variants={staggerItem} className="pt-8">
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Trusted by 100+ entrepreneurs</p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{
                      delay: 1.5 + i * 0.1,
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400 font-medium">4.9/5 Average Rating</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl shadow-lg opacity-20"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-10 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full shadow-lg opacity-20"
      />
    </section>
  )
}

// Variant B: Urgency Hero
export const HeroVariantB: React.FC<HeroVariantProps> = ({ onCTAClick }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-red-900/20 dark:to-orange-900/20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-400/30 to-orange-600/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-yellow-400/30 to-red-600/30 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
          {/* Urgency Badge */}
          <motion.div variants={staggerItem} className="flex justify-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Badge className="bg-gradient-to-r from-red-500 to-orange-600 text-white px-6 py-2 text-sm font-bold shadow-lg animate-pulse">
                <Zap className="w-4 h-4 mr-2" />
                LIMITED TIME: FREE CONSULTATION
              </Badge>
            </motion.div>
          </motion.div>

          {/* Main Heading with Urgency */}
          <motion.div variants={staggerItem}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
              <span className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                Don't Build Your App
              </span>
              <br />
              <span className="bg-gradient-to-r from-gray-900 to-red-800 dark:from-white dark:to-red-200 bg-clip-text text-transparent">
                Without This!
              </span>
            </h1>
          </motion.div>

          {/* Urgency Subtitle */}
          <motion.div variants={staggerItem}>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 max-w-4xl mx-auto leading-relaxed font-semibold">
              <span className="text-red-600 dark:text-red-400">WARNING:</span> 90% of app projects fail due to poor
              planning. Get expert consultation NOW and avoid costly mistakes that could destroy your project!
            </p>
          </motion.div>

          {/* Urgency Features */}
          <motion.div variants={staggerItem}>
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border-2 border-red-200 dark:border-red-800 max-w-2xl mx-auto">
              <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-4">🚨 What You'll Avoid:</h3>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                {[
                  "❌ Wasting $50,000+ on wrong tech",
                  "❌ 6+ months of development delays",
                  "❌ Building features nobody wants",
                  "❌ Security vulnerabilities",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="text-gray-700 dark:text-gray-300 font-medium"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Countdown Timer Effect */}
          <motion.div variants={staggerItem}>
            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl p-4 max-w-md mx-auto shadow-xl">
              <p className="text-sm font-bold mb-2">⏰ FREE CONSULTATION ENDS SOON!</p>
              <div className="flex justify-center gap-2 text-2xl font-black">
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  24
                </motion.span>
                <span>:</span>
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                >
                  00
                </motion.span>
                <span>:</span>
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                >
                  00
                </motion.span>
              </div>
              <p className="text-xs mt-1">Hours : Minutes : Seconds</p>
            </div>
          </motion.div>

          {/* Urgent CTA */}
          <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(239, 68, 68, 0.7)",
                  "0 0 0 10px rgba(239, 68, 68, 0)",
                  "0 0 0 0 rgba(239, 68, 68, 0)",
                ],
              }}
              style={{ animationDuration: "2s", animationIterationCount: "infinite" }}
            >
              <Button
                size="lg"
                onClick={onCTAClick}
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-4 text-lg font-black rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 group relative overflow-hidden"
              >
                <motion.div
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
                <Zap className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-200" />
                CLAIM FREE CONSULTATION NOW!
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Social Proof with Urgency */}
          <motion.div variants={staggerItem} className="pt-8">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-sm text-green-700 dark:text-green-300 font-bold">
                  🔥 127 consultations booked this week!
                </p>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{
                      delay: 1.5 + i * 0.1,
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400 font-bold">
                  4.9/5 - "Saved my startup!" - Sarah K.
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Urgent floating elements */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          rotate: [0, 15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-red-400 to-orange-500 rounded-2xl shadow-xl opacity-30"
      />
      <motion.div
        animate={{
          y: [0, 25, 0],
          rotate: [0, -15, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full shadow-xl opacity-30"
      />
    </section>
  )
}
