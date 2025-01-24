'use client'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  margin: 1rem 0;
  border-top: 1px solid ${props => props.theme.colors.primary}40;
  border-bottom: 1px solid ${props => props.theme.colors.primary}40;
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.text};
  opacity: 0.8;
`

const LatencyValue = styled.span`
  color: #FF0000;
  text-shadow: 0 0 8px #FF000080;
`

interface AnimatedStatsDisplayProps {
  className?: string
}

export const AnimatedStatsDisplay: React.FC<AnimatedStatsDisplayProps> = ({ className }) => {
  const [bandwidth, setBandwidth] = useState(1.2)
  const [latency, setLatency] = useState(0.3)
  const [sync, setSync] = useState(99.99)

  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuate bandwidth between 1.1 and 1.3
      setBandwidth(prev => {
        const fluctuation = (Math.random() - 0.5) * 0.1
        return Number((prev + fluctuation).toFixed(2))
      })

      // Fluctuate latency between 0.25 and 0.35
      setLatency(prev => {
        const fluctuation = (Math.random() - 0.5) * 0.05
        return Number((prev + fluctuation).toFixed(2))
      })

      // Fluctuate sync between 99.95 and 99.99
      setSync(prev => {
        const fluctuation = (Math.random() - 0.5) * 0.02
        return Number((prev + fluctuation).toFixed(2))
      })
    }, 100) // Update every 100ms

    return () => clearInterval(interval)
  }, [])

  return (
    <StatsContainer className={className}>
      <span>Bandwidth: {bandwidth} TB/s</span>
      <span>Latency: <LatencyValue>{latency}ms</LatencyValue></span>
      <span>Sync: {sync}%</span>
    </StatsContainer>
  )
} 