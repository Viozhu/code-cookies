import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Particles } from '@/components/ui/particles'
import { useCookieStore } from '@/application/stores/cookieStore'
import { generateCookiePositions } from '@/core/utils/math'
import { CookieJar3D } from '@/presentation/components/canvas/CookieJar3D'

export const Route = createFileRoute('/cookies')({
  component: CookieJarPage,
})

function CookieJarPage() {
  const totalCookies = useCookieStore((state) => state.totalCookies)

  return (
    <>
      {/* Full Page Background Image - Animated */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -1,
          backgroundImage: 'url(/background_jar.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        animate={{
          scale: [1, 1.05, 1],
          backgroundPosition: ['50% 50%', '55% 45%', '50% 50%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Particles Background Animation */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <Particles
          className="absolute inset-0"
          quantity={9999}
          ease={220}
          color="#D4A574"
          staticity={50}
          size={0.4}
        />
      </div>

      {/* Content Layer */}
      <div
        className="relative z-20 flex flex-col justify-center min-h-screen container mx-auto px-4 pt-20 pb-8 md:pt-24 md:pb-12 lg:pt-28 lg:pb-16"
        style={{ isolation: 'isolate' }}
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-8 md:mb-12 relative z-50"
          style={{
            fontFamily: "'Inter', 'Montserrat', sans-serif",
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            color: '#1E293B',
            textShadow: '0 2px 4px rgba(255, 255, 255, 0.8)',
            lineHeight: 1.2,
            position: 'relative',
            zIndex: 50,
          }}
        >
          Every puzzle you solve adds a{' '}
          <span style={{ color: '#A5F344', fontWeight: 800 }}>delicious cookie</span>{' '}
          to your collection!
        </motion.h1>

        {/* Cookie Jar Container */}
        <div className="flex justify-center items-center flex-1 relative" style={{ zIndex: 50 }}>
          <CookieJar totalCookies={totalCookies} />
        </div>
        {totalCookies !== 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center mt-8 md:mt-12 relative"
            style={{ zIndex: 50 }}
          >
            <div
              className="inline-block px-8 py-4 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, #A5F344 0%, #B8FF6B 100%)',
                animation: 'pulse-glow 2s ease-in-out infinite',
              }}
            >
              <p
                className="text-3xl md:text-4xl font-bold"
                style={{
                  fontFamily: "'Inter', 'Montserrat', sans-serif",
                  color: '#1F1F1F',
                }}
              >
                {`${totalCookies} Cookie${totalCookies !== 1 ? 's' : ''}`}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </>
  )
}

interface CookieJarProps {
  totalCookies: number
}

function CookieJar({ totalCookies }: CookieJarProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cookiePositions = generateCookiePositions(totalCookies)

  return (
    <motion.div
      className="relative w-full max-w-[600px] mx-auto"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div
        className="relative w-full"
        style={{
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Cookies overlay - positioned over the jar */}
        {totalCookies > 0 ? (
          <div className="relative w-full flex items-center justify-center pointer-events-none">
            <div
              className="relative"
              style={{ width: '60%', height: '60%', maxWidth: '400px', maxHeight: '400px' }}
            >
              {cookiePositions.map((pos, index) => (
                <CookieIcon
                  key={index}
                  x={pos.x}
                  y={pos.y}
                  rotation={pos.rotation}
                  delay={pos.delay}
                  isHovered={isHovered}
                />
              ))}
            </div>
          </div>
        ) : (
          <EmptyJarState />
        )}
      </div>
    </motion.div>
  )
}

interface CookieIconProps {
  x: number
  y: number
  rotation: number
  delay: number
  isHovered: boolean
}

function CookieIcon({ x, y, rotation, delay, isHovered }: CookieIconProps) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: rotation,
        y: isHovered ? [0, -2, 2, -2, 0] : 0,
        x: isHovered ? [0, 1, -1, 1, 0] : 0,
      }}
      transition={{
        opacity: { delay, duration: 0.3 },
        scale: {
          delay,
          type: 'spring',
          stiffness: 200,
          damping: 15,
        },
        rotate: { delay },
        y: {
          duration: 0.3,
          repeat: isHovered ? Infinity : 0,
          repeatType: 'reverse',
        },
        x: {
          duration: 0.3,
          repeat: isHovered ? Infinity : 0,
          repeatType: 'reverse',
        },
      }}
    >
      <svg width="40" height="40" viewBox="0 0 40 40" className="drop-shadow-md">
        {/* Cookie base */}
        <circle cx="20" cy="20" r="18" fill="#D4A574" stroke="#C19A6B" strokeWidth="1" />
        {/* Chocolate chips */}
        <circle cx="15" cy="15" r="2.5" fill="#5D4037" />
        <circle cx="25" cy="15" r="2.5" fill="#5D4037" />
        <circle cx="20" cy="20" r="2.5" fill="#5D4037" />
        <circle cx="12" cy="22" r="2" fill="#5D4037" />
        <circle cx="28" cy="22" r="2" fill="#5D4037" />
        <circle cx="18" cy="26" r="2" fill="#5D4037" />
        <circle cx="25" cy="26" r="2" fill="#5D4037" />
      </svg>
    </motion.div>
  )
}

