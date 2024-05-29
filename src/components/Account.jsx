
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
      <div className='max-w-sm rounded overflow-hidden shadow-lg bg-slate-50 mx-3 my-3'>
    <span className='text-black text-4xl'>{user.name}</span>
    <span className='text-black text-4xl'>{user.email}</span>
    {user.cart?.length >0&&
      <span className='text-black text-4xl'>Cart items: {user.cart?.length}</span>
    }
    </div>
    </div>
  )
}

export default Account
