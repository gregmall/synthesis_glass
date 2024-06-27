import React, { useContext } from 'react'
import {UserContext} from '../context/UserContextProvider'
import { db } from '../config/Config';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import  { useNavigate} from 'react-router-dom';
const Checkout = () => {

  const { user } = useContext(UserContext)
  const navigate = useNavigate()
 const handleCheckout = ()=>{
  Confirm.show(
    'Removing takes you to 3rd party CC page',
    `Adding cart items to history`,
    'Yes',
    'No',
    async() => {
      const date = Date.now();
      let sum= 0;
      for(let i=0; i<user.cart?.length; i++){
        sum+= user.cart[i].price
  
      }
      let array = {
        timestamp: date,
        items: user.cart,
        total: Number(sum.toFixed(2))
      }
   
     
      await db.collection('users').doc(user.id).update({history: [...user.history, array]})
      .then(async()=>
        await db.collection('users').doc(user.id).update({cart: []})
      )
      
     
      
      .then(navigate('/'));
      },
    () => {
      console.log(user.cart)
    return;
    },

    {
    },
    );
 }

  return (
    <>
      
      <div className='flex justify-center'>
      <div className='max-w-full rounded overflow-hidden shadow-lg bg-slate-50 mx-3 my-3 ' >
     <div>DOG!</div>
     <button onClick={()=>handleCheckout()}>Use Stripe API</button>
   </div>
  </div>
  
  </>
  )
}

export default Checkout