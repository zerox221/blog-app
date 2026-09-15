import CreateBlogForm from '@/components/Blogs/CreateBlogForm'
import React from 'react'

const CreateArticle = () => {
  return (
    <div className='min-h-screen w-full'>
        <CreateBlogForm mode="create"/>
    </div>
  )
}

export default CreateArticle