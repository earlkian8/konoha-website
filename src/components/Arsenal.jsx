import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import ModelViewer from './ModelViewer'

const items = [
  {
    id: 'shuriken',
    model: '/models/shuriken.glb',
    name: 'Shuriken',
    kanji: '手裏剣',
    type: 'Throwing Weapon',
    desc: "The iconic four-pointed throwing star used by shinobi across all nations. Konoha's shinobi are trained in shuriken jutsu from their earliest days at the Academy.",
    stats: [
      { label: 'Range', value: 85 },
      { label: 'Speed', value: 92 },
      { label: 'Lethality', value: 60 },
    ],
    color: '#c0c0c0',
    lightColor: '#aaaaff',
  },
  {
    id: 'scrolls',
    model: '/models/scrolls_from_naruto.glb',
    name: 'Ninja Scrolls',
    kanji: '忍巻物',
    type: 'Summoning / Storage',
    desc: 'Sacred scrolls used for summoning contracts, sealing jutsu, and storing forbidden techniques. The Forbidden Scroll of Sealing held dozens of S-rank jutsu.',
    stats: [
      { label: 'Power', value: 95 },
      { label: 'Rarity', value: 78 },
      { label: 'Danger', value: 88 },
    ],
    color: '#c8a87a',
    lightColor: '#ff8800',
  },
]

function StatBar({ label, value, color, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="text-[#6a6a5a] text-[10px] tracking-[0.3em] uppercase">{label}</span>
        <span className="text-[#7ec870] text-[10px] font-mono">{value}</span>
      </div>
      <div className="h-px bg-[#161610] relative overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: value / 100 } : {}}
          transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-y-0 left-0 origin-left"
          style={{ width: '100%', background: `linear-gradient(90deg, ${color}, transparent)` }}
        />
      </div>
    </div>
  )
}

export default function Arsenal() {
  const [active, setActive] = useState('shuriken')
  const current = items.find((i) => i.id === active)
  const headRef = useRef(null)
  const inView = useInView(headRef, { once: true, margin: '-80px' })

  return (
    <section id="arsenal" className="relative py-36 w-full bg-[#080806] overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4a7c3f]/4 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#4a7c3f]/3 blur-[80px] pointer-events-none" />

      <div className="w-full max-w-screen-2xl mx-auto px-6 sm:px-10 lg:px-20">
        {/* Header */}
        <div ref={headRef} className="mb-20">
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
            Shinobi Gear
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-white"
            style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}
          >
            The Arsenal of <span className="text-[#7ec870]">Konoha</span>
          </motion.h2>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="flex gap-2 mb-16"
        >
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`px-8 py-3 text-[10px] tracking-[0.3em] uppercase transition-all duration-300 ${
                active === item.id
                  ? 'text-white bg-[#4a7c3f]'
                  : 'text-[#6a6a5a] border border-[#161610] hover:text-[#7ec870] hover:border-[#4a7c3f]/40'
              }`}
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {item.name}
            </button>
          ))}
        </motion.div>

        {/* Main display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* 3D Model */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.5 }}
              className="relative flex items-center justify-center"
            >
              <div
                className="absolute w-64 h-64 rounded-full blur-[60px] opacity-15 pointer-events-none"
                style={{ background: current.lightColor }}
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                className="absolute w-[340px] h-[340px] rounded-full border border-dashed border-[#4a7c3f]/12 pointer-events-none"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
                className="absolute w-[260px] h-[260px] rounded-full border border-[#4a7c3f]/8 pointer-events-none"
              />
              <div className="relative w-full h-[420px] lg:h-[500px]">
                <ModelViewer
                  modelPath={current.model}
                  autoRotate
                  cameraZ={3}
                  lightColor={current.lightColor}
                  ambientIntensity={1.4}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active + '-info'}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
            >
              <p
                className="text-[#1e1e16] leading-none mb-4 select-none"
                style={{ fontFamily: 'serif', fontSize: 'clamp(4rem, 8vw, 7rem)' }}
              >
                {current.kanji}
              </p>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-px bg-[#4a7c3f]" />
                <span className="text-[#4a7c3f] text-[10px] tracking-[0.4em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                  {current.type}
                </span>
              </div>

              <h3
                className="text-white mb-7"
                style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
              >
                {current.name}
              </h3>

              <p className="text-[#8a8a7a] text-sm leading-relaxed mb-12 max-w-lg">
                {current.desc}
              </p>

              <div className="max-w-sm">
                <p className="text-[#5a5a4a] text-[10px] tracking-[0.4em] uppercase mb-5" style={{ fontFamily: "'Cinzel', serif" }}>
                  Combat Data
                </p>
                {current.stats.map((s, i) => (
                  <StatBar key={s.label} label={s.label} value={s.value} color={current.lightColor} delay={i * 0.15} />
                ))}
              </div>

              <div className="mt-12 pt-6 border-t border-[#161610] flex items-center gap-4">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: current.lightColor, boxShadow: `0 0 10px ${current.lightColor}` }}
                />
                <span className="text-[#5a5a4a] text-[10px] tracking-[0.3em] uppercase">
                  Drag to rotate · Scroll to zoom
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
