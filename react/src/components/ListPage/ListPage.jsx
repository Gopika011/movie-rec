import React, {useState} from 'react';
import Navbar from '../HomePage/Navbar'
import Sidebar from '../HomePage/Sidebar'


const initialMovies = [
  {
    id: 1,
    title: 'Morbius',
    imageUrl: '/morbius.jpg'
  },
  {
    id: 2,
    title: 'Antman',
    imageUrl: '/antman.jpg'
  },
  {
    id: 3,
    title: 'Bougainvillea',
    imageUrl: '/bougainvillea.jpg'
  },
  {
    id: 4,
    title: 'Pathan',
    imageUrl: '/pathaan.jpg'
  },
  {
    id: 5,
    title: 'Andhadhun',
    imageUrl: '/andhadhun.jpg'
  }
];

const ListPage = () => {

    // State to manage the list of movies
    const [movies, setMovies] = useState(initialMovies);

    // Function to handle removing a movie
    const handleRemove = (movieId) => {
      setMovies(movies.filter(movie => movie.id !== movieId));
    };

  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <h1 className="text-4xl text-[#FA6C00] font-semibold ml-20 mt-8">WatchList</h1>
      <div className="flex justify-center gap-6 overflow-x-auto mt-20">
      {movies.length === 0 ? (
          <p className="text-2xl text-gray-100 text-center mt-8 ">Your watchlist is empty.</p>
        ) :(
        movies.map((movie) => (
          <div key={movie.id} className="bg-gray-800 rounded-lg shadow-lg w-36 transition-transform duration-300 hover:scale-105">
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="w-full h-full object-cover rounded-lg"
              />

              {/* Remove Button */}
              <button
                onClick={() => handleRemove(movie.id)}
                className="absolute bottom-2 right-2 bg-none text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 transition-colors duration-200 border-2 border-white"
              >
                X
              </button>
           
          </div>
        )))}
      </div>
    </div>
  );
};


export default ListPage




