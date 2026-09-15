import React, { useState } from 'react'
import { data } from 'react-router-dom'

const ProfileFilter = ({setFilter , filter}) => {
    const filters = ["All","Public","Private"]
   
  return (
    <div className='flex gap-4 w-full cursor-pointer overflow-x-scroll bar'>
        {
            filters.map((data,idx)=>{
                return <span key={idx}
                onClick={()=> setFilter(data)}
                 className={` ${filter===data ?" bg-black text-white" : "bg-gray-100"} transition-all text-xs md:text-sm rounded-xl md:rounded-md px-3 py-1 md:py-2 md:px-4`}>{data}</span>
            })
        }
    </div>
  )
}
export default ProfileFilter