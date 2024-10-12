import React, { useState } from 'react'
import Slide from './Slide'
import MovieModal from '../ListPage/MovieModal'

const Carousal = ({title, movies}) => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [startIndex, setStartIndex] = useState(0)

    const handleSlideChange = (newIndex) =>{
        setStartIndex(newIndex)
    }

    // const visibleMovies = movies.slice(startIndex, startIndex + 5).concat(
    //     movies.slice(0, Math.max(0, 5 - (movies.length - startIndex)))
    // );
    const visibleMovies = movies.slice(startIndex, startIndex + 5);

    const activeDotIndex = Math.floor(startIndex / 5);

    const prevSlide = () => {
      const newIndex = Math.max(0, startIndex - 5);
      setStartIndex(newIndex);
    };
  
    const nextSlide = () => {
      const newIndex = Math.min(movies.length - 5, startIndex + 5);
      setStartIndex(newIndex);
    };
    

  return (
      <div className=' w-full space-y-6'>
        <div className='flex justify-between items-center '>
          <h2 className='text-4xl font-bold'>{title}</h2>
          
          <div><Slide totalSlides={Math.ceil(movies.length / 5)} handleSlideChange={handleSlideChange}/></div>
        </div>
        <div className='flex gap-8 py-5 '>
          {visibleMovies.map((movie,index) =>(
                    <div key={index} 
                    className='w-1/5 bg-[#1a1a1a] h-[320px] rounded-lg border border-[#262626] overflow-hidden p-4 cursor-pointer transform transition-transform duration-300 hover:scale-105'
                    onClick={() => {setSelectedMovie(movie)}}>
                    <img
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt={movie.title}
                        className='w-full h-full object-cover rounded-lg'
                    />
                </div>
            ))}
        </div>

        {selectedMovie && (<MovieModal setSelectedMovie={setSelectedMovie} selectedMovie={selectedMovie}/>)}
      </div>
  )
}

export default Carousal