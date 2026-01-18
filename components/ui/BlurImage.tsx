"use client"

import * as React from "react"
import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ImageSkeleton } from "./EnhancedSkeleton"

interface BlurImageProps extends React.ComponentProps<typeof Image> {
  blurDataURL?: string
  fallback?: string
  showSkeleton?: boolean
}

export function BlurImage({
  src,
  alt,
  className,
  blurDataURL,
  fallback,
  showSkeleton = true,
  ...props
}: BlurImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Generate a simple blur placeholder if not provided
  const defaultBlurDataURL =
    blurDataURL ||
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U1ZTdlYiIvPjwvc3ZnPg=="

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  if (hasError && fallback) {
    return (
      <Image
        src={fallback}
        alt={alt || ""}
        className={className}
        {...props}
      />
    )
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {isLoading && showSkeleton && (
        <div className="absolute inset-0 z-10">
          <ImageSkeleton className="w-full h-full" />
        </div>
      )}
      <Image
        src={src}
        alt={alt || ""}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        placeholder="blur"
        blurDataURL={defaultBlurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  )
}
