import React, { useState } from 'react';
import MovieModal from '../ListPage/MovieModal'

const MovieList = ({ movies }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (movies.length === 0) {
    return null; // Return null if there are no movies to display
  }

  return (
    <div className="flex flex-wrap justify-center p-5">
      {movies.map(movie => (
        <div 
          key={movie.id} 
          className="mx-2 my-2 w-36 flex-shrink-0 cursor-pointer transform transition-transform duration-300 hover:scale-105" // Add hover effect
          onClick={() => {setSelectedMovie(movie)}}
        >
          <img 
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} 
            alt={movie.title} 
            className="w-full rounded-md" 
            onError={(e) => e.target.src = 'placeholder-image-url.jpg'} // Placeholder on error
          />
        </div>
      ))}


      {selectedMovie && (<MovieModal setSelectedMovie={setSelectedMovie} selectedMovie={selectedMovie}/>)}
    </div>
  );
};

export default MovieList;
