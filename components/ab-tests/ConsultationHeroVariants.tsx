"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Calendar, Clock, Shield, Star, Users, Zap } from "lucide-react"

interface HeroVariantProps {
  onCTAClick: () => void
}

export const HeroVariantA: React.FC<HeroVariantProps> = ({ onCTAClick }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Transform Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {" "}
                Digital Vision
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Get expert consultation on mobile app development, AI integration, and digital transformation. Let's build
              something extraordinary together.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Shield className="w-5 h-5 text-green-500" />
              <span>Trusted by 100+ clients</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>5.0 average rating</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Clock className="w-5 h-5 text-blue-500" />
              <span>24/7 support</span>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onClick={onCTAClick}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Schedule Free Consultation
          </motion.button>
        </div>
      </div>
    </section>
  )
}

export const HeroVariantB: React.FC<HeroVariantProps> = ({ onCTAClick }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-red-900 dark:to-orange-900">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Zap className="w-4 h-4" />
              LIMITED TIME: 50% OFF CONSULTATION
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="text-red-600">URGENT:</span> Don't Let Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                {" "}
                Competitors Win
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              <strong>Only 3 spots left this month!</strong> Get the mobile app that will 10X your business before your
              competition does. Act NOW or lose customers forever.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6 mb-8"
          >
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow">
              <Users className="w-5 h-5 text-green-500" />
              <span>
                <strong>500+</strong> successful projects
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>
                <strong>98%</strong> client satisfaction
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow">
              <Calendar className="w-5 h-5 text-red-500" />
              <span>
                <strong>48 hours</strong> response time
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-yellow-100 dark:bg-yellow-900 border-2 border-yellow-400 rounded-lg p-6 mb-8 max-w-2xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-yellow-800 dark:text-yellow-200 mb-2">
              ⚡ FLASH SALE ENDING SOON! ⚡
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              <strong>Save $2,500</strong> on your project when you book in the next 24 hours. This offer expires at
              midnight!
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onClick={onCTAClick}
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-12 py-6 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl animate-pulse"
          >
            🔥 CLAIM YOUR SPOT NOW - ONLY 3 LEFT! 🔥
          </motion.button>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            ⏰ Offer expires in: <strong className="text-red-600">23:59:45</strong>
          </p>
        </div>
      </div>
    </section>
  )
}
