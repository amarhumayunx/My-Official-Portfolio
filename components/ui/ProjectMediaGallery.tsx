"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Play, ExternalLink, Image as ImageIcon } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MediaItem {
  type: "image" | "video" | "gif" | "prototype"
  url: string
  thumbnail?: string
  title?: string
  description?: string
  source?: "youtube" | "vimeo" | "figma" | "local"
  embedId?: string // For YouTube/Vimeo
}

interface ProjectMediaGalleryProps {
  items: MediaItem[]
  className?: string
}

export function ProjectMediaGallery({ items, className }: ProjectMediaGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const openLightbox = (index: number) => {
    setSelectedIndex(index)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    setTimeout(() => setSelectedIndex(null), 300)
  }

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + items.length) % items.length)
    }
  }

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % items.length)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox()
      } else if (e.key === "ArrowLeft") {
        goToPrevious()
      } else if (e.key === "ArrowRight") {
        goToNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isLightboxOpen, selectedIndex])

  const getVideoEmbedUrl = (item: MediaItem) => {
    if (item.source === "youtube" && item.embedId) {
      return `https://www.youtube.com/embed/${item.embedId}?autoplay=1&rel=0`
    }
    if (item.source === "vimeo" && item.embedId) {
      return `https://player.vimeo.com/video/${item.embedId}?autoplay=1`
    }
    return null
  }

  const renderMedia = (item: MediaItem, index: number, isThumbnail = true) => {
    const size = isThumbnail ? "h-48" : "h-[70vh]"
    const embedUrl = getVideoEmbedUrl(item)

    if (item.type === "video" && embedUrl) {
      if (isThumbnail) {
        return (
          <div className={cn("relative w-full rounded-lg overflow-hidden bg-black", size)}>
            {item.thumbnail ? (
              <Image
                src={item.thumbnail}
                alt={item.title || `Video thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 group-hover:bg-black/30 transition-colors cursor-pointer">
              <Play className="w-12 h-12 text-white" />
            </div>
          </div>
        )
      }
      return (
        <div className={cn("relative w-full rounded-lg overflow-hidden bg-black", size)}>
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={item.title || `Video ${index + 1}`}
          />
        </div>
      )
    }

    if (item.type === "prototype") {
      return (
        <div className={cn("relative w-full rounded-lg overflow-hidden bg-muted", size)}>
          {item.thumbnail ? (
            <Image
              src={item.thumbnail}
              alt={item.title || `Prototype ${index + 1}`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 group-hover:bg-black/30 transition-colors">
            <ExternalLink className="w-8 h-8 text-white" />
          </div>
        </div>
      )
    }

    return (
      <div className={cn("relative w-full rounded-lg overflow-hidden", size)}>
        <Image
          src={item.url}
          alt={item.title || `Image ${index + 1}`}
          fill
          className="object-cover"
          sizes={isThumbnail ? "(max-width: 768px) 50vw, 33vw" : "90vw"}
        />
      </div>
    )
  }

  return (
    <>
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
            onClick={() => {
              if (item.type === "prototype" && item.url) {
                window.open(item.url, "_blank", "noopener,noreferrer")
              } else {
                openLightbox(index)
              }
            }}
          >
            {renderMedia(item, index, true)}
            {(item.title || item.description) && (
              <div className="mt-2">
                {item.title && <p className="font-medium text-sm">{item.title}</p>}
                {item.description && <p className="text-xs text-muted-foreground">{item.description}</p>}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
                onClick={closeLightbox}
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Navigation Buttons */}
              {items.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      goToPrevious()
                    }}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      goToNext()
                    }}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </>
              )}

              {/* Media Content */}
              <div className="relative w-full h-full flex items-center justify-center">
                {renderMedia(items[selectedIndex], selectedIndex, false)}
              </div>

              {/* Media Info */}
              {(items[selectedIndex].title || items[selectedIndex].description) && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 text-white">
                  {items[selectedIndex].title && (
                    <h3 className="text-xl font-bold mb-2">{items[selectedIndex].title}</h3>
                  )}
                  {items[selectedIndex].description && (
                    <p className="text-sm opacity-90">{items[selectedIndex].description}</p>
                  )}
                </div>
              )}

              {/* Thumbnail Strip */}
              {items.length > 1 && (
                <div className="absolute bottom-20 left-0 right-0 flex gap-2 justify-center overflow-x-auto p-4">
                  {items.map((item, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedIndex(index)
                      }}
                      className={cn(
                        "relative w-20 h-20 rounded overflow-hidden flex-shrink-0 border-2 transition-all",
                        index === selectedIndex ? "border-primary scale-110" : "border-transparent opacity-60 hover:opacity-100"
                      )}
                    >
                      <Image
                        src={item.thumbnail || item.url}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
