import React, { useEffect, useRef, useState } from "react"

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=K+J+Somaiya+College+of+Engineering+19.072847,72.899926"


const GTAMinimapEmbed: React.FC = () => {
  const minimapRef = useRef<HTMLDivElement>(null)
  const [angle, setAngle] = useState(0)

  /* Rotate pointer with mouse */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!minimapRef.current) return

      const rect = minimapRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2

      const dx = e.clientX - cx
      const dy = e.clientY - cy

      const deg = (Math.atan2(dy, dx) * 180) / Math.PI + 90
      setAngle(deg)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const openMaps = () => {
    window.open(MAPS_URL, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="fixed bottom-8 left-8 z-[9999]">
      <button
        onClick={openMaps}
        aria-label="Open K J Somaiya College of Engineering in Google Maps"
        className="relative w-48 h-48 rounded-full p-[6px] bg-pink-500 cursor-pointer
                   hover:scale-105 hover:brightness-110 transition"
      >
        {/* Inner minimap */}
        <div
          ref={minimapRef}
          className="relative w-full h-full rounded-full overflow-hidden bg-black"
        >
          {/* ✅ PLACE-BASED EMBED (Shows name) */}
          <iframe
            title="K J Somaiya College of Engineering"
            src="https://www.google.com/maps?q=K+J+Somaiya+College+of+Engineering&z=16&output=embed"
            className="absolute inset-0 w-full h-full border-0 pointer-events-none"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Gradient tint */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, #1a237e 0%, #ff2fd6 70%, #ffe066 100%)",
              mixBlendMode: "multiply",
              opacity: 0.45,
            }}
          />

          {/* Vignette */}
          <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />

          {/* Player pointer */}
          <div
            className="absolute top-1/2 left-1/2 z-20 pointer-events-none"
            style={{
              transform: `translate(-50%, -50%) rotate(${angle}deg)`,
              transition: "transform 0.08s linear",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 100 100">
              <circle cx="50" cy="55" r="28" fill="white" />
              <polygon points="50,5 65,35 35,35" fill="white" />
            </svg>
          </div>

          {/* North indicator */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <span
              className="font-pricedown text-white text-sm"
              style={{ textShadow: "1px 1px 2px black" }}
            >
              N
            </span>
          </div>
        </div>
      </button>
    </div>
  )
}

export default GTAMinimapEmbed
