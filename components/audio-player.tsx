"use client"
import { useRef, useEffect, useState } from "react"
import { Play, Pause, Volume2, Radio, ChevronDown } from "lucide-react"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"

interface Station {
  id: string
  name: string
  url: string
}

interface AudioPlayerProps {
  streamUrl?: string
  isPlaying?: boolean
  onPlayToggle?: () => void
  stations?: Station[]
  currentStation?: string
  onStationChange?: (station: Station) => void
}

export function AudioPlayer({ 
  streamUrl = "https://streaming.tdiradio.com/hit.mp3", 
  isPlaying = false, 
  onPlayToggle,
  stations = [],
  currentStation = "Zvečanska Hronika",
  onStationChange
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [showStationSelector, setShowStationSelector] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const selectedStationId = stations.find((s) => s.name === currentStation)?.id || (stations[0]?.id || "")

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
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
    }
  }

  const handleStationSelect = (station: Station) => {
    if (onStationChange) {
      onStationChange(station)
    }
    setShowStationSelector(false)
  }

  const handleMobileStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const station = stations.find((s) => s.id === e.target.value)
    if (station && onStationChange) {
      onStationChange(station)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Station Selector Dropdown */}
      {showStationSelector && stations.length > 0 && (
        <div className="absolute bottom-full right-0 mb-2 bg-slate-800 rounded-xl shadow-lg border border-slate-700 py-2 min-w-64">
          {stations.map((station) => (
            <button
              key={station.id}
              onClick={() => handleStationSelect(station)}
              className="w-full px-4 py-3 text-left hover:bg-slate-700 transition-colors flex items-center gap-3"
            >
              <Radio className="w-4 h-4 text-slate-400" />
              <div>
                <div className="font-medium text-white">{station.name}</div>
                <div className="text-xs text-slate-400">{station.url}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Mobile station selector (bottom sheet) */}
      <div className="sm:hidden mb-3">
        {stations.length > 0 && (
          <Sheet>
            <SheetTrigger className="w-full bg-slate-800 text-slate-100 border border-slate-700 rounded-lg px-3 py-2 text-sm text-left">
              Stanice
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-slate-900 border-slate-800">
              <SheetHeader>
                <SheetTitle className="text-slate-100">Odaberite stanicu</SheetTitle>
              </SheetHeader>
              <div className="p-4 grid grid-cols-1 gap-3">
                {stations.map((s) => (
                  <SheetClose key={s.id} asChild>
                    <button
                      onClick={() => onStationChange && onStationChange(s)}
                      className={`w-full px-4 py-3 rounded-lg text-left transition-colors ${
                        s.name === currentStation
                          ? "bg-blue-600/20 border border-blue-600 text-white"
                          : "bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
                          <Radio className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{s.name}</div>
                          <div className="text-xs text-slate-400 truncate">{s.url}</div>
                        </div>
                      </div>
                    </button>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
      
      <div className="flex items-center gap-4 bg-slate-800/90 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg border border-slate-700">
        {/* Station Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
            <Radio className="w-5 h-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold text-white">{currentStation}</div>
            <div className="text-xs text-slate-400">{isPlaying ? "UŽIVO" : "Radio Stanica"}</div>
          </div>
        </div>

        {/* Station Selector Button */}
        {stations.length > 0 && (
          <button
            onClick={() => setShowStationSelector(!showStationSelector)}
            className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
          >
            <ChevronDown className="w-3 h-3" />
            Menjaj
          </button>
        )}

        {/* Play Button */}
        <button
          onClick={handlePlayToggle}
          className="group relative w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg flex items-center justify-center"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white ml-0.5" />
          )}
        </button>

        {/* Volume Control */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleMute}
            className="w-8 h-8 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-colors duration-200 flex items-center justify-center"
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-40 h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #2563eb 0%, #2563eb ${Math.round(volume * 100)}%, #475569 ${Math.round(volume * 100)}%, #475569 100%)`
              }}
            />
            <span className="text-xs text-slate-400 tabular-nums w-8 text-right">{Math.round(volume * 100)}%</span>
          </div>
        </div>

        {/* Visualizer */}
        <div className="hidden lg:flex items-center gap-1 h-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-1 bg-blue-500 rounded-full transition-all duration-300 ${
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
          const error = e.currentTarget.error
          if (error) {
            switch (error.code) {
              case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                alert("Ovaj audio format nije podržan. Pokušajte sa drugom stanicom ili otvorite stream direktno.")
                break
              case error.MEDIA_ERR_NETWORK:
                alert("Greška sa mrežom. Proverite internet konekciju.")
                break
              case error.MEDIA_ERR_DECODE:
                alert("Greška pri dekodiranju audio stream-a.")
                break
              default:
                alert("Greška sa audio stream-om! Pokušajte sa drugom stanicom.")
            }
          }
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