'use client'
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

const BrainContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  z-index: 2;
  overflow: hidden;
  pointer-events: none;
`

const NeuralCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  opacity: 0.6;
`

const BrainFrame = styled.iframe`
  width: 120%;
  height: 120%;
  border: none;
  background: transparent;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.2);
  pointer-events: auto;
  z-index: 1;
`

// This container will only be used to hide the iframe titles
const HiddenTitlesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100px; // Adjust based on how much you need to hide
  overflow: hidden;
  pointer-events: none;
  z-index: 2;
`

export const BrainViz: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const nodesRef = useRef<{ x: number; y: number; vx: number; vy: number }[]>([])
  const connectionsRef = useRef<{ from: number; to: number }[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Adjusted parameters for more elaborate network
    const numNodes = 600 // Significantly more nodes
    const maxConnections = 3 // Fewer connections per node but more nodes total
    const maxDistance = 250 // Shorter connections for more intricate patterns
    const baseAlpha = 0.12 // Lower base opacity for layered effect
    const nodeSize = 1.5 // Even smaller nodes
    const nodeGlowSize = 6 // Larger glow
    const connectionWidth = 0.6 // Thinner lines

    // Enhanced grid distribution
    const gridSize = Math.sqrt(numNodes)
    const cellWidth = canvas.width / gridSize
    const cellHeight = canvas.height / gridSize

    // Initialize nodes with more natural distribution
    nodesRef.current = Array.from({ length: numNodes }, (_, i) => {
      const gridX = (i % gridSize) * cellWidth
      const gridY = Math.floor(i / gridSize) * cellHeight
      
      // Add controlled randomness for more natural distribution
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * cellWidth * 0.8
      
      return {
        x: gridX + cellWidth/2 + Math.cos(angle) * radius,
        y: gridY + cellHeight/2 + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 0.05, // Very slow movement
        vy: (Math.random() - 0.5) * 0.05
      }
    })

    // Create connections with preference for closer nodes
    const nodes = nodesRef.current
    connectionsRef.current = []
    
    nodes.forEach((node, i) => {
      const distances = nodes
        .map((target, index) => ({
          index,
          dist: Math.hypot(target.x - node.x, target.y - node.y)
        }))
        .filter(n => n.index !== i && n.dist < maxDistance)
        .sort((a, b) => a.dist - b.dist)
        .slice(0, maxConnections)

      distances.forEach(({ index, dist }) => {
        // More connections for closer nodes
        if (dist < maxDistance * 0.5 || Math.random() < 0.3) {
          connectionsRef.current.push({ from: i, to: index })
        }
      })
    })

    let pulsePhase = 0
    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pulsePhase += 0.001

      // Enhanced glow effect for connections
      ctx.shadowBlur = 3
      ctx.shadowColor = 'rgba(0, 255, 0, 0.2)'
      ctx.lineWidth = connectionWidth

      // Draw connections with enhanced depth effect
      connectionsRef.current.forEach(conn => {
        const from = nodes[conn.from]
        const to = nodes[conn.to]
        const dx = to.x - from.x
        const dy = to.y - from.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < maxDistance) {
          const intensity = 1 - (dist / maxDistance)
          const alpha = baseAlpha + (intensity * 0.15)
          
          // Smoother pulse effect
          const pulseIntensity = (Math.sin(pulsePhase + dist * 0.01) + 1) / 2
          const finalAlpha = alpha * (0.7 + (pulseIntensity * 0.3))

          ctx.beginPath()
          ctx.moveTo(from.x, from.y)
          ctx.lineTo(to.x, to.y)
          ctx.strokeStyle = `rgba(0, 255, 0, ${finalAlpha})`
          ctx.stroke()
        }
      })

      // Enhanced node drawing
      nodes.forEach(node => {
        node.x += node.vx
        node.y += node.vy

        // Smooth wrapping
        if (node.x < -50) node.x = canvas.width + 50
        if (node.x > canvas.width + 50) node.x = -50
        if (node.y < -50) node.y = canvas.height + 50
        if (node.y > canvas.height + 50) node.y = -50

        // Multi-layered glow effect
        const outerGlow = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, nodeGlowSize
        )
        outerGlow.addColorStop(0, 'rgba(0, 255, 0, 0.2)')
        outerGlow.addColorStop(0.5, 'rgba(0, 255, 0, 0.05)')
        outerGlow.addColorStop(1, 'rgba(0, 255, 0, 0)')

        ctx.beginPath()
        ctx.arc(node.x, node.y, nodeGlowSize, 0, Math.PI * 2)
        ctx.fillStyle = outerGlow
        ctx.fill()

        // Inner glow
        const innerGlow = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, nodeSize * 2
        )
        innerGlow.addColorStop(0, 'rgba(0, 255, 0, 0.4)')
        innerGlow.addColorStop(1, 'rgba(0, 255, 0, 0.1)')

        ctx.beginPath()
        ctx.arc(node.x, node.y, nodeSize * 2, 0, Math.PI * 2)
        ctx.fillStyle = innerGlow
        ctx.fill()

        // Central dot
        ctx.beginPath()
        ctx.arc(node.x, node.y, nodeSize * 0.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0, 255, 0, 0.8)'
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(drawFrame)
    }

    drawFrame()

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <>
      <NeuralCanvas ref={canvasRef} />
      <BrainContainer>
        <BrainFrame 
          title="Human Brain"
          frameBorder="0"
          allowFullScreen 
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          xr-spatial-tracking
          execution-while-out-of-viewport
          execution-while-not-rendered
          web-share
          src="https://sketchfab.com/models/7a27c17fd6c0488bb31ab093236a47fb/embed?autostart=1&transparent=1&ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0&ui_watermark_link=0&ui_hint=0&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0&autospin=1&preload=1&camera=0&dnt=1"
        />
      </BrainContainer>
      <HiddenTitlesContainer />
    </>
  )
} 