"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Shield, Lock, FileCheck, CheckCircle, ArrowRight, Fingerprint, Database, Network } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const securityFeatures = [
  {
    icon: Lock,
    title: "Data Encryption",
    description: "End-to-end encryption for sensitive data",
    features: ["AES-256 encryption", "RSA key exchange", "Secure key storage", "Database encryption"],
  },
  {
    icon: Fingerprint,
    title: "Biometric Authentication",
    description: "Advanced user authentication methods",
    features: ["Fingerprint auth", "Face recognition", "Voice authentication", "Multi-factor auth"],
  },
  {
    icon: Network,
    title: "Secure Communication",
    description: "Protected data transmission",
    features: ["SSL/TLS protocols", "Certificate pinning", "API security", "Network monitoring"],
  },
  {
    icon: Database,
    title: "Secure Storage",
    description: "Protected local and cloud storage",
    features: ["Encrypted databases", "Secure preferences", "Keychain integration", "Cloud encryption"],
  },
]

const pricingTiers = [
  {
    name: "Basic Security",
    price: "Rs 30,000",
    duration: "2-3 weeks",
    description: "Essential security implementation",
    features: [
      "Basic data encryption",
      "Secure authentication",
      "SSL/TLS implementation",
      "Input validation",
      "Security best practices",
      "Basic security audit",
    ],
    popular: false,
  },
  {
    name: "Advanced Security",
    price: "Rs 55,000",
    duration: "3-4 weeks",
    description: "Comprehensive security solution",
    features: [
      "Everything in Basic",
      "Biometric authentication",
      "Advanced encryption",
      "Certificate pinning",
      "Secure key management",
      "Security monitoring",
      "Penetration testing",
      "Security documentation",
    ],
    popular: true,
  },
  {
    name: "Enterprise Security",
    price: "Rs 100,000+",
    duration: "4-6 weeks",
    description: "Military-grade security platform",
    features: [
      "Everything in Advanced",
      "Custom security protocols",
      "Advanced threat detection",
      "Security compliance",
      "Regular security audits",
      "Incident response plan",
      "Security training",
      "Ongoing security support",
    ],
    popular: false,
  },
]

const securityStandards = [
  "OWASP Mobile Top 10",
  "ISO 27001",
  "NIST Framework",
  "GDPR Compliance",
  "HIPAA Compliance",
  "PCI DSS",
  "SOC 2",
  "Common Criteria",
]

const securityThreats = [
  {
    threat: "Data Breaches",
    solution: "End-to-end encryption and secure storage",
    icon: Database,
    severity: "Critical",
  },
  {
    threat: "Man-in-the-Middle Attacks",
    solution: "Certificate pinning and secure protocols",
    icon: Network,
    severity: "High",
  },
  {
    threat: "Unauthorized Access",
    solution: "Multi-factor authentication and biometrics",
    icon: Fingerprint,
    severity: "High",
  },
  {
    threat: "Code Injection",
    solution: "Input validation and secure coding practices",
    icon: FileCheck,
    severity: "Medium",
  },
]

const portfolioProjects = [
  {
    name: "SafeCrypt",
    description: "Secure password manager with military-grade encryption",
    features: ["AES-256 encryption", "Biometric authentication", "Secure cloud sync"],
    image: "/images/safecrypt-app.png",
  },
  {
    name: "BalanceBite",
    description: "Health app with HIPAA-compliant data protection",
    features: ["Encrypted health data", "Secure user authentication", "Privacy controls"],
    image: "/images/balancebite-app.png",
  },
]

const developmentProcess = [
  {
    step: 1,
    title: "Security Assessment",
    description: "Comprehensive security audit and threat analysis",
    duration: "2-3 days",
  },
  {
    step: 2,
    title: "Security Architecture",
    description: "Design secure architecture and protocols",
    duration: "3-5 days",
  },
  {
    step: 3,
    title: "Implementation",
    description: "Implement security measures and encryption",
    duration: "7-14 days",
  },
  {
    step: 4,
    title: "Testing & Validation",
    description: "Penetration testing and security validation",
    duration: "3-5 days",
  },
]

export default function SecuritySolutionsService() {
  const [selectedTier, setSelectedTier] = useState(1)

  return (
    <div className="min-h-screen section-bg">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="mb-4 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
              <Shield className="w-4 h-4 mr-2" />
              Security & Encryption Solutions
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Bulletproof Mobile
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                {" "}
                Security
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Protect your mobile applications with enterprise-grade security solutions. Advanced encryption, secure
              authentication, and comprehensive threat protection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                asChild
              >
                <Link href="#pricing">
                  Secure Your App <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#threats">View Threat Protection</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive Security Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Multi-layered security approach to protect your mobile applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <feature.icon className="w-12 h-12 text-red-600 mb-4" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.features.map((item, idx) => (
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

      {/* Security Standards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 section-bg">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Security Standards & Compliance</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {securityStandards.map((standard, index) => (
              <motion.div
                key={standard}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  {standard}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Threat Protection */}
      <section id="threats" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Threat Protection Matrix
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              How we protect against common mobile security threats
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {securityThreats.map((item, index) => (
              <motion.div
                key={item.threat}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <item.icon className="w-8 h-8 text-red-600 mr-3" />
                        <CardTitle className="text-xl">{item.threat}</CardTitle>
                      </div>
                      <Badge
                        variant={
                          item.severity === "Critical"
                            ? "destructive"
                            : item.severity === "High"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {item.severity}
                      </Badge>
                    </div>
                    <CardDescription className="text-base">{item.solution}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Projects */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 section-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Security Implementation Portfolio
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Real projects showcasing advanced security implementations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {portfolioProjects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-video bg-gray-900 flex items-center justify-center">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                    <div className="space-y-2">
                      {project.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <Shield className="w-4 h-4 text-red-500 mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Security Implementation Process
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Systematic approach to implementing robust security measures
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {developmentProcess.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
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

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Security Solutions Pricing
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Invest in your app's security with transparent pricing
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`relative h-full ${tier.popular ? "ring-2 ring-red-500 shadow-xl" : ""}`}>
                  {tier.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <div className="text-3xl font-bold text-red-600">{tier.price}</div>
                    <CardDescription>{tier.description}</CardDescription>
                    <Badge variant="outline">{tier.duration}</Badge>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full mt-6 ${tier.popular ? "bg-red-600 hover:bg-red-700" : ""}`}
                      variant={tier.popular ? "default" : "outline"}
                      asChild
                    >
                      <Link href="/#contact">Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Secure Your Mobile App Today</h2>
            <p className="text-xl text-red-100 mb-8">
              Don't wait for a security breach. Protect your users and data now.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/#contact">
                  Start Security Audit <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-red-600 bg-transparent"
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
