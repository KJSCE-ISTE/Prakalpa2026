import { useEffect, useRef, useState } from "react"

import Background from "./Background"
import PillNav from "./PillNav"
import Title from "./Title"
import GTAStats from "./Stats"
import GTAMinimapEmbed from "./Gta_map"
import LoadingScreen from "./Loading_Screen"
import BackgroundMusic from "./BackgroundMusic"
import Gallery from "./Gallery"
import logo from "./assets/ISTE_logo.png"
import Themes from "./Themes"
import RegistrationForm from "./RegistrationForm" 
import Timeline from "./Timeline"
import Prizes from "./Prizes"
import FAQ from "./FAQ"
import Footer from "./footer"


function App() {
  const [loading, setLoading] = useState(true)
  const [exiting, setExiting] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true)
      setTimeout(() => setLoading(false), 800)
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  // Smooth scroll for in-page anchors (e.g., #themes)
  const handleNavClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLElement
    const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null
    if (!anchor) return
    const id = anchor.getAttribute('href')?.slice(1)
    if (!id) return
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      // Nudge up a bit to account for fixed nav height
      window.scrollBy({ top: -24, behavior: 'instant' as ScrollBehavior })
    }
  }

  // Support deep links (e.g., /#timeline) once content is mounted
  useEffect(() => {
    if (!loading) {
      const hash = window.location.hash
      if (hash && hash.startsWith('#')) {
        const id = hash.slice(1)
        const el = document.getElementById(id)
        if (el) {
          // Delay slightly to ensure layout is ready
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            window.scrollBy({ top: -24, behavior: 'instant' as ScrollBehavior })
          }, 100)
        }
      }
    }
  }, [loading])

  return (
    <div className="relative w-full min-h-screen bg-black overflow-x-hidden">
      {/* 🎵 MUSIC — NEVER UNMOUNTS */}
      <BackgroundMusic ref={audioRef} muted={muted} />

      {/* ================= HUD LAYER (FIXED, NO TRANSFORMS) ================= */}
      {!loading && (
        <>
          <GTAStats />
          <GTAMinimapEmbed />
        </>
      )}

      {/* ================= SCENE / CONTENT (TRANSFORMED) ================= */}
      <div
        className={`
            transition-all duration-1000 ease-out
            ${loading ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0"}
          `}
      >
        {/* Title without onRegisterClick prop */}
        <Title />

        <div className="min-h-screen flex items-center justify-center relative z-40" onClick={handleNavClick}>
          <PillNav
            logo={logo}
            logoAlt="Company Logo"
            items={[
              { label: "Home", href: "/" },
              { label: "Themes", href: "#themes" },
              { label: "Prizes", href: "#prizes" },
              { label: "Timeline", href: "#timeline" },
              { label: "Memories", href: "#gallery" },
              { label: "FAQs", href: "#faqs" },
            ]}
          />
        </div>

        <Background />
      </div>

      {/* ================= LOADING SCREEN ================= */}
      {loading && (
        <LoadingScreen
          exiting={exiting}
          audioRef={audioRef}
          muted={muted}
          setMuted={setMuted}
        />
      )}

      {/* ================= REGISTRATION BUTTON & MODAL (SELF-CONTAINED) ================= */}
      {!loading && <RegistrationForm />}

      {/* ================= SCROLL CONTENT ================= */}
      {!loading && <div id="themes" className="scroll-mt-24 sm:scroll-mt-28"><Themes /></div>}
      {!loading && <div id="prizes" className="scroll-mt-24 sm:scroll-mt-28"><Prizes /></div>}
      {!loading && <div id="timeline" className="scroll-mt-24 sm:scroll-mt-28"><Timeline /></div>}
      {!loading && <div id="gallery" className="scroll-mt-24 sm:scroll-mt-28"><Gallery /></div>}
      {!loading && <div id="faqs" className="scroll-mt-24 sm:scroll-mt-28"><FAQ /></div>}
      
      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  )
}

export default App