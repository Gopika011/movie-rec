import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import Hero from '../components/LoginPage/Hero';
import About from '../components/LoginPage/About';
import HomePage from '../components/HomePage/HomePage';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.removeItem('user');
    navigate('/login');
  }
  return (
    // <div className='w-screen h-screen flex flex-col space-y-10 p-10 items-center bg-gray-100'>
    //     <div className='text-3xl font-bold'>Welcome {user.name}</div>
    //     <button className='btn btn-error btn-md' onClick={handleLogout}>LOGOUT</button>
    // </div>
    <HomePage/>

    
  )
}

export default Home