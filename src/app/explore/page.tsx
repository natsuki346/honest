'use client'

import { useState, useMemo } from 'react'
import { useTheme } from '@/components/ThemeProvider'
import { useHashtags } from '@/components/HashtagProvider'

type ExploreTab      = 'users' | 'hashtags'
type HashtagCategory = 'all' | 'trending' | string

/* ---- ジャンルタグのフォロワー数 ---- */
const GENRE_TAG_FOLLOWERS: Record<string, number> = {
  '仕事': 5821, '副業': 3741, '転職': 2543, '起業': 1876, 'フリーランス': 3204,
  '恋愛': 4972, '失恋': 2341, '家族': 5203, '友達': 3108, '人間関係': 4834,
  '音楽': 2891, '映画': 2134, '読書': 1987, 'ゲーム': 2678, '趣味': 4887, '運動': 1498,
  'お金': 5921, '将来': 8341, '投資': 1243, '節約': 2187, '夢': 1654,
  'メンタル': 7129, '健康': 4102, '習慣': 1712, '自己成長': 2891, '悩み': 1934,
}

/* ---- ジャンルセクション ---- */
const GENRE_SECTIONS = [
  { icon: '💼', label: '仕事・キャリア',      tags: ['仕事', '副業', '転職', '起業', 'フリーランス'] },
  { icon: '❤️', label: '恋愛・人間関係',      tags: ['恋愛', '失恋', '家族', '友達', '人間関係'] },
  { icon: '🎵', label: '趣味・ライフスタイル', tags: ['音楽', '映画', '読書', 'ゲーム', '趣味', '運動'] },
  { icon: '💰', label: 'お金・将来',          tags: ['お金', '将来', '投資', '節約', '夢'] },
  { icon: '🧠', label: 'メンタル・自己成長',  tags: ['メンタル', '健康', '習慣', '自己成長', '悩み'] },
]

const CATEGORY_TABS = [
  { id: 'all',      label: 'すべて' },
  { id: 'trending', label: '急上昇' },
  ...GENRE_SECTIONS.map(s => ({ id: s.label, label: s.icon + ' ' + s.label })),
]

/* ---- ランキングデータ ---- */
const ALL_RANKING = [
  { rank: 1,  name: '仕事',    followers: 12483 },
  { rank: 2,  name: '恋愛',    followers: 9872  },
  { rank: 3,  name: '将来',    followers: 8341  },
  { rank: 4,  name: 'メンタル', followers: 7129  },
  { rank: 5,  name: '人間関係', followers: 6834  },
  { rank: 6,  name: 'お金',    followers: 5921  },
  { rank: 7,  name: '家族',    followers: 5203  },
  { rank: 8,  name: '趣味',    followers: 4887  },
  { rank: 9,  name: '健康',    followers: 4102  },
  { rank: 10, name: '副業',    followers: 3741  },
]

const TRENDING_RANKING = [
  { rank: 1,  name: 'フリーランス', followers: 3204 },
  { rank: 2,  name: '自己成長',    followers: 2891 },
  { rank: 3,  name: '転職',        followers: 2543 },
  { rank: 4,  name: '節約',        followers: 2187 },
  { rank: 5,  name: '悩み',        followers: 1934 },
  { rank: 6,  name: '習慣',        followers: 1712 },
  { rank: 7,  name: '運動',        followers: 1498 },
  { rank: 8,  name: '投資',        followers: 1243 },
]

/* ---- ダミーユーザー ---- */
const DUMMY_USERS = [
  { id: 'u1', username: 'guitar_fan',      display: 'ギター好き',     bio: '毎日練習中 🎸',          interestTags: ['趣味', '音楽', '健康', '仕事'] },
  { id: 'u2', username: 'morning_habit',   display: '朝活マン',       bio: '5時起き継続中',           interestTags: ['健康', '将来', '習慣', '自己成長'] },
  { id: 'u3', username: 'freelance_start', display: '副業はじめました', bio: 'デザイン・ライティング', interestTags: ['仕事', '副業', 'フリーランス', 'お金'] },
  { id: 'u4', username: 'shadow_writer',   display: '影の詩人',       bio: '言葉で吐き出す毎日',      interestTags: ['メンタル', '悩み', '人間関係'] },
  { id: 'u5', username: 'future_seeker',   display: '将来模索中',     bio: 'まだ答えは出ていない',    interestTags: ['将来', '仕事', '転職', '悩み'] },
]

const genreId = (name: string) => `g-${name}`

