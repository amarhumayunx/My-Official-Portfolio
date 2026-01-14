"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface PhotoGalleryProps {
  photos: Array<{
    src: string
    alt: string
    caption?: string
  }>
  columns?: number
}

export function PhotoGallery({ photos, columns = 3 }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null)

  const nextPhoto = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % photos.length)
    }
  }

  const prevPhoto = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length)
    }
  }

  React.useEffect(() => {
    if (selectedIndex !== null) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowRight") nextPhoto()
        if (e.key === "ArrowLeft") prevPhoto()
        if (e.key === "Escape") setSelectedIndex(null)
      }
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedIndex])

  return (
    <>
      <div className={`grid grid-cols-2 md:grid-cols-${columns} gap-4`}>
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
            onClick={() => setSelectedIndex(index)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            {photo.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white text-sm">{photo.caption}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedIndex(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-5xl max-h-[90vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={photos[selectedIndex].src}
                  alt={photos[selectedIndex].alt}
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-lg"
                />
                {photos[selectedIndex].caption && (
                  <p className="text-white text-center mt-4">{photos[selectedIndex].caption}</p>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedIndex(null)}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70"
                >
                  <X className="w-5 h-5 text-white" />
                </Button>
                {photos.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={prevPhoto}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70"
                    >
                      <ChevronLeft className="w-5 h-5 text-white" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={nextPhoto}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70"
                    >
                      <ChevronRight className="w-5 h-5 text-white" />
                    </Button>
                  </>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
