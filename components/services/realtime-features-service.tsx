"use client"

import { Activity, SignalHigh, Webhook, Users, MessageCircle, Shield, BarChart3, Zap } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const features = [
  {
    icon: <SignalHigh className="h-5 w-5" />,
    title: "Live Presence",
    desc: "Show who is online, typing, or viewing the same screen in real time.",
  },
  {
    icon: <MessageCircle className="h-5 w-5" />,
    title: "In‑App Chat",
    desc: "Reliable one‑to‑one and group chat with read receipts and typing indicators.",
  },
  {
    icon: <Webhook className="h-5 w-5" />,
    title: "Event Streaming",
    desc: "WebSockets, SSE, and pub/sub for low‑latency updates across clients.",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Live Dashboards",
    desc: "Auto‑refreshing KPIs and charts with graceful fallback and caching.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Collaborative Editing",
    desc: "Conflict‑free realtime docs with CRDT/OT strategies where needed.",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Secure by Design",
    desc: "Auth, rate‑limits, and permission checks to keep your data protected.",
  },
]

const stacks = [
  "Firebase RTDB/Firestore",
  "WebSockets/SSE",
  "Supabase Realtime",
  "Cloud Functions",
  "Redis Pub/Sub",
  "Edge Caching",
]

export default function RealtimeFeaturesService() {
  return (
    <section className="relative">
      {/* Gradient hero */}
      <div className="relative isolate overflow-hidden bg-black">
        <div className="mx-auto max-w-6xl px-6 pt-24 pb-16 text-white sm:pt-28">
          <div className="flex items-start justify-between gap-6">
            <div>
              <Badge variant="secondary" className="bg-white/15 text-white border-white/20">
                Realtime & Live UX
              </Badge>
              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
                Build experiences that update the moment they happen
              </h1>
              <p className="mt-4 max-w-2xl text-white/90">
                I deliver realtime features with robust architecture: presence, live sync, chat, notifications, and live
                dashboards—powered by WebSockets, Firebase, and event‑driven backends.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/consultation">
                  <Button size="lg" className="bg-white text-fuchsia-700 hover:bg-white/90">
                    <Zap className="mr-2 h-4 w-4" />
                    Start a free consultation
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                  >
                    See relevant projects
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                <div className="flex items-center gap-2 text-white/80">
                  <Activity className="h-5 w-5" />
                  <span>Latency</span>
                </div>
                <div className="mt-2 h-2 w-64 rounded-full bg-white/20">
                  <div className="h-2 rounded-full bg-white" style={{ width: "18%" }} aria-label="~18ms" />
                </div>
                <p className="mt-2 text-sm text-white/80">Typical p95 update time in optimized flows</p>
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

      {/* Features */}
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="border-muted/40">
              <CardHeader>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-fuchsia-100 text-fuchsia-700">
                  {f.icon}
                </div>
                <CardTitle className="mt-2">{f.title}</CardTitle>
                <CardDescription>{f.desc}</CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          ))}
        </div>

        {/* Stack */}
        <div className="mt-10 rounded-xl border card-bg p-6">
          <h3 className="text-lg font-semibold">Preferred stack</h3>
          <p className="mt-1 text-muted-foreground">
            Pick the right tool for the job while keeping cost and complexity in check.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {stacks.map((s) => (
              <Badge key={s} variant="secondary" className="bg-muted text-foreground">
                {s}
              </Badge>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/contact">
              <Button>Discuss your use case</Button>
            </Link>
            <Link href="/services">
              <Button variant="ghost">Explore all services</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
