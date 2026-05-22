'use client'

import { useState } from 'react'
import { ThemeProvider } from './ThemeProvider'
import { HashtagProvider } from './HashtagProvider'
import { BottomNav } from './BottomNav'
import { PostModal } from './PostModal'
import { FAB } from './FAB'

export function ClientShell({ children }: { children: React.ReactNode }) {
  const [postModalOpen, setPostModalOpen] = useState(false)

  return (
    <ThemeProvider>
    <HashtagProvider>
      <div
        className="relative mx-auto w-full max-w-[390px] overflow-hidden border-x border-slate-300 shadow-[0_8px_48px_rgba(0,0,0,0.18)]"
        style={{
          height: '100dvh',
          background: 'var(--bg)',
          transition: 'background-color 0.4s ease',
        }}
      >
        {/* スクロール領域 */}
        <div
          className="absolute inset-x-0 top-0 overflow-y-auto overflow-x-hidden"
          style={{ bottom: 'calc(60px + env(safe-area-inset-bottom))' }}
        >
          {children}
        </div>

        {/* FAB：投稿ボタン（右下フローティング） */}
        <div
          className="absolute right-4 z-40"
          style={{ bottom: 'calc(60px + env(safe-area-inset-bottom) + 14px)' }}
        >
          <FAB onClick={() => setPostModalOpen(true)} />
        </div>

        {/* ボトムナビ */}
        <div className="absolute inset-x-0 bottom-0 z-50">
          <BottomNav />
        </div>
      </div>

      {/* 投稿モーダル */}
      {postModalOpen && (
        <PostModal onClose={() => setPostModalOpen(false)} />
      )}
    </HashtagProvider>
    </ThemeProvider>
  )
}
