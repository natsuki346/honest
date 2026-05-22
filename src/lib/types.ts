export type PostType = 'light' | 'shadow'

export interface Profile {
  id: string
  username: string
  avatar_url: string | null
  created_at: string
}

export interface Post {
  id: string
  user_id: string
  content: string
  post_type: PostType
  created_at: string
  profiles: {
    username: string
    avatar_url: string | null
  }
  tags?: string[]
  like_count?: number
  reply_count?: number
  reaction_count?: number
}

export interface Reaction {
  id: string
  post_id: string
  user_id: string
  created_at: string
}
