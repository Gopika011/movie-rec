import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [open,setOpen] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()
  
    const handleLogout = ()=>{
      localStorage.removeItem('user');
      navigate('/login');
    }

  return (
    <div className='w-full bg-[#141414] h-24 flex justify-between sticky top-0 z-50 text-white items-center px-20'>
        <div className='text-4xl text-[#FA6C00] font-semibold'>#NAME</div>

        <div className='flex gap-10 text-lg justify-center items-center'>
            <div className='text-[#FA6C00]'>about</div>
            <div className='flex justify-center items-center gap-2 cursor-pointer hover:text-gray-400 transition-all duration-300' onClick={()=>{setOpen(!open)}}>
                <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                className='size-6'
                >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <path d="M16 7 A4 4 0 0 1 12 11 A4 4 0 0 1 8 7 A4 4 0 0 1 16 7 z" />
                </svg>
                <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="0.6em"
                width="0.6em"
                >
                <path d="M11.178 19.569a.998.998 0 001.644 0l9-13A.999.999 0 0021 5H3a1.002 1.002 0 00-.822 1.569l9 13z" />
                </svg>
            </div>

            {open && 
            <div className='bg-black h-20 w-48 absolute top-[90px] right-20 transition-all duration-300 flex flex-col'>
                <div className='h-1/2 flex justify-center items-center border-b-[1px]'>{user.name}</div>
                <button className='h-1/2 flex justify-center items-center' onClick={handleLogout}>Logout</button>
            </div>}
        </div>
    </div>
  )
}

export default Navbar