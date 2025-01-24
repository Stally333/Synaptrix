'use client'
import React, { useState, useCallback } from 'react'
import styled, { keyframes } from 'styled-components'
import { Header } from '../components/Header'
import { NeuralBackground } from '../components/NeuralBackground'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { motion, AnimatePresence } from 'framer-motion'

const pulse = keyframes`
  0% { box-shadow: 0 0 10px ${props => props.theme.colors.primary}20; }
  50% { box-shadow: 0 0 30px ${props => props.theme.colors.primary}40; }
  100% { box-shadow: 0 0 10px ${props => props.theme.colors.primary}20; }
`

const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const TokenomicsContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  position: relative;
  overflow: hidden;
`

const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 0.5rem;
  height: 100vh;
`

const Title = styled(motion.h1)`
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 2rem;
  text-align: center;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 4px;
  position: relative;
  text-shadow: 0 0 10px ${props => props.theme.colors.primary}40;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`

const StatBox = styled(motion.div)`
  padding: 0.5rem;
  border: 1px solid ${props => props.theme.colors.primary}40;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.7);
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200%;
    background: linear-gradient(
      transparent 0%,
      ${props => props.theme.colors.primary}10 50%,
      transparent 100%
    );
    animation: ${scanline} 4s linear infinite;
  }

  h4 {
    color: ${props => props.theme.colors.primary};
    font-size: 1.5rem;
    margin: 0;
    font-family: ${props => props.theme.fonts.secondary};
  }

  p {
    font-size: 0.75rem;
    margin-top: 0.25rem;
  }
`

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  gap: 1rem;
  height: calc(100vh - 260px);
  margin-bottom: 0.5rem;
`

const ChartContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ChartOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  background: radial-gradient(
    circle at center,
    transparent 30%,
    rgba(0, 255, 0, 0.05) 60%,
    transparent 70%
  );
`

const HexagonalFrame = styled(motion.div)`
  position: absolute;
  width: 360px;
  height: 360px;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid ${props => props.theme.colors.primary}30;
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
    animation: ${rotate} 20s linear infinite;
  }
`

const ChartHighlight = styled(motion.div)<{ $isActive: boolean }>`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.colors.primary}40;
  box-shadow: ${props => props.$isActive ? 
    `0 0 30px ${props.theme.colors.primary}40,
     inset 0 0 30px ${props.theme.colors.primary}40` : 
    'none'};
  transition: all 0.3s ease;
`

const ChartSection = styled(motion.div)`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.primary}40;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.7);
  position: relative;
  animation: ${pulse} 4s infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at center,
      transparent 30%,
      rgba(0, 255, 0, 0.03) 70%
    );
    animation: ${rotate} 30s linear infinite;
  }
`

const DistributionSection = styled(motion.div)`
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 0.5rem;
  height: 100%;
  border: 1px solid ${props => props.theme.colors.primary}40;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.7);
  padding: 0.75rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary}40;
    border-radius: 4px;
  }
`

const TokenList = styled.div`
  overflow-y: auto;
  padding-right: 0.5rem;
  max-height: calc(100vh - 520px);
  margin-bottom: 0.25rem;

  &::-webkit-scrollbar {
    width: 4px;
  }
`

const TimelinePoint = styled(motion.div)`
  margin: 0.2rem 0;
  padding-left: 0.75rem;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
`

const AirdropSection = styled.div`
  padding: 0.5rem;
  font-size: 0.7rem;
  margin-top: 0.25rem;

  ${TimelinePoint} {
    margin: 0.2rem 0;
    padding-left: 0;
  }
`

const CategoryCard = styled(motion.div)`
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.4rem;
  border: 1px solid ${props => props.theme.colors.primary}20;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: rgba(0, 0, 0, 0.7);
  }

  div {
    font-size: 0.7rem;
    line-height: 1.2;
  }
`

const CategoryTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${props => props.theme.fonts.secondary};
  color: ${props => props.theme.colors.primary};
  font-size: 1.1rem;
`

const AirdropSchedule = styled(motion.div)`
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(0, 255, 0, 0.05);
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.primary}30;
`

const AirdropTitle = styled.h4`
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1rem;
  margin-bottom: 0.5rem;
`

const AirdropTimeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin: 0.25rem 0;
`

