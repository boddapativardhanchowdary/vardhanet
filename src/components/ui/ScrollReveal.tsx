import React from 'react'
import { motion, type Variants } from 'framer-motion'

export type RevealDirection = 'up' | 'down' | 'left' | 'right'

export interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: RevealDirection
  distance?: number
  once?: boolean
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 30,
  once = true,
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 }
      case 'down':
        return { y: -distance, x: 0 }
      case 'left':
        return { x: distance, y: 0 }
      case 'right':
        return { x: -distance, y: 0 }
      default:
        return { y: distance, x: 0 }
    }
  }

  const initial = getInitialPosition()

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...initial,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal
