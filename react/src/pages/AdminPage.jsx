// src/pages/AdminPage.jsx
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'; 
import Sidebar from '../components/AdminPage/Sidebar';
import AddAdmin from '../components/AdminPage/AddAdmin';
import Manage from '../components/AdminPage/Manage';

const AdminPage = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow overflow-y-auto bg-[#FA6C00] p-6 rounded-md shadow-lg">
        <Routes>
          <Route path="/" element={<Navigate to="manage" />} /> 
          <Route path="add-admin" element={<AddAdmin />} /> 
          <Route path="manage" element={<Manage />} /> 
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;
