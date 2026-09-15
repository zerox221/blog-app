import React from 'react'

const PopularBlog = () => {
  return (
    <div className='w-full min-h-15 flex flex-col  py2'>
        <div className='flex gap-1 md:text-sm text-xs text-[#706C63]'>
            <span>React</span>
            <span>420 likes</span>
        </div>
        <div>
            <h1 className='text-sm md:text-2xl font-medium'>Advance utilit functions</h1>
        </div>
    </div>
  )
}

export default PopularBlog