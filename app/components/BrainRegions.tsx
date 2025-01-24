'use client'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNeural } from '../context/NeuralContext'
import * as THREE from 'three'

const RegionTooltip = styled.div<{ x: number; y: number }>`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid #00ff00;
  padding: 1rem;
  border-radius: 4px;
  color: #00ff00;
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 0.9rem;
  transform: translate(-50%, -100%);
  pointer-events: none;
  z-index: 100;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.2);
`

const RegionStat = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 0.3rem 0;
  
  span:last-child {
    color: ${props => props.theme.colors.accent};
  }
`

interface RegionData {
  name: string
  position: THREE.Vector3
  activity: number
  synapticDensity: number
  quantumCoherence: number
}

const brainRegions: RegionData[] = [
  {
    name: 'Frontal Cortex',
    position: new THREE.Vector3(0, 2, 0),
    activity: 92.5,
    synapticDensity: 88.7,
    quantumCoherence: 95.2
  },
  {
    name: 'Temporal Lobe',
    position: new THREE.Vector3(-2, 0, 0),
    activity: 87.3,
    synapticDensity: 91.4,
    quantumCoherence: 93.8
  },
  // Add more regions as needed
]

export const BrainRegions = () => {
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const { stats } = useNeural()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      {selectedRegion && (
        <RegionTooltip x={mousePos.x} y={mousePos.y}>
          <h3>{selectedRegion.name}</h3>
          <RegionStat>
            <span>Neural Activity:</span>
            <span>{selectedRegion.activity * (stats.brainActivity / 100)}%</span>
          </RegionStat>
          <RegionStat>
            <span>Synaptic Density:</span>
            <span>{selectedRegion.synapticDensity * (stats.neuralSync / 100)}%</span>
          </RegionStat>
          <RegionStat>
            <span>Quantum Coherence:</span>
            <span>{selectedRegion.quantumCoherence * (stats.quantumState / 100)}%</span>
          </RegionStat>
        </RegionTooltip>
      )}
    </>
  )
} 