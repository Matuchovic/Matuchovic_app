'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const navLinks = [
  { label: 'Služby', href: '#sluzby' },
  { label: 'Projekty', href: '#projekty' },
  { label: 'O mně', href: '#o-mne' },
  { label: 'Kontakt', href: '#kontakt' },
]

export function Navbar() {
  const { data: session } = useSession()
  const [activeIndex, setActiveIndex] = useState(0)
  const [highlightStyle, setHighlightStyle] = useState<React.CSSProperties>({})
  const [menuOpen, setMenuOpen] = useState(false)
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => { moveHighlight(0) }, [])
  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function moveHighlight(idx: number) {
    const el = linksRef.current[idx]
    const container = containerRef.current
    if (!el || !container) return
    const elRect = el.getBoundingClientRect()
    const cRect = container.getBoundingClientRect()
    setHighlightStyle({ width: elRect.width, height: elRect.height, left: elRect.left - cRect.left, top: elRect.top - cRect.top })
  }

  return (
    <>
      <style>{`
        @keyframes ctaShimmer { 0%{left:-100%} 60%{left:150%} 100%{left:150%} }
        @keyframes navSheen { 0%,100%{opacity:0.06} 50%{opacity:0.1} }
        @keyframes reflPulse { 0%,100%{opacity:0.4;transform:scaleX(0.9)} 50%{opacity:0.7;transform:scaleX(1.05)} }
        @keyframes drawerIn { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        .nav-frosted {
          background:rgba(255,255,255,0.025);
          border:1px solid rgba(255,255,255,0.08);
          box-shadow:inset 0 1px 0 rgba(255,255,255,0.1),inset 0 -1px 0 rgba(0,0,0,0.25),0 0 0 1px rgba(212,164,95,0.1),0 24px 60px rgba(0,0,0,0.55);
          transition:box-shadow 0.4s ease,border-color 0.4s ease;
        }
        .nav-frosted:hover {
          border-color:rgba(255,255,255,0.12);
          box-shadow:inset 0 1px 0 rgba(255,255,255,0.13),inset 0 -1px 0 rgba(0,0,0,0.3),0 0 0 1px rgba(212,164,95,0.2),0 28px 70px rgba(0,0,0,0.6),0 0 40px rgba(212,164,95,0.06);
        }
        .nav-cta { position:relative; overflow:hidden; }
        .nav-cta::before { content:''; position:absolute; top:0; left:-100%; width:60%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent); animation:ctaShimmer 3s ease-in-out infinite; }
        .nav-hl { position:absolute; border-radius:40px; background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.06); transition:all 0.35s cubic-bezier(0.16,1,0.3,1); pointer-events:none; z-index:0; }
        .nav-lnk { transition:color 0.2s; }
        .nav-lnk:hover { color:rgba(255,255,255,0.9) !important; }
        .hamburger span { display:block; width:18px; height:1.5px; background:#fff; border-radius:2px; transition:all 0.3s ease; transform-origin:center; }
        .hamburger.open span:nth-child(1) { transform:translateY(5px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity:0; transform:scaleX(0); }
        .hamburger.open span:nth-child(3) { transform:translateY(-5px) rotate(-45deg); }
        .mobile-drawer {
          position:fixed; top:0; left:0; right:0; bottom:0;
          background:rgba(9,9,9,0.97);
          backdrop-filter:blur(20px);
          z-index:48;
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          animation:drawerIn 0.3s ease;
        }
        .mobile-link {
          font-family:Inter,sans-serif; font-size:32px; font-weight:900;
          letter-spacing:-0.04em; color:rgba(255,255,255,0.85);
          text-decoration:none; padding:12px 0;
          transition:color 0.2s, transform 0.2s;
        }
        .mobile-link:hover { color:#D4A45F; transform:translateX(8px); }
      `}</style>

      {/* Reflection */}
      <div aria-hidden="true" style={{position:'fixed',top:68,left:'15%',right:'15%',height:16,background:'radial-gradient(ellipse at 50% 0%, rgba(212,164,95,0.07) 0%, transparent 70%)',filter:'blur(6px)',borderRadius:'50%',pointerEvents:'none',zIndex:49,animation:'reflPulse 4s ease-in-out infinite'}} />

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="mobile-drawer" onClick={() => setMenuOpen(false)}>
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8,marginBottom:48}}>
            {navLinks.map((link, i) => (
              <a key={link.label} href={link.href} className="mobile-link" onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
          </div>
          <a href="#kontakt" className="nav-cta" onClick={() => setMenuOpen(false)} style={{fontFamily:'Inter,sans-serif',fontSize:12,fontWeight:800,letterSpacing:'0.1em',textTransform:'uppercase',color:'#090909',background:'linear-gradient(135deg,#E8C080,#D4A45F,#C8903A)',padding:'14px 32px',borderRadius:40,textDecoration:'none',boxShadow:'0 4px 24px rgba(212,164,95,0.3)'}}>
            Konzultace ↗
          </a>
          <p style={{marginTop:32,fontFamily:'Inter,sans-serif',fontSize:10,letterSpacing:'0.12em',color:'rgba(255,255,255,0.2)'}}>
            info@ondrejmatucha.cz
          </p>
        </div>
      )}

      <nav style={{position:'fixed',top:16,left:0,right:0,zIndex:50,display:'flex',justifyContent:'center',pointerEvents:'none',padding:'0 16px'}}>
        <div className="nav-frosted" style={{display:'inline-flex',alignItems:'center',height:56,padding:'4px 5px',borderRadius:50,pointerEvents:'all',position:'relative',maxWidth:'100%'}}>

          <div aria-hidden="true" style={{position:'absolute',top:0,left:0,right:0,height:'45%',borderRadius:'50px 50px 0 0',background:'linear-gradient(180deg,rgba(255,255,255,0.07) 0%,transparent 100%)',animation:'navSheen 4s ease-in-out infinite',pointerEvents:'none'}} />

          <Link href="/" style={{fontFamily:'Inter,sans-serif',fontSize:12,fontWeight:900,color:'#fff',letterSpacing:'0.06em',padding:'0 18px',whiteSpace:'nowrap',position:'relative',zIndex:1,textDecoration:'none'}}>
            MATUCHOVIC.
          </Link>

          {/* Desktop links */}
          <div style={{width:1,height:18,background:'linear-gradient(180deg,transparent,rgba(255,255,255,0.12),transparent)',margin:'0 4px',flexShrink:0}} className="hidden md:block" />

          <div ref={containerRef} onMouseLeave={() => moveHighlight(activeIndex)} style={{display:'flex',gap:0,padding:'0 4px',position:'relative'}} className="hidden md:flex">
            <div className="nav-hl" style={highlightStyle} />
            {navLinks.map((link, i) => (
              <a key={link.label} ref={el => { linksRef.current[i] = el }} href={link.href} className="nav-lnk"
                onMouseEnter={() => moveHighlight(i)}
                onClick={() => setActiveIndex(i)}
                style={{fontFamily:'Inter,sans-serif',fontSize:10,fontWeight:500,letterSpacing:'0.11em',textTransform:'uppercase',color:activeIndex===i?'#fff':'rgba(255,255,255,0.38)',padding:'8px 14px',borderRadius:40,cursor:'pointer',whiteSpace:'nowrap',textDecoration:'none',position:'relative',zIndex:1}}>
                {link.label}
              </a>
            ))}
          </div>

          <div style={{width:1,height:18,background:'linear-gradient(180deg,transparent,rgba(255,255,255,0.12),transparent)',margin:'0 4px',flexShrink:0}} className="hidden md:block" />

          {/* Desktop CTA */}
          <div style={{padding:'0 3px',position:'relative',zIndex:1}} className="hidden md:block">
            {session ? (
              <Link href="/dashboard" className="nav-cta" style={{fontFamily:'Inter,sans-serif',fontSize:10,fontWeight:800,letterSpacing:'0.1em',textTransform:'uppercase',color:'#090909',background:'linear-gradient(135deg,#E8C080,#D4A45F,#C8903A)',padding:'9px 20px',borderRadius:40,whiteSpace:'nowrap',textDecoration:'none',display:'inline-block',boxShadow:'0 2px 16px rgba(212,164,95,0.3)'}}>
                Dashboard
              </Link>
            ) : (
              <Link href="#kontakt" className="nav-cta" style={{fontFamily:'Inter,sans-serif',fontSize:10,fontWeight:800,letterSpacing:'0.1em',textTransform:'uppercase',color:'#090909',background:'linear-gradient(135deg,#E8C080,#D4A45F,#C8903A)',padding:'9px 20px',borderRadius:40,whiteSpace:'nowrap',textDecoration:'none',display:'inline-block',boxShadow:'0 2px 16px rgba(212,164,95,0.3)'}}>
                Konzultace ↗
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{padding:'0 14px',background:'none',border:'none',cursor:'pointer',position:'relative',zIndex:1,display:'flex',alignItems:'center',justifyContent:'center',height:40,width:44}}
            aria-label="Menu"
          >
            <div className={`hamburger ${menuOpen ? 'open' : ''}`} style={{display:'flex',flexDirection:'column',gap:'4px'}}>
              <span/>
              <span/>
              <span/>
            </div>
          </button>

        </div>
      </nav>
    </>
  )
}
