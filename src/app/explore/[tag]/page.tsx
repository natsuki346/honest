'use client'

import { use } from 'react'
import Link from 'next/link'
import { useTheme } from '@/components/ThemeProvider'
import { PostCard } from '@/components/PostCard'
import { DUMMY_POSTS } from '@/lib/dummy-posts'

export default function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = use(params)
  const { mode } = useTheme()

  const decodedTag = decodeURIComponent(tag)
  const taggedPosts = DUMMY_POSTS.filter(p => p.tags?.includes(decodedTag))

  return (
    <div className="min-h-full" style={{ background: 'var(--bg)', transition: 'background 0.3s ease' }}>
      {/* ヘッダー */}
      <header
        className="sticky top-0 z-10"
        style={{
          background: 'var(--header-bg)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--divider)',
        }}
      >
        <div className="flex items-center gap-3 px-4 h-14">
          <Link
            href="/explore"
            className="w-8 h-8 flex items-center justify-center rounded-full shrink-0"
            style={{ color: 'var(--sub)' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-[17px] font-bold truncate" style={{ color: 'var(--text)' }}>
              #{decodedTag}
            </h1>
            <p className="text-[11px]" style={{ color: 'var(--sub)' }}>
              {taggedPosts.length}件の投稿
            </p>
          </div>
        </div>
      </header>

      {/* 投稿一覧 */}
      <main className="px-3 pt-3 pb-4 space-y-3">
        {taggedPosts.length === 0 ? (
          <div
            className="flex flex-col items-center py-20 gap-3 text-sm"
            style={{ color: 'var(--sub)' }}
          >
            <span className="text-4xl">#</span>
            <p>#{decodedTag}の投稿はまだありません</p>
          </div>
        ) : (
          taggedPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </main>
    </div>
  )
}
