'use client'

import { useState, useRef, useEffect } from 'react'
import { useTheme } from '@/components/ThemeProvider'
import { ROOM_DUMMY } from '@/lib/dummy-hashtags'

/* ---- あいうえお順ルーム定義 ---- */
const SORTED_ROOMS = [
  { name: 'お金',    icon: '💰', row: 'あ' },
  { name: '家族',    icon: '🏠', row: 'か' },
  { name: '健康',    icon: '💪', row: 'か' },
  { name: '恋愛',    icon: '❤️', row: 'か' },
  { name: '仕事',    icon: '💼', row: 'さ' },
  { name: '将来',    icon: '🔭', row: 'さ' },
  { name: '趣味',    icon: '🎵', row: 'さ' },
  { name: '人間関係', icon: '🫂', row: 'な' },
  { name: '副業',    icon: '💻', row: 'は' },
  { name: 'メンタル', icon: '🧠', row: 'ま' },
]

/* ---- あいうえお行インデックス ---- */
const KANA_ROWS = [
  { label: 'あ', names: ['お金'] },
  { label: 'か', names: ['家族', '健康', '恋愛'] },
  { label: 'さ', names: ['仕事', '将来', '趣味'] },
  { label: 'た', names: [] },
  { label: 'な', names: ['人間関係'] },
  { label: 'は', names: ['副業'] },
  { label: 'ま', names: ['メンタル'] },
  { label: 'や', names: [] },
  { label: 'ら', names: [] },
  { label: 'わ', names: [] },
]

/* ROOM_DUMMY に存在しないルームの補完 */
const ROOM_EXTRAS: Record<string, { lightMsg: string; shadowMsg: string; members: number }> = {
  '副業':    { lightMsg: '副業で初案件をもらえた！',          shadowMsg: '副業がなかなか軌道に乗らない...',  members: 198 },
  'メンタル': { lightMsg: '運動したら気持ちがかなり楽になった', shadowMsg: '気持ちの波が激しくて本当に疲れる', members: 287 },
  '家族':    { lightMsg: '子供の笑顔が今日も最高だった',      shadowMsg: '家族との関係に疲れてきてる',       members: 234 },
}

const GAP = 16

