import Link from 'next/link'

const navLinks = [
  { label: 'Služby', href: '#sluzby' },
  { label: 'Projekty', href: '#projekty' },
  { label: 'O mně', href: '#o-mne' },
  { label: 'Kontakt', href: '#kontakt' },
]

export function Footer() {
  return (
    <footer className="border-t border-white/5 px-8 py-8">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <Link href="/" className="text-sm font-black tracking-widest text-white/50 hover:text-gold transition-colors">
            MATUCHOVIC.
          </Link>
          <p className="text-[9px] tracking-wider text-white/20 mt-1">
            © 2024 Všechna práva vyhrazena.
          </p>
        </div>

        <nav className="flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[9px] font-semibold tracking-[0.1em] uppercase text-white/25 hover:text-white/50 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {[
            { label: 'in', href: 'https://linkedin.com' },
            { label: 'GH', href: 'https://github.com' },
            { label: 'IG', href: 'https://instagram.com' },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[9px] font-bold text-white/35 hover:border-white/25 hover:text-white/60 transition-all"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
