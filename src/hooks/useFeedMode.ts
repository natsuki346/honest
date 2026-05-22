'use client'

import { useState, useCallback } from 'react'
import type { PostType } from '@/lib/types'

export type FeedMode = PostType | 'all'

export function useFeedMode(initial: FeedMode = 'all') {
  const [mode, setMode] = useState<FeedMode>(initial)

  const toggle = useCallback((next: FeedMode) => {
    setMode(next)
  }, [])

  return { mode, toggle }
}
