import React from 'react'
import { useSelector } from 'react-redux'
const Comments = ({comment}) => {
    const {user} = useSelector((state)=>state.user)
    
  return (
    <div className='w-full rounded-md flex  items-center gap-3 flex-wrap bg-[#F6F5F1] p-2'>
        <div className='h-15 shrink-0 w-15 bg-gray-400 rounded-xl overflow-hidden'>
            <img className='h-full shrink-0 w-full object-cover' src={comment?.user?.profile?.url || user?.profile?.url} alt={comment?.user?.name} />
        </div>
        <div className='flex flex-col gap-1'>
            <span className='text-sm font-medium'>{comment?.user?.name || user?.name || "Unknown User"}</span>
            <span className='text-xs text-[#706C63]'>{comment?.text}</span>
        </div>
    </div>
  )
}
export default Comments