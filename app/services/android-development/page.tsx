import type { Metadata } from "next"
import AndroidDevelopmentService from "@/components/services/AndroidDevelopmentService"

export const metadata: Metadata = {
  title: "Android Development Services - Native Kotlin Apps | Muhammad Humayun Amar",
  description:
    "Professional Android development services using Kotlin, Jetpack Compose, and modern architecture. Native Android apps with Material Design.",
  keywords:
    "Android development, Kotlin development, native Android apps, Jetpack Compose, Material Design, Android services",
}

export default function AndroidDevelopmentPage() {
  return (
    <main className="min-h-screen pt-24">
      <AndroidDevelopmentService />
    </main>
  )
}
