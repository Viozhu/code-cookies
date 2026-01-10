import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  life: number
  maxLife: number
}

interface Ripple {
  x: number
  y: number
  radius: number
  opacity: number
  color: string
}

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const ripplesRef = useRef<Ripple[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number | null>(null)
  const [isHovering, setIsHovering] = useState(false)

  const colors = [
    '#4B19AE', // Primary purple
    '#6B3BC7', // Primary light
    '#C4FF3E', // Secondary green
    '#D4FF6B', // Secondary light
    '#FF6B9D', // Pink
    '#FFC93C', // Yellow
    '#00D4FF', // Cyan
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Find parent section element for mouse tracking
    const parentSection = container.closest('section')
    if (!parentSection) return

    const resizeCanvas = () => {
      if (!container) return
      canvas.width = container.offsetWidth
      canvas.height = container.offsetHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create initial floating particles
    const createParticle = (x?: number, y?: number): Particle => {
      return {
        x: x ?? Math.random() * canvas.width,
        y: y ?? Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: Math.random() * 200 + 100,
      }
    }

    // Initialize particles - reduced count
    for (let i = 0; i < 15; i++) {
      particlesRef.current.push(createParticle())
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return
      const rect = container.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }

      // Create particles on mouse move - reduced frequency
      if (Math.random() > 0.5) {
        particlesRef.current.push(
          createParticle(
            mouseRef.current.x + (Math.random() - 0.5) * 20,
            mouseRef.current.y + (Math.random() - 0.5) * 20
          )
        )
      }

      // Create ripple effect occasionally - reduced frequency
      if (Math.random() > 0.9) {
        ripplesRef.current.push({
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          radius: 0,
          opacity: 0.6,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }

    const handleMouseEnter = () => {
      setIsHovering(true)
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
    }

    // Attach listeners to parent section so clicks pass through
    parentSection.addEventListener('mousemove', handleMouseMove)
    parentSection.addEventListener('mouseenter', handleMouseEnter)
    parentSection.addEventListener('mouseleave', handleMouseLeave)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        // Attract particles to mouse
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150 && isHovering) {
          const force = 0.02
          particle.vx += (dx / distance) * force
          particle.vy += (dy / distance) * force
        }

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Add some random movement
        particle.vx += (Math.random() - 0.5) * 0.02
        particle.vy += (Math.random() - 0.5) * 0.02

        // Damping
        particle.vx *= 0.98
        particle.vy *= 0.98

        // Boundary bounce
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -0.8
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -0.8

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))

        // Update life
        particle.life++

        // Draw particle
        const alpha = Math.max(0, 1 - particle.life / particle.maxLife)
        ctx.save()
        ctx.globalAlpha = alpha
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Add subtle glow effect
        ctx.shadowBlur = 5
        ctx.shadowColor = particle.color
        ctx.fill()
        ctx.restore()

        // Remove old particles
        return particle.life < particle.maxLife
      })

      // Update and draw ripples
      ripplesRef.current = ripplesRef.current.filter((ripple) => {
        ripple.radius += 3
        ripple.opacity -= 0.02

        ctx.save()
        ctx.globalAlpha = ripple.opacity
        ctx.strokeStyle = ripple.color
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()

        return ripple.opacity > 0 && ripple.radius < Math.max(canvas.width, canvas.height)
      })

      // Maintain particle count - reduced
      while (particlesRef.current.length < 15) {
        particlesRef.current.push(createParticle())
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (parentSection) {
        parentSection.removeEventListener('mousemove', handleMouseMove)
        parentSection.removeEventListener('mouseenter', handleMouseEnter)
        parentSection.removeEventListener('mouseleave', handleMouseLeave)
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isHovering])

  return (
    <div
      ref={containerRef}
      className={cn(
        'absolute inset-0 pointer-events-none',
        'opacity-60 dark:opacity-40'
      )}
      style={{ zIndex: 0 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  )
}

