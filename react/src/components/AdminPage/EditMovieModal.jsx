import React, { useState, useEffect } from 'react';

const allGenres = [
    'Action',
    'Science Fiction',
    'Horror',
    'Mystery',
    'Thriller',
    'Comedy',
    'Adventure',
    'Drama',
    'Animation',
    'Family',
    'Fantasy',
    'History',
    'War',
    'Crime',
    'Romance',
    'Music',
    'Documentary',
    'TV Movie',
    'Western',
];

const languages = ['English', 'Spanish', 'French', 'German', 'Mandarin', 'Japanese', 'Korean'];

const EditMovieModal = ({ isOpen, onClose, onUpdateMovie, movie }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [title, setTitle] = useState('');
    const [tagline, setTagline] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [releaseDate, setReleaseDate] = useState('');
    const [runtime, setRuntime] = useState('');
    const [language, setLanguage] = useState(languages[0]);
    const [description, setDescription] = useState('');
    const [posterUrl, setPosterUrl] = useState('');
    const [rating, setRating] = useState('');
    const [productionCompany, setProductionCompany] = useState('');
    const [credits, setCredits] = useState('');
    const [backdropPath, setBackdropPath] = useState('');
    const [isGenreDropdownOpen, setGenreDropdownOpen] = useState(false);

    // Set the movie data when the modal opens
    useEffect(() => {
        if (isOpen && movie) {
            setTitle(movie.title);
            setTagline(movie.tagline);
            setSelectedGenres(movie.genres);
            setReleaseDate(movie.release_date);
            setRuntime(movie.runtime);
            setLanguage(movie.original_language);
            setDescription(movie.overview);
            setPosterUrl(movie.poster_path);
            setRating(movie.rating);
            setProductionCompany(movie.production_company);
            setCredits(movie.credits);
            setBackdropPath(movie.backdrop_path);
        }
    }, [isOpen, movie]);

    if (!isOpen) return null;

    // const validateDate = (dateString) => {
    //     const regex = /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/; // Updated regex;;
    //     return regex.test(dateString);
    // };
    
    // const isValidUrl = (url) => {
    //     const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    //     return regex.test(url);
    // };

    const handleSave = () => {
        // Allow partial submissions
        if (currentStep === 2) {
            // For step 2, only validate backdrop path and credits if they are filled
            // if (backdropPath && !isValidUrl(backdropPath)) {
            //     alert("Please enter a valid URL for the backdrop path.");
            //     return;
            // }

            if (credits && !credits.trim()) {
                alert("Credits cannot be empty if provided.");
                return;
            }
        }

        // Create the updated movie object with all fields filled
        const updatedMovie = {
            id: movie.id,
            title: title || undefined, // Allow undefined for empty fields
            tagline: tagline || undefined,
            genres: selectedGenres.length > 0 ? selectedGenres : undefined,
            release_date: releaseDate || undefined,
            runtime: runtime || undefined,
            original_language: language || undefined,
            overview: description || undefined,
            poster_path: posterUrl || undefined,
            rating: rating || undefined,
            prod_company: productionCompany || undefined,
            credits: credits || undefined,
            backdrop_path: backdropPath || undefined,
        };
        

        onUpdateMovie(updatedMovie);
        onClose();
        setCurrentStep(1);
    };

    const handleNext = () => {
        // Remove validation for empty fields
        setCurrentStep(2);
    };

    const handleBack = () => {
        setCurrentStep(1);
    };

    const handleGenreChange = (genre) => {
        setSelectedGenres((prev) =>
            prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
        );
    };

    const toggleGenreDropdown = () => {
        setGenreDropdownOpen(prev => !prev);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-gray-900  p-6 rounded-lg shadow-lg w-[500px] max-w-full h-auto overflow-y-auto">
                <h2 className="text-[#FA6C00] mb-4 text-lg text-center font-semibold">
                    Edit Movie
                </h2>

                {currentStep === 1 && (
                    <>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Movie Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-2 bg-black border border-gray-600 rounded text-white"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Tagline"
                                value={tagline}
                                onChange={(e) => setTagline(e.target.value)}
                                className="w-full p-2 bg-black border border-gray-600 rounded text-white"
                            />
                        </div>
                        <div className="mb-4">
                            <div className="relative">
                                <button
                                    onClick={toggleGenreDropdown}
                                    className="w-full p-2 bg-black border border-gray-600 rounded text-white flex justify-between items-center"
                                >
                                    {selectedGenres.length > 0 ? selectedGenres.join(', ') : 'Select Genres'}
                                    <span className="ml-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </button>
                                {isGenreDropdownOpen && (
                                    <div className="absolute z-10 w-full bg-black border border-gray-600 rounded mt-1 max-h-48 overflow-y-auto">
                                        {allGenres.map((genre) => (
                                            <label key={genre} className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedGenres.includes(genre)}
                                                    onChange={() => handleGenreChange(genre)}
                                                    className="mr-2"
                                                />
                                                {genre}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Release Date (yyyy/mm/dd)"
                                value={releaseDate}
                                onChange={(e) => setReleaseDate(e.target.value)}
                                className="w-full p-2 bg-black border border-gray-600 rounded text-white"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Runtime (in minutes)"
                                value={runtime}
                                onChange={(e) => setRuntime(e.target.value)}
                                className="w-full p-2 bg-black border border-gray-600 rounded text-white"
                            />
                        </div>
                        <div className="mb-4">
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="w-full p-2 bg-black border border-gray-600 rounded text-white"
                            >
                                {languages.map((lang) => (
                                    <option key={lang} value={lang}>{lang}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={handleNext}
                                className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-orange-500 hover:text-white transition duration-200"
                            >
                                Next
                            </button>
                            <button
                                onClick={onClose}
                                className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-orange-500 hover:text-white transition duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                )}

                {currentStep === 2 && (
                    <>
                        <div className="mb-4">
                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-2 bg-black border border-gray-600 rounded text-white"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Poster URL"
                                value={posterUrl}
                                onChange={(e) => setPosterUrl(e.target.value)}
                                className="w-full p-2 bg-black border border-gray-600 rounded text-white"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Rating (0-10)"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                className="w-full p-2 bg-black border border-gray-600 rounded text-white"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Production Company"
                                value={productionCompany}
                                onChange={(e) => setProductionCompany(e.target.value)}
                                className="w-full p-2 bg-black border border-gray-600 rounded text-white"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Credits"
                                value={credits}
                                onChange={(e) => setCredits(e.target.value)}
                                className="w-full p-2 bg-black border border-gray-600 rounded text-white"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Backdrop Path URL"
                                value={backdropPath}
                                onChange={(e) => setBackdropPath(e.target.value)}
                                className="w-full p-2 bg-black border border-gray-600 rounded text-white"
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={handleBack}
                                className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-orange-500 hover:text-white transition duration-200"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-orange-500 hover:text-white transition duration-200"
                            >
                                Save
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default EditMovieModal;
