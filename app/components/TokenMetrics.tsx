'use client'
import { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { useNeural } from '../context/NeuralContext'

const pulse = keyframes`
  0% { box-shadow: 0 0 10px rgba(0, 255, 0, 0.2); }
  50% { box-shadow: 0 0 20px rgba(0, 255, 0, 0.4); }
  100% { box-shadow: 0 0 10px rgba(0, 255, 0, 0.2); }
`

const MetricsContainer = styled.div`
  position: absolute;
  top: 8.5rem;
  right: 2rem;
  width: 320px;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid ${props => props.theme.colors.primary};
  padding: 1.5rem;
  border-radius: 4px;
  animation: ${pulse} 4s infinite;
  z-index: 100;
`

const MetricRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.8rem 0;
  font-family: ${props => props.theme.fonts.secondary};
`

const MetricLabel = styled.span`
  color: ${props => props.theme.colors.text};
  opacity: 0.8;
`

const MetricValue = styled.span<{ isPositive?: boolean }>`
  color: ${props => props.isPositive ? '#00FF00' : '#FF0000'};
  font-weight: 500;
`

const NeuralCorrelation = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.primary}40;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.primary};
`

interface TokenStats {
  price: number
  volume24h: number
  marketCap: number
  stakedAmount: number
  neuralActivity: number
}

export const TokenMetrics = () => {
  const [stats, setStats] = useState<TokenStats>({
    price: 2.45,
    volume24h: 1250000,
    marketCap: 24500000,
    stakedAmount: 8500000,
    neuralActivity: 0
  })
  const { stats: neuralStats } = useNeural()

  useEffect(() => {
    // Simulate real-time price updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        price: prev.price + (Math.random() - 0.5) * 0.1,
        volume24h: prev.volume24h + (Math.random() - 0.5) * 50000,
        neuralActivity: neuralStats.brainActivity
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [neuralStats])

  return (
    <MetricsContainer>
      <MetricRow>
        <MetricLabel>$SYNA Price</MetricLabel>
        <MetricValue isPositive={stats.price > 2.4}>
          ${stats.price.toFixed(2)}
        </MetricValue>
      </MetricRow>
      <MetricRow>
        <MetricLabel>24h Volume</MetricLabel>
        <MetricValue>
          ${(stats.volume24h / 1000000).toFixed(2)}M
        </MetricValue>
      </MetricRow>
      <MetricRow>
        <MetricLabel>Market Cap</MetricLabel>
        <MetricValue>
          ${(stats.marketCap / 1000000).toFixed(2)}M
        </MetricValue>
      </MetricRow>
      <MetricRow>
        <MetricLabel>Total Staked</MetricLabel>
        <MetricValue>
          ${(stats.stakedAmount / 1000000).toFixed(2)}M
        </MetricValue>
      </MetricRow>
      <NeuralCorrelation>
        Neural Activity Correlation: {stats.neuralActivity.toFixed(1)}%
      </NeuralCorrelation>
    </MetricsContainer>
  )
} 