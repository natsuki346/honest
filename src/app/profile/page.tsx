'use client'

import { useTheme } from '@/components/ThemeProvider'
import { PostCard } from '@/components/PostCard'
import type { Post } from '@/lib/types'

/* ---- ダミーデータ ---- */
const DUMMY_USER = {
  username: 'honest_user',
  displayName: '誠実な旅人',
  bio: '光と影、どちらも自分。ありのままを投稿しています。',
  followers: 128,
  following: 94,
}

const DUMMY_LIGHT_POSTS: Post[] = [
  {
    id: 'l1',
    user_id: 'me',
    content: '今日は朝から仕事がうまくいって、上司に褒められた。こういう日が続くといいな。素直に嬉しい。',
    post_type: 'light',
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    profiles: { username: DUMMY_USER.username, avatar_url: null },
  },
  {
    id: 'l2',
    user_id: 'me',
    content: '友達と久しぶりに会えて、笑いすぎてお腹が痛くなった。やっぱり人と会うのは最高。',
    post_type: 'light',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    profiles: { username: DUMMY_USER.username, avatar_url: null },
  },
  {
    id: 'l3',
    user_id: 'me',
    content: '今月の目標を達成できた。小さな一歩だけど、積み重ねが大事だと実感している。',
    post_type: 'light',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    profiles: { username: DUMMY_USER.username, avatar_url: null },
  },
]

const DUMMY_SHADOW_POSTS: Post[] = [
  {
    id: 's1',
    user_id: 'me',
    content: '最近、なんとなく気力が湧かない。頑張れているのかな、って思う日が続いてる。',
    post_type: 'shadow',
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    profiles: { username: DUMMY_USER.username, avatar_url: null },
  },
  {
    id: 's2',
    user_id: 'me',
    content: '人間関係って難しい。気を遣いすぎて疲れてしまう。ここで吐き出せてよかった。',
    post_type: 'shadow',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    profiles: { username: DUMMY_USER.username, avatar_url: null },
  },
  {
    id: 's3',
    user_id: 'me',
    content: '将来のことを考えると不安になる。何が正解なのか、誰かに教えてほしい。',
    post_type: 'shadow',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    profiles: { username: DUMMY_USER.username, avatar_url: null },
  },
]

/* ---- コンポーネント ---- */
export default function ProfilePage() {
  const { mode } = useTheme()
  const isLight = mode !== 'shadow'

  const posts = isLight ? DUMMY_LIGHT_POSTS : DUMMY_SHADOW_POSTS

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
          <h1 className="text-[17px] font-bold" style={{ color: 'var(--text)' }}>
            {isLight ? 'マイページ' : 'プロフィール'}
          </h1>
          {/* 設定ボタン */}
          <button style={{ color: 'var(--sub)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
          </button>
        </div>
      </header>

      {/* プロフィールセクション */}
      <div className="px-5 pt-5 pb-4" style={{ borderBottom: '1px solid var(--divider)' }}>
        {isLight ? (
          /* 光モード：フルプロフィール */
          <>
            <div className="flex items-start gap-4">
              {/* アバター */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl shrink-0"
                style={{ background: 'var(--card)', border: '2px solid var(--accent)' }}
              >
                ☀
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <p className="text-base font-bold leading-tight" style={{ color: 'var(--text)' }}>
                  {DUMMY_USER.displayName}
                </p>
                <p className="text-sm mt-0.5" style={{ color: 'var(--sub)' }}>
                  @{DUMMY_USER.username}
                </p>
              </div>
            </div>
            <p className="text-[13px] leading-relaxed mt-3" style={{ color: 'var(--text)' }}>
              {DUMMY_USER.bio}
            </p>
            {/* フォロワー */}
            <div className="flex gap-5 mt-3">
              <span className="text-sm" style={{ color: 'var(--sub)' }}>
                <strong style={{ color: 'var(--text)' }}>{DUMMY_USER.following}</strong> フォロー中
              </span>
              <span className="text-sm" style={{ color: 'var(--sub)' }}>
                <strong style={{ color: 'var(--text)' }}>{DUMMY_USER.followers}</strong> フォロワー
              </span>
            </div>
          </>
        ) : (
          /* 影モード：アイコンのみ、名前非表示 */
          <>
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl shrink-0"
                style={{ background: 'var(--card)', border: '2px solid var(--accent)' }}
              >
                🌑
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--sub)' }}>匿名ユーザー</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--sub)' }}>
                  影モードでは名前は表示されません
                </p>
              </div>
            </div>
            {/* 影モードでもフォロワー数は表示 */}
            <div className="flex gap-5 mt-4">
              <span className="text-sm" style={{ color: 'var(--sub)' }}>
                <strong style={{ color: 'var(--text)' }}>{DUMMY_USER.following}</strong> フォロー中
              </span>
              <span className="text-sm" style={{ color: 'var(--sub)' }}>
                <strong style={{ color: 'var(--text)' }}>{DUMMY_USER.followers}</strong> フォロワー
              </span>
            </div>
          </>
        )}
      </div>

      {/* 投稿一覧 */}
      <div>
        <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--divider)' }}>
          <span className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>
            {isLight ? '☀ 光の投稿' : '🌑 影の投稿'}
          </span>
        </div>

        <div className="px-3 pt-3 pb-6 space-y-3">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}
