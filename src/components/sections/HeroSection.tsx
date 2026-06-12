'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const techCoins = [
  { id: 'next',      label: 'Next.js',    bg: 'radial-gradient(135deg at 30% 30%,#1a1a1a,#000)',       x: 8,  y: 12, size: 72, depth: 1.0, phase: 0,   icon: 'N' },
  { id: 'react',     label: 'React',      bg: 'radial-gradient(135deg at 30% 30%,#0d2137,#061220)',     x: 78, y: 8,  size: 60, depth: 0.7, phase: 1.2, icon: '⚛' },
  { id: 'ts',        label: 'TypeScript', bg: 'radial-gradient(135deg at 30% 30%,#1a3a5c,#0d2137)',     x: 82, y: 55, size: 56, depth: 0.6, phase: 2.4, icon: 'TS' },
  { id: 'tailwind',  label: 'Tailwind',   bg: 'radial-gradient(135deg at 30% 30%,#0d2a2e,#061518)',     x: 5,  y: 60, size: 64, depth: 0.9, phase: 0.8, icon: 'TW' },
  { id: 'prisma',    label: 'Prisma',     bg: 'radial-gradient(135deg at 30% 30%,#1a1a2e,#0d0d1a)',     x: 16, y: 72, size: 54, depth: 0.5, phase: 3.1, icon: '◭' },
  { id: 'gsap',      label: 'GSAP',       bg: 'radial-gradient(135deg at 30% 30%,#1a2e1a,#0d1a0d)',     x: 74, y: 70, size: 52, depth: 0.65,phase: 1.8, icon: 'GS' },
  { id: 'supabase',  label: 'Supabase',   bg: 'radial-gradient(135deg at 30% 30%,#0d2a1a,#061510)',     x: 42, y: 80, size: 60, depth: 0.8, phase: 2.8, icon: '⚡' },
  { id: 'vercel',    label: 'Vercel',     bg: 'radial-gradient(135deg at 30% 30%,#1a1a1a,#080808)',     x: 88, y: 30, size: 50, depth: 0.55,phase: 0.4, icon: '▲' },
  { id: 'figma',     label: 'Figma',      bg: 'radial-gradient(135deg at 30% 30%,#2a1a1a,#1a0d0d)',     x: 2,  y: 35, size: 50, depth: 0.6, phase: 2.0, icon: 'F' },
  { id: 'threejs',   label: 'Three.js',   bg: 'radial-gradient(135deg at 30% 30%,#1a1a1a,#050505)',     x: 28, y: 8,  size: 56, depth: 0.75,phase: 1.5, icon: '3D' },
]

