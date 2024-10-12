import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Trigger search automatically on typing
  };

  const handleClear = () => {
    setSearchTerm(''); // Clear the search term
    onSearch(''); // Trigger the onSearch callback with an empty value
  };

  return (
    <div className="relative flex justify-center p-4 w-full">
      {/* Spacing from the Navbar (mt-8) and Sidebar (ml-4) */}
      <div className="relative mt-8 ml-4 w-full max-w-lg">
        {/* Input field without border, with rgb(20, 20, 20) background and orange text */}
        <input
          className="appearance-none pl-12 pr-10 bg-gray-900 text-orange-400 placeholder-orange-400 rounded-lg w-full py-3 leading-tight focus:outline-none focus:ring-0"        
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for movies..." // Placeholder text in orange
          style={{ backgroundColor: 'rgb(20, 20, 20)', opacity: 'var(--tw-bg-opacity)' }}
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
