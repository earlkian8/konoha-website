import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import ModelViewer from './ModelViewer'

const fade = (delay = 0, y = 24) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
})

const ParticleField = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.8 + 0.3,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -Math.random() * 0.5 - 0.15,
      opacity: Math.random() * 0.4 + 0.05,
    }))

    let animId
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = '#7ec870'
        ctx.shadowColor = '#7ec870'
        ctx.shadowBlur = 8
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
        p.x += p.speedX
        p.y += p.speedY
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width }
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />
}

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#0a0a08]">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_65%_50%,_#1c3d1a_0%,_transparent_65%)]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#7ec870 1px, transparent 1px), linear-gradient(90deg, #7ec870 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#0a0a08_90%)]" />
      </div>

      <ParticleField />

      <div className="relative z-20 w-full max-w-screen-2xl mx-auto px-6 sm:px-10 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-28 pb-20">
        {/* Left */}
        <div>
          <motion.div {...fade(0.2, 0)} className="flex items-center gap-3 mb-10">
            <div className="w-10 h-px bg-[#4a7c3f]" />
            <span className="text-[#4a7c3f] text-[10px] tracking-[0.6em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
              Konohagakure no Sato
            </span>
          </motion.div>

          <motion.h1
            {...fade(0.35, 50)}
            className="text-white leading-[0.88] mb-8"
            style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 'clamp(3.5rem, 9vw, 8rem)', fontWeight: 700 }}
          >
            Hidden
            <span className="block text-[#7ec870]">Leaf</span>
            <span className="block text-[#a89f7e]" style={{ fontSize: '0.5em', letterSpacing: '0.15em' }}>Village</span>
          </motion.h1>

          <motion.p {...fade(0.6)} className="text-[#8a8a7a] max-w-lg leading-relaxed py-10 text-sm tracking-wide">
            Located in the Land of Fire, Konohagakure stands as the most powerful of the
            Five Great Shinobi Nations — forged in will, blood, and an unbreakable bond
            between its people.
          </motion.p>

          <motion.div {...fade(0.75)} className="flex flex-wrap gap-4">
            <a
              href="#about"
              className="group relative px-10 py-4 bg-[#4a7c3f] text-white text-[10px] tracking-[0.3em] uppercase overflow-hidden"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              <span className="relative z-10">Explore Village</span>
              <span className="absolute inset-0 bg-[#7ec870] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500" />
            </a>
            <a
              href="#arsenal"
              className="px-10 py-4 border border-[#2a2a22] text-[#7a7a6a] text-[10px] tracking-[0.3em] uppercase hover:border-[#4a7c3f] hover:text-[#7ec870] transition-all duration-400"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              View Arsenal
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex gap-12 mt-20 pt-8 border-t border-[#161610]"
          >
            {[
              { value: '7', label: 'Hokage' },
              { value: '12', label: 'Clans' },
              { value: '∞', label: 'Will of Fire' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-[#7ec870] text-3xl font-bold" style={{ fontFamily: "'Cinzel', serif" }}>{s.value}</p>
                <p className="text-[#5a5a4a] text-[9px] tracking-[0.4em] uppercase mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: 3D Model */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute w-[500px] h-[500px] rounded-full bg-[#4a7c3f]/8 blur-[80px] pointer-events-none" />
          <div className="absolute w-[320px] h-[320px] rounded-full border border-[#4a7c3f]/15 animate-ping pointer-events-none" style={{ animationDuration: '4s' }} />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
            className="absolute w-[420px] h-[420px] rounded-full border border-dashed border-[#4a7c3f]/10 pointer-events-none"
          />

          <div className="relative w-full h-[520px] lg:h-[640px]">
            <ModelViewer
              modelPath="/models/naruto_headband.glb"
              autoRotate
              cameraZ={3.5}
              lightColor="#7ec870"
              ambientIntensity={1.5}
            />
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#0d0d0a]/80 border border-[#4a7c3f]/25 backdrop-blur-sm px-6 py-2.5"
          >
            <p className="text-[#7ec870] text-[9px] tracking-[0.5em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
              Konoha Headband
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[#5a5a4a] text-[9px] tracking-[0.6em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="w-px h-10 bg-gradient-to-b from-[#4a7c3f] to-transparent"
        />
      </motion.div>
    </section>
  )
}
