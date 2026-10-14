import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import { introSlides } from '../data/portfolio'
import type { IntroSlide } from '../types/portfolio'

export interface IntroModalProps {
  isOpen: boolean
  onClose: () => void
}

const SLIDE_DURATION = 5000 // 5 seconds per slide in ms
const TICK_INTERVAL = 25 // 25ms interval for progress bar updates

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 140 : -140,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 340, damping: 32 },
      opacity: { duration: 0.28 },
      scale: { duration: 0.28 },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -140 : 140,
    opacity: 0,
    scale: 0.98,
    transition: {
      x: { type: 'spring', stiffness: 340, damping: 32 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.2 },
    },
  }),
}

export const IntroModal: React.FC<IntroModalProps> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0) // 0 to 100 percentage

  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElementRef = useRef<HTMLElement | null>(null)

  const totalSlides = introSlides.length
  const currentSlide: IntroSlide = introSlides[currentIndex] ?? introSlides[0]

  // Reset slide index & state when opening modal
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0)
      setDirection(1)
      setProgress(0)
      setIsPlaying(true)
    }
  }, [isOpen])

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (totalSlides === 0) return
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
    setProgress(0)
  }, [totalSlides])

  const handlePrev = useCallback(() => {
    if (totalSlides === 0) return
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
    setProgress(0)
  }, [totalSlides])

  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentIndex || totalSlides === 0) return
      setDirection(index > currentIndex ? 1 : -1)
      setCurrentIndex(index)
      setProgress(0)
    },
    [currentIndex, totalSlides]
  )

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  // Auto-play timer
  useEffect(() => {
    if (!isOpen || !isPlaying || totalSlides <= 1) return

    const step = (TICK_INTERVAL / SLIDE_DURATION) * 100

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + step >= 100) {
          setDirection(1)
          setCurrentIndex((curr) => (curr + 1) % totalSlides)
          return 0
        }
        return prev + step
      })
    }, TICK_INTERVAL)

    return () => clearInterval(timer)
  }, [isOpen, isPlaying, totalSlides])

  // Focus trap and body scroll lock
  useEffect(() => {
    if (!isOpen) return

    previousActiveElementRef.current = document.activeElement as HTMLElement | null
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusTimer = setTimeout(() => {
      if (modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length > 0) {
          focusable[0].focus()
        } else {
          modalRef.current.focus()
        }
      }
    }, 50)

    return () => {
      clearTimeout(focusTimer)
      document.body.style.overflow = originalOverflow
      if (previousActiveElementRef.current && typeof previousActiveElementRef.current.focus === 'function') {
        previousActiveElementRef.current.focus()
      }
    }
  }, [isOpen])

  // Keyboard navigation & Focus trapping
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrev()
        return
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleNext()
        return
      }

      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault()
        togglePlayPause()
        return
      }

      if (e.key === 'Tab') {
        if (!modalRef.current) return
        const focusableElements = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => el.offsetParent !== null)

        if (focusableElements.length === 0) {
          e.preventDefault()
          return
        }

        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose, handlePrev, handleNext, togglePlayPause])

  const handleCtaClick = (href: string) => {
    onClose()
    setTimeout(() => {
      if (href.startsWith('#')) {
        const targetElement = document.querySelector(href)
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        window.open(href, '_blank', 'noopener,noreferrer')
      }
    }, 120)
  }

  if (totalSlides === 0) return null

  // Calculate remaining seconds for the active slide
  const remainingSeconds = Math.max(0, (SLIDE_DURATION * (1 - progress / 100)) / 1000).toFixed(1)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/95 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Main Slide Card */}
          <div
            ref={modalRef}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Intro Highlight Reel"
            className={`relative w-full max-w-4xl min-h-[480px] h-[82vh] max-h-[660px] rounded-2xl sm:rounded-3xl border border-zinc-800/80 bg-gradient-to-br ${
              currentSlide.bg === 'from-zinc-900 to-black'
                ? 'from-zinc-900 to-black'
                : 'from-black to-zinc-900'
            } shadow-2xl flex flex-col justify-between overflow-hidden transition-colors duration-700 outline-none select-none`}
          >
            {/* Subtle cinematic ambient glows */}
            <div
              className="absolute -top-36 -right-36 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 transition-all duration-700"
              style={{ backgroundColor: currentSlide.accent || '#e50914' }}
            />
            <div
              className="absolute -bottom-36 -left-36 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-15 transition-all duration-700"
              style={{ backgroundColor: currentSlide.accent || '#e50914' }}
            />

            {/* Top Progress Bar showing time remaining */}
            <div className="relative w-full h-1 sm:h-1.5 bg-zinc-800/80 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-600 to-rose-500 transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Header: Slide Counter, Time Remaining, Play/Pause & Close Button */}
            <div className="relative z-10 flex items-center justify-between px-5 sm:px-8 pt-5 sm:pt-6">
              {/* Slide number / total (top left) */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                  <span className="text-xs sm:text-sm font-mono font-semibold tracking-wider text-zinc-300 uppercase">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-zinc-600 text-xs hidden sm:inline">•</span>
                <span className="text-[11px] font-semibold tracking-widest text-zinc-400 uppercase hidden sm:inline">
                  Highlight Reel
                </span>
              </div>

              {/* Top-Right Controls */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Time remaining indicator */}
                <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-zinc-400 bg-zinc-900/80 px-2.5 py-1 rounded-full border border-zinc-800">
                  <span className="text-zinc-500">{remainingSeconds}s</span>
                </div>

                {/* Play/Pause Toggle */}
                <button
                  type="button"
                  onClick={togglePlayPause}
                  aria-label={isPlaying ? 'Pause slideshow' : 'Resume slideshow'}
                  title={isPlaying ? 'Pause slideshow (Space)' : 'Resume slideshow (Space)'}
                  className="p-2 sm:p-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/60 backdrop-blur-sm transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 active:scale-95"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 text-zinc-300" />
                  ) : (
                    <Play className="w-4 h-4 text-zinc-300 fill-current" />
                  )}
                </button>

                {/* Close Button (X) top-right */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close modal"
                  title="Close (Esc)"
                  className="p-2 sm:p-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700/60 backdrop-blur-sm transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 active:scale-95"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Arrow: Previous (Left) */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              title="Previous slide (Left Arrow)"
              className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-zinc-900/70 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/50 backdrop-blur-md transition-all transform hover:scale-110 active:scale-95 shadow-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Navigation Arrow: Next (Right) */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
              title="Next slide (Right Arrow)"
              className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-zinc-900/70 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/50 backdrop-blur-md transition-all transform hover:scale-110 active:scale-95 shadow-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Center Slide Display with Direction-Aware Transition */}
            <div className="relative flex-1 flex flex-col justify-center overflow-hidden px-10 sm:px-16 md:px-24 py-6 sm:py-8">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full max-w-2xl mx-auto flex flex-col items-start gap-4 sm:gap-6 text-left"
                >
                  {/* Subtitle in red, uppercase small text */}
                  <p className="text-red-500 font-semibold uppercase text-xs sm:text-sm tracking-widest">
                    {currentSlide.subtitle}
                  </p>

                  {/* Title in large white text */}
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                    {currentSlide.title}
                  </h2>

                  {/* Body text in zinc-300 */}
                  <p className="text-zinc-300 text-base sm:text-lg md:text-xl leading-relaxed font-normal">
                    {currentSlide.body}
                  </p>

                  {/* Optional tags as badges */}
                  {currentSlide.tags && currentSlide.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1 sm:pt-2">
                      {currentSlide.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-zinc-900/90 text-zinc-200 border border-zinc-700/60 shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Optional CTA button */}
                  {currentSlide.cta && (
                    <div className="pt-2 sm:pt-4">
                      <button
                        type="button"
                        onClick={() => handleCtaClick(currentSlide.cta!.href)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm sm:text-base transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-red-600/30 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400"
                      >
                        <span>{currentSlide.cta.label}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Footer: Clickable dot indicators and keyboard hints */}
            <div className="relative z-10 flex items-center justify-between px-5 sm:px-8 pb-5 sm:pt-2 sm:pb-6">
              {/* Left keyboard shortcuts indicator */}
              <div className="hidden md:flex items-center gap-2 text-[11px] text-zinc-500">
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-[10px]">
                  ←
                </kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-[10px]">
                  →
                </kbd>
                <span>Navigate</span>
                <span className="text-zinc-700">•</span>
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-[10px]">
                  Space
                </kbd>
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
                <span className="text-zinc-700">•</span>
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-[10px]">
                  Esc
                </kbd>
                <span>Close</span>
              </div>

              {/* Clickable Dot Indicators at bottom */}
              <div className="flex items-center gap-2 mx-auto md:mx-0">
                {introSlides.map((slide, index) => {
                  const isActive = index === currentIndex
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => goToSlide(index)}
                      aria-label={`Go to slide ${index + 1} of ${totalSlides}: ${slide.title}`}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        isActive
                          ? 'w-8 bg-red-600 shadow-md shadow-red-600/50'
                          : 'w-2.5 bg-zinc-700 hover:bg-zinc-500'
                      }`}
                    />
                  )
                })}
              </div>

              {/* Slide Counter on right (for small balance) */}
              <div className="hidden md:flex items-center gap-1 text-[11px] font-mono text-zinc-500">
                <span>Auto-advances every 5s</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default IntroModal
