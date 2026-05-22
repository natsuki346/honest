'use client'

import { useTheme } from '@/components/ThemeProvider'
import { useHashtags } from '@/components/HashtagProvider'
import { ROOM_DUMMY } from '@/lib/dummy-hashtags'

export default function ChatPage() {
  const { mode }             = useTheme()
  const { getFollowedByMode } = useHashtags()
  const isLight = mode !== 'shadow'

  const postType = isLight ? 'light' : 'shadow' as const
  const followedTags = getFollowedByMode(postType)

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
        <div className="px-4 h-14 flex items-center justify-between">
          <h1 className="text-[17px] font-bold" style={{ color: 'var(--text)' }}>チャット</h1>
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'var(--card)', border: '1px solid var(--divider)' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
              strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"
              style={{ color: 'var(--accent)' }}>
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>
      </header>

      {/* ルーム一覧 */}
      {followedTags.length === 0 ? (
        /* フォロー中タグなし */
        <div
          className="flex flex-col items-center py-20 gap-3 text-sm px-8 text-center"
          style={{ color: 'var(--sub)' }}
        >
          <span className="text-4xl">💬</span>
          <p className="font-medium" style={{ color: 'var(--text)' }}>
            ルームがありません
          </p>
          <p>探す画面からタグをフォローすると<br />そのタグのルームに参加できます</p>
        </div>
      ) : (
        <div>
          {followedTags.map(tag => {
            const dummy = ROOM_DUMMY[tag.name]
            const lastMsg = dummy
              ? (isLight ? dummy.lightMsg : dummy.shadowMsg)
              : 'まだメッセージがありません'
            const members = dummy?.members ?? 0

            return (
              <button
                key={tag.id}
                className="w-full flex items-center gap-3 px-4 py-4 text-left active:opacity-70 transition-opacity"
                style={{ borderBottom: '1px solid var(--divider)' }}
              >
                {/* タグアイコン */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0"
                  style={{
                    background: 'var(--card)',
                    border: `1.5px solid var(--accent)`,
                    color: 'var(--accent)',
                  }}
                >
                  #
                </div>

                {/* テキスト */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="font-semibold text-[14px] truncate" style={{ color: 'var(--text)' }}>
                      #{tag.name}
                    </span>
                    <span className="text-[11px] shrink-0" style={{ color: 'var(--sub)' }}>
                      {members.toLocaleString()}人
                    </span>
                  </div>
                  <p className="text-[12px] truncate" style={{ color: 'var(--sub)' }}>
                    {lastMsg}
                  </p>
                </div>
              </button>
            )
          })}

          {/* フッター案内 */}
          <div className="px-4 py-5 text-center">
            <p className="text-[11px]" style={{ color: 'var(--sub)' }}>
              {isLight ? 'タグをフォローしてルームに参加しよう' : '影を抱える仲間と繋がろう'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
