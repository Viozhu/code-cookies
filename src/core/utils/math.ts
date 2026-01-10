/**
 * Pure Math Utilities
 * No React dependencies - can be used in domain layer
 */

/**
 * Generate cookie positions in a staggered, natural pile layout
 */
export interface CookiePosition {
  x: number
  y: number
  rotation: number
  delay: number
}

export function generateCookiePositions(count: number, maxVisible: number = 30): CookiePosition[] {
  const positions: CookiePosition[] = []
  const maxCookies = Math.min(count, maxVisible)

  for (let i = 0; i < maxCookies; i++) {
    // Create a natural pile effect
    const layer = Math.floor(i / 6) // 6 cookies per layer
    const positionInLayer = i % 6
    const angle = (positionInLayer / 6) * Math.PI * 2
    const radius = 20 + layer * 15

    positions.push({
      x: Math.cos(angle) * radius + (Math.random() - 0.5) * 10,
      y: Math.sin(angle) * radius + layer * 25 + (Math.random() - 0.5) * 10,
      rotation: Math.random() * 360,
      delay: i * 0.05,
    })
  }

  return positions
}





