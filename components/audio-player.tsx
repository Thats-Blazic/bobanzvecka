"use client"
import { useRef, useEffect } from "react"
import { Play, Pause, Volume2 } from "lucide-react"

interface AudioPlayerProps {
  streamUrl?: string
  isPlaying?: boolean
  onPlayToggle?: () => void
}

export function AudioPlayer({ 
  streamUrl = "https://streaming.tdiradio.com/hit.mp3", 
  isPlaying = false, 
  onPlayToggle 
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)

  // Control audio based on isPlaying prop
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      console.log("Starting audio playback...")
      
      // Try to play with user interaction
      const playPromise = audio.play()
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log("Audio started successfully")
        }).catch((error) => {
          console.error("Error playing audio:", error)
          
          // Handle different error types
          if (error.name === 'NotAllowedError') {
            alert("Molimo kliknite na play dugme da pokrenete stream. Mobilni pregledači zahtevaju korisničku interakciju.")
          } else if (error.name === 'NotSupportedError') {
            alert("Vaš pregledač ne podržava ovaj audio format.")
          } else {
            alert("Greška pri pokretanju stream-a. Proverite internet konekciju.")
          }
        })
      }
    } else {
      console.log("Pausing audio...")
      audio.pause()
    }
  }, [isPlaying])

  const handlePlayToggle = () => {
    console.log("Audio player button clicked")
    if (onPlayToggle) {
      onPlayToggle()
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
    }
  }

  return (
    <div className="fixed bottom-6 right-6">
      {/* Mobile fallback */}
      <div className="sm:hidden mb-2">
        <a
          href={streamUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
        >
          📱 Otvori Stream
        </a>
      </div>
      
      <div className="flex items-center gap-4 bg-black/90 backdrop-blur-md rounded-full px-4 py-3 shadow-2xl border border-gray-800">
        {/* Station Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
            <div className="text-white font-bold text-xs">ZH</div>
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold text-white">Zvečanska Hronika</div>
            <div className="text-xs text-gray-400">{isPlaying ? "UŽIVO" : "Radio Stanica"}</div>
          </div>
        </div>

        {/* Play Button */}
        <button
          onClick={handlePlayToggle}
          className="group relative w-12 h-12 bg-green-500 hover:bg-green-400 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-green-500/25 hover:shadow-green-400/40 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-110 transition-transform duration-300" />
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white relative z-10" />
          ) : (
            <Play className="w-5 h-5 text-white relative z-10 ml-0.5" />
          )}
        </button>

        {/* Fallback link for mobile */}
        <a
          href={streamUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:block text-xs text-gray-400 hover:text-white transition-colors"
          title="Otvori stream u novom tabu"
        >
          📱
        </a>

        {/* Volume Control */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors duration-200 flex items-center justify-center"
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            defaultValue="0.7"
            onChange={handleVolumeChange}
            className="w-16 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #10b981 0%, #10b981 70%, #374151 70%, #374151 100%)`
            }}
          />
        </div>

        {/* Visualizer */}
        <div className="hidden lg:flex items-center gap-1 h-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-1 bg-green-500 rounded-full transition-all duration-300 ${
                isPlaying ? "h-6" : "h-2"
              }`}
              style={{
                animation: isPlaying ? `wave 1s ease-in-out infinite ${i * 0.2}s` : "none"
              }}
            />
          ))}
        </div>
      </div>

      <audio 
        ref={audioRef} 
        src={streamUrl}
        preload="none"
        crossOrigin="anonymous"
        playsInline
        controls={false}
        onLoadStart={() => console.log("Audio loading started")}
        onCanPlay={() => console.log("Audio can play")}
        onError={(e) => {
          console.error("Audio error:", e)
          alert("Greška sa audio stream-om! Proverite internet konekciju.")
        }}
        onPlay={() => console.log("Audio started playing")}
        onPause={() => console.log("Audio paused")}
        onLoad={() => console.log("Audio loaded")}
        onWaiting={() => console.log("Audio waiting for data")}
        onStalled={() => console.log("Audio stalled")}
      />
    </div>
  )
}