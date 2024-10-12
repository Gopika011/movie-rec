import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieList = ({ movies }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  if (movies.length === 0) {
    return null; // Return null if there are no movies to display
  }

  return (
    <div className="flex flex-wrap justify-center p-5">
      {movies.map(movie => (
        <div 
          key={movie.id} 
          className="m-2 w-36 flex-shrink-0 cursor-pointer transform transition-transform duration-300 hover:scale-105" // Add hover effect
          onClick={() => navigate(`/movie/${movie.id}`)} // Navigate to the movie page
        >
          <img 
            src={movie.full_poster_url} 
            alt={movie.title} 
            className="w-full rounded-lg" 
            onError={(e) => e.target.src = 'placeholder-image-url.jpg'} // Placeholder on error
          />
          <div className="text-white text-center mt-2">
            {movie.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
