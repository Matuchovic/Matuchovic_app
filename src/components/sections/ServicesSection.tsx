'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const data = [
  { num:'01', icon:'◻', label:'Webové stránky',  title:'Firemní web',           body:'Landing pages, firemní prezentace a weby které prodávají. Každý pixel má svůj důvod.',              time:'4–8 týdnů',   tags:['Next.js','Tailwind','SEO','Framer'] },
  { num:'02', icon:'◼', label:'Webové aplikace', title:'SaaS & Portály',         body:'Klientské portály, rezervační systémy a SaaS produkty. Plná autentizace a databáze.',               time:'8–16 týdnů',  tags:['React','Supabase','Prisma','NextAuth'] },
  { num:'03', icon:'◈', label:'AI Agenti',        title:'Inteligentní systémy',   body:'AI asistenti pro zákaznickou podporu, obsah nebo automatizaci rozhodování. Pracují 24/7.',          time:'3–6 týdnů',   tags:['OpenAI','LangChain','API','Webhooks'] },
  { num:'04', icon:'⬡', label:'Automatizace',     title:'Workflow & Procesy',     body:'Propojení systémů a automatické procesy. Šetří desítky hodin týdně bez námahy.',                   time:'2–4 týdny',   tags:['Make.com','n8n','Zapier','REST'] },
  { num:'05', icon:'▣', label:'Interní systémy',  title:'Firemní nástroje',       body:'Dashboardy, CRM a intranet portály přizpůsobené přesně vašim interním procesům.',                  time:'10–20 týdnů', tags:['Full-stack','Role-based','Analytics'] },
  { num:'06', icon:'◎', label:'UX/UI Design',     title:'Digitální design',       body:'Wireframy, prototypy a design systémy. Figma first s kompletním developer handoffem.',             time:'3–8 týdnů',   tags:['Figma','Prototyping','Design system','Handoff'] },
]

const techWords = ['NEXT.JS','REACT','TYPESCRIPT','TAILWIND','GSAP','SUPABASE','PRISMA','FIGMA','VERCEL','THREE.JS','FRAMER','OPENAI','AUTOMATION','UI/UX','FULL-STACK','AI','SEO','SAAS']
const marqueeWords = ['Next.js','React','TypeScript','Tailwind CSS','Supabase','Prisma','GSAP','Three.js','Figma','Vercel','OpenAI','Framer Motion']

