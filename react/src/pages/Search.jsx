import React from 'react'
import SearchPage from '../components/SearchPage/SearchPage'
import Navbar from '../components/HomePage/Navbar'

const Search = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        {/*<Navbar/>*/}
        <SearchPage />
    </div>
  )
}

export default Search