import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const pillars = [
  {
    kanji: '火',
    title: 'Will of Fire',
    desc: 'The founding philosophy of the Hidden Leaf — the belief that love and unity among villagers is the greatest strength a shinobi can possess.',
  },
  {
    kanji: '木',
    title: 'Senju Legacy',
    desc: 'Founded by Hashirama Senju and Madara Uchiha, Konoha was born from a dream of peace — a place where clans could set aside war.',
  },
  {
    kanji: '影',
    title: 'The Hokage',
    desc: 'The Shadow of Fire. Seven Hokage have led this village, each embodying the Will of Fire in their own way — from the First to Naruto Uzumaki himself.',
  },
  {
    kanji: '忍',
    title: 'Shinobi Way',
    desc: 'Konoha\'s shinobi are ranked Genin, Chunin, Jonin, and ANBU. Each rank demands greater sacrifice, skill, and devotion to protecting the village.',
  },
]

function PillarCard({ kanji, title, desc, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group relative border border-[#1a1a14] hover:border-[#4a7c3f]/50 bg-[#0d0d0a] p-8 transition-all duration-500 overflow-hidden"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#4a7c3f08_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Kanji watermark */}
      <div
        className="absolute -right-2 -bottom-4 text-[120px] font-bold text-[#1a1a14] group-hover:text-[#4a7c3f]/10 transition-colors duration-500 leading-none select-none pointer-events-none"
        style={{ fontFamily: 'serif' }}
      >
        {kanji}
      </div>

      <div className="relative z-10">
        <div className="w-8 h-px bg-[#4a7c3f] mb-6" />
        <h3
          className="text-white text-lg mb-3 tracking-wider"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {title}
        </h3>
        <p className="text-[#5a5444] text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  )
}

export default function About() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true, margin: '-100px' })

  return (
    <section id="about" className="relative py-32 bg-[#0a0a08] overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #7ec870,
            #7ec870 1px,
            transparent 1px,
            transparent 30px
          )`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headRef} className="mb-20">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="origin-left w-16 h-px bg-[#4a7c3f] mb-6"
          />
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={headInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-[#4a7c3f] text-xs tracking-[0.5em] uppercase mb-4"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            History & Lore
          </motion.p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-white leading-tight"
              style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            >
              The Village<br />
              <span className="text-[#7ec870]">Hidden in Leaves</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={headInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="text-[#4a4438] text-sm max-w-sm leading-relaxed lg:text-right"
            >
              Konohagakure was established by Hashirama Senju and Madara Uchiha after
              decades of clan warfare. It sits nestled within a vast forest in the Land of Fire.
            </motion.p>
          </div>
        </div>

        {/* Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#111108]">
          {pillars.map((p, i) => (
            <PillarCard key={p.title} {...p} index={i} />
          ))}
        </div>

        {/* Village quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mt-24 text-center"
        >
          <div className="inline-block relative px-12 py-10 border border-[#1a1a14]">
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#4a7c3f]" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#4a7c3f]" />
            <p
              className="text-[#a89f7e] text-xl lg:text-2xl leading-relaxed max-w-2xl"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              "Those who break the rules are scum, but those who abandon their comrades
              are worse than scum."
            </p>
            <p className="text-[#3a3a2a] text-xs tracking-widest uppercase mt-6" style={{ fontFamily: "'Cinzel', serif" }}>
              — Kakashi Hatake
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}