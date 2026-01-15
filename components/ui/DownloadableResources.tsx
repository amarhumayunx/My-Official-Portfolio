"use client"

import { Download, FileText, FileDown, BookOpen, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from "framer-motion"
import { analytics } from "@/lib/analytics"
import { useState } from "react"

interface Resource {
  id: string
  title: string
  description: string
  type: "resume" | "portfolio" | "case-study"
  url: string
  filename: string
  size?: string
  lastUpdated?: string
  icon: React.ReactNode
}

const resources: Resource[] = [
  {
    id: "resume-full",
    title: "Full Resume (PDF)",
    description: "Complete professional resume with all experience, skills, and projects",
    type: "resume",
    url: "https://1drv.ms/b/c/f52c129f139cdf74/EQwjXMFFgbBLmqfJFSRJ-AYBMongYaCUsS2hpllsTSK0hg?e=RKM7HU",
    filename: "Muhammad_Humayun_Amar_Full_Resume.pdf",
    size: "~500 KB",
    lastUpdated: "2025-01-15",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: "resume-1page",
    title: "One-Page Resume (PDF)",
    description: "Condensed resume optimized for quick review",
    type: "resume",
    url: "https://1drv.ms/b/c/f52c129f139cdf74/EQwjXMFFgbBLmqfJFSRJ-AYBMongYaCUsS2hpllsTSK0hg?e=RKM7HU",
    filename: "Muhammad_Humayun_Amar_1Page_Resume.pdf",
    size: "~300 KB",
    lastUpdated: "2025-01-15",
    icon: <FileDown className="w-5 h-5" />,
  },
  {
    id: "portfolio-pdf",
    title: "Portfolio PDF",
    description: "Complete portfolio showcase in PDF format",
    type: "portfolio",
    url: "#", // Will be generated dynamically
    filename: "Muhammad_Humayun_Amar_Portfolio.pdf",
    size: "~2 MB",
    lastUpdated: new Date().toISOString().split("T")[0],
    icon: <BookOpen className="w-5 h-5" />,
  },
]

export function DownloadableResources() {
  const [downloading, setDownloading] = useState<string | null>(null)

  const handleDownload = async (resource: Resource) => {
    setDownloading(resource.id)
    
    try {
      // Track download event
      analytics.trackClick(`download_${resource.type}`, "engagement", {
        resource_id: resource.id,
        resource_name: resource.title,
      })

      if (resource.type === "portfolio") {
        // Generate portfolio PDF (to be implemented)
        alert("Portfolio PDF generation coming soon!")
        setDownloading(null)
        return
      }

      // Create a temporary anchor element to trigger download
      const link = document.createElement("a")
      link.href = resource.url
      link.download = resource.filename
      link.target = "_blank"
      link.rel = "noopener noreferrer"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Reset downloading state after a delay
      setTimeout(() => {
        setDownloading(null)
      }, 1000)
    } catch (error) {
      console.error("Download failed:", error)
      setDownloading(null)
    }
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((resource, index) => (
        <motion.div
          key={resource.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  {resource.icon}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                </div>
              </div>
              <CardDescription className="text-sm">{resource.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <div className="space-y-2 mb-4">
                {resource.size && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <FileText className="w-3 h-3" />
                    <span>{resource.size}</span>
                  </div>
                )}
                {resource.lastUpdated && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>Updated: {new Date(resource.lastUpdated).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              <Button
                onClick={() => handleDownload(resource)}
                disabled={downloading === resource.id}
                className="w-full"
                variant="default"
              >
                {downloading === resource.id ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
                    />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
