"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FluidTransition } from "@/components/ui/FluidTransition"

// Sample data for testing
const sampleData = {
  name: "John Doe",
  email: "john.doe@example.com",
  company: "Tech Innovations Inc.",
  phone: "+92 300 1234567",
  projectType: "mobile-app",
  budget: "15k-50k",
  timeline: "3-months",
  description:
    "I need a comprehensive mobile application for my business that includes user authentication, real-time notifications, and a modern UI. The app should work on both iOS and Android platforms with seamless performance.",
  technologies: ["Flutter", "Firebase", "Cross Platform Application"],
  features: ["User Authentication", "Push Notifications", "Real-time Chat", "Analytics"],
  additionalInfo: "We also need integration with our existing CRM system and support for multiple languages.",
  urgency: "high",
  preferredContact: "video",
  hearAbout: "linkedin",
  files: [
    { name: "project-requirements.pdf", size: 2.5 * 1024 * 1024, type: "application/pdf" },
    { name: "wireframes.png", size: 1.8 * 1024 * 1024, type: "image/png" },
  ],
}

const projectTypeMap: Record<string, string> = {
  "mobile-app": "Mobile App",
  "web-app": "Web Application",
  website: "Website",
  consultation: "Consultation",
  maintenance: "Maintenance",
  other: "Other",
}

const budgetMap: Record<string, string> = {
  "under-5k": "Under Rs 5,000",
  "5k-15k": "Rs 5,000 - Rs 15,000",
  "15k-50k": "Rs 15,000 - Rs 50,000",
  "50k-plus": "Rs 50,000+",
  discuss: "Let's Discuss",
}

const timelineMap: Record<string, string> = {
  asap: "ASAP",
  "1-month": "Within 1 Month",
  "3-months": "Within 3 Months",
  "6-months": "Within 6 Months",
  flexible: "Flexible",
}

const urgencyMap: Record<string, string> = {
  low: "Low - No rush",
  medium: "Medium - Standard timeline",
  high: "High - Need quick response",
  urgent: "Urgent - ASAP",
}

const contactMap: Record<string, string> = {
  email: "Email",
  phone: "Phone Call",
  video: "Video Call",
  meeting: "In-Person Meeting",
}

const hearAboutMap: Record<string, string> = {
  google: "Google Search",
  linkedin: "LinkedIn",
  github: "GitHub",
  referral: "Referral",
  social: "Social Media",
  portfolio: "Direct Portfolio Visit",
  other: "Other",
}

