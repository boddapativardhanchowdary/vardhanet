import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Code2, Download, User } from 'lucide-react'
import { personalInfo, socialLinks } from '../data/portfolio'
import type { ActiveProfile } from '../types/portfolio'

export interface NavbarProps {
  activeProfile: ActiveProfile
  onProfileSwitch: () => void
}

interface NavLinkItem {
  label: string
  id: string
}

const navLinks: NavLinkItem[] = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'about' },
  { label: 'My Journey', id: 'journey' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Achievements', id: 'achievements' },
  { label: 'Contact', id: 'contact' },
]

export const Navbar: React.FC<NavbarProps> = ({ activeProfile, onProfileSwitch }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const getProfileBadgeColor = (profile: ActiveProfile): string => {
    switch (profile) {
      case 'recruiter':
        return 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]'
      case 'developer':
        return 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]'
      case 'creative':
        return 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]'
      default:
        return 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 w-full h-[64px] transition-colors duration-300 ${
          isScrolled
            ? 'bg-black/90 backdrop-blur border-b border-zinc-800/80 shadow-md shadow-black/40'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Monospace Red Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('hero')
            }}
            className="font-mono text-red-500 font-bold text-lg flex items-center gap-1.5 hover:text-red-400 transition"
            aria-label="Vardhan - Home"
          >
            <Code2 className="w-5 h-5 text-red-500" />
            <span>{'</>VARDHAN'}</span>
          </a>

          {/* Center Nav Links (Hidden on Mobile) */}
          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.id)
                }}
                className="text-sm text-zinc-400 hover:text-white transition"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Download Resume, Profile Button, Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.resumePdf || '/assets/resume.pdf'}
              download
              className="border border-zinc-700 hover:border-red-600 text-xs px-3 py-1.5 rounded transition flex items-center gap-1.5 text-zinc-300 hover:text-white"
              aria-label="Download Resume"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
              <span>Resume</span>
            </a>

            {/* Profile Icon Button with Active Profile Badge */}
            <button
              type="button"
              onClick={onProfileSwitch}
              className="border border-zinc-700 hover:border-red-600 text-xs px-3 py-1.5 rounded transition flex items-center gap-1.5 text-zinc-300 hover:text-white cursor-pointer relative"
              title={
                activeProfile
                  ? `Active Persona: ${activeProfile} (Click to switch)`
                  : 'Select Persona'
              }
              aria-label="Switch Persona Profile"
            >
              <User className="w-3.5 h-3.5" />
              {activeProfile && (
                <span
                  className={`w-2 h-2 rounded-full ${getProfileBadgeColor(activeProfile)}`}
                  aria-label={`Current profile: ${activeProfile}`}
                />
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 text-zinc-400 hover:text-white focus:outline-none transition cursor-pointer"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu-overlay"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="bg-black fixed inset-0 z-40 flex flex-col justify-between p-6 md:hidden overflow-y-auto"
          >
            {/* Top Bar inside overlay */}
            <div className="flex items-center justify-between h-16 border-b border-zinc-900">
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('hero')
                  setIsMobileMenuOpen(false)
                }}
                className="font-mono text-red-500 font-bold text-lg flex items-center gap-1.5"
              >
                <Code2 className="w-5 h-5 text-red-500" />
                <span>{'</>VARDHAN'}</span>
              </a>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-zinc-400 hover:text-white focus:outline-none transition cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Nav links large centered */}
            <nav
              className="flex-1 flex flex-col items-center justify-center gap-6 py-8"
              aria-label="Mobile Navigation"
            >
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(link.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className="text-2xl font-bold text-zinc-300 hover:text-red-500 transition tracking-wide"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Mobile Footer: Action Buttons & Social Links */}
            <div className="flex flex-col items-center gap-4 pt-6 border-t border-zinc-900">
              <div className="flex items-center gap-3">
                <a
                  href={personalInfo.resumePdf || '/assets/resume.pdf'}
                  download
                  className="border border-zinc-700 hover:border-red-600 text-xs px-3 py-1.5 rounded transition flex items-center gap-1.5 text-zinc-300 hover:text-white"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Resume</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    onProfileSwitch()
                    setIsMobileMenuOpen(false)
                  }}
                  className="border border-zinc-700 hover:border-red-600 text-xs px-3 py-1.5 rounded transition flex items-center gap-1.5 text-zinc-300 hover:text-white cursor-pointer"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Switch Profile</span>
                  {activeProfile && (
                    <span
                      className={`w-2 h-2 rounded-full ${getProfileBadgeColor(activeProfile)}`}
                    />
                  )}
                </button>
              </div>

              {socialLinks && socialLinks.length > 0 && (
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  {socialLinks.map((item) => (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-red-500 transition"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
