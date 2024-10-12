import React, { useState } from 'react'
import prev from '/prev.png'
import next from '/next.png'

const Slide = () => {
    const slides=[{title:'abc'},{title:'abc'},{title:'abc'},{title:'abc'}]
    const [index, setIndex] = useState(0)

    const prevSlide = () =>{
      setIndex(index-1)
    }

    const nextSlide = () =>{
      setIndex(index+1)
    }
  return (
    <div className="flex items-center w-full p-3 bg-black border border-[#262626] rounded-xl">
        <button className="size-10" onClick={prevSlide}><img src={prev} /></button>
        <div className="h-min flex">
        {slides.map((slide, slideIndex) => (
            <div key={slideIndex} className={`cursor-pointer ${slideIndex === index ? 'text-[#FA6C00] scale-x-125 px-1' : 'text-[#333333]'} transition-all ease-out duration-400`}>
            <svg fill="none" viewBox="0 0 24 24" height="1em" width="1em">
                <path
                fill="currentColor"
                d="M5 10 H19 A2 2 0 0 1 21 12 V12 A2 2 0 0 1 19 14 H5 A2 2 0 0 1 3 12 V12 A2 2 0 0 1 5 10 z"
                />
            </svg>

            </div>
        ))}
        </div>
        <button className="size-10" onClick={nextSlide}><img src={next} /></button>
    </div>
  )
}

export default Slide