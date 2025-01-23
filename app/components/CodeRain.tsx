'use client'
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

const CanvasContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
`

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.3;
`

export const CodeRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const synaptrixChars = [
      '神', '経', '量', '子', 'Ψ', 'Φ', 'Ω', '∞', '∫', '∂',
      ...Array.from('SYNAPTRIX1234567890'),
      ...Array.from('νεύρο'),
      '⚡', '⚛', '∆', '∇', '∑', '∏', '√',
      ...Array.from('NEURALIS'),
      ...Array.from('量子コンピュータ'), // Quantum Computer in Japanese
      ...Array.from('脳インターフェース') // Brain Interface in Japanese
    ]

    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = new Array(columns).fill(1)
    const maxSpeed = 2

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#00FF00'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = synaptrixChars[Math.floor(Math.random() * synaptrixChars.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Add varying opacity for depth effect
        const opacity = Math.random() * 0.5 + 0.5
        ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`
        
        ctx.fillText(char, x, y)

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        
        // Vary the speed of each column
        drops[i] += Math.random() * maxSpeed
      }
    }

    const interval = setInterval(draw, 33)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <CanvasContainer>
      <Canvas ref={canvasRef} />
    </CanvasContainer>
  )
} 