import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface CookieState {
  totalCookies: number
  addCookies: (amount: number) => void
  removeCookies: (amount: number) => void
  setCookies: (amount: number) => void
  resetCookies: () => void
}

export const useCookieStore = create<CookieState>()(
  persist(
    (set) => ({
      totalCookies: 0,
      addCookies: (amount: number) =>
        set((state) => ({
          totalCookies: Math.max(0, state.totalCookies + amount),
        })),
      removeCookies: (amount: number) =>
        set((state) => ({
          totalCookies: Math.max(0, state.totalCookies - amount),
        })),
      setCookies: (amount: number) =>
        set({
          totalCookies: Math.max(0, amount),
        }),
      resetCookies: () =>
        set({
          totalCookies: 0,
        }),
    }),
    {
      name: 'cookie-storage', // unique name for localStorage key
      storage: createJSONStorage(() => localStorage), // use localStorage
    }
  )
)

