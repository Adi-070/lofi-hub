'use client'

const React = require('react')
const { useState, useEffect, useRef } = React
const { Play, Pause, SkipForward, SkipBack, Heart, Volume2, Palette, Menu, X } = require('lucide-react')

const s3BaseURL = 'https://lofi-music.s3.eu-north-1.amazonaws.com'

const themes = [
  {
    name: 'Cityscape',
    video: '/background5.mp4',
    thumbnail: '/Cityscape.png',
    songs: [
      { id: '1', title: 'Good Night', artist: 'FASSounds', url: `${s3BaseURL}/cityscape/song1.mp3`, cover: '/placeholder.svg?height=400&width=400' },
      { id: '2', title: 'Summer shake', artist: 'DJ burgerhead', url: `${s3BaseURL}/cityscape/song2.mp3`, cover: '/placeholder.svg?height=400&width=400' },
      { id: '3', title: 'Osha Sutherland X A.R.T', artist: 'A.R.T', url: `${s3BaseURL}/cityscape/song3.mp3`, cover: '/placeholder.svg?height=400&width=400' }
    ]
  },
  {
    name: 'Nature',
    video: '/nature2.mp4',
    thumbnail: '/nature.png',
    songs: [
      { id: '4', title: 'lofi Song - Nature by Lofium', artist: 'Lofium', url: `${s3BaseURL}/nature/nature1.mp3`, cover: '/placeholder.svg?height=400&width=400' },
      { id: '5', title: 'Lofi seasons - Summer anthem', artist: 'lofi_seasons', url: `${s3BaseURL}/nature/nature2.mp3`, cover: '/placeholder.svg?height=400&width=400' },
      { id: '6', title: 'Garden Vibes Lofi', artist: 'xethrocc', url: `${s3BaseURL}/nature/nature3.mp3`, cover: '/placeholder.svg?height=400&width=400' },
      { id: '7', title: 'Summer Rain - Lofi vibes', artist: 'xethrocc', url: `${s3BaseURL}/nature/nature4.mp3`, cover: '/placeholder.svg?height=400&width=400' }
    ]
  },
  {
    name: 'Sunrise',
    video: '/Sunrise.mp4',
    thumbnail: '/sunrise.png',
    songs: [
      { id: '8', title: 'Sunrise', artist: 'PremiumMusicOdyssey', url: `${s3BaseURL}/sunrise/sunrise1.mp3`, cover: '/placeholder.svg?height=400&width=400' },
      { id: '9', title: 'Lofi Large/lofi', artist: 'LofiCosmos', url: `${s3BaseURL}/sunrise/sunrise2.mp3`, cover: '/placeholder.svg?height=400&width=400' },
      { id: '10', title: 'Lofi Piano "Memories"', artist: 'Akiko_Shina',url: `${s3BaseURL}/sunrise/sunrise3.mp3`, cover: '/placeholder.svg?height=400&width=400' }
    ]
  },
  {
    name: 'Snow',
    video: '/Snoww.mp4',
    thumbnail: '/snow.png',
    songs: [
      { id: '11', title: 'Avenue', artist: 'xethrocc', url: `${s3BaseURL}/snow/snow1.mp3`, cover: '/placeholder.svg?height=400&width=400' },
      { id: '12', title: 'Playa del sol', artist: 'xethrocc', url: `${s3BaseURL}/snow/snow2.mp3`, cover: '/placeholder.svg?height=400&width=400' },
      { id: '13', title: 'Lofi Song - Kertajina by Lofium', artist: 'Lofium', url: `${s3BaseURL}/snow/snow3.mp3`, cover: '/placeholder.svg?height=400&width=400' }
    ]
  },
  {
    name: 'Campfire',
    video: '/Campfire.mp4',
    thumbnail: '/campfire.png',
    songs: [
      { id: '14', title: 'Lofi Song - Room by Lofium', artist: 'Lofium', url: `${s3BaseURL}/campfire/campfire1.mp3`, cover: '/placeholder.svg?height=400&width=400' },
      { id: '15', title: 'Crackling Lullaby', artist: 'Flame Harmonics', url: '/songs/campfire2.mp3', cover: '/placeholder.svg?height=400&width=400' },
      { id: '16', title: 'Marshmallow Melodies', artist: 'Bonfire Beats', url: '/songs/campfire3.mp3', cover: '/placeholder.svg?height=400&width=400' }
    ]
  }
]

