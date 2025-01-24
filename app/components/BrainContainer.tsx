'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, Center } from '@react-three/drei'
import { BrainModel } from './BrainModel'
import styled from 'styled-components'

const CanvasContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`

export function BrainContainer() {
  return (
    <CanvasContainer>
      <Canvas
        camera={{ 
          position: [0, 0, 5],
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        style={{ background: 'transparent' }}
      >
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          minDistance={2}
          maxDistance={10}
          enableRotate={false} // Disable manual rotation since we have auto-rotation
        />
        
        {/* Adjust lighting for brain */}
        <ambientLight intensity={2} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        
        <Environment preset="city" />
        
        <Center> {/* This ensures perfect centering */}
          <BrainModel scale={0.88} />
        </Center>
      </Canvas>
    </CanvasContainer>
  )
} 