export default function ExplorePage() {
  const { mode }                      = useTheme()
  const { isFollowing, toggleFollow } = useHashtags()
  const isLight = mode !== 'shadow'

  const [query, setQuery]         = useState('')
  const [activeTab, setActiveTab] = useState<ExploreTab>('users')
  const [category, setCategory]   = useState<HashtagCategory>('all')
  const [focused, setFocused]     = useState(false)
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set())

  const toggleUser = (id: string) =>
    setFollowedUsers(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s })

  const followedTagNames = useMemo(
    () => new Set(GENRE_SECTIONS.flatMap(s => s.tags).filter(n => isFollowing(genreId(n)))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isFollowing],
  )

  const sortedUsers = useMemo(() =>
    DUMMY_USERS
      .map(u => ({ ...u, commonTags: u.interestTags.filter(t => followedTagNames.has(t)) }))
      .sort((a, b) => b.commonTags.length - a.commonTags.length)
      .filter(u => !query || u.username.includes(query) || u.display.includes(query)),
    [followedTagNames, query],
  )

  const searchBg = isLight ? '#F5F5F5' : '#1A1A24'

  /* 現在のカテゴリに対応するランキング or ジャンル */
  const rankingData = category === 'trending' ? TRENDING_RANKING : ALL_RANKING
  const genreSection = GENRE_SECTIONS.find(s => s.label === category) ?? null
  const showRanking  = category === 'all' || category === 'trending'

  return (
    <div className="min-h-full" style={{ background: 'var(--bg)', transition: 'background 0.3s ease' }}>

      {/* ── スティッキーヘッダー ── */}
      <div
        className="sticky top-0 z-10"
        style={{
          background: 'var(--header-bg)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        {/* 検索バー */}
        <div className="px-4 py-3">
          <div
            className="flex items-center gap-3 px-4"
            style={{
              height: 44, borderRadius: 24, background: searchBg,
              border: `1px solid ${focused ? 'var(--accent)' : 'transparent'}`,
              transition: 'border-color 0.15s ease',
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
              strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"
              style={{ color: 'var(--sub)' }}>
              <circle cx="11" cy="11" r="7.5" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="search" value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="ユーザーやタグを検索"
              className="flex-1 bg-transparent outline-none text-[14px]"
              style={{ color: 'var(--text)' }}
            />
            {query && <button onClick={() => setQuery('')} className="text-xs shrink-0" style={{ color: 'var(--sub)' }}>✕</button>}
          </div>
        </div>

        {/* ユーザー / ハッシュタグ タブ */}
        <div className="flex" style={{ borderBottom: '1px solid var(--border)' }}>
          {(['users', 'hashtags'] as ExploreTab[]).map(tab => {
            const active = activeTab === tab
            return (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="flex-1 flex items-center justify-center h-11 text-[13px]"
                style={{
                  fontWeight: 500,
                  color: active ? 'var(--accent)' : 'var(--sub)',
                  borderBottom: `2px solid ${active ? 'var(--accent)' : 'transparent'}`,
                  marginBottom: '-1px',
                  transition: 'color 0.2s ease, border-color 0.2s ease',
                }}
              >
                {tab === 'users' ? 'ユーザー' : 'ハッシュタグ'}
              </button>
            )
          })}
        </div>

        {/* カテゴリピル（ハッシュタグタブ時のみ） */}
        {activeTab === 'hashtags' && (
          <div
            className="flex gap-2 overflow-x-auto"
            style={{ padding: '8px 16px', scrollbarWidth: 'none', borderBottom: '1px solid var(--border)' }}
          >
            {CATEGORY_TABS.map(cat => {
              const active = category === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className="shrink-0 whitespace-nowrap text-[12px] font-medium transition-all"
                  style={{
                    padding: '5px 14px',
                    borderRadius: 20,
                    background:  active ? 'var(--accent)' : 'transparent',
                    color:       active ? '#ffffff'        : 'var(--sub)',
                    border:      active ? 'none'           : '1px solid var(--border)',
                  }}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* ── ユーザータブ ── */}
      {activeTab === 'users' && (
        <div>
          {followedTagNames.size === 0 && (
            <div className="mx-4 mt-3 px-4 py-3 rounded-xl text-[12px]"
              style={{ background: 'var(--card)', color: 'var(--sub)', border: '1px solid var(--border)' }}>
              ハッシュタグタブでタグをフォローすると、共通タグを持つユーザーが優先表示されます
            </div>
          )}
          {sortedUsers.map(user => {
            const following = followedUsers.has(user.id)
            return (
              <div key={user.id} className="flex items-start gap-3 px-4 py-3.5"
                style={{ borderBottom: '1px solid var(--border)' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-bold shrink-0"
                  style={{
                    background: isLight ? 'linear-gradient(135deg,#FFF3CC,#FFD878)' : 'linear-gradient(135deg,#1E1240,#2D1A5E)',
                    color: 'var(--accent)',
                  }}>
                  {user.display[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[14px] font-semibold truncate" style={{ color: 'var(--text)' }}>{user.display}</p>
                      <p className="text-[12px]" style={{ color: 'var(--sub)' }}>@{user.username}</p>
                    </div>
                    <button onClick={() => toggleUser(user.id)}
                      className="shrink-0 text-[12px] font-semibold active:scale-95"
                      style={{
                        padding: '5px 14px', borderRadius: 20,
                        ...(following
                          ? { background: 'var(--accent)', color: '#fff', border: 'none' }
                          : { background: 'transparent', color: 'var(--accent)', border: '1.5px solid var(--accent)' }),
                      }}>
                      {following ? 'フォロー中' : 'フォロー'}
                    </button>
                  </div>
                  {user.commonTags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {user.commonTags.map(tag => (
                        <span key={tag} className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                          style={{ background: 'var(--accent)', color: '#fff', opacity: 0.9 }}>
                          #{tag}
                        </span>
                      ))}
                      <span className="text-[11px]" style={{ color: 'var(--sub)', alignSelf: 'center' }}>が一致</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
          {sortedUsers.length === 0 && (
            <div className="text-center py-16 text-sm" style={{ color: 'var(--sub)' }}>「{query}」のユーザーが見つかりません</div>
          )}
        </div>
      )}

      {/* ── ハッシュタグタブ ── */}
      {activeTab === 'hashtags' && (
        <>
          {/* ランキング表示（すべて / 急上昇） */}
          {showRanking && (
            <div>
              {rankingData.map(item => {
                const id = genreId(item.name)
                const following = isFollowing(id)
                const isTop3 = item.rank <= 3
                return (
                  <div key={item.name} className="flex items-center gap-4 px-4 py-3.5"
                    style={{ borderBottom: '1px solid var(--border)' }}>
                    {/* 順位 */}
                    <span
                      className="w-6 text-center text-[14px] font-bold shrink-0 tabular-nums"
                      style={{ color: isTop3 ? 'var(--accent)' : 'var(--sub)' }}
                    >
                      {item.rank}
                    </span>

                    {/* タグ名 + フォロワー数 */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px]" style={{ fontWeight: 500, color: 'var(--text)' }}>
                        #{item.name}
                      </p>
                      <p className="text-[11px]" style={{ color: 'var(--sub)' }}>
                        {item.followers.toLocaleString()}人がフォロー中
                      </p>
                    </div>

                    {/* フォローボタン */}
                    <button
                      onClick={() => toggleFollow(id)}
                      className="shrink-0 text-[12px] font-semibold active:scale-95 transition-all"
                      style={{
                        padding: '5px 14px', borderRadius: 20,
                        ...(following
                          ? { background: 'var(--accent)', color: '#fff', border: 'none' }
                          : { background: 'transparent', color: 'var(--accent)', border: '1.5px solid var(--accent)' }),
                      }}
                    >
                      {following ? 'フォロー中' : 'フォロー'}
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          {/* ジャンル別リスト表示（TOP10と同じスタイル） */}
          {!showRanking && genreSection && (
            <div>
              {genreSection.tags.map(name => {
                const id       = genreId(name)
                const following = isFollowing(id)
                const followers = GENRE_TAG_FOLLOWERS[name] ?? 0
                return (
                  <div key={name} className="flex items-center gap-4 px-4 py-3.5"
                    style={{ borderBottom: '1px solid var(--border)' }}>
                    <div className="flex-1 min-w-0">
                      <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--text)' }}>#{name}</p>
                      <p style={{ fontSize: 11, color: 'var(--sub)' }}>
                        {followers.toLocaleString()}人がフォロー中
                      </p>
                    </div>
                    <button
                      onClick={() => toggleFollow(id)}
                      className="shrink-0 text-[12px] font-semibold active:scale-95 transition-all"
                      style={{
                        padding: '5px 14px', borderRadius: 20,
                        ...(following
                          ? { background: 'var(--accent)', color: '#fff', border: 'none' }
                          : { background: 'transparent', color: 'var(--accent)', border: '1.5px solid var(--accent)' }),
                      }}
                    >
                      {following ? 'フォロー中' : 'フォロー'}
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}
    </div>
  )
}
