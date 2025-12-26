"use client"

import { motion } from "framer-motion"
import { MessageCircle, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  }

  const menuVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    }),
  }

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="fixed bottom-6 left-6 z-40"
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle contact menu"
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center"
          >
            {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          </motion.div>
        </motion.button>

        {isOpen && (
          <motion.div className="absolute bottom-20 left-0 flex flex-col gap-3" initial="hidden" animate="visible">
            {[
              { label: "Email", href: "mailto:amarhumayun@outlook.com", icon: "📧" },
              { label: "WhatsApp", href: "https://wa.me/1234567890", icon: "💬" },
              { label: "LinkedIn", href: "https://linkedin.com/in/amarhumayun", icon: "💼" },
            ].map((item, i) => (
              <motion.div key={item.label} custom={i} variants={menuVariants}>
                <Button
                  asChild
                  size="sm"
                  className="rounded-full bg-white text-gray-900 hover:bg-gray-100 shadow-md whitespace-nowrap"
                >
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </a>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </>
  )
}
