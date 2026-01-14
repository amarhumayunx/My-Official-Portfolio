"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface Interest {
  name: string
  icon: string
  description?: string
  color?: string
}

interface PersonalInterestsProps {
  interests: Interest[]
}

export function PersonalInterests({ interests }: PersonalInterestsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Personal Interests</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {interests.map((interest, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <Card className="h-full hover:shadow-lg transition-all cursor-pointer">
              <CardContent className="p-4 text-center">
                <div
                  className="text-4xl mb-2"
                  style={{ color: interest.color || "hsl(var(--primary))" }}
                >
                  {interest.icon}
                </div>
                <h4 className="font-semibold mb-1">{interest.name}</h4>
                {interest.description && (
                  <p className="text-sm text-muted-foreground">{interest.description}</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
