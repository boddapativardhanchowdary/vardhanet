import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion'

export interface OpeningSequenceProps {
  onComplete: () => void
}

export type Stage =
  | 'idle'
  | 'studio'
  | 'name'
  | 'series'
  | 'portrait'
  | 'play'
  | 'complete'

export const OpeningSequence: React.FC<OpeningSequenceProps> = ({ onComplete }) => {
  const prefersReducedMotion = useReducedMotion()

  // 0: 'idle'
  // 1: 'studio'
  // 2: 'name'
  // 3: 'series'
  // 4: 'portrait'
  // 5: 'play'
  // 6: 'complete'
  const [stage, setStage] = useState<Stage>(() =>
    prefersReducedMotion ? 'portrait' : 'idle'
  )
  const completedRef = useRef(false)

  // Safe single invocation of onComplete callback
  const finishSequence = useCallback(() => {
    if (!completedRef.current) {
      completedRef.current = true
      onComplete()
    }
  }, [onComplete])

  const handlePlay = useCallback(() => {
    if (stage !== 'complete') {
      setStage('complete')
    }
  }, [stage])

  const handleSkip = useCallback(() => {
    if (stage !== 'complete') {
      setStage('complete')
    }
  }, [stage])

  // If user prefers reduced motion, skip straight to stage 4 (portrait)
  useEffect(() => {
    if (
      prefersReducedMotion &&
      (stage === 'idle' || stage === 'studio' || stage === 'name' || stage === 'series')
    ) {
      setStage('portrait')
    }
  }, [prefersReducedMotion, stage])

  // Keyboard navigation: Space or Enter triggers play
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ' || e.code === 'Enter' || e.key === 'Enter') {
        e.preventDefault()
        handlePlay()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlePlay])

  // Timed stage progression:
  // idle: 0.3s -> studio
  // studio: 1.5s -> name
  // name: 1.5s -> series
  // series: 1.0s -> portrait
  // portrait: 0.5s -> play
  // play: waits for user interaction
  // complete: 0.7s fade-out -> onComplete()
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null

    switch (stage) {
      case 'idle':
        timer = setTimeout(() => {
          setStage('studio')
        }, 300)
        break

      case 'studio':
        timer = setTimeout(() => {
          setStage('name')
        }, 1500)
        break

      case 'name':
        timer = setTimeout(() => {
          setStage('series')
        }, 1500)
        break

      case 'series':
        timer = setTimeout(() => {
          setStage('portrait')
        }, 1000)
        break

      case 'portrait':
        timer = setTimeout(() => {
          setStage('play')
        }, 500)
        break

      case 'play':
        // Awaiting user interaction (click PLAY, Space/Enter, or Skip)
        break

      case 'complete':
        timer = setTimeout(() => {
          finishSequence()
        }, prefersReducedMotion ? 100 : 700)
        break
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [stage, prefersReducedMotion, finishSequence])

  // Skip button is visible from stage 1 onwards (until complete)
  const isSkipVisible = stage !== 'idle' && stage !== 'complete'
  const isSplitScreen = stage === 'portrait' || stage === 'play'

  return (
    <div
      className="fixed inset-0 z-50 bg-black text-white select-none overflow-hidden flex items-center justify-center font-sans"
      role="region"
      aria-label="Portfolio Opening Sequence"
    >
      {/* Background cinematic vignette & subtle glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/50 via-black to-black opacity-90" />
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top-Right Skip Button (always visible from stage 1) */}
      <AnimatePresence>
        {isSkipVisible && (
          <motion.button
            key="skip-btn"
            type="button"
            onClick={handleSkip}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="fixed top-6 right-6 md:top-8 md:right-8 z-50 flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-700/80 bg-black/70 backdrop-blur-md text-xs sm:text-sm font-semibold tracking-widest text-neutral-300 uppercase hover:bg-neutral-900 hover:text-white hover:border-neutral-500 transition-all duration-200 cursor-pointer shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500/70"
            aria-label="Skip Intro"
          >
            <span>SKIP INTRO</span>
            <svg
              className="w-3.5 h-3.5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M5 4l10 8-10 8V4zm11 0v16h3V4h-3z" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Stage Presentation */}
      <AnimatePresence mode="wait">
        {/* Stage 1: 'studio' */}
        {stage === 'studio' && (
          <motion.div
            key="stage-studio"
            initial={{ opacity: 0, scale: 0.94, letterSpacing: '0.25em' }}
            animate={{ opacity: 1, scale: 1, letterSpacing: '0.5em' }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{
              duration: prefersReducedMotion ? 2.1 : 1.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col items-center justify-center text-center px-6 z-20"
          >
            <motion.span
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="text-[11px] sm:text-xs font-semibold tracking-[0.4em] text-red-600 uppercase mb-3"
            >
              WELCOM TO THE
            </motion.span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-light tracking-[0.45em] sm:tracking-[0.55em] text-neutral-200 uppercase font-serif drop-shadow-md">
              VARDHAN'S WORLD
            </h2>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 80, opacity: 0.9 }}
              transition={{ delay: 2.35, duration: 3.7 }}
              className="h-[2px] bg-red-600 mt-5 rounded-full shadow-[0_0_12px_rgba(229,9,20,0.8)]"
            />
          </motion.div>
        )}

        {/* Stage 2: 'name' */}
        {stage === 'name' && (
          <motion.div
            key="stage-name"
            initial={{ opacity: 0, scale: 0.88, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{
              duration: prefersReducedMotion ? 0.1 : 2.95,
              ease: [0.16, 0.90, 0.3, 1],
            }}
            className="flex flex-col items-center justify-center text-center px-6 z-20 max-w-5xl"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-wider text-white uppercase drop-shadow-[0_0_35px_rgba(255,255,255,0.35)] leading-tight">
              VARDHAN BODDAPATI
            </h1>
          </motion.div>
        )}

        {/* Stage 3: 'series' */}
        {stage === 'series' && (
          <motion.div
            key="stage-series"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{
              duration: prefersReducedMotion ? 0.1 : 0.75,
              ease: 'easeOut',
            }}
            className="flex flex-col items-center justify-center text-center px-6 z-20 max-w-5xl"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-wider text-white uppercase drop-shadow-[0_0_35px_rgba(255,255,255,0.3)] leading-tight">
              VARDHAN BODDAPATI
            </h1>
            <motion.div
              initial={{ opacity: 0, y: 16, letterSpacing: '0.2em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.45em' }}
              transition={{
                delay: prefersReducedMotion ? 0 : 0.15,
                duration: prefersReducedMotion ? 0.1 : 0.65,
                ease: 'easeOut',
              }}
              className="mt-5 sm:mt-8 flex items-center gap-3 sm:gap-6"
            >
              <div className="h-[2px] w-8 sm:w-16 bg-red-600 rounded-full shadow-[0_0_10px_rgba(229,9,20,0.8)]" />
              <span className="text-xl sm:text-3xl md:text-4xl font-extrabold text-[#E50914] uppercase tracking-[0.45em] drop-shadow-[0_0_25px_rgba(229,9,20,0.9)]">
                THE SERIES
              </span>
              <div className="h-[2px] w-8 sm:w-16 bg-red-600 rounded-full shadow-[0_0_10px_rgba(229,9,20,0.8)]" />
            </motion.div>
          </motion.div>
        )}

        {/* Stages 4 & 5: Split Screen (Stage 4: portrait zoom-in; Stage 5: prominent PLAY button) */}
        {isSplitScreen && (
          <motion.div
            key="stage-split"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: prefersReducedMotion ? 1.1 : 1.8,
              ease: 'easeInOut',
            }}
            className="w-full h-full flex flex-col-reverse md:flex-row relative z-20"
          >
            {/* Left Content Area: name + title + play button */}
            <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-start px-6 sm:px-12 md:px-16 lg:px-24 py-8 md:py-0 z-20 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/95 to-black/30 md:to-transparent">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0.1 : 0.6,
                  delay: prefersReducedMotion ? 0 : 0.1,
                }}
                className="max-w-xl"
              >
                {/* Series badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-red-600 text-white shadow-[0_0_10px_rgba(229,9,20,0.6)]">
                    ORIGINAL
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
                    FULL STACK DEVELOPER 
                  </span>
                </div>

                {/* Developer Name */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none drop-shadow-lg">
                  VARDHAN BODDAPATI
                </h1>

                {/* The Series Title */}
                <div className="mt-2 mb-4">
                  <span className="text-sm sm:text-lg font-black text-[#E50914] uppercase tracking-[0.35em] drop-shadow-[0_0_15px_rgba(229,9,20,0.7)]">
                    PRESENT'S
                  </span>
                </div>

                {/* Title & Metadata */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-neutral-300 font-medium mb-3">
                  <span className="text-white font-semibold">
                    Full Stack Java Developer
                  </span>
                  <span className="text-neutral-600">•</span>
                  <span className="text-emerald-400 font-semibold">
                    Open To Work
                  </span>
                  <span className="text-neutral-600">•</span>
                  <span className="text-neutral-400 border border-neutral-700 px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider">
                    HD / 2026
                  </span>
                </div>

                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-8 max-w-lg">
                  Computer Science undergraduate with hands-on experience in Java,
                  Spring Boot, and scalable web architectures. Step into the
                  portfolio to explore the journey, featured projects, and tech
                  stack.
                </p>

                {/* Action Controls Area */}
                <div className="flex flex-col items-start gap-4">
                  {/* Stage 5 PLAY button with pulsing animation */}
                  <div className="flex items-center gap-6">
                    <div className="relative flex items-center justify-center">
                      {/* Radiating pulsing rings for stage 5 */}
                      {stage === 'play' && !prefersReducedMotion && (
                        <>
                          <motion.div
                            className="absolute -inset-3 rounded-full border-2 border-red-500/50 pointer-events-none"
                            animate={{
                              scale: [1, 1.35, 1],
                              opacity: [0.8, 0.15, 0.8],
                            }}
                            transition={{
                              duration: 2.2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                          />
                          <motion.div
                            className="absolute -inset-6 rounded-full border border-red-600/30 pointer-events-none"
                            animate={{
                              scale: [1, 1.45, 1],
                              opacity: [0.5, 0, 0.5],
                            }}
                            transition={{
                              duration: 2.2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                              delay: 0.35,
                            }}
                          />
                        </>
                      )}

                      {/* PLAY BUTTON */}
                      <motion.button
                        type="button"
                        onClick={handlePlay}
                        whileHover={prefersReducedMotion ? {} : { scale: 1.08 }}
                        whileTap={prefersReducedMotion ? {} : { scale: 0.94 }}
                        animate={
                          stage === 'play' && !prefersReducedMotion
                            ? {
                                boxShadow: [
                                  '0 0 20px 4px rgba(229, 9, 20, 0.5)',
                                  '0 0 50px 16px rgba(229, 9, 20, 0.85)',
                                  '0 0 20px 4px rgba(229, 9, 20, 0.5)',
                                ],
                              }
                            : {}
                        }
                        transition={
                          prefersReducedMotion
                            ? {}
                            : {
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }
                        }
                        className="relative flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#E50914] hover:bg-[#b80710] text-white shadow-2xl cursor-pointer group focus:outline-none focus:ring-4 focus:ring-red-400/80 transition-colors z-20"
                        aria-label="Play Portfolio"
                      >
                        <svg
                          className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-current translate-x-0.5 drop-shadow group-hover:scale-110 transition-transform duration-200"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        <span className="text-[11px] sm:text-xs font-black tracking-widest text-white mt-1 uppercase">
                          PLAY
                        </span>
                      </motion.button>
                    </div>

                    {/* Stage 5 Prompts: Skip link & Keyboard hint */}
                    <AnimatePresence>
                      {stage === 'play' && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: prefersReducedMotion ? 0.1 : 0.4,
                          }}
                          className="flex flex-col gap-1.5"
                        >
                          <button
                            type="button"
                            onClick={handleSkip}
                            className="text-xs sm:text-sm text-neutral-300 hover:text-white underline underline-offset-4 tracking-wider transition-colors cursor-pointer text-left font-medium"
                          >
                            Skip intro & start watching
                          </button>
                          <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 tracking-wider uppercase">
                            <span>Press</span>
                            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-neutral-800 border border-neutral-700 rounded text-neutral-200">
                              SPACE
                            </kbd>
                            <span>or</span>
                            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-neutral-800 border border-neutral-700 rounded text-neutral-200">
                              ENTER
                            </kbd>
                            <span>to play</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Half: Portrait with cinematic zoom-in */}
            <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden flex items-center justify-center bg-black">
              <motion.img
                src="/assets/portrait.jpg"
                alt="Vardhan Boddapati"
                initial={{ scale: prefersReducedMotion ? 1 : 1.14 }}
                animate={{ scale: prefersReducedMotion ? 1 : 1.02 }}
                transition={{
                  duration: prefersReducedMotion ? 0.1 : 5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="w-full h-full object-cover object-top filter brightness-95 contrast-105"
              />

              {/* Edge vignetting to seamlessly integrate with layout */}
              <div className="hidden md:block absolute inset-y-0 left-0 w-36 lg:w-56 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none z-10" />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/75 to-transparent pointer-events-none z-10" />
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black via-black/50 to-transparent pointer-events-none z-10" />
              <div className="hidden md:block absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/60 to-transparent pointer-events-none z-10" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 6: Fade to black */}
      <AnimatePresence>
        {stage === 'complete' && (
          <motion.div
            key="stage-complete"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0.1 : 0.65,
              ease: 'easeInOut',
            }}
            className="fixed inset-0 bg-black z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default OpeningSequence
