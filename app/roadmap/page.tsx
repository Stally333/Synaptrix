'use client'
import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { NeuralBackground } from '../components/NeuralBackground'
import Link from 'next/link'
import { Modal } from '../components/Modal'

const pulse = keyframes`
  0% { box-shadow: 0 0 15px rgba(255, 255, 255, 0.1); }
  50% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.2); }
  100% { box-shadow: 0 0 15px rgba(255, 255, 255, 0.1); }
`

const glow = keyframes`
  0% { opacity: 0.8; }
  50% { opacity: 1; }
  100% { opacity: 0.8; }
`

const neuralPulse = keyframes`
  0% { transform: scale(1); opacity: 0.4; }
  50% { transform: scale(1.2); opacity: 0.8; }
  100% { transform: scale(1); opacity: 0.4; }
`

const dataStream = keyframes`
  0% { transform: translateY(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-20px); opacity: 0; }
`

const RoadmapContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  position: relative;
  overflow: hidden;
  padding: 2rem;
`

const TimelineContainer = styled.div`
  max-width: 1200px;
  margin: 4rem auto;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.5) 10%,
      rgba(255, 255, 255, 0.5) 90%,
      rgba(255, 255, 255, 0) 100%
    );
  }
`

const NeuralConnection = styled.div<{ align: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${props => props.align === 'left' ? 'right: -11.5%;' : 'left: -12.5%;'}
  width: 100px;
  height: 2px;
  background: linear-gradient(
    ${props => props.align === 'left' ? '270deg' : '90deg'},
    transparent 0%,
    ${props => props.theme.colors.primary} 50%,
    transparent 100%
  );
  opacity: 0.3;
`

const NeuralNode = styled.div<{ align: 'left' | 'right' }>`
  position: absolute;
  width: 12px;
  height: 12px;
  background: ${props => props.theme.colors.primary};
  border-radius: 50%;
  animation: ${neuralPulse} 2s infinite;
  box-shadow: 0 0 15px ${props => props.theme.colors.primary};
  ${props => props.align === 'left' ? 'right: -6px;' : 'left: -6px;'}
  top: 50%;
  transform: translateY(-50%);
`

const Phase = styled.div<{ align: 'left' | 'right' }>`
  width: 45%;
  margin: 2rem 0;
  position: relative;
  ${props => props.align === 'right' ? 'margin-left: 55%;' : ''}
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    ${props => props.align === 'left' ? 'right: -11.5%;' : 'left: -12.5%;'}
    width: 20px;
    height: 20px;
    background: ${props => props.theme.colors.background};
    border: 2px solid #fff;
    border-radius: 50%;
    transform: translateY(-50%);
    animation: ${glow} 2s infinite;
  }

  &:hover {
    ${NeuralConnection} {
      opacity: 0.8;
    }
    
    ${NeuralNode} {
      animation: ${neuralPulse} 1s infinite;
    }
  }
`

const DataParticle = styled.div`
  position: absolute;
  width: 2px;
  height: 2px;
  background: ${props => props.theme.colors.primary};
  animation: ${dataStream} 1.5s linear infinite;
  opacity: 0;
`

const PhaseContent = styled.div`
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  animation: ${pulse} 4s infinite;
  position: relative;
  overflow: hidden;
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.4);
    background: rgba(0, 0, 0, 0.8);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        45deg,
        transparent 0%,
        rgba(0, 255, 0, 0.03) 50%,
        transparent 100%
      );
      animation: ${glow} 2s infinite;
    }
  }
`

const PhaseDate = styled.div`
  font-family: ${props => props.theme.fonts.secondary};
  color: ${props => props.theme.colors.primary};
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`

const PhaseTitle = styled.h3`
  color: #fff;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  font-family: ${props => props.theme.fonts.secondary};
`

const PhaseDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.6;
`

const roadmapData = [
  {
    date: 'Q1 2025',
    title: 'Genesis Launch',
    description: 'Initial token launch with quantum-secured smart contracts. Implementation of neural network trading algorithms and establishment of primary liquidity pools.',
    align: 'left' as const
  },
  {
    date: 'Q2 2025',
    title: 'Neural Interface Beta',
    description: 'Release of advanced trading interface with real-time neural pattern recognition. Introduction of stake-to-earn mechanics with neural activity correlation.',
    align: 'right' as const
  },
  {
    date: 'Q3 2025',
    title: 'Quantum Bridge Integration',
    description: 'Launch of cross-chain quantum bridge enabling instant, secure transfers. Implementation of quantum-resistant encryption protocols.',
    align: 'left' as const
  },
  {
    date: 'Q4 2025',
    title: 'Synaptic DAO Activation',
    description: 'Transition to full DAO governance with neural-weighted voting. Introduction of neural mining rewards and quantum staking pools.',
    align: 'right' as const
  },
  {
    date: 'Q1 2026',
    title: 'Neural Ecosystem Expansion',
    description: 'Launch of developer tools and grants program. Integration with major DeFi protocols and expansion of neural network capabilities.',
    align: 'left' as const
  },
  {
    date: 'Q2 2026',
    title: 'Quantum Mainnet',
    description: 'Migration to dedicated quantum-secured blockchain. Launch of advanced neural prediction markets and AI-driven yield optimization.',
    align: 'right' as const
  }
]

const Header = styled.header`
  background: rgba(0, 0, 0, 0.8);
  border-bottom: 1px solid ${props => props.theme.colors.primary}40;
  padding: 0.75rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 20px ${props => props.theme.colors.primary}20;
  height: 56px;
  position: sticky;
  top: 0;
  z-index: 1000;
`

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
`

const Navigation = styled.nav`
  display: flex;
  gap: 1rem;
`

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 0.9rem;
  opacity: 0.8;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    color: ${props => props.theme.colors.primary};
    opacity: 1;
  }
`

const ModalTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 2rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
`

const ModalDate = styled.div`
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.2rem;
  opacity: 0.8;
  margin-bottom: 2rem;
`

const ModalDescription = styled.div`
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.primary};
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 2rem;
`

const DetailsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    margin: 1rem 0;
    padding-left: 1.5rem;
    position: relative;
    color: ${props => props.theme.colors.text};
    
    &::before {
      content: '>';
      position: absolute;
      left: 0;
      color: ${props => props.theme.colors.primary};
    }
  }
`

export default function Roadmap() {
  const [selectedPhase, setSelectedPhase] = useState<null | {
    title: string;
    date: string;
    description: string;
    details: string[];
  }>(null);

  const phaseDetails = {
    'Genesis Launch': {
      details: [
        'Implementation of quantum-resistant cryptography',
        'Neural network trading algorithm deployment',
        'Initial liquidity pool establishment',
        'Smart contract security audits',
        'Community governance structure setup'
      ]
    },
    'Neural Interface Beta': {
      details: [
        'Advanced pattern recognition system integration',
        'Real-time neural feedback mechanisms',
        'Stake-to-earn protocol implementation',
        'Neural activity correlation tracking',
        'Beta testing program launch'
      ]
    },
    'Quantum Bridge Integration': {
      details: [
        'Cross-chain quantum bridge deployment',
        'Quantum-resistant encryption protocols',
        'Inter-blockchain transfer optimization',
        'Quantum state verification system',
        'Bridge security monitoring setup'
      ]
    }
  };

  return (
    <>
      <Header>
        <Logo>SYNAPTRIX</Logo>
        <Navigation>
          <NavLink href="/roadmap">Road Map</NavLink>
          <NavLink href="/neural">Neural Interface</NavLink>
          <NavLink href="/tokenomics">Tokenomics</NavLink>
          <NavLink href="/wallet">Wallet</NavLink>
        </Navigation>
      </Header>
      <RoadmapContainer>
        <NeuralBackground />
        <TimelineContainer>
          {roadmapData.map((phase, index) => (
            <Phase 
              key={index} 
              align={phase.align}
              onClick={() => setSelectedPhase({
                ...phase,
                details: phaseDetails[phase.title as keyof typeof phaseDetails].details
              })}
              style={{ cursor: 'pointer' }}
            >
              <PhaseContent>
                <PhaseDate>{phase.date}</PhaseDate>
                <PhaseTitle>{phase.title}</PhaseTitle>
                <PhaseDescription>{phase.description}</PhaseDescription>
                {Array.from({ length: 5 }).map((_, i) => (
                  <DataParticle
                    key={i}
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  />
                ))}
              </PhaseContent>
              <NeuralConnection align={phase.align} />
              <NeuralNode align={phase.align} />
            </Phase>
          ))}
        </TimelineContainer>
      </RoadmapContainer>

      <Modal 
        isOpen={!!selectedPhase} 
        onClose={() => setSelectedPhase(null)}
      >
        {selectedPhase && (
          <>
            <ModalTitle>{selectedPhase.title}</ModalTitle>
            <ModalDate>{selectedPhase.date}</ModalDate>
            <ModalDescription>{selectedPhase.description}</ModalDescription>
            <DetailsList>
              {selectedPhase.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </DetailsList>
          </>
        )}
      </Modal>
    </>
  )
} 