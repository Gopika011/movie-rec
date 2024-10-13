import React, { useState } from 'react';

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

const AddMovieModal = ({ isOpen, onClose, onSave }) => {
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
    const [errorMessage, setErrorMessage] = useState('');

    if (!isOpen) return null;

    const validateDate = (dateString) => {
        const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        return regex.test(dateString);
    };

    const isValidUrl = (url) => {
        const regex = /^(ftp|http|https):\/\/[^ "]+$/;
        return regex.test(url);
    };

    const handleSave = () => {
        if (currentStep === 2 && (!backdropPath || !credits)) {
            alert("Please fill in all fields in the second step.");
            return;
        }

        if (!title || !tagline || !releaseDate || !runtime || !language) {
            alert("Please fill in all fields in the first step.");
            return;
        }

        if (!validateDate(releaseDate)) {
            alert("Please enter a valid date in the format dd/mm/yyyy");
            return;
        }

        if (!isValidUrl(backdropPath)) {
            alert("Please enter a valid URL for the backdrop path.");
            return;
        }

        const newMovie = {
            title,
            tagline,
            genres: selectedGenres,
            release_date: releaseDate,
            runtime,
            language,
            description,
            poster: posterUrl,
            rating,
            production_company: productionCompany,
            credits,
            backdrop_path: backdropPath,
        };

        onSave(newMovie);
        onClose();
    };

    const handleNext = () => {
        if (!title || !tagline || !releaseDate || !runtime || !language) {
            alert("Please fill in all fields in the first step.");
            return;
        }
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
        <div className="fixed inset-0 bg-orange-500 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 bg-opacity-70 p-6 rounded-lg shadow-lg w-[700px] max-w-full h-auto overflow-y-auto">
                <h2 className="text-orange-500 mb-4 text-lg text-center font-semibold">
                    {currentStep === 1 ? 'Add Movie' : 'Add Movie'}
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
                                placeholder="Release Date (dd/mm/yyyy)"
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
                                className="bg-white text-black px-4 py-2 rounded hover:bg-orange-500 hover:text-white transition duration-200"
                            >
                                Next
                            </button>
                            <button
                                onClick={onClose}
                                className="bg-white text-black px-4 py-2 rounded hover:bg-orange-500 hover:text-white transition duration-200"
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
                                className="w-full bg-black border border-gray-600 rounded text-white"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Rating (e.g. 8.5)"
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
                            <textarea
                                placeholder="Credits (e.g. Director, Actors)"
                                value={credits}
                                onChange={(e) => setCredits(e.target.value)}
                                className="w-full p-2 bg-black border border-gray-600 rounded text-white"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Backdrop Path (URL)"
                                value={backdropPath}
                                onChange={(e) => setBackdropPath(e.target.value)}
                                className="w-full p-2 bg-black border border-gray-600 rounded text-white"
                            />
                            {backdropPath && !isValidUrl(backdropPath) && (
                                <div className="text-red-500 text-sm mt-1">Please enter a valid URL for the backdrop path.</div>
                            )}
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={handleBack}
                                className="bg-white text-black px-4 py-2 rounded hover:bg-orange-500 hover:text-white transition duration-200"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-white text-black px-4 py-2 rounded hover:bg-orange-500 hover:text-white transition duration-200"
                            >
                                Save
                            </button>
                            <button
                                onClick={onClose}
                                className="bg-white text-black px-4 py-2 rounded hover:bg-orange-500 hover:text-white transition duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AddMovieModal;
