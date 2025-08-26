"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Calendar, CheckCircle, Star, Zap, Timer, ArrowRight, Shield, Award, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface FormVariantProps {
  onSubmit: (formData: any) => void
}

// Variant A: Standard Consultation Form
export const FormVariantA = ({ onSubmit }: FormVariantProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
    consultationType: "",
    preferredTime: "",
    agreeToTerms: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onSubmit(formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section className="section-padding bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Book Your Free <span className="gradient-text">Consultation</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fill out the form below and I'll get back to you within 24 hours to schedule your consultation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-center">Consultation Request Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company/Organization</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="projectType">Project Type *</Label>
                    <Select
                      value={formData.projectType}
                      onValueChange={(value) => handleInputChange("projectType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mobile-app">Mobile App</SelectItem>
                        <SelectItem value="web-app">Web Application</SelectItem>
                        <SelectItem value="e-commerce">E-commerce Platform</SelectItem>
                        <SelectItem value="saas">SaaS Product</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget Range</Label>
                    <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                      <SelectTrigger>
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

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="timeline">Project Timeline</Label>
                    <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="When do you want to start?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">As soon as possible</SelectItem>
                        <SelectItem value="1-month">Within 1 month</SelectItem>
                        <SelectItem value="3-months">Within 3 months</SelectItem>
                        <SelectItem value="6-months">Within 6 months</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="consultationType">Consultation Type</Label>
                    <Select
                      value={formData.consultationType}
                      onValueChange={(value) => handleInputChange("consultationType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select consultation type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quick">Quick Consultation (30 min)</SelectItem>
                        <SelectItem value="detailed">Detailed Consultation (60 min)</SelectItem>
                        <SelectItem value="follow-up">Follow-up Session (30 min)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Project Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Please describe your project idea, goals, and any specific requirements..."
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredTime">Preferred Time for Consultation</Label>
                  <Textarea
                    id="preferredTime"
                    value={formData.preferredTime}
                    onChange={(e) => handleInputChange("preferredTime", e.target.value)}
                    placeholder="Let me know your preferred days and times (including timezone)..."
                    rows={2}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the terms and conditions and privacy policy *
                  </Label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full py-4 text-lg font-semibold"
                  disabled={isSubmitting || !formData.agreeToTerms}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Calendar className="w-5 h-5 mr-2" />
                      Book Free Consultation
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

// Variant B: Enhanced Form with Value Proposition Sidebar
export const FormVariantB = ({ onSubmit }: FormVariantProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
    consultationType: "",
    preferredTime: "",
    agreeToTerms: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onSubmit(formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section className="section-padding bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-950/20 dark:via-orange-950/20 dark:to-yellow-950/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 px-4 py-2 text-sm font-bold bg-red-600 text-white animate-pulse">
            <Timer className="w-4 h-4 mr-2" />
            URGENT: Only 2 Slots Left This Week!
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            <span className="text-red-600">LAST CHANCE!</span> Secure Your <span className="gradient-text">FREE</span>{" "}
            Consultation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't let this opportunity slip away! Fill out the form now and get expert guidance worth Rs 12,000
            absolutely FREE.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Value Proposition Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="sticky top-8 space-y-6">
              {/* Urgency Card */}
              <Card className="border-4 border-red-500 bg-red-50 dark:bg-red-950/20">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Timer className="w-12 h-12 text-red-600 mx-auto mb-4" />
                    <h3 className="font-bold text-red-600 mb-2">⚠️ URGENT NOTICE ⚠️</h3>
                    <p className="text-sm mb-4">
                      This free consultation offer is ending soon. Only{" "}
                      <span className="font-bold text-red-600">2 slots remaining</span> this week!
                    </p>
                    <div className="bg-yellow-200 dark:bg-yellow-900/30 p-3 rounded-lg">
                      <div className="text-xs font-bold text-yellow-800 dark:text-yellow-200">
                        🔥 Last booking: 3 hours ago
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Value Proposition */}
              <Card className="border-2 border-green-300 bg-green-50 dark:bg-green-950/20">
                <CardHeader>
                  <CardTitle className="text-center text-green-700 dark:text-green-300">
                    What You'll Get (Worth Rs 12,000)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      icon: CheckCircle,
                      title: "Project Validation",
                      value: "Rs 3,000",
                      description: "Comprehensive feasibility analysis",
                    },
                    {
                      icon: TrendingUp,
                      title: "Technical Roadmap",
                      value: "Rs 4,000",
                      description: "Detailed development strategy",
                    },
                    {
                      icon: Award,
                      title: "Cost Breakdown",
                      value: "Rs 2,500",
                      description: "Accurate pricing estimation",
                    },
                    {
                      icon: Shield,
                      title: "Risk Assessment",
                      value: "Rs 2,500",
                      description: "Identify potential challenges",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border"
                    >
                      <item.icon className="w-5 h-5 text-green-600 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-sm">{item.title}</h4>
                          <Badge variant="outline" className="text-xs text-green-600">
                            {item.value}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between font-bold">
                      <span>Total Value:</span>
                      <span className="text-green-600">Rs 12,000</span>
                    </div>
                    <div className="flex items-center justify-between text-lg font-black">
                      <span>Your Price:</span>
                      <span className="text-red-600">FREE!</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Proof */}
              <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm font-semibold mb-2">50+ Success Stories</p>
                  <p className="text-xs text-muted-foreground">
                    "Muhammad's consultation saved us $15,000 and 3 months of development time!"
                  </p>
                  <p className="text-xs font-semibold mt-2">- Sarah K., Startup Founder</p>
                </CardContent>
              </Card>

              {/* Guarantee */}
              <Card className="bg-purple-50 dark:bg-purple-950/20 border-purple-200">
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-2">100% Risk-Free Guarantee</h4>
                  <p className="text-xs text-muted-foreground">
                    If you're not completely satisfied with the consultation, we'll provide additional follow-up
                    sessions at no cost.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Enhanced Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="shadow-2xl border-4 border-orange-300">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <CardTitle className="text-center text-xl font-black">🚀 SECURE YOUR FREE CONSULTATION NOW!</CardTitle>
                <p className="text-center text-orange-100 text-sm">
                  Fill out this form in under 2 minutes and get instant access to expert guidance
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-semibold">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        className="border-2 focus:border-orange-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-semibold">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@example.com"
                        className="border-2 focus:border-orange-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="font-semibold">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="border-2 focus:border-orange-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="font-semibold">
                        Company/Organization
                      </Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        placeholder="Your company name"
                        className="border-2 focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="projectType" className="font-semibold">
                        Project Type *
                      </Label>
                      <Select
                        value={formData.projectType}
                        onValueChange={(value) => handleInputChange("projectType", value)}
                      >
                        <SelectTrigger className="border-2 focus:border-orange-500">
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mobile-app">📱 Mobile App</SelectItem>
                          <SelectItem value="web-app">💻 Web Application</SelectItem>
                          <SelectItem value="e-commerce">🛒 E-commerce Platform</SelectItem>
                          <SelectItem value="saas">☁️ SaaS Product</SelectItem>
                          <SelectItem value="other">🔧 Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget" className="font-semibold">
                        Budget Range *
                      </Label>
                      <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                        <SelectTrigger className="border-2 focus:border-orange-500">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-10k">💰 Under $10,000</SelectItem>
                          <SelectItem value="10k-25k">💰💰 $10,000 - $25,000</SelectItem>
                          <SelectItem value="25k-50k">💰💰💰 $25,000 - $50,000</SelectItem>
                          <SelectItem value="50k-100k">💰💰💰💰 $50,000 - $100,000</SelectItem>
                          <SelectItem value="over-100k">💰💰💰💰💰 Over $100,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="timeline" className="font-semibold">
                        Project Timeline *
                      </Label>
                      <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                        <SelectTrigger className="border-2 focus:border-orange-500">
                          <SelectValue placeholder="When do you want to start?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asap">🚀 As soon as possible</SelectItem>
                          <SelectItem value="1-month">📅 Within 1 month</SelectItem>
                          <SelectItem value="3-months">📅 Within 3 months</SelectItem>
                          <SelectItem value="6-months">📅 Within 6 months</SelectItem>
                          <SelectItem value="flexible">🤝 Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="consultationType" className="font-semibold">
                        Consultation Type *
                      </Label>
                      <Select
                        value={formData.consultationType}
                        onValueChange={(value) => handleInputChange("consultationType", value)}
                      >
                        <SelectTrigger className="border-2 focus:border-orange-500">
                          <SelectValue placeholder="Select consultation type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="quick">⚡ Quick Consultation (30 min)</SelectItem>
                          <SelectItem value="detailed">🎯 Detailed Consultation (60 min)</SelectItem>
                          <SelectItem value="follow-up">🔄 Follow-up Session (30 min)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="font-semibold">
                      Project Description *
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="🚀 Describe your amazing project idea! Include your goals, target audience, key features, and any specific requirements. The more details you provide, the better I can help you!"
                      rows={4}
                      className="border-2 focus:border-orange-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preferredTime" className="font-semibold">
                      Preferred Time for Consultation
                    </Label>
                    <Textarea
                      id="preferredTime"
                      value={formData.preferredTime}
                      onChange={(e) => handleInputChange("preferredTime", e.target.value)}
                      placeholder="🕐 Let me know your preferred days and times (including timezone). I'm flexible and will work around your schedule!"
                      rows={2}
                      className="border-2 focus:border-orange-500"
                    />
                  </div>

                  <div className="bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded-lg border-2 border-yellow-400">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
                        className="border-2"
                      />
                      <Label htmlFor="terms" className="text-sm font-semibold">
                        ✅ I agree to receive my FREE consultation (worth Rs 12,000) and understand this is completely
                        risk-free with no obligations *
                      </Label>
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full py-6 text-xl font-black bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-2xl border-4 border-yellow-400"
                      disabled={isSubmitting || !formData.agreeToTerms}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3" />
                          SECURING YOUR SLOT...
                        </>
                      ) : (
                        <>
                          <Zap className="w-6 h-6 mr-3" />🚀 CLAIM MY FREE Rs 12,000 CONSULTATION NOW!
                          <motion.div
                            className="ml-3"
                            animate={{ x: [0, 10, 0] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                          >
                            ⚡
                          </motion.div>
                        </>
                      )}
                    </Button>
                  </motion.div>

                  <div className="text-center text-xs text-muted-foreground">
                    🔒 Your information is 100% secure and will never be shared with third parties
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Export both variants with proper names
export const ConsultationFormVariants = ({
  variant,
  onSubmit,
}: { variant: string; onSubmit: (formData: any) => void }) => {
  if (variant === "form-b") {
    return <FormVariantB onSubmit={onSubmit} />
  }
  return <FormVariantA onSubmit={onSubmit} />
}
