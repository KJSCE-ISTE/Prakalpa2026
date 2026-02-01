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
import Timeline from "./Timeline"
import Prizes from "./Prizes"


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

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
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
        <Title />

        <div className="min-h-screen flex items-center justify-center relative z-40">
          <PillNav
            logo={logo}
            logoAlt="Company Logo"
            items={[
              { label: "Home", href: "/" },
              { label: "Themes", href: "#themes" },
              { label: "Timeline", href: "#timeline" },
              { label: "Prizes", href: "#prizes" },
              { label: "Memories", href: "#gallery" },
              { label: "FAQs", href: "/faqs" },
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


      {/* ================= SCROLL CONTENT ================= */}
      {!loading && <div id="themes"><Themes /></div>}
      {/* ================= SCROLL CONTENT ================= */}
      {!loading && <div id="timeline"><Timeline /></div>}
      {/* ================= SCROLL CONTENT ================= */}
      {!loading && <div id="prizes"><Prizes /></div>}
      {/* ================= SCROLL CONTENT ================= */}
      {!loading && <div id="gallery"><Gallery /></div>}
    </div>
  )
}

export default App
