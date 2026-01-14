import type { Metadata } from "next"
import FlutterDevelopmentService from "@/components/services/FlutterDevelopmentService"

export const metadata: Metadata = {
  title: "Flutter Development Services - Cross-Platform Mobile Apps | Muhammad Humayun Amar",
  description:
    "Professional Flutter development services for iOS and Android. Custom UI/UX, state management, performance optimization, and cross-platform solutions.",
  keywords:
    "Flutter development, cross-platform apps, iOS Android development, Flutter services, mobile app development",
}

export default function FlutterDevelopmentPage() {
  return (
    <main className="min-h-screen pt-24">
      <FlutterDevelopmentService />
    </main>
  )
}
