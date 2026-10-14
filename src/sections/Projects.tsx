import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Github, ExternalLink, Play } from 'lucide-react'
import { projects } from '../data/portfolio'
import type { Project } from '../types/portfolio'
import ScrollReveal from '../components/ui/ScrollReveal'
import Badge from '../components/ui/Badge'
import ProjectModal from '../components/ProjectModal'

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const featuredProjects = projects.filter((p) => p.isFeatured)

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 344 // Card width (320px) + gap (24px)
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section id="projects" className="bg-black py-24 text-white relative overflow-hidden">
      {/* Background ambient red glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-600/10 blur-[130px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 1. Section Header */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-4 border-b border-zinc-800/80">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="red" size="md">
                  S02
                </Badge>
                <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold font-mono">
                  Full Stack Catalog
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase flex items-center gap-3">
                <span>VARDHAN</span>
                <span className="text-[#e50914]">ORIGINALS</span>
              </h2>
              <p className="mt-2 text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
                Featured productions and scalable web applications engineered with Java, Spring Boot,
                Python, and modern REST APIs.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-end">
              <span className="text-xs text-zinc-500 font-medium">
                {projects.length} Production{projects.length !== 1 ? 's' : ''} Released
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* 2. Featured Projects Grid */}
        <div className="space-y-6">
          <ScrollReveal direction="up" delay={0.15}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#e50914] animate-pulse" />
                <h3 className="text-lg sm:text-xl font-bold tracking-wide uppercase text-zinc-100">
                  Featured Premieres
                </h3>
              </div>
              <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                Season Highlights
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {featuredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  onClick={() => setSelectedProject(project)}
                  className="group relative h-80 rounded-xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-900/95 to-black border border-zinc-800 hover:border-red-600/60 transition-colors p-6 sm:p-8 flex flex-col justify-between cursor-pointer shadow-xl shadow-black/60"
                >
                  {/* Subtle hover gradient illumination */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-900/40 to-transparent pointer-events-none" />
                  <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/10 rounded-full blur-3xl group-hover:bg-red-600/20 transition-all pointer-events-none" />

                  {/* Card Top: Episode # and Badges */}
                  <div className="relative z-10 flex items-start justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="red" size="sm">
                        EP {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                      </Badge>
                      <Badge variant="outline" size="sm">
                        {project.category}
                      </Badge>
                    </div>

                    {/* Quick Link Buttons (stopPropagation) */}
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} GitHub repo`}
                          className="p-2 rounded-lg bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                          title="GitHub Source"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} Live demo`}
                          className="p-2 rounded-lg bg-[#e50914]/20 text-red-400 hover:bg-[#e50914] hover:text-white transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Card Middle: Title & Description */}
                  <div className="relative z-10 my-auto">
                    <h4 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-red-500 transition-colors tracking-tight">
                      {project.title}
                    </h4>
                    <p className="mt-2.5 text-zinc-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Card Bottom: Tech Stack & Play Prompt */}
                  <div className="relative z-10 pt-4 border-t border-zinc-800/80 flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-7">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="default" size="sm">
                          {tech}
                        </Badge>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="text-[11px] text-zinc-500 self-center font-mono">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300 group-hover:text-white flex-shrink-0 transition-colors">
                      <div className="p-1.5 rounded-full bg-white/10 group-hover:bg-[#e50914] transition-colors">
                        <Play className="w-3 h-3 fill-current" />
                      </div>
                      <span>Details</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* 3 & 4. All Projects Horizontal Scroll Rail */}
        <div className="space-y-6 pt-4">
          <ScrollReveal direction="up" delay={0.25}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold tracking-wide uppercase text-zinc-100 flex items-center gap-2">
                  <span>All Episodes & Productions</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Explore the full catalog — scroll horizontally to view all projects
                </p>
              </div>

              {/* Scroll Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleScroll('left')}
                  aria-label="Scroll left"
                  className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleScroll('right')}
                  aria-label="Scroll right"
                  className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Horizontal Rail Container */}
          <ScrollReveal direction="up" delay={0.3}>
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 px-1 horizontal-scroll"
            >
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedProject(project)}
                  className="w-[320px] flex-shrink-0 snap-start bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800/80 hover:border-zinc-700 transition-all group flex flex-col cursor-pointer shadow-lg shadow-black/40"
                >
                  {/* Top area: gradient placeholder / thumbnail */}
                  <div className="relative h-44 bg-gradient-to-br from-zinc-800 to-black overflow-hidden flex items-center justify-center p-4">
                    {project.thumbnail ? (
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600 group-hover:text-zinc-400 transition-colors select-none">
                        <Play className="w-10 h-10 mb-2 opacity-50 group-hover:opacity-100 group-hover:scale-110 group-hover:text-[#e50914] transition-all" />
                        <span className="text-[11px] uppercase tracking-wider font-mono text-zinc-500">
                          {project.slug}
                        </span>
                      </div>
                    )}

                    {/* Project category badge top-right */}
                    <div className="absolute top-3 right-3 z-10">
                      <Badge variant="subtle" size="sm">
                        {project.category}
                      </Badge>
                    </div>

                    {/* Hover overlay with 'View Details' button */}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 backdrop-blur-[2px]">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedProject(project)
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#e50914] hover:bg-[#b30710] text-white text-xs font-semibold rounded-full shadow-lg transition-transform hover:scale-105 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        View Details
                      </button>
                    </div>
                  </div>

                  {/* Bottom: title, description, tech stack badges, github/demo icons */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
                        {project.title}
                      </h4>
                      <p className="mt-2 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                        {project.shortDescription}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-zinc-800/80">
                      {/* Tech badges */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="default" size="sm">
                            {tech}
                          </Badge>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="text-[10px] text-zinc-500 self-center">
                            +{project.techStack.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Github / demo icons */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-zinc-400 hover:text-white transition-colors"
                              title="GitHub Repository"
                              aria-label="GitHub Repository"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-zinc-400 hover:text-white transition-colors"
                              title="Live Demo"
                              aria-label="Live Demo"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>

                        <span className="text-[11px] text-zinc-500 group-hover:text-zinc-300 font-medium transition-colors">
                          View details &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Project Modal Dialog */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}

export default Projects
