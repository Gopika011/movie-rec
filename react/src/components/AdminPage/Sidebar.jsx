import React, { useState, useEffect } from 'react';
import { FaPlus, FaSignOutAlt } from 'react-icons/fa';
import dashboardIcon from '../../assets/setting 1.png';
import manageIcon from '../../assets/Edit.png';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeButton, setActiveButton] = useState('manage'); // Default to 'manage'

  // Update the active button based on the current URL path
  useEffect(() => {
    if (location.pathname === '/adminpage/add-admin') {
      setActiveButton('addAdmin');
    } else if (location.pathname === '/adminpage/manage') {
      setActiveButton('manage');
    }
  }, [location.pathname]);

  const handleManageClick = () => {
    if (activeButton !== 'manage') {
      setActiveButton('manage');
      navigate('/adminpage/manage'); // Correct path
    }
  };

  const handleAddAdminClick = () => {
    if (activeButton !== 'addAdmin') {
      setActiveButton('addAdmin');
      navigate('/adminpage/add-admin'); // Correct path
    }
  };

  const handleLogoutClick = () => {
    setActiveButton('logout');
    navigate('/login');
    localStorage.removeItem('user');
  };

  const buttonStyle = (buttonName) =>
    activeButton === buttonName ? 'bg-black text-white' : 'bg-orange-600 hover:bg-black text-white';

  return (
    <div className="h-screen w-60 bg-orange-600 text-white fixed">
      <div className="flex flex-col justify-between h-full">
        <div className="px-6 py-6">
          <h2 className="text-2xl font-bold mb-8 flex items-center text-black">
            <img src={dashboardIcon} alt="Dashboard Icon" className="w-6 h-7 mr-1" />
            Dashboard
          </h2>
          <ul className="space-y-4">
            <li className="flex items-center ml-3 cursor-pointer pt-8">
              <button
                className={`${buttonStyle('manage')} px-3 py-2 rounded flex items-center w-full text-left`}
                onClick={handleManageClick}
              >
                <img src={manageIcon} alt="Manage Icon" className="w-5 h-5 mr-2" />
                <span>Manage</span>
              </button>
            </li>

            <li className="flex items-center ml-3 space-x-3 cursor-pointer pt-4">
              <button
                className={`${buttonStyle('addAdmin')} px-3 py-2 rounded flex items-center w-full text-left`}
                onClick={handleAddAdminClick}
              >
                <FaPlus className="mr-2" />
                <span>Add Admin</span>
              </button>
            </li>
          </ul>
        </div>

        <div className="px-6 py-10">
          <button
            className={`${buttonStyle('logout')} flex items-center space-x-3 ml-4 px-3 py-2 rounded w-full`}
            onClick={handleLogoutClick}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
