"use client"

import { useState } from "react"
import { HeroSection } from "@/components/hero-section"
import { AudioPlayer } from "@/components/audio-player"

interface Station {
  id: string
  name: string
  url: string
}

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStation, setCurrentStation] = useState<Station>({
    id: "zvecanska-hronika",
    name: "Zvečanska Hronika",
    url: "https://streaming.tdiradio.com/hit.mp3"
  })

  const stations: Station[] = [
    {
      id: "zvecanska-hronika",
      name: "Zvečanska Hronika",
      url: "https://streaming.tdiradio.com/hit.mp3"
    },
    {
      id: "naxi-radio",
      name: "Rock Radio",
      url: "https://edge9.pink.rs/rockstream"
    },
    {
      id: "naxi-radio",
      name: "Cool Radio",
      url: "https://live.coolradio.rs/cool128"
    },
  ]

  const handlePlayToggle = () => {
    console.log("Play toggle clicked, current state:", isPlaying)
    const newState = !isPlaying
    setIsPlaying(newState)
    console.log("New state:", newState)
  }

  const handleStationChange = (station: Station) => {
    setCurrentStation(station)
    // Stop current audio when changing stations
    setIsPlaying(false)
  }

  return (
    <main>
      <HeroSection 
        onPlayToggle={handlePlayToggle} 
        isPlaying={isPlaying}
        currentStation={currentStation.name}
      />
      <AudioPlayer 
        streamUrl={currentStation.url}
        isPlaying={isPlaying}
        onPlayToggle={handlePlayToggle}
        stations={stations}
        currentStation={currentStation.name}
        onStationChange={handleStationChange}
      />
    </main>
  )
}