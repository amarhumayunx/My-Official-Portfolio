/**
 * Rate Limiting Utility
 * Simple in-memory rate limiting (for production, use Redis or similar)
 */

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

interface RateLimitOptions {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Maximum requests per window
  keyGenerator?: (req: Request) => string
}

/**
 * Simple rate limiter
 */
export function rateLimit(options: RateLimitOptions) {
  const { windowMs, maxRequests, keyGenerator } = options

  return async (req: Request): Promise<{ allowed: boolean; remaining: number; resetTime: number }> => {
    const now = Date.now()
    const key = keyGenerator ? keyGenerator(req) : getDefaultKey(req)

    // Clean up expired entries
    Object.keys(store).forEach((k) => {
      if (store[k].resetTime < now) {
        delete store[k]
      }
    })

    // Get or create entry
    let entry = store[key]

    if (!entry || entry.resetTime < now) {
      // Create new entry or reset expired one
      entry = {
        count: 0,
        resetTime: now + windowMs,
      }
      store[key] = entry
    }

    // Check if limit exceeded
    if (entry.count >= maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime,
      }
    }

    // Increment count
    entry.count++

    return {
      allowed: true,
      remaining: maxRequests - entry.count,
      resetTime: entry.resetTime,
    }
  }
}

function getDefaultKey(req: Request): string {
  // Try to get IP from headers (works with Vercel, Cloudflare, etc.)
  const forwarded = req.headers.get("x-forwarded-for")
  const realIp = req.headers.get("x-real-ip")
  const ip = forwarded?.split(",")[0] || realIp || "unknown"

  // Also include user agent for better tracking
  const userAgent = req.headers.get("user-agent") || "unknown"

  return `${ip}:${userAgent.slice(0, 50)}`
}

/**
 * Rate limit for contact form
 */
export const contactFormRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 3, // 3 requests per 15 minutes
  keyGenerator: (req) => {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || req.headers.get("x-real-ip") || "unknown"
    return `contact:${ip}`
  },
})

/**
 * Rate limit for API endpoints
 */
export const apiRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 60, // 60 requests per minute
})
