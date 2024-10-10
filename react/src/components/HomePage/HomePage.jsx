import React from 'react'
import Navbar from './Navbar'
import HeroHome from './HeroHome'

const HomePage = () => {
  return (
    <div className='flex flex-col h-screen bg-[#141414]'>
      <Navbar/>
      <HeroHome /> 
    </div>

  )
}

export default HomePage