export function HeroSection() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const coinsRef = useRef<{ el: HTMLDivElement; coin: typeof techCoins[0]; currentScale: number; rotX: number; rotY: number }[]>([])
  const rafRef = useRef<number>()

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return

    const onMove = (e: MouseEvent) => {
      const r = scene.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top) / r.height,
      }
    }
    scene.addEventListener('mousemove', onMove)

    let t = 0
    const animate = () => {
      t += 0.008
      const { x: mx, y: my } = mouseRef.current
      const w = scene.offsetWidth
      const h = scene.offsetHeight

      coinsRef.current.forEach(({ el, coin, currentScale, rotX, rotY }, i) => {
        const floatX = Math.sin(t * 0.6 + coin.phase) * 1.8
        const floatY = Math.cos(t * 0.5 + coin.phase * 1.3) * 2.2
        const parallaxX = (mx - 0.5) * -18 * coin.depth
        const parallaxY = (my - 0.5) * -14 * coin.depth
        const tx = coin.x + floatX + parallaxX
        const ty = coin.y + floatY + parallaxY
        const targetRX = (my - 0.5) * -20
        const targetRY = (mx - 0.5) * 20
        coinsRef.current[i].rotX += (targetRX - rotX) * 0.05
        coinsRef.current[i].rotY += (targetRY - rotY) * 0.05
        const blur = (1 - coin.depth) * 0.8
        const brightness = 0.75 + coin.depth * 0.35
        el.style.left = tx + '%'
        el.style.top = ty + '%'
        el.style.transform = `perspective(500px) rotateX(${coinsRef.current[i].rotX}deg) rotateY(${coinsRef.current[i].rotY}deg) scale(${coinsRef.current[i].currentScale})`
        el.style.filter = `blur(${blur}px) brightness(${brightness})`
        el.style.opacity = String(0.5 + coin.depth * 0.5)
      })
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      scene.removeEventListener('mousemove', onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section ref={sceneRef} className="relative min-h-screen overflow-hidden" style={{ background: '#090909' }}>

      {/* Noise */}
      <div className="absolute inset-0 pointer-events-none z-10" style={{ opacity: 0.05, mixBlendMode: 'overlay', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '180px' }} />

      {/* Fades */}
      <div className="absolute inset-x-0 top-0 h-32 pointer-events-none z-10" style={{ background: 'linear-gradient(to bottom, #090909, transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-48 pointer-events-none z-10" style={{ background: 'linear-gradient(to top, #090909, transparent)' }} />
      <div className="absolute inset-y-0 left-0 w-24 pointer-events-none z-10" style={{ background: 'linear-gradient(to right, #090909, transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-24 pointer-events-none z-10" style={{ background: 'linear-gradient(to left, #090909, transparent)' }} />

      {/* Ambient glow */}
      <div className="absolute pointer-events-none z-0" style={{ width: 500, height: 300, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(212,164,95,0.05) 0%, transparent 65%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />

      {/* Tech coins */}
      {techCoins.map((coin, i) => (
        <div
          key={coin.id}
          ref={el => {
            if (el) coinsRef.current[i] = { el, coin, currentScale: 1, rotX: 0, rotY: 0 }
          }}
          style={{
            position: 'absolute',
            width: coin.size,
            height: coin.size,
            borderRadius: '50%',
            cursor: 'pointer',
            zIndex: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={e => { coinsRef.current[i].currentScale = 1.15; (e.currentTarget as HTMLDivElement).style.zIndex = '8' }}
          onMouseLeave={e => { coinsRef.current[i].currentScale = 1; (e.currentTarget as HTMLDivElement).style.zIndex = '4' }}
        >
          <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: coin.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)' }}>
            {/* Sheen */}
            <div style={{ position: 'absolute', top: '-30%', left: '-20%', width: '60%', height: '60%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.16) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: coin.size * 0.24, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', position: 'relative', zIndex: 1 }}>
              {coin.icon}
            </span>
          </div>
          <div style={{ position: 'absolute', bottom: -22, left: '50%', transform: 'translateX(-50%)', fontSize: 9, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif' }}>
            {coin.label}
          </div>
        </div>
      ))}

      {/* Hero text */}
      <div className="relative z-20 flex flex-1 items-center px-8 md:px-16 max-w-screen-2xl mx-auto w-full pb-24" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="max-w-xl">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 24, height: 1, background: 'rgba(212,164,95,0.5)', display: 'inline-block' }} />
            Digitální studio
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}
            style={{ fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.02, color: '#fff', marginBottom: 20, fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)' }}>
            Vytvářím digitální<br />
            produkty, které<br />
            <span style={{ color: '#D4A45F' }}>posouvají firmy<br />dopředu.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35 }}
            style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 40, lineHeight: 1.7 }}>
            Weby, webové aplikace, AI systémy<br />a automatizace na míru vašemu podnikání.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }}
            style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <a href="#kontakt" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#D4A45F', color: '#090909', fontWeight: 800, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '12px 24px', borderRadius: 40, textDecoration: 'none' }}>
              Domluvit konzultaci ↗
            </a>
            <a href="#projekty" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.12)', padding: '12px 20px', borderRadius: 40, textDecoration: 'none' }}>
              Zobrazit projekty ↗
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}
        style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 24, height: 24, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>+</div>
        <span style={{ fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', fontFamily: 'Inter, sans-serif' }}>Scroll</span>
      </motion.div>

    </section>
  )
}
