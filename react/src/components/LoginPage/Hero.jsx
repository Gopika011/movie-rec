import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import Form from './Form';

const Hero = ({scrollfunc}) => {
  const [open,setOpen] = useState(false)
  const [state, setState] = useState();

  const handleSignup =()=>{
    setOpen(!open);
    setState(0)
  }

  const handleSignin =()=>{
    setOpen(!open);
    setState(1)
  }
  return (
    <div className="hero-container">
      {open && <Form state={state} setState={setState}/>}

      <div className="hero-content">
        <div className="text-content">
          <h1 className="title">CornFlicks</h1>
          <p className="subtitle">Personalised Movie Recommendation</p>
        </div>
        <div className="button-group">
          <button className="bttn primary" onClick={handleSignup}>Sign Up</button>
          <button className="bttn secondary" onClick={handleSignin}>Sign In</button>
        </div>
        <div className="admin-signin" onClick={handleAdminSignIn}>Sign In as Admin</div>
        <div className="about" onClick={scrollfunc}>about</div>
      </div>
      <div className="popcorn-image"></div>
    </div>
  );
};

export default Hero;
