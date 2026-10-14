// ============================================================
// TypeScript Interfaces — src/types/portfolio.ts
// ============================================================

export interface SocialLink {
  id: string
  label: string
  url: string
  icon: string
}

export interface ViewerProfile {
  id: string
  label: string
  emoji: string
  description: string
  focusSections: string[]
  url?: string
}

export interface IntroSlide {
  id: number
  title: string
  subtitle: string
  body: string
  accent: string
  bg: string
  tags?: string[]
  cta?: { label: string; href: string }
}

export interface JourneyEpisode {
  id: string
  episode: number
  title: string
  organization: string
  duration: string
  location?: string
  description: string
  skills: string[]
  badge?: string
  type: 'education' | 'internship' | 'certification' | 'achievement'
  isCurrent?: boolean
  credentialUrl?: string
  image?: string
}

export interface JourneySeason {
  id: string
  season: number
  title: string
  subtitle: string
  episodes: JourneyEpisode[]
}

export interface Project {
  id: string
  title: string
  slug: string
  shortDescription: string
  overview: string
  problem: string
  features: string[]
  techStack: string[]
  category: string
  github: string
  demo: string
  thumbnail: string
  screenshots: string[]
  highlights: string[]
  isFeatured: boolean
  tags: string[]
}

export interface Skill {
  id: string
  name: string
  usedIn: string[]
  description?: string
}

export interface SkillCategory {
  id: string
  label: string
  icon: string
  skills: Skill[]
}

export interface Achievement {
  id: string
  title: string
  issuer: string
  date: string
  type: 'certification' | 'achievement' | 'award'
  description: string
  verifyUrl?: string
  badge: string
  color: string
  image?: string
}

export interface FeaturedPick {
  id: string
  rank: number
  title: string
  category: string
  description: string
  tags: string[]
  projectId?: string
}

export interface Profile {
  id: string
  type: 'recruiter' | 'developer' | 'creative'
  name: string
  description: string
}

export type ActiveProfile = 'recruiter' | 'developer' | 'creative' | null
