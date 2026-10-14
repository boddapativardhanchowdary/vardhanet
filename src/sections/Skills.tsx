import React, { useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import {
  Server,
  Monitor,
  Database,
  Code2,
  Wrench,
  Cloud,
  ChevronDown,
  Sparkles,
} from 'lucide-react'
import { skillCategories } from '../data/portfolio'
import type { SkillCategory, Skill } from '../types/portfolio'
import ScrollReveal from '../components/ui/ScrollReveal'

// Map category icons dynamically to Lucide components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Server,
  Monitor,
  Database,
  Code2,
  Wrench,
  Cloud,
}

// Stagger animation variants for cards
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  // Track collapsed category IDs when in 'all' view or accordion mode
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({})

  // Compute total skills count
  const totalSkills = skillCategories.reduce(
    (acc, cat) => acc + (cat.skills?.length || 0),
    0
  )

  const toggleCategoryCollapse = (categoryId: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }

  // Filter categories based on selection
  const visibleCategories: SkillCategory[] =
    selectedCategory === 'all'
      ? skillCategories
      : skillCategories.filter((cat: SkillCategory) => cat.id === selectedCategory)

  return (
    <section id="skills" className="bg-zinc-950 py-24 relative overflow-hidden">
      {/* Background Subtle Accent Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="text-center sm:text-left mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-950/40 border border-red-800/60 text-red-400 font-mono text-xs uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>SEASON 03 • ARCHITECTURE & STACK</span>
              <span className="px-1.5 py-0.5 rounded bg-red-600/30 text-white font-bold text-[10px]">
                S03
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase font-sans">
                  TECHNICAL <span className="text-red-600">GENRES</span>
                </h2>
                <p className="mt-2 text-zinc-400 max-w-2xl text-sm sm:text-base">
                  Core technologies, engineering languages, frameworks, and developer tools
                  mastered across production systems, internships, and academic projects.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 self-start sm:self-auto px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                <Sparkles className="w-3.5 h-3.5 text-red-500" />
                <span>
                  <strong className="text-white font-semibold">{totalSkills}</strong> competencies indexed
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Category Filter Tabs: Horizontal Scrollable Row */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-10">
            <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 horizontal-scroll">
              {/* 'All' Tab */}
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-red-600 text-white shadow-lg shadow-red-900/40 border border-red-500'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                <Cloud className="w-4 h-4" />
                <span>All Genres</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    selectedCategory === 'all'
                      ? 'bg-red-700 text-white'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {totalSkills}
                </span>
              </button>

              {/* Category Buttons */}
              {skillCategories.map((category: SkillCategory) => {
                const IconComponent = iconMap[category.icon] || Code2
                const isSelected = selectedCategory === category.id

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-red-600 text-white shadow-lg shadow-red-900/40 border border-red-500'
                        : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{category.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-red-700 text-white'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {category.skills.length}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Skills Content Display */}
        <div className="space-y-12">
          {visibleCategories.map((category: SkillCategory) => {
            const IconComponent = iconMap[category.icon] || Code2
            const isCollapsed = Boolean(collapsedCategories[category.id])

            return (
              <ScrollReveal key={category.id} direction="up" distance={20}>
                <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-5 sm:p-6 transition-all duration-300">
                  {/* Category Section Heading / Accordion Header */}
                  <div
                    onClick={() => toggleCategoryCollapse(category.id)}
                    className="flex items-center justify-between cursor-pointer group pb-4 border-b border-zinc-800/80 select-none"
                    title="Click to collapse / expand"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-red-500 group-hover:border-red-900 group-hover:bg-red-950/30 transition-all">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-red-400 transition-colors flex items-center gap-2">
                          {category.label}
                        </h3>
                        <span className="text-xs text-zinc-400">
                          {category.skills.length} skills in this stack
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="hidden sm:inline-block text-xs text-zinc-400 group-hover:text-zinc-300 font-mono">
                        {isCollapsed ? 'EXPAND' : 'COLLAPSE'}
                      </span>
                      <motion.div
                        animate={{ rotate: isCollapsed ? -90 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-zinc-700"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Skills Grid: 3 cols desktop, 2 tablet, 1 mobile */}
                  <AnimatePresence initial={false}>
                    {!isCollapsed && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6"
                        >
                          {category.skills.map((skill: Skill) => (
                            <motion.div
                              key={skill.id}
                              variants={cardVariants}
                              whileHover={{ scale: 1.02, y: -2 }}
                              transition={{ duration: 0.2 }}
                              className="bg-zinc-900 border border-zinc-800 hover:border-red-900 rounded-lg p-4 flex flex-col justify-between transition-colors duration-200 group shadow-sm hover:shadow-red-950/30"
                            >
                              <div>
                                <div className="flex items-center justify-between mb-1.5">
                                  <h4 className="text-white font-medium text-base tracking-wide group-hover:text-red-400 transition-colors">
                                    {skill.name}
                                  </h4>
                                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-red-500 transition-colors" />
                                </div>
                                {skill.description && (
                                  <p className="text-xs text-zinc-400 mb-2 leading-relaxed">
                                    {skill.description}
                                  </p>
                                )}
                              </div>

                              {/* 'Used in:' Section */}
                              <div className="mt-3 pt-3 border-t border-zinc-800/80">
                                <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 block mb-1.5">
                                  Used in:
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {skill.usedIn.map((item, idx) => (
                                    <span
                                      key={idx}
                                      className="text-xs px-2 py-0.5 rounded bg-zinc-800/90 text-zinc-300 border border-zinc-750 group-hover:border-zinc-600 transition-colors"
                                    >
                                      {item}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills
