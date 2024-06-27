
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';
import { db, auth } from '../config/Config';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';

 

const Account = () => {
    
    const { user } = useContext(UserContext);

    const navigate=useNavigate();

   

    useEffect(()=>{
      
      const userFromStorage = JSON.parse(localStorage.getItem('user'))
      if(userFromStorage===null) {
          navigate('/signin')
        }
    },[navigate])


    const deleteAccount = () => {
      Confirm.show(
        'Delete account',
        `${user.name}?`,
        'Yes',
        'No',
      async ()=>{
      
      
      await db.collection('users').doc(auth.currentUser.uid).delete()
        .then(() => {
          return true;
        }).catch(error => { console.log('deleteAccount', error); return false; });
  
      const user = auth.currentUser;
      await user.delete();
      window.localStorage.clear()
      navigate('/signin')
      })
      
    }

  return (
    <div className='flex justify-center'>
      <div className='max-w-sm rounded overflow-hidden shadow-lg bg-slate-50 mx-3 my-3 p-5'>
        <div className='text-black'>Name: {user?.name}</div>
        <div className='text-black'>Email: {user?.email}</div>
        <div className='text-black border-b-2'>Purchase History:</div>
        {user.history?.map((item, index)=>{
          return(
            <div key={index}>
              <div >{new Date(item?.timestamp).toLocaleDateString()}</div>
              <div>Number of items: {item.items.length}</div>
              <div className='border-b-2'>Total: ${item.total}</div>
            </div>
          )
        })}
      
        <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-6"onClick ={deleteAccount}>Delete account</button>
      </div>
    </div>
  )
}

export default Account
