import React, { useState } from 'react';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';

const Form = () => {
  const [state, setState] = useState(1);  //1-signin, 0-signup

  return (
    <div className="absolute w-full h-full z-10 flex items-center justify-center backdrop-blur-md bg-white bg-opacity-0 text-white">
      {state==1? (<SigninForm setState={setState}/>):(<SignupForm setState={setState}/>)}
    </div>
  );
};

export default Form;

