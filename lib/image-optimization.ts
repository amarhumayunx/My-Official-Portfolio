// Image optimization utilities for responsive images

export interface ResponsiveImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
  formats?: ("webp" | "avif" | "jpeg" | "png")[]
}

export const getOptimizedImageUrl = (
  src: string,
  options: {
    width?: number
    quality?: number
    format?: "webp" | "avif" | "jpeg" | "png"
  } = {},
): string => {
  const { width, quality = 80, format = "webp" } = options

  // For local images, we rely on Next.js Image optimization
  // For external images, construct optimization URL if needed
  if (src.startsWith("/")) {
    return src
  }

  // For external images, add optimization params if needed
  const url = new URL(src)
  if (width) url.searchParams.append("w", width.toString())
  url.searchParams.append("q", quality.toString())
  url.searchParams.append("fmt", format)

  return url.toString()
}

export const imageSizes = {
  mobile: "(max-width: 640px) 100vw",
  tablet: "(max-width: 1024px) 50vw",
  desktop: "33vw",
  full: "100vw",
}

export const getResponsiveImageSizes = (type: keyof typeof imageSizes = "full"): string => {
  return imageSizes[type]
}