export default function ChatPage() {
  const { mode } = useTheme()
  const isLight  = mode !== 'shadow'

  const [index, setIndex]       = useState(0)
  const [entering, setEntering] = useState(false)
  const [cw, setCw]             = useState(360)

  const containerRef = useRef<HTMLDivElement>(null)
  const touchX       = useRef<number | null>(null)

  useEffect(() => {
    const update = () => {
      if (containerRef.current) setCw(containerRef.current.clientWidth)
    }
    update()
    const ro = new ResizeObserver(update)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const cardW  = Math.round(cw * 0.80)
  const trackX = Math.round(cw * 0.10) - index * (cardW + GAP)

  const goTo = (i: number) => {
    if (i >= 0 && i < SORTED_ROOMS.length) setIndex(i)
  }

  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 40) dx < 0 ? goTo(index + 1) : goTo(index - 1)
    touchX.current = null
  }

  const handleEnter = () => {
    if (entering) return
    setEntering(true)
    setTimeout(() => setEntering(false), 700)
  }

  /* 現在のドアの行ラベル */
  const currentRow = SORTED_ROOMS[index]?.row ?? ''

  /* かな行タップ → 先頭タグへジャンプ */
  const handleKanaJump = (names: string[]) => {
    if (names.length === 0) return
    const i = SORTED_ROOMS.findIndex(r => r.name === names[0])
    if (i >= 0) goTo(i)
  }

  return (
    <div
      className="flex flex-col"
      style={{ height: '100%', background: 'var(--bg)', transition: 'background 0.3s ease' }}
    >
      {/* ヘッダー */}
      <header
        className="shrink-0"
        style={{
          background: 'var(--header-bg)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="px-4 h-14 flex items-center justify-between">
          <h1 className="text-[17px] font-bold" style={{ color: 'var(--text)' }}>ルーム</h1>
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
              strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"
              style={{ color: 'var(--accent)' }}>
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>
      </header>

      {/* カルーセル + コントロール */}
      <div
        className="flex-1 flex flex-col justify-center py-4"
        style={{ minHeight: 0 }}
      >
        {/* カード トラック */}
        <div
          ref={containerRef}
          className="w-full overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            style={{
              display: 'flex',
              gap: `${GAP}px`,
              transform: `translateX(${trackX}px)`,
              transition: 'transform 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              willChange: 'transform',
            }}
          >
            {SORTED_ROOMS.map((room, i) => {
              const isActive = i === index
              const dummy    = ROOM_DUMMY[room.name] ?? ROOM_EXTRAS[room.name]
              const lastMsg  = dummy ? (isLight ? dummy.lightMsg : dummy.shadowMsg) : 'まだメッセージがありません'
              const members  = dummy?.members ?? 0

              return (
                <div
                  key={room.name}
                  style={{
                    flex: `0 0 ${cardW}px`,
                    transform: `scale(${isActive ? 1 : 0.9})`,
                    opacity: isActive ? 1 : 0.5,
                    transition: 'transform 0.38s ease, opacity 0.38s ease',
                  }}
                >
                  <DoorCard
                    room={room}
                    lastMsg={lastMsg}
                    members={members}
                    isLight={isLight}
                    isActive={isActive}
                    isEntering={isActive && entering}
                    onEnter={handleEnter}
                  />
                </div>
              )
            })}
          </div>
        </div>

        {/* ドット + 矢印 */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              opacity: index === 0 ? 0.3 : 1, color: 'var(--accent)',
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
              strokeLinecap="round" className="w-4 h-4">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="flex gap-1.5">
            {SORTED_ROOMS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  height: 6,
                  width: i === index ? 18 : 6,
                  borderRadius: 3,
                  background: i === index ? 'var(--accent)' : 'var(--border)',
                  transition: 'width 0.25s ease, background 0.25s ease',
                  border: 'none', padding: 0, cursor: 'pointer',
                }}
              />
            ))}
          </div>

          <button
            onClick={() => goTo(index + 1)}
            disabled={index === SORTED_ROOMS.length - 1}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              opacity: index === SORTED_ROOMS.length - 1 ? 0.3 : 1, color: 'var(--accent)',
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
              strokeLinecap="round" className="w-4 h-4">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── あいうえお順インデックスバー ── */}
      <div
        className="shrink-0 flex overflow-x-auto"
        style={{
          borderTop: '1px solid var(--border)',
          background: 'var(--card)',
          scrollbarWidth: 'none',
          paddingLeft: 4,
          paddingRight: 4,
        }}
      >
        {KANA_ROWS.map(row => {
          const hasItems  = row.names.length > 0
          const isCurrent = row.names.length > 0 && SORTED_ROOMS[index]?.row === row.label

          return (
            <button
              key={row.label}
              onClick={() => handleKanaJump(row.names)}
              disabled={!hasItems}
              className="flex-1 shrink-0 flex items-center justify-center"
              style={{
                height: 44,
                minWidth: 36,
                fontSize: 14,
                fontWeight: isCurrent ? 700 : 400,
                color: isCurrent
                  ? 'var(--accent)'
                  : hasItems
                  ? 'var(--text)'
                  : 'var(--sub)',
                opacity: hasItems ? 1 : 0.35,
                cursor: hasItems ? 'pointer' : 'default',
                transition: 'color 0.2s ease, font-weight 0.1s ease',
                border: 'none',
                background: 'transparent',
                letterSpacing: '-0.3px',
              }}
            >
              {row.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ---- ドアカード ---- */
function DoorCard({
  room, lastMsg, members, isLight, isActive, isEntering, onEnter,
}: {
  room:       { name: string; icon: string }
  lastMsg:    string
  members:    number
  isLight:    boolean
  isActive:   boolean
  isEntering: boolean
  onEnter:    () => void
}) {
  const accent = isLight ? '#F0A500' : '#9B8FFF'
  const cardBg = isLight ? '#FFFFFF' : '#111118'
  const glow   = isLight ? 'rgba(240,165,0,0.20)' : 'rgba(155,143,255,0.30)'

  return (
    <div
      style={{
        aspectRatio: '3/5',
        borderRadius: '999px 999px 14px 14px',
        background: cardBg,
        border: `2.5px solid ${accent}`,
        boxShadow: isActive
          ? `0 8px 36px ${glow}, 0 2px 8px rgba(0,0,0,0.12)`
          : `0 2px 12px ${glow}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '36px 20px 24px',
        position: 'relative',
        overflow: 'hidden',
        transform: isEntering ? 'scale(1.06)' : 'scale(1)',
        opacity:   isEntering ? 0 : 1,
        transition: isEntering
          ? 'transform 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.45s ease'
          : 'box-shadow 0.3s ease',
      }}
    >
      <span style={{ fontSize: 28, lineHeight: 1, marginBottom: 8 }}>{room.icon}</span>
      <p style={{ fontSize: 22, fontWeight: 700, color: accent, letterSpacing: '-0.5px', marginBottom: 14 }}>
        #{room.name}
      </p>
      <p
        style={{
          fontSize: 12, color: 'var(--sub)', lineHeight: 1.6, flexGrow: 1,
          overflow: 'hidden', display: '-webkit-box',
          WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
        }}
      >
        {lastMsg}
      </p>
      <p style={{ fontSize: 11, color: 'var(--sub)', marginTop: 12, marginBottom: 14 }}>
        {members.toLocaleString()}人参加中
      </p>
      <button
        onClick={onEnter}
        style={{
          padding: '8px 28px', borderRadius: 20,
          background: accent, color: '#ffffff',
          fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer',
          boxShadow: `0 0 14px ${glow}`,
        }}
      >
        入室する
      </button>
      <div
        style={{
          position: 'absolute', right: 16, top: '56%',
          width: 11, height: 11, borderRadius: '50%',
          background: accent, boxShadow: `0 0 10px ${glow}`,
        }}
      />
    </div>
  )
}
