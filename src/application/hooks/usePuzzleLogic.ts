/**
 * usePuzzleLogic Hook
 * Extracted puzzle logic from progress.tsx
 * Manages puzzle state and answer handling
 */

import { useState, useEffect } from 'react'
import type { Puzzle } from '@/core/domain/entities/Puzzle'
import { validatePuzzleAnswer } from '@/core/domain/services/PuzzleValidator'
import { useCookieStore } from '../stores/cookieStore'
import { usePuzzleStore } from '../stores/puzzleStore'

export interface UsePuzzleLogicResult {
  selectedAnswer: number | string | null
  isSolved: boolean
  showSuccess: boolean
  handleAnswer: (answer: number | string) => void
  resetPuzzle: () => void
}

export function usePuzzleLogic(
  puzzle: Puzzle | undefined,
  isCompleted: boolean
): UsePuzzleLogicResult {
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null)
  const [isSolved, setIsSolved] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const addCookies = useCookieStore((state) => state.addCookies)
  const completePuzzle = usePuzzleStore((state) => state.completePuzzle)

  // Reset puzzle state when puzzle changes
  useEffect(() => {
    setSelectedAnswer(null)
    setIsSolved(false)
    setShowSuccess(false)
  }, [puzzle?.id])

  const handleAnswer = (answer: number | string) => {
    if (!puzzle || isCompleted) return

    setSelectedAnswer(answer)

    const validation = validatePuzzleAnswer(puzzle, answer)

    if (validation.isCorrect) {
      setIsSolved(true)
      setTimeout(() => {
        setShowSuccess(true)
        addCookies(puzzle.cookiesReward)
        completePuzzle(puzzle.id)
      }, 500)
    }
  }

  const resetPuzzle = () => {
    setSelectedAnswer(null)
    setIsSolved(false)
    setShowSuccess(false)
  }

  return {
    selectedAnswer,
    isSolved,
    showSuccess,
    handleAnswer,
    resetPuzzle,
  }
}





