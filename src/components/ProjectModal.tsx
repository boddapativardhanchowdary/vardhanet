import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, ExternalLink, Check } from 'lucide-react'
import type { Project } from '../types/portfolio'
import Badge from './ui/Badge'

export interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

type TabType = 'overview' | 'features' | 'techStack'

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview')

  // Lock body scroll and handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (project) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  // Adjust active tab when project changes without calling setState inside useEffect
  const [currentProjectId, setCurrentProjectId] = useState<string | undefined>(project?.id)
  if (project && project.id !== currentProjectId) {
    setCurrentProjectId(project.id)
    setActiveTab('overview')
  }

  return (
    <AnimatePresence>
      {project && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/95 backdrop-blur-md p-4 sm:p-6 lg:p-10"
        >
          {/* Backdrop click dismiss */}
          <div
            className="fixed inset-0 bg-transparent"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-10 w-full max-w-5xl my-auto max-h-[90vh] flex flex-col bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Hero Banner */}
            <div className="relative p-6 sm:p-8 bg-gradient-to-r from-zinc-900 via-zinc-800/80 to-zinc-900 border-b border-zinc-800/80">
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close modal"
                  className="p-2 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-[#e50914]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="red">FEATURED TITLE</Badge>
                <Badge variant="outline">{project.category}</Badge>
                {project.isFeatured && (
                  <span className="text-xs uppercase tracking-wider font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                    Staff Pick
                  </span>
                )}
              </div>

              <h2
                id="modal-project-title"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
              >
                {project.title}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-zinc-300 max-w-3xl leading-relaxed">
                {project.shortDescription}
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-2 px-6 sm:px-8 border-b border-zinc-800 bg-zinc-950/60 sticky top-0 z-10">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`py-3.5 px-3 text-sm font-semibold tracking-wide border-b-2 transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'border-[#e50914] text-white'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Overview
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('features')}
                className={`py-3.5 px-3 text-sm font-semibold tracking-wide border-b-2 transition-all cursor-pointer ${
                  activeTab === 'features'
                    ? 'border-[#e50914] text-white'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Features & Highlights
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('techStack')}
                className={`py-3.5 px-3 text-sm font-semibold tracking-wide border-b-2 transition-all cursor-pointer ${
                  activeTab === 'techStack'
                    ? 'border-[#e50914] text-white'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Tech Stack & Specs
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Project Meta & Quick Actions */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2.5 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition-colors border border-zinc-700/60 text-sm shadow-sm"
                      >
                        <Github className="w-4 h-4" />
                        View Source Code
                      </a>
                    )}
                    {project.demo ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2.5 px-4 py-2.5 bg-[#e50914] hover:bg-[#b30710] text-white font-medium rounded-lg transition-colors text-sm shadow-md shadow-red-950/40"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    ) : (
                      <div className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-800/40 text-zinc-500 rounded-lg border border-zinc-800 text-xs">
                        <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                        Live Demo Available on Request
                      </div>
                    )}
                  </div>

                  {/* Metadata Block */}
                  <div className="p-4 rounded-xl bg-zinc-950/50 border border-zinc-800/80 space-y-3.5 text-sm">
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-1">
                        Category
                      </span>
                      <span className="text-zinc-200 font-medium">{project.category}</span>
                    </div>

                    <div>
                      <span className="block text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-1.5">
                        Core Technologies
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                          <Badge key={tech} variant="default" size="sm">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {project.tags && project.tags.length > 0 && (
                      <div>
                        <span className="block text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-1.5">
                          Tags
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs text-zinc-400 bg-zinc-800/60 px-2 py-0.5 rounded border border-zinc-700/40"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quick Highlights Summary */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="p-4 rounded-xl bg-zinc-950/30 border border-zinc-800/60">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                        Key Takeaways
                      </h4>
                      <ul className="space-y-2 text-xs text-zinc-300">
                        {project.highlights.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#e50914] mt-1.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Right Column: Tabbed Content */}
                <div className="lg:col-span-8">
                  {/* Overview Tab Content */}
                  {activeTab === 'overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2.5 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#e50914]" />
                          Project Overview
                        </h3>
                        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                          {project.overview}
                        </p>
                      </div>

                      {project.problem && (
                        <div className="p-5 rounded-xl bg-zinc-950/80 border-l-4 border-l-[#e50914] border border-zinc-800">
                          <h4 className="text-sm font-semibold uppercase tracking-wider text-red-400 mb-2">
                            Problem Statement & Challenge
                          </h4>
                          <p className="text-zinc-300 text-sm leading-relaxed">
                            {project.problem}
                          </p>
                        </div>
                      )}

                      {project.highlights && project.highlights.length > 0 && (
                        <div>
                          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#e50914]" />
                            Highlights & Accomplishments
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {project.highlights.map((highlight, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-3 p-3.5 rounded-lg bg-zinc-950/50 border border-zinc-800/80"
                              >
                                <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-400 mt-0.5 flex-shrink-0">
                                  <Check className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-xs sm:text-sm text-zinc-200">
                                  {highlight}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Features Tab Content */}
                  {activeTab === 'features' && (
                    <motion.div
                      key="features"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#e50914]" />
                          Key Features & Capabilities
                        </h3>
                        <p className="text-zinc-400 text-sm mb-4">
                          Functional modules and capabilities implemented in this project:
                        </p>
                        <div className="space-y-3">
                          {project.features.map((feature, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                            >
                              <div className="p-1.5 rounded-lg bg-[#e50914]/10 text-[#e50914] mt-0.5 flex-shrink-0">
                                <Check className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="text-sm sm:text-base font-medium text-zinc-200 leading-snug">
                                  {feature}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {project.screenshots && project.screenshots.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                            Screenshots
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {project.screenshots.map((shot, idx) => (
                              <img
                                key={idx}
                                src={shot}
                                alt={`${project.title} screenshot ${idx + 1}`}
                                className="w-full rounded-lg border border-zinc-800 object-cover"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Tech Stack Tab Content */}
                  {activeTab === 'techStack' && (
                    <motion.div
                      key="techStack"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#e50914]" />
                          Architecture & Technology Stack
                        </h3>
                        <p className="text-zinc-400 text-sm mb-4">
                          Components, frameworks, and programming tools leveraged to develop this solution:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {project.techStack.map((tech, idx) => (
                            <div
                              key={idx}
                              className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex items-center justify-between"
                            >
                              <span className="font-medium text-zinc-200 text-sm sm:text-base">
                                {tech}
                              </span>
                              <Badge variant="subtle" size="sm">
                                Verified
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-800/60 space-y-2">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                          Repository & Deployment Status
                        </h4>
                        <div className="text-sm text-zinc-300 space-y-1">
                          <p>
                            <span className="text-zinc-500">Repository: </span>
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-red-400 hover:underline break-all"
                            >
                              {project.github}
                            </a>
                          </p>
                          <p>
                            <span className="text-zinc-500">Deployment: </span>
                            {project.demo ? (
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-400 hover:underline"
                              >
                                {project.demo}
                              </a>
                            ) : (
                              <span className="text-zinc-400">Available locally / by demo request</span>
                            )}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-zinc-800 bg-zinc-950/80 flex items-center justify-between">
              <span className="text-xs text-zinc-500 font-mono">
                ID: {project.id} • {project.category}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs sm:text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal
