import Navbar from '@/components/CommonComponent/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const DasboardLayout = () => {
  return (
    <div className='min-h-screen w-full flex flex-col'>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default DasboardLayout