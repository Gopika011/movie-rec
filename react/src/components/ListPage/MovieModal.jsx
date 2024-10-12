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


  const closeModal = () => {
    setSelectedMovie(null);
  };


  const handleAdd = async () => {
    await sendAddList(user.id, selectedMovie.id);
    setInWatchlist(true); 

  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white rounded-lg p-8 relative w-full max-w-4xl">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 bg-red-600 p-2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 transition-colors duration-200"
        >
          X
        </button>
        <div className="flex flex-col md:flex-row">
          <img
            className="md:w-1/2 w-full rounded-lg object-cover"
            src={`https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`}
            alt="poster"
          />
          {/* Movie Details */}
          <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
            <h1 className="text-4xl font-bold">{selectedMovie.title}</h1>
            <p className="text-gray-500 mt-4">{selectedMovie.overview}</p>

            {/* Additional Information */}
            <div className="mt-6 space-y-2">
              <p><strong>Rating:</strong> {selectedMovie.rating}</p>
              <p><strong>Release Date:</strong> {selectedMovie.release_date}</p>
              <p><strong>Runtime:</strong> {selectedMovie.runtime} mins</p>
            </div>

            {/* Add to Watchlist Button */}
            {showLoading || checkLoading ? (
              <div className=' p-4'>
                <div className='loading loading-spinner bg-slate-50'></div>
              </div>
            ) : (
              <button
                onClick={handleAdd}
                className={`mt-6 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 ${inWatchlist ? 'opacity-50 cursor-not-allowed bg-green-500 hover:bg-green-500' : ''}`}
                disabled={inWatchlist || sendLoading}
              >
                {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;