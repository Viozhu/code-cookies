import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { WarpBackground } from '@/components/ui/warp-background'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/ui/dialog'
import { CookieNotification } from '@/components/ui/cookie-notification'
import { useNavigate } from '@tanstack/react-router'
import { mixedPuzzles, type PuzzleWithUI } from '@/data/puzzles'
import { getPuzzleById } from '@/core/domain/entities/Puzzle'
import { usePuzzleStore } from '@/application/stores/puzzleStore'
import { useCookieStore } from '@/application/stores/cookieStore'
import { usePuzzleLogic } from '@/application/hooks/usePuzzleLogic'
import { useGameEngine } from '@/application/hooks/useGameEngine'
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FlowPuzzle } from '@/components/shared/FlowPuzzle'

export const Route = createFileRoute('/progress')({
  component: ProgressPage,
})

function ProgressPage() {
  const navigate = useNavigate()
  const { currentPuzzleId, isPuzzleCompleted, completedPuzzles, resetProgress } = usePuzzleStore()
  const { resetCookies } = useCookieStore()
  const [showResetDialog, setShowResetDialog] = useState(false)
  const [showCookieNotification, setShowCookieNotification] = useState(false)
  const [cookieReward, setCookieReward] = useState(0)
  const [notifiedPuzzleId, setNotifiedPuzzleId] = useState<number | null>(null)

  const puzzle = getPuzzleById(mixedPuzzles, currentPuzzleId) as PuzzleWithUI | undefined
  const isCompleted = puzzle ? isPuzzleCompleted(puzzle.id) : false

  const puzzleLogic = usePuzzleLogic(puzzle, isCompleted)
  const gameEngine = useGameEngine(mixedPuzzles, currentPuzzleId)

  // Reset notification state when puzzle changes
  useEffect(() => {
    setShowCookieNotification(false)
    setNotifiedPuzzleId(null)
  }, [currentPuzzleId])

  // Auto-navigate to next incomplete puzzle if current one is already completed
  useEffect(() => {
    gameEngine.autoNavigateToNext(mixedPuzzles)
  }, [puzzle, isCompleted, completedPuzzles, currentPuzzleId, gameEngine])

  // Show cookie notification when puzzle is solved (only once per puzzle)
  useEffect(() => {
    if (puzzleLogic.isSolved && puzzle && !isCompleted && notifiedPuzzleId !== puzzle.id) {
      setCookieReward(puzzle.cookiesReward)
      setShowCookieNotification(true)
      setNotifiedPuzzleId(puzzle.id)
    }
  }, [puzzleLogic.isSolved, puzzle, isCompleted, notifiedPuzzleId])

  if (!puzzle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Puzzle not found!</p>
      </div>
    )
  }

  const handleNext = () => {
    const nextPuzzle = gameEngine.handleNext()
    if (!nextPuzzle) {
      // All puzzles completed, go to home
      navigate({ to: '/' })
    }
  }

  const handleResetProgress = () => {
    resetProgress()
    resetCookies()
    // Navigate to first puzzle
    gameEngine.handlePuzzleSelect(1)
  }

  return (
    <div className="min-h-screen">
      <WarpBackground
        className="min-h-screen border-0 p-0"
        perspective={1000}
        beamsPerSide={4}
        beamSize={4}
        beamDelayMax={4}
        beamDelayMin={0}
        beamDuration={4}
        gridColor="rgba(93, 95, 239, 0.2)"
      >
        {/* Content Layer */}
        <div
          className="relative z-20 flex flex-col justify-center min-h-screen container mx-auto px-4 pt-20 pb-8 md:pt-24 md:pb-12 lg:pt-28 lg:pb-16"
          style={{ isolation: 'isolate' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-3xl mx-auto w-full"
          >
            {/* Reset Progress Button - Only show on last puzzle */}
            {currentPuzzleId === mixedPuzzles.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-4 flex justify-end"
              >
                <Button
                  onClick={() => setShowResetDialog(true)}
                  variant="secondary"
                  size="sm"
                  className="flex items-center gap-2 text-red-600 border-red-600 hover:bg-red-50 hover:border-red-700"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset Progress
                </Button>
              </motion.div>
            )}

            {/* Puzzle Navigation */}
            <PuzzleNavigation
              currentPuzzleId={currentPuzzleId}
              totalPuzzles={mixedPuzzles.length}
              onPrevious={gameEngine.handlePrevious}
              onNext={handleNext}
              onPuzzleSelect={gameEngine.handlePuzzleSelect}
              isPuzzleCompleted={isPuzzleCompleted}
            />

            {/* Puzzle Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-5 md:p-6 lg:p-8">
              <PuzzleContent
                puzzle={puzzle}
                isCompleted={isCompleted}
                puzzleLogic={puzzleLogic}
                onNext={handleNext}
              />
            </div>
          </motion.div>
        </div>
      </WarpBackground>

      {/* Reset Progress Confirmation Dialog */}
      <ConfirmDialog
        open={showResetDialog}
        onOpenChange={setShowResetDialog}
        onConfirm={handleResetProgress}
        title="Reset All Progress?"
        description="Are you sure you want to reset all progress? This will clear all completed puzzles and cookies. This action cannot be undone."
        confirmText="Reset Progress"
        cancelText="Cancel"
        variant="destructive"
      />

      {/* Cookie Notification */}
      <CookieNotification
        show={showCookieNotification}
        cookieCount={cookieReward}
        onClose={() => setShowCookieNotification(false)}
        autoHideDuration={4000}
      />
    </div>
  )
}

