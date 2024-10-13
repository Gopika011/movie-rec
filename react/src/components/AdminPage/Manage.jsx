import React, { useEffect, useState } from "react";
import Header from "./Header";
import editIcon from '../../assets/Edit.png';
import removeIcon from '../../assets/Trash 2.png';
import AddMovieModal from "./AddMovieModal";
import CustomDialog from "./CustomDialog";
import EditMovieModal from "./EditMovieModal";
import useGetMovies from "../../hooks/useGetMovies";
import useEditMovies from "../../hooks/useEditMovies";
import useAddMovies from "../../hooks/useAddMovies";
import useRemoveMovies from "../../hooks/useRemoveMovies";

const initialMovies = [
    {title: "", release_date: "" },
];

const Manage = () => {
    const [movies, setMovies] = useState(initialMovies);
    const [searchQuery, setSearchQuery] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [movieToDelete, setMovieToDelete] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [movieToEdit, setMovieToEdit] = useState(null);

    const getMovies = useGetMovies();
    const {editMovies} = useEditMovies();
    const {addMovies} = useAddMovies();
    const {removeMovies} = useRemoveMovies();


    const fetchMovies = async()=>{
        const gotmovies = await getMovies();
        setMovies(gotmovies)
        console.log(gotmovies)
    }

    useEffect(()=>{
        fetchMovies();
    },[])
    

    const handleAddMovie = async(newMovie) => {
        console.log(newMovie)
        await addMovies(newMovie)
        fetchMovies();
    };

    const handleUpdateMovie = async(updatedMovie) => {
        
        console.log(updatedMovie)
        await editMovies(updatedMovie.id, updatedMovie)
        fetchMovies();
    };

    const handleDeleteMovie = async() => {
        // setMovies(movies.filter((movie) => movie.id !== movieToDelete.id));
        setIsDeleteDialogOpen(false);
        
        await removeMovies(movieToDelete.id)
        fetchMovies();
    };


    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openDeleteDialog = (movie) => {
        setMovieToDelete(movie);
        setIsDeleteDialogOpen(true);
    };

    const openEditModal = (movie) => {
        setMovieToEdit(movie);
        setIsEditModalOpen(true);
    };

    return (
        <div className="ml-60 rounded-xl bg-[#141414] text-white">
            <Header />
            <div className="bg-[#141414] p-6 rounded-xl shadow-md h-[580px] mt-0">
                <div className="flex justify-between mb-4 items-center">
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-[#FA6C00] px-4 py-2 rounded hover:bg-orange-600 transition duration-200"
                    >
                        Add Movie
                    </button>

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Movies"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-2 py-1 w-full max-w-xs bg-white border border-gray-600 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                </div>

                {movies[0].id && (
             <div className="overflow-auto max-h-[70vh] ">
             <table className="w-full text-left table-auto border-collapse">
                 <thead className="sticky top-0">
                     <tr className="bg-gray-900 text-[#FA6C00]">
                         <th className="px-4 py-2">ID</th>
                         <th className="px-4 py-2">Title</th>
                         <th className="px-4 py-2">Genres</th>
                         <th className="px-4 py-2">Release Date</th>
                         <th className="px-4 py-2">Edit</th>
                         <th className="px-4 py-2">Remove</th>
                     </tr>
                 </thead>
                 <tbody>
                     {filteredMovies.length > 0 ? (
                         filteredMovies.map((movie) => (
                             <tr key={movie.id} className="border-t border-gray-700" style={{ height: '50px' }}>
                                 <td className="px-4 py-2">{String(movie.id).padStart(4, '0')}</td>
                                 <td className="px-4 py-2">{movie.title}</td>
                                 <td className="px-4 py-2">{movie.genres? movie.genres.join(', '): ''}</td>
                                 <td className="px-4 py-2">{movie.release_date}</td>
                                 <td className="px-4 py-2">
                                     <button
                                         className="text-white"
                                         onClick={() => openEditModal(movie)}
                                     >
                                         <img src={editIcon} alt="Edit" className="w-5 h-5" />
                                     </button>
                                 </td>
                                 <td className="px-4 py-2">
                                     <button
                                         className="text-orange-500"
                                         onClick={() => openDeleteDialog(movie)}
                                     >
                                         <img src={removeIcon} alt="Remove" className="w-5 h-5" />
                                     </button>
                                 </td>
                             </tr>
                         ))
                     ) : (
                         <tr className="border-t border-gray-700" style={{ height: '50px' }}>
                             <td colSpan="6" className="text-center text-gray-500">No movies found</td>
                         </tr>
                     )}
                 </tbody>
             </table>
         </div>
                )}
   
            </div>

            {/* Add Movie Modal */}
            <AddMovieModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleAddMovie}
            />

            {/* Edit Movie Modal */}
            {movieToEdit && (
                <EditMovieModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdateMovie={handleUpdateMovie}
                    movie={movieToEdit}
                />
            )}

            {/* Custom Dialog for Delete Confirmation */}
            {movieToDelete && (
                <CustomDialog
                    isOpen={isDeleteDialogOpen}
                    onClose={() => setIsDeleteDialogOpen(false)}
                    onConfirm={handleDeleteMovie}
                    message={`Are you sure you want to delete the movie "${movieToDelete.title}"?`}
                />
            )}
        </div>
    );
};

export default Manage;
