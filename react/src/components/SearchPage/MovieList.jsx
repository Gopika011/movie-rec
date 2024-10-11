import React from 'react';

const MovieList = ({ movies }) => {
  if (movies.length === 0) {
    return <div style={{ color: '#fff', padding: '20px' }}>No movies found.</div>;
  }

  return (
    <div className="flex flex-wrap justify-center p-5">
      {movies.map(movie => (
        <div key={movie.id} className="m-2 w-36 flex-shrink-0"> {/* Ensure the movie items do not shrink */}
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
