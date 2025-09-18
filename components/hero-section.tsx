"use client"
import { Play, Pause, Radio } from "lucide-react"

interface HeroSectionProps {
  onPlayToggle: () => void
  isPlaying: boolean
  currentStation: string
}

export function HeroSection({ onPlayToggle, isPlaying, currentStation }: HeroSectionProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500 rounded-full blur-3xl" />
      </div>

      <div className="text-center relative z-10 max-w-4xl mx-auto px-6">
        {/* Logo */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl mb-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <Radio className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
          <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Zvečanska
          </span>
          <br />
          <span className="text-slate-200">Hronika</span>
        </h1>

        <p className="text-xl text-slate-300 mb-12 font-medium">
          Vaša lokalna radio stanica
        </p>

        {/* Current Station Info */}
        <div className="mb-8 p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-slate-700">
          <p className="text-sm text-slate-400 mb-1">Trenutno slušate:</p>
          <p className="text-lg font-semibold text-white">{currentStation}</p>
        </div>

        {/* Play Button */}
        <div className="mb-6">
          <button
            onClick={() => {
              console.log("Hero play button clicked")
              onPlayToggle()
            }}
            className="group relative w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center mx-auto"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white ml-1" />
            )}
          </button>
        </div>
        
        <div className="flex items-center justify-center gap-3">
          <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500' : 'bg-slate-500'}`} />
          <p className="text-base text-slate-300 font-medium">
            {isPlaying ? "UŽIVO" : "Kliknite za live stream"}
          </p>
        </div>
      </div>
    </div>
  )
}