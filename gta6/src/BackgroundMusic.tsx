import { forwardRef, useEffect } from "react"

const BackgroundMusic = forwardRef<
  HTMLAudioElement,
  { muted: boolean }
>(({ muted }, ref) => {
  useEffect(() => {
    if (!ref || typeof ref === "function") return
    if (!ref.current) return

    ref.current.loop = true
    ref.current.volume = 0.6
    ref.current.muted = muted
  }, [muted, ref])

  return <audio ref={ref} src="/audio/theme.mp3" />
})

export default BackgroundMusic
