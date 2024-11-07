// // components/AudioPlayer.js
// import React, { useState, useRef, useEffect } from 'react';

// const AudioPlayer = ({ songs }) => {
//   const [currentSongIndex, setCurrentSongIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const audioRef = useRef(null);

//   const playPause = () => {
//     if (isPlaying) {
//       audioRef.current.pause();
//     } else {
//       audioRef.current.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const nextSong = () => {
//     setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
//     setIsPlaying(true);
//   };

//   useEffect(() => {
//     if (isPlaying) audioRef.current.play();
//   }, [currentSongIndex]);

//   return (
//     <div className="flex justify-between items-center px-4 py-2">
//       <audio ref={audioRef} src={songs[currentSongIndex].url} onEnded={nextSong} />
//       <div className="text-white">
//         <h3 className="text-lg font-semibold">{songs[currentSongIndex].title}</h3>
//         <p className="text-sm">{songs[currentSongIndex].artist}</p>
//       </div>
//       <div className="flex space-x-4">
//         <button onClick={playPause} className="text-white text-lg">
//           {isPlaying ? 'Pause' : 'Play'}
//         </button>
//         <button onClick={nextSong} className="text-white text-lg">
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AudioPlayer;
