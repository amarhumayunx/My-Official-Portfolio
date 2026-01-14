"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Calendar, Award, TrendingUp } from "lucide-react"

interface TimelineEvent {
  year: string
  title: string
  description: string
  level: number
  icon?: React.ComponentType<{ className?: string }>
}

interface SkillTimelineProps {
  skillName: string
  events: TimelineEvent[]
}

export function SkillTimeline({ skillName, events }: SkillTimelineProps) {
  return (
    <div className="relative">
      <h3 className="text-lg font-semibold mb-6">{skillName} Timeline</h3>
      <div className="relative pl-8 border-l-2 border-primary/30">
        {events.map((event, index) => {
          const Icon = event.icon || Calendar
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative mb-8 last:mb-0"
            >
              <div className="absolute -left-11 w-8 h-8 rounded-full bg-primary flex items-center justify-center border-4 border-background">
                <Icon className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{event.title}</span>
                  <span className="text-sm text-muted-foreground">{event.year}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{event.level}% proficiency</span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
