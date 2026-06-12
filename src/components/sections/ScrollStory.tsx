'use client'

import { motion } from 'framer-motion'

const words = [
  { text: 'WEBY', active: true },
  { text: 'APLIKACE', active: false },
  { text: 'AI', gold: true },
  { text: 'AUTOMATIZACE', active: false },
]

export function ScrollStory() {
  return (
    <section className="py-24 px-8">
      <p className="text-[9px] tracking-[0.18em] uppercase text-white/25 text-center mb-10">
        Specializace
      </p>
      <div className="flex items-center justify-center flex-wrap gap-0">
        {words.map((word, i) => (
          <motion.div
            key={word.text}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="relative px-6 md:px-10"
            style={{
              fontSize: 'clamp(2rem, 6vw, 4.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: word.gold
                ? '#D4A45F'
                : word.active
                ? '#ffffff'
                : 'rgba(255,255,255,0.07)',
            }}
          >
            {word.text}
            {i < words.length - 1 && (
              <span
                className="absolute right-0 top-1/2 -translate-y-1/2 h-[55%] w-px"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
