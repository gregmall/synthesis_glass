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
    'takes you to 3rd party CC page',
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
      
      <div className='flex justify-center mt-10'>
      <div className='max-w-full rounded overflow-hidden shadow-lg bg-slate-50 mx-3 my-3 flex justify-center flex-col' >
     <div className='m-2'>Under construction</div>
     <button className='m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={()=>handleCheckout()}>Use STRIPE API</button>
   </div>
  </div>
  
  </>
  )
}

export default Checkout
