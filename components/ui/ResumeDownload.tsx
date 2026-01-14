"use client"

import { Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { analytics } from "@/lib/analytics"

interface ResumeDownloadProps {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  showIcon?: boolean
}

const RESUME_URL = "https://1drv.ms/b/c/f52c129f139cdf74/EQwjXMFFgbBLmqfJFSRJ-AYBMongYaCUsS2hpllsTSK0hg?e=RKM7HU"
const RESUME_FILENAME = "Muhammad_Humayun_Amar_CV.pdf"

export function ResumeDownload({
  variant = "default",
  size = "default",
  className = "",
  showIcon = true,
}: ResumeDownloadProps) {
  const handleDownload = () => {
    // Track download event
    analytics.trackClick("resume_download", "engagement")

    // Create a temporary anchor element to trigger download
    const link = document.createElement("a")
    link.href = RESUME_URL
    link.download = RESUME_FILENAME
    link.target = "_blank"
    link.rel = "noopener noreferrer"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        onClick={handleDownload}
        variant={variant}
        size={size}
        className={className}
        aria-label="Download resume"
      >
        {showIcon && <Download className="w-4 h-4 mr-2" />}
        <FileText className="w-4 h-4 mr-2" />
        Download Resume
      </Button>
    </motion.div>
  )
}
