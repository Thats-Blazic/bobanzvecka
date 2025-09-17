"use client"
import { Play, Pause, Radio } from "lucide-react"

interface HeroSectionProps {
  onPlayToggle: () => void
  isPlaying: boolean
}

export function HeroSection({ onPlayToggle, isPlaying }: HeroSectionProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-400/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="text-center relative z-10">
        {/* Logo */}
        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-8 shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-500 hover:scale-105">
            <Radio className="w-16 h-16 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-6xl md:text-8xl font-black mb-8 text-white tracking-tight">
          <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            Zvečanska
          </span>
          <br />
          <span className="text-white">Hronika</span>
        </h1>

        <p className="text-xl text-gray-300 mb-16 font-light">
          Vaša lokalna radio stanica
        </p>

        {/* Play Button */}
        <div className="mb-8">
          <button
            onClick={() => {
              console.log("Hero play button clicked")
              onPlayToggle()
            }}
            className="group relative w-20 h-20 bg-green-500 hover:bg-green-400 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl shadow-green-500/25 hover:shadow-green-400/40 flex items-center justify-center mx-auto"
          >
            <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-110 transition-transform duration-300" />
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white relative z-10" />
            ) : (
              <Play className="w-8 h-8 text-white relative z-10 ml-1" />
            )}
          </button>
        </div>
        
        <div className="flex items-center justify-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`} />
          <p className="text-lg text-gray-300 font-medium">
            {isPlaying ? "UŽIVO" : "Kliknite za live stream"}
          </p>
        </div>
      </div>
    </div>
  )
}