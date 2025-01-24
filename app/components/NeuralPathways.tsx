'use client'
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import * as THREE from 'three'
import { useNeural } from '../context/NeuralContext'

const PathwayCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
`

interface Pathway {
  start: THREE.Vector3
  end: THREE.Vector3
  progress: number
  active: boolean
  color: string
}

interface NeuralPathwaysProps {
  brainDimensions?: THREE.Box3 | null
}

export const NeuralPathways = ({ brainDimensions }: NeuralPathwaysProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pathwaysRef = useRef<Pathway[]>([])
  const frameRef = useRef<number>()
  const { stats } = useNeural()

  // Create pathways function moved outside useEffect
  const createPathways = (canvas: HTMLCanvasElement) => {
    if (!brainDimensions) return

    const pathways: Pathway[] = []
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // Calculate brain bounds in screen space
    const size = brainDimensions.getSize(new THREE.Vector3())
    const brainWidth = size.x * 100
    const brainHeight = size.y * 100

    for (let i = 0; i < 30; i++) {
      const angle = (i / 30) * Math.PI * 2
      const radiusX = brainWidth * 0.5
      const radiusY = brainHeight * 0.5

      const x = centerX + Math.cos(angle) * radiusX
      const y = centerY + Math.sin(angle) * radiusY
      const randomOffset = 20 * (Math.random() - 0.5)
      
      pathways.push({
        start: new THREE.Vector3(
          x + randomOffset,
          y + randomOffset,
          0
        ),
        end: new THREE.Vector3(
          centerX + (Math.random() - 0.5) * radiusX * 0.8,
          centerY + (Math.random() - 0.5) * radiusY * 0.8,
          0
        ),
        progress: Math.random(),
        active: true,
        color: '#00FF00'
      })
    }

    pathwaysRef.current = pathways
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // Recreate pathways after resize
      createPathways(canvas)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initial pathway creation
    createPathways(canvas)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      pathwaysRef.current.forEach(pathway => {
        if (pathway.active) {
          // Adjust pathway opacity based on signal strength
          const baseOpacity = stats.signalStrength / 100
          ctx.strokeStyle = `${pathway.color}${Math.floor(baseOpacity * 64).toString(16)}`
          
          // Draw pathway line with increased width
          ctx.beginPath()
          ctx.moveTo(pathway.start.x, pathway.start.y)
          ctx.lineTo(pathway.end.x, pathway.end.y)
          ctx.lineWidth = 2.5 // Increased from 2 to 2.5
          ctx.stroke()

          // Draw energy pulse with increased size
          const x = pathway.start.x + (pathway.end.x - pathway.start.x) * pathway.progress
          const y = pathway.start.y + (pathway.end.y - pathway.start.y) * pathway.progress
          
          // Larger pulse size
          const pulseSize = 5 + (stats.brainActivity / 100) * 5 // Increased from 4 to 5
          
          ctx.beginPath()
          ctx.arc(x, y, pulseSize, 0, Math.PI * 2)
          
          // Color based on neural sync
          const intensity = Math.floor((stats.neuralSync / 100) * 255)
          ctx.fillStyle = `rgb(0, ${intensity}, 0)`
          ctx.fill()

          // Increased glow effect
          ctx.shadowBlur = (stats.quantumState / 100) * 30 // Increased from 25 to 30
          ctx.shadowColor = pathway.color
          ctx.fill()
          ctx.shadowBlur = 0
          
          // Speed based on latency (inverse relationship)
          const speed = 0.005 * (1 / (stats.latency + 0.1))
          pathway.progress = (pathway.progress + speed) % 1
        }
      })

      frameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [stats, brainDimensions]) // Dependencies include brainDimensions

  return <PathwayCanvas ref={canvasRef} />
} 