"use client"

import { useState } from "react"
import { HeroSection } from "@/components/hero-section"
import { AudioPlayer } from "@/components/audio-player"

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayToggle = () => {
    console.log("Play toggle clicked, current state:", isPlaying)
    const newState = !isPlaying
    setIsPlaying(newState)
    console.log("New state:", newState)
  }

  return (
    <main>
      <HeroSection onPlayToggle={handlePlayToggle} isPlaying={isPlaying} />
      <AudioPlayer 
        streamUrl="https://streaming.tdiradio.com/hit.mp3" 
        isPlaying={isPlaying}
        onPlayToggle={handlePlayToggle}
      />
    </main>
  )
}