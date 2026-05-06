import { motion } from 'motion/react'
import logo from '../assets/logo.png'

const links = [
  { label: 'Village', href: '#about' },
  { label: 'Arsenal', href: '#arsenal' },
  { label: 'Shinobi', href: '#shinobi' },
]

const kanji = ['火', '木', '影', '忍', '風', '水']

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#060604] border-t border-[#141410] overflow-hidden">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="text-[#0d0d0a] font-bold leading-none"
          style={{ fontFamily: 'serif', fontSize: 'clamp(12rem, 30vw, 28rem)' }}
        >
          忍
        </span>
      </div>

      <div className="relative w-full max-w-screen-2xl mx-auto px-6 sm:px-10 lg:px-20 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16"
        >
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-5">
              <img src={logo} alt="Konoha" className="w-7 h-7 object-contain rounded-full" />
              <div>
                <p className="text-[#7ec870] font-bold tracking-[0.25em] text-sm uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                  Konoha
                </p>
                <p className="text-[#5a5a4a] text-[9px] tracking-[0.35em] uppercase">Hidden Leaf Village</p>
              </div>
            </div>
            <p className="text-[#8a8a7a] text-xs leading-relaxed max-w-xs">
              The strongest of the Five Great Shinobi Nations. Forged in will, blood, and the unbreakable bond of its people.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p className="text-[#4a7c3f] text-[9px] tracking-[0.5em] uppercase mb-6" style={{ fontFamily: "'Cinzel', serif" }}>
              Navigate
            </p>
            <div className="flex flex-col gap-3">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-[#6a6a5a] hover:text-[#7ec870] text-xs tracking-[0.3em] uppercase transition-colors duration-300"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Elements */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p className="text-[#4a7c3f] text-[9px] tracking-[0.5em] uppercase mb-6" style={{ fontFamily: "'Cinzel', serif" }}>
              Elements
            </p>
            <div className="flex gap-4 flex-wrap justify-center md:justify-start">
              {kanji.map((k, i) => (
                <motion.span
                  key={k}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="text-[#5a5a4a] hover:text-[#7ec870] text-2xl transition-colors duration-300 cursor-default select-none"
                  style={{ fontFamily: 'serif' }}
                >
                  {k}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="pt-8 border-t border-[#111108] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-[#5a5a4a] text-[10px] tracking-[0.3em] uppercase">
            © Konohagakure no Sato · Land of Fire
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#4a7c3f]" style={{ boxShadow: '0 0 6px #4a7c3f' }} />
            <p className="text-[#5a5a4a] text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
              Will of Fire · Endures
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
