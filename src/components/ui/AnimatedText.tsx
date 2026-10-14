import React from 'react'
import { motion, type Variants } from 'framer-motion'

export interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  once?: boolean
}

const containerVariants = (delay: number): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: delay,
    },
  },
})

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  delay = 0,
  once = true,
}) => {
  const words = text.split(' ')

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={containerVariants(delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span variants={wordVariants} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

export default AnimatedText
