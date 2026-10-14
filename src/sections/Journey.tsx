import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap,
  Briefcase,
  Award,
  MapPin,
  Calendar,
  ChevronDown,
  ExternalLink,
} from 'lucide-react'
import { journeySeasons } from '../data/portfolio'
import type { JourneySeason, JourneyEpisode } from '../types/portfolio'
import ScrollReveal from '../components/ui/ScrollReveal'
import Badge from '../components/ui/Badge'

export const Journey: React.FC = () => {
  const [activeSeasonId, setActiveSeasonId] = useState<string>(
    journeySeasons[0]?.id || 'season-1'
  )

  // Track expanded state of episodes; initially expand the first episode of each season
  const [expandedEpisodes, setExpandedEpisodes] = useState<Record<string, boolean>>({
    'ep-1': true,
    'ep-4': true,
    'ep-6': true,
  })

  const activeSeason =
    journeySeasons.find((season) => season.id === activeSeasonId) || journeySeasons[0]

  const toggleEpisode = (id: string) => {
    setExpandedEpisodes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const getTypeIcon = (type: JourneyEpisode['type']) => {
    switch (type) {
      case 'education':
        return <GraduationCap className="w-3.5 h-3.5 text-red-400" />
      case 'internship':
        return <Briefcase className="w-3.5 h-3.5 text-red-400" />
      case 'certification':
      case 'achievement':
      default:
        return <Award className="w-3.5 h-3.5 text-red-400" />
    }
  }

  const getTypeLabel = (type: JourneyEpisode['type']) => {
    switch (type) {
      case 'education':
        return 'Education'
      case 'internship':
        return 'Experience'
      case 'certification':
        return 'Certification'
      case 'achievement':
        return 'Achievement'
      default:
        return type
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  }

  return (
    <section id="journey" className="relative bg-zinc-950 py-24 text-zinc-100 overflow-hidden">
      {/* Background ambient glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-red-950/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="down">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-3 py-1 rounded-full bg-red-950/40 border border-red-800/40 text-red-500 font-mono text-xs uppercase tracking-widest mb-3">
              Career Journey
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
              Seasons & Episodes
            </h2>
            <p className="mt-3 text-zinc-400 text-sm sm:text-base leading-relaxed">
              Explore the episodic timeline of my academic background, industry internships,
              and professional certifications.
            </p>
          </div>
        </ScrollReveal>

        {/* Season Tabs */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="border-b border-zinc-800 mb-10 overflow-x-auto scrollbar-none">
            <div className="flex items-center justify-start md:justify-center gap-2 sm:gap-6 min-w-max pb-px">
              {journeySeasons.map((season: JourneySeason) => {
                const isActive = activeSeasonId === season.id
                return (
                  <button
                    key={season.id}
                    onClick={() => setActiveSeasonId(season.id)}
                    className={`relative py-3.5 px-4 text-sm sm:text-base font-semibold tracking-wide transition-colors cursor-pointer flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-t ${
                      isActive ? 'text-red-500' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                    role="tab"
                    aria-selected={isActive}
                  >
                    <span
                      className={`font-mono text-xs px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-red-950/60 text-red-400 border border-red-800/50'
                          : 'bg-zinc-900 text-zinc-500 border border-zinc-800'
                      }`}
                    >
                      S{season.season}
                    </span>
                    <span>{season.subtitle || season.title}</span>

                    {/* Active tab red bottom border */}
                    {isActive && (
                      <motion.div
                        layoutId="activeSeasonBorder"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-600 shadow-[0_0_12px_rgba(220,38,38,0.8)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Active Season Meta Info */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 pb-3 border-b border-zinc-900 gap-2">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-red-500 font-semibold">
              Season {activeSeason.season}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
              {activeSeason.title}
              <span className="text-zinc-500 font-normal text-base sm:text-lg ml-2">
                • {activeSeason.subtitle}
              </span>
            </h3>
          </div>
          <span className="font-mono text-xs text-zinc-500">
            {activeSeason.episodes.length} {activeSeason.episodes.length === 1 ? 'Episode' : 'Episodes'}
          </span>
        </div>

        {/* Timeline & Episodes */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div
            className="absolute left-4 sm:left-5 top-5 bottom-5 w-0.5 bg-zinc-800"
            aria-hidden="true"
          />

          {/* Episode Cards Container with Staggered Entrance */}
          <motion.div
            key={activeSeason.id}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {activeSeason.episodes.map((episode: JourneyEpisode) => {
              const isExpanded = !!expandedEpisodes[episode.id]

              return (
                <motion.div
                  key={episode.id}
                  variants={itemVariants}
                  className="relative pl-10 sm:pl-14 group"
                >
                  {/* Left Timeline Red Dot */}
                  <div
                    className="absolute left-4 sm:left-5 top-6 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <span className="relative flex h-3.5 w-3.5">
                      {episode.isCurrent && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                      )}
                      <span
                        className={`relative inline-flex rounded-full h-3.5 w-3.5 bg-red-600 ring-4 ring-zinc-950 transition-all duration-200 ${
                          isExpanded
                            ? 'scale-110 shadow-[0_0_12px_rgba(220,38,38,0.9)]'
                            : 'group-hover:scale-110'
                        }`}
                      />
                    </span>
                  </div>

                  {/* Expandable Card */}
                  <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden transition-colors duration-200 hover:border-zinc-600">
                    {/* Collapsed Header / Toggle Trigger */}
                    <button
                      type="button"
                      onClick={() => toggleEpisode(episode.id)}
                      className="w-full text-left p-5 sm:p-6 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 transition-colors"
                      aria-expanded={isExpanded}
                    >
                      {/* Top Row: Episode Number, Badges, Expand Icon */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center flex-wrap gap-2">
                          {/* Episode Number Monospace Label */}
                          <span className="font-mono text-xs uppercase tracking-wider text-red-500 font-bold">
                            EPISODE {String(episode.episode).padStart(2, '0')}
                          </span>

                          {/* Type Badge */}
                          <Badge variant="outline" className="flex items-center gap-1.5 py-0.5">
                            {getTypeIcon(episode.type)}
                            <span>{getTypeLabel(episode.type)}</span>
                          </Badge>

                          {/* Current Badge */}
                          {episode.isCurrent && (
                            <Badge variant="red" className="font-mono text-[10px] tracking-wider uppercase">
                              CURRENT
                            </Badge>
                          )}

                          {/* Academic Score / Grade Badge (if present) */}
                          {episode.badge && (
                            <Badge variant="default" className="font-mono text-xs">
                              {episode.badge}
                            </Badge>
                          )}
                        </div>

                        {/* Chevron Icon */}
                        <div
                          className={`p-1 rounded-md text-zinc-400 group-hover:text-white transition-transform duration-300 ${
                            isExpanded ? 'rotate-180 text-red-400' : ''
                          }`}
                        >
                          <ChevronDown className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                        {episode.title}
                      </h4>

                      {/* Organization & Date Row */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2 text-xs sm:text-sm text-zinc-400">
                        <span className="font-medium text-zinc-200">
                          {episode.organization}
                        </span>

                        {episode.location && (
                          <span className="flex items-center gap-1 text-zinc-400">
                            <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                            {episode.location}
                          </span>
                        )}

                        <span className="flex items-center gap-1 text-zinc-400">
                          <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                          {episode.duration}
                        </span>
                      </div>
                    </button>

                    {/* Expanded Section with AnimatePresence */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          key="expanded-content"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2 border-t border-zinc-800/80 space-y-4">
                            {/* Description */}
                            <p className="text-zinc-300 text-sm leading-relaxed">
                              {episode.description}
                            </p>

                            {/* Skills List */}
                            {episode.skills && episode.skills.length > 0 && (
                              <div>
                                <h5 className="font-mono text-xs uppercase tracking-wider text-zinc-500 mb-2">
                                  Skills & Competencies
                                </h5>
                                <div className="flex flex-wrap gap-1.5">
                                  {episode.skills.map((skill) => (
                                    <span
                                      key={skill}
                                      className="inline-flex items-center text-xs px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 border border-zinc-700/60 hover:border-zinc-500 transition-colors"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Credential / Certificate Link */}
                            {episode.credentialUrl && (
                              <div className="pt-2">
                                <a
                                  href={episode.credentialUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-300 transition-colors group/link"
                                >
                                  <span>Verify Credential / Certificate</span>
                                  <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                                </a>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Journey
