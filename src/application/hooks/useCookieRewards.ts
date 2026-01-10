/**
 * useCookieRewards Hook
 * Manages cookie reward logic
 */

import { useCookieStore } from '../stores/cookieStore'
import type { Puzzle } from '@/core/domain/entities/Puzzle'
import { calculateTotalCookiesFromPuzzles } from '@/core/domain/services/CookieCalculator'

export function useCookieRewards() {
  const { addCookies, totalCookies, setCookies } = useCookieStore()

  const awardCookiesForPuzzle = (puzzle: Puzzle) => {
    addCookies(puzzle.cookiesReward)
  }

  const syncCookiesFromPuzzles = (puzzles: Puzzle[], completedPuzzleIds: number[]) => {
    const calculatedTotal = calculateTotalCookiesFromPuzzles(puzzles, completedPuzzleIds)
    setCookies(calculatedTotal)
  }

  return {
    totalCookies,
    awardCookiesForPuzzle,
    syncCookiesFromPuzzles,
    addCookies,
  }
}





