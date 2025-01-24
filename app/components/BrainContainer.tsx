'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import { BrainModel } from './BrainModel'
import styled from 'styled-components'

const CanvasContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background: transparent;
`

export function BrainContainer() {
  return (
    <CanvasContainer>
      <Canvas
        camera={{ 
          position: [0, 0, 5],  // Moved camera closer
          fov: 75,  // Wider field of view
          near: 0.1,
          far: 1000
        }}
        style={{ background: 'transparent' }}
      >
        <OrbitControls 
          enableZoom={true}  // Enable zoom for debugging
          enablePan={true}   // Enable pan for debugging
          minDistance={2}    // Limit how close we can zoom
          maxDistance={10}   // Limit how far we can zoom
        />
        
        {/* Stronger lighting */}
        <ambientLight intensity={2} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        
        <Environment preset="city" />
        
        <BrainModel />
      </Canvas>
    </CanvasContainer>
  )
} 