function OrbitalCanvas({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const secRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5, rx: 0, ry: 0, hov: false })

  useEffect(() => {
    const canvas = canvasRef.current
    const sec = secRef.current
    if (!canvas || !sec) return
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0

    const resize = () => {
      W = canvas.width = sec.offsetWidth
      H = canvas.height = sec.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(sec)

    const GOLD = 'rgba(212,164,95,', WHITE = 'rgba(255,255,255,'
    const ow = techWords.map((w, i) => {
      const orb = Math.floor(i / 6)
      const sp = (0.0004 + orb * 0.0002) * (i % 2 === 0 ? 1 : -1)
      return {
        text: w, orb, angle: (i % 6) / 6 * Math.PI * 2 + Math.random() * 0.4,
        radius: 80 + orb * 60, speed: sp, alpha: 0,
        size: orb === 0 ? 10 : orb === 1 ? 8.5 : 7.5,
        weight: orb === 0 ? '700' : orb === 1 ? '500' : '400',
        isGold: i % 5 === 0, px: 0, py: 0, scale: 1
      }
    })
    const parts = Array.from({ length: 100 }, () => {
      const a = Math.random() * Math.PI * 2, r = 10 + Math.random() * 220
      return { angle: a, radius: r, speed: (0.001 + Math.random() * 0.003) * (Math.random() > 0.5 ? 1 : -1), size: 0.5 + Math.random() * 1.4, alpha: 0.07 + Math.random() * 0.28, isGold: Math.random() < 0.3 }
    })
    const bursts: { x: number; y: number; r: number; life: number }[] = []
    let cGlow = 0, cScale = 1, cTargetScale = 1, t = 0, raf: number

    const onMove = (e: MouseEvent) => {
      const r = sec.getBoundingClientRect()
      mouseRef.current = { rx: e.clientX - r.left, ry: e.clientY - r.top, x: (e.clientX - r.left) / W, y: (e.clientY - r.top) / H, hov: true }
    }
    const onLeave = () => { mouseRef.current.hov = false }
    const onClick = (e: MouseEvent) => {
      const r = sec.getBoundingClientRect()
      bursts.push({ x: e.clientX - r.left, y: e.clientY - r.top, r: 0, life: 1 })
      cTargetScale = 1.12; setTimeout(() => { cTargetScale = 1 }, 300)
    }
    sec.addEventListener('mousemove', onMove)
    sec.addEventListener('mouseleave', onLeave)
    sec.addEventListener('click', onClick)

    const lp = (a: number, b: number, f: number) => a + (b - a) * f

    const draw = () => {
      ctx.clearRect(0, 0, W, H); t += 0.008
      const m = mouseRef.current
      cGlow = lp(cGlow, m.hov ? 1 : 0.65, 0.04)
      cScale = lp(cScale, cTargetScale, 0.12)
      const vcx = W / 2 + lp(0, (m.x - 0.5) * 35, 0.3)
      const vcy = H / 2 + lp(0, (m.y - 0.5) * 20, 0.3)

      const ag = ctx.createRadialGradient(vcx, vcy, 0, vcx, vcy, Math.min(W, H) * 0.5)
      ag.addColorStop(0, GOLD + 0.07 * cGlow + ')')
      ag.addColorStop(0.5, GOLD + 0.02 * cGlow + ')')
      ag.addColorStop(1, 'transparent')
      ctx.fillStyle = ag; ctx.fillRect(0, 0, W, H)

      ;[80, 140, 200].forEach((br, ri) => {
        ctx.beginPath(); ctx.arc(vcx, vcy, br + Math.sin(t * 0.5 + ri) * 2, 0, Math.PI * 2)
        ctx.strokeStyle = GOLD + (0.06 - ri * 0.015) + ')'
        ctx.lineWidth = 0.5; ctx.setLineDash([2, 9]); ctx.stroke(); ctx.setLineDash([])
      })

      parts.forEach(p => {
        p.angle += p.speed
        const px = vcx + Math.cos(p.angle + t * 0.08) * p.radius
        const py = vcy + Math.sin(p.angle + t * 0.08) * p.radius * 0.55
        ctx.beginPath(); ctx.arc(px, py, p.size, 0, Math.PI * 2)
        ctx.fillStyle = (p.isGold ? GOLD : WHITE) + p.alpha * cGlow + ')'
        if (p.isGold && p.size > 1) { ctx.shadowColor = '#D4A45F'; ctx.shadowBlur = 5 }
        ctx.fill(); ctx.shadowBlur = 0
      })

      ow.forEach(w => {
        w.angle += w.speed
        w.px = vcx + Math.cos(w.angle) * w.radius
        w.py = vcy + Math.sin(w.angle) * w.radius * 0.52
        const depth = 0.3 + (Math.sin(w.angle) * 0.5 + 0.5) * 0.7
        w.alpha = lp(w.alpha, depth, 0.06)
        const dx = m.rx - w.px, dy = m.ry - w.py
        const hov = m.hov && Math.sqrt(dx * dx + dy * dy) < 46
        w.scale = lp(w.scale, hov ? 1.5 : 1, 0.1)
        ctx.save(); ctx.translate(w.px, w.py); ctx.scale(w.scale, w.scale)
        ctx.font = `${w.weight} ${w.size}px Inter, sans-serif`
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        if (hov) { ctx.shadowColor = w.isGold ? '#D4A45F' : '#fff'; ctx.shadowBlur = 18; ctx.fillStyle = w.isGold ? 'rgba(212,164,95,1)' : 'rgba(255,255,255,1)' }
        else { ctx.fillStyle = (w.isGold ? GOLD : WHITE) + w.alpha * 0.85 + ')' }
        ctx.fillText(w.text, 0, 0); ctx.shadowBlur = 0; ctx.restore()
      })

      ctx.save(); ctx.translate(vcx, vcy); ctx.scale(cScale, cScale)
      for (let ri = 4; ri >= 0; ri--) {
        const cr = ctx.createRadialGradient(0, 0, 0, 0, 0, 14 + ri * 12)
        cr.addColorStop(0, GOLD + (0.14 - ri * 0.022) * cGlow + ')'); cr.addColorStop(1, 'transparent')
        ctx.fillStyle = cr; ctx.beginPath(); ctx.arc(0, 0, 14 + ri * 12, 0, Math.PI * 2); ctx.fill()
      }
      const cg = ctx.createRadialGradient(0, 0, 0, 0, 0, 9)
      cg.addColorStop(0, `rgba(255,255,255,${0.95 * cGlow})`); cg.addColorStop(0.4, GOLD + 0.9 * cGlow + ')'); cg.addColorStop(1, GOLD + '0)')
      ctx.fillStyle = cg; ctx.shadowColor = '#D4A45F'; ctx.shadowBlur = 30 * cGlow
      ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0
      ctx.font = '800 7px Inter, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillStyle = `rgba(255,255,255,${0.3 * cGlow})`; ctx.fillText('MATUCHOVIC', 0, 20)
      ctx.restore()

      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i]; b.r += 7; b.life -= 0.055
        if (b.life <= 0) { bursts.splice(i, 1); continue }
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.strokeStyle = GOLD + b.life * 0.5 + ')'; ctx.lineWidth = 1.5; ctx.stroke()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(raf); ro.disconnect()
      sec.removeEventListener('mousemove', onMove)
      sec.removeEventListener('mouseleave', onLeave)
      sec.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <div ref={secRef} className={`relative overflow-hidden cursor-crosshair ${className || ''}`} style={style}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}

function ScrollingCards({ onActiveChange }: { onActiveChange: (d: typeof data[0]) => void }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const colRef = useRef<HTMLDivElement>(null)
  const isPausedRef = useRef(false)
  const scrollYRef = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    const col = colRef.current
    if (!track || !col) return
    let raf: number, lastIdx = -1

    const buildCard = (d: typeof data[0], idx: number) => {
      const card = document.createElement('div')
      card.dataset.idx = String(idx)
      card.style.cssText = `width:100%;border-radius:16px;border:1px solid rgba(255,255,255,0.07);padding:20px;position:relative;overflow:hidden;flex-shrink:0;transition:filter 0.2s,opacity 0.2s,border-color 0.3s,box-shadow 0.3s;cursor:pointer;background:rgba(255,255,255,0.025);`

      const sp = document.createElement('div')
      sp.style.cssText = `position:absolute;inset:0;border-radius:16px;pointer-events:none;z-index:2;opacity:0;transition:opacity 0.4s;background:radial-gradient(circle at 40% 30%,rgba(255,255,255,0.04) 0%,transparent 70%);`

      const cv = document.createElement('canvas')
      cv.style.cssText = `position:absolute;inset:0;border-radius:16px;mix-blend-mode:screen;pointer-events:none;z-index:3;`
      const cctx = cv.getContext('2d')!
      let last = 0
      const alpha = 0.065 + (idx % 3) * 0.01
      const rs = () => { cv.width = card.offsetWidth; cv.height = card.offsetHeight }
      rs(); new ResizeObserver(rs).observe(card)
      const dn = (ts: number) => {
        if (ts - last >= 65) {
          const img = cctx.createImageData(cv.width || 1, cv.height || 1)
          const dd = img.data
          for (let i = 0; i < dd.length; i += 4) { const v = (Math.random() * 255) | 0; dd[i] = v; dd[i+1] = v; dd[i+2] = v; dd[i+3] = (Math.random() * alpha * 255) | 0 }
          cctx.putImageData(img, 0, 0); last = ts
        }
        requestAnimationFrame(dn)
      }
      requestAnimationFrame(dn)

      const cont = document.createElement('div')
      cont.style.cssText = 'position:relative;z-index:4;'
      cont.innerHTML = `
        <div style="font-size:8px;font-weight:700;letter-spacing:0.14em;color:rgba(255,255,255,0.18);margin-bottom:12px;text-transform:uppercase;">${d.num} — ${d.label}</div>
        <div style="font-size:20px;margin-bottom:10px;line-height:1;">${d.icon}</div>
        <div style="font-size:14px;font-weight:800;color:rgba(255,255,255,0.88);letter-spacing:-0.02em;margin-bottom:6px;">${d.title}</div>
        <div style="font-size:9px;color:rgba(255,255,255,0.3);line-height:1.65;margin-bottom:12px;">${d.body}</div>
        <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:12px;">${d.tags.map(t => `<span style="font-size:7px;padding:2px 7px;border-radius:20px;border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.25);">${t}</span>`).join('')}</div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding-top:10px;border-top:1px solid rgba(255,255,255,0.05);">
          <span style="font-size:7px;color:rgba(255,255,255,0.18);letter-spacing:0.08em;">${d.time}</span>
          <div style="width:20px;height:20px;border-radius:50%;border:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.3);font-size:9px;">↗</div>
        </div>`

      card.appendChild(sp); card.appendChild(cv); card.appendChild(cont)
      card.addEventListener('mouseenter', () => {
        isPausedRef.current = true; sp.style.opacity = '1'
        card.style.borderColor = 'rgba(255,255,255,0.16)'
        card.style.boxShadow = '0 0 40px rgba(0,0,0,0.4),inset 0 0 20px rgba(255,255,255,0.02)'
        card.style.filter = 'none'; card.style.opacity = '1'; card.style.transform = 'scale(1.02)'
        onActiveChange(data[idx])
      })
      card.addEventListener('mouseleave', () => {
        isPausedRef.current = false; sp.style.opacity = '0'; card.style.borderColor = ''; card.style.boxShadow = ''
      })
      return card
    }

    data.forEach((d, i) => track.appendChild(buildCard(d, i)))
    setTimeout(() => { data.forEach((d, i) => track.appendChild(buildCard(d, i))) }, 80)

    const getHalf = () => {
      const cards = Array.from(track.children) as HTMLElement[]
      let h = 0
      const half = Math.floor(cards.length / 2)
      for (let i = 0; i < half; i++) h += cards[i].offsetHeight + 12
      return h
    }

    const animate = () => {
      if (!isPausedRef.current) scrollYRef.current += 0.42
      const half = getHalf()
      if (half > 0 && scrollYRef.current >= half) scrollYRef.current -= half
      track.style.transform = `translateX(-50%) translateY(-${scrollYRef.current}px)`
      const colH = col.offsetHeight, centerY = colH / 2
      let cumY = 80 - scrollYRef.current, bestD = Infinity, bestIdx = 0
      ;(Array.from(track.children) as HTMLElement[]).forEach(card => {
        const ch = card.offsetHeight, cc = cumY + ch / 2
        const dist = Math.abs(cc - centerY), maxD = colH * 0.42
        const tVal = Math.max(0, (dist / maxD) - 0.12)
        if (!card.matches(':hover')) {
          card.style.filter = `blur(${(tVal * 5.5).toFixed(1)}px)`
          card.style.opacity = String(Math.max(0.08, 1 - tVal * 0.92))
          card.style.transform = `scale(${Math.max(0.9, 1 - tVal * 0.1).toFixed(3)})`
          card.style.borderColor = dist < 40 ? 'rgba(212,164,95,0.2)' : 'rgba(255,255,255,0.07)'
        }
        if (dist < bestD) { bestD = dist; bestIdx = parseInt(card.dataset.idx || '0') }
        cumY += ch + 12
      })
      if (!isPausedRef.current && bestIdx !== lastIdx) { lastIdx = bestIdx; onActiveChange(data[bestIdx]) }
      raf = requestAnimationFrame(animate)
    }
    animate()
    return () => { cancelAnimationFrame(raf); track.innerHTML = '' }
  }, [])

  return (
    <div ref={colRef} className="relative flex-shrink-0 overflow-hidden" style={{ width: 300, height: '100%' }}>
      <div className="absolute inset-x-0 top-0 z-20 pointer-events-none" style={{ height: 160, background: 'linear-gradient(to bottom,#090909 0%,rgba(9,9,9,0.8) 40%,transparent 100%)' }} />
      <div className="absolute inset-x-0 bottom-0 z-20 pointer-events-none" style={{ height: 160, background: 'linear-gradient(to top,#090909 0%,rgba(9,9,9,0.8) 40%,transparent 100%)' }} />
      <div ref={trackRef} className="absolute top-0 flex flex-col" style={{ left: '50%', transform: 'translateX(-50%)', width: 268, gap: 12, padding: '80px 0' }} />
    </div>
  )
}

