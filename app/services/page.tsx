import type { Metadata } from "next"
import ServicesOverview from "@/components/sections/ServicesOverview"

export const metadata: Metadata = {
  title: "Services - Muhammad Humayun Amar | Flutter & Mobile Development",
  description:
    "Professional Flutter development, Android native apps, Firebase integration, AI/ML solutions, and more. Comprehensive mobile development services.",
  keywords:
    "Flutter development services, Android app development, Firebase integration, mobile app services, cross-platform development",
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen pt-16">
      <ServicesOverview />
    </main>
  )
}
