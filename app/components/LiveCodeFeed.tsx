'use client'
import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const Container = styled.div`
  position: relative;
  height: 80px;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 85%;
  margin-left: 2rem;
  margin-bottom: 1rem;
`

const CodeLine = styled.div<{ delay: number }>`
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.primary};
  font-size: 0.7rem;
  opacity: 0;
  animation: ${fadeIn} 0.3s ease-out forwards;
  animation-delay: ${props => props.delay}s;
  margin: 0.12rem 0;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 95%;
`

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 15px;
  background: ${props => props.theme.colors.primary};
  margin-left: 5px;
  animation: ${blink} 1s step-end infinite;
`

const codeSamples = [
  'Calibrating EEG processors... | Neural feedback: <1ms latency | Quantum pathways: optimal',
  'class NeuralInterface { private quantumState: QuantumState; private synapticStrength: number; }',
  'async function initNeural() { await quantum.entangle(signals); return new SynapticConnection(); }',
  'const { patterns, coherence } = await quantum.analyze(eegData, { frequency: "0.5-100Hz" });',
  'Neural recognition: ACTIVE | Quantum coherence: 99.99% | Synaptic strength: OPTIMAL',
  'for (const signal of brainwaveStream) { await quantum.process(signal, { latency: "0.3ms" }); }',
  'class QuantumProcessor implements INeuralInterface { constructor(private core: SaffronAI) {} }',
  'const metrics = { bandwidth: "1.2TB/s", syncRate: "99.99%", status: "OPTIMAL" };',
  'export class NeuralPathway extends QuantumCircuit { static readonly VERSION = "v2.1.4"; }',
  'while (true) { await neural.sync(); await quantum.stabilize(); await ai.optimize(); }'
]

export const LiveCodeFeed = () => {
  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const nextIndex = (prev + 1) % codeSamples.length
        setVisibleLines(current => {
          const newLines = [...current, codeSamples[prev]]
          return newLines.slice(-5) // Keep last 5 lines
        })
        return nextIndex
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Container>
      {visibleLines.map((line, index) => (
        <CodeLine
          key={`${index}-${line}`}
          delay={index * 0.1}
        >
          <span>$ {line}</span>
          {index === visibleLines.length - 1 && <Cursor />}
        </CodeLine>
      ))}
    </Container>
  )
} 