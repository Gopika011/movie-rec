import React, { useState } from 'react';
import prev from '/prev.png';
import next from '/next.png';
import more from '/more.png';
import { useNavigate } from 'react-router-dom'

const HeroHome = () => {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); 
  

  const slides = [
    {
      title: 'Avengers : Endgame',
      desc: 'With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos’s actions and undo the chaos to the universe, no matter what consequence may be in store',
      url: '/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
    },
    {
      title: 'Transformers: Age of Extinction',
      desc: 'As humanity picks up the pieces following the conclusion of "Transformers: Dark of the Moon" Autobots and Decepticons have all but vanished from the face of the planet. However a group of powerful ingenious businessman and scientists attempt to learn from past Transformer incursions and push the boundaries of technology beyond what they can control - all while an ancient powerful Transformer menace sets Earth in his cross-hairs.',
      url: '/wxr4Z6E83h14CogsZOzDm1vuDX3.jpg',
    },
    {
      title: 'Interstellar',
      desc: `The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.`,
      url: '/xJHokMbljvjADYdit5fK5VQsXEG.jpg',
    },
    {
      title: 'Fantastic Beasts: The Secrets of Dumbledore',
      desc: "Professor Albus Dumbledore knows the powerful dark wizard Gellert Grindelwald is moving to seize control of the wizarding world. Unable to stop him alone he entrusts magizoologist Newt Scamander to lead an intrepid team of wizards and witches. They soon encounter an array of old and new beasts as they clash with Grindelwald's growing legion of followers.",
      url: '/zGLHX92Gk96O1DJvLil7ObJTbaL.jpg',
    },
  ];

  const maxDescLength = slides[2].desc.length;

  const truncateDesc = (desc) => {
    return desc.length > maxDescLength ? desc.slice(0, maxDescLength - 8) + '...' : desc;
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        const isFirst = index === 0;
        const newIndex = isFirst ? slides.length - 1 : index - 1;
        setIndex(newIndex);
        setIsAnimating(false);
      }, 500); 
    }
  };

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        const isLast = index === slides.length - 1;
        const newIndex = isLast ? 0 : index + 1;
        setIndex(newIndex);
        setIsAnimating(false);
      }, 500); 
    }
  };

  return (
    <div className="herohome w-screen flex-grow px-40 flex justify-center relative">

      <div className="component w-full h-full flex justify-center relative">
        <div className="w-full h-full relative pt-[40%] bg-center bg-cover">
          <img
            src={`https://image.tmdb.org/t/p/original${slides[index].url}`}
            className={`absolute top-0 left-0 w-full h-full object-cover rounded-t-xl ease-in-out transition-all duration-500 transform ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
          />
          <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black to-transparent"></div>
        </div>

        <div className={`absolute bottom-[185px] text-center text-white space-y-2 w-2/3 transition-all duration-500 transform ${isAnimating ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100'}`}>
          <h2 className="text-4xl font-semibold">{slides[index].title}</h2>
          <p className="text-lg ">{truncateDesc(slides[index].desc)}</p>
        </div>

        <div className="absolute bottom-[105px] flex gap-10 h-min w-full justify-center items-center pl-20">
          <div className="flex flex-col justify-center items-center cursor-pointer text-white hover:text-gray-400 transition-all duration-300 h-min" onClick={() => { navigate('/list') }}>
            <svg fill="none" viewBox="0 0 24 24" height="1em" width="1em" className="size-6">
              <path
                fill="currentColor"
                d="M12 4a1 1 0 00-1 1v6H5a1 1 0 100 2h6v6a1 1 0 102 0v-6h6a1 1 0 100-2h-6V5a1 1 0 00-1-1z"
              />
            </svg>
            <label className="text-center text-xs">My List</label>
          </div>
          <div className="size-36 h-min cursor-pointer hover:bg-gray-600 rounded transition-all duration-300" onClick={()=>{navigate('/moviepage')}}><img src={more} /></div>
        </div>

        <div className="absolute bottom-10 flex justify-between items-center w-full px-14">
          <button className="size-12" onClick={prevSlide}><img src={prev} /></button>
          <div className="h-min flex">
            {slides.map((slide, slideIndex) => (
              <div key={slideIndex} className={`cursor-pointer ${slideIndex === index ? 'text-[#FA6C00] scale-x-125 px-1' : 'text-[#333333]'} transition-all ease-out duration-400`}>
                <svg fill="none" viewBox="0 0 24 24" height="1.2em" width="1.2em">
                  <path
                    fill="currentColor"
                    d="M5 10 H19 A2 2 0 0 1 21 12 V12 A2 2 0 0 1 19 14 H5 A2 2 0 0 1 3 12 V12 A2 2 0 0 1 5 10 z"
                  />
                </svg>

              </div>
            ))}
          </div>
          <button className="size-12" onClick={nextSlide}><img src={next} /></button>
        </div>

      </div>
    </div>
  );
};

export default HeroHome;
