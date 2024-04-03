import React from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from './config/UserContextProvider'

const ProtectedRoute = ({ path, component: Component, role}) => {
    
  return (
    <div>ProtectedRoute</div>
  )
}

export default ProtectedRoute