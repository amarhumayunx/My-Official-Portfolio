"use client"

import React, { type ReactNode, type ErrorInfo } from "react"
import { motion } from "framer-motion"
import { AlertCircle, Home, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[ErrorBoundary] Caught an error:", error, errorInfo)
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.href = "/"
  }

  public render() {
    if (this.state.hasError) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20"
        >
          <Card className="max-w-md w-full shadow-lg border-red-200 dark:border-red-800">
            <CardHeader className="text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="flex justify-center mb-4"
              >
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                  <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
              </motion.div>
              <CardTitle className="text-2xl">Something went wrong</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-center">
                We're sorry, but something unexpected happened. Please try refreshing the page or return to the home
                page.
              </p>

              {process.env.NODE_ENV === "development" && this.state.error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
                  <p className="text-sm font-mono text-red-800 dark:text-red-200 break-words">
                    {this.state.error.message}
                  </p>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button onClick={() => window.location.reload()} variant="outline" className="flex-1 gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </Button>
                <Button onClick={this.handleReset} className="flex-1 gap-2">
                  <Home className="w-4 h-4" />
                  Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )
    }

    return this.props.children
  }
}
