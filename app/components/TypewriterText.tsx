'use client'
import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`

const Container = styled.div`
  display: inline-block;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
`

const Cursor = styled.span`
  color: ${props => props.theme.colors.primary};
  animation: ${blink} 1s step-end infinite;
`

interface TypewriterTextProps {
  text: string
  delay?: number
  onComplete?: () => void
}

export const TypewriterText = ({ text, delay = 50, onComplete }: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [key, setKey] = useState(0)

  useEffect(() => {
    setKey(prev => prev + 1)
    setDisplayedText('')
    setIsComplete(false)
    
    let index = 0
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index))
        index++
      } else {
        setIsComplete(true)
        onComplete?.()
        clearInterval(timer)
      }
    }, delay)

    return () => clearInterval(timer)
  }, [text, delay, onComplete])

  return (
    <Container key={key}>
      {displayedText}
      {!isComplete && <Cursor>_</Cursor>}
    </Container>
  )
} 