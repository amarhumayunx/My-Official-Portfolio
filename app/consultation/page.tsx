import type { Metadata } from "next"
import ConsultationPage from "@/components/pages/ConsultationPage"

export const metadata: Metadata = {
  title: "Free Consultation - Muhammad Humayun Amar | Flutter Developer",
  description:
    "Get a free consultation for your mobile app project. Discuss your requirements, get expert advice, and receive a detailed project proposal.",
  keywords:
    "free consultation, mobile app consultation, Flutter developer consultation, project planning, app development advice",
  openGraph: {
    title: "Free Consultation - Muhammad Humayun Amar",
    description: "Get expert advice for your mobile app project with a free consultation",
    type: "website",
    url: "https://amarhumayun.vercel.app/consultation",
  },
}

export default function Consultation() {
  return <ConsultationPage />
}
