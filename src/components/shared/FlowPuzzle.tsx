/**
 * FlowPuzzle Component
 * Interactive connect-the-dots puzzle (Flow Free style)
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'

export interface FlowPuzzleConfig {
  gridSize: number // e.g., 5 for 5x5 grid
  pairs: Array<{
    id: string
    color: string
    start: [number, number] // [row, col]
    end: [number, number]
  }>
}

interface FlowPuzzleProps {
  config: FlowPuzzleConfig
  onAllPathsComplete?: () => void
  isCompleted?: boolean
}

type CellState = {
  color: string | null
  pathId: string | null
  isDot: boolean
}

export function FlowPuzzle({ config, onAllPathsComplete, isCompleted = false }: FlowPuzzleProps) {
  const initializeGrid = useCallback(() => {
    const newGrid: CellState[][] = Array(config.gridSize)
      .fill(null)
      .map(() =>
        Array(config.gridSize).fill(null).map(() => ({ color: null, pathId: null, isDot: false }))
      )

    // Place dots
    config.pairs.forEach((pair) => {
      const [startRow, startCol] = pair.start
      const [endRow, endCol] = pair.end
      newGrid[startRow][startCol] = { color: pair.color, pathId: pair.id, isDot: true }
      newGrid[endRow][endCol] = { color: pair.color, pathId: pair.id, isDot: true }
    })

    return newGrid
  }, [config])

  const [grid, setGrid] = useState<CellState[][]>(initializeGrid)
  const [currentPath, setCurrentPath] = useState<Array<[number, number]>>([])
  const [currentPathId, setCurrentPathId] = useState<string | null>(null)
  const [completedPaths, setCompletedPaths] = useState<Set<string>>(new Set())
  const [isDragging, setIsDragging] = useState(false)
  const [hasCalledCompletion, setHasCalledCompletion] = useState(false)
  const gridContainerRef = useRef<HTMLDivElement>(null)

  // Reset when config changes
  useEffect(() => {
    setGrid(initializeGrid())
    setCurrentPath([])
    setCurrentPathId(null)
    setCompletedPaths(new Set())
    setIsDragging(false)
    setHasCalledCompletion(false)
  }, [initializeGrid])

  // Check completion when completedPaths changes (safety check)
  useEffect(() => {
    if (!isCompleted && !hasCalledCompletion && completedPaths.size === config.pairs.length && onAllPathsComplete) {
      setHasCalledCompletion(true)
      onAllPathsComplete()
    }
  }, [completedPaths.size, config.pairs.length, isCompleted, hasCalledCompletion, onAllPathsComplete])

  // Get cell at position
  const getCell = useCallback(
    (row: number, col: number): CellState | null => {
      if (row < 0 || row >= config.gridSize || col < 0 || col >= config.gridSize) {
        return null
      }
      return grid[row][col]
    },
    [grid, config.gridSize]
  )

  // Convert screen coordinates to cell position
  const getCellFromCoordinates = useCallback((clientX: number, clientY: number): [number, number] | null => {
    if (!gridContainerRef.current) return null

    const rect = gridContainerRef.current.getBoundingClientRect()
    const cellSize = Math.min(320 / config.gridSize, 60)
    const gap = 4
    const padding = 8

    // Calculate relative position (accounting for padding)
    const x = clientX - rect.left - padding
    const y = clientY - rect.top - padding

    // If outside the grid area, return null
    if (x < 0 || y < 0) return null

    // Calculate which cell (accounting for gaps between cells)
    // Each cell takes up cellSize + gap space
    const col = Math.floor(x / (cellSize + gap))
    const row = Math.floor(y / (cellSize + gap))

    // Validate bounds
    if (row < 0 || row >= config.gridSize || col < 0 || col >= config.gridSize) {
      return null
    }

    return [row, col]
  }, [config.gridSize])

  // Check if move is valid (adjacent, not blocked by other paths)
  const isValidMove = useCallback(
    (from: [number, number], to: [number, number], pathId: string, currentPathForValidation: Array<[number, number]>): boolean => {
      const [fromRow, fromCol] = from
      const [toRow, toCol] = to

      // Must be adjacent
      const rowDiff = Math.abs(toRow - fromRow)
      const colDiff = Math.abs(toCol - fromCol)
      if (!((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1))) {
        return false
      }

      const targetCell = getCell(toRow, toCol)
      if (!targetCell) return false

      // Allow reaching the end/start dot (target will be determined by where we started)
      const pair = config.pairs.find((p) => p.id === pathId)
      if (pair && currentPathForValidation.length > 0) {
        const [startRow, startCol] = pair.start
        const [endRow, endCol] = pair.end
        const pathStart = currentPathForValidation[0]
        const startedFromStart = pathStart[0] === startRow && pathStart[1] === startCol
        const targetRow = startedFromStart ? endRow : startRow
        const targetCol = startedFromStart ? endCol : startCol
        if (toRow === targetRow && toCol === targetCol) {
          return true
        }
      }

      // Don't allow crossing other completed paths
      if (targetCell.pathId && targetCell.pathId !== pathId && !targetCell.isDot) {
        return false
      }

      // Don't allow going back into current path (except immediate backstep)
      const lastButOne = currentPathForValidation.length > 1 ? currentPathForValidation[currentPathForValidation.length - 2] : null
      if (lastButOne && toRow === lastButOne[0] && toCol === lastButOne[1]) {
        // Allow one step back
        return true
      }

      return !currentPathForValidation.some(([r, c]) => r === toRow && c === toCol)
    },
    [getCell, config]
  )

  // Handle mouse down - start path
  const handleMouseDown = useCallback(
    (row: number, col: number) => {
      if (isCompleted) return

      const cell = getCell(row, col)
      if (!cell || !cell.isDot || !cell.pathId) return

      const pair = config.pairs.find((p) => p.id === cell.pathId)
      if (!pair) return

      const [startRow, startCol] = pair.start
      const [endRow, endCol] = pair.end

      // If clicking on completed path start/end, clear it
      if (completedPaths.has(cell.pathId)) {
        if ((row === startRow && col === startCol) || (row === endRow && col === endCol)) {
          const pathIdToClear = cell.pathId
          
          setCompletedPaths((prev) => {
            const next = new Set(prev)
            next.delete(pathIdToClear)
            return next
          })

          // Clear path from grid
          setGrid((prevGrid) => {
            const newGrid = prevGrid.map((rowArr) =>
              rowArr.map((cell) => {
                if (cell.pathId === pathIdToClear && !cell.isDot) {
                  return { color: null, pathId: null, isDot: false }
                }
                return cell
              })
            )

            // Restore dots
            config.pairs.forEach((p) => {
              const [sr, sc] = p.start
              const [er, ec] = p.end
              newGrid[sr][sc] = { color: p.color, pathId: p.id, isDot: true }
              newGrid[er][ec] = { color: p.color, pathId: p.id, isDot: true }
            })

            return newGrid
          })

          setCurrentPath([])
          setCurrentPathId(null)
          setIsDragging(false)
        }
        return
      }

      // Start path from either start or end dot
      if ((row === startRow && col === startCol) || (row === endRow && col === endCol)) {
        setIsDragging(true)
        setCurrentPathId(cell.pathId)
        setCurrentPath([[row, col]])
        // If starting from end, we need to swap start/end for the logic
        // Store whether we're going from end to start
        if (row === endRow && col === endCol) {
          // Mark that we're going reverse by storing the target
          setCurrentPath([[row, col]])
        }
      }
    },
    [isCompleted, getCell, config, completedPaths]
  )

  // Handle mouse move - extend path
  const handleMouseMove = useCallback(
    (row: number, col: number) => {
      if (isCompleted || !isDragging || !currentPathId || currentPath.length === 0) {
        return
      }

      const lastPos = currentPath[currentPath.length - 1]
      if (row === lastPos[0] && col === lastPos[1]) return

      if (!isValidMove(lastPos, [row, col], currentPathId, currentPath)) {
        return
      }

      const pair = config.pairs.find((p) => p.id === currentPathId)
      if (!pair) return

      const [startRow, startCol] = pair.start
      const [endRow, endCol] = pair.end
      const pathStart = currentPath[0]
      
      // Determine which dot we started from and which is the target
      const startedFromStart = pathStart[0] === startRow && pathStart[1] === startCol
      const targetRow = startedFromStart ? endRow : startRow
      const targetCol = startedFromStart ? endCol : startCol

      // Check if reached the target (opposite dot from where we started)
      if (row === targetRow && col === targetCol) {
        // Complete path
        const completedPath = [...currentPath, [row, col]]
        const newCompletedPaths = new Set(completedPaths)
        newCompletedPaths.add(currentPathId)

        // Update grid
        setGrid((prevGrid) => {
          const newGrid = prevGrid.map((rowArr) =>
            rowArr.map((cell) => {
              // Keep existing dots and completed paths
              if (cell.isDot) return cell
              if (cell.pathId && cell.pathId !== currentPathId && completedPaths.has(cell.pathId)) {
                return cell
              }

              // Clear current incomplete path
              if (cell.pathId === currentPathId && !cell.isDot) {
                return { color: null, pathId: null, isDot: false }
              }

              return cell
            })
          )

          // Add completed path (preserving dots)
          completedPath.forEach(([r, c]) => {
            // Always preserve dots
            const isDot = (r === startRow && c === startCol) || (r === endRow && c === endCol)
            if (!isDot) {
              newGrid[r][c] = { color: pair.color, pathId: currentPathId, isDot: false }
            } else {
              // Ensure dot is preserved with correct color and pathId
              newGrid[r][c] = { color: pair.color, pathId: currentPathId, isDot: true }
            }
          })

          return newGrid
        })

        setCompletedPaths(newCompletedPaths)
        setCurrentPath([])
        setCurrentPathId(null)
        setIsDragging(false)

        // Check if all paths complete
        if (newCompletedPaths.size === config.pairs.length && !hasCalledCompletion) {
          setHasCalledCompletion(true)
          onAllPathsComplete?.()
        }
      } else {
        // Extend path
        const newPath = [...currentPath]

        // Handle backtracking
        if (newPath.length > 1) {
          const prevPos = newPath[newPath.length - 2]
          if (row === prevPos[0] && col === prevPos[1]) {
            // Backstep
            newPath.pop()
          } else {
            newPath.push([row, col])
          }
        } else {
          newPath.push([row, col])
        }

        // Update grid
        setGrid((prevGrid) => {
          const newGrid = prevGrid.map((rowArr) =>
            rowArr.map((cell) => {
              // Keep dots and completed paths
              if (cell.isDot) return cell
              if (cell.pathId && cell.pathId !== currentPathId && completedPaths.has(cell.pathId)) {
                return cell
              }

              // Clear current path
              if (cell.pathId === currentPathId && !cell.isDot) {
                return { color: null, pathId: null, isDot: false }
              }

              return cell
            })
          )

          // Draw current path
          newPath.forEach(([r, c]) => {
            if (!newGrid[r][c].isDot) {
              newGrid[r][c] = { color: pair.color, pathId: currentPathId, isDot: false }
            }
          })

          return newGrid
        })

        setCurrentPath(newPath)
      }
    },
    [isCompleted, isDragging, currentPathId, currentPath, isValidMove, config, completedPaths, onAllPathsComplete]
  )

  // Handle mouse up - stop dragging
  const handleMouseUp = useCallback(() => {
    if (isDragging && currentPath.length > 0) {
      // Clear incomplete path
      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((rowArr) =>
          rowArr.map((cell) => {
            if (cell.pathId === currentPathId && !cell.isDot) {
              return { color: null, pathId: null, isDot: false }
            }
            return cell
          })
        )

        // Restore dots
        config.pairs.forEach((p) => {
          const [sr, sc] = p.start
          const [er, ec] = p.end
          newGrid[sr][sc] = { color: p.color, pathId: p.id, isDot: true }
          newGrid[er][ec] = { color: p.color, pathId: p.id, isDot: true }
        })

        return newGrid
      })

      setCurrentPath([])
      setCurrentPathId(null)
      setIsDragging(false)
    }
  }, [isDragging, currentPath, currentPathId, config])

  // Touch event handlers
  const handleTouchStart = useCallback(
    (e: React.TouchEvent, row: number, col: number) => {
      e.preventDefault() // Prevent scrolling
      handleMouseDown(row, col)
    },
    [handleMouseDown]
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || !currentPathId || currentPath.length === 0) {
        return
      }

      e.preventDefault() // Prevent scrolling while dragging

      const touch = e.touches[0]
      if (!touch) return

      const cellPos = getCellFromCoordinates(touch.clientX, touch.clientY)
      if (!cellPos) return

      const [row, col] = cellPos
      handleMouseMove(row, col)
    },
    [isDragging, currentPathId, currentPath, handleMouseMove, getCellFromCoordinates]
  )

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault()
      handleMouseUp()
    },
    [handleMouseUp]
  )

  // Global mouse up handler
  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseUp = () => handleMouseUp()
      const handleGlobalTouchEnd = (e: TouchEvent) => {
        e.preventDefault()
        handleMouseUp()
      }

      window.addEventListener('mouseup', handleGlobalMouseUp)
      window.addEventListener('touchend', handleGlobalTouchEnd, { passive: false })
      window.addEventListener('touchcancel', handleGlobalTouchEnd, { passive: false })

      return () => {
        window.removeEventListener('mouseup', handleGlobalMouseUp)
        window.removeEventListener('touchend', handleGlobalTouchEnd)
        window.removeEventListener('touchcancel', handleGlobalTouchEnd)
      }
    }
  }, [isDragging, handleMouseUp])

  const cellSize = Math.min(320 / config.gridSize, 60)
  const gap = 4

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={gridContainerRef}
        className="relative select-none touch-none"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${config.gridSize}, ${cellSize}px)`,
          gap: `${gap}px`,
          padding: '8px',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderRadius: '12px',
          border: '2px solid rgba(255, 255, 255, 0.1)',
        }}
        onTouchMove={handleTouchMove}
      >
        {Array.from({ length: config.gridSize * config.gridSize }).map((_, index) => {
          const row = Math.floor(index / config.gridSize)
          const col = index % config.gridSize
          const cell = grid[row][col]
          const isOnCurrentPath = currentPath.some(([r, c]) => r === row && c === col)

          return (
            <motion.div
              key={`${row}-${col}`}
              className="relative"
              style={{
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                backgroundColor: cell.color
                  ? `${cell.color}40`
                  : 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                border: cell.color ? `2px solid ${cell.color}` : '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isCompleted ? 'default' : cell.isDot ? 'pointer' : isDragging ? 'crosshair' : 'default',
                transition: 'all 0.15s ease',
                touchAction: 'none',
              }}
              onMouseDown={() => handleMouseDown(row, col)}
              onMouseEnter={() => handleMouseMove(row, col)}
              onTouchStart={(e) => handleTouchStart(e, row, col)}
              onTouchEnd={handleTouchEnd}
              whileHover={!isCompleted && cell.isDot ? { scale: 1.1 } : {}}
              whileTap={!isCompleted && cell.isDot ? { scale: 0.95 } : {}}
            >
              {/* Dot */}
              {cell.isDot && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center z-10"
                >
                  <div
                    style={{
                      width: `${cellSize * 0.65}px`,
                      height: `${cellSize * 0.65}px`,
                      borderRadius: '50%',
                      backgroundColor: cell.color || '#fff',
                      border: `2px solid ${cell.color || '#fff'}`,
                      boxShadow: `0 0 12px ${cell.color || '#fff'}80`,
                    }}
                  />
                </motion.div>
              )}

              {/* Path segment */}
              {cell.pathId && !cell.isDot && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    backgroundColor: cell.color || '#fff',
                    borderRadius: '6px',
                    opacity: isOnCurrentPath ? 0.8 : 0.6,
                  }}
                />
              )}
            </motion.div>
          )
        })}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-md">
          Click and drag from a colored dot to connect it to its matching pair.
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
          {completedPaths.size} of {config.pairs.length} paths completed
        </p>
      </div>
    </div>
  )
}
