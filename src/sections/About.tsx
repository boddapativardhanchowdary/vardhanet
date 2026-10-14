import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Target, Zap, Heart, Compass, Star, Check } from 'lucide-react'
import { personalInfo, about } from '../data/portfolio'
import ScrollReveal from '../components/ui/ScrollReveal'
import Badge from '../components/ui/Badge'

export const About: React.FC = () => {
  const bioParagraphs = about.bio.split('\n\n').filter((p) => p.trim().length > 0)

  return (
    <section id="about" className="relative bg-black py-24 text-white overflow-hidden">
      {/* Background cinematic vignette & accent glow */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-red-950/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-red-950/15 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 1. Section Header */}
        <div className="mb-14 md:mb-20">
          <ScrollReveal direction="up">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="red" className="tracking-widest uppercase font-mono text-xs px-2.5 py-1">
                S01 E01
              </Badge>
              <div className="h-px w-12 bg-red-600/40" />
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                Episode 01
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase">
              THE PILOT
            </h2>

            <p className="mt-3 text-lg sm:text-xl text-zinc-400 font-light tracking-wide">
              The Story So Far
            </p>
          </ScrollReveal>
        </div>

        {/* 2. Editorial Layout (2 columns on desktop, 1 on mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column (60%): Bio & Current Role Callout */}
          <div className="lg:col-span-7 space-y-8">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="space-y-6">
                {bioParagraphs.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-zinc-300 text-base sm:text-lg leading-relaxed font-light"
                  >
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </ScrollReveal>

            {/* Current Role Callout Box */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="border-l-4 border-red-600 bg-zinc-900/90 rounded-r-xl p-6 shadow-xl border-t border-r border-b border-zinc-800/60 backdrop-blur-sm">
                <div className="flex items-center gap-2.5 text-red-500 font-mono text-xs tracking-wider uppercase mb-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
                  </span>
                  <span>Currently at Magneq Software</span>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight">
                  {personalInfo.currentRole}
                </h3>

                <p className="mt-2 text-zinc-400 text-sm leading-relaxed">
                  Focusing on production-grade Java full-stack web applications, architecting clean REST API endpoints, designing relational databases, and integrating robust backend services.
                </p>

                <div className="mt-4 pt-4 border-t border-zinc-800/80 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500">
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <Compass className="w-3.5 h-3.5 text-red-500" />
                    {personalInfo.location}
                  </span>
                  <span className="text-zinc-600">&bull;</span>
                  <span className="text-zinc-400">
                    Active Internship
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column (40%): Strengths, Interests, Currently Learning */}
          <div className="lg:col-span-5 space-y-6">
            {/* Strengths Card */}
            <ScrollReveal direction="left" delay={0.15}>
              <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-6 shadow-xl backdrop-blur-sm hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-zinc-800">
                  <Star className="w-5 h-5 text-red-500" />
                  <h3 className="text-lg font-bold text-white tracking-wide uppercase">
                    Core Strengths
                  </h3>
                </div>

                <ul className="space-y-3.5">
                  {about.strengths.map((strength, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-600/20 text-red-500">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </span>
                      <span className="leading-snug">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Interests Card */}
            <ScrollReveal direction="left" delay={0.25}>
              <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-6 shadow-xl backdrop-blur-sm hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-zinc-800">
                  <Heart className="w-5 h-5 text-red-500" />
                  <h3 className="text-lg font-bold text-white tracking-wide uppercase">
                    Interests & Focus
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {about.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 text-xs font-medium rounded-md bg-zinc-800/90 text-zinc-300 border border-zinc-700/60 hover:border-red-500/50 hover:text-white transition-colors"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Currently Learning Card */}
            <ScrollReveal direction="left" delay={0.35}>
              <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-6 shadow-xl backdrop-blur-sm hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-zinc-800">
                  <BookOpen className="w-5 h-5 text-red-500" />
                  <h3 className="text-lg font-bold text-white tracking-wide uppercase">
                    Currently Learning
                  </h3>
                </div>

                <div className="space-y-2.5">
                  {about.currentLearning.map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-800/50 border border-zinc-800/80 hover:border-zinc-700 text-sm text-zinc-300 group cursor-default"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <Zap className="w-4 h-4 text-red-500 shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="truncate">{item}</span>
                      </div>
                      <span className="shrink-0 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-red-950/60 text-red-400 border border-red-900/50">
                        In Progress
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* 3. Career Objective Banner */}
        <ScrollReveal direction="up" delay={0.2} className="mt-16 md:mt-24">
          <div className="relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 p-8 sm:p-10 md:p-14 shadow-2xl">
            {/* Background cinematic radial glows */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-red-900/10 rounded-full blur-3xl pointer-events-none" />

            {/* Stylized background quote icon */}
            <span
              aria-hidden="true"
              className="absolute -top-3 left-6 text-8xl md:text-9xl font-serif text-zinc-800/30 select-none pointer-events-none leading-none"
            >
              &ldquo;
            </span>

            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-red-500 bg-red-950/40 px-3 py-1 rounded-full border border-red-900/40">
                <Target className="w-3.5 h-3.5" />
                <span>Career Objective</span>
              </div>

              <blockquote className="text-lg sm:text-xl md:text-2xl text-zinc-200 font-light italic leading-relaxed">
                &ldquo;{about.careerObjective}&rdquo;
              </blockquote>

              <div className="pt-3 flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-red-600/60" />
                <span className="text-xs uppercase font-mono tracking-wider text-zinc-400">
                  {personalInfo.name} &bull; {personalInfo.title}
                </span>
                <div className="h-px w-8 bg-red-600/60" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default About
