'use client'
import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Header } from '../components/Header'
import { NeuralBackground } from '../components/NeuralBackground'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { motion } from 'framer-motion'

const glow = keyframes`
  0% { box-shadow: 0 0 10px ${props => props.theme.colors.primary}40; }
  50% { box-shadow: 0 0 30px ${props => props.theme.colors.primary}60; }
  100% { box-shadow: 0 0 10px ${props => props.theme.colors.primary}40; }
`

const TokenomicsContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  position: relative;
  overflow: hidden;
`

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 1rem auto;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 10px;
  animation: ${glow} 4s infinite;
  backdrop-filter: blur(10px);
  height: calc(100vh - 120px); // Account for header and margins
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary}40;
    border-radius: 4px;
  }
`

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 4px;
`

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
`

const ChartContainer = styled.div`
  height: 300px; // Reduced from 400px
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.primary}40;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.5);
`

const TokenInfoCard = styled.div`
  padding: 1rem;
  border: 1px solid ${props => props.theme.colors.primary}40;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.5);
  max-height: 300px;
  overflow-y: auto;

  h3 {
    color: ${props => props.theme.colors.primary};
    font-family: ${props => props.theme.fonts.secondary};
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary}40;
    border-radius: 3px;
  }
`

const InfoSection = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  border: 1px solid ${props => props.theme.colors.primary}40;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.5);
`

const CategoryCard = styled(motion.div)`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.primary}40;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.7);
  margin: 0.5rem 0;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 20px ${props => props.theme.colors.primary}40;
  }
`

const CategoryTitle = styled.h4`
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1rem;
  margin-bottom: 0.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CategoryDescription = styled.p`
  font-size: 0.8rem;
  line-height: 1.4;
  opacity: 0.8;
  display: ${props => props.expanded ? 'block' : 'none'};
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`

const StatBox = styled(motion.div)`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.primary}40;
  border-radius: 8px;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);

  h4 {
    color: ${props => props.theme.colors.primary};
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
  }

  p {
    font-size: 0.8rem;
    opacity: 0.8;
  }
`

const tokenomicsData = [
  { name: 'Trading Reserve', value: 8.88, color: '#00ff00' },
  { name: '1 Year Stake', value: 11.11, color: '#00cc00' },
  { name: '2 Year Stake', value: 22.22, color: '#009900' },
  { name: '3 Year Stake', value: 33.33, color: '#006600' },
  { name: 'Public Sale', value: 24.46, color: '#003300' },
]

const tokenomicsDetails = {
  'Trading Reserve': {
    percentage: 8.88,
    description: 'Reserved for market making and liquidity provision. This allocation ensures stable price action and reduces volatility through strategic trading operations.',
    details: ['Automated market making', 'Liquidity provision', 'Price stability mechanism']
  },
  '1 Year Stake': {
    percentage: 11.11,
    description: 'Tokens locked for 1 year with 15% APY. Early supporters benefit from higher yields while ensuring medium-term price stability.',
    details: ['15% APY', 'Smart contract locked', 'Monthly neural rewards']
  },
  '2 Year Stake': {
    percentage: 22.22,
    description: 'Extended 2-year lock with 25% APY. Demonstrates long-term commitment and provides enhanced neural network participation rights.',
    details: ['25% APY', 'Enhanced voting power', 'Neural mining benefits']
  },
  '3 Year Stake': {
    percentage: 33.33,
    description: 'Maximum 3-year commitment with 40% APY. Highest tier of governance rights and neural network integration.',
    details: ['40% APY', 'Maximum governance weight', 'Priority neural access']
  },
  'Public Sale': {
    percentage: 24.46,
    description: 'Available for public trading and community participation. Ensures fair distribution and market accessibility.',
    details: ['Open market trading', 'Community governance', 'Instant neural access']
  }
}

const stats = [
  { value: '1B', label: 'Total Supply' },
  { value: '66.66%', label: 'Total Staked' },
  { value: '40%', label: 'Max APY' }
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ 
        background: 'rgba(0, 0, 0, 0.8)', 
        border: '1px solid #00ff00',
        padding: '0.5rem',
        borderRadius: '4px'
      }}>
        <p>{`${payload[0].name}: ${payload[0].value}%`}</p>
      </div>
    )
  }
  return null
}

export default function Tokenomics() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleCategoryClick = (name: string) => {
    if (selectedCategory === name) {
      setSelectedCategory(null)
    } else {
      setSelectedCategory(name)
    }
  }

  return (
    <TokenomicsContainer>
      <NeuralBackground />
      <Header />
      <ContentContainer>
        <Title>$SYNA Tokenomics</Title>
        
        <StatsGrid>
          {stats.map((stat, index) => (
            <StatBox
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <h4>{stat.value}</h4>
              <p>{stat.label}</p>
            </StatBox>
          ))}
        </StatsGrid>

        <GridLayout>
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tokenomicsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {tokenomicsData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      onClick={() => handleCategoryClick(entry.name)}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>

          <TokenInfoCard>
            <h3>Token Distribution</h3>
            {tokenomicsData.map((item, index) => (
              <CategoryCard
                key={index}
                onClick={() => handleCategoryClick(item.name)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <CategoryTitle>
                  {item.name}
                  <span style={{ color: item.color }}>{item.value}%</span>
                </CategoryTitle>
                <CategoryDescription expanded={selectedCategory === item.name}>
                  {tokenomicsDetails[item.name as keyof typeof tokenomicsDetails].description}
                  {selectedCategory === item.name && (
                    <motion.ul
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ marginTop: '0.5rem', paddingLeft: '1rem' }}
                    >
                      {tokenomicsDetails[item.name as keyof typeof tokenomicsDetails].details.map((detail, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}
                        >
                          {detail}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </CategoryDescription>
              </CategoryCard>
            ))}
          </TokenInfoCard>
        </GridLayout>
      </ContentContainer>
    </TokenomicsContainer>
  )
} 