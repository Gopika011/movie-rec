import React, { useState, useEffect } from 'react';
import Sidebar from '../HomePage/Sidebar';
import Search from './Search';
import MovieList from './MovieList';
import { moviesData } from '../../data/moviesData'; // Import the movie data

const SearchPage = () => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [randomMovies, setRandomMovies] = useState([]);

  // Fetch random movies when component mounts
  useEffect(() => {
    getRandomMovies(); // Show random movies on mount
  }, []);

  // Function to get random movies
  const getRandomMovies = () => {
    const shuffled = [...moviesData].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 19); // Select 16 random movies
    setRandomMovies(selected);
  };

  // Handle search
  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      // Filter movies based on the search term
      const filtered = moviesData.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies([]); // Clear results if search is empty
      getRandomMovies(); // Fetch random movies again when the search is empty
    }
  };

  return (
    <div className="flex bg-black min-h-screen"> {/* Ensure full height */}
      {/* Fixed Sidebar */}
      <div className="fixed top-0 left-0 z-10">
        <Sidebar />
      </div>
      
      {/* Movie list with its own scrollable area */}
      <div className="ml-40 flex-grow overflow-auto h-screen"> {/* Add left margin to avoid overlap with sidebar */}
        <div className="flex flex-col items-center bg-black h-full"> {/* Ensure the background remains black */}
          <Search onSearch={handleSearch} />  {/* Pass handleSearch to Search component */}

          {/* Display filtered movies or random movies if no search term */}
          {filteredMovies.length > 0 ? (
            <MovieList movies={filteredMovies} />
          ) : filteredMovies.length === 0 && randomMovies.length === 0 ? (
            <div className="text-white mt-4">No movies found.</div>
          ) : (
            <MovieList movies={randomMovies} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
