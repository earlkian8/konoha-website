import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import ModelViewer from './ModelViewer'

const ParticleField = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.6 - 0.2,
      opacity: Math.random() * 0.5 + 0.1,
    }))

    let animId
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = '#7ec870'
        ctx.shadowColor = '#7ec870'
        ctx.shadowBlur = 6
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

    const onResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a08]">
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,_#1a3a1a_0%,_transparent_60%)]" />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(#7ec870 1px, transparent 1px), linear-gradient(90deg, #7ec870 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#0a0a08_100%)]" />
      </div>

      <ParticleField />

      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-24">
        {/* Left: Text */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-8 h-px bg-[#4a7c3f]" />
            <span className="text-[#4a7c3f] text-xs tracking-[0.5em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
              Konohagakure no Sato
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-white leading-[0.9] mb-6"
            style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 700 }}
          >
            Hidden
            <span className="block text-[#7ec870]">Leaf</span>
            <span className="block text-[#a89f7e]" style={{ fontSize: '0.55em' }}>Village</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-[#6b6451] max-w-md leading-relaxed mb-10 text-sm tracking-wide"
          >
            Located in the Land of Fire, Konohagakure stands as the most powerful of the
            Five Great Shinobi Nations — forged in will, blood, and an unbreakable bond
            between its people.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#about"
              className="group relative px-8 py-3.5 bg-[#4a7c3f] text-white text-xs tracking-widest uppercase overflow-hidden"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              <span className="relative z-10">Explore Village</span>
              <span className="absolute inset-0 bg-[#7ec870] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-400" />
            </a>
            <a
              href="#arsenal"
              className="px-8 py-3.5 border border-[#2a2a20] text-[#6b6451] text-xs tracking-widest uppercase hover:border-[#4a7c3f] hover:text-[#7ec870] transition-all duration-300"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              View Arsenal
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex gap-10 mt-16 pt-8 border-t border-[#1a1a14]"
          >
            {[
              { value: '7', label: 'Hokage' },
              { value: '12', label: 'Clans' },
              { value: '∞', label: 'Will of Fire' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-[#7ec870] text-2xl font-bold" style={{ fontFamily: "'Cinzel', serif" }}>{stat.value}</p>
                <p className="text-[#3a3a2a] text-[10px] tracking-widest uppercase mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: 3D Model */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Glow ring behind model */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-72 h-72 rounded-full bg-[#4a7c3f]/10 blur-3xl" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-48 h-48 rounded-full border border-[#4a7c3f]/20 animate-ping" style={{ animationDuration: '3s' }} />
          </div>

          <div className="relative h-[500px] lg:h-[600px]">
            <ModelViewer
              modelPath="/src/assets/3d/naruto_headband.glb"
              autoRotate
              cameraZ={3.5}
              lightColor="#7ec870"
              ambientIntensity={1.5}
            />
          </div>

          {/* Floating label */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-[#0f0f0a]/80 border border-[#4a7c3f]/30 backdrop-blur-sm px-5 py-2 text-center"
          >
            <p className="text-[#7ec870] text-[10px] tracking-[0.4em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
              Konoha Headband
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[#3a3a2a] text-[9px] tracking-[0.5em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-[#4a7c3f] to-transparent"
        />
      </motion.div>
    </section>
  )
}