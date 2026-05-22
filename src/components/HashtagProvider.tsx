'use client'

import {
  createContext, useContext, useState, useEffect, useCallback,
  type ReactNode,
} from 'react'
import {
  ALL_HASHTAGS, DEFAULT_FOLLOWED_IDS, type Hashtag,
} from '@/lib/dummy-hashtags'

const STORAGE_KEY = 'honest_followed_tags'

interface HashtagContextValue {
  followedIds:      Set<string>
  isFollowing:      (id: string) => boolean
  follow:           (id: string) => void
  unfollow:         (id: string) => void
  toggleFollow:     (id: string) => void
  getFollowedByMode: (mode: 'light' | 'shadow') => Hashtag[]
}

const HashtagContext = createContext<HashtagContextValue>({
  followedIds:      DEFAULT_FOLLOWED_IDS,
  isFollowing:      () => false,
  follow:           () => {},
  unfollow:         () => {},
  toggleFollow:     () => {},
  getFollowedByMode: () => [],
})

export function HashtagProvider({ children }: { children: ReactNode }) {
  const [followedIds, setFollowedIds] = useState<Set<string>>(DEFAULT_FOLLOWED_IDS)

  /* localStorage から復元（クライアントのみ） */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setFollowedIds(new Set(JSON.parse(stored)))
    } catch {}
  }, [])

  /* localStorage に保存 */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...followedIds]))
    } catch {}
  }, [followedIds])

  const isFollowing = useCallback((id: string) => followedIds.has(id), [followedIds])

  const follow = useCallback((id: string) =>
    setFollowedIds(prev => new Set([...prev, id])), [])

  const unfollow = useCallback((id: string) =>
    setFollowedIds(prev => { const s = new Set(prev); s.delete(id); return s }), [])

  const toggleFollow = useCallback((id: string) =>
    setFollowedIds(prev => {
      const s = new Set(prev)
      s.has(id) ? s.delete(id) : s.add(id)
      return s
    }), [])

  const getFollowedByMode = useCallback(
    (mode: 'light' | 'shadow') =>
      ALL_HASHTAGS.filter(h => h.mode === mode && followedIds.has(h.id)),
    [followedIds],
  )

  return (
    <HashtagContext.Provider value={{ followedIds, isFollowing, follow, unfollow, toggleFollow, getFollowedByMode }}>
      {children}
    </HashtagContext.Provider>
  )
}

export function useHashtags() {
  return useContext(HashtagContext)
}
