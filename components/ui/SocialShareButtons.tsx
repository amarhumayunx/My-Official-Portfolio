"use client"

import { motion } from "framer-motion"
import { Twitter, Linkedin, Facebook, Share2, LinkIcon, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/DropdownMenu" // Updated import path
import { useToast } from "@/hooks/use-toast"

interface SocialShareButtonsProps {
  url: string
  title: string
}

export function SocialShareButtons({ url, title }: SocialShareButtonsProps) {
  const { toast } = useToast()
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&via=amarhumayunx`, // Assuming your Twitter handle
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedTitle}&source=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      toast({
        title: "Link Copied!",
        description: "The blog post URL has been copied to your clipboard.",
        action: <Check className="h-4 w-4 text-green-500" />,
      })
    } catch (err) {
      console.error("Failed to copy: ", err)
      toast({
        title: "Failed to Copy",
        description: "Could not copy the URL to clipboard.",
        variant: "destructive",
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-medium text-muted-foreground">Share this post:</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
            <Share2 className="w-4 h-4" /> Share
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Twitter className="w-4 h-4 text-blue-400" /> Twitter
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Linkedin className="w-4 h-4 text-blue-600" /> LinkedIn
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Facebook className="w-4 h-4 text-blue-700" /> Facebook
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopyLink} className="flex items-center gap-2 cursor-pointer">
            <LinkIcon className="w-4 h-4 text-gray-500" /> Copy Link
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  )
}
