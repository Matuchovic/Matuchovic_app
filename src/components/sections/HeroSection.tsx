'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let w = 0, h = 0
    let imageData: ImageData

    const resize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
      imageData = ctx.createImageData(w, h)
    }

    const renderNoise = () => {
      const d = imageData.data
      for (let i = 0; i < d.length; i += 4) {
        const v = (Math.random() * 255) | 0
        d[i] = v; d[i + 1] = v; d[i + 2] = v; d[i + 3] = 255
      }
      ctx.putImageData(imageData, 0, 0)
    }

    let last = 0
    const loop = (ts: number) => {
      if (ts - last >= 55) { renderNoise(); last = ts }
      animId = requestAnimationFrame(loop)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    animId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  const fadeDelay = { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 } }

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden pt-24">
      {/* TV Noise Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ mixBlendMode: 'screen', opacity: 0.065, zIndex: 1 }}
        aria-hidden="true"
      />

      {/* Fade edges — cinematic black bleed */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{ background: 'radial-gradient(ellipse at 60% 50%, transparent 35%, rgba(0,0,0,0.75) 100%)' }}
      />

      {/* Gold ambient glow behind M */}
      <div
        className="absolute right-16 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(212,164,95,0.08) 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-1 items-center px-8 md:px-16 max-w-screen-2xl mx-auto w-full gap-12 pb-24">
        {/* Left */}
        <div className="flex-1 max-w-xl">
          <motion.p
            {...fadeDelay}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[9px] tracking-[0.2em] uppercase text-white/30 mb-6 flex items-center gap-3"
          >
            <span className="w-6 h-px bg-gold/50 inline-block" />
            Digitální studio
          </motion.p>

          <motion.h1
            {...fadeDelay}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-black tracking-tight leading-[1.02] text-white mb-5"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)', letterSpacing: '-0.04em' }}
          >
            Vytvářím digitální<br />
            produkty, které<br />
            <span className="text-gold">posouvají firmy<br />dopředu.</span>
          </motion.h1>

          <motion.p
            {...fadeDelay}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-sm text-white/40 mb-10 leading-relaxed max-w-sm"
          >
            Weby, webové aplikace, AI systémy<br />a automatizace na míru vašemu podnikání.
          </motion.p>

          <motion.div
            {...fadeDelay}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex items-center gap-4"
          >
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 bg-gold text-background font-bold text-[10px] tracking-[0.1em] uppercase px-6 py-3.5 rounded-full hover:bg-gold-light transition-colors duration-200"
            >
              Domluvit konzultaci
              <span>↗</span>
            </a>
            <a
              href="#projekty"
              className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.1em] uppercase text-white/45 border border-white/12 px-5 py-3.5 rounded-full hover:text-white hover:border-white/25 transition-all duration-200"
            >
              Zobrazit projekty
              <span>↗</span>
            </a>
          </motion.div>
        </div>

        {/* Right — Glass M */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex items-center justify-center relative"
          style={{ minWidth: 380, minHeight: 380 }}
        >
          <svg
            viewBox="0 0 360 360"
            width="360"
            height="360"
            className="animate-float"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="glassFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
                <stop offset="40%" stopColor="rgba(255,255,255,0.03)" />
                <stop offset="100%" stopColor="rgba(212,164,95,0.08)" />
              </linearGradient>
              <linearGradient id="glassBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.06)" />
                <stop offset="100%" stopColor="rgba(212,164,95,0.3)" />
              </linearGradient>
              <linearGradient id="mLetterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
                <stop offset="100%" stopColor="rgba(212,164,95,0.12)" />
              </linearGradient>
            </defs>

            {/* Glass box */}
            <rect x="30" y="30" width="300" height="300" rx="36"
              fill="url(#glassFill)" stroke="url(#glassBorder)" strokeWidth="1.5" />

            {/* Top highlight */}
            <rect x="50" y="44" width="120" height="5" rx="2.5" fill="rgba(255,255,255,0.18)" />

            {/* Bottom reflection */}
            <ellipse cx="180" cy="310" rx="90" ry="10" fill="rgba(212,164,95,0.06)" />

            {/* Inner thin border */}
            <rect x="38" y="38" width="284" height="284" rx="30"
              fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

            {/* M letter — outline style */}
            <text
              x="180" y="252"
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              fontWeight="900"
              fontSize="220"
              letterSpacing="-10"
              fill="none"
              stroke="rgba(255,255,255,0.16)"
              strokeWidth="2"
            >M</text>
            <text
              x="180" y="252"
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              fontWeight="900"
              fontSize="220"
              letterSpacing="-10"
              fill="url(#mLetterGrad)"
            >M</text>

            {/* Spec glint */}
            <ellipse cx="110" cy="90" rx="35" ry="12" fill="rgba(255,255,255,0.07)" transform="rotate(-15, 110, 90)" />
          </svg>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <div className="w-6 h-6 rounded-full border border-white/15 flex items-center justify-center text-white/25 text-xs">
          +
        </div>
        <span className="text-[9px] tracking-[0.16em] uppercase text-white/20">Scroll</span>
      </motion.div>
    </section>
  )
}
