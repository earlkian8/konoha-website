import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const ranks = [
  { rank: 'Academy Student', symbol: '學', desc: 'The beginning of every shinobi\'s journey. Students learn chakra control, basic ninjutsu, and the fundamentals of combat.' },
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
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group relative border border-[#141410] hover:border-[#4a7c3f]/40 p-6 bg-[#0a0a08] transition-all duration-400 overflow-hidden"
    >
      <div className="absolute top-3 right-4 text-[#1a1a14] text-3xl font-bold group-hover:text-[#4a7c3f]/15 transition-colors duration-500 select-none">
        {symbol}
      </div>
      <p className="text-[#4a7c3f] text-[9px] tracking-[0.4em] uppercase mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
        Rank
      </p>
      <h4 className="text-[#a89f7e] text-sm mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
        {rank}
      </h4>
      <p className="text-[#3a3a2a] text-xs leading-relaxed">{desc}</p>
    </motion.div>
  )
}

export default function Shinobi() {
  const headRef = useRef(null)
  const inView = useInView(headRef, { once: true })

  return (
    <section id="shinobi" className="relative py-32 bg-[#0a0a08] overflow-hidden">
      <div className="absolute left-0 top-1/3 w-96 h-96 bg-[#4a7c3f]/4 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headRef} className="mb-20">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            className="origin-left w-16 h-px bg-[#4a7c3f] mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-[#4a7c3f] text-xs tracking-[0.5em] uppercase mb-4"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Village Ranks
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-white"
            style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            Shinobi <span className="text-[#7ec870]">Hierarchy</span>
          </motion.h2>
        </div>

        {/* Rank cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-[#111108] mb-24">
          {ranks.map((r, i) => (
            <RankCard key={r.rank} {...r} index={i} />
          ))}
        </div>

        {/* Notable Hokage */}
        <div>
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#3a3a2a] text-xs tracking-[0.5em] uppercase mb-8"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Notable Hokage
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {notable.map((n, i) => (
              <motion.div
                key={n.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group flex items-center gap-4 p-4 border border-[#141410] hover:border-[#4a7c3f]/30 bg-[#0d0d0a] transition-all duration-300 cursor-default"
              >
                <div
                  className="w-1 h-10 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ background: n.color }}
                />
                <div>
                  <p className="text-[#a89f7e] text-sm" style={{ fontFamily: "'Cinzel', serif" }}>
                    {n.name}
                  </p>
                  <p className="text-[#3a3a2a] text-[10px] tracking-wider mt-0.5">{n.title}</p>
                </div>
                <div
                  className="ml-auto w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: n.color, boxShadow: `0 0 6px ${n.color}` }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}