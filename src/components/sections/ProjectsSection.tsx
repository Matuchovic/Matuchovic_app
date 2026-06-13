'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

const projects = [
  {
    tag: 'Webové stránky',
    title: 'Rashid Kenya Adventures',
    description: 'Luxusní safari web s cinematic hero a rezervačním systémem.',
    image: '/projects/projekt-2.png',
    tagColor: 'rgba(212,164,95,0.8)',
    featured: true,
  },
  {
    tag: 'Webové stránky',
    title: 'Kominictví Štěstí',
    description: 'Prémiový web pro kominický servis s důrazem na konverze a lokální SEO.',
    image: '/projects/projekt-1.png',
    tagColor: 'rgba(255,140,0,0.8)',
    featured: false,
  },
  {
    tag: 'Webová aplikace',
    title: 'Viktória Lashes',
    description: 'Prémiový rezervační systém pro lash studio s věrnostním programem.',
    image: '/projects/projekt-3.png',
    tagColor: 'rgba(220,80,160,0.8)',
    featured: false,
  },
]

export function ProjectsSection() {
  return (
    <section id="projekty" className="py-16 md:py-24 px-6 md:px-16 max-w-screen-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex items-end justify-between mb-8 md:mb-10"
      >
        <div>
          <p className="text-[9px] tracking-[0.18em] uppercase mb-3 md:mb-4" style={{ color: 'rgba(212,164,95,0.7)' }}>
            Vybrané projekty
          </p>
          <h2 className="font-black tracking-tight text-white" style={{ fontSize: 'clamp(1.4rem,3vw,2.4rem)', letterSpacing: '-0.03em' }}>
            Projekty, na které jsem hrdý.
          </h2>
        </div>
        <a href="#kontakt" className="hidden md:flex text-[9px] tracking-[0.12em] uppercase items-center gap-1.5 transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Domluvit projekt <ArrowUpRight size={12} />
        </a>
      </motion.div>

      {/* Mobile: single column | Desktop: editorial grid */}
      <div className="flex flex-col gap-4 md:hidden">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="rounded-2xl overflow-hidden group cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="relative w-full overflow-hidden" style={{ paddingBottom: '56.81%' }}>
              <Image src={project.image} alt={project.title} fill className="object-cover object-top" sizes="100vw" quality={80} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="px-4 py-4 flex items-center justify-between">
              <div>
                <p className="text-[8px] tracking-[0.14em] uppercase mb-1" style={{ color: project.tagColor }}>{project.tag}</p>
                <h3 className="text-sm font-bold text-white tracking-tight mb-0.5">{project.title}</h3>
                <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{project.description}</p>
              </div>
              <div className="w-7 h-7 rounded-full border flex items-center justify-center flex-shrink-0 ml-3" style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}>
                <ArrowUpRight size={13} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop: editorial grid */}
      <div className="hidden md:grid gap-4" style={{ gridTemplateColumns: '1.5fr 1fr', gridTemplateRows: 'auto auto' }}>
        {/* Featured — Rashid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ gridRow: 'span 2', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
          className="group" whileHover={{ borderColor: 'rgba(255,255,255,0.14)' }}
        >
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: 0 }}>
            <Image src={projects[0].image} alt={projects[0].title} fill className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" sizes="60vw" quality={90} />
            <div style={{ position:'absolute',inset:0,background:'linear-gradient(to bottom,rgba(0,0,0,0.3) 0%,transparent 30%)' }} />
            <div style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse at center,transparent 40%,rgba(0,0,0,0.4) 100%)' }} />
            <div style={{ position:'absolute',bottom:0,left:0,right:0,height:'55%',background:'linear-gradient(to top,rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.3) 50%,transparent 100%)' }} />
          </div>
          <div style={{ padding:'14px 16px',display:'flex',alignItems:'flex-end',justifyContent:'space-between',gap:10 }}>
            <div>
              <p style={{ fontSize:8,letterSpacing:'0.12em',textTransform:'uppercase',color:projects[0].tagColor,marginBottom:4 }}>{projects[0].tag}</p>
              <h3 style={{ fontSize:15,fontWeight:700,color:'#fff',letterSpacing:'-0.01em',marginBottom:3 }}>{projects[0].title}</h3>
              <p style={{ fontSize:10,color:'rgba(255,255,255,0.35)',lineHeight:1.5 }}>{projects[0].description}</p>
            </div>
            <div style={{ width:28,height:28,borderRadius:'50%',border:'1px solid rgba(255,255,255,0.12)',display:'flex',alignItems:'center',justifyContent:'center',color:'rgba(255,255,255,0.4)',flexShrink:0 }}>
              <ArrowUpRight size={13} />
            </div>
          </div>
        </motion.div>

        {/* Kominictví */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ borderRadius:14,overflow:'hidden',border:'1px solid rgba(255,255,255,0.07)',background:'rgba(255,255,255,0.03)',display:'flex',flexDirection:'column',cursor:'pointer',height:220 }}
          className="group" whileHover={{ borderColor: 'rgba(255,255,255,0.14)' }}
        >
          <div style={{ flex:1,position:'relative',overflow:'hidden' }}>
            <Image src={projects[1].image} alt={projects[1].title} fill className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" sizes="40vw" quality={85} />
            <div style={{ position:'absolute',inset:0,background:'linear-gradient(to bottom,rgba(0,0,0,0.3) 0%,transparent 30%)' }} />
            <div style={{ position:'absolute',bottom:0,left:0,right:0,height:'50%',background:'linear-gradient(to top,rgba(0,0,0,0.75) 0%,transparent 100%)' }} />
          </div>
          <div style={{ padding:'10px 12px',display:'flex',alignItems:'flex-end',justifyContent:'space-between',gap:8 }}>
            <div>
              <p style={{ fontSize:7,letterSpacing:'0.12em',textTransform:'uppercase',color:projects[1].tagColor,marginBottom:3 }}>{projects[1].tag}</p>
              <h3 style={{ fontSize:12,fontWeight:700,color:'#fff',letterSpacing:'-0.01em',marginBottom:2 }}>{projects[1].title}</h3>
              <p style={{ fontSize:9,color:'rgba(255,255,255,0.35)',lineHeight:1.4 }}>{projects[1].description}</p>
            </div>
            <div style={{ width:24,height:24,borderRadius:'50%',border:'1px solid rgba(255,255,255,0.12)',display:'flex',alignItems:'center',justifyContent:'center',color:'rgba(255,255,255,0.4)',flexShrink:0 }}>
              <ArrowUpRight size={11} />
            </div>
          </div>
        </motion.div>

        {/* Viktória */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          style={{ borderRadius:14,overflow:'hidden',border:'1px solid rgba(255,255,255,0.07)',background:'rgba(255,255,255,0.03)',display:'flex',flexDirection:'column',cursor:'pointer',height:220 }}
          className="group" whileHover={{ borderColor: 'rgba(255,255,255,0.14)' }}
        >
          <div style={{ flex:1,position:'relative',overflow:'hidden' }}>
            <Image src={projects[2].image} alt={projects[2].title} fill className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" sizes="40vw" quality={85} />
            <div style={{ position:'absolute',inset:0,background:'linear-gradient(to bottom,rgba(0,0,0,0.3) 0%,transparent 30%)' }} />
            <div style={{ position:'absolute',bottom:0,left:0,right:0,height:'50%',background:'linear-gradient(to top,rgba(0,0,0,0.75) 0%,transparent 100%)' }} />
          </div>
          <div style={{ padding:'10px 12px',display:'flex',alignItems:'flex-end',justifyContent:'space-between',gap:8 }}>
            <div>
              <p style={{ fontSize:7,letterSpacing:'0.12em',textTransform:'uppercase',color:projects[2].tagColor,marginBottom:3 }}>{projects[2].tag}</p>
              <h3 style={{ fontSize:12,fontWeight:700,color:'#fff',letterSpacing:'-0.01em',marginBottom:2 }}>{projects[2].title}</h3>
              <p style={{ fontSize:9,color:'rgba(255,255,255,0.35)',lineHeight:1.4 }}>{projects[2].description}</p>
            </div>
            <div style={{ width:24,height:24,borderRadius:'50%',border:'1px solid rgba(255,255,255,0.12)',display:'flex',alignItems:'center',justifyContent:'center',color:'rgba(255,255,255,0.4)',flexShrink:0 }}>
              <ArrowUpRight size={11} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
