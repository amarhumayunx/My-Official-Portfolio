import type React from "react"
import type { Metadata } from "next"
import Suggestions from "@/components/ui/Suggestions"

export const metadata: Metadata = {
  title: "Services - Muhammad Humayun Amar | Professional Mobile Development",
  description:
    "Comprehensive mobile development services including Flutter, Android, Firebase, AI/ML integration, security solutions, and ongoing support.",
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Suggestions currentPage="/services" maxSuggestions={4} showCategories={true} />
    </>
  )
}
