import React from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
    const navigate = useNavigate();

  return (
    <div className='w-40 flex flex-col gap-10 items-end pr-6 pt-1 absolute inset-0'>
        <div className='flex flex-col justify-center items-center gap-1' onClick={() => {navigate('/')}}>
            <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="1em"
            width="1em"
            className='size-7 text-white'
            >
            <path d="M12.71 2.29a1 1 0 00-1.42 0l-9 9a1 1 0 000 1.42A1 1 0 003 13h1v7a2 2 0 002 2h12a2 2 0 002-2v-7h1a1 1 0 001-1 1 1 0 00-.29-.71zM6 20v-9.59l6-6 6 6V20z" />
            </svg>
            <lablel className='text-center text-white text-xs'>Home</lablel>
        </div>

        <div className='flex flex-col justify-center items-center gap-1' onClick={() => {navigate('/search')}}>
            <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            height="1em"
            width="1em"
            className='size-7 text-white'
            >
            <path
                fillRule="evenodd"
                d="M11.5 7a4.499 4.499 0 11-8.998 0A4.499 4.499 0 0111.5 7zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z"
            />
            </svg>
            <label className='text-center text-white text-xs'>Search</label>
        </div>


        <div className='flex flex-col justify-center items-center gap-1' onClick={() => {navigate('/list')}}>
            <svg fill="none" viewBox="0 0 24 24" height="1em" width="1em" className='size-8 text-white' >
            <path
                fill="currentColor"
                d="M12 4a1 1 0 00-1 1v6H5a1 1 0 100 2h6v6a1 1 0 102 0v-6h6a1 1 0 100-2h-6V5a1 1 0 00-1-1z"
            />
            </svg>
            <label className='text-center text-white text-xs'>My List</label>
        </div>

    </div>
  )
}

export default Sidebar