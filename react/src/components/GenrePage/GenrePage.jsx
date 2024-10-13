import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'
import useGetGenres from '../../hooks/useGetGenres'
import MovieModal from '../ListPage/MovieModal'
  
const GenrePage = ({genre}) => {
    const [movies, setMovies] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const {loading,getGenres} = useGetGenres();
    const navigate = useNavigate();

    // Handle clicking a movie to open modal
    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
    };

    // Handle closing the modal
    const closeModal = () => {
        setSelectedMovie(null);
    };


    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            const m = await getGenres(genre);
            setMovies(m);
        };

        getData();

        const timer = setTimeout(() => {
            setShowLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, [genre]);

    if (showLoading || loading || movies === null) {
        return (
            <div className="bg-[#141414] h-screen w-screen text-white relative flex justify-center items-center">
                <div className='loading loading-spinner size-16'></div>
            </div>
        );
    }
  

    return (
        <div className="relative bg-[#141414] min-h-screen p-8">
          {/* Overlay to add opacity */}
            <div className='relative z-10'>
              <div className='flex mt-8 justify-between items-center'>
                <h1 className="text-4xl text-[#FA6C00] font-semibold ml-20 ">{genre.charAt(0).toUpperCase() + genre.slice(1)}</h1>
                <button
                onClick={()=>{navigate('/')}}
                className="w-8 h-8 text-3xl flex items-center justify-center text-white duration-200 mr-20">
                X
              </button>
              </div>
              <div className="flex flex-wrap justify-center gap-6 overflow-auto mt-20">
              {movies.length === 0 ? (
                  <p className="text-2xl text-gray-100 text-center mt-8 ">No movies</p>
                ) :(
                movies.map((movie) => (
                  <div key={movie.id} className="relative bg-gray-800 rounded-lg shadow-lg w-36 transition-transform duration-300 hover:scale-105">
                    <img
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-full object-cover rounded-md"
                      onClick={() => handleMovieClick(movie)}
                      />
                  
                  </div>
                )))}
              </div>
            </div>

            {selectedMovie && (<MovieModal setSelectedMovie={setSelectedMovie} selectedMovie={selectedMovie}/>)}
          </div>
      )
}

export default GenrePage
