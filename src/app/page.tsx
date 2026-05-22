import { createClient } from '@/lib/supabase/server'
import { HomeFeed } from '@/components/HomeFeed'
import { DUMMY_POSTS } from '@/lib/dummy-posts'
import type { Post } from '@/lib/types'

async function getPosts(): Promise<Post[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('posts')
      .select('*, profiles(username, avatar_url)')
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) return []
    return (data as Post[]) ?? []
  } catch {
    return []
  }
}

export default async function FeedPage() {
  const posts = await getPosts()
  /* Supabase 未設定 or データなしの場合はダミーを表示 */
  return <HomeFeed posts={posts.length > 0 ? posts : DUMMY_POSTS} />
}
