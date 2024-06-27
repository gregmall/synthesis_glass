
import React, { useEffect, useContext,} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';
import { db, auth } from '../config/Config';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';

 

const Account = () => {
    
    const { user } = useContext(UserContext);

    const navigate=useNavigate();
    // const [historyArr, setHistoryArr] = useState([...user.history])

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
    <div className='text-black'>{user?.name}</div>
    <div className='text-black'>{user?.email}</div>
   
      <div className='text-black'>Purchase History: {user?.history?.length}</div>
  
    <button onClick ={deleteAccount}>Delete account</button>
    </div>
    </div>
  )
}

export default Account
