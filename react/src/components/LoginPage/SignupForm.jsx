import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupForm = ({setState}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async(event) =>{
    event.preventDefault();
    
    const res = await fetch('http://127.0.0.1:5000/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, email, password, cpassword})
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
    <div className="w-full max-w-md p-8 space-y-8 bg-black bg-opacity-70 shadow-lg rounded-lg">
      <h3>#NAME</h3>
      <h2 className="text-4xl font-bold">Sign Up</h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <input
            id="name"
            type="text"
            placeholder="name"
            value={name}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-transparent"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <input
            id="email"
            type="text"
            placeholder="Email"
            value={email}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-transparent"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-transparent"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <input
            id="cpassword"
            type="password"
            placeholder="Confirm Password"
            value={cpassword}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none bg-transparent"
            onChange={(e) => setCpassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn w-full px-4 py-2 text-white text-xl bg-[#FA6C00] rounded-md hover:bg-[#fa6c00d1] focus:outline-none border-none"
        >
          Sign Up
        </button>
      </form>

      <div className="flex gap-2 text-sm pt-5 justify-center">
        <p className="text-gray-300 ">Already have an account?</p>
        <button onClick={()=>setState(1)} className="text-white font-semibold over:underline hover:underline">Sign In</button>
      </div>
    </div>
  )
}

export default SignupForm