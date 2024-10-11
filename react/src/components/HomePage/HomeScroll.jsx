import React from 'react'
import action from '/Action.png'
import adventure from '/Adventure.png'
import comedy from '/Comedy.png'
import drama from '/Drama.png'
import horror from '/Horror.png'
import Slide from './Slide'

const HomeScroll = () => {
  return (
    <div className='flex flex-col py-20 mx-24 px-24 text-white border rounded-lg border-[#262626]  gap-20'>
      <div className=' w-full space-y-6'>
      <div className='flex justify-between items-center '>
          <h2 className='text-4xl font-bold'>Our Genres</h2>
          <div><Slide/></div>
        </div>
        <div className='flex gap-8 py-5 '>
          <div className=' w-1/5'><img src={action} className='object-cover w-full h-full'/></div>
          <div className='w-1/5'><img src={adventure} className='object-cover w-full h-full'/></div>
          <div className='w-1/5'><img src={comedy} className='object-cover w-full h-full'/></div>
          <div className='w-1/5'><img src={drama} className='object-cover w-full h-full'/></div>
          <div className='w-1/5'><img src={horror} className='object-cover w-full h-full'/></div>
        </div>
      </div>

      <div className=' w-full space-y-6'>
        <div className='flex justify-between items-center '>
          <h2 className='text-4xl font-bold'>Recommendations</h2>
          <div><Slide/></div>
        </div>
        <div className='flex gap-8 py-5 '>
          <div className=' w-1/5 bg-[#1a1a1a] h-[320px] rounded-lg border border-[#262626]'>hello</div>
          <div className=' w-1/5 bg-[#1a1a1a] h-[320px] rounded-lg border border-[#262626]'>hello</div>
          <div className=' w-1/5 bg-[#1a1a1a] h-[320px] rounded-lg border border-[#262626]'>hello</div>
          <div className=' w-1/5 bg-[#1a1a1a] h-[320px] rounded-lg border border-[#262626]'>hello</div>
          <div className=' w-1/5 bg-[#1a1a1a] h-[320px] rounded-lg border border-[#262626]'>hello</div>
        </div>
      </div>

      <div className=' w-full space-y-6'>
        <div className='flex justify-between items-center '>
          <h2 className='text-4xl font-bold'>Must-watch Movies</h2>
          <div><Slide/></div>
        </div>
        <div className='flex gap-8 py-5 '>
          <div className=' w-1/5 bg-[#1a1a1a] h-[320px] rounded-lg border border-[#262626]'>hello</div>
          <div className=' w-1/5 bg-[#1a1a1a] h-[320px] rounded-lg border border-[#262626]'>hello</div>
          <div className=' w-1/5 bg-[#1a1a1a] h-[320px] rounded-lg border border-[#262626]'>hello</div>
          <div className=' w-1/5 bg-[#1a1a1a] h-[320px] rounded-lg border border-[#262626]'>hello</div>
          <div className=' w-1/5 bg-[#1a1a1a] h-[320px] rounded-lg border border-[#262626]'>hello</div>
        </div>
      </div>


      <div className=' w-full space-y-6'>
        <div className='flex justify-between items-center '>
          <h2 className='text-4xl font-bold'>New Releases</h2>
          <div><Slide/></div>
        </div>
        <div className='flex gap-8 py-5 '>
          <div className=' w-1/5 bg-[#1a1a1a] h-[320px] rounded-lg border border-[#262626]'>hello</div>
          <div className=' w-1/5 bg-[#1a1a1a] h-[320px] rounded-lg border border-[#262626]'>hello</div>
          <div className=' w-1/5 bg-[#1a1a1a] h-[320px] rounded-lg border border-[#262626]'>hello</div>
          <div className=' w-1/5 bg-[#1a1a1a] h-[320px] rounded-lg border border-[#262626]'>hello</div>
          <div className=' w-1/5 bg-[#1a1a1a] h-[320px] rounded-lg border border-[#262626]'>hello</div>
        </div>
      </div>

      <div className=' w-full space-y-6'>
        <div className='flex justify-between items-center '>
          <h2 className='text-4xl font-bold'>Feel Good Movies</h2>
          <div><Slide/></div>
        </div>
        <div className='flex gap-8 py-5 '>
          <div className=' w-1/5 bg-[#1a1a1a] h-[320px] rounded-lg border border-[#262626]'>hello</div>
          <div className=' w-1/5 bg-[#1a1a1a] h-[320px] rounded-lg border border-[#262626]'>hello</div>
          <div className=' w-1/5 bg-[#1a1a1a] h-[320px] rounded-lg border border-[#262626]'>hello</div>
          <div className=' w-1/5 bg-[#1a1a1a] h-[320px] rounded-lg border border-[#262626]'>hello</div>
          <div className=' w-1/5 bg-[#1a1a1a] h-[320px] rounded-lg border border-[#262626]'>hello</div>
        </div>
      </div>

      <div className=' w-full space-y-6'>
        <div className='flex justify-between items-center '>
          <h2 className='text-4xl font-bold'>Action Movies</h2>
          <div><Slide/></div>
        </div>
        <div className='flex gap-8 py-5 '>
          <div className=' w-1/5 bg-[#1a1a1a] h-[320px] rounded-lg border border-[#262626]'>hello</div>
          <div className=' w-1/5 bg-[#1a1a1a] h-[320px] rounded-lg border border-[#262626]'>hello</div>
          <div className=' w-1/5 bg-[#1a1a1a] h-[320px] rounded-lg border border-[#262626]'>hello</div>
          <div className=' w-1/5 bg-[#1a1a1a] h-[320px] rounded-lg border border-[#262626]'>hello</div>
          <div className=' w-1/5 bg-[#1a1a1a] h-[320px] rounded-lg border border-[#262626]'>hello</div>
        </div>
      </div>
    </div>
  )
}

export default HomeScroll