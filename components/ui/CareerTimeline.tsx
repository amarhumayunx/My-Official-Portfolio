"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Briefcase, Calendar, MapPin, Award } from "lucide-react"

interface TimelineEvent {
  date: string
  title: string
  company?: string
  location?: string
  description: string
  type: "work" | "education" | "achievement"
  icon?: React.ComponentType<{ className?: string }>
}

interface CareerTimelineProps {
  events: TimelineEvent[]
}

export function CareerTimeline({ events }: CareerTimelineProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "work":
        return Briefcase
      case "education":
        return Award
      default:
        return Calendar
    }
  }

  return (
    <div className="relative">
      <div className="relative pl-8 border-l-2 border-primary/30">
        {events.map((event, index) => {
          const Icon = event.icon || getIcon(event.type)
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative mb-8 last:mb-0"
            >
              <div className="absolute -left-11 w-8 h-8 rounded-full bg-primary flex items-center justify-center border-4 border-background shadow-lg">
                <Icon className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
                    {event.company && (
                      <p className="text-primary font-medium">{event.company}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-2 md:mt-0">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-muted-foreground mt-2">{event.description}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
