'use client'
import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  0% { opacity: 0.7; }
  50% { opacity: 1; }
  100% { opacity: 0.7; }
`

const blink = keyframes`
  0% { opacity: 1; }
  49% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 0; }
`

const scan = keyframes`
  0% { background-position: -300% 0; }
  100% { background-position: 300% 0; }
`

export const AnimatedCode = styled.code`
  position: relative;
  animation: ${pulse} 2s ease-in-out infinite;
  background: linear-gradient(
    90deg,
    ${props => props.theme.colors.secondary}40 0%,
    ${props => props.theme.colors.secondary}60 50%,
    ${props => props.theme.colors.secondary}40 100%
  );
  background-size: 300% 100%;
  animation: ${scan} 4s linear infinite;
`

export const StatusText = styled.span<{ delay?: string }>`
  animation: ${pulse} 2s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
`

export const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 15px;
  background: ${props => props.theme.colors.primary};
  margin-left: 5px;
  animation: ${blink} 1s step-end infinite;
`

export const Divider = styled.span`
  display: inline-block;
  opacity: 0.5;
  letter-spacing: 2px;
  animation: ${pulse} 3s ease-in-out infinite;
` 