function ProcessSteps() {
  const steps = [
    { num: '01', title: 'Analýza',  desc: 'Pochopíme váš byznys a cíle.', time: '1–2 dny' },
    { num: '02', title: 'Návrh',    desc: 'Wireframy a prototyp v Figmě.', time: '3–7 dní' },
    { num: '03', title: 'Vývoj',    desc: 'Next.js, databáze, API.', time: '2–8 týdnů' },
    { num: '04', title: 'Launch',   desc: 'Deploy, testy, optimalizace.', time: '2–3 dny' },
    { num: '05', title: 'Růst',     desc: 'Analytics a vylepšení.', time: 'Ongoing' },
  ]
  const [activeStep, setActiveStep] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length)
    }, 2000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '32px 40px', position: 'relative', overflow: 'hidden', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
      {/* BG number */}
      <div style={{ position: 'absolute', bottom: -20, right: -10, fontSize: 120, fontWeight: 900, color: 'rgba(255,255,255,0.02)', letterSpacing: '-0.06em', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>
        {steps[activeStep].num}
      </div>

      <p style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(212,164,95,0.6)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 12, height: 1, background: 'rgba(212,164,95,0.4)', display: 'inline-block' }} />
        Jak to probíhá
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2 }}>
        {steps.map((step, i) => (
          <div
            key={step.num}
            onClick={() => setActiveStep(i)}
            style={{
              display: 'grid',
              gridTemplateColumns: '32px 1fr auto',
              gap: 12,
              alignItems: 'center',
              padding: '10px 0',
              borderBottom: i < steps.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              cursor: 'pointer',
              opacity: activeStep === i ? 1 : 0.28,
              transition: 'opacity 0.35s ease',
            }}
          >
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              border: `1px solid ${activeStep === i ? 'rgba(212,164,95,0.35)' : 'rgba(255,255,255,0.08)'}`,
              background: activeStep === i ? 'rgba(212,164,95,0.08)' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 8, fontWeight: 700,
              color: activeStep === i ? 'rgba(212,164,95,0.85)' : 'rgba(255,255,255,0.25)',
              transition: 'all 0.35s ease', flexShrink: 0,
            }}>
              {step.num}
            </div>

            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: activeStep === i ? '#fff' : 'rgba(255,255,255,0.5)', letterSpacing: '-0.01em', marginBottom: activeStep === i ? 3 : 0, transition: 'all 0.35s ease' }}>
                {step.title}
              </div>
              <div style={{
                fontSize: 10, color: 'rgba(255,255,255,0.28)', lineHeight: 1.55,
                maxHeight: activeStep === i ? 40 : 0,
                overflow: 'hidden',
                opacity: activeStep === i ? 1 : 0,
                transition: 'max-height 0.35s ease, opacity 0.35s ease',
              }}>
                {step.desc}
              </div>
            </div>

            <div style={{
              fontSize: 8, letterSpacing: '0.06em',
              color: activeStep === i ? 'rgba(212,164,95,0.55)' : 'rgba(255,255,255,0.12)',
              transition: 'color 0.35s ease', flexShrink: 0,
            }}>
              {step.time}
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginTop: 16, borderRadius: 1, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          background: 'linear-gradient(90deg,#D4A45F,rgba(212,164,95,0.3))',
          width: `${((activeStep + 1) / steps.length) * 100}%`,
          transition: 'width 0.35s ease',
          borderRadius: 1,
        }} />
      </div>
    </div>
  )
}


