import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { cn } from '@/lib/utils'

/**
 * CharacterArt Component
 * 
 * Direct port of character-art.html - exact Three.js implementation.
 * Uses vanilla Three.js (not React Three Fiber) to match the original HTML example.
 * 
 * @param modelPath - Path to GLTF model file (optional, defaults to RobotExpressive model)
 * @param className - Additional CSS classes
 */
interface CharacterArtProps {
  modelPath?: string
  className?: string
}

export function CharacterArt({ 
  modelPath = 'https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb',
  className 
}: CharacterArtProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const mixerRef = useRef<THREE.AnimationMixer | null>(null)
  const actionsRef = useRef<Record<string, THREE.AnimationAction>>({})
  const activeActionRef = useRef<THREE.AnimationAction | null>(null)
  const clockRef = useRef<THREE.Clock>(new THREE.Clock())
  const animationFrameRef = useRef<number | null>(null)
  const modelRef = useRef<THREE.Group | null>(null)
  const isJumpingRef = useRef(false)
  const isEmotePlayingRef = useRef(false)
  const mouseEnterHandlerRef = useRef<(() => void) | null>(null)
  const randomEmoteIntervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Camera - adjusted to better match background perspective
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.25, 100)
    camera.position.set(-4, 2.5, 9)
    camera.lookAt(0, 1.5, 0)
    cameraRef.current = camera

    // Scene - exact match to HTML example
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const clock = new THREE.Clock()
    clockRef.current = clock

    // Sky removed - using background image instead
    // Set scene background to transparent
    scene.background = null
    
    // Fog removed for transparent background

    // Lights - adjusted to match background image lighting
    // Softer, more natural lighting to match the low-poly landscape
    const hemiLight = new THREE.HemisphereLight(0xE0F6FF, 0xA7F3D0, 2.5)
    hemiLight.position.set(0, 20, 0)
    scene.add(hemiLight)

    const dirLight = new THREE.DirectionalLight(0xFFFFFF, 2.5)
    dirLight.position.set(5, 15, 8)
    dirLight.castShadow = false
    scene.add(dirLight)
    
    // Add ambient light for softer shadows
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.8)
    scene.add(ambientLight)

    // Floor removed - transparent background

    // Renderer with transparent background
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(0x000000, 0) // Transparent background
    renderer.domElement.style.pointerEvents = 'auto' // Allow mouse interactions
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Function to fade between animations
    const fadeToAction = (name: string, duration: number = 0.3) => {
      const actions = actionsRef.current
      const previousAction = activeActionRef.current
      const newAction = actions[name]

      if (!newAction || !previousAction) return

      // Reset and play new action
      newAction.reset()
      newAction.setEffectiveTimeScale(1)
      newAction.setEffectiveWeight(1)
      newAction.fadeIn(duration)
      newAction.play()

      // Fade out previous action
      previousAction.fadeOut(duration)

      activeActionRef.current = newAction
    }

    // Function to trigger jump animation
    const triggerJump = () => {
      if (isJumpingRef.current || isEmotePlayingRef.current) return // Prevent multiple animations
      
      const actions = actionsRef.current
      if (!actions['Jump']) return

      isJumpingRef.current = true

      // Fade to Jump animation
      fadeToAction('Jump', 0.2)
    }

    // Function to trigger random emote animation
    const triggerRandomEmote = () => {
      // Don't trigger if already playing an emote or jump
      if (isEmotePlayingRef.current || isJumpingRef.current) return

      const actions = actionsRef.current
      const availableEmotes = ['Wave', 'ThumbsUp', 'Yes', 'No', 'Punch'].filter(
        (emote) => actions[emote]
      )

      if (availableEmotes.length === 0) return

      // Randomly select an emote
      const randomEmote = availableEmotes[Math.floor(Math.random() * availableEmotes.length)]
      
      isEmotePlayingRef.current = true
      fadeToAction(randomEmote, 0.2)
    }

    // Load model - exact match to HTML example
    const loader = new GLTFLoader()
    loader.load(
      modelPath,
      function (gltf) {
        const model = gltf.scene
        scene.add(model)
        modelRef.current = model

        // Create animation mixer - exact match to HTML example
        const mixer = new THREE.AnimationMixer(model)
        mixerRef.current = mixer

        const states = ['Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting', 'Standing']
        const emotes = ['Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp']

        const actions: Record<string, THREE.AnimationAction> = {}

        // Create actions for all animations - exact match to HTML example
        for (let i = 0; i < gltf.animations.length; i++) {
          const clip = gltf.animations[i]
          const action = mixer.clipAction(clip)
          actions[clip.name] = action

          if (emotes.indexOf(clip.name) >= 0 || states.indexOf(clip.name) >= 4) {
            action.clampWhenFinished = true
            action.loop = THREE.LoopOnce
          }
        }

        actionsRef.current = actions

        // Start with Walking animation - exact match to HTML example
        activeActionRef.current = actions['Walking']
        activeActionRef.current?.play()

        // Add mouse enter listener to trigger jump
        const handleMouseEnter = () => {
          triggerJump()
        }

        container.addEventListener('mouseenter', handleMouseEnter)
        mouseEnterHandlerRef.current = () => {
          container.removeEventListener('mouseenter', handleMouseEnter)
        }

        // Set up random emote interval
        // Trigger random emotes every 3-8 seconds
        const scheduleNextRandomEmote = () => {
          const delay = 3000 + Math.random() * 5000 // 3-8 seconds
          randomEmoteIntervalRef.current = window.setTimeout(() => {
            triggerRandomEmote()
            scheduleNextRandomEmote() // Schedule the next one
          }, delay)
        }

        // Start scheduling random emotes after a short delay
        scheduleNextRandomEmote()
      },
      undefined,
      function (e) {
        console.error('Error loading model:', e)
      }
    )

    // Animation loop - exact match to HTML example
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)

      const dt = clock.getDelta()

      if (mixerRef.current) {
        mixerRef.current.update(dt)
        
        // Check if jump animation finished and return to walking
        if (isJumpingRef.current && activeActionRef.current) {
          const jumpAction = actionsRef.current['Jump']
          if (jumpAction && activeActionRef.current === jumpAction && !jumpAction.isRunning()) {
            fadeToAction('Walking', 0.3)
            isJumpingRef.current = false
          }
        }

        // Check if emote animation finished and return to walking
        if (isEmotePlayingRef.current && activeActionRef.current) {
          const emoteNames = ['Wave', 'ThumbsUp', 'Yes', 'No', 'Punch']
          const currentActionName = Object.keys(actionsRef.current).find(
            (name) => actionsRef.current[name] === activeActionRef.current
          )
          
          if (currentActionName && emoteNames.includes(currentActionName)) {
            const emoteAction = actionsRef.current[currentActionName]
            if (emoteAction && !emoteAction.isRunning()) {
              fadeToAction('Walking', 0.3)
              isEmotePlayingRef.current = false
            }
          }
        }
      }

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize - exact match to HTML example
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
      if (randomEmoteIntervalRef.current) {
        clearTimeout(randomEmoteIntervalRef.current)
        randomEmoteIntervalRef.current = null
      }
      if (mouseEnterHandlerRef.current) {
        mouseEnterHandlerRef.current()
        mouseEnterHandlerRef.current = null
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (rendererRef.current) {
        rendererRef.current.dispose()
        if (containerRef.current && rendererRef.current.domElement.parentNode === containerRef.current) {
          containerRef.current.removeChild(rendererRef.current.domElement)
        }
      }
      if (mixerRef.current) {
        Object.values(actionsRef.current).forEach((action) => action.stop())
        mixerRef.current.stopAllAction()
      }
    }
  }, [modelPath])

  return (
    <div 
      ref={containerRef} 
      className={cn('absolute inset-0 w-full h-full', className)}
      style={{ 
        width: '100%', 
        height: '100vh',
        transform: 'translateY(-10%) translateX(-8%) scale(0.95)', // Better positioning to match background
        pointerEvents: 'none'
      }}
    />
  )
}
