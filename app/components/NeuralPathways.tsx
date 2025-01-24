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

export const NeuralPathways = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pathwaysRef = useRef<Pathway[]>([])
  const frameRef = useRef<number>()
  const { stats } = useNeural()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create initial pathways
    const createPathways = () => {
      const pathways: Pathway[] = []
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Adjusted radius and positioning to match brain size
      const baseRadius = 80 // Reduced from 100
      
      for (let i = 0; i < 30; i++) {
        const angle1 = Math.random() * Math.PI * 2
        const angle2 = Math.random() * Math.PI * 2
        
        // More focused radius range
        const radius = Math.random() * 70 + baseRadius // Adjusted from 100+100 to 70+80
        
        // Offset the Y position slightly upward to match brain position
        const yOffset = -50 // Added to shift connections up

        pathways.push({
          start: new THREE.Vector3(
            centerX + Math.cos(angle1) * radius,
            centerY + Math.sin(angle1) * radius + yOffset,
            0
          ),
          end: new THREE.Vector3(
            centerX + Math.cos(angle2) * radius,
            centerY + Math.sin(angle2) * radius + yOffset,
            0
          ),
          progress: Math.random(),
          active: true,
          color: '#00FF00'
        })
      }

      pathwaysRef.current = pathways
    }

    createPathways()

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
  }, [stats])

  return <PathwayCanvas ref={canvasRef} />
} 