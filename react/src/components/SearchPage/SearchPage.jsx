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
    const selected = shuffled.slice(0, 9); // Select 9 random movies
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
    }
  };

  return (
    <div className="flex bg-black">
      <Sidebar />
      <div className="flex-grow ml-40"> {/* Add left margin to avoid overlap with sidebar */}
        <div className="flex flex-col items-center">
          <Search onSearch={handleSearch} />  {/* Pass handleSearch to Search component */}
          {/* Display filtered movies or random movies if no search term */}
          <MovieList movies={filteredMovies.length > 0 ? filteredMovies : randomMovies} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
