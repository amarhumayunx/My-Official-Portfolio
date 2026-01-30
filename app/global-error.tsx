"use client"

import { useEffect } from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.error("Global Error:", error)
    }
  }, [error])

  // Minimal inline styles: global-error replaces root layout so app CSS may not load
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Something went wrong</title>
      </head>
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#fafafa", color: "#171717", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", boxSizing: "border-box" }}>
        <div style={{ textAlign: "center", maxWidth: "28rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>Something went wrong</h1>
          <p style={{ color: "#737373", marginBottom: "1.5rem", lineHeight: 1.6 }}>
            We apologize for the inconvenience. Please try again or contact support if the issue persists.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => reset()}
              style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", fontWeight: 500, background: "#171717", color: "#fff", border: "none", borderRadius: "0.375rem", cursor: "pointer" }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", fontWeight: 500, background: "transparent", color: "#171717", border: "1px solid #e5e5e5", borderRadius: "0.375rem", textDecoration: "none", display: "inline-block" }}
            >
              Go to Home
            </a>
          </div>
          {process.env.NODE_ENV === "development" && error && (
            <div style={{ marginTop: "2rem", padding: "1rem", background: "#fef2f2", color: "#b91c1c", borderRadius: "0.375rem", textAlign: "left", fontSize: "0.75rem" }}>
              <strong>Error:</strong>
              <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", margin: "0.25rem 0 0" }}>{error.message}</pre>
              {error.digest && <p style={{ margin: "0.25rem 0 0" }}>Digest: {error.digest}</p>}
            </div>
          )}
        </div>
      </body>
    </html>
  )
}
