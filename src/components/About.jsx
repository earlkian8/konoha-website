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
    desc: 'The Shadow of Fire. Seven Hokage have led this village, each embodying the Will of Fire — from the First to Naruto Uzumaki himself.',
  },
  {
    kanji: '忍',
    title: 'Shinobi Way',
    desc: "Konoha's shinobi are ranked Genin, Chunin, Jonin, and ANBU. Each rank demands greater sacrifice, skill, and devotion to the village.",
  },
]

function PillarCard({ kanji, title, desc, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group relative border border-[#161610] hover:border-[#4a7c3f]/40 bg-[#0d0d0a] p-8 lg:p-10 transition-all duration-500 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#4a7c3f06_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div
        className="absolute -right-3 -bottom-6 text-[130px] font-bold text-[#161610] group-hover:text-[#4a7c3f]/8 transition-colors duration-700 leading-none select-none pointer-events-none"
        style={{ fontFamily: 'serif' }}
      >
        {kanji}
      </div>
      <div className="relative z-10">
        <div className="w-8 h-px bg-[#4a7c3f] mb-7" />
        <h3 className="text-[#c8bfa0] text-base mb-4 tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>
          {title}
        </h3>
        <p className="text-[#8a8a7a] text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  )
}

export default function About() {
  const headRef = useRef(null)
  const inView = useInView(headRef, { once: true, margin: '-80px' })

  return (
    <section id="about" className="relative py-36 w-full bg-[#0a0a08] overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #7ec870, #7ec870 1px, transparent 1px, transparent 40px)`,
        }}
      />

      <div className="w-full max-w-screen-2xl mx-auto px-6 sm:px-10 lg:px-20">
        {/* Header */}
        <div ref={headRef} className="mb-24">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9 }}
            className="origin-left w-16 h-px bg-[#4a7c3f] mb-7"
          />
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-[#4a7c3f] text-[10px] tracking-[0.6em] uppercase mb-5"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            History & Lore
          </motion.p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-white leading-tight"
              style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}
            >
              The Village<br />
              <span className="text-[#7ec870]">Hidden in Leaves</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-[#5a5a4a] text-sm max-w-sm leading-relaxed lg:text-right"
            >
              Konohagakure was established by Hashirama Senju and Madara Uchiha after
              decades of clan warfare. It sits nestled within a vast forest in the Land of Fire.
            </motion.p>
          </div>
        </div>

        {/* Pillar Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#111108]">
          {pillars.map((p, i) => (
            <PillarCard key={p.title} {...p} index={i} />
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-28 flex justify-center"
        >
          <div className="relative px-12 py-12 border border-[#161610] max-w-3xl w-full text-center">
            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[#4a7c3f]" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#4a7c3f]" />
            <p
              className="text-[#8a8070] text-lg lg:text-xl leading-relaxed"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              "Those who break the rules are scum, but those who abandon their comrades
              are worse than scum."
            </p>
            <p className="text-[#5a5a4a] text-[10px] tracking-[0.4em] uppercase mt-7" style={{ fontFamily: "'Cinzel', serif" }}>
              — Kakashi Hatake
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
