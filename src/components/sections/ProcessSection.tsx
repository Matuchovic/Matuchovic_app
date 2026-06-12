'use client'

import { motion } from 'framer-motion'

const steps = [
  { number: '01', title: 'Analýza', description: 'Pochopím váš byznys, cíle a potřeby vašich zákazníků.', active: false },
  { number: '02', title: 'Návrh', description: 'Navrhnu řešení, které dává smysl a přináší výsledky.', active: false },
  { number: '03', title: 'Vývoj', description: 'Vytvořím kvalitní a škálovatelný produkt s důrazem na detail.', active: true },
  { number: '04', title: 'Růst', description: 'Pomohu vám růst, optimalizuji a přidávám nové funkce.', active: false },
]

export function ProcessSection() {
  return (
    <section id="proces" className="py-24 px-8 md:px-16 max-w-screen-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-14"
      >
        <p className="text-[9px] tracking-[0.18em] uppercase text-gold/70 mb-4">Můj proces</p>
        <h2 className="font-black tracking-tight text-white" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', letterSpacing: '-0.03em' }}>
          Jasný proces, který funguje.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="relative"
          >
            <div className="flex items-center gap-3 mb-5">
              <span
                className="text-[10px] font-bold tracking-wider"
                style={{ color: step.active ? '#D4A45F' : 'rgba(255,255,255,0.2)' }}
              >
                {step.number}
              </span>
              <div className="flex-1 h-px" style={{ background: step.active ? 'rgba(212,164,95,0.3)' : 'rgba(255,255,255,0.06)' }} />
            </div>
            <h3 className="text-sm font-bold text-white mb-2.5 tracking-tight">{step.title}</h3>
            <p className="text-xs text-white/35 leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
