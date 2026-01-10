import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface PuzzleState {
  currentPuzzleId: number
  completedPuzzles: number[]
  setCurrentPuzzle: (puzzleId: number) => void
  completePuzzle: (puzzleId: number) => void
  isPuzzleCompleted: (puzzleId: number) => boolean
  resetProgress: () => void
}

export const usePuzzleStore = create<PuzzleState>()(
  persist(
    (set, get) => ({
      currentPuzzleId: 1,
      completedPuzzles: [],
      setCurrentPuzzle: (puzzleId: number) =>
        set({
          currentPuzzleId: puzzleId,
        }),
      completePuzzle: (puzzleId: number) =>
        set((state) => ({
          completedPuzzles: [...new Set([...state.completedPuzzles, puzzleId])],
        })),
      isPuzzleCompleted: (puzzleId: number) => {
        return get().completedPuzzles.includes(puzzleId)
      },
      resetProgress: () =>
        set({
          currentPuzzleId: 1,
          completedPuzzles: [],
        }),
    }),
    {
      name: 'puzzle-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)





