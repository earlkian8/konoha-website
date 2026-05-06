import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import logo from '../assets/logo.png'

const navLinks = [
  { label: 'Village', href: '#about' },
  { label: 'Arsenal', href: '#arsenal' },
  { label: 'Shinobi', href: '#shinobi' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#0a0a08]/92 backdrop-blur-lg border-b border-[#4a7c3f]/20' : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-screen-2xl mx-auto px-6 sm:px-10 lg:px-20 py-5 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <motion.div whileHover={{ rotate: 20 }} transition={{ type: 'spring', stiffness: 300 }}>
            <img src={logo} alt="Konoha" className="w-8 h-8 object-contain rounded-full" />
          </motion.div>
          <div>
            <p className="text-[#7ec870] font-bold tracking-[0.25em] text-sm uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
              Konoha
            </p>
            <p className="text-[#3a3a2a] text-[9px] tracking-[0.35em] uppercase">Hidden Leaf Village</p>
          </div>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.5 }}
              className="text-[#8a8a7a] hover:text-[#7ec870] text-xs tracking-[0.3em] uppercase transition-colors duration-300 relative group"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#7ec870] group-hover:w-full transition-all duration-400" />
            </motion.a>
          ))}
          <motion.a
            href="#shinobi"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="px-6 py-2.5 border border-[#4a7c3f]/60 text-[#7ec870] text-[10px] tracking-[0.3em] uppercase hover:bg-[#4a7c3f]/15 transition-all duration-300"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Enter Village
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`w-6 h-0.5 bg-[#7ec870] transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-[#7ec870] transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-[#7ec870] transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#0a0a08]/98 border-t border-[#4a7c3f]/15 px-6 overflow-hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 py-5 text-[#8a8a7a] hover:text-[#7ec870] text-xs tracking-[0.3em] uppercase border-b border-[#141410] transition-colors duration-300"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                <span className="w-4 h-px bg-[#4a7c3f]/50" />
                {link.label}
              </motion.a>
            ))}
            <div className="py-5">
              <a
                href="#shinobi"
                onClick={() => setMenuOpen(false)}
                className="inline-block px-6 py-2.5 border border-[#4a7c3f]/60 text-[#7ec870] text-[10px] tracking-[0.3em] uppercase"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Enter Village
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
