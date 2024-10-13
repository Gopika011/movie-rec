import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import action from '/Action.png'
import adventure from '/Adventure.png'
import comedy from '/Comedy.png'
import drama from '/Drama.png'
import horror from '/Horror.png'
import Slide from './Slide'
import Carousal from './Carousal'
import useGetGenres from '../../hooks/useGetGenres'
import useGetMustWatch from '../../hooks/useGetMustWatch'
import useGetNew from '../../hooks/useGetNew'


const HomeScroll = () => {
  const [startIndex, setStartIndex] = useState(0);
  const {getGenres} = useGetGenres();
  const getMustwatch = useGetMustWatch();
  const getNew = useGetNew();
  const navigate = useNavigate()

  const movies = [
    { title: 'Movie 1' }, { title: 'Movie 2' }, { title: 'Movie 3' }, { title: 'Movie 4' }, 
    { title: 'Movie 5' }, { title: 'Movie 6' }, { title: 'Movie 7' }, { title: 'Movie 8' }
  ];
  const [rmovies, setRmovies] = useState(null)
  const [mmovies, setMmovies] = useState(null)
  const [nmovies, setNmovies] = useState(null)
  const [fmovies, setFmovies] = useState(null)
  const [amovies, setAmovies] = useState(null)

  useEffect(()=>{

    const getData = async()=>{
      const mustwatch = await getMustwatch()
      setMmovies(mustwatch)

      const newrel = await getNew();
      setNmovies(newrel)

      const action = await getGenres('Action',20);
      setAmovies(action)

      const feelgood = await getGenres('Romance',20);
      setFmovies(feelgood)

      const rec = await getGenres('Action',20);
      setRmovies(rec)
    }

    getData();
  },[])

  const handleSlideChange = (newIndex) =>{
    setStartIndex(newIndex)
  }

  const visibleMovies = movies.slice(startIndex, startIndex + 5).concat(
    movies.slice(0, Math.max(0, 5 - (movies.length - startIndex)))
  );

  return (
    <div className='flex flex-col py-20 mx-24 px-24 text-white border rounded-lg border-[#262626]  gap-20'>

      <div className=' w-full space-y-6'>
      <div className='flex justify-between items-center '>
          <h2 className='text-4xl font-bold'>Our Genres</h2>
          <div><Slide/></div>
        </div>
        <div className='flex gap-8 py-5 '>
          {/* {[...Array(5)].map((_,i) =>{
            <div key={i} className=' w-1/5 cursor-pointer transform transition-transform duration-300 hover:scale-105'>
              <img src={action} className='object-cover w-full h-full'/>
            </div>
          })} */}
          <div className=' w-1/5 cursor-pointer transform transition-transform duration-300 hover:scale-105' onClick={()=>{navigate('/genre/action')}}><img src={action} className='object-cover w-full h-full'/></div>
          <div className='w-1/5 cursor-pointer transform transition-transform duration-300 hover:scale-105' onClick={()=>{navigate('/genre/adventure')}}><img src={adventure} className='object-cover w-full h-full'/></div>
          <div className='w-1/5 cursor-pointer transform transition-transform duration-300 hover:scale-105' onClick={()=>{navigate('/genre/comedy')}}><img src={comedy} className='object-cover w-full h-full'/></div>
          <div className='w-1/5 cursor-pointer transform transition-transform duration-300 hover:scale-105' onClick={()=>{navigate('/genre/drama')}}><img src={drama} className='object-cover w-full h-full'/></div>
          <div className='w-1/5 cursor-pointer transform transition-transform duration-300 hover:scale-105' onClick={()=>{navigate('/genre/horror')}}><img src={horror} className='object-cover w-full h-full'/></div>
        </div>
      </div>

      {/* <Carousal title="Recommendations" movies={movies} />

      <Carousal title="Must-watch Movies" movies={movies} />

      <Carousal title="New Releases" movies={movies} />

      <Carousal title="Feel Good Movies" movies={movies} />

      <Carousal title="Action Movies" movies={movies} /> */}

      {rmovies && <Carousal title="Recommendations" movies={rmovies} />}
      {mmovies && <Carousal title="Must-watch Movies" movies={mmovies} />}
      {nmovies && <Carousal title="New Releases" movies={nmovies} />}
      {fmovies && <Carousal title="Feel Good Movies" movies={fmovies} />}
      {amovies && <Carousal title="Action Movies" movies={amovies} />}

    </div>
  )
}

export default HomeScroll