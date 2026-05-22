'use client'

import { useState, useRef, useEffect } from 'react'
import type { PostType } from '@/lib/types'

const SUGGESTED_TAGS = ['仕事', '恋愛', '家族', 'お金', '健康', '将来', '人間関係']
const MAX_CHARS = 500

interface PostModalProps {
  onClose: () => void
}

export function PostModal({ onClose }: PostModalProps) {
  const [postType, setPostType] = useState<PostType>('light')
  const [content, setContent] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const isLight = postType === 'light'

  /* ---- テーマカラー ---- */
  const bg         = isLight ? '#ffffff'  : '#15202b'
  const text       = isLight ? '#0f1419'  : '#e7e9ea'
  const subtext    = isLight ? '#536471'  : '#8b98a5'
  const divider    = isLight ? '#eff3f4'  : '#2f3336'
  const accentBtn  = isLight ? '#fbbf24'  : '#1d2d3e'
  const accentText = isLight ? '#78350f'  : '#e7e9ea'
  const iconColor  = isLight ? '#f59e0b'  : '#7c3aed'

  const tagDefault  = isLight
    ? 'border-amber-200 bg-amber-50 text-amber-700'
    : 'border-slate-600 bg-slate-700/50 text-slate-300'
  const tagSelected = isLight
    ? 'border-amber-400 bg-amber-400 text-amber-900'
    : 'border-violet-500 bg-violet-600 text-white'

  /* ---- 文字数リング ---- */
  const r = 10
  const circ = 2 * Math.PI * r
  const ratio = Math.min(content.length / MAX_CHARS, 1)
  const remaining = MAX_CHARS - content.length
  const nearLimit = remaining <= 20
  const ringColor = nearLimit ? '#f43f5e' : iconColor
  const strokeOffset = circ * (1 - ratio)

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [onClose])

  useEffect(() => {
    const id = setTimeout(() => textareaRef.current?.focus(), 60)
    return () => clearTimeout(id)
  }, [])

  const toggleTag = (tag: string) =>
    setSelectedTags(p => p.includes(tag) ? p.filter(t => t !== tag) : [...p, tag])

  const canPost = content.trim().length > 0

  return (
    /*
      fixed inset-0 でビューポート全体を覆う。
      モーダルコンテンツは max-w-[390px] mx-auto で phone frame に収める。
      modal-slide-down アニメーションで上からスライドイン。
    */
    <div
      className="modal-slide-down fixed inset-0 z-[60] flex flex-col"
      style={{ background: bg, transition: 'background-color 0.3s ease' }}
    >
      <div className="w-full max-w-[390px] mx-auto flex flex-col h-full">

        {/* ── ヘッダー ── */}
        <header
          className="shrink-0 flex items-center justify-between px-4"
          style={{ height: '56px', borderBottom: `1px solid ${divider}` }}
        >
          <button
            onClick={onClose}
            className="text-[15px] font-medium"
            style={{ color: text }}
          >
            キャンセル
          </button>

          <button
            onClick={() => { if (canPost) onClose() }}
            disabled={!canPost}
            className="px-5 py-2 rounded-full text-[14px] font-bold transition-all disabled:opacity-40"
            style={{ background: accentBtn, color: accentText }}
          >
            {isLight ? '光として投稿' : '影として投稿'}
          </button>
        </header>

        {/* ── スクロール可能なコンテンツ ── */}
        <div className="min-h-0 flex-1 overflow-y-auto">

          {/* アバター + テキストエリア（X レイアウト） */}
          <div className="flex gap-3 px-4 pt-4">
            {/* アバタープレースホルダー */}
            <div
              className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center overflow-hidden"
              style={{ background: isLight ? '#e2e8f0' : '#2d3748' }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" style={{ color: isLight ? '#94a3b8' : '#4a5568' }}>
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>

            {/* 右カラム */}
            <div className="flex-1 min-w-0">
              {/* テキストエリア */}
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value.slice(0, MAX_CHARS))}
                placeholder={isLight ? '今の誇らしい自分を正直に...' : '今抱えているものを正直に...'}
                rows={5}
                className="w-full resize-none outline-none bg-transparent text-[17px] leading-relaxed"
                style={{
                  color: text,
                  caretColor: iconColor,
                }}
              />

              {/* 光 / 影 インライントグル */}
              <div
                className="flex gap-2 pt-3 pb-3"
                style={{ borderBottom: `1px solid ${divider}` }}
              >
                <ToggleChip
                  active={isLight}
                  onClick={() => setPostType('light')}
                  activeCls="bg-amber-400 border-amber-400 text-amber-900"
                  inactiveCls={`border-current`}
                  inactiveStyle={{ color: subtext }}
                  icon="☀"
                  label="光"
                />
                <ToggleChip
                  active={!isLight}
                  onClick={() => setPostType('shadow')}
                  activeCls="bg-violet-600 border-violet-600 text-white"
                  inactiveCls={`border-current`}
                  inactiveStyle={{ color: subtext }}
                  icon="🌑"
                  label="影"
                />
              </div>

              {/* 選択済みタグ */}
              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-3">
                  {selectedTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border transition-all ${tagSelected}`}
                    >
                      <span>#{tag}</span>
                      <span className="opacity-60 text-[10px] ml-0.5">✕</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── ハッシュタグサジェスト ── */}
          <div
            className="px-4 py-4 mt-2"
            style={{ borderTop: `1px solid ${divider}` }}
          >
            <p className="text-xs font-semibold mb-3" style={{ color: subtext }}>
              よく使われるタグ
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    selectedTags.includes(tag) ? tagSelected : tagDefault
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── ボトムツールバー ── */}
        <div
          className="shrink-0 flex items-center justify-between px-4"
          style={{
            height: '48px',
            paddingBottom: 'env(safe-area-inset-bottom)',
            borderTop: `1px solid ${divider}`,
          }}
        >
          {/* 左：アイコン群 */}
          <div className="flex items-center gap-5">
            {/* 画像 */}
            <button style={{ color: iconColor }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <rect x="3" y="3" width="18" height="18" rx="2.5" />
                <path d="M3 16l5-5 4 4 3-3 6 6" />
                <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </button>
            {/* ハッシュタグ */}
            <button style={{ color: iconColor }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-5 h-5">
                <line x1="4" y1="9" x2="20" y2="9" />
                <line x1="4" y1="15" x2="20" y2="15" />
                <line x1="10" y1="3" x2="8" y2="21" />
                <line x1="16" y1="3" x2="14" y2="21" />
              </svg>
            </button>
          </div>

          {/* 右：文字数リング */}
          <div className="flex items-center gap-2">
            <svg width="22" height="22" viewBox="0 0 24 24" className="-rotate-90">
              <circle cx="12" cy="12" r={r} fill="none" stroke={isLight ? '#e5e7eb' : '#374151'} strokeWidth="2.5" />
              <circle
                cx="12" cy="12" r={r}
                fill="none"
                stroke={ringColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={circ}
                strokeDashoffset={strokeOffset}
                style={{ transition: 'stroke-dashoffset 0.1s ease, stroke 0.2s ease' }}
              />
            </svg>
            {nearLimit && (
              <span
                className="text-sm font-medium tabular-nums"
                style={{ color: remaining <= 0 ? '#f43f5e' : subtext }}
              >
                {remaining}
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

/* ---- ToggleChip サブコンポーネント ---- */
function ToggleChip({
  active, onClick, activeCls, inactiveCls, inactiveStyle, icon, label,
}: {
  active: boolean
  onClick: () => void
  activeCls: string
  inactiveCls: string
  inactiveStyle?: React.CSSProperties
  icon: string
  label: string
}) {
  return (
    <button
      onClick={onClick}
      className={[
        'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all',
        active ? activeCls : `${inactiveCls} opacity-50`,
      ].join(' ')}
      style={active ? {} : inactiveStyle}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  )
}
