import React from 'react'
import { Navigate } from 'react-router-dom'
// import { UserContext } from './components/context/UserContextProvider'

const ProtectedRoute = ({ children }) => {
  const userFromStorage = JSON.parse(localStorage.getItem('user'))
  

  if(userFromStorage?.uid!==process.env.REACT_APP_ADMIN_ID){
    return <Navigate to ='/404' />

  }
    
  return children;
}

export default ProtectedRoute