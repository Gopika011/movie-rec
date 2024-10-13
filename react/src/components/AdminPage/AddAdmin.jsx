import React, { useState } from 'react';
import Header from './Header';  // Adjust the path according to your folder structure

function AddAdmin() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
    role: 'admin'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      ...(name === 'password' && { cpassword: value }), // Sync cpassword with password
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const role="admin"
    const res = await fetch('http://127.0.0.1:5000/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData)
    })

    const data = await res.json();
    if (data.error) {
      alert(data.error)
    } else {
        alert('Admin added successfully!')
    }

    setFormData({  // Clear the form fields
      name: '',
      email: '',
      password: '',
      cpassword: '',
      role: 'admin'
    });
  };

  return (
    <div className="ml-60 rounded-xl bg-[#141414] text-white">
      <Header />  {/* Add the Header component here */}
      <div className="flex items-start justify-center bg-[#141414] p-6 rounded-xl shadow-md h-[580px] mt-0 pt-10">
        <div className="bg-[#141414] p-8 rounded-xl shadow-md w-1/3 border border-[#8C8787] h-[440px]">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">Add Admin</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="name"
                placeholder='Name'
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded-md bg-black text-white placeholder:text-[#8C8787] border border-[#8C8787] focus:ring-1 focus:ring-white"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder='Email'
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded-md bg-black text-white placeholder:text-[#8C8787] border border-[#8C8787] focus:ring-1 focus:ring-white"
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded-md bg-black text-white border placeholder:text-[#8C8787] border-[#8C8787] focus:ring-1 focus:ring-white"
                required
              />
            </div>
            <div className="flex justify-center"> 
            <button
              type="submit"
              className="w-1/2 p-2 my-8 bg-[#FA6C00] rounded-md text-white font-semibold hover:bg-orange-500 transition-all duration-300 focus:scale-90"
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

