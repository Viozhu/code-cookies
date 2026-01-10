/**
 * useGameEngine Hook
 * Orchestrates game flow and puzzle navigation
 */

import type { Puzzle } from '@/core/domain/entities/Puzzle'
import {
  getNextIncompletePuzzle,
  getPreviousIncompletePuzzle,
} from '@/core/domain/entities/Puzzle'
import { usePuzzleStore } from '../stores/puzzleStore'

export interface UseGameEngineResult {
  handleNext: () => number | null
  handlePrevious: () => number | null
  handlePuzzleSelect: (puzzleId: number) => void
  autoNavigateToNext: (puzzles: Puzzle[]) => void
}

export function useGameEngine(
  puzzles: Puzzle[],
  currentPuzzleId: number
): UseGameEngineResult {
  const { setCurrentPuzzle, isPuzzleCompleted, completedPuzzles } = usePuzzleStore()

  // Auto-navigate to next incomplete puzzle if current is completed
  const autoNavigateToNext = (puzzles: Puzzle[]) => {
    const currentPuzzle = puzzles.find((p) => p.id === currentPuzzleId)
    if (currentPuzzle && isPuzzleCompleted(currentPuzzle.id)) {
      const nextPuzzle = getNextIncompletePuzzle(puzzles, completedPuzzles)
      if (nextPuzzle && nextPuzzle !== currentPuzzleId) {
        setCurrentPuzzle(nextPuzzle)
      }
    }
  }

  const handleNext = (): number | null => {
    const nextPuzzle = getNextIncompletePuzzle(puzzles, completedPuzzles)
    if (nextPuzzle) {
      setCurrentPuzzle(nextPuzzle)
      return nextPuzzle
    }
    return null
  }

  const handlePrevious = (): number | null => {
    const previousPuzzle = getPreviousIncompletePuzzle(
      puzzles,
      currentPuzzleId,
      completedPuzzles
    )
    if (previousPuzzle) {
      setCurrentPuzzle(previousPuzzle)
      return previousPuzzle
    }
    // If no incomplete puzzle found before, go to first incomplete
    const firstIncomplete = getNextIncompletePuzzle(puzzles, completedPuzzles)
    if (firstIncomplete) {
      setCurrentPuzzle(firstIncomplete)
      return firstIncomplete
    }
    return null
  }

  const handlePuzzleSelect = (puzzleId: number) => {
    // Only allow selecting incomplete puzzles
    if (!isPuzzleCompleted(puzzleId)) {
      setCurrentPuzzle(puzzleId)
    }
  }

  return {
    handleNext,
    handlePrevious,
    handlePuzzleSelect,
    autoNavigateToNext,
  }
}





