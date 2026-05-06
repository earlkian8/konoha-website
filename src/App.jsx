import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Arsenal from './components/Arsenal'
import Shinobi from './components/Shinobi'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-[#0a0a08] min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Arsenal />
      <Shinobi />
      <Footer />
    </div>
  )
}
