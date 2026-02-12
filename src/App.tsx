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
    const anchor = target.closest('a') as HTMLAnchorElement | null
    if (!anchor) return

    // Only handle links that point to hashes on the current page
    const url = new URL(anchor.href)
    if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return
    if (!url.hash) return

    const id = url.hash.slice(1)
    if (!id) return

    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
    <div className="relative w-full min-h-screen bg-black overflow-x-hidden" onClick={handleNavClick}>
      {/* 🎵 MUSIC — NEVER UNMOUNTS */}
      <BackgroundMusic ref={audioRef} muted={muted} />

      {/* Music Toggle Button */}
      <button
        onClick={() => {
          if (!audioRef.current) return;
          const isMuted = !muted;
          audioRef.current.muted = isMuted;
          setMuted(isMuted);
        }}
        className="fixed bottom-4 right-4 bg-purple-500/50 text-white px-4 py-2 rounded-md shadow-lg z-50 hover:bg-purple-500/70"
      >
        {muted ? "🔇" : "🔊"}
      </button>

      {/* ================= HUD LAYER (FIXED, NO TRANSFORMS) ================= */}
      {!loading && (
        <>
          <GTAStats />
          <GTAMinimapEmbed />
        </>
      )}

      {/* ================= SCENE / CONTENT (TRANSFORMED) ================= */}
      <div
        id="home"
        className={`
            transition-all duration-1000 ease-out
            ${loading ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0"}
          `}
      >
        {/* Title without onRegisterClick prop */}
        <Title />

        <div className="min-h-screen flex items-center justify-center relative z-40">
          <PillNav
            logo={logo}
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
      {!loading && <div id="themes"><Themes /></div>}
      {!loading && <div id="prizes"><Prizes /></div>}
      {!loading && <div id="timeline"><Timeline /></div>}
      {!loading && <div id="gallery"><Gallery /></div>}
      {!loading && <div id="faqs"><FAQ /></div>}

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  )
}

export default App