"use client"

import { useEffect, useRef, useState } from "react"
import type { COBEOptions } from "cobe"

import { cn } from "@/lib/utils"

const MOVEMENT_DAMPING = 1200

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => { },
  devicePixelRatio: 1.25,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 1.1,
  mapSamples: 10000,
  mapBrightness: 6,
  baseColor: [0.1, 0.07, 0.14],
  markerColor: [0.75, 0.45, 1],
  glowColor: [0.32, 0.16, 0.48],
  markers: [
    { location: [19.076, 72.8777], size: 0.055 },
    { location: [40.7128, -74.006], size: 0.045 },
    { location: [51.5072, -0.1276], size: 0.04 },
  ],
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const phiRef = useRef(0)
  const widthRef = useRef(0)
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null)
  const horizontalRotationRef = useRef(0)
  const verticalRotationRef = useRef(0)
  const [isVisible, setIsVisible] = useState(false)

  const updatePointerInteraction = (value: { x: number; y: number } | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number, clientY: number) => {
    if (pointerInteracting.current !== null) {
      const deltaX = clientX - pointerInteracting.current.x
      const deltaY = clientY - pointerInteracting.current.y
      horizontalRotationRef.current += deltaX / MOVEMENT_DAMPING
      verticalRotationRef.current += deltaY / MOVEMENT_DAMPING
      pointerInteracting.current = { x: clientX, y: clientY }
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "0px", threshold: 0.05 }
    )
    visibilityObserver.observe(canvas)
    return () => {
      visibilityObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const canvas = canvasRef.current
    if (!canvas) return

    let disposed = false
    let destroyGlobe: (() => void) | undefined
    const onResize = () => { widthRef.current = canvas.offsetWidth }
    window.addEventListener("resize", onResize, { passive: true })
    onResize()

    void import("cobe").then(({ default: createGlobe }) => {
      if (disposed) return

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const pixelRatio = Math.min(window.devicePixelRatio, config.devicePixelRatio ?? 1.25)
      const globe = createGlobe(canvas, {
        ...config,
        devicePixelRatio: pixelRatio,
        width: widthRef.current * pixelRatio,
        height: widthRef.current * pixelRatio,
        onRender: (state) => {
          if (!reduceMotion && pointerInteracting.current === null) phiRef.current += 0.009
          state.phi = phiRef.current + horizontalRotationRef.current
          state.theta = (config.theta ?? 0.3) + verticalRotationRef.current
          state.width = widthRef.current * pixelRatio
          state.height = widthRef.current * pixelRatio
        },
      })
      destroyGlobe = () => globe.destroy()
      canvas.style.opacity = "1"
    })

    return () => {
      disposed = true
      canvas.style.opacity = "0"
      destroyGlobe?.()
      window.removeEventListener("resize", onResize)
    }
  }, [config, isVisible])

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-square w-full max-w-150",
        className
      )}
    >
      <canvas
        className={cn(
          "size-full touch-none opacity-0 transition-[opacity,filter] duration-500 contain-[layout_paint_size] group-hover:drop-shadow-[0_0_14px_rgba(192,132,252,0.48)]"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId)
          updatePointerInteraction({ x: e.clientX, y: e.clientY })
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerCancel={() => updatePointerInteraction(null)}
        onLostPointerCapture={() => updatePointerInteraction(null)}
        onPointerMove={(e) => updateMovement(e.clientX, e.clientY)}
      />
    </div>
  )
}
