
import React, {  useContext } from 'react';
// import { useNavigate } from 'react-router-dom';

import { UserContext } from './context/UserContextProvider';

 

const Account = () => {

    const { user } = useContext(UserContext);
    // const navigate=useNavigate();
   
    

    // useEffect(()=>{
    //     const userFromStorage = JSON.parse(localStorage.getItem('user'))
   
    //     if(userFromStorage===null) navigate('/signin')


  
    
    //   },[])
  return (
    <div>HI {user.name}</div>
  )
}

export default Account