import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ClientShell } from '@/components/ClientShell'

export const metadata: Metadata = {
  title: 'Honest — 光と影で自分をさらけ出す',
  description: '最適化された自分ではなく、ありのままの自分を投稿できるSNS',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  )
}
