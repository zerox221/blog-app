import React from 'react'
import { Navigate } from 'react-router-dom'

const UserProtectedRoute = ({user , children}) => {
       console.log("user inside user page protected route ", user);
  if(!user){
    return <Navigate to={'/'} replace/>
  }
  return children
}

export default UserProtectedRoute