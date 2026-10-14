import React, { useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import {
  Mail,
  Github,
  Linkedin,
  Globe,
  ArrowRight,
  Heart,
  Copy,
  Check,
  ArrowUp,
} from 'lucide-react'
import { personalInfo, socialLinks } from '../data/portfolio'
import ScrollReveal from '../components/ui/ScrollReveal'

const CURRENT_YEAR = new Date().getFullYear()

export const Contact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false)

  // 7. Scroll progress bar at top of viewport (red thin line)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  const emailLink =
    socialLinks.find((s) => s.id === 'email')?.url ||
    `mailto:${personalInfo.email || 'vardhanboddapati1662004@gmail.com'}`
  const emailAddress = personalInfo.email || 'vardhanboddapati1662004@gmail.com'

  const linkedinLink =
    socialLinks.find((s) => s.id === 'linkedin')?.url ||
    'https://linkedin.com/in/vardhan-boddapati-920632255'

  const githubLink =
    socialLinks.find((s) => s.id === 'github')?.url ||
    'https://github.com/boddapatiyardhan/chowdary'

  const portfolioLink =
    socialLinks.find((s) => s.id === 'portfolio')?.url ||
    'https://portfolio-intro-vardhan.vercel.app'

  const copyToClipboard = (e: React.MouseEvent, text: string) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(text)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Contact cards row data
  const contactCards = [
    {
      id: 'email',
      title: 'Email Direct',
      value: emailAddress,
      description: 'Quickest response for roles, collaborations, and inquiries',
      href: emailLink,
      icon: Mail,
      actionText: 'Compose Email',
      canCopy: true,
      color: 'from-red-600/20 to-zinc-900',
    },
    {
      id: 'linkedin',
      title: 'LinkedIn Network',
      value: 'in/vardhan-boddapati-920632255',
      description: 'Connect professionally, view recommendations & updates',
      href: linkedinLink,
      icon: Linkedin,
      actionText: 'Connect on LinkedIn',
      canCopy: false,
      color: 'from-blue-600/20 to-zinc-900',
    },
    {
      id: 'github',
      title: 'GitHub Repos',
      value: 'github.com/boddapatiyardhan',
      description: 'Explore open source codebases, commits & project architectures',
      href: githubLink,
      icon: Github,
      actionText: 'Explore Repositories',
      canCopy: false,
      color: 'from-zinc-700/30 to-zinc-900',
    },
    {
      id: 'portfolio',
      title: 'Live Portfolio',
      value: 'portfolio-intro-vardhan.vercel.app',
      description: 'Production web deployment with interactive modules',
      href: portfolioLink,
      icon: Globe,
      actionText: 'Visit Live Site',
      canCopy: false,
      color: 'from-red-600/15 to-zinc-900',
    },
  ]

  return (
    <section id="contact" className="relative bg-black py-24 text-white overflow-hidden">
      {/* 7. Scroll Progress Bar at Top of Viewport (Red Thin Line) */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-0.5 bg-red-600 origin-left z-50 pointer-events-none shadow-[0_0_12px_rgba(229,9,20,0.85)]"
        style={{ scaleX }}
      />

      {/* Top ambient glowing line separating sections */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/70 to-transparent shadow-[0_0_15px_rgba(229,9,20,0.5)]" />

      {/* Background cinematic radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-950/25 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[300px] bg-red-950/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 1. Cinematic Closing Text */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <ScrollReveal direction="down">
            {/* Episode status eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-800/50 text-red-400 text-xs font-mono uppercase tracking-widest mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
              </span>
              <span>Season Finale &bull; Vardhan Studios</span>
            </div>

            {/* 'TO BE CONTINUED...' in large, dramatic white text */}
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
              TO BE CONTINUED<span className="text-red-600 animate-pulse">...</span>
            </h2>

            {/* Red glowing divider line with center accent */}
            <div className="mt-6 mb-6 flex items-center justify-center gap-3">
              <div className="h-0.5 w-16 sm:w-28 bg-gradient-to-r from-transparent via-red-600 to-red-600/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_12px_rgba(229,9,20,0.9)]" />
              <div className="h-0.5 w-16 sm:w-28 bg-gradient-to-l from-transparent via-red-600 to-red-600/80" />
            </div>

            {/* Subtitle: 'The next chapter starts with you' */}
            <p className="text-xl sm:text-2xl md:text-3xl text-zinc-300 font-light tracking-wide italic">
              &ldquo;The next chapter starts with you.&rdquo;
            </p>
          </ScrollReveal>

          {/* 5. Call-to-Action */}
          <ScrollReveal direction="up" delay={0.15}>
            <div className="mt-8 pt-6 max-w-2xl mx-auto">
              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-normal">
                Ready to collaborate? Let&apos;s build something great together.
              </p>

              {/* Status pill: Open to work */}
              <div className="mt-4 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for full-time Java/Full-Stack roles &amp; software engineering opportunities</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* 2. & 3. Contact Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {contactCards.map((card, index) => {
            const Icon = card.icon
            return (
              <ScrollReveal
                key={card.id}
                direction="up"
                delay={0.1 + index * 0.08}
                className="h-full"
              >
                <a
                  href={card.href}
                  target={card.id === 'email' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="group relative flex flex-col justify-between h-full bg-zinc-900 hover:bg-zinc-800 rounded-2xl p-6 border border-zinc-800 hover:border-red-600/60 shadow-lg hover:shadow-[0_0_30px_rgba(229,9,20,0.22)] transition-all duration-300"
                >
                  {/* Subtle card glow overlay on hover */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                  />

                  <div className="relative z-10">
                    {/* Header: Icon + Copy/External trigger */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-red-500 group-hover:border-red-500/50 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(229,9,20,0.35)] transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>

                      {card.canCopy && (
                        <button
                          type="button"
                          onClick={(e) => copyToClipboard(e, emailAddress)}
                          title="Copy Email Address"
                          className="px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-400 hover:text-white hover:border-zinc-700 flex items-center gap-1.5 transition-colors"
                        >
                          {copiedEmail ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Card Title */}
                    <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors mb-1">
                      {card.title}
                    </h3>

                    {/* Card Value / Handle */}
                    <p className="text-xs font-mono text-zinc-400 truncate mb-3">
                      {card.value}
                    </p>

                    {/* Card Description */}
                    <p className="text-xs text-zinc-500 leading-relaxed font-light">
                      {card.description}
                    </p>
                  </div>

                  {/* Card Action Link */}
                  <div className="relative z-10 pt-5 mt-5 border-t border-zinc-800/80 flex items-center justify-between text-xs font-medium text-zinc-300 group-hover:text-white">
                    <span className="group-hover:text-red-400 transition-colors">
                      {card.actionText}
                    </span>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-red-500 group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </a>
              </ScrollReveal>
            )
          })}
        </div>

        {/* 6. Footer Section */}
        <div className="pt-12 border-t border-zinc-800/80">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            {/* Studio Brand and Tagline */}
            <div className="space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="font-black text-sm tracking-wider uppercase text-white font-mono">
                  {personalInfo.studioLabel || 'VARDHAN STUDIOS'}
                </span>
                <span className="text-zinc-600">&bull;</span>
                <span className="text-xs font-mono text-red-500 tracking-wider">
                  ORIGINAL SERIES
                </span>
              </div>
              <p className="text-xs text-zinc-500">
                &copy; {CURRENT_YEAR} {personalInfo.name}. All rights reserved.
              </p>
            </div>

            {/* 'Made with ❤️ and Java' Joke */}
            <div className="text-xs text-zinc-400 flex items-center justify-center gap-1.5 font-mono">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline-block animate-pulse" />
              <span>and Java &bull; Zero memory leaks detected</span>
            </div>

            {/* Back to top button */}
            <div>
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Back to top"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:text-white hover:border-red-600/60 hover:bg-zinc-800 transition-all group"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3.5 h-3.5 text-zinc-400 group-hover:text-red-500 group-hover:-translate-y-0.5 transition-all" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
