import type { Metadata } from "next"
import AppDeploymentService from "@/components/services/app-deployment-service"

export const metadata: Metadata = {
  title: "App Deployment & Release Management | Muhammad Huzaifa",
  description:
    "End‑to‑end mobile app deployment: CI/CD, Play Store and App Store publishing, signing, versioning, staged rollouts, and monitoring.",
  keywords:
    "app deployment, release management, Play Store, App Store, CI/CD, fastlane, versioning, staged rollout, monitoring",
}

export default function AppDeploymentPage() {
  return (
    <main className="min-h-screen">
      <AppDeploymentService />
    </main>
  )
}
