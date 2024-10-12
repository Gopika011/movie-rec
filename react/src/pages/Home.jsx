import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import Hero from '../components/LoginPage/Hero';
import About from '../components/LoginPage/About';
import HomePage from '../components/HomePage/HomePage';
import Navbar from '../components/HomePage/Navbar';
import HomeScroll from '../components/HomePage/HomeScroll';

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
    <div className='bg-[#141414]'>
    <div className='flex flex-col min-h-screen'>
      <Navbar/>
      <HomePage/>
    </div>
      <HomeScroll/>

      <div className='border-t border-white flex justify-between py-6 px-20 pb-10 text-white text-md mt-32'>
        <h4>COPYRIGHT 2024 . CORNFLICKS.COM</h4>
        <h4>CONTACT | PRIVACY POLICY</h4>
      </div>
    </div>


    
  )
}

export default Home