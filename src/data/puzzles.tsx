import React from 'react'
import type { Puzzle } from '@/core/domain/entities/Puzzle'
import type { FlowPuzzleConfig } from '@/components/shared/FlowPuzzle'

/**
 * Extended Puzzle with presentation logic
 * This extends the domain Puzzle entity with UI rendering
 */
export interface PuzzleWithUI extends Puzzle {
  renderContent: () => React.ReactNode
  connectConfig?: FlowPuzzleConfig // For connect puzzles
}

export const puzzles: PuzzleWithUI[] = [
  {
    id: 1,
    title: 'Complete the Pattern! 🧩',
    description: 'Each number increases by 2. What comes next?',
    type: 'pattern',
    difficulty: 'easy',
    correctAnswer: 8,
    options: [6, 7, 8, 9],
    cookiesReward: 1,
    renderContent: () => {
      return (
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
            {[2, 4, 6].map((num, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #5D5FEF 0%, #7C7EF5 100%)',
                    color: 'white',
                  }}
                >
                  {num}
                </div>
                {index < 2 && (
                  <span className="text-2xl md:text-3xl font-bold text-gray-400 mt-2">→</span>
                )}
              </div>
            ))}
            <div className="flex flex-col items-center">
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold shadow-lg border-4 border-dashed"
                style={{
                  borderColor: '#A5F344',
                  color: '#A5F344',
                }}
              >
                ?
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 italic">Hint: 2 + 2 = 4, 4 + 2 = 6, so 6 + 2 = ?</p>
        </div>
      )
    },
  },
  {
    id: 2,
    title: 'Shape Sequence! 🔺',
    description: 'The shapes repeat in the same order: Circle, Square, Triangle, then repeat!',
    type: 'sequence',
    difficulty: 'easy',
    correctAnswer: 'square',
    options: ['triangle', 'square', 'circle', 'star'],
    cookiesReward: 1,
    renderContent: () => {
      const shapes = [
        { type: 'circle', emoji: '⭕' },
        { type: 'square', emoji: '⬜' },
        { type: 'triangle', emoji: '🔺' },
        { type: 'circle', emoji: '⭕' },
      ]
      
      return (
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
            {shapes.map((shape, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-20 h-20 md:w-24 md:h-24 rounded-xl flex items-center justify-center text-4xl md:text-5xl shadow-lg bg-gradient-to-br from-primary-subtle to-secondary-subtle"
                >
                  {shape.emoji}
                </div>
                {index < shapes.length - 1 && (
                  <span className="text-2xl md:text-3xl font-bold text-gray-400 mt-2">→</span>
                )}
              </div>
            ))}
            <div className="flex flex-col items-center">
              <div
                className="w-20 h-20 md:w-24 md:h-24 rounded-xl flex items-center justify-center text-4xl md:text-5xl font-bold shadow-lg border-4 border-dashed bg-gradient-to-br from-primary-subtle to-secondary-subtle"
                style={{
                  borderColor: '#A5F344',
                }}
              >
                ?
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 italic">Hint: After Triangle, the pattern starts over with Circle!</p>
        </div>
      )
    },
  },
  {
    id: 3,
    title: 'Number Addition! ➕',
    description: 'What number completes this equation?',
    type: 'math',
    difficulty: 'easy',
    correctAnswer: 15,
    options: [12, 13, 15, 17],
    cookiesReward: 1,
    renderContent: () => {
      return (
        <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
          <div className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-bold text-gray-800">7</div>
          </div>
          <div className="text-4xl md:text-5xl font-bold text-gray-800">+</div>
          <div className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-bold text-gray-800">8</div>
          </div>
          <div className="text-4xl md:text-5xl font-bold text-gray-800">=</div>
          <div className="flex flex-col items-center">
            <div
              className="w-20 h-20 md:w-24 md:h-24 rounded-xl flex items-center justify-center text-4xl md:text-5xl font-bold shadow-lg border-4 border-dashed bg-gradient-to-br from-primary-subtle to-secondary-subtle"
              style={{
                borderColor: '#A5F344',
                color: '#A5F344',
              }}
            >
              ?
            </div>
          </div>
        </div>
      )
    },
  },
  {
    id: 4,
    title: 'Color Pattern! 🎨',
    description: 'The colors repeat in the same order: Red, Blue, Green, then repeat!',
    type: 'pattern',
    difficulty: 'easy',
    correctAnswer: 'red',
    options: ['red', 'green', 'blue', 'yellow'],
    cookiesReward: 1,
    renderContent: () => {
      const colors = [
        { name: 'red', color: '#EF4444' },
        { name: 'blue', color: '#3B82F6' },
        { name: 'green', color: '#10B981' },
      ]
      
      return (
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
            {colors.map((color, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-lg border-2 border-gray-300"
                  style={{ backgroundColor: color.color }}
                />
                {index < colors.length - 1 && (
                  <span className="text-2xl md:text-3xl font-bold text-gray-400 mt-2">→</span>
                )}
              </div>
            ))}
            <div className="flex flex-col items-center">
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-lg border-4 border-dashed"
                style={{
                  borderColor: '#A5F344',
                  backgroundColor: 'transparent',
                }}
              >
                <span className="text-2xl">?</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 italic">Hint: After Green, the pattern starts over with Red!</p>
        </div>
      )
    },
  },
  {
    id: 5,
    title: 'Skip Counting! 🔢',
    description: 'Count by 5s! Each number increases by 5.',
    type: 'pattern',
    difficulty: 'medium',
    correctAnswer: 20,
    options: [18, 19, 20, 21],
    cookiesReward: 2,
    renderContent: () => {
      return (
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
            {[5, 10, 15].map((num, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #5D5FEF 0%, #7C7EF5 100%)',
                    color: 'white',
                  }}
                >
                  {num}
                </div>
                {index < 2 && (
                  <span className="text-2xl md:text-3xl font-bold text-gray-400 mt-2">→</span>
                )}
              </div>
            ))}
            <div className="flex flex-col items-center">
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold shadow-lg border-4 border-dashed"
                style={{
                  borderColor: '#A5F344',
                  color: '#A5F344',
                }}
              >
                ?
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 italic">Hint: 5 + 5 = 10, 10 + 5 = 15, so 15 + 5 = ?</p>
        </div>
      )
    },
  },
  {
    id: 6,
    title: 'Direction Logic! 🧭',
    description: 'If you go North, then East, then South, which direction are you facing?',
    type: 'logic',
    difficulty: 'medium',
    correctAnswer: 'west',
    options: ['north', 'south', 'east', 'west'],
    cookiesReward: 2,
    renderContent: () => {
      return (
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center p-4 bg-blue-100 rounded-lg">
              <span className="text-3xl mb-2">⬆️</span>
              <span className="text-sm font-semibold">North</span>
            </div>
            <span className="text-2xl">→</span>
            <div className="flex flex-col items-center p-4 bg-green-100 rounded-lg">
              <span className="text-3xl mb-2">➡️</span>
              <span className="text-sm font-semibold">East</span>
            </div>
            <span className="text-2xl">→</span>
            <div className="flex flex-col items-center p-4 bg-yellow-100 rounded-lg">
              <span className="text-3xl mb-2">⬇️</span>
              <span className="text-sm font-semibold">South</span>
            </div>
            <span className="text-2xl">→</span>
            <div className="flex flex-col items-center p-4 bg-purple-100 rounded-lg border-4 border-dashed" style={{ borderColor: '#A5F344' }}>
              <span className="text-3xl mb-2">?</span>
              <span className="text-sm font-semibold">?</span>
            </div>
          </div>
        </div>
      )
    },
  },
  {
    id: 7,
    title: 'Multiplication Magic! ✨',
    description: 'What is 3 × 4?',
    type: 'math',
    difficulty: 'medium',
    correctAnswer: 12,
    options: [10, 11, 12, 14],
    cookiesReward: 2,
    renderContent: () => {
      return (
        <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
          <div className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-bold text-gray-800">3</div>
          </div>
          <div className="text-4xl md:text-5xl font-bold text-gray-800">×</div>
          <div className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-bold text-gray-800">4</div>
          </div>
          <div className="text-4xl md:text-5xl font-bold text-gray-800">=</div>
          <div className="flex flex-col items-center">
            <div
              className="w-20 h-20 md:w-24 md:h-24 rounded-xl flex items-center justify-center text-4xl md:text-5xl font-bold shadow-lg border-4 border-dashed bg-gradient-to-br from-primary-subtle to-secondary-subtle"
              style={{
                borderColor: '#A5F344',
                color: '#A5F344',
              }}
            >
              ?
            </div>
          </div>
        </div>
      )
    },
  },
  {
    id: 8,
    title: 'Size Sequence! 📏',
    description: 'What size comes next?',
    type: 'sequence',
    difficulty: 'medium',
    correctAnswer: 'small',
    options: ['small', 'medium', 'large', 'extra-large'],
    cookiesReward: 2,
    renderContent: () => {
      const sizes = [
        { name: 'large', size: 'w-24 h-24 md:w-28 md:h-28' },
        { name: 'medium', size: 'w-16 h-16 md:w-20 md:h-20' },
        { name: 'small', size: 'w-12 h-12 md:w-14 md:h-14' },
      ]
      
      return (
        <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
          {sizes.map((size, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`${size.size} rounded-full flex items-center justify-center text-2xl md:text-3xl shadow-lg bg-gradient-to-br from-primary to-primary-light text-white`}
              >
                ⭕
              </div>
              {index < sizes.length - 1 && (
                <span className="text-2xl md:text-3xl font-bold text-gray-400 mt-2">→</span>
              )}
            </div>
          ))}
          <div className="flex flex-col items-center">
            <div
              className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xl md:text-2xl font-bold shadow-lg border-4 border-dashed bg-gradient-to-br from-primary-subtle to-secondary-subtle"
              style={{
                borderColor: '#A5F344',
              }}
            >
              ?
            </div>
          </div>
        </div>
      )
    },
  },
  {
    id: 9,
    title: 'Odd Numbers! 🔢',
    description: 'These are odd numbers (1, 3, 5, 7, 9...). What comes next?',
    type: 'pattern',
    difficulty: 'medium',
    correctAnswer: 9,
    options: [7, 8, 9, 10],
    cookiesReward: 2,
    renderContent: () => {
      return (
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
            {[3, 5, 7].map((num, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #5D5FEF 0%, #7C7EF5 100%)',
                    color: 'white',
                  }}
                >
                  {num}
                </div>
                {index < 2 && (
                  <span className="text-2xl md:text-3xl font-bold text-gray-400 mt-2">→</span>
                )}
              </div>
            ))}
            <div className="flex flex-col items-center">
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold shadow-lg border-4 border-dashed"
                style={{
                  borderColor: '#A5F344',
                  color: '#A5F344',
                }}
              >
                ?
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 italic">Hint: Odd numbers go 1, 3, 5, 7, 9, 11...</p>
        </div>
      )
    },
  },
  {
    id: 10,
    title: 'Final Challenge! 🏆',
    description: 'What is 2 + 3 × 2? (Remember: multiplication first!)',
    type: 'math',
    difficulty: 'hard',
    correctAnswer: 8,
    options: [10, 8, 12, 7],
    cookiesReward: 3,
    renderContent: () => {
      return (
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
            <div className="flex flex-col items-center">
              <div className="text-4xl md:text-5xl font-bold text-gray-800">2</div>
            </div>
            <div className="text-4xl md:text-5xl font-bold text-gray-800">+</div>
            <div className="flex flex-col items-center">
              <div className="text-4xl md:text-5xl font-bold text-gray-800">3</div>
            </div>
            <div className="text-4xl md:text-5xl font-bold text-gray-800">×</div>
            <div className="flex flex-col items-center">
              <div className="text-4xl md:text-5xl font-bold text-gray-800">2</div>
            </div>
            <div className="text-4xl md:text-5xl font-bold text-gray-800">=</div>
            <div className="flex flex-col items-center">
              <div
                className="w-20 h-20 md:w-24 md:h-24 rounded-xl flex items-center justify-center text-4xl md:text-5xl font-bold shadow-lg border-4 border-dashed bg-gradient-to-br from-primary-subtle to-secondary-subtle"
                style={{
                  borderColor: '#A5F344',
                  color: '#A5F344',
                }}
              >
                ?
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 italic">Hint: Do multiplication before addition!</p>
        </div>
      )
    },
  },
  {
    id: 11,
    title: 'Even Numbers Pattern! 🔢',
    description: 'These are even numbers (2, 4, 6, 8, 10...). What comes next?',
    type: 'pattern',
    difficulty: 'easy',
    correctAnswer: 12,
    options: [10, 11, 12, 13],
    cookiesReward: 1,
    renderContent: () => {
      return (
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
            {[6, 8, 10].map((num, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                    color: 'white',
                  }}
                >
                  {num}
                </div>
                {index < 2 && (
                  <span className="text-2xl md:text-3xl font-bold text-gray-400 mt-2">→</span>
                )}
              </div>
            ))}
            <div className="flex flex-col items-center">
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold shadow-lg border-4 border-dashed"
                style={{
                  borderColor: '#A5F344',
                  color: '#A5F344',
                }}
              >
                ?
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 italic">Hint: Even numbers go 2, 4, 6, 8, 10, 12, 14...</p>
        </div>
      )
    },
  },
  {
    id: 12,
    title: 'Subtraction Fun! ➖',
    description: 'What is 15 - 7?',
    type: 'math',
    difficulty: 'easy',
    correctAnswer: 8,
    options: [6, 7, 8, 9],
    cookiesReward: 1,
    renderContent: () => {
      return (
        <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
          <div className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-bold text-gray-800">15</div>
          </div>
          <div className="text-4xl md:text-5xl font-bold text-gray-800">−</div>
          <div className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-bold text-gray-800">7</div>
          </div>
          <div className="text-4xl md:text-5xl font-bold text-gray-800">=</div>
          <div className="flex flex-col items-center">
            <div
              className="w-20 h-20 md:w-24 md:h-24 rounded-xl flex items-center justify-center text-4xl md:text-5xl font-bold shadow-lg border-4 border-dashed bg-gradient-to-br from-primary-subtle to-secondary-subtle"
              style={{
                borderColor: '#A5F344',
                color: '#A5F344',
              }}
            >
              ?
            </div>
          </div>
        </div>
      )
    },
  },
  {
    id: 13,
    title: 'Double Pattern! 🔄',
    description: 'Each number doubles the previous one. What comes next?',
    type: 'pattern',
    difficulty: 'medium',
    correctAnswer: 16,
    options: [14, 15, 16, 18],
    cookiesReward: 2,
    renderContent: () => {
      return (
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
            {[2, 4, 8].map((num, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
                    color: 'white',
                  }}
                >
                  {num}
                </div>
                {index < 2 && (
                  <span className="text-2xl md:text-3xl font-bold text-gray-400 mt-2">→</span>
                )}
              </div>
            ))}
            <div className="flex flex-col items-center">
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold shadow-lg border-4 border-dashed"
                style={{
                  borderColor: '#A5F344',
                  color: '#A5F344',
                }}
              >
                ?
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 italic">Hint: 2 × 2 = 4, 4 × 2 = 8, so 8 × 2 = ?</p>
        </div>
      )
    },
  },
  {
    id: 14,
    title: 'Animal Sequence! 🐾',
    description: 'What animal comes next in the pattern?',
    type: 'sequence',
    difficulty: 'easy',
    correctAnswer: 'dog',
    options: ['cat', 'dog', 'bird', 'fish'],
    cookiesReward: 1,
    renderContent: () => {
      const animals = [
        { name: 'cat', emoji: '🐱' },
        { name: 'dog', emoji: '🐶' },
        { name: 'cat', emoji: '🐱' },
      ]
      
      return (
        <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
          {animals.map((animal, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="w-20 h-20 md:w-24 md:h-24 rounded-xl flex items-center justify-center text-4xl md:text-5xl shadow-lg bg-gradient-to-br from-primary-subtle to-secondary-subtle"
              >
                {animal.emoji}
              </div>
              {index < animals.length - 1 && (
                <span className="text-2xl md:text-3xl font-bold text-gray-400 mt-2">→</span>
              )}
            </div>
          ))}
          <div className="flex flex-col items-center">
            <div
              className="w-20 h-20 md:w-24 md:h-24 rounded-xl flex items-center justify-center text-4xl md:text-5xl font-bold shadow-lg border-4 border-dashed bg-gradient-to-br from-primary-subtle to-secondary-subtle"
              style={{
                borderColor: '#A5F344',
              }}
            >
              ?
            </div>
          </div>
        </div>
      )
    },
  },
  {
    id: 15,
    title: 'Division Challenge! ➗',
    description: 'What is 18 ÷ 3?',
    type: 'math',
    difficulty: 'medium',
    correctAnswer: 6,
    options: [5, 6, 7, 9],
    cookiesReward: 2,
    renderContent: () => {
      return (
        <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
          <div className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-bold text-gray-800">18</div>
          </div>
          <div className="text-4xl md:text-5xl font-bold text-gray-800">÷</div>
          <div className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-bold text-gray-800">3</div>
          </div>
          <div className="text-4xl md:text-5xl font-bold text-gray-800">=</div>
          <div className="flex flex-col items-center">
            <div
              className="w-20 h-20 md:w-24 md:h-24 rounded-xl flex items-center justify-center text-4xl md:text-5xl font-bold shadow-lg border-4 border-dashed bg-gradient-to-br from-primary-subtle to-secondary-subtle"
              style={{
                borderColor: '#A5F344',
                color: '#A5F344',
              }}
            >
              ?
            </div>
          </div>
        </div>
      )
    },
  },
  {
    id: 16,
    title: 'Count by Threes! 📊',
    description: 'Each number increases by 3. What comes next?',
    type: 'pattern',
    difficulty: 'medium',
    correctAnswer: 15,
    options: [13, 14, 15, 16],
    cookiesReward: 2,
    renderContent: () => {
      return (
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
            {[6, 9, 12].map((num, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                    color: 'white',
                  }}
                >
                  {num}
                </div>
                {index < 2 && (
                  <span className="text-2xl md:text-3xl font-bold text-gray-400 mt-2">→</span>
                )}
              </div>
            ))}
            <div className="flex flex-col items-center">
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold shadow-lg border-4 border-dashed"
                style={{
                  borderColor: '#A5F344',
                  color: '#A5F344',
                }}
              >
                ?
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 italic">Hint: 6 + 3 = 9, 9 + 3 = 12, so 12 + 3 = ?</p>
        </div>
      )
    },
  },
  {
    id: 17,
    title: 'Opposite Colors! 🎨',
    description: 'Each color alternates with its opposite. What comes next?',
    type: 'sequence',
    difficulty: 'medium',
    correctAnswer: 'dark',
    options: ['light', 'dark', 'bright', 'dim'],
    cookiesReward: 2,
    renderContent: () => {
      const colors = [
        { name: 'light', color: '#FCD34D', label: '☀️' },
        { name: 'dark', color: '#1F2937', label: '🌙' },
        { name: 'light', color: '#FCD34D', label: '☀️' },
      ]
      
      return (
        <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
          {colors.map((color, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-lg border-2 border-gray-300 flex items-center justify-center text-2xl"
                style={{ backgroundColor: color.color }}
              >
                {color.label}
              </div>
              {index < colors.length - 1 && (
                <span className="text-2xl md:text-3xl font-bold text-gray-400 mt-2">→</span>
              )}
            </div>
          ))}
          <div className="flex flex-col items-center">
            <div
              className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-lg border-4 border-dashed flex items-center justify-center"
              style={{
                borderColor: '#A5F344',
                backgroundColor: 'transparent',
              }}
            >
              <span className="text-2xl">?</span>
            </div>
          </div>
        </div>
      )
    },
  },
  {
    id: 18,
    title: 'If-Then Logic! 🧠',
    description: 'If all cats are animals, and Fluffy is a cat, what is Fluffy?',
    type: 'logic',
    difficulty: 'medium',
    correctAnswer: 'animal',
    options: ['cat', 'dog', 'animal', 'pet'],
    cookiesReward: 2,
    renderContent: () => {
      return (
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col gap-4 p-6 bg-blue-50 rounded-lg max-w-md">
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800 mb-2">All cats are animals</p>
              <span className="text-3xl">→</span>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800 mb-2">Fluffy is a cat</p>
              <span className="text-3xl">→</span>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg border-4 border-dashed" style={{ borderColor: '#A5F344' }}>
              <p className="text-lg font-semibold text-gray-800">Fluffy is a ?</p>
            </div>
          </div>
        </div>
      )
    },
  },
  {
    id: 19,
    title: 'Triple Trouble! ✨',
    description: 'What is 4 × 5?',
    type: 'math',
    difficulty: 'medium',
    correctAnswer: 20,
    options: [18, 19, 20, 21],
    cookiesReward: 2,
    renderContent: () => {
      return (
        <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
          <div className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-bold text-gray-800">4</div>
          </div>
          <div className="text-4xl md:text-5xl font-bold text-gray-800">×</div>
          <div className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-bold text-gray-800">5</div>
          </div>
          <div className="text-4xl md:text-5xl font-bold text-gray-800">=</div>
          <div className="flex flex-col items-center">
            <div
              className="w-20 h-20 md:w-24 md:h-24 rounded-xl flex items-center justify-center text-4xl md:text-5xl font-bold shadow-lg border-4 border-dashed bg-gradient-to-br from-primary-subtle to-secondary-subtle"
              style={{
                borderColor: '#A5F344',
                color: '#A5F344',
              }}
            >
              ?
            </div>
          </div>
        </div>
      )
    },
  },
  {
    id: 20,
    title: 'Fibonacci Fun! 🌟',
    description: 'Each number is the sum of the two before it. What comes next?',
    type: 'pattern',
    difficulty: 'hard',
    correctAnswer: 13,
    options: [11, 12, 13, 14],
    cookiesReward: 3,
    renderContent: () => {
      return (
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
            {[3, 5, 8].map((num, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)',
                    color: 'white',
                  }}
                >
                  {num}
                </div>
                {index < 2 && (
                  <span className="text-2xl md:text-3xl font-bold text-gray-400 mt-2">→</span>
                )}
              </div>
            ))}
            <div className="flex flex-col items-center">
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold shadow-lg border-4 border-dashed"
                style={{
                  borderColor: '#A5F344',
                  color: '#A5F344',
                }}
              >
                ?
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-gray-500 italic">Hint: 3 + 5 = 8, then 5 + 8 = ?</p>
            <p className="text-xs text-gray-400">This is called the Fibonacci sequence!</p>
          </div>
        </div>
      )
    },
  },{
    id: 21,
    title: 'Connect the Dots! 🎨',
    description: 'Connect each colored dot to its matching pair.',
    type: 'connect',
    difficulty: 'easy',
    correctAnswer: 'completed',
    options: ['completed'],
    cookiesReward: 2,
    connectConfig: {
      gridSize: 5,
      pairs: [
        {
          id: 'yellow',
          color: '#FCD34D',
          start: [0, 0],
          end: [0, 4],
        },
        {
          id: 'blue',
          color: '#3B82F6',
          start: [1, 0],
          end: [4, 0],
        },
        {
          id: 'red',
          color: '#EF4444',
          start: [4, 1],
          end: [4, 4],
        },
        {
          id: 'green',
          color: '#10B981',
          start: [1, 4],
          end: [3, 4],
        },
      ],
    },
    renderContent: () => null,
  }
  ,{
    id: 22,
    title: 'Connect the Dots! 🧠',
    description: 'Plan carefully so the paths don’t block each other.',
    type: 'connect',
    difficulty: 'easy',
    correctAnswer: 'completed',
    options: ['completed'],
    cookiesReward: 3,
    connectConfig: {
      gridSize: 5,
      pairs: [
        {
          id: 'yellow',
          color: '#FCD34D',
          start: [0, 0],
          end: [0, 4],
        },
        {
          id: 'blue',
          color: '#3B82F6',
          start: [4, 0],
          end: [4, 4],
        },
        {
          id: 'red',
          color: '#EF4444',
          start: [1, 1],
          end: [3, 1],
        },
        {
          id: 'green',
          color: '#10B981',
          start: [1, 3],
          end: [3, 3],
        },
      ],
    },
    renderContent: () => null,
  }
  ,{
    id: 23,
    title: 'Connect the Dots! 🔗',
    description: 'All paths must fit without crossing.',
    type: 'connect',
    difficulty: 'medium',
    correctAnswer: 'completed',
    options: ['completed'],
    cookiesReward: 4,
    connectConfig: {
      gridSize: 5,
      pairs: [
        {
          id: 'yellow',
          color: '#FCD34D',
          start: [0, 1],
          end: [4, 1],
        },
        {
          id: 'blue',
          color: '#3B82F6',
          start: [0, 0],
          end: [4, 0],
        },
        {
          id: 'red',
          color: '#EF4444',
          start: [0, 4],
          end: [4, 4],
        },
        {
          id: 'green',
          color: '#10B981',
          start: [1, 3],
          end: [3, 3],
        },
      ],
    },
    renderContent: () => null,
  },{
    id: 24,
    title: 'Connect the Dots! 🔗',
    description: 'Think ahead to keep paths open.',
    type: 'connect',
    difficulty: 'medium',
    correctAnswer: 'completed',
    options: ['completed'],
    cookiesReward: 4,
    connectConfig: {
      gridSize: 5,
      pairs: [
        {
          id: 'blue',
          color: '#3B82F6',
          start: [0, 0],
          end: [4, 0],
        },
        {
          id: 'red',
          color: '#EF4444',
          start: [0, 4],
          end: [4, 4],
        },
        {
          id: 'yellow',
          color: '#FCD34D',
          start: [1, 1],
          end: [3, 1],
        },
        {
          id: 'green',
          color: '#10B981',
          start: [1, 3],
          end: [3, 3],
        },
      ],
    },
    renderContent: () => null,
  },{
    id: 25,
    title: 'Connect the Dots! 🧠',
    description: 'Some paths are short, others need space.',
    type: 'connect',
    difficulty: 'medium',
    correctAnswer: 'completed',
    options: ['completed'],
    cookiesReward: 4,
    connectConfig: {
      gridSize: 5,
      pairs: [
        {
          id: 'yellow',
          color: '#FCD34D',
          start: [0, 1],
          end: [0, 4],
        },
        {
          id: 'blue',
          color: '#3B82F6',
          start: [4, 0],
          end: [4, 3],
        },
        {
          id: 'red',
          color: '#EF4444',
          start: [1, 0],
          end: [3, 0],
        },
        {
          id: 'green',
          color: '#10B981',
          start: [1, 2],
          end: [3, 2],
        },
      ],
    },
    renderContent: () => null,
  },{
    id: 26,
    title: 'Connect the Dots! 🎯',
    description: 'Start with the long paths.',
    type: 'connect',
    difficulty: 'medium',
    correctAnswer: 'completed',
    options: ['completed'],
    cookiesReward: 5,
    connectConfig: {
      gridSize: 5,
      pairs: [
        {
          id: 'blue',
          color: '#3B82F6',
          start: [0, 0],
          end: [0, 4],
        },
        {
          id: 'red',
          color: '#EF4444',
          start: [4, 0],
          end: [4, 4],
        },
        {
          id: 'yellow',
          color: '#FCD34D',
          start: [1, 1],
          end: [1, 3],
        },
        {
          id: 'green',
          color: '#10B981',
          start: [3, 1],
          end: [3, 3],
        },
      ],
    },
    renderContent: () => null,
  }
  
  ,
  {
    id: 27,
    title: 'Connect the Dots! 🔄',
    description: 'Bends matter here.',
    type: 'connect',
    difficulty: 'medium',
    correctAnswer: 'completed',
    options: ['completed'],
    cookiesReward: 6,
    connectConfig: {
      gridSize: 5,
      pairs: [
        {
          id: 'blue',
          color: '#3B82F6',
          start: [1, 3],
          end: [4, 3],
        },
        {
          id: 'yellow',
          color: '#FCD34D',
          start: [4, 2],
          end: [1, 2],
        },
        {
          id: 'red',
          color: '#EF4444',
          start: [1, 0],
          end: [3, 0],
        },
        {
          id: 'green',
          color: '#10B981',
          start: [2, 1],
          end: [2, 4],
        },
      ],
    },
    renderContent: () => null,
  },
  {
    id: 28,
    title: 'Connect the Dots! 🧠',
    description: 'Some paths compete for space.',
    type: 'connect',
    difficulty: 'medium',
    correctAnswer: 'completed',
    options: ['completed'],
    cookiesReward: 5,
    connectConfig: {
      gridSize: 5,
      pairs: [
        {
          id: 'blue',
          color: '#3B82F6',
          start: [0, 0],
          end: [4, 1],
        },
        {
          id: 'yellow',
          color: '#FCD34D',
          start: [0,4],
          end: [4, 4],
        },
        {
          id: 'red',
          color: '#EF4444',
          start: [1, 4],
          end: [1, 2],
        },
        {
          id: 'green',
          color: '#10B981',
          start: [2, 2],
          end: [2, 4],
        },
      ],
    },
    renderContent: () => null,
  }
  
  ,{
    id: 29,
    title: 'Connect the Dots! 🔄',
    description: 'Inner paths compete for space.',
    type: 'connect',
    difficulty: 'medium',
    correctAnswer: 'completed',
    options: ['completed'],
    cookiesReward: 5,
    connectConfig: {
      gridSize: 5,
      pairs: [
        {
          id: 'yellow',
          color: '#FCD34D',
          start: [1, 1],
          end: [3, 2],
        },
        {
          id: 'blue',
          color: '#3B82F6',
          start: [3, 1],
          end: [1, 3],
        },
        {
          id: 'red',
          color: '#EF4444',
          start: [0, 0],
          end: [4, 0],
        },
        {
          id: 'green',
          color: '#10B981',
          start: [0, 4],
          end: [4, 4],
        },
      ],
    },
    renderContent: () => null,
  },{
    id: 30,
    title: 'Connect the Dots! 🔄',
    description: 'Inner paths compete for space.',
    type: 'connect',
    difficulty: 'medium',
    correctAnswer: 'completed',
    options: ['completed'],
    cookiesReward: 5,
    connectConfig: {
      gridSize: 5,
      pairs: [
        {
          id: 'yellow',
          color: '#FCD34D',
          start: [1, 1],
          end: [3, 2],
        },
        {
          id: 'blue',
          color: '#3B82F6',
          start: [0, 1],
          end: [4, 1],
        },
        {
          id: 'red',
          color: '#EF4444',
          start: [0, 0],
          end: [4, 0],
        },
        {
          id: 'green',
          color: '#10B981',
          start: [0, 4],
          end: [4, 4],
        },
      ],
    },
    renderContent: () => null,
  }
  
  
  
  
  
]

const shuffle = <T,>(arr: T[]) =>
  [...arr].sort(() => Math.random() - 0.5)

export const mixedPuzzles = [
  ...shuffle(puzzles.filter(p => p.difficulty === 'easy')),
  ...shuffle(puzzles.filter(p => p.difficulty === 'medium')),
  ...shuffle(puzzles.filter(p => p.difficulty === 'hard')),
].map((p,index) => ({...p, id: index + 1}))


// Re-export domain functions for convenience
export { getPuzzleById, getTotalPuzzles, getNextIncompletePuzzle } from '@/core/domain/entities/Puzzle'