export function ServicesSection() {
  const [active, setActive] = useState(data[0])
  const [panelFade, setPanelFade] = useState(false)
  const lastActiveRef = useRef(data[0])

  const handleActiveChange = (d: typeof data[0]) => {
    if (d.num === lastActiveRef.current.num) return
    setPanelFade(true)
    setTimeout(() => { setActive(d); lastActiveRef.current = d; setPanelFade(false) }, 180)
  }

  return (
    <section id="sluzby" style={{ background: '#090909' }}>

      {/* ── INTRO ── */}
      <div className="relative overflow-hidden" style={{ padding: '72px 64px 52px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="absolute select-none pointer-events-none" style={{ top: -8, right: -24, fontSize: 140, fontWeight: 900, color: 'rgba(255,255,255,0.02)', letterSpacing: '-0.06em', lineHeight: 1 }}>SLUŽBY</div>
        <div className="relative z-10 grid gap-14" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              style={{ fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(212,164,95,0.75)', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 22, height: 1, background: 'rgba(212,164,95,0.5)', display: 'inline-block' }} />Co umím
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
              style={{ fontSize: 'clamp(30px,4vw,52px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.0, color: '#fff' }}>
              Digitální<br />produkty, které<br /><span style={{ color: '#D4A45F' }}>skutečně</span>{' '}
              <span style={{ color: 'rgba(255,255,255,0.18)' }}>fungují.</span>
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col justify-end">
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, marginBottom: 28, maxWidth: 360 }}>
              Neprodávám šablony. Každý projekt vzniká od nuly — s pochopením vašeho byznysu, zákazníků a cílů.{' '}
              <strong style={{ color: 'rgba(255,255,255,0.72)', fontWeight: 600 }}>Výsledek má být funkční, rychlý a krásný zároveň.</strong>
            </p>
            <div className="flex gap-10">
              {[['50+','Projektů'],['5+','Let praxe'],['100%','Spokojenost']].map(([val, lbl]) => (
                <div key={lbl}>
                  <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>
                    {val.replace(/[+%]/g, '')}<span style={{ color: '#D4A45F' }}>{val.replace(/[^+%]/g, '')}</span>
                  </div>
                  <div style={{ fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginTop: 5 }}>{lbl}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="relative mt-10 overflow-hidden" style={{ height: 30 }}>
          <div className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right,#090909,transparent)' }} />
          <div className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left,#090909,transparent)' }} />
          <div className="flex items-center" style={{ animation: 'svcMarquee 24s linear infinite', whiteSpace: 'nowrap' }}>
            {[...marqueeWords, ...marqueeWords].map((w, i) => (
              <span key={i} style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)', padding: '0 22px', display: 'inline-flex', alignItems: 'center', gap: 22 }}>
                {w}<span style={{ color: 'rgba(212,164,95,0.25)' }}>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── SCROLLING CARDS + PROCESS STEPS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', height: 520, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <ScrollingCards onActiveChange={handleActiveChange} />
        <ProcessSteps />
      </div>

      {/* ── BOTTOM ROW: outro left + process steps right ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid rgba(255,255,255,0.05)', minHeight: 520 }}>

        {/* Left — quote + outro */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '72px 64px', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 52 }}>
            <div style={{ width: 22, height: 1, background: 'rgba(212,164,95,0.4)', flexShrink: 0, marginTop: 10 }} />
            <p style={{ fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.02em', fontStyle: 'italic', lineHeight: 1.7 }}>
              Technologie je jen nástroj —{' '}<strong style={{ color: 'rgba(212,164,95,0.55)', fontStyle: 'normal', fontWeight: 600 }}>výsledek je to, co počítá</strong>
            </p>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <h3 style={{ fontSize: 'clamp(24px,3vw,38px)', fontWeight: 900, letterSpacing: '-0.04em', color: '#fff', lineHeight: 1.06, marginBottom: 16 }}>
              Máte projekt<br />v hlavě?{' '}<span style={{ color: '#D4A45F' }}>Pojďme na to.</span>
            </h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.32)', lineHeight: 1.8, marginBottom: 32, maxWidth: 360 }}>
              První konzultace je zdarma. Řeknete mi o projektu, já řeknu jak na to — bez závazků, bez bullshitu.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>
              <a href="#kontakt" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#D4A45F', color: '#090909', fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '13px 28px', borderRadius: 40, boxShadow: '0 4px 24px rgba(212,164,95,0.25)', textDecoration: 'none' }}>
                Domluvit konzultaci ↗
              </a>
              <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.15)', letterSpacing: '0.08em' }}>Obvykle odpovídám do 24 hodin</span>
            </div>
          </motion.div>
        </div>

        {/* Right — animated process steps */}
        <ProcessSteps />
      </div>

<style>{`@keyframes svcMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </section>
  )
}
