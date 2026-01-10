/**
 * Domain Type Definitions
 * Pure TypeScript types for the domain layer
 */

export type PuzzleType = 'pattern' | 'logic' | 'math' | 'sequence' | 'connect'
export type Difficulty = 'easy' | 'medium' | 'hard'

export interface PuzzleAnswer {
  value: number | string
}

export interface PuzzleOptions {
  options: (number | string)[]
  correctAnswer: number | string
}





