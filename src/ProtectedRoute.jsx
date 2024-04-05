import React, {useContext} from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from './components/context/UserContextProvider'

const ProtectedRoute = ({ path, component: Component, role}) => {

  const {user} = useContext(UserContext)
    
  return (
    <div>ProtectedRoute</div>
  )
}

export default ProtectedRoute