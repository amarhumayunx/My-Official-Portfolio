import type { Metadata } from "next"
import SecuritySolutionsService from "@/components/services/SecuritySolutionsService"

export const metadata: Metadata = {
  title: "Security & Encryption Solutions | Muhammad Huzaifa",
  description:
    "Professional mobile app security services including encryption, secure authentication, data protection, and security audits for Android and Flutter applications.",
  keywords:
    "mobile security, encryption, secure authentication, data protection, security audit, Android security, Flutter security",
}

export default function SecuritySolutionsPage() {
  return <SecuritySolutionsService />
}
