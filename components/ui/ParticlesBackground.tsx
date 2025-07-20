"use client"

import { useRef, useEffect, useCallback } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  opacity: number
}

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number | null>(null)
  const particles = useRef<Particle[]>([])
  const mouse = useRef({ x: 0, y: 0, radius: 100 })

  const createParticle = useCallback((canvas: HTMLCanvasElement): Particle => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    const baseColor = isDarkMode ? "255, 255, 255" : "0, 0, 0" // White for dark, black for light
    const opacity = Math.random() * 0.5 + 0.1 // Subtle opacity
    const size = Math.random() * 2 + 1 // Small particles

    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: size,
      speedX: Math.random() * 0.5 - 0.25, // Slower movement
      speedY: Math.random() * 0.5 - 0.25,
      color: `rgba(${baseColor}, ${opacity})`,
      opacity: opacity,
    }
  }, [])

  const initParticles = useCallback(
    (canvas: HTMLCanvasElement) => {
      particles.current = []
      const numberOfParticles = (canvas.width * canvas.height) / 15000 // Adjust density
      for (let i = 0; i < numberOfParticles; i++) {
        particles.current.push(createParticle(canvas))
      }
    },
    [createParticle],
  )

  const drawParticle = useCallback((ctx: CanvasRenderingContext2D, particle: Particle) => {
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    ctx.fillStyle = particle.color
    ctx.fill()
  }, [])

  const updateParticles = useCallback(
    (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
      for (let i = 0; i < particles.current.length; i++) {
        const particle = particles.current[i]

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x + particle.size > canvas.width || particle.x - particle.size < 0) {
          particle.speedX *= -1
        }
        if (particle.y + particle.size > canvas.height || particle.y - particle.size < 0) {
          particle.speedY *= -1
        }

        // Redraw
        drawParticle(ctx, particle)
      }
    },
    [drawParticle],
  )

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height) // Clear canvas
    updateParticles(canvas, ctx)
    animationFrameId.current = requestAnimationFrame(animate)
  }, [updateParticles])

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current
    if (canvas) {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles(canvas) // Re-initialize particles on resize
    }
  }, [initParticles])

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      handleResize() // Initial setup
      window.addEventListener("resize", handleResize)
      animationFrameId.current = requestAnimationFrame(animate)
    }

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [animate, handleResize])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-20 pointer-events-none" aria-hidden="true" />
}
