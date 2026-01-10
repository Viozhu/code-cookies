/**
 * CookieJar3D Component
 * React Three Fiber version of the cookie jar 3D model
 */

import { useEffect, useRef } from 'react'
import { useThreeScene } from '../../hooks/useThreeScene'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { cn } from '@/lib/utils'

interface CookieJar3DProps {
  className?: string
  modelPath?: string
}

export function CookieJar3D({ className, modelPath = '/cookies_in_the_jar.glb' }: CookieJar3DProps) {
  const modelRef = useRef<THREE.Group | null>(null)
  const { containerRef, sceneRef } = useThreeScene({
    camera: {
      position: [0, 1.5, 4],
      lookAt: [0, 0.5, 0],
    },
    controls: {
      enableZoom: false,
      enablePan: false,
      enableRotate: false,
      autoRotate: true,
      autoRotateSpeed: 1,
    },
  })

  useEffect(() => {
    if (!sceneRef.current) return

    const loader = new GLTFLoader()
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene

        // Center and scale the model
        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())

        const maxDim = Math.max(size.x, size.y, size.z)
        const scale = 1.5 / maxDim
        model.scale.multiplyScalar(scale)

        model.position.x = -center.x * scale
        model.position.y = -center.y * scale
        model.position.z = -center.z * scale

        // Enable shadows
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })

        sceneRef.current?.add(model)
        modelRef.current = model
      },
      undefined,
      (error) => {
        console.error('Error loading cookie jar model:', error)
      }
    )
  }, [modelPath, sceneRef])

  return (
    <div
      ref={containerRef}
      className={cn('absolute inset-0 w-full h-full', className)}
      style={{
        opacity: 1.0,
        transform: 'scale(0.8) translateY(25%) translateX(20%)',
        transformOrigin: 'center center',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  )
}





