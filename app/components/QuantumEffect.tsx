'use client'
import styled, { keyframes } from 'styled-components'

const quantumPulse = keyframes`
  0% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 0.5; }
`

const quantumGlow = keyframes`
  0% { box-shadow: 0 0 20px ${props => props.theme.colors.primary}40; }
  50% { box-shadow: 0 0 40px ${props => props.theme.colors.primary}60; }
  100% { box-shadow: 0 0 20px ${props => props.theme.colors.primary}40; }
`

export const QuantumContainer = styled(BrainContainer)`
  animation: ${quantumPulse} 4s ease-in-out infinite,
             ${quantumGlow} 2s ease-in-out infinite;
  backdrop-filter: blur(5px);
  background: rgba(0, 0, 0, 0.8);
` 