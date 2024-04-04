import React, { useState, useEffect, useContext } from 'react'
import { db } from '../config/Config';
import { UserContext } from '../config/UserContextProvider';

const ShoppingCart = () => {
const { user } = useContext(UserContext)


const [buyer, setBuyer]= useState(user);
const [loading, setLoading]=useState(false)



console.log(user.cart)

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center', marginTop: '100px'}}>
     <div>  
       {user?.cart?.length>0? <span className='text-white text-4xl'>{user.name}'s Cart </span>:<span className='text-white text-4xl'>Cart is empty </span>}
       </div> 
  
    {user?.cart?.map(item=>{
        console.log(item)
        return(
            <div className='max-w-sm rounded overflow-hidden shadow-lg bg-slate-50 mx-3 my-3 hover:scale-105 ease-in-out duration-100'>
            <img className='w-full p-4 rounded' src={item.image} alt='/'/>
            <div className='px-6 py-4'>
                <div className='font-bold text-xl mb-2'>{item.name}</div>
                <span className='text-xl mb-2'>${item.price}</span>
            </div>
            </div>

            
        )
    })}
  </div>
  )
}

export default ShoppingCart