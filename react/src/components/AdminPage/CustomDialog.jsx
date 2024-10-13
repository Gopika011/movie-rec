import React from 'react';

const CustomDialog = ({ isOpen, onClose, onConfirm, movieTitle }) => {
    if (!isOpen) return null; // Don't render if the dialog isn't open

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
                <h2 className="text-orange-600 mb-4 text-2xl text-center font-bold">
                    Confirm Deletion
                </h2>
                <p className="text-orange-500 text-center mb-4 font-medium">
                    Are you sure you want to permanently delete the movie <span className="font-bold">{movieTitle}</span>?
                </p>
                <p className="text-gray-400 text-center mb-6">
                    This action cannot be undone.
                </p>
                <div className="flex justify-center gap-5">
                    <button
                        onClick={onConfirm}
                        className="bg-white text-black px-4 py-2 rounded mr-2 hover:bg-orange-500 transition duration-200"
                    >
                        Yes, Delete
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-white text-black px-4 py-2 rounded hover:bg-orange-500 transition duration-200"
                    >
                        No, Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomDialog;
