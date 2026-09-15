import React from 'react'
import { Navigate } from 'react-router-dom'

const LandindProtectedRoute = ({user,children}) => {
    console.log("user inside landing page protected route ", user);
  if(user){
     return <Navigate to='/dashboard' replace />
  }
  return children
}

export default LandindProtectedRoute