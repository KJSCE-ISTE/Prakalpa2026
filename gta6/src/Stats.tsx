import React, { useEffect, useState } from "react"

/**
 * GTA-style stats component (HUD)
 * Reverse countdown to 9th April
 */
const GTAStats: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())
  const [starCount, setStarCount] = useState(1)
  const [money, setMoney] = useState(0)

  // ================= TIME LOGIC =================
  function getTimeLeft() {
    const targetDate = new Date(
      new Date().getFullYear(),
      3, // April (0-based)
      9,
      0,
      0,
      0
    )

    const now = new Date().getTime()
    const diff = targetDate.getTime() - now

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // ================= WANTED LEVEL =================
  useEffect(() => {
    const handleScroll = () => {
      const newStarCount = Math.min(5, Math.floor(window.scrollY / 100) + 1)
      setStarCount(newStarCount)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // ================= MONEY COUNTER =================
  useEffect(() => {
    let counter = 0
    const interval = setInterval(() => {
      if (counter < 100000) {
        counter += 1000
        setMoney(counter)
      } else {
        clearInterval(interval)
      }
    }, 10)

    return () => clearInterval(interval)
  }, [])

  const pad = (n: number) => n.toString().padStart(2, "0")

  return (
    <div className="absolute top-8 right-4 z-[9999] pointer-events-none flex flex-col gap-2">

      {/* TIME DISPLAY */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 border-8 border-black rounded-lg flex items-center justify-center">
          <div
            className="text-xl sm:text-2xl md:text-3xl text-center"
            style={{
              fontFamily: "pricedown",
              color: "#fff",
              textShadow:
                "3px 3px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000",
            }}
          >
            DAYS LEFT
          </div>
        </div>

        <div
          className="text-2xl sm:text-3xl md:text-4xl tracking-wider"
          style={{
            fontFamily: "pricedown",
            color: "#fff",
            textShadow:
              "3px 3px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000",
          }}
        >
          {pad(timeLeft.days)}:
          {pad(timeLeft.hours)}:
          {pad(timeLeft.minutes)}:
          {pad(timeLeft.seconds)}
        </div>
      </div>

      {/* WANTED STARS */}
      <div className="flex justify-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="relative w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
            <div
              className={`absolute inset-0 ${
                i < starCount ? "opacity-100" : "opacity-30"
              }`}
              style={{
                clipPath:
                  "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                backgroundColor: i < starCount ? "#fbbf24" : "#666",
                border: "2px solid #000",
              }}
            />
          </div>
        ))}
      </div>

      {/* HEALTH + MONEY (CENTERED) */}
      <div className="flex flex-col items-center gap-2 mt-2">
        {/* HEALTH BAR */}
        <div className="w-40 sm:w-44 md:w-48 h-4 sm:h-5 bg-black border-2 border-black">
          <div
            className="h-full"
            style={{
              width: "75%",
              background:
                "linear-gradient(180deg, #ff6b6b 0%, #cc0000 100%)",
            }}
          />
        </div>

        {/* MONEY */}
        <div
          className="text-2xl sm:text-3xl md:text-4xl"
          style={{
            fontFamily: "pricedown",
            color: "#4ade80",
            textShadow:
              "3px 3px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000",
          }}
        >
          ₹{money.toLocaleString("en-IN")}
        </div>
      </div>
    </div>
  )
}

export default GTAStats
