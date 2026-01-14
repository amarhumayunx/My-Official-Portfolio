"use client"

import { Rocket, GitBranch, ShieldCheck, Store, Repeat, Monitor, Bell, Layers } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const pillars = [
  {
    icon: <GitBranch className="h-5 w-5" />,
    title: "CI/CD Pipelines",
    desc: "Automated builds, tests, and releases via GitHub Actions and Fastlane.",
  },
  {
    icon: <Store className="h-5 w-5" />,
    title: "Store Publishing",
    desc: "Play Store and App Store setup, signing, screenshots, listing, and reviews.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Signing & Security",
    desc: "Keystore management, secrets, and secure provisioning profiles.",
  },
  {
    icon: <Repeat className="h-5 w-5" />,
    title: "Staged Rollouts",
    desc: "Gradual rollouts with rollback safeguards and canary channels.",
  },
  {
    icon: <Monitor className="h-5 w-5" />,
    title: "Monitoring",
    desc: "Crashlytics, performance monitoring, and release health dashboards.",
  },
  {
    icon: <Bell className="h-5 w-5" />,
    title: "Alerts & On‑call",
    desc: "Release alerts, thresholds, and playbooks to react quickly.",
  },
]

export default function AppDeploymentService() {
  return (
    <section className="relative">
      {/* Gradient hero */}
      <div className="relative isolate overflow-hidden bg-black">
        <div className="mx-auto max-w-6xl px-6 pt-24 pb-16 text-white sm:pt-28">
          <div className="flex items-start justify-between gap-6">
            <div>
              <Badge variant="secondary" className="bg-white/15 text-white border-white/20">
                Deployment & Release
              </Badge>
              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
                Ship confidently with clean pipelines and safe rollouts
              </h1>
              <p className="mt-4 max-w-2xl text-white/90">
                From build signing to store publishing, I streamline your releases with CI/CD, staged rollouts, and
                full‑stack monitoring so you can ship faster with fewer surprises.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/consultation">
                  <Button size="lg" className="bg-white text-emerald-700 hover:bg-white/90">
                    <Rocket className="mr-2 h-4 w-4" />
                    Get deployment help
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                  >
                    View all services
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                <div className="flex items-center gap-2 text-white/80">
                  <Layers className="h-5 w-5" />
                  <span>CI Pipeline</span>
                </div>
                <div className="mt-2 h-2 w-64 rounded-full bg-white/20">
                  <div className="h-2 rounded-full bg-white" style={{ width: "72%" }} aria-label="~72% automated" />
                </div>
                <p className="mt-2 text-sm text-white/80">Automation coverage across build and release steps</p>
              </div>
            </div>
          </div>
        </div>
        <svg
          aria-hidden="true"
          className="absolute left-1/2 top-0 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 stroke-white/10"
          viewBox="0 0 1024 1024"
        >
          <circle cx="512" cy="512" r="512" fill="none" strokeWidth="100" />
        </svg>
      </div>

      {/* Pillars */}
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <Card key={p.title} className="border-muted/40">
              <CardHeader>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  {p.icon}
                </div>
                <CardTitle className="mt-2">{p.title}</CardTitle>
                <CardDescription>{p.desc}</CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-xl border bg-background p-6">
          <h3 className="text-lg font-semibold">What you get</h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-muted-foreground">
            <li>CI/CD blueprints for Android and Flutter apps</li>
            <li>Automated versioning, changelogs, and signing</li>
            <li>Play Store & App Store optimized listings</li>
            <li>Staged rollout strategy with rollback plan</li>
            <li>Monitoring setup with alerts and dashboards</li>
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/contact">
              <Button>Start your next release</Button>
            </Link>
            <Link href="/projects">
              <Button variant="ghost">See shipped apps</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
