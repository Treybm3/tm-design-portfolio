import type { Metadata, Viewport } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', weight: ['300','400','500','600','700','800','900'] })

export const viewport: Viewport = { width: 'device-width', initialScale: 1, maximumScale: 1 }

export const metadata: Metadata = {
  title: 'TM Design | Web & AI Solutions',
  description: 'Custom websites and AI-powered tools built for local businesses by Trey Macklin.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
