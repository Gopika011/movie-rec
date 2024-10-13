import React, { useState } from 'react';
import Header from './Header';  // Adjust the path according to your folder structure

function AddAdmin() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your form submission logic here
  };

  return (
    <div className="ml-60 rounded-xl bg-black text-white">
      <Header />  {/* Add the Header component here */}
      <div className="flex items-center justify-center bg-black p-6 rounded-md shadow-md h-[620px] mt-0">
        <div className="bg-black p-8 rounded-xl shadow-md w-1/3 border border-white h-[520px]">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">Add Admin</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded-md bg-black text-white border border-white focus:ring-2 focus:ring-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded-md bg-black text-white border border-white focus:ring-2 focus:ring-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded-md bg-black text-white border border-white focus:ring-2 focus:ring-white"
                required
              />
            </div>
            <div className="flex justify-center"> 
            <button
              type="submit"
              className="w-1/3 p-2 bg-orange-600 rounded-md text-white font-semibold hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Add
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddAdmin;

