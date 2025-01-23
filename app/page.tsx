'use client'
import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { TypewriterText } from './components/TypewriterText'
import { CodeRain } from './components/CodeRain'
import { AnimatedCode, StatusText, Cursor, Divider } from './components/AnimatedStatus'
import { ScrollingLogs } from './components/ScrollingLogs'
import { useRouter } from 'next/navigation'

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  position: relative;
  z-index: 1;
`

const BrainContainer = styled.div`
  width: 80vh;
  height: 80vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  justify-items: center;
  padding: 2rem;
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 10px;
  box-shadow: 0 0 20px ${props => props.theme.colors.primary}40;
  position: relative;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
`

const HeaderSection = styled.div`
  position: sticky;
  top: 0;
  text-align: center;
  z-index: 2;
  padding: 0.5rem 0;
  width: 100%;
`

const ContentSection = styled.div`
  width: 100%;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  align-items: flex-end;
  margin-bottom: 2rem;
  
  /* Hide scrollbar but keep functionality */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const TempText = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.secondary};
  text-align: center;
  font-size: 3rem;
  letter-spacing: 0.5rem;
  margin-bottom: 1rem;
`

const SubTitle = styled.h2`
  color: ${props => props.theme.colors.accent};
  font-family: ${props => props.theme.fonts.primary};
  text-align: center;
  font-size: 1rem;
  opacity: 0.8;
  margin-bottom: 1.5rem;
`

const Description = styled.div`
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.primary};
  text-align: center;
  font-size: 0.9rem;
  width: 100%;
  max-width: 600px;
  line-height: 1.8;
  margin: 0 auto;
  opacity: 0.85;

  code {
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.secondary}40;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-size: 0.8rem;
    letter-spacing: 0.5px;
  }

  .status-text {
    color: ${props => props.theme.colors.primary};
    font-weight: 500;
  }

  .divider {
    margin: 0.8rem 0;
    opacity: 0.5;
  }
`

const SystemLog = styled.div`
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.primary};
  font-size: 0.8rem;
  opacity: 0.9;
  text-align: left;
  width: 100%;
  max-height: 80px; // Reduced from 150px
  overflow-y: auto;
  padding: 0 1rem;
`

const LogEntry = styled.div`
  margin: 0.3rem 0; // Reduced from 0.5rem
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const LoadingProgress = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
`

const CountdownTimer = styled.div`
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.primary};
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 0 0 10px ${props => props.theme.colors.primary};
`

const StatusIndicator = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.accent};
`

const ProcessList = styled.div`
  margin-top: 1rem;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.text};
  opacity: 0.7;
  text-align: right;
`

const StatsLine = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 1rem;
  margin: 0.3rem 0;
`

const StatusLabel = styled.span`
  position: sticky;
  color: ${props => props.theme.colors.primary};
  opacity: 0.9;
  display: inline-block;
`

const DetailedDescription = styled(Description)`
  max-height: 300px;
  overflow: hidden;
  position: relative;
  width: 90%;
  
  /* Status text styling */
  ${StatusText} {
    font-size: 0.75rem;
  }

  /* Regular text */
  font-size: 0.8rem;

  /* Divider styling */
  ${Divider} {
    font-size: 0.7rem;
    letter-spacing: 0.3rem;
    opacity: 0.3;
  }

  /* Code sections */
  ${AnimatedCode} {
    font-size: 0.75rem;
    padding: 0.1rem 0.3rem;
  }

  /* Spacing adjustments */
  br {
    margin-bottom: 0.3rem;
  }

  /* Gradient fade at bottom */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 20px;
    background: linear-gradient(transparent, ${props => props.theme.colors.background});
  }
`

const EnterButton = styled.button`
  position: absolute;
  bottom: 4rem;
  left: 50%;
  transform: translateX(-50%);
  background: transparent;
  border: 1px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primary};
  padding: 0.5rem 2rem;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;
  animation: ${fadeIn} 1s forwards;
  
  &:hover {
    background: ${props => props.theme.colors.primary}20;
    box-shadow: 0 0 20px ${props => props.theme.colors.primary}40;
  }
