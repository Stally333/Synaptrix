'use client'
import styled, { keyframes } from 'styled-components'

const fillAnimation = keyframes`
  from { width: 0; }
  to { width: 100%; }
`

const BarContainer = styled.div`
  width: 150px;
  height: 4px;
  background: ${props => props.theme.colors.primary}20;
  border-radius: 2px;
  overflow: hidden;
`

const Fill = styled.div<{ value: number }>`
  height: 100%;
  width: ${props => props.value}%;
  background: ${props => props.theme.colors.primary};
  border-radius: 2px;
  animation: ${fillAnimation} 1s ease-out;
`

interface StatsBarProps {
  value: number
  style?: React.CSSProperties
}

export const StatsBar: React.FC<StatsBarProps> = ({ value, style }) => {
  return (
    <BarContainer style={style}>
      <Fill value={value} />
    </BarContainer>
  )
} 