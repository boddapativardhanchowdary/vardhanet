import { useState, useEffect, lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLenis } from './hooks/useLenis'
import Navbar from './components/Navbar'
import type { ActiveProfile } from './types/portfolio'

// Heavy components - lazy loaded
const OpeningSequence = lazy(() => import('./components/OpeningSequence'))
const ProfileSelection = lazy(() => import('./components/ProfileSelection'))
const IntroModal = lazy(() => import('./components/IntroModal'))

// Sections
const Hero = lazy(() => import('./sections/Hero'))
const About = lazy(() => import('./sections/About'))
const Journey = lazy(() => import('./sections/Journey'))
const Projects = lazy(() => import('./sections/Projects'))
const TopPicks = lazy(() => import('./sections/TopPicks'))
const Skills = lazy(() => import('./sections/Skills'))
const Achievements = lazy(() => import('./sections/Achievements'))
const Contact = lazy(() => import('./sections/Contact'))

// Scroll progress bar
function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', updateProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-zinc-900">
      <motion.div
        className="h-full bg-red-600 origin-left"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0 }}
      />
    </div>
  )
}

type AppStage = 'opening' | 'profiles' | 'main'

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
        <span className="text-zinc-500 text-sm tracking-widest">LOADING</span>
      </div>
    </div>
  )
}

export default function App() {
  const [stage, setStage] = useState<AppStage>('opening')
  const [activeProfile, setActiveProfile] = useState<ActiveProfile>(null)
  const [introOpen, setIntroOpen] = useState(false)

  useLenis()

  // Check session storage for profile
  useEffect(() => {
    const saved = sessionStorage.getItem('vb-profile') as ActiveProfile
    if (saved) setActiveProfile(saved)
  }, [])

  const handleOpeningComplete = () => {
    setStage('profiles')
  }

  const handleProfileSelect = (profile: ActiveProfile) => {
    setActiveProfile(profile)
    if (profile) sessionStorage.setItem('vb-profile', profile)
    setStage('main')
  }

  return (
    <>
      {stage === 'main' && <ScrollProgressBar />}

      <AnimatePresence mode="wait">
        {stage === 'opening' && (
          <Suspense fallback={<LoadingFallback />}>
            <OpeningSequence key="opening" onComplete={handleOpeningComplete} />
          </Suspense>
        )}

        {stage === 'profiles' && (
          <Suspense fallback={<LoadingFallback />}>
            <ProfileSelection key="profiles" onSelect={handleProfileSelect} />
          </Suspense>
        )}

        {stage === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen bg-black"
          >
            <Navbar
              activeProfile={activeProfile}
              onProfileSwitch={() => setStage('profiles')}
            />

            <main>
              <Suspense fallback={<LoadingFallback />}>
                <Hero
                  onPlayIntro={() => setIntroOpen(true)}
                  activeProfile={activeProfile}
                />
                <About />
                <Journey />
                <Projects />
                <TopPicks />
                <Skills />
                <Achievements />
                <Contact />
              </Suspense>
            </main>

            <Suspense fallback={null}>
              <IntroModal
                isOpen={introOpen}
                onClose={() => setIntroOpen(false)}
              />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
