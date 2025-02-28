'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import {
  useGLTF,
  Float,
  Lightformer,
  ContactShadows,
  Environment,
  MeshTransmissionMaterial,
  Preload,
} from '@react-three/drei'
import {
  Bloom,
  EffectComposer,
  N8AO,
  TiltShift2,
} from '@react-three/postprocessing'
import { easing } from 'maath'
import { useState } from 'react'

// Preloading the model using drei's GLTF loader
useGLTF.preload('/bomb-gp.glb')

export const Three = () => (
  <div className="w-full h-full absolute bottom-0">
    <Canvas
      eventPrefix="client"
      shadows
      camera={{ position: [0, 0, 20], fov: 50 }}
    >
      <color attach="background" args={['#000']} />
      <spotLight position={[20, 20, 10]} penumbra={1} castShadow angle={0.2} />
      <Float floatIntensity={2} position={[0, -12, 0]}>
        <Knot />
      </Float>
      <ContactShadows
        scale={100}
        position={[0, -7.5, 0]}
        blur={1}
        far={100}
        opacity={0.85}
      />
      <Environment preset="city">
        <Lightformer
          intensity={8}
          position={[10, 5, 0]}
          scale={[10, 50, 1]}
          onUpdate={(self) => self.lookAt(0, 0, 0)}
        />
      </Environment>
      <EffectComposer enableNormalPass={false}>
        <N8AO aoRadius={1} intensity={2} />
        <Bloom mipmapBlur luminanceThreshold={0.8} intensity={2} levels={8} />
        <TiltShift2 blur={0.2} />
      </EffectComposer>
      <Rig />
      <Preload all />
    </Canvas>
  </div>
)

function Rig() {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [
        Math.sin(-state.pointer.x) * 5,
        state.pointer.y * 3.5,
        15 + Math.cos(state.pointer.x) * 10,
      ],
      0.2,
      delta
    )
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

const Knot = (props: JSX.IntrinsicElements['mesh']) => {
  const [rotation, setRotation] = useState(0)
  const { scene } = useGLTF('/bomb-gp.glb') //  drei optimized loader

  useFrame(() => {
    setRotation((prev) => prev + 0.01)
  })

  return (
    <mesh
      rotation={[0, rotation, 0]}
      scale={[0.5, 0.5, 0.5]}
      receiveShadow
      castShadow
      {...props}
    >
      <primitive object={scene} />
      <MeshTransmissionMaterial backside backsideThickness={5} thickness={2} />
    </mesh>
  )
}
