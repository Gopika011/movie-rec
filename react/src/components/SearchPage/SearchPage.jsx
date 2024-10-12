import React, { useState, useEffect } from 'react';
import Sidebar from '../HomePage/Sidebar';
import Search from './Search';
import MovieList from './MovieList';
import useGetSearch from '../../hooks/useGetSearch';
import useGetRandom from '../../hooks/useGetRandom';

const SearchPage = () => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [randomMovies, setRandomMovies] = useState([]);
  const getSearch = useGetSearch();
  const getRandom = useGetRandom();

  // Fetch random movies when component mounts
  useEffect(() => {
    const fetchRandomMovies = async () => {
      const randomResults = await getRandom();
      setRandomMovies(randomResults);
      setFilteredMovies(randomResults);
    };
  
    // Fetch only once when component mounts
    if(randomMovies.length ===0){
      console.log("brroooo")
      fetchRandomMovies();
    }
    
  }, []); // Only run once when getRandom changes



  // Handle search
  const handleSearch = async(searchTerm) => {

    if (searchTerm) {
      const searchResults = await getSearch(searchTerm);
      setFilteredMovies(searchResults);
    } else {
      setFilteredMovies(randomMovies);  
    }
  };

  console.log(filteredMovies)

  return (
    <div className="flex bg-[#141414] min-h-screen">
      
      <div className="fixed top-24 left-0 z-10">
        <Sidebar />
      </div>
      
      {/* Movie list with its own scrollable area */}
      <div className="ml-40 flex-grow overflow-auto h-screen"> 
        <div className="flex flex-col items-center h-full"> 
          <Search handleSearch={handleSearch} />  

          {/* Display filtered movies or random movies if no search term */}
          {filteredMovies.length > 0 ? (
            <MovieList movies={filteredMovies} />
          ) : (
            <div className="text-white mt-4">No movies found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
