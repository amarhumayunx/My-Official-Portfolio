import type { Metadata } from "next"
import MaintenanceSupportService from "@/components/services/MaintenanceSupportService"

export const metadata: Metadata = {
  title: "App Maintenance & Support Services | Muhammad Huzaifa",
  description:
    "Professional mobile app maintenance and support services including bug fixes, updates, performance optimization, and ongoing technical support.",
  keywords: "app maintenance, mobile support, bug fixes, app updates, performance optimization, technical support",
}

export default function MaintenanceSupportPage() {
  return <MaintenanceSupportService />
}
