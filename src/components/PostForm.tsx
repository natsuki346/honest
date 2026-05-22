'use client'

import { useState, useTransition } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useTheme } from './ThemeProvider'
import type { PostType } from '@/lib/types'

interface PostFormProps {
  initialType?: PostType
  onPosted?: () => void
}

export function PostForm({ initialType = 'light', onPosted }: PostFormProps) {
  const { mode } = useTheme()
  const isShadow = mode === 'shadow'

  const [content, setContent] = useState('')
  const [postType, setPostType] = useState<PostType>(initialType)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    startTransition(async () => {
      setError(null)
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        setError('投稿するにはログインが必要です')
        return
      }

      const { error: insertError } = await supabase.from('posts').insert({
        content: content.trim(),
        post_type: postType,
        user_id: user.id,
      })

      if (insertError) {
        setError(insertError.message)
        return
      }

      setContent('')
      onPosted?.()
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* 光/影 セレクター */}
      <div className="flex gap-2">
        {(['light', 'shadow'] as PostType[]).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setPostType(type)}
            className={[
              'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all',
              postType === type
                ? type === 'light'
                  ? 'bg-amber-400 border-amber-400 text-amber-900'
                  : 'bg-violet-600 border-violet-600 text-white'
                : isShadow
                ? 'border-slate-700 text-slate-400 hover:border-slate-600'
                : 'border-slate-200 text-slate-500 hover:border-slate-300',
            ].join(' ')}
          >
            <span>{type === 'light' ? '☀' : '🌑'}</span>
            <span>{type === 'light' ? '光' : '影'}</span>
          </button>
        ))}
      </div>

      {/* テキストエリア */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={
          postType === 'light'
            ? '誇れること、嬉しいこと、成長したことを...'
            : '悩み、弱さ、本音を...'
        }
        rows={4}
        maxLength={500}
        className={[
          'w-full resize-none text-[15px] leading-relaxed placeholder:text-opacity-40 outline-none bg-transparent',
          isShadow ? 'text-slate-100 placeholder:text-slate-500' : 'text-slate-800 placeholder:text-slate-400',
        ].join(' ')}
      />

      {/* 送信列 */}
      <div className={[
        'flex items-center justify-between pt-3 border-t',
        isShadow ? 'border-slate-700' : 'border-slate-100',
      ].join(' ')}>
        <span className={`text-xs ${isShadow ? 'text-slate-500' : 'text-slate-400'}`}>
          {content.length}/500
        </span>
        <div className="flex items-center gap-3">
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={!content.trim() || isPending}
            className={[
              'px-5 py-2 rounded-full text-sm font-semibold transition-all disabled:opacity-40',
              postType === 'light'
                ? 'bg-amber-400 text-amber-900 hover:bg-amber-300'
                : 'bg-violet-600 text-white hover:bg-violet-500',
            ].join(' ')}
          >
            {isPending ? '投稿中...' : '投稿する'}
          </button>
        </div>
      </div>
    </form>
  )
}
