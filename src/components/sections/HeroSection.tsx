'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const techCoins = [
  { id: 'next',     icon: 'N',   label: 'Next.js',    size: 70, x: 52, y: 6,  phase: 0,   speed: 0.9,  depth: 1.0  },
  { id: 'react',    icon: '⚛',   label: 'React',      size: 58, x: 16, y: 14, phase: 1.3, speed: 1.1,  depth: 0.75 },
  { id: 'ts',       icon: 'TS',  label: 'TypeScript', size: 54, x: 74, y: 32, phase: 2.1, speed: 0.85, depth: 0.85 },
  { id: 'tailwind', icon: 'TW',  label: 'Tailwind',   size: 62, x: 34, y: 48, phase: 0.7, speed: 1.0,  depth: 0.9  },
  { id: 'supabase', icon: '⚡',  label: 'Supabase',   size: 50, x: 6,  y: 56, phase: 3.0, speed: 1.15, depth: 0.6  },
  { id: 'prisma',   icon: '◭',   label: 'Prisma',     size: 46, x: 64, y: 62, phase: 1.8, speed: 0.95, depth: 0.55 },
  { id: 'gsap',     icon: 'GS',  label: 'GSAP',       size: 44, x: 84, y: 10, phase: 2.5, speed: 1.05, depth: 0.65 },
  { id: 'vercel',   icon: '▲',   label: 'Vercel',     size: 42, x: 22, y: 74, phase: 0.4, speed: 1.2,  depth: 0.5  },
  { id: 'threejs',  icon: '3D',  label: 'Three.js',   size: 48, x: 48, y: 76, phase: 1.6, speed: 0.88, depth: 0.7  },
  { id: 'figma',    icon: 'F',   label: 'Figma',      size: 38, x: 86, y: 54, phase: 2.8, speed: 1.1,  depth: 0.45 },
]

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const noiseCanvasRef = useRef<HTMLCanvasElement>(null)
  const coinsContainerRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number>()
  const noiseFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = noiseCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let imageData: ImageData
    let w = 0, h = 0, lastNoise = 0
    const resizeNoise = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
      imageData = ctx.createImageData(w, h)
    }
    resizeNoise()
    const ro = new ResizeObserver(resizeNoise)
    ro.observe(canvas)
    const renderNoise = (ts: number) => {
      if (ts - lastNoise >= 55) {
        const d = imageData.data
        for (let i = 0; i < d.length; i += 4) {
          const v = (Math.random() * 255) | 0
          d[i] = v; d[i + 1] = v; d[i + 2] = v
          d[i + 3] = (Math.random() * 0.08 * 255) | 0
        }
        ctx.putImageData(imageData, 0, 0)
        lastNoise = ts
      }
      noiseFrameRef.current = requestAnimationFrame(renderNoise)
    }
    noiseFrameRef.current = requestAnimationFrame(renderNoise)
    return () => { ro.disconnect(); if (noiseFrameRef.current) cancelAnimationFrame(noiseFrameRef.current) }
  }, [])

  useEffect(() => {
    const container = coinsContainerRef.current
    if (!container) return
    const coinEls: { wrap: HTMLDivElement; inner: HTMLDivElement; coin: typeof techCoins[0]; rotY: number; tRotY: number; t: number; phase: number }[] = []

    techCoins.forEach((coin) => {
      const wrap = document.createElement('div')
      wrap.style.cssText = `position:absolute;width:${coin.size}px;height:${coin.size}px;left:${coin.x}%;top:${coin.y}%;border-radius:50%;cursor:pointer;perspective:600px;z-index:4;`
      const inner = document.createElement('div')
      inner.style.cssText = `width:100%;height:100%;transform-style:preserve-3d;border-radius:50%;`
      const makeFace = (isFront: boolean) => {
        const face = document.createElement('div')
        face.style.cssText = `position:absolute;inset:0;border-radius:50%;backface-visibility:hidden;-webkit-backface-visibility:hidden;display:flex;align-items:center;justify-content:center;overflow:hidden;background:radial-gradient(135deg at ${isFront?'30% 30%':'70% 70%'},#1c1c1c,#080808);border:1px solid rgba(255,255,255,0.1);box-shadow:0 8px 28px rgba(0,0,0,0.6),inset 0 1px 0 rgba(255,255,255,0.1);${!isFront?'transform:rotateY(180deg);':''}`
        const cv = document.createElement('canvas')
        cv.width = coin.size; cv.height = coin.size
        cv.style.cssText = `position:absolute;inset:0;border-radius:50%;mix-blend-mode:screen;pointer-events:none;z-index:3;`
        const cctx = cv.getContext('2d')!
        let lastCN = 0
        const cnLoop = (ts: number) => {
          if (ts - lastCN >= 55) {
            const img = cctx.createImageData(coin.size, coin.size)
            const d = img.data
            for (let i = 0; i < d.length; i += 4) { const v = (Math.random() * 255) | 0; d[i] = v; d[i+1] = v; d[i+2] = v; d[i+3] = (Math.random() * 0.08 * 255) | 0 }
            cctx.putImageData(img, 0, 0); lastCN = ts
          }
          requestAnimationFrame(cnLoop)
        }
        requestAnimationFrame(cnLoop)
        const sheen = document.createElement('div')
        sheen.style.cssText = `position:absolute;top:-25%;${isFront?'left':'right'}:-15%;width:55%;height:55%;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,0.12) 0%,transparent 70%);pointer-events:none;z-index:4;`
        const ic = document.createElement('div')
        ic.style.cssText = `font-family:Inter,sans-serif;font-weight:800;font-size:${Math.round(coin.size*(isFront?0.26:0.16))}px;color:rgba(255,255,255,${isFront?0.78:0.65});position:relative;z-index:5;${!isFront?'letter-spacing:0.04em;text-align:center;line-height:1.3;':''}`
        ic.textContent = isFront ? coin.icon : coin.label
        face.appendChild(cv); face.appendChild(sheen); face.appendChild(ic)
        return face
      }
      inner.appendChild(makeFace(true)); inner.appendChild(makeFace(false)); wrap.appendChild(inner)
      const lbl = document.createElement('div')
      lbl.textContent = coin.label
      lbl.style.cssText = `position:absolute;bottom:-20px;left:50%;transform:translateX(-50%);font-size:7px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.22);white-space:nowrap;font-family:Inter,sans-serif;transition:color 0.2s;`
      wrap.appendChild(lbl); container.appendChild(wrap)
      const state = { wrap, inner, coin, rotY: 0, tRotY: 0, t: Math.random() * 100, phase: coin.phase }
      wrap.addEventListener('mouseenter', () => { state.tRotY = 180; wrap.style.zIndex = '9'; lbl.style.color = 'rgba(255,255,255,0.5)' })
      wrap.addEventListener('mouseleave', () => { state.tRotY = 0; wrap.style.zIndex = '4'; lbl.style.color = 'rgba(255,255,255,0.22)' })
      coinEls.push(state)
    })

    const animate = () => {
      coinEls.forEach((s) => {
        s.t += 0.008
        const floatX = Math.sin(s.t * s.coin.speed * 0.55 + s.phase) * 1.5
        const floatY = Math.cos(s.t * s.coin.speed * 0.45 + s.phase * 1.2) * 2.2
        s.rotY += (s.tRotY - s.rotY) * 0.1
        s.wrap.style.left = (s.coin.x + floatX) + '%'
        s.wrap.style.top = (s.coin.y + floatY) + '%'
        s.inner.style.transform = `rotateY(${s.rotY}deg)`
        s.wrap.style.filter = `blur(${(1-s.coin.depth)*0.5}px) brightness(${0.65+s.coin.depth*0.45})`
        s.wrap.style.opacity = String(0.4 + s.coin.depth * 0.6)
      })
      frameRef.current = requestAnimationFrame(animate)
    }
    frameRef.current = requestAnimationFrame(animate)
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); container.innerHTML = '' }
  }, [])

  const fade = { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 } }

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden flex flex-col" style={{ background: '#090909' }}>
      <canvas ref={noiseCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ mixBlendMode: 'screen', zIndex: 1 }} aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-32 pointer-events-none z-10" style={{ background: 'linear-gradient(to bottom,#090909,transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-48 pointer-events-none z-10" style={{ background: 'linear-gradient(to top,#090909,transparent)' }} />
      <div className="absolute inset-y-0 left-0 w-24 pointer-events-none z-10" style={{ background: 'linear-gradient(to right,#090909,transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-16 pointer-events-none z-10" style={{ background: 'linear-gradient(to left,#090909,transparent)' }} />
      <div className="absolute pointer-events-none z-0" style={{ width:500,height:300,borderRadius:'50%',background:'radial-gradient(ellipse,rgba(212,164,95,0.05) 0%,transparent 65%)',top:'50%',left:'50%',transform:'translate(-50%,-50%)' }} />

      <div className="relative z-20 flex flex-1 items-center max-w-screen-2xl mx-auto w-full px-6 md:px-16" style={{ minHeight: '100vh' }}>
        {/* Text — always visible */}
        <div className="flex-1 max-w-xl py-24 md:py-0">
          <motion.p {...fade} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[9px] tracking-[0.2em] uppercase text-white/30 mb-6 flex items-center gap-3">
            <span className="w-6 h-px bg-gold/50 inline-block" />
            Digitální studio
          </motion.p>
          <motion.h1 {...fade} transition={{ duration: 0.9, delay: 0.2 }}
            className="font-black tracking-tight leading-[1.02] text-white mb-5"
            style={{ fontSize: 'clamp(2rem,7vw,4.5rem)', letterSpacing: '-0.04em' }}>
            Vytvářím digitální<br />
            produkty, které<br />
            <span style={{ color: '#D4A45F' }}>posouvají firmy<br />dopředu.</span>
          </motion.h1>
          <motion.p {...fade} transition={{ duration: 0.8, delay: 0.35 }}
            className="text-sm text-white/40 mb-10 leading-relaxed max-w-sm">
            Weby, webové aplikace, AI systémy<br />a automatizace na míru vašemu podnikání.
          </motion.p>
          <motion.div {...fade} transition={{ duration: 0.8, delay: 0.45 }} className="flex flex-wrap items-center gap-3">
            <a href="#kontakt" style={{ display:'inline-flex',alignItems:'center',gap:8,background:'#D4A45F',color:'#090909',fontWeight:800,fontSize:10,letterSpacing:'0.1em',textTransform:'uppercase',padding:'12px 24px',borderRadius:40,textDecoration:'none' }}>
              Domluvit konzultaci ↗
            </a>
            <a href="#projekty" style={{ display:'inline-flex',alignItems:'center',gap:8,fontSize:10,fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(255,255,255,0.45)',border:'1px solid rgba(255,255,255,0.12)',padding:'12px 20px',borderRadius:40,textDecoration:'none' }}>
              Zobrazit projekty ↗
            </a>
          </motion.div>
        </div>

        {/* Coins — desktop only */}
        <div className="hidden lg:block relative flex-1" style={{ minHeight: '100vh' }}>
          <div className="absolute inset-y-0 left-0 w-32 pointer-events-none z-10" style={{ background: 'linear-gradient(to right,#090909,transparent)' }} />
          <div ref={coinsContainerRef} className="absolute inset-0" />
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <div className="w-6 h-6 rounded-full border border-white/15 flex items-center justify-center text-white/25 text-xs">+</div>
        <span className="text-[9px] tracking-[0.16em] uppercase text-white/20">Scroll</span>
      </motion.div>
    </section>
  )
}
