'use client'

import { motion } from 'framer-motion'
import { Monitor, LayoutDashboard, Sparkles, Code2, Settings2, Figma } from 'lucide-react'

const services = [
  {
    icon: Monitor,
    title: 'Webové stránky',
    description: 'Moderní firemní weby, landing pages a portály, které zaujmou a prodávají.',
    featured: false,
  },
  {
    icon: LayoutDashboard,
    title: 'Webové aplikace',
    description: 'Klientské portály, rezervační systémy, interní nástroje a SaaS produkty.',
    featured: false,
  },
  {
    icon: Sparkles,
    title: 'AI řešení',
    description: 'AI asistenti, automatizace procesů a chytré workflow, které šetří čas a zvyšují efektivitu.',
    featured: true,
  },
  {
    icon: Code2,
    title: 'Vývoj na míru',
    description: 'Komplexní řešení přesně podle potřeb vašeho byznysu od A do Z.',
    featured: false,
  },
  {
    icon: Settings2,
    title: 'Automatizace',
    description: 'Propojení systémů, automatické procesy a interní firemní nástroje.',
    featured: false,
  },
  {
    icon: Figma,
    title: 'UX/UI Design',
    description: 'Prémiový design zaměřený na konverze a skvělý uživatelský zážitek.',
    featured: false,
  },
]

export function ServicesSection() {
  return (
    <section id="sluzby" className="py-24 px-8 md:px-16 max-w-screen-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <p className="text-[9px] tracking-[0.18em] uppercase text-gold/70 mb-4">Co pro vás vytvořím</p>
        <h2 className="font-black tracking-tight text-white" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.03em' }}>
          Kompletní vývoj od nápadu<br />po spuštění.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            whileHover={{ scale: 1.015, borderColor: service.featured ? 'rgba(212,164,95,0.4)' : 'rgba(255,255,255,0.14)' }}
            className={`relative rounded-2xl p-7 cursor-default transition-all duration-300 overflow-hidden group ${
              service.featured ? 'glass-gold' : 'glass'
            }`}
          >
            {/* Top highlight line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 ${
              service.featured
                ? 'bg-gold/15 border border-gold/25'
                : 'bg-white/5 border border-white/10'
            }`}>
              <service.icon
                size={18}
                className={service.featured ? 'text-gold' : 'text-white/50'}
              />
            </div>

            <h3 className="text-sm font-bold text-white mb-2.5 tracking-tight">{service.title}</h3>
            <p className="text-xs text-white/38 leading-relaxed">{service.description}</p>

            {service.featured && (
              <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(212,164,95,0.06) 0%, transparent 70%)' }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
