import React, { useState, useEffect } from 'react';

const EditMovieModal = ({ isOpen, onClose, onUpdateMovie, movie }) => {
    const [title, setTitle] = useState('');
    const [genres, setGenres] = useState('');
    const [releaseDate, setReleaseDate] = useState('');

    useEffect(() => {
        if (movie) {
            setTitle(movie.title);
            setGenres(movie.genres);
            setReleaseDate(movie.release_date);
        }
    }, [movie]);

    const handleUpdate = () => {
        onUpdateMovie({ ...movie, title, genres, release_date: releaseDate });
        onClose(); // Close the modal after update
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-md p-4 w-96">
                <h2 className="text-xl mb-4">Edit Movie</h2>
                <div className="mb-2">
                    <label className="block">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border border-gray-300 rounded w-full p-2"
                    />
                </div>
                <div className="mb-2">
                    <label className="block">Genres</label>
                    <input
                        type="text"
                        value={genres}
                        onChange={(e) => setGenres(e.target.value)}
                        className="border border-gray-300 rounded w-full p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block">Release Date</label>
                    <input
                        type="date"
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                        className="border border-gray-300 rounded w-full p-2"
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        onClick={handleUpdate}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
                    >
                        Update
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditMovieModal;
