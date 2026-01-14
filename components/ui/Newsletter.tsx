"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Mail, CheckCircle, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface NewsletterProps {
  className?: string
}

export function Newsletter({ className }: NewsletterProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setMessage("")

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setStatus("error")
      setMessage("Please enter a valid email address")
      return
    }

    try {
      // TODO: Replace with your newsletter API endpoint
      // Example: await fetch('/api/newsletter', { method: 'POST', body: JSON.stringify({ email }) })
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      setStatus("success")
      setMessage("Thank you for subscribing! Check your email for confirmation.")
      setEmail("")
    } catch (error) {
      setStatus("error")
      setMessage("Something went wrong. Please try again later.")
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle>Stay Updated</CardTitle>
            <CardDescription>Get the latest posts and project updates</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              className="flex-1"
              required
              aria-label="Email address"
            />
            <Button
              type="submit"
              disabled={status === "loading" || !email}
              className="shrink-0"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>

          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Alert
                  variant={status === "success" ? "default" : "destructive"}
                  className={
                    status === "success"
                      ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                      : ""
                  }
                >
                  {status === "success" ? (
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-xs text-muted-foreground">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
