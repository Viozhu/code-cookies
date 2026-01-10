/**
 * useThreeScene Hook
 * Manages Three.js scene lifecycle
 * Extracted from complex useEffect hooks
 */

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export interface ThreeSceneConfig {
  camera?: {
    fov?: number
    near?: number
    far?: number
    position?: [number, number, number]
    lookAt?: [number, number, number]
  }
  lights?: {
    ambient?: { color?: number; intensity?: number }
    directional?: Array<{ color?: number; intensity?: number; position: [number, number, number] }>
  }
  controls?: {
    enableDamping?: boolean
    dampingFactor?: number
    enableZoom?: boolean
    enablePan?: boolean
    enableRotate?: boolean
    autoRotate?: boolean
    autoRotateSpeed?: number
  }
  renderer?: {
    antialias?: boolean
    alpha?: boolean
    shadowMap?: boolean
  }
}

export interface ThreeSceneRefs {
  container: React.RefObject<HTMLDivElement>
  scene: React.MutableRefObject<THREE.Scene | null>
  camera: React.MutableRefObject<THREE.PerspectiveCamera | null>
  renderer: React.MutableRefObject<THREE.WebGLRenderer | null>
  controls: React.MutableRefObject<OrbitControls | null>
}

export function useThreeScene(config: ThreeSceneConfig = {}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      config.camera?.fov ?? 50,
      container.clientWidth / container.clientHeight,
      config.camera?.near ?? 0.1,
      config.camera?.far ?? 1000
    )
    if (config.camera?.position) {
      camera.position.set(...config.camera.position)
    } else {
      camera.position.set(0, 1.5, 4)
    }
    if (config.camera?.lookAt) {
      camera.lookAt(...config.camera.lookAt)
    } else {
      camera.lookAt(0, 0.5, 0)
    }
    cameraRef.current = camera

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = null // Transparent background
    sceneRef.current = scene

    // Lighting
    const ambientLight = new THREE.AmbientLight(
      config.lights?.ambient?.color ?? 0xffffff,
      config.lights?.ambient?.intensity ?? 0.8
    )
    scene.add(ambientLight)

    if (config.lights?.directional) {
      config.lights.directional.forEach((lightConfig) => {
        const light = new THREE.DirectionalLight(
          lightConfig.color ?? 0xffffff,
          lightConfig.intensity ?? 0.6
        )
        light.position.set(...lightConfig.position)
        light.castShadow = true
        scene.add(light)
      })
    } else {
      // Default lighting
      const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.6)
      dirLight1.position.set(5, 8, 5)
      dirLight1.castShadow = true
      scene.add(dirLight1)

      const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.4)
      dirLight2.position.set(-5, 4, -5)
      scene.add(dirLight2)
    }

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: config.renderer?.antialias ?? true,
      alpha: config.renderer?.alpha ?? true,
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    if (config.renderer?.shadowMap) {
      renderer.shadowMap.enabled = true
    }
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0'
    renderer.domElement.style.left = '0'
    renderer.domElement.style.zIndex = '0'
    renderer.domElement.style.pointerEvents = 'none'
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = config.controls?.enableDamping ?? true
    controls.dampingFactor = config.controls?.dampingFactor ?? 0.05
    controls.enableZoom = config.controls?.enableZoom ?? false
    controls.enablePan = config.controls?.enablePan ?? false
    controls.enableRotate = config.controls?.enableRotate ?? false
    controls.autoRotate = config.controls?.autoRotate ?? true
    controls.autoRotateSpeed = config.controls?.autoRotateSpeed ?? 1
    controls.minDistance = 3
    controls.maxDistance = 10
    controlsRef.current = controls

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)

      if (controlsRef.current) {
        controlsRef.current.update()
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current)
      }
    }

    animate()

    // Handle resize
    const onWindowResize = () => {
      if (!cameraRef.current || !rendererRef.current || !containerRef.current) return

      cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener('resize', onWindowResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', onWindowResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (controlsRef.current) {
        controlsRef.current.dispose()
      }
      if (rendererRef.current) {
        rendererRef.current.dispose()
        if (containerRef.current && rendererRef.current.domElement.parentNode === containerRef.current) {
          containerRef.current.removeChild(rendererRef.current.domElement)
        }
      }
    }
  }, [config])

  return {
    containerRef,
    sceneRef,
    cameraRef,
    rendererRef,
    controlsRef,
  }
}





