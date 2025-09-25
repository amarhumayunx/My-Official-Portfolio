"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Error:", error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
          <p className="text-lg text-muted-foreground mb-8">
            We apologize for the inconvenience. Please try again or contact support if the issue persists.
          </p>
          <div className="space-x-4">
            <Button onClick={() => reset()}>Try again</Button>
            <Button variant="outline" asChild>
              <a href="/">Go to Home</a>
            </Button>
          </div>
          {/* Optionally display error details in development */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-8 text-sm text-red-500">
              <h2 className="font-semibold">Error Details:</h2>
              <pre className="whitespace-pre-wrap text-left">{error.message}</pre>
              {error.digest && <p>Digest: {error.digest}</p>}
            </div>
          )}
        </div>
      </body>
    </html>
  )
}
