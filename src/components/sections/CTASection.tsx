'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Mail } from 'lucide-react'

export function CTASection() {
  return (
    <section id="kontakt" className="px-8 md:px-16 py-12 max-w-screen-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative glass-gold rounded-3xl px-8 md:px-16 py-20 text-center overflow-hidden"
      >
        {/* Ambient gold glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none animate-glow-pulse"
          style={{ background: 'radial-gradient(circle, rgba(212,164,95,0.12) 0%, transparent 65%)' }}
        />

        {/* Top sheen */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="relative z-10">
          <p className="text-[9px] tracking-[0.2em] uppercase text-white/25 mb-8">Připraveni začít?</p>

          <h2
            className="font-black tracking-tight text-white mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.04em', lineHeight: 1.02 }}
          >
            Máte projekt?<br />
            <span className="text-gold">Pojďme ho postavit.</span>
          </h2>

          <p className="text-sm text-white/35 mb-12 max-w-md mx-auto leading-relaxed">
            Ozvěte se mi a společně proměníme váš nápad v úspěšný digitální produkt.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:info@ondrejmatucha.cz"
              className="inline-flex items-center gap-2.5 bg-gold text-background font-bold text-[10px] tracking-[0.12em] uppercase px-8 py-4 rounded-full hover:bg-gold-light transition-colors duration-200"
            >
              Domluvit konzultaci
              <ArrowUpRight size={14} />
            </a>
            <a
              href="mailto:info@ondrejmatucha.cz"
              className="inline-flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-white/35 hover:text-white/60 transition-colors"
            >
              <Mail size={12} />
              info@ondrejmatucha.cz
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
