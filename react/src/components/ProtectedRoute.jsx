import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if(!user) {
        return <Navigate to='/login' />
    }

  // If user is authenticated, render the protected component
  return children
}

export default ProtectedRoute