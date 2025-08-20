import type { Metadata } from "next"
import FirebaseIntegrationService from "@/components/services/FirebaseIntegrationService"

export const metadata: Metadata = {
  title: "Firebase Backend Integration Services | Muhammad Huzaifa",
  description:
    "Professional Firebase backend integration services including authentication, real-time database, cloud functions, and hosting solutions for mobile and web applications.",
  keywords:
    "Firebase, backend integration, real-time database, authentication, cloud functions, hosting, mobile backend",
}

export default function FirebaseIntegrationPage() {
  return <FirebaseIntegrationService />
}