function EmptyJarState() {
  return (
    <motion.div
      className="flex items-center justify-center pointer-events-none w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center px-6 py-8 mx-4">
        {/* Sad Cookie or Ghost */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, -5, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 64 64"
            className="mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M36.9 22.7l2.5-18.6C37 3.5 34.6 2 32 2c-2.6 0-5 1.5-7.5 2.2c-2.5.6-5.3.5-7.5 1.8s-3.6 3.8-5.4 5.6C9.8 13.4 7.3 14.8 6 17c-1.3 2.2-1.2 5-1.9 7.5C3.5 27 2 29.4 2 32c0 2.6 1.5 5 2.2 7.5c.6 2.5.5 5.3 1.8 7.5s3.8 3.6 5.6 5.4c1.8 1.8 3.1 4.3 5.4 5.6c2.2 1.3 5 1.2 7.5 1.9c2.5.6 4.9 2.1 7.5 2.1c2.6 0 5-1.5 7.5-2.2c2.5-.7 5.3-.6 7.5-1.9c2.2-1.3 3.6-3.8 5.4-5.6c1.8-1.8 4.3-3.1 5.6-5.4c1.3-2.2 1.2-5 1.9-7.5c.6-2.4 2.1-4.8 2.1-7.4c0-2.6-2.1-8.1-2.1-8.1l-23-1.2"
              fill="#dda85f"
            />
            <path
              d="M59.4 22.4c-1 .3-2.4.2-3.9-.4c-2.1-.8-3.4-2.5-3.8-4.5c-1 .3-3.4 0-5-1c-2.4-1.5-2.9-5.7-2.9-5.7c-2.7-.8-4.7-4-4.4-6.7c-2.2-.6-5-.5-7.4-.5c-2.4 0-4.6 1.4-6.8 2c-2.3.6-4.9.5-6.9 1.7s-3.3 3.5-4.9 5.1c-1.7 1.7-4 2.9-5.1 4.9c-1.2 2-1.1 4.6-1.7 6.9c-.6 2.2-2 4.4-2 6.8c0 2.4 1.4 4.6 2 6.8c.6 2.3.5 4.9 1.7 6.9s3.5 3.3 5.1 4.9c1.7 1.7 2.9 4 4.9 5.1c2 1.2 4.6 1.1 6.9 1.7c2.2.6 4.4 2 6.8 2c2.4 0 4.6-1.4 6.8-2c2.3-.6 4.9-.5 6.9-1.7s3.3-3.5 4.9-5.1c1.7-1.7 4-2.9 5.1-4.9c1.2-2 1.1-4.6 1.7-6.9c.6-2.2 3-4 3.3-6.4c.8-3.9-1.2-8.3-1.3-9"
              fill="#f2cb7d"
            />
            <g fill="#dda85f">
              <path d="M50.1 10.8l-1.4 1.4l-1.3-1.4l1.3-1.3z" />
              <path d="M55.8 17.8l-.6.7l-.7-.7l.7-.7z" />
              <path d="M50.8 13.2l-.7.7l-.7-.7l.7-.7z" />
              <path d="M44.6 7.1l-.7.7l-.7-.7l.7-.7z" />
              <path d="M57.2 20.3l-.7.7l-.7-.7l.7-.7z" />
              <path d="M57.8 17.8l-.7.7l-.7-.7l.7-.7z" />
            </g>
            <path
              d="M11.8 20.6c-1 1.7.5 4.8 2.5 5.7c2.9 1.2 4.6 1.4 6.4-1.7c.6-1.1 1.4-4 1.1-4.7c-.4-1-2.1-3-3.2-3c-3.1.1-6.1 2.5-6.8 3.7"
              fill="#6d4934"
            />
            <path
              d="M12.3 20.6c-.7 1.2 1.1 4.8 3.5 4.5c3.3-.4 3-7.2 1.6-7.2c-2.4 0-4.6 1.8-5.1 2.7"
              fill="#a37f6a"
            />
            <path
              d="M45.2 39.1c1.4-.4 2.4-2.9 1.8-4.4c-.9-2.3-1.8-3.3-4.4-2.6c-.9.3-3 1.4-3.2 1.9c-.3.8-.5 2.8.1 3.4c1.7 1.7 4.7 2 5.7 1.7"
              fill="#6d4934"
            />
            <path
              d="M43.8 36.7c1.1-.3 2.8-3.7 1-3.9c-3.1-.5-5.5 1-5.2 2.7c.3 1.7 3.4 1.4 4.2 1.2"
              fill="#a37f6a"
            />
            <path
              d="M24.9 44.5c-.3-1.2-2.5-2.1-3.9-1.5c-2 .8-2.9 1.5-2.2 3.8c.2.8 1.2 2.6 1.7 2.7c.7.3 2.4.4 2.9-.1c1.5-1.4 1.7-4 1.5-4.9"
              fill="#6d4934"
            />
            <path
              d="M23.2 43.6c-.2-.9-4.4.4-4 2c.8 2.7.8 3.1 1.6 3c1.5-.4 2.5-4.3 2.4-5"
              fill="#a37f6a"
            />
            <path
              d="M51.1 25.5c-1.2.3-2.1 2.5-1.5 3.9c.8 2 2.7 2.3 4.8 1.2c1.8-.9 1.9-4.1 1.4-4.7c-1.5-1.5-3.8-.6-4.7-.4"
              fill="#6d4934"
            />
            <path
              d="M50.6 26.6c-.6.7-1.1 3.5.4 3.1c2.7-.8 4.6-3.5 3.4-3.9c-1.5-.5-3.1 0-3.8.8"
              fill="#a37f6a"
            />
            <path fill="#6d4934" d="M22.74 16.112l1.98-1.98l1.98 1.98l-1.98 1.98z" />
            <g fill="#dda85f">
              <path d="M14.706 33.483l1.979-1.98l1.98 1.979l-1.979 1.98z" />
              <path d="M34.698 44.811l1.98-1.98l1.98 1.98l-1.98 1.98z" />
              <path d="M32.038 39.289l2.687-2.687l2.687 2.687l-2.687 2.687z" />
              <path d="M24.696 9.827l2.687-2.687l2.687 2.687l-2.687 2.687z" />
            </g>
            <g fill="#6d4934">
              <path d="M41.122 46.347l1.98-1.98l1.98 1.98l-1.98 1.98z" />
              <path d="M49.076 35.215l1.98-1.98l1.98 1.98l-1.98 1.98z" />
              <path d="M41.812 24.637l.99-.99l.99.99l-.99.99z" />
              <path d="M13.726 38.266l.99-.99l.99.99l-.99.99z" />
            </g>
          </svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-xl md:text-2xl font-semibold"
          style={{
            fontFamily: "'Inter', 'Montserrat', sans-serif",
            color: '#1E293B',
            textShadow: '0 2px 8px rgba(255, 255, 255, 0.9), 0 4px 12px rgba(0, 0, 0, 0.3)',
            fontWeight: 700,
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
            padding: '0.75rem 1.5rem',
            borderRadius: '1rem',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
          }}
        >
          Your jar is empty!
        </motion.p>
      </div>
    </motion.div>
  )
}