interface PuzzleNavigationProps {
  currentPuzzleId: number
  totalPuzzles: number
  onPrevious: () => number | null
  onNext: () => void
  onPuzzleSelect: (puzzleId: number) => void
  isPuzzleCompleted: (puzzleId: number) => boolean
}

function PuzzleNavigation({
  currentPuzzleId,
  totalPuzzles,
  onPrevious,
  onNext,
  onPuzzleSelect,
  isPuzzleCompleted,
}: PuzzleNavigationProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const currentButtonRef = useRef<HTMLButtonElement>(null)
  const completedCount = Array.from({ length: totalPuzzles }, (_, i) => i + 1).filter((id) =>
    isPuzzleCompleted(id)
  ).length
  const progressPercentage = (completedCount / totalPuzzles) * 100

  // Auto-scroll to current puzzle when it changes
  useEffect(() => {
    // Small delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(() => {
      if (currentButtonRef.current && scrollContainerRef.current) {
        const button = currentButtonRef.current
        const container = scrollContainerRef.current
        
        // Get bounding rectangles
        const buttonRect = button.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()
        
        // Calculate if button is outside visible area
        const buttonLeft = buttonRect.left - containerRect.left + container.scrollLeft
        const buttonRight = buttonLeft + buttonRect.width
        const containerScrollLeft = container.scrollLeft
        const containerWidth = containerRect.width
        
        // Check if button is fully visible
        const isFullyVisible = 
          buttonLeft >= containerScrollLeft && 
          buttonRight <= containerScrollLeft + containerWidth
        
        // If not fully visible, scroll to center it
        if (!isFullyVisible) {
          const targetScroll = buttonLeft - containerWidth / 2 + buttonRect.width / 2
          
          // Ensure we don't scroll past boundaries
          const maxScroll = container.scrollWidth - containerWidth
          const clampedScroll = Math.max(0, Math.min(targetScroll, maxScroll))
          
          container.scrollTo({
            left: clampedScroll,
            behavior: 'smooth',
          })
        }
      }
    }, 150)

    return () => clearTimeout(timeoutId)
  }, [currentPuzzleId])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="mb-6"
    >
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Progress: {completedCount}/{totalPuzzles} puzzles
          </span>
          <span className="text-sm font-semibold text-primary">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
          />
        </div>
      </div>

      {/* Navigation Container */}
      <div className="flex items-center gap-2 md:gap-4">
        <Button
          onClick={onPrevious}
          disabled={currentPuzzleId === 1}
          variant="secondary"
          size="sm"
          className="flex items-center gap-2 flex-shrink-0"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        {/* Scrollable Puzzle Container */}
        <div
          ref={scrollContainerRef}
          className="flex-1 h-16 flex items-center gap-1.5 md:gap-2 overflow-x-auto scrollbar-hide scroll-smooth px-2"
          style={{
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {Array.from({ length: totalPuzzles }, (_, i) => i + 1).map((puzzleId) => {
            const completed = isPuzzleCompleted(puzzleId)
            const isCurrent = puzzleId === currentPuzzleId
            
            return (
              <button
                key={puzzleId}
                ref={isCurrent ? currentButtonRef : null}
                onClick={() => onPuzzleSelect(puzzleId)}
                disabled={completed}
                className={cn(
                  'flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full font-semibold text-xs md:text-sm transition-all duration-200 relative',
                  isCurrent
                    ? 'bg-primary text-white scale-110 shadow-lg ring-2 ring-primary ring-offset-2 z-10'
                    : completed
                      ? 'bg-green-100 text-green-700 cursor-not-allowed opacity-70 hover:opacity-90'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer hover:scale-105'
                )}
                title={completed ? `Puzzle ${puzzleId} - Completed ✓` : `Puzzle ${puzzleId}${isCurrent ? ' (Current)' : ''}`}
              >
                {completed ? (
                  <span className="flex items-center justify-center w-full h-full">
                    <span className="text-base md:text-lg">✓</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center w-full h-full">{puzzleId}</span>
                )}
              </button>
            )
          })}
        </div>

        <Button
          onClick={onNext}
          variant="secondary"
          size="sm"
          className="flex items-center gap-2 flex-shrink-0"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  )
}

