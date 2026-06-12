'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Briefcase, Heart, Zap } from 'lucide-react'

const stats = [
  { value: '5+', label: 'Let zkušeností', icon: TrendingUp },
  { value: '50+', label: 'Projektů', icon: Briefcase },
  { value: '100%', label: 'Spokojených klientů', icon: Heart },
  { value: '24h', label: 'Odezva', icon: Zap },
]

const tags = ['Weby', 'Aplikace', 'AI', 'Automatizace', 'UX/UI Design', 'Vývoj na míru']

export function AboutSection() {
  return (
    <section id="o-mne" className="py-24 px-8 md:px-16 max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[9px] tracking-[0.18em] uppercase text-gold/70 mb-5">O mně</p>
          <h2
            className="font-black tracking-tight text-white mb-6"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.035em' }}
          >
            Jmenuji se<br />
            <span className="text-gold">Ondřej Matucha.</span>
          </h2>
          <p className="text-sm text-white/40 leading-relaxed mb-6 max-w-md">
            Jsem vývojář a designér, který pomáhá firmám vytvářet moderní digitální produkty, jež přinášejí výsledky.
            Věřím, že skvělý web není jen krásný — musí prodávat.
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] tracking-[0.06em] uppercase text-white/30 border border-white/8 px-3 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-col gap-4"
        >
          {/* Photo placeholder */}
          <div className="relative h-56 glass rounded-2xl overflow-hidden flex items-end justify-end p-5">
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-44 rounded-t-[60px]"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            />
            <div
              className="absolute bottom-36 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full"
              style={{ background: 'rgba(255,255,255,0.07)' }}
            />
            <div
              className="absolute inset-0"
              style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(212,164,95,0.06) 0%, transparent 60%)' }}
            />
            <p className="relative z-10 text-sm text-gold/40 italic">Ondřej Matucha</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }}
                className="glass rounded-xl p-5"
              >
                <stat.icon size={14} className="text-gold/60 mb-2" />
                <p className="text-2xl font-extrabold text-white tracking-tight">{stat.value}</p>
                <p className="text-[9px] tracking-[0.1em] uppercase text-white/30 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
