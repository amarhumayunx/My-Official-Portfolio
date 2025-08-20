"use client"

import InlineSuggestions from "@/components/ui/InlineSuggestions"

interface RelatedServicesProps {
  currentService?: string
  className?: string
}

const serviceRelations = {
  "flutter-development": [
    {
      id: "firebase-integration",
      title: "Firebase Backend",
      description: "Add real-time database and authentication to your Flutter app",
      href: "/services/firebase-integration",
      category: "service" as const,
      icon: "🔥",
      cta: "Add Backend",
    },
    {
      id: "ai-ml-integration",
      title: "AI & ML Features",
      description: "Enhance your Flutter app with intelligent capabilities",
      href: "/services/ai-ml-integration",
      category: "service" as const,
      icon: "🧠",
      cta: "Add AI Features",
    },
    {
      id: "security-solutions",
      title: "Security Solutions",
      description: "Protect your Flutter app with enterprise-grade security",
      href: "/services/security-solutions",
      category: "service" as const,
      icon: "🛡️",
      cta: "Secure App",
    },
    {
      id: "maintenance-support",
      title: "Maintenance & Support",
      description: "Keep your Flutter app updated and running smoothly",
      href: "/services/maintenance-support",
      category: "service" as const,
      icon: "🔧",
      cta: "Get Support",
    },
  ],
  "android-development": [
    {
      id: "security-solutions",
      title: "Security Solutions",
      description: "Implement advanced security for your Android app",
      href: "/services/security-solutions",
      category: "service" as const,
      icon: "🛡️",
      cta: "Secure App",
    },
    {
      id: "firebase-integration",
      title: "Firebase Backend",
      description: "Power your Android app with Firebase services",
      href: "/services/firebase-integration",
      category: "service" as const,
      icon: "🔥",
      cta: "Add Backend",
    },
    {
      id: "flutter-development",
      title: "Flutter Development",
      description: "Consider cross-platform development with Flutter",
      href: "/services/flutter-development",
      category: "service" as const,
      icon: "📱",
      cta: "Go Cross-Platform",
    },
    {
      id: "maintenance-support",
      title: "Maintenance & Support",
      description: "Ongoing support for your Android application",
      href: "/services/maintenance-support",
      category: "service" as const,
      icon: "🔧",
      cta: "Get Support",
    },
  ],
  "firebase-integration": [
    {
      id: "flutter-development",
      title: "Flutter Development",
      description: "Build cross-platform apps that work with Firebase",
      href: "/services/flutter-development",
      category: "service" as const,
      icon: "📱",
      cta: "Build App",
    },
    {
      id: "android-development",
      title: "Android Development",
      description: "Create native Android apps with Firebase integration",
      href: "/services/android-development",
      category: "service" as const,
      icon: "🤖",
      cta: "Build Android App",
    },
    {
      id: "security-solutions",
      title: "Security Solutions",
      description: "Secure your Firebase backend and data",
      href: "/services/security-solutions",
      category: "service" as const,
      icon: "🛡️",
      cta: "Secure Backend",
    },
    {
      id: "ai-ml-integration",
      title: "AI & ML Integration",
      description: "Add intelligent features to your Firebase-powered app",
      href: "/services/ai-ml-integration",
      category: "service" as const,
      icon: "🧠",
      cta: "Add AI",
    },
  ],
  "ai-ml-integration": [
    {
      id: "flutter-development",
      title: "Flutter Development",
      description: "Build Flutter apps with integrated AI capabilities",
      href: "/services/flutter-development",
      category: "service" as const,
      icon: "📱",
      cta: "Build Smart App",
    },
    {
      id: "firebase-integration",
      title: "Firebase Backend",
      description: "Store and process AI data with Firebase",
      href: "/services/firebase-integration",
      category: "service" as const,
      icon: "🔥",
      cta: "Add Backend",
    },
    {
      id: "security-solutions",
      title: "Security Solutions",
      description: "Protect sensitive AI data and models",
      href: "/services/security-solutions",
      category: "service" as const,
      icon: "🛡️",
      cta: "Secure AI",
    },
    {
      id: "maintenance-support",
      title: "Maintenance & Support",
      description: "Keep your AI features updated and optimized",
      href: "/services/maintenance-support",
      category: "service" as const,
      icon: "🔧",
      cta: "Maintain AI",
    },
  ],
  "security-solutions": [
    {
      id: "android-development",
      title: "Android Development",
      description: "Build secure native Android applications",
      href: "/services/android-development",
      category: "service" as const,
      icon: "🤖",
      cta: "Build Secure App",
    },
    {
      id: "flutter-development",
      title: "Flutter Development",
      description: "Create secure cross-platform applications",
      href: "/services/flutter-development",
      category: "service" as const,
      icon: "📱",
      cta: "Build Secure App",
    },
    {
      id: "firebase-integration",
      title: "Firebase Backend",
      description: "Implement secure Firebase backend solutions",
      href: "/services/firebase-integration",
      category: "service" as const,
      icon: "🔥",
      cta: "Secure Backend",
    },
    {
      id: "maintenance-support",
      title: "Maintenance & Support",
      description: "Ongoing security updates and monitoring",
      href: "/services/maintenance-support",
      category: "service" as const,
      icon: "🔧",
      cta: "Security Support",
    },
  ],
  "maintenance-support": [
    {
      id: "flutter-development",
      title: "Flutter Development",
      description: "Build new Flutter apps with ongoing support",
      href: "/services/flutter-development",
      category: "service" as const,
      icon: "📱",
      cta: "Build New App",
    },
    {
      id: "android-development",
      title: "Android Development",
      description: "Develop Android apps with maintenance included",
      href: "/services/android-development",
      category: "service" as const,
      icon: "🤖",
      cta: "Build Android App",
    },
    {
      id: "security-solutions",
      title: "Security Solutions",
      description: "Add security features to your existing app",
      href: "/services/security-solutions",
      category: "service" as const,
      icon: "🛡️",
      cta: "Enhance Security",
    },
    {
      id: "ai-ml-integration",
      title: "AI & ML Integration",
      description: "Add intelligent features to your maintained app",
      href: "/services/ai-ml-integration",
      category: "service" as const,
      icon: "🧠",
      cta: "Add AI Features",
    },
  ],
}

export default function RelatedServices({ currentService, className = "" }: RelatedServicesProps) {
  if (!currentService || !serviceRelations[currentService as keyof typeof serviceRelations]) {
    return null
  }

  const suggestions = serviceRelations[currentService as keyof typeof serviceRelations]

  return (
    <InlineSuggestions
      title="Complementary Services"
      suggestions={suggestions}
      maxItems={4}
      columns={2}
      showCategories={false}
      className={className}
    />
  )
}
