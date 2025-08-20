import type { ReactNode } from "react"
import Suggestions from "@/components/ui/Suggestions"

interface ServicesLayoutProps {
  children: ReactNode
}

export default function ServicesLayout({ children }: ServicesLayoutProps) {
  return (
    <>
      {children}
      <Suggestions currentPage="/services" maxSuggestions={4} showCategories={true} />
    </>
  )
}
