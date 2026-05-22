'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeProvider'

export function BottomNav() {
  const pathname = usePathname()
  const { mode, toggle } = useTheme()
  const isLight = mode !== 'shadow'

  const isActive = (href: string) => pathname === href

  return (
    <nav
      style={{
        background: 'var(--nav-bg)',
        borderTop: isLight ? '1px solid var(--border)' : '1px solid rgba(155,143,255,0.1)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="flex items-center h-[60px] px-1">

        {/* ホーム */}
        <NavItem href="/" active={isActive('/')} label="ホーム">
          <HomeIcon />
        </NavItem>

        {/* 探す */}
        <NavItem href="/explore" active={isActive('/explore')} label="探す">
          <SearchIcon />
        </NavItem>

        {/* ── 中央：モード切り替えボタン ── */}
        <div className="flex-1 flex items-center justify-center">
          <button
            onClick={() => toggle(isLight ? 'shadow' : 'light')}
            className="flex items-center justify-center active:scale-90"
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              background: 'var(--accent)',
              boxShadow: isLight
                ? '0 0 16px rgba(240,165,0,0.35)'
                : '0 0 16px rgba(155,143,255,0.4)',
              transition: 'background-color 0.4s ease, box-shadow 0.4s ease, transform 0.15s ease',
            }}
            aria-label={isLight ? '影モードへ切り替え' : '光モードへ切り替え'}
          >
            {isLight ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>

        {/* チャット */}
        <NavItem href="/chat" active={isActive('/chat')} label="チャット">
          <ChatIcon />
        </NavItem>

        {/* プロフィール */}
        <NavItem href="/profile" active={isActive('/profile')} label="マイページ">
          <UserIcon />
        </NavItem>

      </div>
    </nav>
  )
}

/* ---- NavItem ---- */
function NavItem({
  href,
  active,
  label,
  children,
}: {
  href: string
  active: boolean
  label: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="flex-1 flex flex-col items-center justify-center gap-0.5 py-1"
      style={{
        color: active ? 'var(--accent)' : 'var(--sub)',
        transition: 'color 0.25s ease',
      }}
    >
      <span className="w-6 h-6">{children}</span>
      <span
        className="text-[10px] font-medium"
        style={{ color: active ? 'var(--accent)' : 'var(--sub)' }}
      >
        {label}
      </span>
    </Link>
  )
}

/* ---- SVG Icons ---- */
function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1v-9.5z" />
      <path d="M9 21V13h6v8" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <circle cx="11" cy="11" r="7.5" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
}
