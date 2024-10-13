import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
    const [showUserInfo, setShowUserInfo] = useState(false); // State to control visibility

    // Toggle the visibility of the user info box
    const toggleUserInfo = () => {
        setShowUserInfo((prev) => !prev);
    };

    return (
        <div className="bg-black rounded-xl text-orange-500 flex justify-between items-center px-6 py-4">
            {/* CornFlicks logo */}
            <h1 className="text-3xl font-bold">CornFlicks</h1>

            {/* Admin profile */}
            <div className="relative">
                <div className="text-white flex items-center space-x-2 cursor-pointer" onClick={toggleUserInfo}>
                    <FaUserCircle />
                    <span>Admin</span>
                </div>

                {/* User info box */}
                {showUserInfo && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white border border-gray-600 rounded shadow-lg p-2">
                        <p className="text-center">Username: Admin</p> {/* Replace with actual username if needed */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
