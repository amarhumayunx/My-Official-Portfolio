"use client"

import type React from "react"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Clock, Shield, Star, Users, Zap } from "lucide-react"

interface CTAVariantProps {
  onCTAClick: () => void
}

export const CTAVariantA: React.FC<CTAVariantProps> = ({ onCTAClick }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Start Your Project?</h2>

            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss your vision and create a roadmap for success. Book a free consultation to get started.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Free Consultation</h3>
              <p className="text-blue-100 text-sm">No commitment, just valuable insights</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Quick Response</h3>
              <p className="text-blue-100 text-sm">Get back to you within 24 hours</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Shield className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Expert Guidance</h3>
              <p className="text-blue-100 text-sm">Professional advice tailored to you</p>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onClick={onCTAClick}
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
          >
            Schedule Consultation
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </section>
  )
}

export const CTAVariantB: React.FC<CTAVariantProps> = ({ onCTAClick }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 dark:from-red-800 dark:via-orange-800 dark:to-yellow-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-6 animate-bounce">
              <Zap className="w-5 h-5" />
              LAST CHANCE - OFFER EXPIRES TONIGHT!
            </div>

            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">🚨 DON'T MISS OUT! 🚨</h2>

            <p className="text-2xl text-yellow-100 mb-4 font-bold">
              Your competitors are booking consultations RIGHT NOW!
            </p>

            <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
              <strong>WARNING:</strong> Every day you wait is another day your competition gets ahead. Book NOW and get
              a <strong className="text-yellow-300">$5,000 development credit</strong>
              absolutely FREE!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-4xl mx-auto shadow-2xl"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">🎁 EXCLUSIVE BONUS PACKAGE (Worth $15,000)</h3>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-green-500 rounded-full p-2">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-900">FREE App Store Optimization</h4>
                  <p className="text-gray-600">$3,000 value - Get your app discovered</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-500 rounded-full p-2">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-900">FREE 6-Month Maintenance</h4>
                  <p className="text-gray-600">$7,000 value - Keep your app running smooth</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-500 rounded-full p-2">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-900">FREE Marketing Strategy</h4>
                  <p className="text-gray-600">$2,500 value - Launch with impact</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-500 rounded-full p-2">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-900">FREE Priority Support</h4>
                  <p className="text-gray-600">$2,500 value - 24/7 dedicated help</p>
                </div>
              </div>
            </div>

            <div className="bg-red-100 border-2 border-red-400 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Users className="w-8 h-8 text-red-600" />
                <div className="text-left">
                  <p className="text-red-800 font-bold text-lg">127 people viewed this page today</p>
                  <p className="text-red-600">Only 2 consultation slots remaining!</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <Star className="w-6 h-6 text-yellow-500" />
                <p className="text-gray-700">
                  <strong>"Best decision I ever made for my business!"</strong> - Sarah M., CEO
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <button
              onClick={onCTAClick}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-16 py-6 rounded-2xl text-2xl font-black transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-3xl animate-pulse inline-flex items-center gap-4"
            >
              💰 CLAIM $15,000 BONUS NOW! 💰
              <ArrowRight className="w-8 h-8" />
            </button>

            <p className="text-white text-lg">
              ⏰ <strong>HURRY!</strong> Timer: <span className="text-yellow-300 font-mono text-xl">23:47:12</span>
            </p>

            <p className="text-orange-200 text-sm">
              * Limited to first 50 customers. No credit card required. 100% satisfaction guaranteed.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
