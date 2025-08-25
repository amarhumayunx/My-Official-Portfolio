import type { Metadata } from "next"
import { ConsultationPageWithABTest } from "@/components/pages/ConsultationPageWithABTest"

export const metadata: Metadata = {
  title: "Free App Development Consultation | Expert Mobile App Strategy",
  description:
    "Get a free consultation for your mobile app project. Expert guidance on development strategy, timeline, and budget. Book your session today.",
  keywords: "app development consultation, mobile app strategy, free consultation, app development expert",
  openGraph: {
    title: "Free App Development Consultation",
    description: "Get expert guidance on your mobile app project. Free consultation available.",
    type: "website",
    url: "https://yoursite.com/consultation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free App Development Consultation",
    description: "Get expert guidance on your mobile app project. Free consultation available.",
  },
}

export default function ConsultationPage() {
  return <ConsultationPageWithABTest />
}
