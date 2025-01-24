'use client'
import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  0% { opacity: 0.7; }
  50% { opacity: 1; }
  100% { opacity: 0.7; }
`

const StatContainer = styled.span<{ delay?: string }>`
  animation: ${pulse} 2s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  display: inline-flex;
  gap: 0.5rem;
`

const Value = styled.span<{ isWarning?: boolean; isLatency?: boolean }>`
  color: ${props => {
    if (props.isLatency) return '#FF0000'
    if (props.isWarning) return '#FF0000'
    return props.theme.colors.primary
  }};
  text-shadow: 0 0 8px ${props => {
    if (props.isLatency) return '#FF000080'
    if (props.isWarning) return '#FF000080'
    return `${props.theme.colors.primary}80`
  }};
`

interface AnimatedStatProps {
  label: string
  startValue: number
  endValue: number
  duration?: number
  delay?: string
  unit?: string
  decimals?: number
  fluctuationRange?: number
  updateInterval?: number
  warningThreshold?: number
  isLatency?: boolean
}

export const AnimatedStat: React.FC<AnimatedStatProps> = ({
  label,
  startValue,
  endValue,
  duration = 2000,
  delay = '0s',
  unit = '',
  decimals = 2,
  fluctuationRange = 0.5,
  updateInterval = 100,
  warningThreshold,
  isLatency = false
}) => {
  const [value, setValue] = useState(startValue)
  const [hasReachedTarget, setHasReachedTarget] = useState(false)

  // Initial animation to target value
  useEffect(() => {
    const steps = 60
    const increment = (endValue - startValue) / steps
    const stepDuration = duration / steps
    let currentStep = 0

    const timer = setInterval(() => {
      if (currentStep < steps) {
        setValue(prev => {
          const newValue = prev + increment
          return Number(newValue.toFixed(decimals))
        })
        currentStep++
      } else {
        setValue(endValue)
        setHasReachedTarget(true)
        clearInterval(timer)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [startValue, endValue, duration, decimals])

  // Continuous fluctuation after reaching target
  useEffect(() => {
    if (!hasReachedTarget) return

    const fluctuate = () => {
      // More dynamic fluctuation calculation
      const randomFactor = Math.sin(Date.now() / 1000) * Math.random()
      const fluctuation = randomFactor * (endValue * (fluctuationRange / 100))
      const newValue = endValue + fluctuation
      setValue(Number(newValue.toFixed(decimals)))
    }

    const fluctuateTimer = setInterval(fluctuate, updateInterval)

    return () => clearInterval(fluctuateTimer)
  }, [hasReachedTarget, endValue, decimals, fluctuationRange, updateInterval])

  return (
    <StatContainer delay={delay}>
      {label}: <Value 
        isWarning={warningThreshold && value > warningThreshold}
        isLatency={isLatency}
      >
        {value.toFixed(decimals)}
        {unit}
      </Value>
    </StatContainer>
  )
} 