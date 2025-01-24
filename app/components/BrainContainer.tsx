'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, Center } from '@react-three/drei'
import { BrainModel } from './BrainModel'
import { NeuralPathways } from './NeuralPathways'
import styled from 'styled-components'

const CanvasContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background: transparent;
`

export const BrainContainer = () => {
  return (
    <CanvasContainer>
      <NeuralPathways />
      <Canvas>
        <PerspectiveCamera 
          makeDefault 
          position={[0, -2, 10]}
          fov={60}
        />
        <OrbitControls 
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          autoRotate={true}
          autoRotateSpeed={0.5}
          rotateSpeed={0}
        />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        
        <Environment preset="city" />
        
        <group position={[0, -1, 0]}>
          <BrainModel scale={1.75} />
        </group>
      </Canvas>
    </CanvasContainer>
  )
} 