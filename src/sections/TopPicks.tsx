import React, { useRef } from 'react'
import { motion, type Variants } from 'framer-motion'
import {
  Star,
  TrendingUp,
  Award,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-react'
import { featuredPicks, projects } from '../data/portfolio'
import type { FeaturedPick } from '../types/portfolio'
import ScrollReveal from '../components/ui/ScrollReveal'
import Badge from '../components/ui/Badge'

// Variants for staggered entrance animation
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export const TopPicks: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Smooth scroll handler for horizontal rail navigation
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  // Handle card click navigation: opens project or scrolls to relevant section
  const handleCardClick = (pick: FeaturedPick) => {
    if (pick.projectId) {
      const projectElement = document.getElementById('projects')
      if (projectElement) {
        projectElement.scrollIntoView({ behavior: 'smooth' })
      }
      return
    }

    const lowerCat = pick.category.toLowerCase()
    if (lowerCat.includes('intern') || lowerCat.includes('role') || lowerCat.includes('professional')) {
      const journeyElement = document.getElementById('journey')
      if (journeyElement) {
        journeyElement.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }

    if (lowerCat.includes('cert') || lowerCat.includes('award')) {
      const achievementsElement =
        document.getElementById('achievements') || document.getElementById('journey')
      if (achievementsElement) {
        achievementsElement.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }

    // Default fallback: smooth scroll to journey
    const fallbackElement = document.getElementById('journey')
    if (fallbackElement) {
      fallbackElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="featured" className="bg-black py-24 relative overflow-hidden border-t border-zinc-900">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-red-950/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-950/40 border border-red-800/60 text-red-400 font-mono text-xs uppercase tracking-widest mb-3">
                <TrendingUp className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                <span>TOP 5 SELECTION • TODAY'S PICKS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase font-sans">
                TOP <span className="text-red-600">PICKS</span>
              </h2>
              <p className="mt-2 text-zinc-400 max-w-2xl text-sm sm:text-base">
                The top-ranked spotlight of high-impact engineering projects, production
                internships, and industry credentials.
              </p>
            </div>

            {/* Navigation Arrows & Badge Counter */}
            <div className="flex items-center gap-3 self-start md:self-auto">
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-400">
                <Star className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                <span>Ranked 1 – 5</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleScroll('left')}
                  aria-label="Scroll left"
                  className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white hover:border-red-600 hover:bg-zinc-800 transition-all cursor-pointer shadow-md"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleScroll('right')}
                  aria-label="Scroll right"
                  className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white hover:border-red-600 hover:bg-zinc-800 transition-all cursor-pointer shadow-md"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Large Rank Number Cards: Horizontal Scroll Rail */}
        <motion.div
          ref={scrollContainerRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex gap-5 overflow-x-auto pb-6 pt-2 horizontal-scroll snap-x snap-mandatory scroll-smooth"
        >
          {featuredPicks.map((pick: FeaturedPick) => {
            const associatedProject = pick.projectId
              ? projects.find((p) => p.id === pick.projectId)
              : undefined

            return (
              <motion.div
                key={pick.id}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                onClick={() => handleCardClick(pick)}
                className="w-[300px] sm:w-[340px] md:w-[380px] flex-shrink-0 snap-start bg-zinc-900 border-l-4 border-red-600 p-6 rounded-r-xl relative overflow-hidden group hover:border-l-red-500 hover:bg-zinc-850 hover:shadow-2xl hover:shadow-red-950/40 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Large Background Rank Number: text-6xl font-black text-red-600/20 absolute top-right */}
                <div className="absolute top-2 right-4 text-6xl sm:text-7xl font-black text-red-600/20 group-hover:text-red-600/35 font-mono select-none pointer-events-none transition-colors duration-300">
                  #{pick.rank}
                </div>

                {/* Card Main Content */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="red" className="text-[11px] font-semibold tracking-wider uppercase">
                      {pick.category}
                    </Badge>
                    {pick.rank === 1 && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded">
                        <Award className="w-3 h-3" />
                        #1 Spot
                      </span>
                    )}
                  </div>

                  {/* Title Large */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-red-400 transition-colors duration-200 mb-3 pr-10 line-clamp-2">
                    {pick.title}
                  </h3>

                  {/* Description Text */}
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {pick.description}
                  </p>
                </div>

                {/* Card Footer: Tags Row & CTA Indicator */}
                <div>
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-800/80 mb-4">
                    {pick.tags.map((tag, idx) => (
                      <Badge
                        key={idx}
                        variant="default"
                        className="text-[11px] bg-zinc-800/90 text-zinc-300 border border-zinc-750 group-hover:border-zinc-700 transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-red-500 group-hover:text-red-400 group-hover:translate-x-1 transition-all duration-200">
                      <span>
                        {associatedProject
                          ? 'Explore Project Details'
                          : pick.category.toLowerCase().includes('cert')
                          ? 'View Certification'
                          : 'Explore Experience'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>

                    <span className="text-[11px] font-mono text-zinc-600 group-hover:text-zinc-500 transition-colors">
                      PICK {pick.rank} OF 5
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default TopPicks
