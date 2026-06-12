import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
import { SmoothScroll } from '@/components/ui/SmoothScroll'
import { Toaster } from '@/components/ui/Toaster'
import { Providers } from '@/components/ui/Providers'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MATUCHOVIC — Digitální studio',
  description: 'Nezávislé digitální studio. Weby, aplikace, AI systémy a automatizace na míru vašemu podnikání.',
  keywords: ['web development', 'digitální studio', 'Next.js', 'AI systémy', 'webové aplikace'],
  openGraph: {
    title: 'MATUCHOVIC — Digitální studio',
    description: 'Vytvářím digitální produkty, které posouvají firmy dopředu.',
    url: 'https://matuchovic.cz',
    siteName: 'MATUCHOVIC',
    locale: 'cs_CZ',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs" className={inter.variable}>
      <body className="bg-background text-foreground antialiased">
        <Providers>
          <NoiseOverlay />
          <SmoothScroll>
            {children}
          </SmoothScroll>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
