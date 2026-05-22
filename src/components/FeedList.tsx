'use client'

import { useTheme } from './ThemeProvider'
import { PostCard } from './PostCard'
import type { Post } from '@/lib/types'

interface FeedListProps {
  posts: Post[]
}

export function FeedList({ posts }: FeedListProps) {
  const { mode } = useTheme()

  const filtered = mode === 'all' ? posts : posts.filter((p) => p.post_type === mode)

  if (filtered.length === 0) {
    return (
      <div className="text-center py-16 opacity-40">
        <p className="text-4xl mb-3">{mode === 'light' ? '☀' : mode === 'shadow' ? '🌑' : '◎'}</p>
        <p className="text-sm">まだ投稿がありません</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {filtered.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
