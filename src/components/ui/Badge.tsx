import React from 'react'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  variant?: 'default' | 'red' | 'outline' | 'secondary' | 'zinc' | 'subtle'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
  ...props
}) => {
  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-xs sm:text-sm px-3 py-1',
    lg: 'text-sm px-3.5 py-1.5',
  }

  const variantStyles = {
    default: 'bg-zinc-800 text-zinc-300 border border-zinc-700/60',
    zinc: 'bg-zinc-800/80 text-zinc-300 border border-zinc-700/50',
    secondary: 'bg-zinc-900 text-zinc-400 border border-zinc-800',
    red: 'bg-[#e50914] text-white font-semibold shadow-sm shadow-red-900/30',
    outline: 'border border-red-500/40 text-red-400 bg-red-950/20',
    subtle: 'bg-white/10 text-zinc-200 border border-white/10 backdrop-blur-sm',
  }

  return (
    <span
      className={`inline-flex items-center justify-center font-medium rounded tracking-wide transition-colors ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge
