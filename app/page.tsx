'use client'
import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { TypewriterText } from './components/TypewriterText'
import { CodeRain } from './components/CodeRain'
import { AnimatedCode, StatusText, Cursor, Divider } from './components/AnimatedStatus'
import { ScrollingLogs } from './components/ScrollingLogs'
import { useRouter } from 'next/navigation'
import { AnimatedStat } from './components/AnimatedStats'

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const glowPulse = keyframes`
  0% { box-shadow: 0 0 5px ${props => props.theme.colors.primary}40; }
  50% { box-shadow: 0 0 30px ${props => props.theme.colors.primary}80; }
  100% { box-shadow: 0 0 5px ${props => props.theme.colors.primary}40; }
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
  font-size: 3.5rem;
  letter-spacing: 0.2rem;
  margin-bottom: 1rem;
  text-transform: lowercase;
  line-height: 1.2;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
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
  font-size: 2.5rem;
  font-weight: bold;
  text-align: right;
  margin-bottom: 0.5rem;
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
  bottom: 2rem;
  left: 2rem;
  padding: 1rem 3rem;
  background: transparent;
  border: 1px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.5rem;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  text-transform: uppercase;
  font-weight: 500;

  &:hover {
    background: ${props => props.theme.colors.primary}20;
    box-shadow: 0 0 30px ${props => props.theme.colors.primary}60;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`

const DeniedButton = styled(EnterButton)`
  border-color: #FF0000;
  color: #FF0000;
  cursor: not-allowed;

  &:hover {
    background: #FF000020;
    box-shadow: 0 0 30px #FF000060;
    transform: none;
  }

  &:active {
    transform: none;
  }
`

const BrainPreloader = styled.iframe`
  width: 0;
  height: 0;
  opacity: 0;
  position: absolute;
  pointer-events: none;
`

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${props => props.theme.colors.background};
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
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

const interfaceOptions = [
  'Brain-Computer Interface',
  'Neural Pathway Matrix',
  'Quantum Neural Network',
  'Synaptic Bridge Protocol'
]

export default function Home() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(30)
  const [currentTask, setCurrentTask] = useState(0)
  const [processingTasks] = useState([
    'Analyzing neural patterns',
    'Optimizing signal processing',
    'Calibrating feedback loops',
    'Synchronizing neural interface',
    'Validating connection stability'
  ])
  const [currentInterface, setCurrentInterface] = useState(0)
  const [isAccessible, setIsAccessible] = useState(true)

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
    const interfaceTimer = setInterval(() => {
      setCurrentInterface(prev => (prev + 1) % interfaceOptions.length)
    }, 4000)

    return () => clearInterval(interfaceTimer)
  }, [])

  useEffect(() => {
    const accessTimer = setInterval(() => {
      setIsAccessible(prev => !prev)
    }, 2000)

    return () => clearInterval(accessTimer)
  }, [])

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <CodeRain />
      
      <MainContainer>
        <BrainContainer>
          <HeaderSection>
            <TempText>
              <div>initializing synaptrix</div>
              <div>neuralis 1.0...</div>
            </TempText>
            <SubTitle>Advanced Neural Interface System</SubTitle>
            <DetailedDescription>
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
                <StatusLabel>connecting:&nbsp;</StatusLabel>
                <TypewriterText 
                  text={interfaceOptions[currentInterface]}
                  delay={50} 
                  key={currentInterface}
                />
                <Cursor />
              </div>
              <br />
              <Divider>/ / / / / / / / / / / / / / / /</Divider>
              <br />
              <StatsLine>
                <AnimatedStat 
                  label="Bandwidth"
                  startValue={0}
                  endValue={1.2}
                  unit=" TB/s"
                  delay="0.6s"
                  decimals={2}
                  fluctuationRange={15}
                  updateInterval={20}
                />
                <AnimatedStat 
                  label="Latency"
                  startValue={1}
                  endValue={0.3}
                  unit="ms"
                  delay="0.7s"
                  decimals={2}
                  fluctuationRange={10}
                  updateInterval={30}
                />
                <AnimatedStat 
                  label="Sync"
                  startValue={0}
                  endValue={99.99}
                  unit="%"
                  delay="0.8s"
                  decimals={2}
                  fluctuationRange={0.05}
                  updateInterval={80}
                />
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
            isAccessible ? (
              <EnterButton onClick={() => router.push('/dashboard')}>
                Enter Synaptrix
              </EnterButton>
            ) : (
              <DeniedButton onClick={(e) => e.preventDefault()}>
                Access Denied
              </DeniedButton>
            )
          )}
        </BrainContainer>
      </MainContainer>
    </div>
  )
} 