'use client'

import { useTheme } from './ThemeProvider'

interface FABProps {
  onClick: () => void
}

export function FAB({ onClick }: FABProps) {
  const { mode } = useTheme()
  const isLight = mode !== 'shadow'

  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center active:scale-90"
      style={{
        width: 52,
        height: 52,
        borderRadius: 16,
        background: 'var(--accent)',
        boxShadow: isLight
          ? '0 0 20px rgba(240,165,0,0.35), 0 4px 16px rgba(0,0,0,0.12)'
          : '0 0 20px rgba(155,143,255,0.4), 0 4px 16px rgba(0,0,0,0.3)',
        transition: 'background-color 0.4s ease, box-shadow 0.4s ease, transform 0.15s ease',
      }}
      aria-label="投稿する"
    >
      {isLight ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
}
