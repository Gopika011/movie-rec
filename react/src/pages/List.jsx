import React from 'react'
import ListPage from '../components/ListPage/ListPage'
import Navbar from '../components/HomePage/Navbar'

const List = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar/>
      <ListPage />
    </div>
  )
}

export default List