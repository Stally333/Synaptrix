'use client'
import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { TypewriterText } from './TypewriterText'

const LogContainer = styled.div<{ height: string }>`
  position: relative;
  height: ${props => props.height};
  overflow-y: auto;
  padding: 0.5rem;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 0.75rem;
  color: ${props => props.theme.colors.primary};
  opacity: 0.8;
  
  /* Hide scrollbar but keep functionality */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const LogContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  justify-content: flex-end;
`

const LogEntry = styled.div`
  margin: 0.2rem 0;
  line-height: 1.4;
  
  /* Style code blocks differently */
  &.code {
    font-family: ${props => props.theme.fonts.secondary};
    opacity: 0.9;
    padding-left: 1rem;
  }

  /* Style warnings in red */
  &.warning {
    color: #FF0000;
    text-shadow: 0 0 8px #FF000080;
  }

  /* Style system messages in white */
  &.system {
    color: #FFFFFF;
    text-shadow: 0 0 8px #FFFFFF80;
  }
`

interface ScrollingLogsProps {
  logs: string[]
  height?: string
  typingSpeed?: number
}

export const ScrollingLogs: React.FC<ScrollingLogsProps> = ({
  logs,
  height = "120px",
  typingSpeed = 50
}) => {
  const [currentLogIndex, setCurrentLogIndex] = useState(0)
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (currentLogIndex < logs.length) {
      const timer = setTimeout(() => {
        setDisplayedLogs(prev => [...prev, logs[currentLogIndex]])
        setCurrentLogIndex(prev => prev + 1)
        
        // Auto-scroll with a slight delay to ensure smooth scrolling
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight
          }
        }, 50)
      }, logs[currentLogIndex].length * typingSpeed + 500)

      return () => clearTimeout(timer)
    } else {
      setCurrentLogIndex(0)
      setDisplayedLogs([])
    }
  }, [currentLogIndex, logs, typingSpeed])

  return (
    <LogContainer height={height} ref={containerRef}>
      <LogContent>
        {displayedLogs.map((log, index) => (
          <LogEntry 
            key={index}
            className={
              log.includes('{') || log.includes('(') 
                ? 'code'
                : log.includes('[WARNING]') || log.includes('[ALERT]') || log.includes('[CRITICAL]')
                ? 'warning'
                : log.includes('[SYSTEM]')
                ? 'system'
                : ''
            }
          >
            {index === displayedLogs.length - 1 ? (
              <>
                {log.startsWith('class') || log.startsWith('for') || log.startsWith('await') ? (
                  <span style={{ opacity: 0.6 }}>{'>'}</span>
                ) : ''}
                <TypewriterText 
                  text={log} 
                  delay={typingSpeed}
                  onComplete={() => setIsTyping(false)}
                />
              </>
            ) : (
              <>
                {log.startsWith('class') || log.startsWith('for') || log.startsWith('await') ? (
                  <span style={{ opacity: 0.6 }}>{'>'}</span>
                ) : ''}
                {log}
              </>
            )}
          </LogEntry>
        ))}
      </LogContent>
    </LogContainer>
  )
} 