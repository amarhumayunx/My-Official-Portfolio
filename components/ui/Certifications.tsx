"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Award, ExternalLink, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Certification {
  name: string
  issuer: string
  date: string
  credentialId?: string
  credentialUrl?: string
  icon?: string
}

interface CertificationsProps {
  certifications: Certification[]
}

export function Certifications({ certifications }: CertificationsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Award className="w-5 h-5" />
        Certifications
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{cert.name}</h4>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  </div>
                  {cert.icon && (
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl">{cert.icon}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{cert.date}</span>
                  </div>
                  {cert.credentialId && (
                    <Badge variant="secondary" className="text-xs">
                      ID: {cert.credentialId}
                    </Badge>
                  )}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto"
                    >
                      <ExternalLink className="w-4 h-4 text-primary hover:text-primary/80" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
