import React, {useState} from 'react';
import Navbar from '../HomePage/Navbar'
import Sidebar from '../HomePage/Sidebar'


const initialMovies = [
  {
    id: 1,
    title: 'Morbius',
    imageUrl: '/morbius.jpg',
    rating: '6.1', 
    runtime: '104', 
    releaseDate: '2022-03-30', 
    description: 'Biochemist Michael Morbius tries to cure himself of a rare blood disease, but he inadvertently infects himself with a form of vampirism instead.'
  },
  {
    id: 2,
    title: 'Antman',
    imageUrl: '/antman.jpg',
    rating : '6.1', 
    runtime: '104', 
    releaseDate: '2022-03-30', 
    description: 'Biochemist Michael Morbius tries to cure himself of a rare blood disease, but he inadvertently infects himself with a form of vampirism instead.'
  },
  {
    id: 3,
    title: 'Bougainvillea',
    imageUrl: '/bougainvillea.jpg',
    rating: '6.1', 
    runtime: '104', 
    releaseDate: '2022-03-30', 
    description: 'Biochemist Michael Morbius tries to cure himself of a rare blood disease, but he inadvertently infects himself with a form of vampirism instead.'
  },
  {
    id: 4,
    title: 'Pathan',
    imageUrl: '/pathaan.jpg',
    rating: '6.1', 
    runtime: '104', 
    releaseDate: '2022-03-30', 
    description: 'Biochemist Michael Morbius tries to cure himself of a rare blood disease, but he inadvertently infects himself with a form of vampirism instead.'
  },
  {
    id: 5,
    title: 'Andhadhun',
    imageUrl: '/andhadhun.jpg',
    rating: '6.1', 
    runtime: '104', 
    releaseDate: '2022-03-30', 
    description: 'Biochemist Michael Morbius tries to cure himself of a rare blood disease, but he inadvertently infects himself with a form of vampirism instead.'
  }
];

const ListPage = () => {

    // State to manage the list of movies
    const [movies, setMovies] = useState(initialMovies);
    const [selectedMovie, setSelectedMovie] = useState(null);

    // Function to handle removing a movie
    const handleRemove = (movieId) => {
      setMovies(movies.filter(movie => movie.id !== movieId));
    };

    // Handle clicking a movie to open modal
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  // Handle closing the modal
  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="relative bg-[url('/peakpx2.png')] bg-cover bg-center bg-no-repeat min-h-screen p-8">
      {/* Overlay to add opacity */}
      <div className="absolute inset-0 bg-black opacity-85 z-0"></div>
      <div className='relative z-10'>
      <h1 className="text-4xl text-[#FA6C00] font-semibold ml-20 mt-8">WatchList</h1>
      <div className="flex justify-center gap-6 overflow-x-auto mt-20">
      {movies.length === 0 ? (
          <p className="text-2xl text-gray-100 text-center mt-8 ">Your watchlist is empty.</p>
        ) :(
        movies.map((movie) => (
          <div key={movie.id} className="relative bg-gray-800 rounded-lg shadow-lg w-36 transition-transform duration-300 hover:scale-105">
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="w-full h-full object-cover rounded-lg"
              onClick={() => handleMovieClick(movie)}
              />

              {/* Remove Button */}
              <button
                onClick={() => handleRemove(movie.id)}
                className="absolute bottom-2 right-2 bg-none text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 transition-colors duration-200 border-2 border-white"
              >X
              </button>
           
          </div>
        )))}
        </div>
      </div>
 {/* Modal for Movie Popup */}
 {selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white rounded-lg p-8 relative w-full max-w-4xl">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-red-600 p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 transition-colors duration-200">
              X
            </button>
            <div className="flex flex-col md:flex-row">
              <img 
                className="md:w-1/2 w-full rounded-lg"
                src={selectedMovie.imageUrl}
                alt={selectedMovie.title}
                
              />
               {/* Movie Details */}
          <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
            <h1 className="text-4xl font-bold">{selectedMovie.title}</h1>
            {/*<p className="text-gray-400 mt-2">{movie.genre}</p>*/}
            <p className="text-gray-500 mt-4">{selectedMovie.description}</p>

            {/* Additional Information */}
            <div className="mt-6 space-y-2">
              <p><strong>Rating:</strong> {selectedMovie.rating}</p>
              <p><strong>Release Date:</strong> {selectedMovie.releaseDate}</p>
              <p><strong>Runtime:</strong> {selectedMovie.runtime} mins</p>
              {/*<p><strong>Language:</strong> {movie.language}</p>
              <p><strong>Credits:</strong> {movie.credits}</p>
              <p><strong>Production:</strong> {movie.production}</p>*/}
            </div>

            {/* Add to Watchlist Button */}
            <button className="mt-6 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">Add to Watchlist</button>
          </div>
        </div>
      </div>
    </div>
      )}

    </div>
  );
};


export default ListPage




