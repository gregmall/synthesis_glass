
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../config/Config';
import { UserContext } from '../context/UserContextProvider';

 

const Account = () => {
    const { user } = useContext(UserContext);
    console.log(user)
    const navigate=useNavigate();
   
    

    useEffect(()=>{
        const userFromStorage = JSON.parse(localStorage.getItem('user'))
   
        if(userFromStorage===null) navigate('/signin')


  
    
      },[])
  return (
    <div>HI {user.name}</div>
  )
}

export default Account