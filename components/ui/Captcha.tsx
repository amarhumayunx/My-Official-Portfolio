"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface CaptchaProps {
  onVerify: (token: string) => void
  onError?: (error: string) => void
  siteKey?: string
}

// Simple math CAPTCHA as fallback (can be replaced with hCaptcha/reCAPTCHA)
export function SimpleCaptcha({ onVerify, onError }: Omit<CaptchaProps, "siteKey">) {
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [answer, setAnswer] = useState("")
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    generateQuestion()
  }, [])

  const generateQuestion = () => {
    const n1 = Math.floor(Math.random() * 10) + 1
    const n2 = Math.floor(Math.random() * 10) + 1
    setNum1(n1)
    setNum2(n2)
    setAnswer("")
    setIsVerified(false)
  }

  const handleVerify = () => {
    const userAnswer = parseInt(answer)
    const correctAnswer = num1 + num2

    if (userAnswer === correctAnswer) {
      setIsVerified(true)
      onVerify("captcha-verified")
    } else {
      onError?.("Incorrect answer. Please try again.")
      generateQuestion()
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
        <span className="text-sm font-medium">
          {num1} + {num2} = ?
        </span>
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-20 px-2 py-1 text-sm border rounded"
          placeholder="Answer"
          disabled={isVerified}
        />
        {!isVerified && (
          <button
            type="button"
            onClick={handleVerify}
            className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            Verify
          </button>
        )}
        {isVerified && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-green-600 dark:text-green-400"
          >
            ✓ Verified
          </motion.div>
        )}
      </div>
      {!isVerified && (
        <button
          type="button"
          onClick={generateQuestion}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Generate new question
        </button>
      )}
    </div>
  )
}

// hCaptcha component (requires hCaptcha site key)
export function HCaptcha({ onVerify, onError, siteKey }: CaptchaProps) {
  const captchaRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!siteKey) {
      console.warn("hCaptcha site key not provided, using simple CAPTCHA")
      return
    }

    // Load hCaptcha script
    const script = document.createElement("script")
    script.src = "https://js.hcaptcha.com/1/api.js"
    script.async = true
    script.defer = true
    script.onload = () => setIsLoaded(true)
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [siteKey])

  useEffect(() => {
    if (isLoaded && captchaRef.current && siteKey) {
      // Initialize hCaptcha
      if (window.hcaptcha) {
        window.hcaptcha.render(captchaRef.current, {
          sitekey: siteKey,
          callback: (token: string) => {
            onVerify(token)
          },
          "error-callback": () => {
            onError?.("CAPTCHA verification failed")
          },
        })
      }
    }
  }, [isLoaded, siteKey, onVerify, onError])

  if (!siteKey) {
    return <SimpleCaptcha onVerify={onVerify} onError={onError} />
  }

  return <div ref={captchaRef} />
}

// Main CAPTCHA component that chooses between hCaptcha and simple CAPTCHA
export function Captcha({ onVerify, onError, siteKey }: CaptchaProps) {
  const captchaSiteKey = siteKey || process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY

  if (captchaSiteKey) {
    return <HCaptcha onVerify={onVerify} onError={onError} siteKey={captchaSiteKey} />
  }

  return <SimpleCaptcha onVerify={onVerify} onError={onError} />
}

// Type declaration for hCaptcha
declare global {
  interface Window {
    hcaptcha?: {
      render: (container: HTMLElement, options: { sitekey: string; callback: (token: string) => void; "error-callback": () => void }) => string
      reset: (widgetId: string) => void
    }
  }
}
