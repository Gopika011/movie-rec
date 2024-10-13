import React, { useEffect, useState } from 'react';
import useGetCheckList from '../../hooks/useGetCheckList';
import useSendAddList from '../../hooks/useSendAddList';

const MovieModal = ({ setSelectedMovie, selectedMovie }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { loading: sendLoading, sendAddList } = useSendAddList();
  const { cloading: checkLoading, getCheckList } = useGetCheckList();
  const [inWatchlist, setInWatchlist] = useState(null);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
        const data = await getCheckList(user.id, selectedMovie.id);
        setInWatchlist(data.exists);
    };

    check();

    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [user.id, selectedMovie.id]);

  console.log(selectedMovie)

  const closeModal = () => {
    console.log("closee")
    setSelectedMovie(null);
  };


  const handleAdd = async () => {
    await sendAddList(user.id, selectedMovie.id);
    setInWatchlist(true); 

  };
  console.log(selectedMovie);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-black text-white rounded-lg  w-full max-w-4xl h-[80vh] overflow-y-auto relative flex-col items-center justify-between ">
        <button
          onClick={closeModal}
          className="absolute z-30 top-4 right-4 text-white text-2xl p-2 rounded-full w-8 h-8 flex items-center justify-center hover:text-gray-400 transition-colors duration-200"
        >
          X
        </button>
        <div className=' h-[80vh] w-full flex'>
          <div className='bg-black w-full flex flex-col p-10 gap-5'>
            <div><h1 className="text-6xl font-bold font-teko">{selectedMovie.title}</h1></div>
            <div><p className="text-gray-500 mt-4 space-y-2">{selectedMovie.tagline}</p></div>
            <div className="text-gray-500 mt-4">
              {selectedMovie.genres.map((genre, index) => (
                <button 
                  key={index} 
                  className="mr-4 mt-2 bg-transparent border border-orange-700 text-white px-4 py-1 rounded-3xl" // Customize button styles
                 >
                   {genre}
                </button> 
               ))}
              </div>

              {showLoading || checkLoading ? (
              <div className=' p-4'>
                <div className='loading loading-spinner bg-slate-50'></div>
              </div>
              ) : (
              <button
                onClick={handleAdd}
                className={`mt-6 bg-orange-500 w-48 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 ${inWatchlist ? 'opacity-50 cursor-not-allowed bg-green-500 hover:bg-green-500' : ''}`}
                disabled={inWatchlist || sendLoading}
              >
                {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
              </button>
              )}
              
          </div>
          <div className='bg-amber-900 w-full overflow-hidden'>
            <img 
            className="rounded-lg object-cover bg-gradient-to-r from-black to-transparent"
            src={`https://image.tmdb.org/t/p/original${selectedMovie.poster_path}`}
            alt="poster"
            />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-r from-black to-transparent"></div>
          </div>
        </div>

        <div className=' h-[80vh] w-full flex-col'>
          <div className='h-3/5 w-full flex p-8'>
              <div className=' w-3/5 text-lg'><p>{selectedMovie.overview}</p></div>
              <div className='w-2/5 flex flex-col gap-5 text-lg pl-10'>
              <div className='flex gap-5'><p className='text-orange-600'>Language:</p><p>{selectedMovie.original_language}</p></div>
              <div className='flex gap-5'><p className='text-orange-600'>Rating:</p><p>{selectedMovie.rating}</p></div>
              <div className='flex gap-5'><p className='text-orange-600'>Release Date:</p><p>{selectedMovie.release_date}</p></div>
              <div className='flex gap-5'><p className='text-orange-600'>Runtime:</p><p>{selectedMovie.runtime} mins</p></div>
              </div>
          </div>
          <div className='h-2/5  w-full p-8 flex flex-col gap-5 text-md'>
            <div className='flex gap-5'><p className='text-orange-600'>Credits:</p> <p>{selectedMovie.credits?selectedMovie.credits.split('-').slice(0,4).join(' - '): 'Not available'}</p></div>
            <div className='flex gap-5'><p className='text-orange-600'>Production:</p><p> {selectedMovie.production_company?selectedMovie.production_company.split('-').slice(0,4).join(' - '): 'Not available'}</p></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;