import React, { useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { viewerProfiles } from '../data/portfolio'
import type { ViewerProfile, ActiveProfile } from '../types/portfolio'

export interface ProfileSelectionProps {
  onSelect: (profile: ActiveProfile) => void
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.35, ease: 'easeInOut' },
  },
}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  faded: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
}

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: 'easeOut',
    },
  },
  selected: {
    scale: [1, 0.95, 1.15],
    opacity: [1, 1, 0],
    borderColor: '#e50914',
    transition: {
      duration: 0.45,
      times: [0, 0.25, 1],
      ease: 'easeInOut',
    },
  },
  faded: {
    opacity: 0,
    scale: 0.88,
    transition: {
      duration: 0.25,
      ease: 'easeIn',
    },
  },
}

const skipVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.4 },
  },
  faded: {
    opacity: 0,
    y: 12,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
}

export const ProfileSelection: React.FC<ProfileSelectionProps> = ({ onSelect }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [isCreativeVideoActive, setIsCreativeVideoActive] = useState(false)
  const [creativeVideoError, setCreativeVideoError] = useState(false)

  const handleSelect = (profileId: ActiveProfile) => {
    if (selectedId !== null) return
    const key = profileId ?? 'skip'
    setSelectedId(key)

    if (profileId === 'creative') {
      setIsCreativeVideoActive(true)
      return
    }

    setTimeout(() => {
      onSelect(profileId)
    }, 450)
  }

  const continueToPortfolio = () => {
    setIsCreativeVideoActive(false)
    onSelect('creative')
  }

  const isAnySelected = selectedId !== null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-40 bg-black/95 backdrop-blur overflow-y-auto flex items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="min-h-full w-full flex flex-col items-center justify-center py-12 px-4 sm:px-6">
          {/* Header section */}
          <motion.div
            variants={headerVariants}
            animate={isAnySelected ? 'faded' : 'visible'}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wider text-white uppercase font-sans">
              WHO'S WATCHING?
            </h1>
            <p className="mt-2 sm:mt-3 text-base sm:text-lg text-zinc-400">
              Select your viewing experience
            </p>
          </motion.div>

          {/* Cards grid: 1 col on mobile, 3 cols on tablet+ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-4xl mx-auto">
            {viewerProfiles.map((profile: ViewerProfile) => {
              const isSelected = selectedId === profile.id
              const isCardHovered = hoveredId === profile.id

              return (
                <motion.div
                  key={profile.id}
                  variants={cardVariants}
                  animate={
                    isSelected
                      ? 'selected'
                      : isAnySelected
                      ? 'faded'
                      : 'visible'
                  }
                  whileHover={isAnySelected ? undefined : { scale: 1.05 }}
                  whileTap={isAnySelected ? undefined : { scale: 0.95 }}
                  onClick={() => handleSelect(profile.id as ActiveProfile)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleSelect(profile.id as ActiveProfile)
                    }
                  }}
                  onMouseEnter={() => setHoveredId(profile.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(profile.id)}
                  onBlur={() => setHoveredId(null)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${profile.label} profile`}
                  className="group relative flex flex-col items-center justify-center bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-red-600 rounded-lg p-8 cursor-pointer transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:border-red-600 select-none min-h-[260px]"
                >
                  {/* Big Emoji (80px) */}
                  <div
                    className="select-none flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ fontSize: '80px', height: '80px', lineHeight: '80px' }}
                    role="img"
                    aria-label={profile.label}
                  >
                    {profile.emoji}
                  </div>

                  {/* Label below */}
                  <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-red-500 transition-colors duration-200 text-center">
                    {profile.label}
                  </h2>

                  {/* Description on hover */}
                  <div className="mt-3 min-h-[44px] flex items-center justify-center w-full px-2">
                    <p
                      className={`text-sm text-zinc-400 text-center leading-relaxed transition-opacity duration-300 ${
                        isCardHovered ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {profile.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Bottom Skip Link */}
          <motion.div
            variants={skipVariants}
            animate={isAnySelected ? 'faded' : 'visible'}
            className="mt-8 sm:mt-12 text-center"
          >
            <button
              type="button"
              onClick={() => handleSelect(null)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleSelect(null)
                }
              }}
              className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-400 hover:bg-zinc-800/60 px-6 py-2.5 rounded transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
            >
              Skip
            </button>
          </motion.div>
        </div>

        {isCreativeVideoActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Creative profile introduction video"
          >
            <button
              type="button"
              onClick={continueToPortfolio}
              className="absolute right-4 top-4 z-10 rounded border border-white/30 bg-black/70 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
            >
              Skip video
            </button>

            {creativeVideoError ? (
              <div className="max-w-md text-center">
                <p className="text-lg font-semibold text-white">
                  The video could not be played.
                </p>
                <p className="mt-2 text-sm text-zinc-400">
                  You can continue to the creative portfolio.
                </p>
                <button
                  type="button"
                  onClick={continueToPortfolio}
                  className="mt-6 rounded bg-red-600 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Continue to portfolio
                </button>
              </div>
            ) : (
              <video
                src={viewerProfiles.find((profile) => profile.id === 'creative')?.url}
                autoPlay
                muted
                controls
                playsInline
                onEnded={continueToPortfolio}
                onError={() => setCreativeVideoError(true)}
                className="max-h-full w-full max-w-6xl object-contain"
              >
                Your browser does not support video playback.
              </video>
            )}
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default ProfileSelection
