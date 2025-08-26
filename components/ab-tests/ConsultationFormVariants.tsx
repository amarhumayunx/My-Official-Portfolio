"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Clock, DollarSign, Mail, Phone, Star, User, Zap } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface FormVariantProps {
  onSubmit: (data: any) => void
}

export const FormVariantA: React.FC<FormVariantProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
    newsletter: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Let's Discuss Your Project
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Fill out the form below and we'll get back to you within 24 hours with a detailed proposal.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Full Name *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Email Address *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="company" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Company Name
                  </Label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your company name"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Project Type *
                  </Label>
                  <Select
                    value={formData.projectType}
                    onValueChange={(value) => handleInputChange("projectType", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mobile-app">Mobile App Development</SelectItem>
                      <SelectItem value="web-app">Web Application</SelectItem>
                      <SelectItem value="ai-integration">AI/ML Integration</SelectItem>
                      <SelectItem value="consultation">Technical Consultation</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Budget Range
                  </Label>
                  <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                    <SelectTrigger className="w-full">
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
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Timeline</Label>
                <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                  <SelectTrigger className="w-full">
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
              </div>

              <div>
                <Label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block"
                >
                  Project Description *
                </Label>
                <textarea
                  id="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                  placeholder="Tell us about your project, goals, and any specific requirements..."
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
                />
                <Label htmlFor="newsletter" className="text-sm text-gray-600 dark:text-gray-300">
                  Subscribe to our newsletter for updates and tips
                </Label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 px-6 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Send Consultation Request
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export const FormVariantB: React.FC<FormVariantProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
    newsletter: false,
    urgentProject: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-red-900 dark:to-pink-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-6 animate-pulse">
              <Zap className="w-5 h-5" />
              PRIORITY BOOKING - SKIP THE QUEUE!
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
              🚀 CLAIM YOUR <span className="text-red-600">$15,000 BONUS</span> NOW!
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              <strong>WARNING:</strong> This exclusive offer expires in{" "}
              <strong className="text-red-600">23:47:12</strong>. Fill out the form below to secure your spot and unlock
              massive savings!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border-4 border-yellow-400">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-lg mb-6">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <CheckCircle className="w-6 h-6" />
                    INSTANT PRIORITY ACCESS FORM
                  </h3>
                  <p className="text-green-100">Complete in 2 minutes to claim your bonuses!</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 block">
                        Full Name * (Required for Bonus)
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
                        <input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border-2 border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 block">
                        Email * (For Instant Confirmation)
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
                        <input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border-2 border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 block">
                        Phone * (For Priority Contact)
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
                        <input
                          type="tel"
                          id="phone"
                          required
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border-2 border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="company"
                        className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 block"
                      >
                        Company Name
                      </Label>
                      <input
                        type="text"
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        className="w-full px-4 py-3 border-2 border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Enter your company name"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 block">
                        Project Type * (Affects Bonus Amount)
                      </Label>
                      <Select
                        value={formData.projectType}
                        onValueChange={(value) => handleInputChange("projectType", value)}
                      >
                        <SelectTrigger className="w-full border-2 border-red-300">
                          <SelectValue placeholder="Select for maximum bonus" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mobile-app">📱 Mobile App (+$5K bonus)</SelectItem>
                          <SelectItem value="web-app">💻 Web Application (+$3K bonus)</SelectItem>
                          <SelectItem value="ai-integration">🤖 AI/ML Integration (+$7K bonus)</SelectItem>
                          <SelectItem value="consultation">💡 Technical Consultation (+$1K bonus)</SelectItem>
                          <SelectItem value="other">🔧 Other (Custom bonus)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 block">
                        Budget Range * (Higher = More Bonuses!)
                      </Label>
                      <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                        <SelectTrigger className="w-full border-2 border-red-300">
                          <SelectValue placeholder="Select for bonus calculation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-10k">💰 Under $10K (+$2K bonus)</SelectItem>
                          <SelectItem value="10k-25k">💰💰 $10K-$25K (+$5K bonus)</SelectItem>
                          <SelectItem value="25k-50k">💰💰💰 $25K-$50K (+$10K bonus)</SelectItem>
                          <SelectItem value="50k-100k">💰💰💰💰 $50K-$100K (+$15K bonus)</SelectItem>
                          <SelectItem value="over-100k">🏆 Over $100K (+$25K bonus)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 block">
                      Timeline * (Urgent = Priority Treatment)
                    </Label>
                    <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                      <SelectTrigger className="w-full border-2 border-red-300">
                        <SelectValue placeholder="When do you need this done?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">🔥 ASAP (Priority Queue)</SelectItem>
                        <SelectItem value="1-3-months">⚡ 1-3 months (Fast Track)</SelectItem>
                        <SelectItem value="3-6-months">📅 3-6 months (Standard)</SelectItem>
                        <SelectItem value="6-12-months">🗓️ 6-12 months (Planned)</SelectItem>
                        <SelectItem value="flexible">🤝 Flexible (Best Bonus)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label
                      htmlFor="description"
                      className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 block"
                    >
                      Project Description * (More Details = Bigger Bonus!)
                    </Label>
                    <textarea
                      id="description"
                      required
                      rows={4}
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white resize-none"
                      placeholder="Describe your project in detail to maximize your bonus package..."
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="urgentProject"
                        checked={formData.urgentProject}
                        onCheckedChange={(checked) => handleInputChange("urgentProject", checked as boolean)}
                      />
                      <Label htmlFor="urgentProject" className="text-sm font-bold text-red-600">
                        🚨 This is an URGENT project (Jump to front of queue!)
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={formData.newsletter}
                        onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
                      />
                      <Label htmlFor="newsletter" className="text-sm text-gray-600 dark:text-gray-300">
                        📧 Get exclusive deals and insider tips (Recommended!)
                      </Label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 hover:from-red-700 hover:via-orange-700 hover:to-yellow-700 text-white py-6 px-6 rounded-xl text-xl font-black transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl animate-pulse"
                  >
                    🎁 CLAIM MY $15,000 BONUS PACKAGE NOW! 🎁
                  </button>

                  <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    ⏰ <strong>HURRY!</strong> Only <span className="text-red-600 font-bold">47 minutes</span> left to
                    claim this offer!
                  </p>
                </form>
              </div>
            </motion.div>

            {/* Value Proposition Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Bonus Package */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <DollarSign className="w-6 h-6" />
                  YOUR BONUS PACKAGE
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Free App Store Optimization</span>
                    <span className="font-bold">$3,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>6-Month Free Maintenance</span>
                    <span className="font-bold">$7,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Marketing Strategy Session</span>
                    <span className="font-bold">$2,500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Priority Support Access</span>
                    <span className="font-bold">$2,500</span>
                  </div>
                  <hr className="border-green-300" />
                  <div className="flex justify-between items-center text-xl font-black">
                    <span>TOTAL VALUE:</span>
                    <span>$15,000</span>
                  </div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border-2 border-yellow-400">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  WHAT CLIENTS SAY
                </h3>
                <div className="space-y-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                      "Got my app built in 6 weeks and made $50K in the first month!"
                    </p>
                    <p className="text-xs text-gray-500 mt-2">- Sarah M., CEO</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                      "Best investment I ever made. ROI was 400% in year one!"
                    </p>
                    <p className="text-xs text-gray-500 mt-2">- Mike R., Founder</p>
                  </div>
                </div>
              </div>

              {/* Urgency Counter */}
              <div className="bg-red-500 text-white p-6 rounded-2xl shadow-xl animate-pulse">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  OFFER EXPIRES IN:
                </h3>
                <div className="text-center">
                  <div className="text-3xl font-black font-mono">23:47:12</div>
                  <p className="text-red-200 text-sm mt-2">Don't miss out on $15,000 in bonuses!</p>
                </div>
              </div>

              {/* Guarantee */}
              <div className="bg-blue-500 text-white p-6 rounded-2xl shadow-xl">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  100% GUARANTEE
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>✅ Money-back guarantee</li>
                  <li>✅ No hidden fees</li>
                  <li>✅ Free revisions included</li>
                  <li>✅ 24/7 priority support</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
