import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Přihlášení — MATUCHOVIC',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="px-8 py-5 border-b border-white/5">
        <Link href="/" className="text-sm font-bold tracking-widest text-white hover:text-gold transition-colors">
          MATUCHOVIC.
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        {children}
      </main>
      <footer className="px-8 py-4 border-t border-white/5 text-center">
        <p className="text-[10px] tracking-widest uppercase text-white/20">
          © 2024 Matuchovic — Všechna práva vyhrazena
        </p>
      </footer>
    </div>
  )
}
