import React, { useEffect, useRef, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Play, Download, Github, Linkedin } from 'lucide-react'
import { personalInfo, socialLinks } from '../data/portfolio'
import type { ActiveProfile } from '../types/portfolio'
import ScrollReveal from '../components/ui/ScrollReveal'

export interface HeroProps {
  onPlayIntro: () => void
  activeProfile: ActiveProfile
}

const TECH_BADGES = [
  { name: 'Java', delay: 0 },
  { name: 'Spring Boot', delay: 0.15 },
  { name: 'MySQL', delay: 0.3 },
  { name: 'REST APIs', delay: 0.45 },
  { name: 'HTML/CSS', delay: 0.6 },
  { name: 'JavaScript', delay: 0.75 },
]

export const Hero: React.FC<HeroProps> = ({ onPlayIntro, activeProfile }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  // Preload portrait image for immediate high-quality render
  useEffect(() => {
    const portraitSrc = personalInfo.portrait || '/assets/portrait.jpg'
    const img = new Image()
    img.src = portraitSrc
  }, [])

  // Parallax scrolling for the portrait frame
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 80])

  // Get social urls
  const githubUrl =
    socialLinks.find((s) => s.id === 'github')?.url ||
    'https://github.com/boddapatiyardhan/chowdary'
  const linkedinUrl =
    socialLinks.find((s) => s.id === 'linkedin')?.url ||
    'https://linkedin.com/in/vardhan-boddapati-920632255'

  // Deterministic animated particles
  const particles = useMemo(
    () => [
      { top: '12%', left: '8%', size: 3, duration: 4.2, delay: 0.1 },
      { top: '22%', left: '82%', size: 2, duration: 5.1, delay: 0.8 },
      { top: '38%', left: '18%', size: 4, duration: 3.6, delay: 0.4 },
      { top: '55%', left: '74%', size: 3, duration: 4.8, delay: 1.2 },
      { top: '68%', left: '32%', size: 2, duration: 5.5, delay: 1.9 },
      { top: '78%', left: '88%', size: 3, duration: 3.9, delay: 0.7 },
      { top: '28%', left: '48%', size: 2.5, duration: 5.3, delay: 1.4 },
      { top: '15%', left: '62%', size: 3.5, duration: 4.4, delay: 2.0 },
      { top: '84%', left: '12%', size: 4, duration: 5.2, delay: 0.3 },
      { top: '48%', left: '92%', size: 2, duration: 4.6, delay: 1.6 },
      { top: '90%', left: '58%', size: 3, duration: 4.0, delay: 2.3 },
      { top: '35%', left: '4%', size: 2.5, duration: 6.0, delay: 1.0 },
      { top: '62%', left: '42%', size: 3, duration: 4.7, delay: 1.7 },
      { top: '8%', left: '40%', size: 2, duration: 5.0, delay: 2.1 },
    ],
    []
  )

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('about') || document.querySelector('section:not(#hero)')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Profile-specific label badge
  const profileLabel = useMemo(() => {
    if (activeProfile === 'recruiter') return 'RECRUITER EDITION'
    if (activeProfile === 'developer') return 'DEV CUT'
    if (activeProfile === 'creative') return 'DIRECTOR CUT'
    return null
  }, [activeProfile])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full bg-black text-white flex items-center justify-center overflow-hidden pt-20 pb-16 lg:py-0"
    >
      {/* ── BACKGROUND ELEMENTS ───────────────────────────────────── */}

      {/* Subtle radial gradient glow (red) at top-right */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute -top-32 -right-32 w-[550px] sm:w-[700px] h-[550px] sm:h-[700px] bg-[radial-gradient(circle,rgba(229,9,20,0.18)_0%,rgba(229,9,20,0.06)_40%,transparent_75%)] rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Secondary subtle glow at bottom-left */}
      <div
        className="absolute -bottom-40 -left-40 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(229,9,20,0.1)_0%,transparent_70%)] rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Light streaks (2-3 diagonal thin lines animating opacity & position) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{
            opacity: [0.08, 0.28, 0.08],
            x: ['-25%', '125%'],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/4 -left-1/3 w-[160%] h-[1px] bg-gradient-to-r from-transparent via-red-600/40 to-transparent -rotate-12 pointer-events-none"
        />

        <motion.div
          animate={{
            opacity: [0.04, 0.2, 0.04],
            x: ['-30%', '115%'],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear',
            delay: 3.5,
          }}
          className="absolute top-2/3 -left-1/3 w-[160%] h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent -rotate-12 pointer-events-none"
        />

        <motion.div
          animate={{
            opacity: [0.06, 0.22, 0.06],
            x: ['110%', '-30%'],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'linear',
            delay: 1.5,
          }}
          className="absolute top-1/2 -right-1/3 w-[160%] h-[1px] bg-gradient-to-r from-transparent via-zinc-400/20 to-transparent -rotate-12 pointer-events-none"
        />
      </div>

      {/* Animated particles (14 dots with subtle pulse and float) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {particles.map((p, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-red-500/70"
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              y: [0, -14, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Cinematic subtle background grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]"
        aria-hidden="true"
      />

      {/* ── MAIN CONTENT CONTAINER ─────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* ── LEFT COLUMN (60% on desktop, full on mobile) ─────────── */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-7">
            
            {/* Top label: 'SEASON 1 · EPISODE 0 · PILOT' in red, small caps, letter-spacing */}
            <ScrollReveal direction="down" delay={0.1}>
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-600/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-[#e50914] animate-pulse" />
                  <span className="text-[#e50914] text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] uppercase">
                    SEASON 1 · EPISODE 0 · PILOT
                  </span>
                </div>

                {profileLabel && (
                  <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/60">
                    {profileLabel}
                  </span>
                )}
              </div>
            </ScrollReveal>

            {/* Developer name: 'VARDHAN' on one line then 'BODDAPATI' below — massive text */}
            <ScrollReveal direction="up" delay={0.2}>
              <h1 className="font-black tracking-tight text-white uppercase select-none leading-[0.88] text-[clamp(60px,8.5vw,100px)]">
                <span className="block drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
                  VARDHAN
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
                  BODDAPATI
                </span>
              </h1>
            </ScrollReveal>

            {/* Role: 'Full Stack Java Developer' in zinc-400, text-xl */}
            <ScrollReveal direction="up" delay={0.3}>
              <div className="flex items-center gap-3">
                <div className="h-0.5 w-8 bg-[#e50914] rounded-full" />
                <p className="text-xl sm:text-2xl font-medium tracking-wide text-zinc-400">
                  {personalInfo.title || 'Full Stack Java Developer'}
                </p>
              </div>
            </ScrollReveal>

            {/* Short summary paragraph */}
            <ScrollReveal direction="up" delay={0.4}>
              <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-xl font-light">
                {personalInfo.summary ||
                  'Computer Science undergraduate with hands-on experience as a Java Full Stack Developer Intern. Proficient in Java, Spring Boot, REST APIs, MySQL, HTML/CSS, and JavaScript.'}
              </p>
            </ScrollReveal>

            {/* Two buttons: 'Explore Portfolio' (solid red bg) and 'Download Resume' (outline) */}
            <ScrollReveal direction="up" delay={0.5}>
              <div className="flex flex-wrap items-center gap-4 pt-1">
                {/* Explore Portfolio — solid red */}
                <button
                  type="button"
                  onClick={onPlayIntro}
                  className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 bg-[#e50914] hover:bg-[#b30710] text-white font-bold text-sm tracking-wide rounded-md shadow-lg shadow-red-950/60 hover:shadow-red-600/40 transition-all duration-300 transform active:scale-95 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white text-white group-hover:scale-110 transition-transform duration-200" />
                  <span>Explore Portfolio</span>
                </button>

                {/* Download Resume — outline */}
                <a
                  href={personalInfo.resumePdf || '/assets/resume.pdf'}
                  download="Vardhan_Boddapati_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 border border-zinc-700 hover:border-zinc-400 bg-zinc-900/60 hover:bg-zinc-850 text-zinc-200 hover:text-white font-semibold text-sm tracking-wide rounded-md backdrop-blur-sm transition-all duration-300 transform active:scale-95"
                >
                  <Download className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                  <span>Download Resume</span>
                </a>
              </div>
            </ScrollReveal>

            {/* Social links row: GitHub, LinkedIn icons */}
            <ScrollReveal direction="up" delay={0.6}>
              <div className="flex items-center gap-4 pt-2">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                  Connect:
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="p-2.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-400 hover:text-white hover:border-red-600/60 hover:bg-zinc-800 transition-all duration-300 hover:scale-110 shadow-sm"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="p-2.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-400 hover:text-white hover:border-red-600/60 hover:bg-zinc-800 transition-all duration-300 hover:scale-110 shadow-sm"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Floating tech badges: small pill badges that float with gentle animation */}
            <ScrollReveal direction="up" delay={0.7}>
              <div className="pt-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  {TECH_BADGES.map((badge, idx) => (
                    <motion.div
                      key={badge.name}
                      animate={{
                        y: [0, -6, 0],
                      }}
                      transition={{
                        duration: 3 + (idx % 3) * 0.8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: badge.delay,
                      }}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-zinc-900/90 text-zinc-300 border border-zinc-800/90 shadow-sm hover:border-red-600/60 hover:text-white hover:bg-zinc-850 transition-colors cursor-default"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e50914]" />
                      <span>{badge.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* ── RIGHT COLUMN (40% on desktop, hidden on mobile) ──────── */}
          <div className="hidden lg:flex lg:col-span-5 items-center justify-center pl-4">
            <ScrollReveal direction="left" delay={0.3} className="w-full max-w-sm xl:max-w-md">
              <motion.div
                style={{ y: portraitY }}
                className="relative rounded-lg overflow-hidden bg-zinc-900 border-l-4 border-[#e50914] shadow-2xl shadow-red-950/30 group"
              >
                {/* Cinematic camera viewfinder corner decorations */}
                <div
                  className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-red-500/80 pointer-events-none z-30"
                  aria-hidden="true"
                />
                <div
                  className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-red-500/80 pointer-events-none z-30"
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-red-500/80 pointer-events-none z-30"
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-red-500/80 pointer-events-none z-30"
                  aria-hidden="true"
                />

                {/* Subtle scan-line overlay (repeating gradient) */}
                <div
                  className="absolute inset-0 pointer-events-none z-20 opacity-25 mix-blend-overlay"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.4) 2px, rgba(0, 0, 0, 0.4) 4px)',
                  }}
                  aria-hidden="true"
                />

                {/* Top/Bottom Cinematic subtle vignettes */}
                <div
                  className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/60 to-transparent z-10 pointer-events-none"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/60 to-transparent z-10 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Developer portrait image with grayscale(20%) filter */}
                <div className="relative w-full aspect-[4/5] bg-zinc-950 overflow-hidden">
                  <img
                    src={personalInfo.portrait || '/assets/portrait.jpg'}
                    alt={personalInfo.nameFull || 'Vardhan Boddapati'}
                    className="w-full h-full object-cover object-top filter grayscale-[20%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                    loading="eager"
                  />
                </div>

                {/* Cinematic HUD details overlay on image */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#e50914] animate-ping" />
                  <span className="text-[10px] font-mono font-semibold tracking-widest text-zinc-300 uppercase bg-black/60 backdrop-blur-md px-2 py-0.5 rounded">
                    PROTAGONIST
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-zinc-300 font-medium tracking-wider">
                      JAVA STACK
                    </span>
                  </div>
                  <span className="text-zinc-500 tracking-widest uppercase">
                    24 FPS · 4K UHD
                  </span>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>

        </div>
      </div>

      {/* ── BOTTOM ANIMATED CHEVRON DOWN ARROW ─────────────────────── */}
      <motion.div
        animate={{
          y: [0, 8, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        onClick={scrollToNextSection}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer text-zinc-400 hover:text-white transition-colors z-20"
        aria-label="Scroll to next section"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 select-none">
          EXPLORE
        </span>
        <ChevronDown className="w-5 h-5 text-[#e50914]" />
      </motion.div>
    </section>
  )
}

export default Hero
