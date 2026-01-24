"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Twitter,
  Facebook,
  Linkedin,
  Link as LinkIcon,
  Copy,
  Check,
  Share2,
  Mail,
  MessageCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface SocialShareButtonsProps {
  url?: string
  title?: string
  description?: string
  className?: string
  variant?: "default" | "compact" | "minimal"
}

export function SocialShareButtons({
  url,
  title = "Muhammad Humayun Amar - Mobile App Developer",
  description = "Professional mobile app developer specializing in Flutter, Android, and cross-platform solutions.",
  className = "",
  variant = "default",
}: SocialShareButtonsProps) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "")
  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%20${encodedUrl}`,
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive",
      })
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: shareUrl,
        })
      } catch (err) {
        // User cancelled or error occurred
      }
    } else {
      handleCopy()
    }
  }

  if (variant === "minimal") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {navigator.share && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNativeShare}
            className="h-8 w-8 p-0"
            aria-label="Share"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 w-8 p-0"
          aria-label="Copy link"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </Button>
      </div>
    )
  }

  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="h-8"
        >
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Twitter"
          >
            <Twitter className="w-4 h-4" />
          </a>
        </Button>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="h-8"
        >
          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </Button>
        {navigator.share && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleNativeShare}
            className="h-8"
            aria-label="Share"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="gap-2"
        >
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Twitter"
          >
            <Twitter className="w-4 h-4" />
            <span className="hidden sm:inline">Twitter</span>
          </a>
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="gap-2"
        >
          <a
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Facebook"
          >
            <Facebook className="w-4 h-4" />
            <span className="hidden sm:inline">Facebook</span>
          </a>
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="gap-2"
        >
          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="gap-2"
        >
          <a
            href={shareLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="gap-2"
        >
          <a
            href={shareLinks.email}
            aria-label="Share via Email"
          >
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">Email</span>
          </a>
        </Button>
      </motion.div>

      {navigator.share && (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNativeShare}
            className="gap-2"
            aria-label="Share"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
        </motion.div>
      )}

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="gap-2"
          aria-label="Copy link"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span className="hidden sm:inline">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span className="hidden sm:inline">Copy Link</span>
            </>
          )}
        </Button>
      </motion.div>
    </div>
  )
}
