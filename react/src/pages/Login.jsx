import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async(event) =>{
    event.preventDefault();
    
    const res = await fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password})
    })

    const data = await res.json();
    
    if (data.error) {
      alert(data.error)
    } else {
      console.log(data);
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/');
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login to Your Account</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none"
          >
            Login
          </button>
        </form>

        {/* <div className="flex justify-between text-sm">
          <a href="#" className="text-indigo-500 hover:underline">Forgot password?</a>
          <a href="/signup" className="text-indigo-500 hover:underline">Create an account</a>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
