'use client'
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  pointer-events: none;
`

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  connections: Node[]
}

export const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])
  const frameRef = useRef<number>()

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

    // Initialize nodes with more density
    const initNodes = () => {
      const nodes: Node[] = []
      const numNodes = Math.floor((window.innerWidth * window.innerHeight) / 8000)
      
      for (let i = 0; i < numNodes; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          connections: []
        })
      }

      // Create more connections per node
      nodes.forEach(node => {
        const numConnections = Math.floor(Math.random() * 5) + 3
        for (let i = 0; i < numConnections; i++) {
          const otherNode = nodes[Math.floor(Math.random() * nodes.length)]
          if (otherNode !== node && !node.connections.includes(otherNode)) {
            node.connections.push(otherNode)
          }
        }
      })

      return nodes
    }

    nodesRef.current = initNodes()

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = '#00FF00'
      ctx.lineWidth = 1.5

      nodesRef.current.forEach(node => {
        // Update position
        node.x += node.vx
        node.y += node.vy

        // Bounce off walls
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Draw connections with enhanced pulse effect
        node.connections.forEach(connection => {
          const distance = Math.hypot(connection.x - node.x, connection.y - node.y)
          const maxDistance = 400
          
          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance)
            const pulse = (Math.sin(Date.now() * 0.002) + 1) * 0.8
            ctx.globalAlpha = opacity * pulse

            // Add glow effect
            ctx.shadowBlur = 8
            ctx.shadowColor = '#00FF00'

            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(connection.x, connection.y)
            ctx.stroke()

            // Reset shadow for better performance
            ctx.shadowBlur = 0
          }
        })

        // Draw larger nodes with glow
        ctx.globalAlpha = 0.8
        ctx.beginPath()
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = '#00FF00'
        ctx.fill()

        // Add node glow
        ctx.globalAlpha = 0.4
        ctx.beginPath()
        ctx.arc(node.x, node.y, 7, 0, Math.PI * 2)
        ctx.fillStyle = '#00FF00'
        ctx.fill()
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
  }, [])

  return <Canvas ref={canvasRef} />
} 