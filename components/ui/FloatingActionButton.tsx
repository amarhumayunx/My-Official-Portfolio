"use client"

import { motion } from "framer-motion"
import { MessageCircle, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { liquidSpring, liquidSpringHover } from "@/lib/liquid-animation"

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: liquidSpring,
    },
  }

  const menuVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.08,
        ...liquidSpringHover,
      },
    }),
  }

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="fixed bottom-24 left-6 z-[60] md:bottom-6"
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
          whileHover={{ scale: 1.1, transition: liquidSpringHover }}
          whileTap={{ scale: 0.95, transition: liquidSpringHover }}
          aria-label="Toggle contact menu"
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={liquidSpring}
            className="flex items-center justify-center"
          >
            {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          </motion.div>
        </motion.button>

        {isOpen && (
          <motion.div className="absolute bottom-20 left-0 flex flex-col gap-3" initial="hidden" animate="visible">
            {[
              { label: "Email", href: "mailto:amarhumayun@outlook.com", icon: "📧" },
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
