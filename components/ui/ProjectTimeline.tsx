"use client"

import { motion } from "framer-motion"
import { Calendar, CheckCircle2, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimelinePhase {
  title: string
  description: string
  duration: string
  status: "completed" | "in-progress" | "planned"
  deliverables?: string[]
}

interface ProjectTimelineProps {
  phases?: TimelinePhase[]
  className?: string
}

export function ProjectTimeline({ phases, className }: ProjectTimelineProps) {
  // Guard against undefined or null phases
  if (!phases || !Array.isArray(phases) || phases.length === 0) {
    return null
  }

  return (
    <div className={cn("relative", className)}>
      {/* Timeline Line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/20" />

      <div className="space-y-8">
        {phases.map((phase, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="relative pl-16"
          >
            {/* Timeline Dot */}
            <div
              className={cn(
                "absolute left-4 top-1 w-4 h-4 rounded-full border-4 border-background",
                phase.status === "completed" && "bg-primary",
                phase.status === "in-progress" && "bg-yellow-500 animate-pulse",
                phase.status === "planned" && "bg-muted-foreground"
              )}
            />

            {/* Content Card */}
            <div className="bg-transparent border border-primary/20 rounded-lg p-6 backdrop-blur-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{phase.title}</h3>
                    {phase.status === "completed" && (
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    )}
                    {phase.status === "in-progress" && (
                      <Clock className="w-5 h-5 text-yellow-500 animate-spin" />
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">{phase.description}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground ml-4">
                  <Calendar className="w-4 h-4" />
                  <span>{phase.duration}</span>
                </div>
              </div>

              {phase.deliverables && phase.deliverables.length > 0 && (
                <div className="mt-4 pt-4 border-t border-primary/10">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Deliverables:</p>
                  <ul className="space-y-1">
                    {phase.deliverables.map((deliverable, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="text-primary">•</span>
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
