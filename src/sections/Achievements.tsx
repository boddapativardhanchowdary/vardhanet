import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Award,
  ExternalLink,
  Shield,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Sparkles,
} from 'lucide-react'
import { achievements } from '../data/portfolio'
import type { Achievement } from '../types/portfolio'
import ScrollReveal from '../components/ui/ScrollReveal'
import Badge from '../components/ui/Badge'

type FilterType = 'all' | 'certification' | 'achievement'

export const Achievements: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('all')
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Filter achievements based on active tab
  const filteredAchievements = achievements.filter((item) => {
    if (filter === 'all') return true
    return item.type === filter
  })

  // Counts for tabs
  const countAll = achievements.length
  const countCerts = achievements.filter((a) => a.type === 'certification').length
  const countAchieve = achievements.filter((a) => a.type === 'achievement').length

  // Check scroll position to toggle scroll button states
  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10)
  }

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    if (!el) return

    el.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll)

    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [filteredAchievements])

  // Scroll actions for rail
  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const scrollAmount = 320
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      scroll('left')
    } else if (e.key === 'ArrowRight') {
      scroll('right')
    }
  }

  return (
    <section
      id="achievements"
      className="relative bg-zinc-950 py-24 text-white overflow-hidden"
    >
      {/* Background cinematic glow */}
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-red-950/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-48 w-96 h-96 bg-red-950/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 1. Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <ScrollReveal direction="up">
            <div className="flex items-center gap-3 mb-4">
              <Badge
                variant="red"
                className="font-mono tracking-widest text-xs px-2.5 py-1 uppercase"
              >
                S04
              </Badge>
              <div className="h-px w-12 bg-red-600/40" />
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                Season 04 &bull; Credentials
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase">
              ACHIEVEMENTS &amp; CERTIFICATIONS
            </h2>

            <p className="mt-3 text-base sm:text-lg text-zinc-400 font-light max-w-2xl">
              Verified certifications, technical credentials, and professional recognitions
              acquired through continuous learning and engineering rigor.
            </p>
          </ScrollReveal>

          {/* Navigation Scroll Buttons */}
          <div className="hidden md:flex items-center gap-2 self-start md:self-end">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={`p-3 rounded-full border transition-all ${
                canScrollLeft
                  ? 'border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800 hover:border-red-600/50 hover:text-red-400'
                  : 'border-zinc-800 bg-zinc-900/40 text-zinc-600 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={`p-3 rounded-full border transition-all ${
                canScrollRight
                  ? 'border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800 hover:border-red-600/50 hover:text-red-400'
                  : 'border-zinc-800 bg-zinc-900/40 text-zinc-600 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. Filter Tabs */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10 pb-4 border-b border-zinc-800/80">
            <button
              onClick={() => setFilter('all')}
              className={`relative px-4 py-2 rounded-lg text-xs sm:text-sm font-medium tracking-wide uppercase transition-all duration-200 flex items-center gap-2 ${
                filter === 'all'
                  ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(229,9,20,0.4)]'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>All</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  filter === 'all'
                    ? 'bg-white/20 text-white'
                    : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {countAll}
              </span>
            </button>

            <button
              onClick={() => setFilter('certification')}
              className={`relative px-4 py-2 rounded-lg text-xs sm:text-sm font-medium tracking-wide uppercase transition-all duration-200 flex items-center gap-2 ${
                filter === 'certification'
                  ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(229,9,20,0.4)]'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Certifications</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  filter === 'certification'
                    ? 'bg-white/20 text-white'
                    : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {countCerts}
              </span>
            </button>

            <button
              onClick={() => setFilter('achievement')}
              className={`relative px-4 py-2 rounded-lg text-xs sm:text-sm font-medium tracking-wide uppercase transition-all duration-200 flex items-center gap-2 ${
                filter === 'achievement'
                  ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(229,9,20,0.4)]'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Achievements</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  filter === 'achievement'
                    ? 'bg-white/20 text-white'
                    : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {countAchieve}
              </span>
            </button>

            <div className="ml-auto text-xs font-mono text-zinc-500 hidden sm:block">
              Showing {filteredAchievements.length} credentials &bull; Use arrow keys or drag to scroll
            </div>
          </div>
        </ScrollReveal>

        {/* 3. Horizontal Scroll Rail of Certification Poster Cards */}
        <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div
            ref={scrollRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            aria-label="Achievements and Certifications rail"
            className="horizontal-scroll flex gap-6 overflow-x-auto pb-8 pt-3 focus:outline-none focus:ring-1 focus:ring-red-500/50 rounded-xl"
            style={{
              scrollbarGutter: 'stable',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <AnimatePresence mode="popLayout">
              {filteredAchievements.map((item: Achievement, index: number) => {
                const isCert = item.type === 'certification'
                const hasVerifyUrl = Boolean(item.verifyUrl && item.verifyUrl.trim().length > 0)

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.08,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="w-[280px] shrink-0 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-red-600/70 hover:shadow-[0_0_35px_rgba(229,9,20,0.3)] hover:-translate-y-1.5 transition-all duration-300"
                  >
                    {/* Top: Gradient Header with 80px Centered Emoji Badge */}
                    <div className="relative h-36 bg-gradient-to-b from-red-950/80 via-red-900/30 to-zinc-900 flex items-center justify-center p-4 border-b border-zinc-800/80 overflow-hidden">
                      {/* Ambient background light in header */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Header top badges */}
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/60 border border-zinc-700/60 text-zinc-300 backdrop-blur-sm">
                          {isCert ? 'CERT' : 'AWARD'}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-mono text-zinc-400 bg-black/40 px-2 py-0.5 rounded-full border border-zinc-800">
                        <Calendar className="w-3 h-3 text-red-500" />
                        <span>{item.date}</span>
                      </div>

                      {/* Centered Emoji Badge (80px x 80px) */}
                      <div className="relative z-10 w-20 h-20 rounded-2xl bg-zinc-950/90 border border-zinc-700/60 flex items-center justify-center text-4xl shadow-2xl group-hover:scale-110 group-hover:border-red-500/80 group-hover:shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all duration-300">
                        <span>{item.badge}</span>
                      </div>
                    </div>

                    {/* Body: Title, Issuer, Description */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Issuer line */}
                        <div className="flex items-center gap-1.5 text-xs font-mono text-red-400/90 mb-2">
                          <Shield className="w-3.5 h-3.5 shrink-0 text-red-500" />
                          <span className="truncate">{item.issuer}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2 leading-snug mb-3">
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light line-clamp-3">
                          {item.description}
                        </p>
                      </div>

                      {/* Footer: Verify link button or Verified status */}
                      <div className="pt-4 mt-5 border-t border-zinc-800/80 flex items-center justify-between">
                        {hasVerifyUrl ? (
                          <a
                            href={item.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-400 transition-colors group/link"
                          >
                            <span>Verify Credential</span>
                            <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                          </a>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400/90 bg-emerald-950/30 border border-emerald-800/40 px-2.5 py-1 rounded-md">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>Verified Record</span>
                          </div>
                        )}

                        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 group-hover:text-zinc-400 transition-colors">
                          {item.id}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile scroll hints */}
        <div className="md:hidden flex items-center justify-between text-xs text-zinc-500 font-mono mt-4 pt-3 border-t border-zinc-900">
          <span className="flex items-center gap-1">
            <ChevronLeft className="w-3.5 h-3.5 text-red-500" />
            Swipe horizontally
            <ChevronRight className="w-3.5 h-3.5 text-red-500" />
          </span>
          <span>{filteredAchievements.length} cards</span>
        </div>
      </div>
    </section>
  )
}

export default Achievements
