/**
 * Cookie Calculator Service
 * Pure logic for cookie rewards and calculations
 */

import type { Puzzle } from '../entities/Puzzle'

/**
 * Calculate cookie reward based on puzzle difficulty
 */
export function calculateCookieReward(difficulty: Puzzle['difficulty']): number {
  const rewards: Record<Puzzle['difficulty'], number> = {
    easy: 1,
    medium: 2,
    hard: 3,
  }
  return rewards[difficulty]
}

/**
 * Get total cookies from completed puzzles
 */
export function calculateTotalCookiesFromPuzzles(
  puzzles: Puzzle[],
  completedPuzzleIds: number[]
): number {
  return puzzles
    .filter((puzzle) => completedPuzzleIds.includes(puzzle.id))
    .reduce((total, puzzle) => total + puzzle.cookiesReward, 0)
}

/**
 * Validate cookie amount (must be non-negative)
 */
export function validateCookieAmount(amount: number): boolean {
  return amount >= 0
}