function Home() {
  const [currentTheme, setCurrentTheme] = useState(themes[0])
  const [likedSongs, setLikedSongs] = useState([])
  const [currentSong, setCurrentSong] = useState(currentTheme.songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio] = useState(typeof Audio !== "undefined" ? new Audio(currentSong.url) : null)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isThemeSidebarOpen, setIsThemeSidebarOpen] = useState(false)
  const [isSongSidebarOpen, setIsSongSidebarOpen] = useState(false)
  const progressRef = useRef(null)

  useEffect(() => {
    if (audio) {
      audio.src = currentSong.url
      if (isPlaying) {
        audio.play()
      }
    }
  }, [currentSong, audio])
  
  useEffect(() => {
    if (audio) {
      audio.volume = volume
    }
  }, [volume, audio])
  
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
    const currentIndex = currentTheme.songs.findIndex(song => song.id === currentSong.id)
    const nextIndex = (currentIndex + 1) % currentTheme.songs.length
    setCurrentSong(currentTheme.songs[nextIndex])
  }

  const playPrevious = () => {
    const currentIndex = currentTheme.songs.findIndex(song => song.id === currentSong.id)
    const previousIndex = (currentIndex - 1 + currentTheme.songs.length) % currentTheme.songs.length
    setCurrentSong(currentTheme.songs[previousIndex])
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

  const changeTheme = (theme) => {
    setCurrentTheme(theme)
    setCurrentSong(theme.songs[0])
    setIsPlaying(false)
    setIsThemeSidebarOpen(false)
  }

  const toggleThemeSidebar = () => {
    setIsThemeSidebarOpen(!isThemeSidebarOpen)
    if (isSongSidebarOpen) setIsSongSidebarOpen(false)
  }

  const toggleSongSidebar = () => {
    setIsSongSidebarOpen(!isSongSidebarOpen)
    if (isThemeSidebarOpen) setIsThemeSidebarOpen(false)
  }

  return (
    <div className="relative min-h-screen flex text-white">
      {/* Background Video */}
      <video 
        key={currentTheme.video}
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={currentTheme.video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
      
      {/* Theme Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-72 bg-black bg-opacity-70 backdrop-filter backdrop-blur-lg z-30 transform transition-transform duration-300 ease-in-out ${isThemeSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4">
          <button onClick={toggleThemeSidebar} className="absolute top-4 left-4 focus:outline-none">
            <X size={24} />
          </button>
          <h2 className="text-2xl font-semibold mb-4 text-center">Themes</h2>
          <div className="grid grid-cols-2 gap-4">
            {themes.map((theme) => (
              <button
                key={theme.name}
                onClick={() => changeTheme(theme)}
                className={`flex flex-col items-center p-2 rounded-md transition-colors ${
                  currentTheme.name === theme.name
                    ? 'bg-teal-500 text-white'
                    : 'text-gray-200 hover:bg-gray-700'
                }`}
              >
                <img src={theme.thumbnail} alt={theme.name} className="w-20 h-20 object-cover rounded-md mb-2" />
                <span className="text-sm text-center">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Song Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-black bg-opacity-70 backdrop-filter backdrop-blur-lg z-30 transform transition-transform duration-300 ease-in-out ${isSongSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4">
          <button onClick={toggleSongSidebar} className="absolute top-4 right-4 focus:outline-none">
            <X size={24} />
          </button>
          <h2 className="text-2xl font-semibold mb-4">{currentTheme.name} Songs</h2>
          <div className="space-y-4">
            {currentTheme.songs.map((song) => (
              <div key={song.id} 
                   className="bg-white bg-opacity-10 rounded-lg p-3 transition duration-300 hover:bg-opacity-20">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-base">{song.title}</h3>
                    <p className="text-xs text-gray-300">{song.artist}</p>
                  </div>
                  <button onClick={() => handleLike(song.id)} className="focus:outline-none transition duration-300 transform hover:scale-110">
                    <Heart 
                      size={20} 
                      fill={likedSongs.includes(song.id) ? 'currentColor' : 'none'}
                      className={likedSongs.includes(song.id) ? 'text-red-500' : 'text-white'}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="relative z-10 p-8 text-center">
          {/* You can add a title or other content here if needed */}
        </header>

        <main className="flex-grow flex items-center justify-center relative z-10">
          {/* You can add any central content here if needed */}
        </main>

        {/* Footer */}
        <footer className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm text-white p-2 z-20">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <button onClick={toggleSongSidebar} className="focus:outline-none">
                  <Menu size={24} />
                </button>
                <div>
                  <h3 className="font-medium text-base">{currentSong.title}</h3>
                  <p className="text-xs text-gray-400">{currentSong.artist}</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2 w-full md:w-1/2">
                <div className="flex items-center space-x-6">
                  <button onClick={playPrevious} className="focus:outline-none transition duration-300 transform hover:scale-110">
                    <SkipBack size={20} />
                  </button>
                  <button onClick={togglePlay} className="focus:outline-none transition duration-300 transform hover:scale-110">
                    {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                  </button>
                  <button onClick={playNext} className="focus:outline-none transition duration-300 transform hover:scale-110">
                    <SkipForward size={20} />
                  </button>
                </div>
                <div className="w-full bg-white bg-opacity-20 rounded-full h-1.5 cursor-pointer" onClick={handleProgressChange} ref={progressRef}>
                  <div className="bg-teal-500 h-1.5 rounded-full transition-all duration-300 ease-in-out" style={{width: `${progress}%`}}></div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
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
                <button
                  onClick={toggleThemeSidebar}
                  className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 focus:outline-none transition duration-300"
                >
                  <Palette className="h-4 w-4" />
                  <span className="sr-only">Change theme</span>
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

module.exports = Home