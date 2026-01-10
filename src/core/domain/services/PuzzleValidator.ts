/**
 * Puzzle Validator Service
 * Pure validation logic for puzzles
 */

import type { Puzzle } from '../entities/Puzzle'

/**
 * Validate a puzzle answer
 */
export function validateAnswer(puzzle: Puzzle, answer: number | string): boolean {
  return puzzle.correctAnswer === answer
}

/**
 * Check if answer is in valid options
 */
export function isValidOption(puzzle: Puzzle, answer: number | string): boolean {
  // Connect puzzles don't need options validation
  if (puzzle.type === 'connect') {
    return answer === 'completed'
  }
  return puzzle.options.includes(answer)
}

/**
 * Get validation result with feedback
 */
export interface ValidationResult {
  isValid: boolean
  isCorrect: boolean
  message: string
}

export function validatePuzzleAnswer(
  puzzle: Puzzle,
  answer: number | string
): ValidationResult {
  // For connect puzzles, "completed" means all paths are connected
  if (puzzle.type === 'connect') {
    const isCorrect = answer === 'completed'
    return {
      isValid: true,
      isCorrect,
      message: isCorrect ? 'Correct! All paths connected!' : 'Not quite! Try again.',
    }
  }

  if (!isValidOption(puzzle, answer)) {
    return {
      isValid: false,
      isCorrect: false,
      message: 'Invalid option selected',
    }
  }

  const isCorrect = validateAnswer(puzzle, answer)

  return {
    isValid: true,
    isCorrect,
    message: isCorrect ? 'Correct! Great job!' : 'Not quite! Try again.',
  }
}





