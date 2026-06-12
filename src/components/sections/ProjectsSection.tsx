'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

const projects = [
  {
    tag: 'Webové stránky',
    title: 'Kominictví Štěstí',
    description: 'Prémiový web pro kominický servis s důrazem na konverze a lokální SEO.',
    image: '/projects/projekt-1.png',
    tagColor: 'rgba(255,140,0,0.75)',
    featured: true,
    href: '#',
  },
  {
    tag: 'Webové stránky',
    title: 'Rashid Kenya Adventures',
    description: 'Luxusní safari web s cinematic hero a rezervačním systémem.',
    image: '/projects/projekt-2.png',
    tagColor: 'rgba(212,164,95,0.75)',
    featured: false,
    href: '#',
  },
  {
    tag: 'Webová aplikace',
    title: 'Viktória Lashes',
    description: 'Prémiový rezervační systém pro lash studio s věrnostním programem.',
    image: '/projects/projekt-3.png',
    tagColor: 'rgba(220,80,160,0.75)',
    featured: false,
    href: '#',
  },
]

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
          <p className="text-[9px] tracking-[0.18em] uppercase mb-4" style={{ color: 'rgba(212,164,95,0.7)' }}>
            Vybrané projekty
          </p>
          <h2 className="font-black tracking-tight text-white" style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', letterSpacing: '-0.03em' }}>
            Projekty, na které jsem hrdý.
          </h2>
        </div>
        <a href="#kontakt" className="text-[9px] tracking-[0.12em] uppercase flex items-center gap-1.5 transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Domluvit projekt <ArrowUpRight size={12} />
        </a>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`rounded-2xl overflow-hidden group cursor-pointer ${project.featured ? 'md:col-span-2' : ''}`}
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            whileHover={{ borderColor: 'rgba(255,255,255,0.14)' }}
          >
            {/* Screenshot — přesný aspect ratio 16:9 (1.76:1) */}
            <div
              className="relative w-full overflow-hidden"
              style={{ paddingBottom: '56.81%' }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                sizes={project.featured ? '(max-width: 768px) 100vw, 100vw' : '(max-width: 768px) 100vw, 50vw'}
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Meta */}
            <div className="px-6 py-5 flex items-center justify-between">
              <div>
                <p className="text-[9px] tracking-[0.14em] uppercase mb-1.5" style={{ color: project.tagColor }}>
                  {project.tag}
                </p>
                <h3 className="text-sm font-bold text-white tracking-tight mb-1">{project.title}</h3>
                <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{project.description}</p>
              </div>
              <div
                className="w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 ml-4 transition-all duration-300 group-hover:text-gold"
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
