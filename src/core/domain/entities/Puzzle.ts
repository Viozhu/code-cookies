/**
 * Puzzle Entity
 * Core domain entity representing a puzzle
 */

import type { PuzzleType, Difficulty } from '../types'

export interface Puzzle {
  id: number
  title: string
  description: string
  type: PuzzleType
  difficulty: Difficulty
  correctAnswer: number | string
  options: (number | string)[]
  cookiesReward: number
}

/**
 * Check if an answer is correct for a puzzle
 */
export function isCorrectAnswer(puzzle: Puzzle, answer: number | string): boolean {
  return puzzle.correctAnswer === answer
}

/**
 * Get puzzle by ID
 */
export function getPuzzleById(puzzles: Puzzle[], id: number): Puzzle | undefined {
  return puzzles.find((puzzle) => puzzle.id === id)
}

/**
 * Get total number of puzzles
 */
export function getTotalPuzzles(puzzles: Puzzle[]): number {
  return puzzles.length
}

/**
 * Get next incomplete puzzle
 */
export function getNextIncompletePuzzle(
  puzzles: Puzzle[],
  completedPuzzleIds: number[]
): number | null {
  const allPuzzleIds = puzzles.map((p) => p.id)
  const incomplete = allPuzzleIds.find((id) => !completedPuzzleIds.includes(id))
  return incomplete ?? null
}

/**
 * Get previous incomplete puzzle
 */
export function getPreviousIncompletePuzzle(
  puzzles: Puzzle[],
  currentPuzzleId: number,
  completedPuzzleIds: number[]
): number | null {
  for (let i = currentPuzzleId - 1; i >= 1; i--) {
    if (!completedPuzzleIds.includes(i)) {
      return i
    }
  }
  return null
}





