"use client"

import { motion } from "framer-motion"
import { Home, ArrowLeft, Search, FileQuestion } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen section-bg flex items-center justify-center section-padding">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center">
                <FileQuestion className="w-16 h-16 text-primary" />
              </div>
              <motion.div
                className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-6xl sm:text-8xl font-bold mb-4 gradient-text"
          >
            404
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl sm:text-3xl font-semibold mb-4"
          >
            Page Not Found
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-lg mb-8"
          >
            Oops! The page you're looking for doesn't exist or has been moved.
            <br />
            Let's get you back on track.
          </motion.p>

          <Card className="bg-transparent border-primary/20 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/">
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/#projects">
                    <Search className="w-4 h-4 mr-2" />
                    Projects
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/#blog">
                    <FileQuestion className="w-4 h-4 mr-2" />
                    Blog
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/#contact">
                    <FileQuestion className="w-4 h-4 mr-2" />
                    Contact
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button onClick={() => router.back()} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
            <Button asChild>
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-sm text-muted-foreground"
          >
            <p>If you believe this is an error, please contact me at{" "}
              <a href="mailto:amarhumayun@outlook.com" className="text-primary hover:underline">
                amarhumayun@outlook.com
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
