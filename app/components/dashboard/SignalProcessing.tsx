'use client'
import styled from 'styled-components'
import { AnimatedStat } from '../AnimatedStats'

const SignalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid ${props => props.theme.colors.primary}40;
  border-radius: 8px;
  backdrop-filter: blur(5px);
`

const StatGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
  align-items: center;
`

const StatTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0.5rem;
  font-size: 0.8rem;
  opacity: 0.8;
  color: ${props => props.theme.colors.text};
`

export const SignalProcessing = () => {
  return (
    <SignalContainer>
      <StatTitle>
        <span>Signal Strength</span>
        <span>Latency</span>
        <span>Neural Sync</span>
        <span>Quantum State</span>
        <span>Brain Activity</span>
        <span>Memory Load</span>
      </StatTitle>
      <StatGroup>
        <AnimatedStat 
          startValue={0}
          endValue={98.5}
          unit="%"
          decimals={1}
          fluctuationRange={1.5}
          updateInterval={800}
        />
        <AnimatedStat 
          startValue={0}
          endValue={0.3}
          unit="ms"
          decimals={2}
          fluctuationRange={0.1}
          updateInterval={500}
          warningThreshold={0.5}
          isLatency={true}
        />
        <AnimatedStat 
          startValue={0}
          endValue={99.9}
          unit="%"
          decimals={1}
          fluctuationRange={0.1}
          updateInterval={1000}
        />
        <AnimatedStat 
          startValue={0}
          endValue={99.99}
          unit="%"
          decimals={2}
          fluctuationRange={0.02}
          updateInterval={300}
        />
        <AnimatedStat 
          startValue={0}
          endValue={85.5}
          unit="Hz"
          decimals={1}
          fluctuationRange={5}
          updateInterval={600}
        />
        <AnimatedStat 
          startValue={0}
          endValue={42.8}
          unit="%"
          decimals={1}
          fluctuationRange={2}
          updateInterval={1500}
          warningThreshold={80}
        />
      </StatGroup>
    </SignalContainer>
  )
} 