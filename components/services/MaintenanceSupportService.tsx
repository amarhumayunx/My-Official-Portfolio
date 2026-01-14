"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Wrench, Bug, Shield, Clock, TrendingUp, CheckCircle, ArrowRight, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const maintenanceServices = [
  {
    icon: Bug,
    title: "Bug Fixes & Debugging",
    description: "Quick resolution of app issues and crashes",
    features: ["Crash analysis", "Performance debugging", "UI/UX fixes", "Logic error resolution"],
  },
  {
    icon: TrendingUp,
    title: "Performance Optimization",
    description: "Enhance app speed and efficiency",
    features: ["Memory optimization", "Battery usage reduction", "Load time improvement", "Resource optimization"],
  },
  {
    icon: Smartphone,
    title: "OS Updates & Compatibility",
    description: "Keep your app compatible with latest OS versions",
    features: ["Android updates", "iOS compatibility", "API level updates", "Deprecated code fixes"],
  },
  {
    icon: Shield,
    title: "Security Updates",
    description: "Regular security patches and improvements",
    features: ["Vulnerability fixes", "Security patches", "Compliance updates", "Threat monitoring"],
  },
]

const supportPlans = [
  {
    name: "Basic Support",
    price: "Rs 8,000/month",
    description: "Essential maintenance for small apps",
    features: [
      "Monthly bug fixes",
      "Basic performance monitoring",
      "Email support (48h response)",
      "Minor updates & patches",
      "App store compliance",
      "Monthly reports",
    ],
    responseTime: "48 hours",
    popular: false,
  },
  {
    name: "Professional Support",
    price: "Rs 15,000/month",
    description: "Comprehensive maintenance solution",
    features: [
      "Everything in Basic",
      "Weekly bug fixes",
      "Performance optimization",
      "Phone & email support (24h response)",
      "Feature updates",
      "Security monitoring",
      "Bi-weekly reports",
      "Priority support queue",
    ],
    responseTime: "24 hours",
    popular: true,
  },
  {
    name: "Enterprise Support",
    price: "Rs 25,000/month",
    description: "Premium maintenance & dedicated support",
    features: [
      "Everything in Professional",
      "Daily monitoring",
      "Immediate critical fixes",
      "Dedicated support manager",
      "Custom feature development",
      "Advanced analytics",
      "Weekly reports & calls",
      "SLA guarantees",
    ],
    responseTime: "4 hours",
    popular: false,
  },
]

const maintenanceStats = [
  { label: "Average Response Time", value: "< 24 hours", icon: Clock },
  { label: "Bug Fix Success Rate", value: "99.5%", icon: Bug },
  { label: "Apps Maintained", value: "50+", icon: Smartphone },
  { label: "Client Satisfaction", value: "4.9/5", icon: TrendingUp },
]

const commonIssues = [
  {
    issue: "App Crashes",
    solution: "Comprehensive crash analysis and memory leak fixes",
    urgency: "Critical",
    timeframe: "2-4 hours",
  },
  {
    issue: "Performance Issues",
    solution: "Code optimization and resource management",
    urgency: "High",
    timeframe: "1-2 days",
  },
  {
    issue: "UI/UX Problems",
    solution: "Interface improvements and user experience fixes",
    urgency: "Medium",
    timeframe: "2-3 days",
  },
  {
    issue: "Compatibility Issues",
    solution: "OS updates and device compatibility fixes",
    urgency: "Medium",
    timeframe: "3-5 days",
  },
]

const maintenanceProcess = [
  {
    step: 1,
    title: "Issue Identification",
    description: "Monitor app performance and identify issues",
    duration: "Continuous",
  },
  {
    step: 2,
    title: "Priority Assessment",
    description: "Categorize issues by severity and impact",
    duration: "1-2 hours",
  },
  {
    step: 3,
    title: "Fix Implementation",
    description: "Develop and test solutions for identified issues",
    duration: "Varies by complexity",
  },
  {
    step: 4,
    title: "Deployment & Monitoring",
    description: "Deploy fixes and monitor for improvements",
    duration: "1-2 days",
  },
]

export default function MaintenanceSupportService() {
  const [selectedPlan, setSelectedPlan] = useState(1)

  return (
    <div className="min-h-screen section-bg">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <Wrench className="w-4 h-4 mr-2" />
              App Maintenance & Support
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Keep Your App
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                {" "}
                Running Smoothly
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Professional maintenance and support services to ensure your mobile app stays updated, secure, and
              performing at its best.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                asChild
              >
                <Link href="#plans">
                  View Support Plans <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#issues">Common Issues</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Maintenance Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {maintenanceStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <stat.icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                    <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Services */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 section-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive Maintenance Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Complete app maintenance solutions to keep your application running optimally
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {maintenanceServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <service.icon className="w-12 h-12 text-green-600 mb-4" />
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((item, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Issues */}
      <section id="issues" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Common App Issues We Resolve
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Quick resolution for the most frequent mobile app problems
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {commonIssues.map((item, index) => (
              <motion.div
                key={item.issue}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <CardTitle className="text-xl">{item.issue}</CardTitle>
                      <div className="flex gap-2">
                        <Badge
                          variant={
                            item.urgency === "Critical"
                              ? "destructive"
                              : item.urgency === "High"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {item.urgency}
                        </Badge>
                        <Badge variant="outline">{item.timeframe}</Badge>
                      </div>
                    </div>
                    <CardDescription className="text-base">{item.solution}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 section-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Maintenance Process
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Systematic approach to keeping your app in perfect condition
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {maintenanceProcess.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{step.description}</p>
                <Badge variant="outline">{step.duration}</Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Plans */}
      <section id="plans" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Maintenance & Support Plans
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Choose the right support level for your app's needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {supportPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`relative h-full ${plan.popular ? "ring-2 ring-green-500 shadow-xl" : ""}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold text-green-600">{plan.price}</div>
                    <CardDescription>{plan.description}</CardDescription>
                    <Badge variant="outline">Response: {plan.responseTime}</Badge>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full mt-6 ${plan.popular ? "bg-green-600 hover:bg-green-700" : ""}`}
                      variant={plan.popular ? "default" : "outline"}
                      asChild
                    >
                      <Link href="/#contact">Choose Plan</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready for Reliable App Support?</h2>
            <p className="text-xl text-green-100 mb-8">
              Let's keep your app running smoothly with professional maintenance services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/#contact">
                  Start Maintenance Plan <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
                asChild
              >
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