const tokenomicsData = [
  { name: 'Trading Reserve', value: 8.88, color: '#00ff00' },
  { name: '1 Year Stake', value: 11.11, color: '#00cc00' },
  { name: '2 Year Stake', value: 22.22, color: '#009900' },
  { name: '3 Year Stake', value: 33.33, color: '#006600' },
  { name: 'Public Sale', value: 24.46, color: '#003300' },
  { name: 'Neural Airdrops', value: 0, color: '#00ff00' },
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
    description: 'Available for public trading and community participation. Features a unique compounding airdrop system that rewards long-term holders with exponentially increasing rewards every 2 days.',
    details: [
      'Open market trading',
      'Community governance',
      'Instant neural access',
      'Compounding airdrops'
    ],
    airdropSchedule: [
      { day: 2, compound: '1st Airdrop (Base APY)' },
      { day: 4, compound: '2nd Airdrop (2x APY)' },
      { day: 8, compound: '3rd Airdrop (4x APY)' },
      { day: 16, compound: '4th Airdrop (8x APY)' },
      { day: 32, compound: '5th Airdrop (16x APY)' },
      { day: 64, compound: '6th Airdrop (32x APY)' }
    ]
  },
  'Neural Airdrops': {
    percentage: 0,
    description: 'Exponentially compounding airdrop system that rewards long-term holders. Airdrops occur every 2 days with increasing multipliers.',
    airdropSchedule: [
      { day: 2, compound: '1st Airdrop (Base APY)' },
      { day: 4, compound: '2nd Airdrop (2x APY)' },
      { day: 8, compound: '3rd Airdrop (4x APY)' },
      { day: 16, compound: '4th Airdrop (8x APY)' },
      { day: 32, compound: '5th Airdrop (16x APY)' },
      { day: 64, compound: '6th Airdrop (32x APY)' }
    ]
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
  const [hoveredSection, setHoveredSection] = useState<number | null>(null)

  const handleCategoryClick = (name: string) => {
    if (selectedCategory === name) {
      setSelectedCategory(null)
    } else {
      setSelectedCategory(name)
    }
  }

  const handlePieEnter = useCallback((data: any, index: number) => {
    setHoveredSection(index);
  }, []);

  const handlePieLeave = useCallback(() => {
    setHoveredSection(null);
  }, []);

  return (
    <TokenomicsContainer>
      <NeuralBackground />
      <Header />
      <ContentContainer>
        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          $SYNA Tokenomics
        </Title>

        <StatsGrid>
          {stats.map((stat, index) => (
            <StatBox
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <h4>{stat.value}</h4>
              <p>{stat.label}</p>
            </StatBox>
          ))}
        </StatsGrid>

        <MainGrid>
          <ChartSection>
            <ChartContainer
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <HexagonalFrame />
              <ChartHighlight $isActive={hoveredSection !== null} />
              <ChartOverlay />
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tokenomicsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={140}
                    paddingAngle={3}
                    dataKey="value"
                    onMouseEnter={handlePieEnter}
                    onMouseLeave={handlePieLeave}
                  >
                    {tokenomicsData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        opacity={hoveredSection === null || hoveredSection === index ? 1 : 0.3}
                        stroke={props => props.theme.colors.primary}
                        strokeWidth={1}
                        onClick={() => handleCategoryClick(entry.name)}
                      >
                        <animate
                          attributeName="opacity"
                          values={hoveredSection === index ? "0.8;1;0.8" : "1"}
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </Cell>
                    ))}
                  </Pie>
                  <Tooltip 
                    content={<CustomTooltip />}
                    position={{ x: 0, y: 0 }}
                    cursor={false}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </ChartSection>

          <DistributionSection>
            <TokenList>
              {tokenomicsData
                .filter(item => item.name !== 'Neural Airdrops')
                .map((item, index) => (
                  <CategoryCard
                    key={index}
                    onClick={() => handleCategoryClick(item.name)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <CategoryTitle>
                      <span>{item.name}</span>
                      <span>{item.value}%</span>
                    </CategoryTitle>
                    {selectedCategory === item.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <div style={{ 
                          marginTop: '0.5rem', 
                          fontSize: '0.75rem', 
                          lineHeight: '1.3' 
                        }}>
                          {tokenomicsDetails[item.name as keyof typeof tokenomicsDetails].description}
                        </div>
                      </motion.div>
                    )}
                  </CategoryCard>
                ))}
            </TokenList>

            <AirdropSection>
              <CategoryTitle style={{ marginBottom: '0.75rem' }}>
                Neural Airdrops
              </CategoryTitle>
              <div style={{ 
                fontSize: '0.75rem', 
                lineHeight: '1.3',
                marginBottom: '1rem'
              }}>
                {tokenomicsDetails['Neural Airdrops'].description}
              </div>
              <AirdropTimeline>
                {tokenomicsDetails['Neural Airdrops'].airdropSchedule.map((drop, index) => (
                  <TimelinePoint
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      width: '100%',
                      alignItems: 'center',
                      gap: '1rem'
                    }}>
                      <span style={{ color: '#00ff00' }}>Day {drop.day}</span>
                      <span>{drop.compound}</span>
                    </div>
                  </TimelinePoint>
                ))}
              </AirdropTimeline>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                style={{ 
                  fontSize: '0.7rem', 
                  marginTop: '0.5rem',
                  padding: '0.4rem',
                  border: '1px solid #00ff0040',
                  borderRadius: '4px',
                  background: 'rgba(0, 255, 0, 0.05)'
                }}
              >
                * SYNA retains 8.88% of generated APY for ecosystem sustainability
              </motion.div>
            </AirdropSection>
          </DistributionSection>
        </MainGrid>
      </ContentContainer>
    </TokenomicsContainer>
  )
} 