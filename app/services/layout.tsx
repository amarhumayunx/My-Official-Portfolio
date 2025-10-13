import type { Metadata } from "next"
import Link from "next/link"
import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: {
    default: "Services | Muhammad Huzaifa",
    template: "%s | Services • Muhammad Huzaifa",
  },
  description:
    "Professional mobile development services including Flutter, Android, Realtime features, Security, Firebase, AI/ML, Deployment, and Ongoing Maintenance.",
}

const servicesNav = [
  { href: "/services/flutter-development", label: "Flutter" },
  { href: "/services/android-development", label: "Android" },
  { href: "/services/firebase-integration", label: "Firebase" },
  { href: "/services/ai-ml-integration", label: "AI/ML" },
  { href: "/services/security-solutions", label: "Security" },
  { href: "/services/realtime-features", label: "Realtime" },
  { href: "/services/app-deployment", label: "Deployment" },
  { href: "/services/maintenance-support", label: "Maintenance" },
]

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {/* Section header */}
      <div className="relative isolate overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-800 text-white">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-8 sm:pt-24">
          <h2 className="text-2xl font-semibold sm:text-3xl">Services</h2>
          <p className="mt-2 max-w-2xl text-white/80">
            From concept to launch—pick the capabilities you need and I’ll tailor an engagement to your goals.
          </p>
          {/* Scrollable nav */}
          <div className="mt-6 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {servicesNav.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="secondary"
                  className={cn("bg-white/10 text-white hover:bg-white/20", "whitespace-nowrap border border-white/10")}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 stroke-white/10"
          viewBox="0 0 1024 1024"
        >
          <circle cx="512" cy="512" r="512" fill="none" strokeWidth="100" />
        </svg>
      </div>

      {/* Page content */}
      <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
    </div>
  )
}
