'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Služby', href: '#sluzby' },
  { label: 'Projekty', href: '#projekty' },
  { label: 'O mně', href: '#o-mne' },
  { label: 'Kontakt', href: '#kontakt' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-background/80 backdrop-blur-[24px] border-b border-white/5'
          : 'bg-transparent'
      )}
    >
      <div className="flex items-center justify-between px-8 py-5 max-w-screen-2xl mx-auto">
        <Link
          href="/"
          className="text-sm font-black tracking-widest text-white hover:text-gold transition-colors duration-300"
        >
          MATUCHOVIC.
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[10px] font-semibold tracking-[0.12em] uppercase text-white/45 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {session ? (
            <Link
              href="/dashboard"
              className="text-[10px] font-bold tracking-[0.1em] uppercase text-gold border border-gold/35 px-4 py-2 rounded-full hover:bg-gold/10 transition-all duration-200"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-[10px] font-semibold tracking-[0.1em] uppercase text-white/50 hover:text-white transition-colors duration-200 hidden md:block"
              >
                Přihlásit se
              </Link>
              <Link
                href="#kontakt"
                className="text-[10px] font-bold tracking-[0.1em] uppercase text-gold border border-gold/35 px-4 py-2 rounded-full hover:bg-gold/10 transition-all duration-200 flex items-center gap-1.5"
              >
                Domluvit konzultaci
                <span className="text-xs">↗</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
