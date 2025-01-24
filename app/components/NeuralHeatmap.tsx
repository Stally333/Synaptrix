'use client'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useNeural } from '../context/NeuralContext'
import * as THREE from 'three'

const HeatmapOverlay = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.6;
  z-index: 4;
`

export const NeuralHeatmap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { stats } = useNeural()
  
  // Implement real-time heatmap visualization based on brain activity
  // Show intensity of neural connections
  // Color gradient from blue (cold) to green (active) to red (intense)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const drawHeatmap = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient based on brain activity
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, 200
      )

      const intensity = stats.brainActivity / 100
      gradient.addColorStop(0, `rgba(0, 255, 0, ${intensity * 0.5})`)
      gradient.addColorStop(0.5, `rgba(0, 255, 0, ${intensity * 0.3})`)
      gradient.addColorStop(1, 'rgba(0, 255, 0, 0)')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const animate = () => {
      drawHeatmap()
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [stats])

  return <HeatmapOverlay ref={canvasRef} />
} 