interface PuzzleContentProps {
  puzzle: PuzzleWithUI
  isCompleted: boolean
  puzzleLogic: ReturnType<typeof usePuzzleLogic>
  onNext: () => void
}

function PuzzleContent({
  puzzle,
  isCompleted,
  puzzleLogic,
  onNext,
}: PuzzleContentProps) {
  const { selectedAnswer, isSolved, showSuccess, handleAnswer } = puzzleLogic
  const isConnectPuzzle = puzzle.type === 'connect'

  if (isCompleted && !showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-6 sm:py-8 md:py-12"
      >
        <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">✅</div>
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-700 mb-3 sm:mb-4">
          You've already completed this puzzle!
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6">Great job! Try the next puzzle instead.</p>
        <Button onClick={onNext} variant="accent" size="lg" className="text-sm sm:text-base">
          Go to Next Puzzle
        </Button>
      </motion.div>
    )
  }

  if (!showSuccess) {
    return (
      <>
        {/* Puzzle Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-4 sm:mb-6 md:mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            {isCompleted && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-2xl">
                ✅
              </motion.span>
            )}
            <h1
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold"
              style={{
                fontFamily: "'Inter', 'Montserrat', sans-serif",
                color: '#1E293B',
              }}
            >
              Puzzle #{puzzle.id}: {puzzle.title}
            </h1>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">{puzzle.description}</p>
          <div className="mt-2">
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary-subtle text-primary">
              {puzzle.difficulty.charAt(0).toUpperCase() + puzzle.difficulty.slice(1)}
            </span>
          </div>
        </motion.div>

        {/* Pattern Display */}
        {isConnectPuzzle && puzzle.connectConfig ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6 sm:mb-8 flex justify-center"
          >
            <FlowPuzzle
              config={puzzle.connectConfig}
              isCompleted={isCompleted}
              onAllPathsComplete={() => handleAnswer('completed')}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6 sm:mb-8 p-4 sm:p-5 md:p-6 bg-gradient-to-br from-primary-subtle to-secondary-subtle rounded-xl"
          >
            {puzzle.renderContent()}
          </motion.div>
        )}

        {/* Answer Options - only show for non-connect puzzles */}
        {puzzle.type !== 'connect' && (
          <PuzzleOptions
            puzzle={puzzle}
            selectedAnswer={selectedAnswer}
            isSolved={isSolved}
            isCompleted={isCompleted}
            onAnswer={handleAnswer}
          />
        )}

        {/* Feedback Message */}
        {isSolved && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-2 sm:mt-4"
          >
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-green-600">
              🎉 Correct! Great job!
            </p>
          </motion.div>
        )}
      </>
    )
  }

  // Success State
  return (
    <PuzzleSuccess
      puzzle={puzzle}
    />
  )
}

interface PuzzleOptionsProps {
  puzzle: PuzzleWithUI
  selectedAnswer: number | string | null
  isSolved: boolean
  isCompleted: boolean
  onAnswer: (answer: number | string) => void
}

