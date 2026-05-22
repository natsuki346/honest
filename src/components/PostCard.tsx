'use client'

import { useState } from 'react'
import type { Post } from '@/lib/types'

interface PostCardProps {
  post: Post
  onTagClick?: (tag: string) => void
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60_000)
  if (m < 1)  return 'たった今'
  if (m < 60) return `${m}分前`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}時間前`
  return `${Math.floor(h / 24)}日前`
}

export function PostCard({ post, onTagClick }: PostCardProps) {
  const isLight = post.post_type === 'light'
  const [liked, setLiked] = useState(false)

  /* ── カラー定義 ── */
  const accent      = isLight ? '#F0A500' : '#9B8FFF'
  const avatarBg    = isLight
    ? 'linear-gradient(135deg, #FFF3CC, #FFD878)'
    : 'linear-gradient(135deg, #1E1240, #2D1A5E)'
  const tagBg       = isLight ? '#FFF8E6' : '#1A1830'
  const tagColor    = isLight ? '#C07800' : '#9B8FFF'
  const displayName = isLight ? `@${post.profiles.username}` : '匿名'
  const initial     = isLight ? post.profiles.username[0].toUpperCase() : '?'

  return (
    <article
      style={{
        background:   'var(--card)',
        borderLeft:   `3px solid ${accent}`,
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ padding: '16px' }}>

        {/* ── ヘッダー ── */}
        <div className="flex items-center gap-3" style={{ marginBottom: '8px' }}>
          <div
            className="rounded-full flex items-center justify-center text-[15px] font-bold shrink-0"
            style={{ width: 40, height: 40, background: avatarBg, color: accent }}
          >
            {initial}
          </div>
          <span
            className="text-[13px] font-semibold flex-1 truncate"
            style={{ color: 'var(--text)' }}
          >
            {displayName}
          </span>
          <span className="text-[11px] shrink-0" style={{ color: 'var(--sub)' }}>
            {relativeTime(post.created_at)}
          </span>
        </div>

        {/* ── 本文 ── */}
        <p
          className="text-[14px] leading-relaxed"
          style={{ color: 'var(--text)', marginBottom: '10px' }}
        >
          {post.content}
        </p>

        {/* ── ハッシュタグバッジ ── */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5" style={{ marginBottom: '12px' }}>
            {post.tags.map(tag => (
              <button
                key={tag}
                onClick={() => onTagClick?.(tag)}
                className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-opacity active:opacity-70"
                style={{ background: tagBg, color: tagColor }}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        {/* ── アクションバー ── */}
        <div
          className="flex items-center gap-5"
          style={{ paddingTop: '8px', borderTop: '1px solid var(--border)' }}
        >
          <button
            onClick={() => setLiked(p => !p)}
            className="flex items-center gap-1.5 text-[12px] transition-colors active:scale-90"
            style={{ color: liked ? accent : 'var(--sub)' }}
          >
            <HeartIcon filled={liked} />
            <span>{(post.like_count ?? 0) + (liked ? 1 : 0)}</span>
          </button>

          <button
            className="flex items-center gap-1.5 text-[12px] active:scale-90 transition-transform"
            style={{ color: 'var(--sub)' }}
          >
            <ReplyIcon />
            <span>{post.reply_count ?? 0}</span>
          </button>
        </div>
      </div>
    </article>
  )
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  )
}

function ReplyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4"
      fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  )
}
