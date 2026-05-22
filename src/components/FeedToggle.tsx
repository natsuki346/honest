'use client'

import { useTheme } from './ThemeProvider'
import type { FeedMode } from '@/hooks/useFeedMode'

const buttons: { label: string; value: FeedMode; icon: string }[] = [
  { label: 'すべて', value: 'all', icon: '◎' },
  { label: '光', value: 'light', icon: '☀' },
  { label: '影', value: 'shadow', icon: '🌑' },
]

export function FeedToggle() {
  const { mode, toggle } = useTheme()

  return (
    <div className="flex gap-2 p-1 rounded-full bg-black/5 dark:bg-white/5 backdrop-blur">
      {buttons.map((btn) => (
        <button
          key={btn.value}
          onClick={() => toggle(btn.value)}
          className={[
            'flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300',
            mode === btn.value
              ? btn.value === 'light'
                ? 'bg-amber-400 text-amber-900 shadow-md shadow-amber-200'
                : btn.value === 'shadow'
                ? 'bg-slate-700 text-slate-100 shadow-md shadow-slate-500/30'
                : 'bg-white text-slate-800 shadow-md'
              : 'text-slate-500 hover:text-slate-700',
          ].join(' ')}
        >
          <span>{btn.icon}</span>
          <span>{btn.label}</span>
        </button>
      ))}
    </div>
  )
}
