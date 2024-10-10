import React from 'react';
import avengers from '/avengers.jpg';
import Sidebar from './Sidebar';

const HeroHome = () => {
  return (
    <div className=' w-screen flex-grow  px-40 flex justify-center relative'>
      <Sidebar />
      <div className='bg-slate-400 w-full relative pt-[40%] rounded-t-full'> {/* 16:9 Aspect Ratio */}
        <img 
          src={avengers} 
          className='absolute top-0 left-0 w-full h-full object-cover rounded-t-f'
        />
        <div className='absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent'></div>
      </div>

      <div className="absolute bottom-32 text-center text-white space-y-5 w-2/3">
        <h2 className="text-4xl font-semibold">Avengers : Endgame</h2>
        <p className="text-lg ">With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos’s actions and undo the chaos to the universe, no matter what consequence may be in store</p>
      </div>

    </div>
  );
};

export default HeroHome;