
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';

 

const Account = () => {

    const { user } = useContext(UserContext);
    const navigate=useNavigate();
   
    useEffect(()=>{
      const userFromStorage = JSON.parse(localStorage.getItem('user'))
      if(userFromStorage===null) {
          navigate('/signin')
        }
    },[navigate])

  return (
    <div style={{ display: 'flex', flexDirection: 'column',alignItems: 'center', justifyContent:'center', marginTop: '100px'}}>
    <span className='text-white text-4xl'>{user.name}</span>
    {user.cart?.length >0&&
      <span className='text-white text-4xl'>Cart items: {user.cart?.length}</span>
    }
    </div>
  )
}

export default Account
