import React, { useState, useEffect } from 'react';

const Search = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value); // Trigger search automatically on typing
  };

  const handleClear = () => {
    setSearchTerm(''); // Clear the search term
    handleSearch(''); // Trigger the onSearch callback with an empty value
  };

  return (
    <div className="relative flex justify-center p-4 w-full">
      <div className="relative mt-8 ml-4 w-full">
        <input
          className="appearance-none pl-12 pr-10 bg-[#252733] text-orange-400 font-medium placeholder-orange-400 rounded-lg w-full py-4 leading-tight focus:outline-none focus:ring-0"        
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for movies..."
          style={{opacity: 'var(--tw-bg-opacity)' }}
        />

        {/* Cross icon (right side) */}
        <div className="absolute right-3 inset-y-0 flex items-center cursor-pointer" onClick={handleClear}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-400 hover:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Search;
