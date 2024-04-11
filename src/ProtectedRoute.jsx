import React, {useContext} from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from './components/context/UserContextProvider'

const ProtectedRoute = ({ children }) => {

  const {user} = useContext(UserContext);
  console.log(user?.userRole)
  if(user?.userRole !== 'ADMIN'){
    return <Navigate to ='/404' />

  }
    
  return children;
}

export default ProtectedRoute