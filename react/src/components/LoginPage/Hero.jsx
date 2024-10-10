import React, { useState } from 'react';
import './styles.css';
import Form from './Form';

const Hero = ({scrollfunc}) => {
  const [open,setOpen] = useState(false)

  const handle =()=>{
    setOpen(!open);
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
        <div className="about" onClick={scrollfunc}>about</div>
      </div>
      <div className="popcorn-image"></div>
    </div>
  );
};

export default Hero;
