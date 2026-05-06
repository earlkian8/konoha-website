import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const ranks = [
  { rank: 'Academy Student', symbol: '學', desc: "The beginning of every shinobi's journey. Students learn chakra control, basic ninjutsu, and the fundamentals of combat." },
  { rank: 'Genin', symbol: 'G', desc: 'Entry-level shinobi. Assigned to three-man squads under a Jonin sensei, taking D and C-rank missions.' },
  { rank: 'Chunin', symbol: 'C', desc: 'Mid-level shinobi capable of leadership. Promoted through the Chunin Exams — a village-wide tournament of skill and strategy.' },
  { rank: 'Jonin', symbol: 'J', desc: 'Elite shinobi who serve as squad leaders and ANBU operatives. Masters of at least one nature transformation.' },
  { rank: 'ANBU', symbol: '暗', desc: 'The black ops division of Konoha. Directly serve the Hokage. Their identities are kept secret behind animal masks.' },
  { rank: 'Hokage', symbol: '影', desc: 'The village leader — the strongest shinobi in Konoha. Their face is carved into the Hokage Rock for eternity.' },
]

const notable = [
  { name: 'Naruto Uzumaki', title: '7th Hokage · Nine-Tails Jinchūriki', color: '#ff8800' },
  { name: 'Kakashi Hatake', title: '6th Hokage · Copy Ninja', color: '#aaaaff' },
  { name: 'Minato Namikaze', title: '4th Hokage · Yellow Flash', color: '#ffff44' },
  { name: 'Tsunade Senju', title: '5th Hokage · Legendary Sannin', color: '#ff88aa' },
  { name: 'Hiruzen Sarutobi', title: '3rd Hokage · Professor', color: '#88cc88' },
  { name: 'Tobirama Senju', title: '2nd Hokage · Suiton Master', color: '#44aaff' },
]

function RankCard({ rank, symbol, desc, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative border border-[#141410] hover:border-[#4a7c3f]/35 p-7 bg-[#0a0a08] transition-all duration-500 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_#4a7c3f05_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-4 right-4 text-[#161610] text-4xl font-bold group-hover:text-[#4a7c3f]/12 transition-colors duration-500 select-none leading-none" style={{ fontFamily: 'serif' }}>
        {symbol}
      </div>
      <div className="relative z-10">
        <p className="text-[#4a7c3f] text-[9px] tracking-[0.5em] uppercase mb-2.5" style={{ fontFamily: "'Cinzel', serif" }}>
          Rank
        </p>
        <h4 className="text-[#9a9178] text-sm mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
          {rank}
        </h4>
        <p className="text-[#8a8a7a] text-xs leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  )
}

export default function Shinobi() {
  const headRef = useRef(null)
  const inView = useInView(headRef, { once: true, margin: '-80px' })

  return (
    <section id="shinobi" className="relative py-36 w-full bg-[#0a0a08] overflow-hidden">
      <div className="absolute left-0 top-1/3 w-[500px] h-[500px] bg-[#4a7c3f]/3 blur-[100px] pointer-events-none rounded-full" />

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
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-[#4a7c3f] text-[10px] tracking-[0.6em] uppercase mb-5"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Village Ranks
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-white"
            style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}
          >
            Shinobi <span className="text-[#7ec870]">Hierarchy</span>
          </motion.h2>
        </div>

        {/* Rank cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-[#111108] mb-28">
          {ranks.map((r, i) => (
            <RankCard key={r.rank} {...r} index={i} />
          ))}
        </div>

        {/* Notable Hokage */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="w-8 h-px bg-[#4a7c3f]/40" />
            <h3 className="text-[#5a5a4a] text-[10px] tracking-[0.6em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
              Notable Hokage
            </h3>
            <div className="flex-1 h-px bg-[#161610]" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {notable.map((n, i) => (
              <motion.div
                key={n.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group flex items-center gap-5 p-5 border border-[#141410] hover:border-[#4a7c3f]/25 bg-[#0d0d0a] transition-all duration-400 cursor-default"
              >
                <div
                  className="w-0.5 h-12 flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: n.color }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[#9a9178] text-sm truncate" style={{ fontFamily: "'Cinzel', serif" }}>
                    {n.name}
                  </p>
                  <p className="text-[#5a5a4a] text-[10px] tracking-wider mt-1">{n.title}</p>
                </div>
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: n.color, boxShadow: `0 0 8px ${n.color}` }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
