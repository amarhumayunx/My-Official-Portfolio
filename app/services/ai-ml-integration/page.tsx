import type { Metadata } from "next"
import AIMlIntegrationService from "@/components/services/AIMlIntegrationService"

export const metadata: Metadata = {
  title: "AI & Machine Learning Integration Services | Muhammad Huzaifa",
  description:
    "Professional AI and ML integration services for mobile apps including TensorFlow Lite, ML Kit, computer vision, and intelligent features implementation.",
  keywords: "AI integration, machine learning, TensorFlow Lite, ML Kit, computer vision, mobile AI, intelligent apps",
}

export default function AIMlIntegrationPage() {
  return <AIMlIntegrationService />
}
