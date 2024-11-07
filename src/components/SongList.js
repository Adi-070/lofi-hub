// // components/SongList.js
// import React from 'react';

// const SongList = ({ songs, onLike, likedSongs }) => {
//   return (
//     <div className="w-full max-w-md mx-auto">
//       {songs.map((song) => (
//         <div key={song.id} className="flex justify-between items-center p-2 bg-gray-800 bg-opacity-80 rounded-lg mb-2">
//           <div>
//             <h3 className="text-lg font-medium">{song.title}</h3>
//             <p className="text-sm text-gray-400">{song.artist}</p>
//           </div>
//           <button
//             onClick={() => onLike(song.id)}
//             className={`p-2 rounded-full ${
//               likedSongs.includes(song.id) ? 'bg-pink-500' : 'bg-gray-600'
//             }`}
//           >
//             {likedSongs.includes(song.id) ? '♥' : '♡'}
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SongList;
