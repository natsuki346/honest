import type { Post } from './types'

const now = Date.now()
const mins  = (n: number) => new Date(now - n * 60_000).toISOString()
const hours = (n: number) => new Date(now - n * 3_600_000).toISOString()

export const DUMMY_POSTS: Post[] = [
  /* ---- 光の投稿 ---- */
  {
    id: 'light-1',
    user_id: 'u1',
    content: '3年続けたギターをやっと人前で弾けた。うまくはないけど続けてきた自分が誇らしい',
    post_type: 'light',
    created_at: mins(15),
    profiles: { username: 'guitar_fan', avatar_url: null },
    tags: ['趣味'],
    like_count: 24,
    reply_count: 8,
  },
  {
    id: 'light-2',
    user_id: 'u2',
    content: 'ずっと怖くて踏み出せなかった副業、今日初めて案件もらえた',
    post_type: 'light',
    created_at: hours(2),
    profiles: { username: 'freelance_start', avatar_url: null },
    tags: ['仕事'],
    like_count: 41,
    reply_count: 12,
  },
  {
    id: 'light-3',
    user_id: 'u3',
    content: '毎朝5時起きを1ヶ月続けられた。小さいけど本当に嬉しい',
    post_type: 'light',
    created_at: hours(5),
    profiles: { username: 'morning_habit', avatar_url: null },
    tags: ['習慣'],
    like_count: 63,
    reply_count: 15,
  },
  /* ---- 影の投稿 ---- */
  {
    id: 'shadow-1',
    user_id: 'u4',
    content: '仕事でまた失敗した。誰にも言えなくてずっと引きずってる',
    post_type: 'shadow',
    created_at: mins(30),
    profiles: { username: 'shadow_u1', avatar_url: null },
    tags: ['仕事'],
    like_count: 87,
    reply_count: 23,
  },
  {
    id: 'shadow-2',
    user_id: 'u5',
    content: '人と話すのが苦手で、それを性格として受け入れてきたけど本当にこれでいいのか',
    post_type: 'shadow',
    created_at: hours(3),
    profiles: { username: 'shadow_u2', avatar_url: null },
    tags: ['人間関係'],
    like_count: 142,
    reply_count: 37,
  },
  {
    id: 'shadow-3',
    user_id: 'u6',
    content: '将来が全然見えなくて、毎晩不安で眠れない',
    post_type: 'shadow',
    created_at: hours(8),
    profiles: { username: 'shadow_u3', avatar_url: null },
    tags: ['将来'],
    like_count: 198,
    reply_count: 54,
  },
]
