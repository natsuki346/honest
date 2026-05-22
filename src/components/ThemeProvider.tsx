'use client'

import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { useFeedMode, type FeedMode } from '@/hooks/useFeedMode'

interface ThemeContextValue {
  mode: FeedMode
  toggle: (next: FeedMode) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: 'light',
  toggle: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { mode, toggle } = useFeedMode('light')

  useEffect(() => {
    const cl = document.documentElement.classList
    cl.remove('mode-light', 'mode-shadow')
    cl.add(mode === 'shadow' ? 'mode-shadow' : 'mode-light')
    /* 後方互換：data-mode も維持 */
    document.documentElement.setAttribute('data-mode', mode)
  }, [mode])

  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
