'use client'

import type { Hashtag } from '@/lib/dummy-hashtags'

interface TagScrollBarProps {
  tags:      Hashtag[]
  activeTag: string | null
  onSelect:  (tag: string | null) => void
}

export function TagScrollBar({ tags, activeTag, onSelect }: TagScrollBarProps) {
  return (
    <div
      className="flex items-center gap-2 overflow-x-auto"
      style={{ padding: '8px 16px', scrollbarWidth: 'none' }}
    >
      <Pill label="すべて" active={activeTag === null} onClick={() => onSelect(null)} />
      {tags.map(tag => (
        <Pill
          key={tag.id}
          label={`#${tag.name}`}
          active={activeTag === tag.name}
          onClick={() => onSelect(tag.name)}
        />
      ))}
      {tags.length === 0 && (
        <span className="text-[11px] shrink-0 whitespace-nowrap" style={{ color: 'var(--sub)' }}>
          探す画面からタグをフォローしよう
        </span>
      )}
    </div>
  )
}

function Pill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 whitespace-nowrap transition-all"
      style={{
        padding: '5px 14px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: active ? 600 : 400,
        background:  active ? 'var(--accent)' : 'transparent',
        color:       active ? '#ffffff'        : 'var(--sub)',
        border:      'none',
        boxShadow:   active ? '0 0 12px var(--accent-glow)' : 'none',
        transition:  'background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      {label}
    </button>
  )
}
