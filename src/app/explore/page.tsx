'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from '@/components/ThemeProvider'
import { useHashtags } from '@/components/HashtagProvider'
import { LIGHT_HASHTAGS, SHADOW_HASHTAGS } from '@/lib/dummy-hashtags'

export default function ExplorePage() {
  const { mode }                         = useTheme()
  const { isFollowing, toggleFollow }    = useHashtags()
  const isLight = mode !== 'shadow'
  const [query, setQuery] = useState('')

  const baseList = isLight ? LIGHT_HASHTAGS : SHADOW_HASHTAGS
  const filtered = query
    ? baseList.filter(h => h.name.includes(query.replace('#', '')))
    : baseList

  return (
    <div className="min-h-full" style={{ background: 'var(--bg)', transition: 'background 0.3s ease' }}>

      {/* 検索バー（スティッキー） */}
      <div
        className="sticky top-0 z-10 px-4 py-3"
        style={{
          background: 'var(--header-bg)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--divider)',
        }}
      >
        <div
          className="flex items-center gap-3 px-4 py-2.5 rounded-2xl"
          style={{ background: 'var(--card)', border: '1px solid var(--divider)' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
            strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"
            style={{ color: 'var(--sub)' }}>
            <circle cx="11" cy="11" r="7.5" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={isLight ? '光のタグを検索...' : '影のタグを検索...'}
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: 'var(--text)' }}
          />
          {query && (
            <button onClick={() => setQuery('')} className="shrink-0 text-xs" style={{ color: 'var(--sub)' }}>✕</button>
          )}
        </div>
      </div>

      {/* タググリッド */}
      <div className="px-4 py-4">
        <h2 className="text-[13px] font-semibold mb-3" style={{ color: 'var(--sub)' }}>
          {isLight ? '☀ 光のハッシュタグ' : '🌑 影のハッシュタグ'}
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {filtered.map(hashtag => {
            const following = isFollowing(hashtag.id)
            return (
              <div
                key={hashtag.id}
                className="rounded-2xl p-4"
                style={{
                  background: 'var(--card)',
                  border: `1px solid ${following ? 'var(--accent)' : 'var(--divider)'}`,
                  transition: 'border-color 0.2s ease',
                }}
              >
                {/* タグ名リンク */}
                <Link href={`/explore/${encodeURIComponent(hashtag.name)}`} className="block">
                  <p className="text-[11px] mb-1" style={{ color: 'var(--sub)' }}>ハッシュタグ</p>
                  <p className="text-base font-bold" style={{ color: 'var(--accent)' }}>
                    #{hashtag.name}
                  </p>
                  <p className="text-[11px] mt-1" style={{ color: 'var(--sub)' }}>
                    {hashtag.postCount.toLocaleString()}件の投稿
                  </p>
                </Link>

                {/* フォローボタン */}
                <button
                  onClick={() => toggleFollow(hashtag.id)}
                  className="mt-3 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-full text-[12px] font-semibold transition-all active:scale-95"
                  style={following ? {
                    background: 'var(--accent)',
                    color: 'white',
                  } : {
                    background: 'transparent',
                    color: 'var(--accent)',
                    border: '1.5px solid var(--accent)',
                  }}
                >
                  {following ? (
                    <><CheckIcon /><span>フォロー中</span></>
                  ) : (
                    <span>+ フォロー</span>
                  )}
                </button>
              </div>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-sm" style={{ color: 'var(--sub)' }}>
            「{query}」に一致するタグがありません
          </div>
        )}
      </div>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}
