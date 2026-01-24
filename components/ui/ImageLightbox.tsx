"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Download, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ImageLightboxProps {
  images: string[]
  currentIndex?: number
  onClose: () => void
  alt?: string
}

export function ImageLightbox({ images, currentIndex = 0, onClose, alt = "Image" }: ImageLightboxProps) {
  const [index, setIndex] = useState(currentIndex)

  useEffect(() => {
    setIndex(currentIndex)
  }, [currentIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowLeft") {
        goToPrevious()
      } else if (e.key === "ArrowRight") {
        goToNext()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [index])

  const goToPrevious = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = images[index]
    link.download = `image-${index + 1}.jpg`
    link.click()
  }

  if (images.length === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
        aria-label="Image lightbox"
      >
        {/* Close Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6 text-white" />
        </motion.button>

        {/* Previous Button */}
        {images.length > 1 && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={(e) => {
              e.stopPropagation()
              goToPrevious()
            }}
            className="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </motion.button>
        )}

        {/* Next Button */}
        {images.length > 1 && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            className="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </motion.button>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-4 left-4 z-10 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm"
          >
            {index + 1} / {images.length}
          </motion.div>
        )}

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center p-4"
        >
          <Image
            src={images[index]}
            alt={`${alt} ${index + 1}`}
            fill
            className="object-contain"
            priority
            sizes="90vw"
          />
        </motion.div>

        {/* Download Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
        >
          <Button
            onClick={(e) => {
              e.stopPropagation()
              handleDownload()
            }}
            variant="secondary"
            className="gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border-white/20"
            aria-label="Download image"
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

interface ImageGalleryProps {
  images: string[]
  alt?: string
  className?: string
}

export function ImageGallery({ images, alt = "Gallery image", className = "" }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  if (images.length === 0) return null

  return (
    <>
      <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 ${className}`}>
        {images.map((src, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={src}
              alt={`${alt} ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        ))}
      </div>

      {lightboxOpen && (
        <ImageLightbox
          images={images}
          currentIndex={currentIndex}
          onClose={() => setLightboxOpen(false)}
          alt={alt}
        />
      )}
    </>
  )
}
