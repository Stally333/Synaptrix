'use client'
import React, { useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { TypewriterText } from './TypewriterText'

const scroll = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
`

const LogContainer = styled.div`
  position: relative;
  height: 120px;
  overflow: hidden;
  padding: 0 1rem;
  margin-top: 1rem;
`

const ScrollingContent = styled.div`
  animation: ${scroll} 20s linear infinite;
  animation-play-state: running;

  &:hover {
    animation-play-state: paused;
  }
`

const LogEntry = styled.div`
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.primary};
  font-size: 0.8rem;
  opacity: 0.9;
  margin: 0.3rem 0;
  white-space: pre;
`

interface ScrollingLogsProps {
  logs: string[]
  currentStep: number
  onComplete: () => void
}

export const ScrollingLogs: React.FC<ScrollingLogsProps> = ({
  logs,
  currentStep,
  onComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current
      container.scrollTop = container.scrollHeight
    }
  }, [logs])

  const duplicatedLogs = [...logs, ...logs] // Duplicate logs for seamless scrolling

  return (
    <LogContainer>
      <ScrollingContent>
        {duplicatedLogs.map((log, index) => (
          <LogEntry key={`${index}-${log}`}>
            $ {index % logs.length === currentStep ? (
              <TypewriterText text={log} onComplete={onComplete} />
            ) : (
              log
            )}
          </LogEntry>
        ))}
      </ScrollingContent>
    </LogContainer>
  )
} 