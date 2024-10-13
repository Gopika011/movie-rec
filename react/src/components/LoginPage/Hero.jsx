import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import Form from './Form';

const Hero = ({scrollfunc}) => {
  const [open,setOpen] = useState(false)
  const navigate = useNavigate();

  const handle =()=>{
    setOpen(!open);
  }
  const handleAdminSignIn = () => {
    console.log('AdminPage component mounted');
    navigate('/adminpage');
  }
  return (
    <div className="hero-container">
      {open && <Form/>}

      <div className="hero-content">
        <div className="text-content">
          <h1 className="title">CornFlicks</h1>
          <p className="subtitle">Personalised Movie Recommendation</p>
        </div>
        <div className="button-group">
          <button className="bttn primary" onClick={handle}>Sign Up</button>
          <button className="bttn secondary" onClick={handle}>Sign In</button>
        </div>
        <div className="admin-signin" onClick={handleAdminSignIn}>Sign In as Admin</div>
        <div className="about" onClick={scrollfunc}>about</div>
      </div>
      <div className="popcorn-image"></div>
    </div>
  );
};

export default Hero;
