"use client"

import { useState } from "react"
import { LinkIcon, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

interface CopyLinkButtonProps {
  url: string
  text?: string
  variant?: "default" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function CopyLinkButton({ 
  url, 
  text = "Copy Link",
  variant = "outline",
  size = "sm",
  className 
}: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast({
        title: "Link Copied!",
        description: "The link has been copied to your clipboard.",
        variant: "default",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
      toast({
        title: "Failed to Copy",
        description: "Could not copy the URL to clipboard. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleCopy}
      className={className}
      aria-label="Copy link to clipboard"
    >
      <motion.div
        animate={{ rotate: copied ? 360 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {copied ? (
          <Check className="w-4 h-4 mr-2 text-green-500" />
        ) : (
          <LinkIcon className="w-4 h-4 mr-2" />
        )}
      </motion.div>
      {copied ? "Copied!" : text}
    </Button>
  )
}
