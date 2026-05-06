import { useState, useRef } from 'react'
import { motion, useInView } from 'motion/react'
import ModelViewer from './ModelViewer'

const items = [
  {
    id: 'shuriken',
    model: '/src/assets/3d/shuriken.glb',
    name: 'Shuriken',
    kanji: '手裏剣',
    type: 'Throwing Weapon',
    desc: 'The iconic four-pointed throwing star used by shinobi across all nations. Konoha\'s shinobi are trained in shuriken jutsu from their earliest days at the Academy.',
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
    model: '/src/assets/3d/scrolls_from_naruto.glb',
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
    <div ref={ref} className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-[#5a5444] text-[10px] tracking-widest uppercase">{label}</span>
        <span className="text-[#7ec870] text-[10px]">{value}</span>
      </div>
      <div className="h-px bg-[#1a1a14] relative overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: value / 100 } : {}}
          transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
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
  const inView = useInView(headRef, { once: true })

  return (
    <section id="arsenal" className="relative py-32 bg-[#080808] overflow-hidden">
      {/* Corner decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#4a7c3f]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headRef} className="mb-16">
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
            Shinobi Gear
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-white"
            style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            The Arsenal of <span className="text-[#7ec870]">Konoha</span>
          </motion.h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-12">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`relative px-6 py-3 text-xs tracking-widest uppercase transition-all duration-300 overflow-hidden ${
                active === item.id
                  ? 'text-white bg-[#4a7c3f]'
                  : 'text-[#5a5444] border border-[#1a1a14] hover:text-[#7ec870] hover:border-[#4a7c3f]/50'
              }`}
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Main display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 3D Model */}
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-56 h-56 rounded-full blur-3xl opacity-20"
                style={{ background: current.lightColor }}
              />
            </div>

            {/* Rotating ring decoration */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                className="w-72 h-72 rounded-full border border-dashed border-[#4a7c3f]/15"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
                className="w-56 h-56 rounded-full border border-[#4a7c3f]/10"
              />
            </div>

            <div className="h-[400px]">
              <ModelViewer
                modelPath={current.model}
                autoRotate
                cameraZ={3}
                lightColor={current.lightColor}
                ambientIntensity={1.4}
              />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            key={active + '-info'}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-[#2a2a20] text-7xl leading-none mb-2 select-none"
              style={{ fontFamily: 'serif', fontSize: '5rem' }}
            >
              {current.kanji}
            </p>

            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-px bg-[#4a7c3f]" />
              <span className="text-[#4a7c3f] text-[10px] tracking-widest uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                {current.type}
              </span>
            </div>

            <h3
              className="text-white text-4xl mb-6"
              style={{ fontFamily: "'Cinzel Decorative', serif" }}
            >
              {current.name}
            </h3>

            <p className="text-[#5a5444] text-sm leading-relaxed mb-10 max-w-md">
              {current.desc}
            </p>

            {/* Stats */}
            <div className="max-w-xs">
              <p className="text-[#2a2a20] text-[10px] tracking-widest uppercase mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
                Combat Data
              </p>
              {current.stats.map((s, i) => (
                <StatBar
                  key={s.label}
                  label={s.label}
                  value={s.value}
                  color={current.lightColor}
                  delay={i * 0.15}
                />
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-[#1a1a14] flex items-center gap-4">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: current.lightColor, boxShadow: `0 0 8px ${current.lightColor}` }}
              />
              <span className="text-[#3a3a2a] text-[10px] tracking-widest uppercase">
                Hover model to interact · Drag to rotate
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}