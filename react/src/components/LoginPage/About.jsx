import React from 'react';
import './About.css'; 
import movieIcon from '/movie_icon.png';

function About() {
  return (
    <div className="recommendations-container">
      <div className="content">
        <div className="text-section">
          <div className="recommendations-section">
            <h2>Recommendations</h2>
            <p>
              CornFlicks helps you find movies you’ll like. Rate movies to build a custom taste profile, then CornFlicks recommends other movies for you to watch.
            </p>
          </div>
          <div className="rich-data-section">
            <h2>Rich Data</h2>
            <p>
              Learn more about movies with rich data, images, and trailers. Browse movies by community-applied tags, or apply your own tags. Explore the database with expressive search tools.
            </p>
          </div>
       </div>
       {/* Right Image Section */}
       <div className="image-section">
         <img src={movieIcon} alt="Movie Icon" />
       </div>
     </div>
     {/* Information Boxes */}
     <div className="info-box">
       <h4>How does it work?</h4>
       <p>
         CornFlicks Is A Free Web-Based Movie Recommendation Service. Our Algorithm Learns From Viewing Habits And Evolves With Your Tastes,Ensuring That You'll Never Run Out Of Movies To Watch. 
       </p>
     </div>
     <div className="info-box">
       <h4>CineRandom</h4>
       <p>
         If You Can't Find The Movies You Are Looking For By Using Our Customized Filters, Try Our "CineRandom" Feature.
       </p>
     </div>
   </div>
 );
}
export default About;


// import React from 'react';
// import './About.css'; 
// import movieIcon from '/movie_icon.png';

// function About() {
//   return (
//     <div className="w-full h-screen bg-black">
//       <div className='flex h-1/2 bg-yellow-100'>
//         <div className='w-3/5 h-full bg-sky-300 flex-col'>
//           <div >
//             <h4>Recommendations</h4>
//           </div>
//           <div></div>
//         </div>

//         <div className='w-2/5  bg-sky-700'>
// ll
//         </div>
//       </div>


     
//      {/* Information Boxes */}
//      <div className="">
//        <h4>How does it work?</h4>
//         <p>
//           CornFlicks helps you find movies you’ll like. Rate movies to build a custom taste profile, then CornFlicks recommends other movies for you to watch.
//         </p>
//      </div>
//      <div className="">
//        <h4>CineRandom</h4>
//        <p>
//          If You Can't Find The Movies You Are Looking For By Using Our Customized Filters, Try Our "CineRandom" Feature.
//        </p>
//      </div>
//    </div>
//  );
// }
// export default About;