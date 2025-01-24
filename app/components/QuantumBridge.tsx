'use client'
import { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { useNeural } from '../context/NeuralContext'

const pulse = keyframes`
  0% { box-shadow: 0 0 15px rgba(0, 255, 0, 0.1); }
  50% { box-shadow: 0 0 30px rgba(0, 255, 0, 0.2); }
  100% { box-shadow: 0 0 15px rgba(0, 255, 0, 0.1); }
`

const BridgeContainer = styled.div`
  position: absolute;
  top: 26.5rem;
  right: 2rem;
  width: 320px;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 4px;
  padding: 1.5rem;
  animation: ${pulse} 4s infinite;
  z-index: 100;
`

const MetricGroup = styled.div`
  margin: 0.75rem 0;
`

const MetricLabel = styled.div`
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 0.5rem;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: ${props => props.theme.colors.primary}20;
  border-radius: 2px;
  overflow: hidden;
`

const Progress = styled.div<{ value: number }>`
  width: ${props => props.value}%;
  height: 100%;
  background: ${props => props.theme.colors.primary};
  transition: width 0.5s ease;
`

const StateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 0.25rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.primary}40;
`

const QuantumCell = styled.div<{ active: boolean }>`
  aspect-ratio: 1;
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  border: 1px solid ${props => props.theme.colors.primary}40;
  border-radius: 2px;
  transition: all 0.3s ease;
`

interface QuantumState {
  entanglement: number
  coherence: number
  stability: number
}

export const QuantumBridge = () => {
  const { stats } = useNeural()
  const [quantumState, setQuantumState] = useState<QuantumState>({
    entanglement: 95.5,
    coherence: 92.8,
    stability: 97.2
  })
  const [activeQubits, setActiveQubits] = useState<boolean[]>(Array(32).fill(false))

  useEffect(() => {
    const interval = setInterval(() => {
      // Update quantum state based on neural stats
      setQuantumState(prev => ({
        entanglement: prev.entanglement + (Math.random() - 0.5) * 0.5,
        coherence: prev.coherence + (Math.random() - 0.5) * 0.3,
        stability: prev.stability + (Math.random() - 0.5) * 0.2
      }))

      // Update qubit visualization
      setActiveQubits(prev => prev.map(() => Math.random() > 0.5))
    }, 1000)

    return () => clearInterval(interval)
  }, [stats])

  return (
    <BridgeContainer>
      <MetricGroup>
        <MetricLabel>Quantum Entanglement</MetricLabel>
        <ProgressBar>
          <Progress value={quantumState.entanglement} />
        </ProgressBar>
      </MetricGroup>
      <MetricGroup>
        <MetricLabel>Quantum Coherence</MetricLabel>
        <ProgressBar>
          <Progress value={quantumState.coherence} />
        </ProgressBar>
      </MetricGroup>
      <MetricGroup>
        <MetricLabel>Quantum Stability</MetricLabel>
        <ProgressBar>
          <Progress value={quantumState.stability} />
        </ProgressBar>
      </MetricGroup>
      <StateGrid>
        {activeQubits.map((active, i) => (
          <QuantumCell key={i} active={active} />
        ))}
      </StateGrid>
    </BridgeContainer>
  )
} 