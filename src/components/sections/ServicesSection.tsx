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

function OrbitalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const secRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5, rx: 0, ry: 0, hov: false })

  useEffect(() => {
    const canvas = canvasRef.current
    const sec = secRef.current
    if (!canvas || !sec) return
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0, cx = 0, cy = 0

    const resize = () => {
      W = canvas.width = sec.offsetWidth
      H = canvas.height = sec.offsetHeight
      cx = W / 2; cy = H / 2
    }
    resize()
    window.addEventListener('resize', resize)

    const GOLD = 'rgba(212,164,95,', WHITE = 'rgba(255,255,255,'
    const ow = techWords.map((w, i) => {
      const orb = Math.floor(i / 6)
      const sp = (0.0004 + orb * 0.0002) * (i % 2 === 0 ? 1 : -1)
      return { text: w, orb, angle: (i % 6) / 6 * Math.PI * 2 + Math.random() * 0.4, radius: 70 + orb * 55, speed: sp, alpha: 0, size: orb === 0 ? 9 : orb === 1 ? 8 : 7, weight: orb === 0 ? '700' : orb === 1 ? '500' : '400', isGold: i % 5 === 0, px: 0, py: 0, scale: 1 }
    })
    const parts = Array.from({ length: 90 }, () => {
      const a = Math.random() * Math.PI * 2, r = 10 + Math.random() * 165
      return { angle: a, radius: r, speed: (0.001 + Math.random() * 0.003) * (Math.random() > 0.5 ? 1 : -1), size: 0.4 + Math.random() * 1.2, alpha: 0.07 + Math.random() * 0.28, isGold: Math.random() < 0.3, px: 0, py: 0 }
    })
    const bursts: { x: number; y: number; r: number; life: number }[] = []
    let cGlow = 0, cScale = 1, t = 0

    const onMove = (e: MouseEvent) => {
      const r = sec.getBoundingClientRect()
      mouseRef.current.rx = e.clientX - r.left
      mouseRef.current.ry = e.clientY - r.top
      mouseRef.current.x = mouseRef.current.rx / W
      mouseRef.current.y = mouseRef.current.ry / H
      mouseRef.current.hov = true
    }
    const onLeave = () => { mouseRef.current.hov = false }
    const onClick = (e: MouseEvent) => {
      const r = sec.getBoundingClientRect()
      bursts.push({ x: e.clientX - r.left, y: e.clientY - r.top, r: 0, life: 1 })
    }
    sec.addEventListener('mousemove', onMove)
    sec.addEventListener('mouseleave', onLeave)
    sec.addEventListener('click', onClick)

    const lp = (a: number, b: number, f: number) => a + (b - a) * f
    let raf: number

    const draw = () => {
      ctx.clearRect(0, 0, W, H); t += 0.008
      const m = mouseRef.current
      cGlow = lp(cGlow, m.hov ? 1 : 0.6, 0.04)
      const vcx = cx + lp(0, (m.x - 0.5) * 25, 0.3)
      const vcy = cy + lp(0, (m.y - 0.5) * 15, 0.3)
      const ag = ctx.createRadialGradient(vcx, vcy, 0, vcx, vcy, W * 0.32)
      ag.addColorStop(0, GOLD + 0.05 * cGlow + ')')
      ag.addColorStop(1, 'transparent')
      ctx.fillStyle = ag; ctx.fillRect(0, 0, W, H)
      ;[70, 120, 170].forEach((br, ri) => {
        ctx.beginPath(); ctx.arc(vcx, vcy, br + Math.sin(t * 0.5 + ri) * 2, 0, Math.PI * 2)
        ctx.strokeStyle = GOLD + (0.05 - ri * 0.012) + ')'; ctx.lineWidth = 0.5
        ctx.setLineDash([2, 8]); ctx.stroke(); ctx.setLineDash([])
      })
      parts.forEach(p => {
        p.angle += p.speed
        p.px = vcx + Math.cos(p.angle + t * 0.08) * p.radius
        p.py = vcy + Math.sin(p.angle + t * 0.08) * p.radius * 0.5
        ctx.beginPath(); ctx.arc(p.px, p.py, p.size, 0, Math.PI * 2)
        ctx.fillStyle = (p.isGold ? GOLD : WHITE) + p.alpha * cGlow + ')'
        if (p.isGold && p.size > 1) { ctx.shadowColor = '#D4A45F'; ctx.shadowBlur = 4 }
        ctx.fill(); ctx.shadowBlur = 0
      })
      ow.forEach(w => {
        w.angle += w.speed
        w.px = vcx + Math.cos(w.angle) * w.radius
        w.py = vcy + Math.sin(w.angle) * w.radius * 0.5
        const depth = 0.3 + (Math.sin(w.angle) * 0.5 + 0.5) * 0.7
        w.alpha = lp(w.alpha, depth, 0.06)
        const dx = m.rx - w.px, dy = m.ry - w.py
        const hov = Math.sqrt(dx * dx + dy * dy) < 36
        w.scale = lp(w.scale, hov ? 1.4 : 1, 0.1)
        ctx.save(); ctx.translate(w.px, w.py); ctx.scale(w.scale, w.scale)
        ctx.font = `${w.weight} ${w.size}px Inter, sans-serif`
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        if (hov) { ctx.shadowColor = w.isGold ? '#D4A45F' : '#fff'; ctx.shadowBlur = 16; ctx.fillStyle = w.isGold ? 'rgba(212,164,95,1)' : 'rgba(255,255,255,1)' }
        else { ctx.fillStyle = (w.isGold ? GOLD : WHITE) + w.alpha * 0.8 + ')' }
        ctx.fillText(w.text, 0, 0); ctx.shadowBlur = 0; ctx.restore()
      })
      ctx.save(); ctx.translate(vcx, vcy); ctx.scale(cScale, cScale)
      for (let ri = 3; ri >= 0; ri--) {
        const cr = ctx.createRadialGradient(0, 0, 0, 0, 0, 12 + ri * 9)
        cr.addColorStop(0, GOLD + (0.1 - ri * 0.02) * cGlow + ')')
        cr.addColorStop(1, 'transparent')
        ctx.fillStyle = cr; ctx.beginPath(); ctx.arc(0, 0, 12 + ri * 9, 0, Math.PI * 2); ctx.fill()
      }
      const cg = ctx.createRadialGradient(0, 0, 0, 0, 0, 8)
      cg.addColorStop(0, `rgba(255,255,255,${0.9 * cGlow})`)
      cg.addColorStop(0.4, GOLD + 0.8 * cGlow + ')')
      cg.addColorStop(1, GOLD + '0)')
      ctx.fillStyle = cg; ctx.shadowColor = '#D4A45F'; ctx.shadowBlur = 22 * cGlow
      ctx.beginPath(); ctx.arc(0, 0, 7, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0
      ctx.font = '700 7px Inter, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillStyle = `rgba(255,255,255,${0.3 * cGlow})`; ctx.fillText('MATUCHOVIC', 0, 18)
      ctx.restore()
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i]; b.r += 7; b.life -= 0.06
        if (b.life <= 0) { bursts.splice(i, 1); continue }
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.strokeStyle = GOLD + b.life * 0.4 + ')'; ctx.lineWidth = 1; ctx.stroke()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      sec.removeEventListener('mousemove', onMove)
      sec.removeEventListener('mouseleave', onLeave)
      sec.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <div ref={secRef} className="relative h-[360px] overflow-hidden cursor-crosshair">
      <div className="absolute inset-x-0 top-0 h-20 pointer-events-none z-10" style={{ background: 'linear-gradient(to bottom,#090909,transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none z-10" style={{ background: 'linear-gradient(to top,#090909,transparent)' }} />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}

function ScrollingCards() {
  const trackRef = useRef<HTMLDivElement>(null)
  const colRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(data[0])
  const isPausedRef = useRef(false)
  const scrollYRef = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    const col = colRef.current
    if (!track || !col) return
    const SPEED = 0.4
    let raf: number, lastIdx = -1

    const buildCard = (d: typeof data[0], idx: number) => {
      const card = document.createElement('div')
      card.dataset.idx = String(idx)
      card.style.cssText = `width:100%;border-radius:14px;border:1px solid rgba(255,255,255,0.07);padding:17px;position:relative;overflow:hidden;flex-shrink:0;transition:filter 0.2s,opacity 0.2s,border-color 0.3s;cursor:pointer;background:rgba(255,255,255,0.022);`

      const sp = document.createElement('div')
      sp.style.cssText = `position:absolute;inset:0;border-radius:14px;pointer-events:none;z-index:2;opacity:0;transition:opacity 0.3s;background:radial-gradient(circle at 50% 50%,rgba(255,255,255,0.035) 0%,transparent 65%);`

      const cv = document.createElement('canvas')
      cv.style.cssText = `position:absolute;inset:0;border-radius:14px;mix-blend-mode:screen;pointer-events:none;z-index:3;`
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
      cont.innerHTML = `<div style="font-size:8px;font-weight:700;letter-spacing:0.14em;color:rgba(255,255,255,0.15);margin-bottom:10px;">${d.num} — ${d.label}</div><div style="font-size:17px;margin-bottom:8px;">${d.icon}</div><div style="font-size:12px;font-weight:800;color:rgba(255,255,255,0.85);letter-spacing:-0.02em;margin-bottom:5px;">${d.title}</div><div style="font-size:9px;color:rgba(255,255,255,0.28);line-height:1.6;margin-bottom:10px;">${d.body}</div><div style="display:flex;flex-wrap:wrap;gap:3px;margin-bottom:10px;">${d.tags.map(t => `<span style="font-size:7px;padding:2px 6px;border-radius:20px;border:1px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.22);">${t}</span>`).join('')}</div><div style="display:flex;align-items:center;justify-content:space-between;padding-top:8px;border-top:1px solid rgba(255,255,255,0.04);"><span style="font-size:7px;color:rgba(255,255,255,0.16);letter-spacing:0.06em;">${d.time}</span><div style="width:18px;height:18px;border-radius:50%;border:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.28);font-size:8px;">↗</div></div>`

      card.appendChild(sp); card.appendChild(cv); card.appendChild(cont)
      card.addEventListener('mouseenter', () => {
        isPausedRef.current = true
        sp.style.opacity = '1'
        card.style.borderColor = 'rgba(255,255,255,0.18)'
        card.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.05)'
        card.style.filter = 'none'; card.style.opacity = '1'; card.style.transform = 'scale(1.02)'
        setActive(data[idx])
      })
      card.addEventListener('mouseleave', () => {
        isPausedRef.current = false
        sp.style.opacity = '0'
        card.style.borderColor = ''
        card.style.boxShadow = ''
      })
      return card
    }

    data.forEach((d, i) => track.appendChild(buildCard(d, i)))
    setTimeout(() => { data.forEach((d, i) => track.appendChild(buildCard(d, i))) }, 80)

    const getHalf = () => {
      const cards = Array.from(track.children) as HTMLElement[]
      let h = 0
      const half = Math.floor(cards.length / 2)
      for (let i = 0; i < half; i++) h += cards[i].offsetHeight + 10
      return h
    }

    const animate = () => {
      if (!isPausedRef.current) scrollYRef.current += SPEED
      const half = getHalf()
      if (half > 0 && scrollYRef.current >= half) scrollYRef.current -= half
      track.style.transform = `translateX(-50%) translateY(-${scrollYRef.current}px)`
      const colH = col.offsetHeight, centerY = colH / 2
      let cumY = 80 - scrollYRef.current, bestD = Infinity, bestIdx = 0
      ;(Array.from(track.children) as HTMLElement[]).forEach(card => {
        const ch = card.offsetHeight, cc = cumY + ch / 2
        const dist = Math.abs(cc - centerY), maxD = colH * 0.42
        const tVal = Math.max(0, (dist / maxD) - 0.12)
        if (!isPausedRef.current || card !== document.activeElement) {
          if (!card.matches(':hover')) {
            card.style.filter = `blur(${(tVal * 6).toFixed(1)}px)`
            card.style.opacity = String(Math.max(0.1, 1 - tVal * 0.9))
            card.style.transform = `scale(${Math.max(0.91, 1 - tVal * 0.09).toFixed(3)})`
          }
        }
        if (dist < bestD) { bestD = dist; bestIdx = parseInt(card.dataset.idx || '0') }
        const isAct = dist < 35
        if (isAct && !card.matches(':hover')) {
          card.style.borderColor = 'rgba(212,164,95,0.18)'
        } else if (!card.matches(':hover')) {
          card.style.borderColor = 'rgba(255,255,255,0.07)'
        }
        cumY += ch + 10
      })
      if (!isPausedRef.current && bestIdx !== lastIdx) {
        lastIdx = bestIdx; setActive(data[bestIdx])
      }
      raf = requestAnimationFrame(animate)
    }
    animate()
    return () => { cancelAnimationFrame(raf); track.innerHTML = '' }
  }, [])

  return (
    <div className="flex items-center" style={{ height: 480, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <div ref={colRef} className="relative flex-shrink-0 overflow-hidden" style={{ width: 300, height: '100%' }}>
        <div className="absolute inset-x-0 top-0 h-36 pointer-events-none z-20" style={{ background: 'linear-gradient(to bottom,#090909,transparent)' }} />
        <div className="absolute inset-x-0 bottom-0 h-36 pointer-events-none z-20" style={{ background: 'linear-gradient(to top,#090909,transparent)' }} />
        <div ref={trackRef} className="absolute top-0 flex flex-col" style={{ left: '50%', transform: 'translateX(-50%)', width: 256, gap: 10, padding: '80px 0' }} />
      </div>

      <div style={{ width: 1, height: 260, background: 'linear-gradient(to bottom,transparent,rgba(255,255,255,0.06) 30%,rgba(255,255,255,0.06) 70%,transparent)', flexShrink: 0 }} />

      <div className="flex-1 relative z-10" style={{ padding: '0 32px 0 36px' }}>
        <p className="flex items-center gap-2 mb-3" style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(212,164,95,0.7)' }}>
          <span style={{ width: 14, height: 1, background: 'rgba(212,164,95,0.5)', display: 'inline-block' }} />
          Specializace
        </p>
        <div style={{ transition: 'opacity 0.25s' }}>
          <div style={{ fontSize: 52, fontWeight: 900, letterSpacing: '-0.06em', color: 'rgba(255,255,255,0.04)', lineHeight: 1, marginBottom: -10 }}>{active.num}</div>
          <h3 style={{ fontSize: 'clamp(20px,2.4vw,28px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, color: '#fff', marginBottom: 8 }}>{active.title}</h3>
          <p style={{ fontSize: 7, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 1, background: 'rgba(255,255,255,0.18)', display: 'inline-block' }} />{active.time}
          </p>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.33)', lineHeight: 1.75, marginBottom: 14, maxWidth: 270 }}>{active.body}</p>
          <div className="flex flex-wrap gap-1 mb-5">
            {active.tags.map(t => <span key={t} style={{ fontSize: 7, padding: '3px 8px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.25)' }}>{t}</span>)}
          </div>
        </div>
        <a href="#kontakt" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: '#D4A45F', color: '#090909', fontSize: 8, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '9px 18px', borderRadius: 40 }}>
          Domluvit konzultaci ↗
        </a>
      </div>
    </div>
  )
}

export function ServicesSection() {
  return (
    <section id="sluzby" style={{ background: '#090909' }}>

      {/* INTRO */}
      <div className="relative px-12 pt-14 pb-10 overflow-hidden" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="absolute top-0 right-0 pointer-events-none select-none" style={{ fontSize: 120, fontWeight: 900, color: 'rgba(255,255,255,0.02)', letterSpacing: '-0.06em', lineHeight: 1 }}>SLUŽBY</div>
        <div className="grid gap-10" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-4" style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(212,164,95,0.7)' }}>
              <span style={{ width: 20, height: 1, background: 'rgba(212,164,95,0.5)', display: 'inline-block' }} />Co umím
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
              style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.02, color: '#fff' }}>
              Digitální produkty<br />které <span style={{ color: '#D4A45F' }}>skutečně</span><br /><span style={{ color: 'rgba(255,255,255,0.2)' }}>fungují.</span>
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col justify-end">
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', lineHeight: 1.75, marginBottom: 24, maxWidth: 340 }}>
              Neprodávám šablony. Každý projekt vzniká od nuly — s pochopením vašeho byznysu, zákazníků a cílů.{' '}
              <strong style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Výsledek má být funkční, rychlý a krásný zároveň.</strong>
            </p>
            <div className="flex gap-7">
              {[['50+','Projektů'],['5+','Let praxe'],['100%','Spokojenost']].map(([val,lbl]) => (
                <div key={lbl}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>{val.replace(/[0-9]+/, m => m)}<span style={{ color: '#D4A45F' }}>{val.replace(/[^+%]/g,'')}</span></div>
                  <div style={{ fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginTop: 4 }}>{lbl}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Marquee */}
        <div className="relative mt-8 overflow-hidden" style={{ height: 28 }}>
          <div className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right,#090909,transparent)' }} />
          <div className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left,#090909,transparent)' }} />
          <div className="flex" style={{ animation: 'marqueeScroll 22s linear infinite', whiteSpace: 'nowrap' }}>
            {[...marqueeWords, ...marqueeWords].map((w, i) => (
              <span key={i} style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', padding: '0 20px', display: 'inline-flex', alignItems: 'center', gap: 20 }}>
                {w}<span style={{ color: 'rgba(212,164,95,0.3)' }}>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* SCROLLING CARDS */}
      <ScrollingCards />

      {/* DIVIDER QUOTE */}
      <div className="flex items-center gap-5 px-12 py-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right,transparent,rgba(255,255,255,0.06),transparent)' }} />
        <p style={{ fontSize: 11, fontWeight: 300, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em', fontStyle: 'italic', whiteSpace: 'nowrap' }}>
          Technologie je jen nástroj — <strong style={{ color: 'rgba(212,164,95,0.5)', fontStyle: 'normal', fontWeight: 600 }}>výsledek je to, co počítá</strong>
        </p>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right,transparent,rgba(255,255,255,0.06),transparent)' }} />
      </div>

      {/* ORBITAL */}
      <OrbitalCanvas />

      {/* OUTRO */}
      <div className="flex items-center justify-between gap-10 px-12 py-10" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div>
          <h3 style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.04em', color: '#fff', lineHeight: 1.1, marginBottom: 8 }}>
            Máte projekt v hlavě?{' '}<span style={{ color: '#D4A45F' }}>Pojďme na to.</span>
          </h3>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', lineHeight: 1.7, maxWidth: 360 }}>
            První konzultace je zdarma. Řeknete mi o projektu, já řeknu jak na to — bez závazků, bez bullshitu.
          </p>
        </div>
        <div className="flex flex-col items-end gap-3 flex-shrink-0">
          <a href="#kontakt" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#D4A45F', color: '#090909', fontSize: 9, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '12px 24px', borderRadius: 40 }}>
            Domluvit konzultaci ↗
          </a>
          <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.15)', letterSpacing: '0.06em' }}>Obvykle odpovídám do 24 hodin</span>
        </div>
      </div>

      <style>{`@keyframes marqueeScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </section>
  )
}
