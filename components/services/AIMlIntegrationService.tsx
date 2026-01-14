"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Brain, Eye, Mic, MessageSquare, Zap, CheckCircle, ArrowRight, Camera, Bot, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const aiFeatures = [
  {
    icon: Eye,
    title: "Computer Vision",
    description: "Image recognition and visual intelligence",
    features: ["Object detection", "Face recognition", "OCR text extraction", "Image classification"],
  },
  {
    icon: Mic,
    title: "Speech & Audio",
    description: "Voice recognition and audio processing",
    features: ["Speech-to-text", "Text-to-speech", "Voice commands", "Audio analysis"],
  },
  {
    icon: MessageSquare,
    title: "Natural Language",
    description: "Text analysis and language understanding",
    features: ["Sentiment analysis", "Language translation", "Text summarization", "Chatbots"],
  },
  {
    icon: Brain,
    title: "Custom ML Models",
    description: "Tailored machine learning solutions",
    features: ["TensorFlow Lite", "Core ML", "ONNX models", "Edge computing"],
  },
]

const pricingTiers = [
  {
    name: "Basic AI Features",
    price: "Rs 35,000",
    duration: "2-3 weeks",
    description: "Essential AI capabilities for your app",
    features: [
      "ML Kit integration",
      "Basic computer vision",
      "Text recognition (OCR)",
      "Face detection",
      "Barcode scanning",
      "Implementation & testing",
    ],
    popular: false,
  },
  {
    name: "Advanced AI Solution",
    price: "Rs 65,000",
    duration: "3-4 weeks",
    description: "Comprehensive AI and ML integration",
    features: [
      "Everything in Basic",
      "Custom TensorFlow models",
      "Speech recognition",
      "Natural language processing",
      "Image classification",
      "Real-time processing",
      "Performance optimization",
      "Documentation & training",
    ],
    popular: true,
  },
  {
    name: "Enterprise AI Platform",
    price: "Rs 120,000+",
    duration: "4-6 weeks",
    description: "Full-scale AI-powered application",
    features: [
      "Everything in Advanced",
      "Custom model training",
      "Multi-modal AI features",
      "Cloud AI integration",
      "Advanced analytics",
      "A/B testing framework",
      "Continuous learning",
      "Ongoing AI support",
    ],
    popular: false,
  },
]

const technologies = [
  "TensorFlow Lite",
  "ML Kit",
  "Core ML",
  "OpenCV",
  "PyTorch Mobile",
  "ONNX Runtime",
  "MediaPipe",
  "Dialogflow",
  "Google AI",
  "Azure Cognitive",
]

const aiUseCases = [
  {
    title: "Smart Photo Analysis",
    description: "Automatic photo categorization and content detection",
    icon: Camera,
    examples: ["Food recognition", "Document scanning", "Product identification"],
  },
  {
    title: "Intelligent Chatbots",
    description: "AI-powered conversational interfaces",
    icon: Bot,
    examples: ["Customer support", "Personal assistants", "FAQ automation"],
  },
  {
    title: "Predictive Analytics",
    description: "Data-driven insights and predictions",
    icon: Brain,
    examples: ["User behavior", "Recommendation systems", "Trend analysis"],
  },
  {
    title: "Real-time Processing",
    description: "Live AI processing for instant results",
    icon: Zap,
    examples: ["Live translation", "Gesture recognition", "Voice commands"],
  },
]

const developmentProcess = [
  {
    step: 1,
    title: "AI Requirements Analysis",
    description: "Define AI use cases and select appropriate models",
    duration: "2-3 days",
  },
  {
    step: 2,
    title: "Model Selection & Training",
    description: "Choose or train ML models for your specific needs",
    duration: "5-7 days",
  },
  {
    step: 3,
    title: "Integration Development",
    description: "Implement AI features in your mobile application",
    duration: "7-14 days",
  },
  {
    step: 4,
    title: "Optimization & Testing",
    description: "Performance tuning and comprehensive AI testing",
    duration: "3-5 days",
  },
]

export default function AIMlIntegrationService() {
  const [selectedTier, setSelectedTier] = useState(1)

  return (
    <div className="min-h-screen section-bg">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="mb-4 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              <Brain className="w-4 h-4 mr-2" />
              AI & Machine Learning Integration
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Intelligent Mobile
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                {" "}
                AI Solutions
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Transform your mobile applications with cutting-edge AI and machine learning capabilities. From computer
              vision to natural language processing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                asChild
              >
                <Link href="#pricing">
                  Explore AI Solutions <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#use-cases">View Use Cases</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">AI & ML Capabilities</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive artificial intelligence features for modern mobile applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <feature.icon className="w-12 h-12 text-purple-600 mb-4" />
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

      {/* Technologies */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 section-bg">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">AI & ML Technologies</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Use Cases */}
      <section id="use-cases" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              AI Use Cases & Applications
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Real-world AI implementations for various industries
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {aiUseCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <useCase.icon className="w-8 h-8 text-purple-600 mr-3" />
                      <CardTitle className="text-xl">{useCase.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">{useCase.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300">Examples:</h4>
                      {useCase.examples.map((example, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <Sparkles className="w-4 h-4 text-yellow-500 mr-2" />
                          {example}
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 section-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              AI Integration Process
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Structured approach to implementing AI in your applications
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
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
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
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              AI Integration Pricing
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Flexible pricing for AI and machine learning solutions
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
                <Card className={`relative h-full ${tier.popular ? "ring-2 ring-purple-500 shadow-xl" : ""}`}>
                  {tier.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <div className="text-3xl font-bold text-purple-600">{tier.price}</div>
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
                      className={`w-full mt-6 ${tier.popular ? "bg-purple-600 hover:bg-purple-700" : ""}`}
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 section-bg">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Add AI to Your App?</h2>
            <p className="text-xl text-purple-100 mb-8">Let's discuss how AI can transform your mobile application</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/#contact">
                  Start AI Project <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
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