function PuzzleOptions({
  puzzle,
  selectedAnswer,
  isSolved,
  isCompleted,
  onAnswer,
}: PuzzleOptionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className={cn(
        'grid gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-6',
        puzzle.options.length === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'
      )}
    >
      {puzzle.options.map((option) => {
        const isSelected = selectedAnswer === option
        const isCorrect = isSolved && option === puzzle.correctAnswer
        const isWrong = isSolved && selectedAnswer === option && option !== puzzle.correctAnswer

        return (
          <motion.button
            key={option}
            onClick={() => onAnswer(option)}
            disabled={isSolved || isCompleted}
            whileHover={!isSolved && !isCompleted ? { scale: 1.05, y: -2 } : {}}
            whileTap={!isSolved && !isCompleted ? { scale: 0.95 } : {}}
            className={cn(
              'min-h-[60px] sm:min-h-[70px] md:min-h-[90px] lg:min-h-[100px] rounded-lg sm:rounded-xl font-bold text-base sm:text-lg md:text-xl lg:text-2xl transition-all duration-200',
              isCompleted
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                : isCorrect
                  ? 'bg-gradient-to-br from-secondary to-secondary-light text-text-light shadow-lg ring-2 sm:ring-4 ring-secondary'
                  : isWrong
                    ? 'bg-red-100 text-red-600 ring-2 sm:ring-4 ring-red-300'
                    : isSelected
                      ? 'bg-gradient-to-br from-primary to-primary-light text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-300',
              isSolved || isCompleted ? 'cursor-not-allowed' : 'cursor-pointer'
            )}
          >
            {typeof option === 'string' ? (
              <OptionDisplay option={option} />
            ) : (
              option
            )}
          </motion.button>
        )
      })}
    </motion.div>
  )
}

function OptionDisplay({ option }: { option: string }) {
  return (
    <div className="flex flex-col items-center gap-1 sm:gap-2">
      {/* Shape options */}
      {option === 'circle' && <span className="text-2xl sm:text-3xl md:text-4xl">⭕</span>}
      {option === 'square' && <span className="text-2xl sm:text-3xl md:text-4xl">⬜</span>}
      {option === 'triangle' && <span className="text-2xl sm:text-3xl md:text-4xl">🔺</span>}
      {option === 'star' && <span className="text-2xl sm:text-3xl md:text-4xl">⭐</span>}

      {/* Color options */}
      {option === 'red' && (
        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-red-500 border-2 border-gray-300 shadow-md" />
      )}
      {option === 'blue' && (
        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-blue-500 border-2 border-gray-300 shadow-md" />
      )}
      {option === 'green' && (
        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-green-500 border-2 border-gray-300 shadow-md" />
      )}
      {option === 'yellow' && (
        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-yellow-400 border-2 border-gray-300 shadow-md" />
      )}

      {/* Direction options */}
      {option === 'north' && <span className="text-2xl sm:text-3xl md:text-4xl">⬆️</span>}
      {option === 'south' && <span className="text-2xl sm:text-3xl md:text-4xl">⬇️</span>}
      {option === 'east' && <span className="text-2xl sm:text-3xl md:text-4xl">➡️</span>}
      {option === 'west' && <span className="text-2xl sm:text-3xl md:text-4xl">⬅️</span>}

      {/* Size options */}
      {option === 'small' && <span className="text-xl sm:text-2xl md:text-3xl">🔵</span>}
      {option === 'medium' && <span className="text-2xl sm:text-3xl md:text-4xl">🔵</span>}
      {option === 'large' && <span className="text-3xl sm:text-4xl md:text-5xl">🔵</span>}
      {option === 'extra-large' && <span className="text-4xl sm:text-5xl md:text-6xl">🔵</span>}

      <span className="text-xs sm:text-sm capitalize">{option}</span>
    </div>
  )
}

interface PuzzleSuccessProps {
  puzzle: PuzzleWithUI
}

function PuzzleSuccess({ puzzle }: PuzzleSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200 }}
        className="text-center py-4 sm:py-6 md:py-8"
    >
      {/* Cookie Animation */}
      <motion.div
        animate={{
          rotate: [0, 10, -10, 10, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 0.6,
          repeat: 2,
        }}
        className="mb-6"
      >
        <svg width="80" height="80" viewBox="0 0 40 40" className="mx-auto drop-shadow-lg sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-[120px] lg:h-[120px]">
          <circle cx="20" cy="20" r="18" fill="#D4A574" stroke="#C19A6B" strokeWidth="1" />
          <circle cx="15" cy="15" r="2.5" fill="#5D4037" />
          <circle cx="25" cy="15" r="2.5" fill="#5D4037" />
          <circle cx="20" cy="20" r="2.5" fill="#5D4037" />
          <circle cx="12" cy="22" r="2" fill="#5D4037" />
          <circle cx="28" cy="22" r="2" fill="#5D4037" />
          <circle cx="18" cy="26" r="2" fill="#5D4037" />
          <circle cx="25" cy="26" r="2" fill="#5D4037" />
        </svg>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold"
        style={{
          fontFamily: "'Inter', 'Montserrat', sans-serif",
          color: '#1E293B',
        }}
      >
        🎉 You earned {puzzle.cookiesReward} cookie{puzzle.cookiesReward !== 1 ? 's' : ''}! 🍪
      </motion.h2>
    </motion.div>
  )
}
