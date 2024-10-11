import React from 'react'
import Navbar from './Navbar'
import HeroHome from './HeroHome'
import Sidebar from './Sidebar'
import HomeScroll from './HomeScroll'

const HomePage = () => {
  return (
    <div className='relative w-full flex-grow flex'>
      <Sidebar/>
      <HeroHome /> 
    </div>

  )
}

export default HomePage