// import React from 'react';
// import './About.css'; 
// import movieIcon from '/movie_icon.png';

// function About() {
//   return (
//     <div className="recommendations-container">
//       <div className="content">
//         <div className="text-section">
//           <div className="recommendations-section">
//             <h2>Recommendations</h2>
//             <p>
//               CornFlicks helps you find movies you’ll like. Rate movies to build a custom taste profile, then CornFlicks recommends other movies for you to watch.
//             </p>
//           </div>
//           <div className="rich-data-section">
//             <h2>Rich Data</h2>
//             <p>
//               Learn more about movies with rich data, images, and trailers. Browse movies by community-applied tags, or apply your own tags. Explore the database with expressive search tools.
//             </p>
//           </div>
//        </div>
//        {/* Right Image Section */}
//        <div className="image-section">
//          <img src={movieIcon} alt="Movie Icon" />
//        </div>
//      </div>
//      {/* Information Boxes */}
//      <div className="info-box">
//        <h4>How does it work?</h4>
//        <p>
//          CornFlicks Is A Free Web-Based Movie Recommendation Service. Our Algorithm Learns From Viewing Habits And Evolves With Your Tastes,Ensuring That You'll Never Run Out Of Movies To Watch. 
//        </p>
//      </div>
//      <div className="info-box">
//        <h4>CineRandom</h4>
//        <p>
//          If You Can't Find The Movies You Are Looking For By Using Our Customized Filters, Try Our "CineRandom" Feature.
//        </p>
//      </div>
//    </div>
//  );
// }
// export default About;


import React, { useState } from 'react';
import './About.css'; 
import movieIcon from '/movie_icon.png';

function About() {
  const [isOpenHowItWorks, setIsOpenHowItWorks] = useState(false);
  const [isOpenCineRandom, setIsOpenCineRandom] = useState(false);

  const toggleHowItWorks = () => {
    setIsOpenHowItWorks(!isOpenHowItWorks);
  };

  const toggleCineRandom = () => {
    setIsOpenCineRandom(!isOpenCineRandom);
  };

  return (
    <div className="w-full  bg-[#141414] py-14 px-32 text-white">
      <div className='flex '>
        <div className='w-3/5 h-full flex flex-col pl-10 pr-32 gap-20'>
          <div className='h-1/2 '>
            <h4 className='text-3xl text-[#E86502] pb-5 font-semibold'>Recommendations</h4>
            <p className='text-lg'>
            POP FLICKS helps you find movies you will like. 
            Rate movies to build a custom taste profile, then
            POPFLICKS recommends other movies for you to watch.
            </p>
          </div>

          <div className='h-1/2 gap-5'>
            <h4 className='text-3xl text-[#E86502] pb-5 font-semibold'>Rich Data</h4>
            <p className='text-lg'>
            Learn more about movies with rich data, images, and
            trailers.Browse movies by community-applied tags, or 
            apply your own tags. Explore the database 
            with expressive search tools.
            </p>
          </div>
        </div>

        <div className='w-2/5 '>
          <img src={movieIcon} className='object-contain w-[350px]'/>
        </div>
      </div>

      <div className='mt-20 px-10 flex flex-col gap-4 text-2xl font-medium'>
  {/* How does it work? Section */}
  <div className='bg-[#2d2d2d] rounded-md'>
    <button
      className='w-full text-left flex justify-between items-center hover:bg-[#414141] py-4'
      onClick={toggleHowItWorks}
    >
      <h4 className='px-6 '>How does it work?</h4>
      <span className='pr-5 text-4xl'>{isOpenHowItWorks ? '-' : '+'}</span>
    </button>
    {isOpenHowItWorks && (
      <p className='py-4 text-white border-[#262626] border-t-2 px-6 text-xl'>
        POP FLICKS helps you find movies you’ll like. Rate movies to build a custom taste profile, then recommends other movies for you to watch.
      </p>
    )}
  </div>

  {/* CineRandom Section */}
  <div className='bg-[#2d2d2d]   rounded-md'>
    <button
      className='w-full text-left flex justify-between items-center hover:bg-[#414141] py-4'
      onClick={toggleCineRandom}
    >
      <h4 className='px-6'>What can I find?</h4>
      <span className='pr-5 text-4xl'>{isOpenCineRandom ? '-' : '+'}</span>
    </button>
    {isOpenCineRandom && (
      <p className=' py-4 text-white  border-[#262626] border-t-2 px-6 text-xl'>
        POP FLICKS has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more.
      </p>
    )}
  </div>
</div>


   </div>
 );
}
export default About;