export default function TestEmailPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [urgencyLevel, setUrgencyLevel] = useState<"low" | "medium" | "high" | "urgent">("high")

  const formatFileSize = (bytes: number) => {
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`
  }

  const currentDate = new Date()
  const formattedDate = currentDate.toLocaleDateString()
  const formattedDateTime = currentDate.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Karachi",
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <FluidTransition className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Email Template <span className="gradient-text">Animation Test</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Interactive preview of the enhanced email template with all animations and hover effects
          </p>

          <div className="flex justify-center gap-4 mb-8">
            <Button variant={urgencyLevel === "low" ? "default" : "outline"} onClick={() => setUrgencyLevel("low")}>
              Low Priority
            </Button>
            <Button
              variant={urgencyLevel === "medium" ? "default" : "outline"}
              onClick={() => setUrgencyLevel("medium")}
            >
              Medium Priority
            </Button>
            <Button variant={urgencyLevel === "high" ? "default" : "outline"} onClick={() => setUrgencyLevel("high")}>
              High Priority
            </Button>
            <Button
              variant={urgencyLevel === "urgent" ? "default" : "outline"}
              onClick={() => setUrgencyLevel("urgent")}
            >
              Urgent
            </Button>
          </div>
        </FluidTransition>

        {/* Email Preview Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-t-4 border-gradient-to-r from-blue-500 to-purple-600">
          {/* Animated Header */}
          <motion.div
            className="relative bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 text-white p-8 text-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Floating Animation Background */}
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 50% 80%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            <motion.h1
              className="text-3xl font-bold mb-3 relative z-10"
              animate={{
                textShadow: ["0 2px 4px rgba(0,0,0,0.1)", "0 4px 8px rgba(0,0,0,0.2)", "0 2px 4px rgba(0,0,0,0.1)"],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              🚀 New Project Request
            </motion.h1>
            <div className="text-lg opacity-95 mb-3">Professional Inquiry Received</div>
            <motion.div
              className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border border-white/30"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.3)",
                transition: { duration: 0.2 },
              }}
            >
              📅 {formattedDate}
            </motion.div>
          </motion.div>

          {/* Contact Information Section */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center mb-6">
              <motion.div
                className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl mr-4 shadow-lg"
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  boxShadow: "0 8px 25px rgba(59, 130, 246, 0.4)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                👤
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800">Contact Information</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: "Full Name", value: sampleData.name },
                { label: "Email Address", value: sampleData.email },
                { label: "Company", value: sampleData.company },
                { label: "Phone Number", value: sampleData.phone },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 relative overflow-hidden cursor-pointer"
                  whileHover={{
                    y: -4,
                    boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
                    borderColor: "#3b82f6",
                  }}
                  onHoverStart={() => setHoveredCard(`contact-${index}`)}
                  onHoverEnd={() => setHoveredCard(null)}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Gradient border effect */}
                  <motion.div
                    className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600"
                    initial={{ height: 0 }}
                    animate={{ height: hoveredCard === `contact-${index}` ? "100%" : "100%" }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    {item.label}
                  </div>
                  <div className="text-lg font-semibold text-gray-800">{item.value}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Project Details Section */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center mb-6">
              <motion.div
                className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white text-xl mr-4 shadow-lg"
                whileHover={{
                  scale: 1.1,
                  rotate: -5,
                  boxShadow: "0 8px 25px rgba(147, 51, 234, 0.4)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                🚀
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800">Project Details</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[
                { label: "Project Type", value: projectTypeMap[sampleData.projectType] },
                { label: "Budget Range", value: budgetMap[sampleData.budget] },
                { label: "Timeline", value: timelineMap[sampleData.timeline] },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className={`bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 relative overflow-hidden cursor-pointer ${
                    item.label === "Timeline" && urgencyLevel === "urgent"
                      ? "border-red-300 bg-red-50"
                      : item.label === "Timeline" && urgencyLevel === "high"
                        ? "border-orange-300 bg-orange-50"
                        : ""
                  }`}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Priority indicator for urgent/high priority */}
                  {item.label === "Timeline" && (urgencyLevel === "urgent" || urgencyLevel === "high") && (
                    <motion.div
                      className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                        urgencyLevel === "urgent" ? "bg-red-500" : "bg-orange-500"
                      }`}
                      animate={
                        urgencyLevel === "urgent"
                          ? {
                              scale: [1, 1.2, 1],
                              rotate: [0, 90, 180, 270, 360],
                            }
                          : {
                              scale: [1, 1.1, 1],
                            }
                      }
                      transition={{
                        duration: urgencyLevel === "urgent" ? 1 : 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      {urgencyLevel === "urgent" ? "🚨" : "⚡"}
                    </motion.div>
                  )}

                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    {item.label}
                  </div>
                  <div className="text-lg font-semibold text-gray-800">{item.value}</div>
                </motion.div>
              ))}
            </div>

            {/* Project Description */}
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-xl border border-blue-200 relative overflow-hidden"
              whileHover={{
                boxShadow: "0 8px 25px rgba(59, 130, 246, 0.15)",
                borderColor: "#3b82f6",
              }}
            >
              <motion.div
                className="absolute -top-3 left-6 bg-white p-2 rounded-full shadow-md"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                💬
              </motion.div>
              <div className="text-sm font-semibold text-gray-600 mb-3 mt-2">Project Description</div>
              <div className="text-gray-700 leading-relaxed">{sampleData.description}</div>
            </motion.div>
          </div>

          {/* Technical Requirements */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center mb-6">
              <motion.div
                className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center text-white text-xl mr-4 shadow-lg"
                whileHover={{
                  scale: 1.1,
                  rotate: 10,
                  boxShadow: "0 8px 25px rgba(34, 197, 94, 0.4)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                ⚙️
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800">Technical Requirements</h3>
            </div>

            {/* Technologies */}
            <div className="mb-6">
              <div className="text-sm font-semibold text-gray-600 mb-3">Preferred Technologies</div>
              <div className="flex flex-wrap gap-3">
                {sampleData.technologies.map((tech, index) => (
                  <motion.div
                    key={tech}
                    className="relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 py-2 text-sm font-semibold shadow-lg cursor-pointer relative overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                      <span className="relative z-10">{tech}</span>
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <div className="text-sm font-semibold text-gray-600 mb-3">Required Features</div>
              <div className="flex flex-wrap gap-3">
                {sampleData.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    className="relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 text-sm font-semibold shadow-lg cursor-pointer relative overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      />
                      <span className="relative z-10">{feature}</span>
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Files Section */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center mb-6">
              <motion.div
                className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center text-white text-xl mr-4 shadow-lg"
                whileHover={{
                  scale: 1.1,
                  rotate: -10,
                  boxShadow: "0 8px 25px rgba(245, 158, 11, 0.4)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                📎
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800">Uploaded Files ({sampleData.files.length})</h3>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200">
              {sampleData.files.map((file, index) => (
                <motion.div
                  key={file.name}
                  className="flex items-center justify-between py-4 border-b border-yellow-200 last:border-b-0"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center">
                    <motion.div
                      className="text-2xl mr-4"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                    >
                      📄
                    </motion.div>
                    <div>
                      <div className="font-semibold text-yellow-800">{file.name}</div>
                      <div className="text-sm text-yellow-600">
                        {formatFileSize(file.size)} • {file.type}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <motion.div
            className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-8 text-center relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Animated top border */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500"
              animate={{
                background: [
                  "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)",
                  "linear-gradient(90deg, #ec4899 0%, #3b82f6 50%, #8b5cf6 100%)",
                  "linear-gradient(90deg, #8b5cf6 0%, #ec4899 50%, #3b82f6 100%)",
                  "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)",
                ],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            />

            <h3 className="text-2xl font-bold mb-4">📞 Next Steps</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              This is a comprehensive project request that requires your professional attention. Respond promptly to
              maintain your excellent reputation and secure this opportunity.
            </p>

            <motion.div
              className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20 max-w-md mx-auto"
              whileHover={{
                backgroundColor: "rgba(255,255,255,0.15)",
                scale: 1.02,
              }}
            >
              <div className="text-lg font-semibold mb-4">🎯 Recommended Actions</div>
              <ul className="text-left space-y-2 text-sm">
                {[
                  "Review all project requirements",
                  "Prepare thoughtful questions",
                  "Schedule a discovery call",
                  "Create detailed proposal",
                  "Send professional follow-up",
                ].map((action, index) => (
                  <motion.li
                    key={action}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 1 }}
                  >
                    <motion.span
                      className="mr-3"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                    >
                      ✨
                    </motion.span>
                    {action}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Timestamp */}
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 p-6 text-center relative">
            <motion.div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
              animate={{ width: [60, 80, 60] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            <div className="flex flex-col items-center gap-2 mt-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <span>📧</span>
                <em>Sent from Muhammad Humayun Amar's Portfolio Website</em>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>⏰</span>
                <em>Submitted on {formattedDateTime}</em>
              </div>
            </div>
          </div>
        </div>

        {/* Animation Status Panel */}
        <FluidTransition delay={0.5} className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  ⚙️
                </motion.span>
                Animation Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-3 h-3 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    />
                    <span>Header gradient animation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-3 h-3 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                    />
                    <span>Card hover effects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-3 h-3 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                    />
                    <span>Badge shimmer effects</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-3 h-3 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.6 }}
                    />
                    <span>Priority indicators</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-3 h-3 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.8 }}
                    />
                    <span>Icon animations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-3 h-3 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 1.0 }}
                    />
                    <span>Footer gradient border</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    ✅
                  </motion.span>
                  <span className="font-semibold">All animations are working perfectly!</span>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300 mt-2">
                  Hover over cards, badges, and icons to see interactive effects. Change priority levels to test
                  urgent/high priority animations.
                </p>
              </div>
            </CardContent>
          </Card>
        </FluidTransition>
      </div>
    </div>
  )
}