`

const synaptrixLogs = [
  'Initializing quantum neural network...',
  `Loading Synaptrix Core:
   class NeuralInterface {
     private quantumState: QuantumState;
     private synapticStrength: number;
   }`,
  `Calibrating neural pathways:
   async function initializeNeuralBridge() {
     await quantum.entangle(brain.signals);
     return new SynapticConnection();
   }`,
  `Establishing quantum entanglement:
   const brainwaveFrequency = new Frequency({
     alpha: 8-12Hz,
     beta: 12-30Hz,
     gamma: 30-100Hz
   });`,
  `Optimizing neural codec:
   class NeuralCodec implements BrainComputerInterface {
     private signalProcessor: QuantumProcessor;
     private aiCore: SaffronAI;
   }`,
  `Loading pattern recognition:
   async function processNeuralSignals(eegData: EEGStream) {
     const patterns = await ai.analyze(eegData);
     return quantum.superposition(patterns);
   }`,
  `Initializing Saffron-1 AI model:
   const neuralNetwork = new QuantumNeuralNetwork({
     layers: [1024, 2048, 4096],
     activation: 'quantum_relu'
   });`,
  'System ready for neural connection'
]

export default function Home() {
  const router = useRouter()
  const [forceUpdate, setForceUpdate] = useState(0)
  const [loadingStep, setLoadingStep] = useState(0)
  const [countdown, setCountdown] = useState(30)
  const [processingTasks] = useState([
    'Analyzing neural patterns',
    'Optimizing signal processing',
    'Calibrating feedback loops',
    'Synchronizing neural interface',
    'Validating connection stability'
  ])
  const [currentTask, setCurrentTask] = useState(0)
  
  const systemLogs = [
    'Initializing Synaptrix kernel v2.1.4...',
    'Loading neural pattern recognition modules [===>]...',
    'Calibrating EEG signal processors (freq: 0.5-100Hz)...',
    'Establishing neural feedback loops (latency: <1ms)...',
    'Optimizing quantum neural pathways...',
    'Analyzing synaptic connections...',
    'Validating neural interface stability...',
    'Synchronizing quantum states...',
    'Processing neural feedback data...',
    'System ready for neural connection'
  ]

  const handleLogComplete = () => {
    if (loadingStep < systemLogs.length - 1) {
      setLoadingStep(prev => prev + 1)
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const taskTimer = setInterval(() => {
      setCurrentTask(prev => (prev + 1) % processingTasks.length)
    }, 2000)

    return () => clearInterval(taskTimer)
  }, [processingTasks.length])

  useEffect(() => {
    // Force a single update when component mounts
    setForceUpdate(prev => prev + 1)
  }, [])

  return (
    <>
      <CodeRain />
      <MainContainer>
        <BrainContainer>
          <HeaderSection>
            <TempText>
              SYNAPTRIX
              <br />
              NEURALIS 1.0
            </TempText>
            <SubTitle>Advanced Neural Interface System</SubTitle>
            <DetailedDescription>
              <div>
                <StatusLabel>status: </StatusLabel>
                <TypewriterText 
                  key={`status-text-${forceUpdate}`}
                  text="initializing neural pathways..." 
                  delay={50} 
                />
                <Cursor />
              </div>
              <br />
              <Divider>/ / / / / / / / / / / / / / / /</Divider>
              <br />
              Real-time EEG processing and neural feedback system
              <br />
              <StatsLine>
                <StatusText delay="0.2s">Quantum Processing Units: Online</StatusText>
                <StatusText delay="0.3s">Neural Pattern Recognition: Active</StatusText>
              </StatsLine>
              <br />
              <div>
                <StatusLabel>connecting: </StatusLabel>
                <TypewriterText 
                  key={`connecting-text-${forceUpdate}`}
                  text="brain-computer interface"
                  delay={50} 
                />
                <Cursor />
              </div>
              <br />
              <Divider>/ / / / / / / / / / / / / / / /</Divider>
              <br />
              <StatsLine>
                <StatusText delay="0.6s">Bandwidth: 1.2 TB/s</StatusText>
                <StatusText delay="0.7s">Latency: 0.3ms</StatusText>
                <StatusText delay="0.8s">Sync: 99.99%</StatusText>
              </StatsLine>
            </DetailedDescription>
          </HeaderSection>

          <LoadingProgress>
            <CountdownTimer>{countdown}s</CountdownTimer>
            <StatusIndicator>System Loading...</StatusIndicator>
            <ProcessList>
              {processingTasks[currentTask]}...
            </ProcessList>
          </LoadingProgress>
          {countdown === 0 && (
            <EnterButton onClick={() => router.push('/dashboard')}>
              Enter Synaptrix
            </EnterButton>
          )}
        </BrainContainer>
      </MainContainer>
    </>
  )
} 