import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const KonohaLeaf = () => (
  <svg width="36" height="36" viewBox="0 0 100 100" fill="none">
    <path
      d="M50 10 C30 10, 10 30, 10 55 C10 75, 28 90, 50 90 C72 90, 90 75, 90 55 C90 30, 70 10, 50 10Z"
      fill="#4a7c3f"
      stroke="#7ec870"
      strokeWidth="2"
    />
    <path
      d="M50 85 L50 30"
      stroke="#7ec870"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path d="M50 50 C35 42, 20 45, 15 55" stroke="#7ec870" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M50 60 C65 52, 80 55, 85 65" stroke="#7ec870" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M50 40 C38 33, 25 36, 18 44" stroke="#7ec870" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    <circle cx="50" cy="28" r="4" fill="#7ec870" />
  </svg>
)

const navLinks = [
  { label: 'Village', href: '#about' },
  { label: 'Arsenal', href: '#arsenal' },
  { label: 'Shinobi', href: '#shinobi' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a0a08]/90 backdrop-blur-md border-b border-[#4a7c3f]/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <motion.div whileHover={{ rotate: 15 }} transition={{ type: 'spring', stiffness: 300 }}>
            <KonohaLeaf />
          </motion.div>
          <div>
            <p className="text-[#7ec870] font-bold tracking-widest text-sm uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
              Konoha
            </p>
            <p className="text-[#4a4a3a] text-[10px] tracking-[0.3em] uppercase">Hidden Leaf Village</p>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.4 }}
              className="text-[#a89f7e] hover:text-[#7ec870] text-sm tracking-widest uppercase transition-colors duration-300 relative group"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#7ec870] group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
          <motion.a
            href="#arsenal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="px-5 py-2 border border-[#4a7c3f] text-[#7ec870] text-xs tracking-widest uppercase hover:bg-[#4a7c3f]/20 transition-all duration-300"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Enter Village
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#7ec870] flex flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`w-6 h-0.5 bg-[#7ec870] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-[#7ec870] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-[#7ec870] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#0a0a08]/95 border-t border-[#4a7c3f]/20 px-6 overflow-hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-4 text-[#a89f7e] hover:text-[#7ec870] text-sm tracking-widest uppercase border-b border-[#1a1a14]"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}