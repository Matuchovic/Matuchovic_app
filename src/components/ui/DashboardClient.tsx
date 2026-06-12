'use client'

import { signOut } from 'next-auth/react'
import { LogOut, User, Layers, Zap, Globe, ArrowUpRight } from 'lucide-react'

interface DashboardClientProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
    id: string
    role: string
  }
}

export function DashboardClient({ user }: DashboardClientProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/5 px-8 py-5 flex items-center justify-between">
        <a href="/" className="text-sm font-bold tracking-widest text-white">
          MATUCHOVIC.
        </a>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs font-medium text-white">{user.name}</p>
            <p className="text-[10px] text-white/30">{user.email}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center">
            <User size={16} className="text-gold" />
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-white/30 hover:text-white transition-colors border border-white/10 px-3 py-2 rounded-lg hover:border-white/20"
          >
            <LogOut size={12} />
            Odhlásit
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-16">
        {/* Welcome */}
        <div className="mb-14">
          <p className="text-[9px] tracking-[0.2em] uppercase text-gold/70 mb-4">Klientská zóna</p>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-3">
            Vítejte,{' '}
            <span className="text-gold">{user.name?.split(' ')[0] ?? 'zpět'}.</span>
          </h1>
          <p className="text-white/40 text-sm">
            Zde je přehled vašich projektů a spolupráce se studiem MATUCHOVIC.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-5 mb-10">
          {[
            { label: 'Aktivní projekty', value: '0', icon: Layers },
            { label: 'Dokončené projekty', value: '0', icon: Globe },
            { label: 'Přístup od', value: new Date().toLocaleDateString('cs-CZ', { month: 'short', year: 'numeric' }), icon: Zap },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-6 border border-white/7">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[9px] tracking-[0.14em] uppercase text-white/30">{stat.label}</p>
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <stat.icon size={14} className="text-white/40" />
                </div>
              </div>
              <p className="text-3xl font-extrabold tracking-tight text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Projects placeholder */}
        <div className="glass rounded-2xl border border-white/7 p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold tracking-tight text-white">Vaše projekty</h2>
            <span className="text-[9px] tracking-[0.14em] uppercase text-white/25 border border-white/10 px-3 py-1.5 rounded-full">
              Brzy dostupné
            </span>
          </div>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-5">
              <Layers size={24} className="text-gold/60" />
            </div>
            <p className="text-white/50 text-sm mb-2 font-medium">Zatím žádné projekty</p>
            <p className="text-white/25 text-xs max-w-xs">
              Po zahájení spolupráce se zde zobrazí přehled vašich projektů a jejich stav.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="glass-gold rounded-2xl p-8 text-center">
          <p className="text-[9px] tracking-[0.16em] uppercase text-gold/60 mb-4">Máte projekt?</p>
          <h3 className="text-2xl font-bold tracking-tight text-white mb-3">
            Pojďme ho postavit.
          </h3>
          <p className="text-white/35 text-sm mb-7 max-w-sm mx-auto">
            Napište mi a do 24 hodin dostanete odpověď s návrhem dalšího postupu.
          </p>
          <a
            href="mailto:info@ondrejmatucha.cz"
            className="inline-flex items-center gap-2 bg-gold text-background font-bold text-[10px] tracking-[0.1em] uppercase px-6 py-3 rounded-full hover:bg-gold-light transition-colors"
          >
            Napsat zprávu
            <ArrowUpRight size={14} />
          </a>
        </div>
      </main>
    </div>
  )
}
