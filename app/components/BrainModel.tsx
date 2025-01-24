'use client'
import { useRef, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Html } from '@react-three/drei'
import * as THREE from 'three'

function Model() {
  const brainRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/models/brain.glb')
  
  // Add green wireframe material to all meshes
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: "#00ff00",
        wireframe: true,
        transparent: true,
        opacity: 0.8,
        metalness: 0.5,
        roughness: 0.2,
      })
    }
  })

  useFrame((state) => {
    if (brainRef.current) {
      brainRef.current.rotation.y += 0.002
      brainRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <group ref={brainRef}>
      <primitive 
        object={scene}
        scale={[5, 5, 5]}
        position={[0, 0, 0]}
      />
    </group>
  )
}

export function BrainModel() {
  return (
    <Suspense fallback={
      <Html center>
        <div style={{ color: 'green', background: 'black', padding: '10px' }}>
          Loading brain model...
        </div>
      </Html>
    }>
      <Model />
    </Suspense>
  )
} 