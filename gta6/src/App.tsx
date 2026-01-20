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
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* 🎵 MUSIC (NEVER UNMOUNTS) */}
      <BackgroundMusic ref={audioRef} muted={muted} />

      {/* MAIN APP */}
      <div
        className={`
          transition-all duration-1000
          ${loading ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0"}
        `}
      >
        <GTAStats />
        <Title />

        <div className="min-h-screen flex items-center justify-center relative z-40">
          <PillNav
            logo={logo}
            logoAlt="Company Logo"
            items={[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
              { label: "Timeline", href: "/timeline" },
              { label: "Memories", href: "#gallery" },
              { label: "FAQs", href: "/faqs" },
            ]}
          />
        </div>

        <GTAMinimapEmbed />
        <Background />
      </div>

      {/* LOADING SCREEN */}
      {loading && (
        <LoadingScreen
          exiting={exiting}
          audioRef={audioRef}
          muted={muted}
          setMuted={setMuted}
        />
      )}
      <Gallery />
    </div>
  )
}

export default App
