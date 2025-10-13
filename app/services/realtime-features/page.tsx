import type { Metadata } from "next"
import RealtimeFeaturesService from "@/components/services/realtime-features-service"

export const metadata: Metadata = {
  title: "Realtime Features & Live Updates | Muhammad Huzaifa",
  description:
    "Design and implement realtime features like presence, live sync, notifications, in-app chat, and live dashboards using WebSockets, Firebase, and modern event-driven patterns.",
  keywords:
    "realtime features, websockets, firebase realtime, presence, live sync, notifications, in-app chat, pub/sub, SSE",
}

export default function RealtimeFeaturesPage() {
  return (
    <main className="min-h-screen">
      <RealtimeFeaturesService />
    </main>
  )
}
