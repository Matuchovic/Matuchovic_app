'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    tag: 'Webové stránky',
    title: 'Luxury Wellness',
    description: 'Prémiové webové stránky pro wellness centrum s rezervačním systémem.',
    featured: true,
    accent: '#1a1a2e',
  },
  {
    tag: 'Webová aplikace',
    title: 'Club Dashboard',
    description: 'Administrativní systém pro správu členů a rezervací.',
    featured: false,
    accent: '#0a0a1a',
  },
  {
    tag: 'AI Automatizace',
    title: 'AI Customer Support',
    description: 'AI asistent a automatizace zákaznické podpory.',
    featured: false,
    accent: '#0a120a',
  },
]

function MockScreen({ accent, featured }: { accent: string; featured?: boolean }) {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ background: '#0d0d0d' }}
    >
      <div
        className="rounded-lg border border-white/6 overflow-hidden"
        style={{
          width: featured ? '75%' : '78%',
          height: featured ? '76%' : '78%',
          background: accent,
          padding: '10px',
        }}
      >
        <div className="h-1.5 rounded-full mb-2" style={{ background: 'rgba(212,164,95,0.35)', width: '70%' }} />
        <div className="flex gap-2 mb-2">
          <div className="flex-1 h-4 rounded" style={{ background: 'rgba(212,164,95,0.1)' }} />
          <div className="flex-1 h-4 rounded" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <div className="flex-1 h-4 rounded" style={{ background: 'rgba(255,255,255,0.06)' }} />
        </div>
        <div className="h-1.5 rounded-full mb-1.5" style={{ background: 'rgba(255,255,255,0.06)', width: '90%' }} />
        <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.04)', width: '60%' }} />
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
          <p className="text-[9px] tracking-[0.18em] uppercase text-gold/70 mb-4">Vybrané projekty</p>
          <h2 className="font-black tracking-tight text-white" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', letterSpacing: '-0.03em' }}>
            Projekty, na které jsem hrdý.
          </h2>
        </div>
        <a href="#" className="text-[9px] tracking-[0.12em] uppercase text-white/30 hover:text-white/60 transition-colors flex items-center gap-1.5">
          Zobrazit všechny
          <ArrowUpRight size={12} />
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
            className={`glass rounded-2xl overflow-hidden group cursor-pointer ${project.featured ? 'md:col-span-2' : ''}`}
            whileHover={{ borderColor: 'rgba(255,255,255,0.14)' }}
          >
            {/* Screenshot */}
            <div
              className="relative overflow-hidden"
              style={{ height: project.featured ? 240 : 160 }}
            >
              <MockScreen accent={project.accent} featured={project.featured} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>

            {/* Meta */}
            <div className="px-6 py-5 flex items-center justify-between">
              <div>
                <p className="text-[9px] tracking-[0.14em] uppercase text-gold/70 mb-1.5">{project.tag}</p>
                <h3 className="text-sm font-bold text-white tracking-tight">{project.title}</h3>
                <p className="text-[11px] text-white/35 mt-1">{project.description}</p>
              </div>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:border-gold/30 group-hover:text-gold transition-all duration-300 flex-shrink-0 ml-4">
                <ArrowUpRight size={14} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
