import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieModal from './MovieModal';
import useGetWatchlist from '../../hooks/useGetWatchlist';
import useSendRemoveList from '../../hooks/useSendRemoveList';
import Sidebar from '../HomePage/Sidebar';

const ListPage = () => {
  const [list, setList] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showLoading, setShowLoading] = useState(true);
  const { loading, getWatchlist } = useGetWatchlist();
  const { sendRemoveList } = useSendRemoveList();

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleRemove = async (movieId) => {
    await sendRemoveList(user.id, movieId);
    const newList = await getWatchlist(user.id);
    if (Array.isArray(newList)) {
      setList(newList);
    } else {
      setList([]);
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  useEffect(() => {
    const getList = async () => {
      const m = await getWatchlist(user.id);
      setList(m);
    };
    getList();

    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (showLoading || loading === null) {
    return (
      <div className="bg-[url('/peakpx2.png')] bg-cover bg-center bg-no-repeat h-screen w-screen text-white relative flex justify-center items-center">
        <div className="absolute inset-0 bg-black opacity-85 z-0"></div>
        <div className="loading loading-spinner size-16"></div>
      </div>
    );
  }

  return (
    <div className="relative bg-[url('/peakpx2.png')] bg-cover bg-center bg-no-repeat min-h-screen p-8" style={{ paddingLeft: '10rem' }}>
      <div className="fixed top-24 left-0 z-10">
        <Sidebar />
      </div>
      {/* Overlay to add opacity */}
      <div className="absolute inset-0 bg-black opacity-85 z-0"></div>
      <div className="relative z-10">
        <div className="flex mt-8 justify-between items-center overflow-auto">
          <h1 className="text-4xl text-[#FA6C00] font-semibold ml-20">WatchList</h1>
          <button
            onClick={() => {
              navigate('/');
            }}
            className="w-8 h-8 text-3xl flex items-center justify-center text-white duration-200 mr-20"
          >
            X
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-6  mt-20 mx-5">
          {list.message ? (
            <p className="text-2xl text-gray-100 text-center mt-8">{list.message}</p>
          ) : (
            list.map((movie) => (
              <div key={movie.id} className="relative bg-gray-800 rounded-lg shadow-lg w-36 transition-transform duration-300 hover:scale-105">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover rounded-md"
                  onClick={() => handleMovieClick(movie)}
                />
                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(movie.id)}
                  className="absolute bottom-2 right-2 bg-none text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 transition-colors duration-200 border-2 border-white"
                >
                  X
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedMovie && <MovieModal setSelectedMovie={setSelectedMovie} selectedMovie={selectedMovie} />}
    </div>
  );
};

export default ListPage;
