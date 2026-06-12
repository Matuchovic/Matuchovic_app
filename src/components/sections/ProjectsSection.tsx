'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    tag: 'Webové stránky',
    title: 'Kominictví Štěstí',
    description: 'Prémiový web pro kominický servis s důrazem na konverze a lokální SEO.',
    featured: true,
    accent: '#1a0d00',
    accentGlow: 'rgba(255,140,0,0.08)',
    tagColor: 'rgba(255,140,0,0.7)',
    screens: [
      { top: 8, left: 8, width: 84, height: 56, bg: '#0d0800', bars: ['rgba(255,140,0,0.4)', 'rgba(255,255,255,0.08)', 'rgba(255,255,255,0.06)'] },
      { top: 20, left: 55, width: 42, height: 32, bg: '#1a0c00', bars: ['rgba(255,140,0,0.25)', 'rgba(255,255,255,0.06)'] },
    ],
  },
  {
    tag: 'Webové stránky',
    title: 'Rashid Kenya Adventures',
    description: 'Luxusní safari web s cinematic hero a rezervačním systémem.',
    featured: false,
    accent: '#0d0a00',
    accentGlow: 'rgba(184,136,58,0.08)',
    tagColor: 'rgba(212,164,95,0.7)',
    screens: [
      { top: 8, left: 8, width: 84, height: 56, bg: '#0a0800', bars: ['rgba(212,164,95,0.4)', 'rgba(255,255,255,0.06)', 'rgba(255,255,255,0.04)'] },
    ],
  },
  {
    tag: 'Webová aplikace',
    title: 'Viktória Lashes',
    description: 'Prémiový rezervační systém pro lash studio s věrnostním programem.',
    featured: false,
    accent: '#0d0010',
    accentGlow: 'rgba(220,80,160,0.08)',
    tagColor: 'rgba(220,80,160,0.7)',
    screens: [
      { top: 8, left: 8, width: 84, height: 56, bg: '#0a0010', bars: ['rgba(220,80,160,0.4)', 'rgba(255,255,255,0.06)', 'rgba(255,255,255,0.04)'] },
    ],
  },
]

function MockScreen({ project }: { project: typeof projects[0] }) {
  return (
    <div className="w-full h-full flex items-center justify-center" style={{ background: '#080808' }}>
      <div className="rounded-lg border border-white/5 overflow-hidden relative"
        style={{ width: '78%', height: '78%', background: project.accent }}>
        {/* Fake hero image area */}
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 60% 40%, ${project.accentGlow} 0%, transparent 70%)` }} />
        {/* Nav bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-3 py-2 border-b border-white/5" style={{ background: 'rgba(0,0,0,0.4)' }}>
          <div className="h-2 w-14 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
          <div className="flex gap-2">
            {[1,2,3,4].map(i => <div key={i} className="h-1.5 w-8 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />)}
          </div>
          <div className="h-2 w-12 rounded-full" style={{ background: project.tagColor }} />
        </div>
        {/* Big headline area */}
        <div className="absolute top-10 left-4 right-16">
          <div className="h-4 rounded mb-2" style={{ width: '85%', background: 'rgba(255,255,255,0.18)' }} />
          <div className="h-4 rounded mb-2" style={{ width: '70%', background: project.tagColor, opacity: 0.7 }} />
          <div className="h-4 rounded mb-4" style={{ width: '55%', background: 'rgba(255,255,255,0.1)' }} />
          <div className="h-2 rounded mb-1" style={{ width: '90%', background: 'rgba(255,255,255,0.05)' }} />
          <div className="h-2 rounded mb-4" style={{ width: '75%', background: 'rgba(255,255,255,0.04)' }} />
          <div className="flex gap-2 mt-3">
            <div className="h-5 w-20 rounded-full" style={{ background: project.tagColor, opacity: 0.85 }} />
            <div className="h-5 w-20 rounded-full border" style={{ borderColor: 'rgba(255,255,255,0.12)' }} />
          </div>
        </div>
        {/* Stats bar bottom */}
        <div className="absolute bottom-0 left-0 right-0 flex gap-4 px-4 py-2 border-t border-white/5">
          {[1,2,3,4].map(i => (
            <div key={i}>
              <div className="h-3 w-8 rounded mb-0.5" style={{ background: project.tagColor, opacity: 0.5 }} />
              <div className="h-1.5 w-12 rounded" style={{ background: 'rgba(255,255,255,0.06)' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ProjectsSection() {
  return (
    <section id="projekty" className="py-24 px-8 md:px-16 max-w-screen-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex items-end justify-between mb-10"
      >
        <div>
          <p className="text-[9px] tracking-[0.18em] uppercase mb-4" style={{ color: 'rgba(212,164,95,0.7)' }}>Vybrané projekty</p>
          <h2 className="font-black tracking-tight text-white" style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', letterSpacing: '-0.03em' }}>
            Projekty, na které jsem hrdý.
          </h2>
        </div>
        <a href="#kontakt" className="text-[9px] tracking-[0.12em] uppercase flex items-center gap-1.5 transition-colors" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Domluvit projekt <ArrowUpRight size={12} />
        </a>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`rounded-2xl overflow-hidden group cursor-pointer ${project.featured ? 'md:col-span-2' : ''}`}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
            whileHover={{ borderColor: 'rgba(255,255,255,0.14)' }}
          >
            {/* Screenshot */}
            <div className="relative overflow-hidden" style={{ height: project.featured ? 280 : 180 }}>
              <MockScreen project={project} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            </div>

            {/* Meta */}
            <div className="px-6 py-5 flex items-center justify-between">
              <div>
                <p className="text-[9px] tracking-[0.14em] uppercase mb-1.5" style={{ color: project.tagColor }}>
                  {project.tag}
                </p>
                <h3 className="text-sm font-bold text-white tracking-tight">{project.title}</h3>
                <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>{project.description}</p>
              </div>
              <div
                className="w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 ml-4 transition-all duration-300 group-hover:border-gold/30 group-hover:text-gold"
                style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}
              >
                <ArrowUpRight size={14} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
