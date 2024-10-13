import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
    const [showUserInfo, setShowUserInfo] = useState(false); // State to control visibility
    const user = JSON.parse(localStorage.getItem('user'))

    // Toggle the visibility of the user info box
    const toggleUserInfo = () => {
        setShowUserInfo((prev) => !prev);
    };

    return (
        <div className="bg-[#141414]rounded-xl text-[#FA6C00] flex justify-between items-center px-6 py-4">
            {/* CornFlicks logo */}
            <h1 className="text-3xl font-bold font-teko">POP FLICKS</h1>

            {/* Admin profile */}
            <div className="relative">
                <div className="text-white flex items-center space-x-2 cursor-pointer" onClick={toggleUserInfo}>
                    <FaUserCircle />
                    <span>Admin</span>
                </div>

                {/* User info box */}
                {showUserInfo && (
                <div className='bg-[#1F1F1F] z-40 text-white border-2 border-[#262626]  absolute right-0 mt-2 w-56 rounded-lg shadow-lg transition-all duration-300 overflow-hidden'>
                    <div className='h-12 flex justify-center items-center border-b-[2px] border-[#262626]  px-4 text-lg font-medium'>
                        Name : {user.name}
                    </div>
                </div>
                )}
            </div>
        </div>
    );
};

export default Header;



