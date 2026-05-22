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
  const tagBg    = isLight ? '#F0A500' : '#9B8FFF'
  const tagColor = '#ffffff'
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
                className="rounded-full transition-opacity active:opacity-70"
                style={{
                  padding: '6px 14px',
                  fontSize: '13px',
                  fontWeight: 500,
                  background: tagBg,
                  color: tagColor,
                }}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        {/* ── アクションバー ── */}
        <div
          className="flex items-center justify-between"
          style={{ paddingTop: '8px', borderTop: '1px solid var(--border)' }}
        >
          {/* 左：スコア数字のみ */}
          <span
            className="text-[15px] font-semibold tabular-nums"
            style={{ color: liked ? accent : '#888888', transition: 'color 0.15s ease' }}
          >
            {(post.like_count ?? 0) + (liked ? 1 : 0)}
          </span>

          {/* 右：コメント＋共感ボタン */}
          <div className="flex items-center gap-2">
            {/* コメントボタン */}
            <button
              className="flex items-center gap-1 text-[12px]"
              style={{ color: '#888888' }}
            >
              <CommentIcon />
              <span>{post.reply_count ?? 0}</span>
            </button>

            {/* 共感ボタン（32×32、border-radius 8px） */}
            <button
              onClick={() => setLiked(p => !p)}
              className="flex items-center justify-center"
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background:  liked ? accent    : 'transparent',
                border:      liked ? 'none'    : '1px solid #444444',
                color:       liked ? '#ffffff' : '#888888',
                transition:  'background 0.15s ease, border 0.15s ease, color 0.15s ease, transform 0.1s ease',
              }}
              onPointerDown={e => (e.currentTarget.style.transform = 'scale(0.9)')}
              onPointerUp={e   => (e.currentTarget.style.transform = 'scale(1)')}
              onPointerLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <UpvoteIcon />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

function UpvoteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[15px] h-[15px]"
      fill="currentColor" stroke="none"
    >
      <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
      <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3v11z" />
    </svg>
  )
}

function CommentIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4"
      fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  )
}
