'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Play, Pause, SkipForward, SkipBack, Heart, Volume2 } from 'lucide-react'

const songsData = [
  { id: '1', title: 'Lo-Fi Chill', artist: 'Artist A', url: '/songs/song1.mp3', cover: '/placeholder.svg?height=400&width=400' },
  { id: '2', title: 'Study Vibes', artist: 'Artist B', url: '/songs/song2.mp3', cover: '/placeholder.svg?height=400&width=400' },
  { id: '3', title: 'Focus Beats', artist: 'Artist C', url: '/songs/song3.mp3', cover: '/placeholder.svg?height=400&width=400' }
]

export default function Home() {
  const [likedSongs, setLikedSongs] = useState([])
  const [currentSong, setCurrentSong] = useState(songsData[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio] = useState(typeof Audio !== "undefined" ? new Audio(currentSong.url) : null)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(1)
  const progressRef = useRef(null)

  useEffect(() => {
    if (audio) {
      audio.src = currentSong.url
      audio.volume = volume
      if (isPlaying) {
        audio.play()
      }
    }
  }, [currentSong, audio, volume])

  useEffect(() => {
    if (audio) {
      if (isPlaying) {
        audio.play()
      } else {
        audio.pause()
      }
    }
  }, [isPlaying, audio])

  useEffect(() => {
    const updateProgress = () => {
      if (audio && audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }
    audio?.addEventListener('timeupdate', updateProgress)
    return () => audio?.removeEventListener('timeupdate', updateProgress)
  }, [audio])

  const handleLike = (songId) => {
    setLikedSongs((prev) => {
      if (prev.includes(songId)) {
        return prev.filter((id) => id !== songId)
      } else {
        return [...prev, songId]
      }
    })
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const playNext = () => {
    const currentIndex = songsData.findIndex(song => song.id === currentSong.id)
    const nextIndex = (currentIndex + 1) % songsData.length
    setCurrentSong(songsData[nextIndex])
  }

  const playPrevious = () => {
    const currentIndex = songsData.findIndex(song => song.id === currentSong.id)
    const previousIndex = (currentIndex - 1 + songsData.length) % songsData.length
    setCurrentSong(songsData[previousIndex])
  }

  const handleProgressChange = (e) => {
    const clickPosition = (e.clientX - progressRef.current.getBoundingClientRect().left) / progressRef.current.offsetWidth
    if (audio) {
      audio.currentTime = clickPosition * audio.duration
      setProgress(clickPosition * 100)
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audio) {
      audio.volume = newVolume
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-between text-white">
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/background5.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
      
      <header className="relative z-10 p-8 text-center">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500">
          Lofi Music Player
        </h1>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center relative z-10 p-8">
        <div className="w-full max-w-4xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-semibold mb-6 text-center">Song List</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {songsData.map((song) => (
              <div key={song.id} 
                   className="bg-white bg-opacity-20 rounded-xl p-4 transition duration-300 transform hover:scale-105 hover:bg-opacity-30">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-lg">{song.title}</h3>
                    <p className="text-sm text-gray-300">{song.artist}</p>
                  </div>
                  <button onClick={() => handleLike(song.id)} className="focus:outline-none transition duration-300 transform hover:scale-110">
                    <Heart 
                      size={24} 
                      fill={likedSongs.includes(song.id) ? 'currentColor' : 'none'}
                      className={likedSongs.includes(song.id) ? 'text-red-500' : 'text-white'}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-gray-900 bg-opacity-95 text-white p-4 z-20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <img src={currentSong.cover} alt="Album cover" className="w-16 h-16 rounded-md" />
              <div>
                <h3 className="font-medium text-lg">{currentSong.title}</h3>
                <p className="text-sm text-gray-400">{currentSong.artist}</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2 w-full md:w-1/2">
              <div className="flex items-center space-x-6">
                <button onClick={playPrevious} className="focus:outline-none transition duration-300 transform hover:scale-110">
                  <SkipBack size={24} />
                </button>
                <button onClick={togglePlay} className="focus:outline-none transition duration-300 transform hover:scale-110">
                  {isPlaying ? <Pause size={36} /> : <Play size={36} />}
                </button>
                <button onClick={playNext} className="focus:outline-none transition duration-300 transform hover:scale-110">
                  <SkipForward size={24} />
                </button>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 cursor-pointer" onClick={handleProgressChange} ref={progressRef}>
                <div className="bg-teal-500 h-1.5 rounded-full transition-all duration-300 ease-in-out" style={{width: `${progress}%`}}></div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Volume2 size={20} />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 accent-teal-500"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
