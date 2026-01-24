"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WhatsAppButtonProps {
  phoneNumber?: string
  message?: string
  className?: string
  variant?: "floating" | "inline"
}

export function WhatsAppButton({
  phoneNumber = "+923001234567", // Replace with actual number
  message = "Hello! I'm interested in your services.",
  className = "",
  variant = "floating",
}: WhatsAppButtonProps) {
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodedMessage}`

  if (variant === "floating") {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-24 right-4 sm:right-6 z-50 ${className}`}
      >
        <Button
          asChild
          size="lg"
          className="rounded-full h-14 w-14 sm:h-16 sm:w-16 shadow-lg bg-[#25D366] hover:bg-[#20BA5A] text-white p-0"
          aria-label="Contact via WhatsApp"
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
          </a>
        </Button>
        <motion.div
          className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-hidden="true"
        />
      </motion.div>
    )
  }

  return (
    <Button
      asChild
      className={`bg-[#25D366] hover:bg-[#20BA5A] text-white gap-2 ${className}`}
      aria-label="Contact via WhatsApp"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center"
      >
        <MessageCircle className="w-4 h-4" />
        WhatsApp
      </a>
    </Button>
  )
}
