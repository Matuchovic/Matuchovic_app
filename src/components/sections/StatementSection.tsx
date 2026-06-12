'use client'

import { motion } from 'framer-motion'

export function StatementSection() {
  return (
    <section className="py-32 px-8 text-center">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-[9px] tracking-[0.18em] uppercase text-white/20 mb-10"
      >
        Filozofie
      </motion.p>

      <div
        className="font-black tracking-tight leading-tight max-w-3xl mx-auto"
        style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', letterSpacing: '-0.035em' }}
      >
        <motion.span
          initial={{ opacity: 0.1 }}
          whileInView={{ opacity: 0.35 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
          className="text-white"
        >
          Dobrý web informuje.
        </motion.span>
        <br />
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-white"
        >
          Skvělý web{' '}
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-gold"
        >
          prodává.
        </motion.span>
      </div>
    </section>
  )
}
