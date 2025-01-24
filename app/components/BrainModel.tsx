'use client'
import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

interface ModelProps {
  scale?: number
  onBrainDimensions?: (dimensions: THREE.Box3) => void
}

export function BrainModel({ scale = 1, onBrainDimensions }: ModelProps) {
  const brainRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/models/brain.glb')
  
  // Calculate and expose brain dimensions
  useEffect(() => {
    if (brainRef.current) {
      const box = new THREE.Box3().setFromObject(brainRef.current)
      onBrainDimensions?.(box)
    }
  }, [scale, onBrainDimensions])

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
      // Constant rotation on Y axis
      brainRef.current.rotation.y += 0.005 // Increased from 0.003 to 0.005 for faster rotation

      // Gentle floating motion
      brainRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 // Slower, gentler floating
    }
  })

  return (
    <group ref={brainRef} position={[0, 0, 0]}>
      <primitive 
        object={scene}
        scale={[4 * scale, 4 * scale, 4 * scale]}
        position={[0, 0, 0]}
      />
    </group>
  )
} 