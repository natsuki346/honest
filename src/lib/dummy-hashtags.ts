export interface Hashtag {
  id: string
  name: string
  mode: 'light' | 'shadow'
  postCount: number
}

export const LIGHT_HASHTAGS: Hashtag[] = [
  { id: 'lh-1', name: '仕事',    mode: 'light', postCount: 1234 },
  { id: 'lh-2', name: '恋愛',    mode: 'light', postCount: 987  },
  { id: 'lh-3', name: '家族',    mode: 'light', postCount: 876  },
  { id: 'lh-4', name: 'お金',    mode: 'light', postCount: 743  },
  { id: 'lh-5', name: '健康',    mode: 'light', postCount: 621  },
  { id: 'lh-6', name: '将来',    mode: 'light', postCount: 512  },
  { id: 'lh-7', name: '人間関係', mode: 'light', postCount: 445  },
  { id: 'lh-8', name: '趣味',    mode: 'light', postCount: 398  },
]

export const SHADOW_HASHTAGS: Hashtag[] = [
  { id: 'sh-1', name: '仕事',    mode: 'shadow', postCount: 2341 },
  { id: 'sh-2', name: '人間関係', mode: 'shadow', postCount: 1987 },
  { id: 'sh-3', name: '将来',    mode: 'shadow', postCount: 1765 },
  { id: 'sh-4', name: '恋愛',    mode: 'shadow', postCount: 1432 },
  { id: 'sh-5', name: '家族',    mode: 'shadow', postCount: 1123 },
  { id: 'sh-6', name: 'お金',    mode: 'shadow', postCount: 987  },
  { id: 'sh-7', name: '健康',    mode: 'shadow', postCount: 876  },
  { id: 'sh-8', name: '趣味',    mode: 'shadow', postCount: 654  },
]

export const ALL_HASHTAGS = [...LIGHT_HASHTAGS, ...SHADOW_HASHTAGS]

/* デフォルトでフォロー済みのタグID */
export const DEFAULT_FOLLOWED_IDS = new Set([
  'lh-1', 'lh-2', 'lh-6',   // 光：仕事・恋愛・将来
  'sh-1', 'sh-2', 'sh-3',   // 影：仕事・人間関係・将来
])

/* ルームダミーデータ（タグ名 → light/shadow別メッセージ） */
export const ROOM_DUMMY: Record<string, { lightMsg: string; shadowMsg: string; members: number }> = {
  '仕事':    { lightMsg: 'やっと昇格できた！報告したくて',        shadowMsg: 'また残業...いつまで続くんだろう',        members: 342 },
  '恋愛':    { lightMsg: '告白成功しました。ありがとう',           shadowMsg: 'また連絡途絶えた。もう疲れた',            members: 287 },
  '家族':    { lightMsg: '子供が初めて「ありがとう」って言ってくれた', shadowMsg: '親との関係が上手くいかない',              members: 198 },
  'お金':    { lightMsg: '貯金100万達成！小さいけど嬉しい',       shadowMsg: '今月また赤字だった。どうしよう',          members: 176 },
  '健康':    { lightMsg: 'マラソン完走できた！半年の成果',         shadowMsg: '体調が優れない日が続いてる',              members: 154 },
  '将来':    { lightMsg: '夢に向けて一歩踏み出せた気がする',       shadowMsg: '将来が全然見えなくて毎晩不安',            members: 231 },
  '人間関係': { lightMsg: '苦手だった人と和解できた',              shadowMsg: 'また気を遣いすぎて疲れた',               members: 189 },
  '趣味':    { lightMsg: 'ギター3年、やっと人前で弾けた',         shadowMsg: '趣味を続ける気力がなくなってきた',         members: 143 },
}
