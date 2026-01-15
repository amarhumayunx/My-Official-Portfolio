"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  Zap,
  Star,
  CheckCircle,
  ArrowRight,
  Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FormVariantProps {
  onSubmit: (formData: any) => void
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

// Variant A: Standard Form
export const FormVariantA: React.FC<FormVariantProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
    preferredTime: "",
    newsletter: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onSubmit(formData)
    setIsSubmitting(false)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section className="section-padding py-20 section-bg">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
          {/* Header */}
          <motion.div variants={staggerItem} className="text-center mb-12">
            <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 text-sm font-medium shadow-lg mb-4">
              <Calendar className="w-4 h-4 mr-2" />
              Book Your Consultation
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 to-blue-800 dark:from-white dark:to-blue-200 bg-clip-text text-transparent">
                Schedule Your Free
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Consultation
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Fill out the form below and we'll get back to you within 24 hours to schedule your consultation.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div variants={staggerItem}>
            <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Full Name *
                      </Label>
                      <div className="relative mt-2">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="pl-10 h-12 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </motion.div>

                    {/* Email */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <Label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Email Address *
                      </Label>
                      <div className="relative mt-2">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="pl-10 h-12 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg"
                          placeholder="Enter your email address"
                        />
                      </div>
                    </motion.div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Phone */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Phone Number
                      </Label>
                      <div className="relative mt-2">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="pl-10 h-12 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </motion.div>

                    {/* Project Type */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Project Type *</Label>
                      <Select
                        value={formData.projectType}
                        onValueChange={(value) => handleInputChange("projectType", value)}
                      >
                        <SelectTrigger className="h-12 mt-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg">
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mobile-app">Mobile App</SelectItem>
                          <SelectItem value="web-app">Web Application</SelectItem>
                          <SelectItem value="e-commerce">E-commerce</SelectItem>
                          <SelectItem value="saas">SaaS Platform</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Budget */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Budget Range</Label>
                      <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                        <SelectTrigger className="h-12 mt-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-10k">Under $10,000</SelectItem>
                          <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                          <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                          <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                          <SelectItem value="over-100k">Over $100,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>

                    {/* Timeline */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Timeline</Label>
                      <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                        <SelectTrigger className="h-12 mt-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg">
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asap">ASAP</SelectItem>
                          <SelectItem value="1-3-months">1-3 months</SelectItem>
                          <SelectItem value="3-6-months">3-6 months</SelectItem>
                          <SelectItem value="6-12-months">6-12 months</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </div>

                  {/* Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    viewport={{ once: true }}
                  >
                    <Label htmlFor="description" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Project Description *
                    </Label>
                    <div className="relative mt-2">
                      <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Textarea
                        id="description"
                        required
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        className="pl-10 pt-3 min-h-[120px] border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg resize-none"
                        placeholder="Tell us about your project, goals, and any specific requirements..."
                      />
                    </div>
                  </motion.div>

                  {/* Newsletter */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id="newsletter"
                      checked={formData.newsletter}
                      onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
                    />
                    <Label htmlFor="newsletter" className="text-sm text-gray-600 dark:text-gray-400">
                      Subscribe to our newsletter for development tips and updates
                    </Label>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    viewport={{ once: true }}
                    className="pt-4"
                  >
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          >
                            <Clock className="w-5 h-5 mr-2" />
                          </motion.div>
                        ) : (
                          <Calendar className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-200" />
                        )}
                        {isSubmitting ? "Scheduling..." : "Schedule Free Consultation"}
                        {!isSubmitting && (
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                        )}
                      </Button>
                    </motion.div>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div variants={staggerItem} className="text-center mt-8 space-y-4">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>100% Free Consultation</span>
              <span className="mx-2">•</span>
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>No Commitment Required</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Trusted by 100+ entrepreneurs</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Variant B: Enhanced Form with urgency and social proof
export const FormVariantB: React.FC<FormVariantProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
    preferredTime: "",
    newsletter: false,
    urgency: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    onSubmit(formData)
    setIsSubmitting(false)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section className="section-padding py-20 section-bg relative overflow-hidden">
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

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
          {/* Urgent Header */}
          <motion.div variants={staggerItem} className="text-center mb-12">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Badge className="bg-gradient-to-r from-red-500 to-orange-600 text-white px-8 py-3 text-base font-bold shadow-xl animate-pulse mb-4">
                <Zap className="w-5 h-5 mr-2" />
                ⚠️ URGENT: Only 3 Slots Left Today!
              </Badge>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Claim Your FREE
              </span>
              <br />
              <span className="bg-gradient-to-r from-gray-900 to-red-800 dark:from-white dark:to-red-200 bg-clip-text text-transparent">
                Consultation NOW!
              </span>
            </h2>
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border-2 border-red-200 dark:border-red-800 max-w-2xl mx-auto">
              <p className="text-lg text-gray-700 dark:text-gray-200 font-bold">
                <span className="text-red-600 dark:text-red-400">🚨 WARNING:</span> This form closes in
                <span className="text-red-600 dark:text-red-400 mx-1">23:47:32</span>
                Don't miss out on saving $10,000+ in development mistakes!
              </p>
            </div>
          </motion.div>

          {/* Social Proof Bar */}
          <motion.div variants={staggerItem} className="mb-8">
            <div className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-xl p-4">
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-700 dark:text-green-300 font-bold">
                    🔥 Sarah just booked her consultation!
                  </span>
                </div>
                <div className="hidden md:block w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-1 text-green-700 dark:text-green-300 font-bold">127 consultations this week</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Form */}
          <motion.div variants={staggerItem}>
            <Card className="shadow-2xl border-2 border-red-200 dark:border-red-800 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-t-lg">
                <CardTitle className="text-center text-xl font-bold flex items-center justify-center gap-2">
                  <Award className="w-6 h-6" />
                  SECURE YOUR FREE CONSULTATION
                  <Award className="w-6 h-6" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step Indicator */}
                  <div className="flex items-center justify-center mb-8">
                    <div className="flex items-center gap-4">
                      {[1, 2, 3].map((step) => (
                        <div key={step} className="flex items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              currentStep >= step
                                ? "bg-gradient-to-r from-red-500 to-orange-500 text-white"
                                : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                            }`}
                          >
                            {step}
                          </div>
                          {step < 3 && (
                            <div
                              className={`w-12 h-1 mx-2 ${
                                currentStep > step
                                  ? "bg-gradient-to-r from-red-500 to-orange-500"
                                  : "bg-gray-200 dark:bg-gray-700"
                              }`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="text-center mb-6">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                            Step 1: Basic Information
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Let's start with your contact details
                          </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Name */}
                          <div>
                            <Label htmlFor="name" className="text-sm font-bold text-gray-700 dark:text-gray-300">
                              Full Name * <span className="text-red-500">⚡</span>
                            </Label>
                            <div className="relative mt-2">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <Input
                                id="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                className="pl-10 h-12 border-2 border-red-200 dark:border-red-800 focus:border-red-500 dark:focus:border-red-400 rounded-lg"
                                placeholder="Enter your full name"
                              />
                            </div>
                          </div>

                          {/* Email */}
                          <div>
                            <Label htmlFor="email" className="text-sm font-bold text-gray-700 dark:text-gray-300">
                              Email Address * <span className="text-red-500">⚡</span>
                            </Label>
                            <div className="relative mt-2">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <Input
                                id="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                className="pl-10 h-12 border-2 border-red-200 dark:border-red-800 focus:border-red-500 dark:focus:border-red-400 rounded-lg"
                                placeholder="Enter your email address"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Phone */}
                        <div>
                          <Label htmlFor="phone" className="text-sm font-bold text-gray-700 dark:text-gray-300">
                            Phone Number (Recommended for faster response)
                          </Label>
                          <div className="relative mt-2">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              className="pl-10 h-12 border-2 border-red-200 dark:border-red-800 focus:border-red-500 dark:focus:border-red-400 rounded-lg"
                              placeholder="Enter your phone number"
                            />
                          </div>
                        </div>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            type="button"
                            onClick={() => setCurrentStep(2)}
                            disabled={!formData.name || !formData.email}
                            className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-4 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
                          >
                            Continue to Step 2
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                          </Button>
                        </motion.div>
                      </motion.div>
                    )}

                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="text-center mb-6">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                            Step 2: Project Details
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Tell us about your project requirements
                          </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Project Type */}
                          <div>
                            <Label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                              Project Type * <span className="text-red-500">⚡</span>
                            </Label>
                            <Select
                              value={formData.projectType}
                              onValueChange={(value) => handleInputChange("projectType", value)}
                            >
                              <SelectTrigger className="h-12 mt-2 border-2 border-red-200 dark:border-red-800 focus:border-red-500 dark:focus:border-red-400 rounded-lg">
                                <SelectValue placeholder="Select project type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="mobile-app">📱 Mobile App</SelectItem>
                                <SelectItem value="web-app">💻 Web Application</SelectItem>
                                <SelectItem value="e-commerce">🛒 E-commerce</SelectItem>
                                <SelectItem value="saas">⚡ SaaS Platform</SelectItem>
                                <SelectItem value="other">🔧 Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Urgency */}
                          <div>
                            <Label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                              How Urgent Is This? * <span className="text-red-500">🔥</span>
                            </Label>
                            <Select
                              value={formData.urgency}
                              onValueChange={(value) => handleInputChange("urgency", value)}
                            >
                              <SelectTrigger className="h-12 mt-2 border-2 border-red-200 dark:border-red-800 focus:border-red-500 dark:focus:border-red-400 rounded-lg">
                                <SelectValue placeholder="Select urgency level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="critical">🚨 CRITICAL - Need to start ASAP</SelectItem>
                                <SelectItem value="urgent">⚡ URGENT - Within 1 week</SelectItem>
                                <SelectItem value="soon">🔥 SOON - Within 1 month</SelectItem>
                                <SelectItem value="planning">📅 PLANNING - Within 3 months</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Budget */}
                          <div>
                            <Label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                              Investment Budget * <span className="text-green-500">💰</span>
                            </Label>
                            <Select
                              value={formData.budget}
                              onValueChange={(value) => handleInputChange("budget", value)}
                            >
                              <SelectTrigger className="h-12 mt-2 border-2 border-red-200 dark:border-red-800 focus:border-red-500 dark:focus:border-red-400 rounded-lg">
                                <SelectValue placeholder="Select investment range" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="under-10k">💵 Under $10,000</SelectItem>
                                <SelectItem value="10k-25k">💰 $10,000 - $25,000</SelectItem>
                                <SelectItem value="25k-50k">💎 $25,000 - $50,000</SelectItem>
                                <SelectItem value="50k-100k">🏆 $50,000 - $100,000</SelectItem>
                                <SelectItem value="over-100k">👑 Over $100,000</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Timeline */}
                          <div>
                            <Label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                              Desired Timeline * <span className="text-blue-500">⏰</span>
                            </Label>
                            <Select
                              value={formData.timeline}
                              onValueChange={(value) => handleInputChange("timeline", value)}
                            >
                              <SelectTrigger className="h-12 mt-2 border-2 border-red-200 dark:border-red-800 focus:border-red-500 dark:focus:border-red-400 rounded-lg">
                                <SelectValue placeholder="Select timeline" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="asap">🚀 ASAP</SelectItem>
                                <SelectItem value="1-3-months">⚡ 1-3 months</SelectItem>
                                <SelectItem value="3-6-months">📅 3-6 months</SelectItem>
                                <SelectItem value="6-12-months">🗓️ 6-12 months</SelectItem>
                                <SelectItem value="flexible">🤝 Flexible</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setCurrentStep(1)}
                            className="flex-1 py-3 border-2 border-gray-300 dark:border-gray-600"
                          >
                            Back
                          </Button>
                          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                              type="button"
                              onClick={() => setCurrentStep(3)}
                              disabled={
                                !formData.projectType || !formData.urgency || !formData.budget || !formData.timeline
                              }
                              className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-3 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
                            >
                              Continue to Final Step
                              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                            </Button>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="text-center mb-6">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                            Step 3: Final Details
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Almost done! Tell us more about your vision
                          </p>
                        </div>

                        {/* Description */}
                        <div>
                          <Label htmlFor="description" className="text-sm font-bold text-gray-700 dark:text-gray-300">
                            Project Description * <span className="text-purple-500">📝</span>
                          </Label>
                          <div className="relative mt-2">
                            <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <Textarea
                              id="description"
                              required
                              value={formData.description}
                              onChange={(e) => handleInputChange("description", e.target.value)}
                              className="pl-10 pt-3 min-h-[120px] border-2 border-red-200 dark:border-red-800 focus:border-red-500 dark:focus:border-red-400 rounded-lg resize-none"
                              placeholder="🚨 IMPORTANT: Describe your project vision, key features, target audience, and any specific challenges you're facing. The more details you provide, the better we can help you avoid costly mistakes!"
                            />
                          </div>
                        </div>

                        {/* Preferred Time */}
                        <div>
                          <Label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                            Preferred Consultation Time <span className="text-blue-500">🕐</span>
                          </Label>
                          <Select
                            value={formData.preferredTime}
                            onValueChange={(value) => handleInputChange("preferredTime", value)}
                          >
                            <SelectTrigger className="h-12 mt-2 border-2 border-red-200 dark:border-red-800 focus:border-red-500 dark:focus:border-red-400 rounded-lg">
                              <SelectValue placeholder="Select preferred time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="morning">🌅 Morning (9 AM - 12 PM)</SelectItem>
                              <SelectItem value="afternoon">☀️ Afternoon (12 PM - 5 PM)</SelectItem>
                              <SelectItem value="evening">🌆 Evening (5 PM - 8 PM)</SelectItem>
                              <SelectItem value="flexible">🤝 Flexible</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Newsletter with incentive */}
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-xl p-4">
                          <div className="flex items-start space-x-3">
                            <Checkbox
                              id="newsletter"
                              checked={formData.newsletter}
                              onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
                              className="mt-1"
                            />
                            <Label
                              htmlFor="newsletter"
                              className="text-sm text-yellow-800 dark:text-yellow-200 font-medium"
                            >
                              <span className="font-bold">🎁 BONUS:</span> Subscribe to get our exclusive "App
                              Development Mistakes to Avoid" guide (worth $97) + weekly tips to save thousands on your
                              project!
                            </Label>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setCurrentStep(2)}
                            className="flex-1 py-3 border-2 border-gray-300 dark:border-gray-600"
                          >
                            Back
                          </Button>
                          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                              type="submit"
                              disabled={isSubmitting || !formData.description}
                              className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-4 text-xl font-black rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 group relative overflow-hidden"
                            >
                              {isSubmitting && (
                                <motion.div
                                  animate={{ x: ["-100%", "100%"] }}
                                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                />
                              )}
                              {isSubmitting ? (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                >
                                  <Clock className="w-6 h-6 mr-2" />
                                </motion.div>
                              ) : (
                                <Zap className="w-6 h-6 mr-2 group-hover:rotate-12 transition-transform duration-200" />
                              )}
                              {isSubmitting ? "SECURING YOUR SLOT..." : "🚀 CLAIM MY FREE CONSULTATION NOW!"}
                              {!isSubmitting && (
                                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                              )}
                            </Button>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Trust Indicators */}
          <motion.div variants={staggerItem} className="text-center mt-8 space-y-6">
            {/* Security badges */}
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              {[
                { icon: CheckCircle, text: "100% FREE", color: "text-green-600" },
                { icon: CheckCircle, text: "NO CREDIT CARD", color: "text-blue-600" },
                { icon: CheckCircle, text: "NO COMMITMENT", color: "text-purple-600" },
                { icon: CheckCircle, text: "INSTANT CONFIRMATION", color: "text-orange-600" },
              ].map((item, index) => (
                <div
                  key={item.text}
                  className="flex items-center gap-1 bg-white dark:bg-gray-800 px-3 py-2 rounded-full shadow-lg border"
                >
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                  <span className="font-bold text-gray-700 dark:text-gray-300">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border-2 border-green-200 dark:border-green-800 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-lg font-bold text-gray-900 dark:text-white">4.9/5 Rating</span>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">127</p>
                  <p className="text-gray-600 dark:text-gray-400">Consultations This Week</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">$2.3M</p>
                  <p className="text-gray-600 dark:text-gray-400">Saved in Development Costs</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">98%</p>
                  <p className="text-gray-600 dark:text-gray-400">Client Success Rate</p>
                </div>
              </div>
            </div>

            {/* Final urgency message */}
            <div className="bg-red-100 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-700 rounded-xl p-4">
              <p className="text-red-800 dark:text-red-200 font-bold text-sm">
                ⚠️ REMINDER: This free consultation offer expires in 23:47:32. Don't let your project become another
                failure statistic!
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
