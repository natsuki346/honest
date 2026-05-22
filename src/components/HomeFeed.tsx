'use client'

import { useState } from 'react'
import { useTheme } from './ThemeProvider'
import { useHashtags } from './HashtagProvider'
import { PostCard } from './PostCard'
import { TagScrollBar } from './TagScrollBar'
import type { Post, PostType } from '@/lib/types'

type FeedTab = 'timeline' | 'following'

const TABS: { value: FeedTab; label: string }[] = [
  { value: 'timeline', label: 'タイムライン' },
  { value: 'following', label: 'フォロー中' },
]

export function HomeFeed({ posts }: { posts: Post[] }) {
  const { mode }             = useTheme()
  const { getFollowedByMode } = useHashtags()
  const [activeTab, setActiveTab] = useState<FeedTab>('timeline')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const postType: PostType = mode === 'shadow' ? 'shadow' : 'light'
  const followedTags = getFollowedByMode(postType)

  const byMode = activeTab === 'timeline'
    ? posts.filter(p => p.post_type === postType)
    : []

  const filtered = activeTag
    ? byMode.filter(p => p.tags?.includes(activeTag))
    : byMode

  return (
    <div className="min-h-full" style={{ background: 'var(--bg)', transition: 'background 0.3s ease' }}>

      {/* ── スティッキーヘッダー ── */}
      <header
        className="sticky top-0 z-10"
        style={{
          background: 'var(--header-bg)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        {/* ロゴ行 */}
        <div className="px-4 h-14 flex items-center" style={{ borderBottom: '1px solid var(--border)' }}>
          <div>
            <h1
              style={{
                color: 'var(--accent)',
                fontSize: '18px',
                fontWeight: 600,
                letterSpacing: '-0.5px',
                lineHeight: 1.2,
              }}
            >
              Honest
            </h1>
            <p className="text-[10px] leading-tight" style={{ color: 'var(--sub)' }}>光と影で、ありのままを</p>
          </div>
        </div>

        {/* タブバー */}
        <div className="flex">
          {TABS.map(tab => {
            const active = activeTab === tab.value
            return (
              <button
                key={tab.value}
                onClick={() => { setActiveTab(tab.value); setActiveTag(null) }}
                className="flex-1 flex items-center justify-center h-11 text-[13px]"
                style={{
                  fontWeight: 500,
                  color: active ? 'var(--accent)' : 'var(--sub)',
                  borderBottom: `2px solid ${active ? 'var(--tab-line)' : 'transparent'}`,
                  transition: 'color 0.2s ease, border-color 0.2s ease',
                }}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
        <div style={{ height: '1px', background: 'var(--border)', marginTop: '-1px' }} />

        {/* タグスクロールバー */}
        <div style={{ borderBottom: '1px solid var(--border)' }}>
          <TagScrollBar
            tags={followedTags}
            activeTag={activeTag}
            onSelect={setActiveTag}
          />
        </div>
      </header>

      {/* ── フィード ── */}
      <main className="pb-4">
        {filtered.length === 0 ? (
          <div
            className="flex flex-col items-center py-20 gap-3 text-sm px-4"
            style={{ color: 'var(--sub)' }}
          >
            {activeTab === 'following' ? (
              <><span className="text-4xl">👥</span><p>フォロー中のユーザーの投稿がここに表示されます</p></>
            ) : activeTag ? (
              <><span className="text-4xl">#</span><p>#{activeTag}の投稿はまだありません</p></>
            ) : (
              <><span className="text-4xl">{postType === 'light' ? '☀' : '🌑'}</span><p>まだ投稿がありません</p></>
            )}
          </div>
        ) : (
          filtered.map(post => (
            <PostCard key={post.id} post={post} onTagClick={setActiveTag} />
          ))
        )}
      </main>
    </div>
  )
}
