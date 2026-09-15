import CreateBlogForm from '@/components/Blogs/CreateBlogForm'
import React from 'react'

const EditArticlePage = () => {
  return (
    <div className='min-h-screen w-full flex flex-col gap-2  md:gap-8 md:py-10'>
       <div className="md:px-15 px-3 py-4 flex flex-col gap-2">
         <h1 className='text-xl font-bold md:text-2xl'>Edit Article</h1>
        <div className='text-xs md:text-sm text-[#706C63]'>Edit your article here</div>
        </div>
        <CreateBlogForm mode="edit"/>
    </div>
  )
}

export default EditArticlePage