import React, { useState, useEffect, useContext } from 'react'
import { db } from '../config/Config';
import { UserContext } from './context/UserContextProvider';
import { BsTrash3 } from "react-icons/bs"
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import  { useNavigate} from 'react-router-dom';


const ShoppingCart = () => {
const { user } = useContext(UserContext)
console.log(user)
const navigate = useNavigate();
const [total, setTotal]= useState('');

useEffect(()=>{
  getCartItems()

},[])


const handleDelete=(item)=>{
  Confirm.show(
    'Are you sure you want to remove',
    `${item.name}?`,
    'Yes',
    'No',
    async() => {
      let arr=user.cart;
      arr.forEach((element, index)=>{
        if(element.id === item.id)arr.splice(index, 1)})
      console.log(arr)

      await db.collection('users').doc(user.id).update({cart: arr})
      
      .then(navigate('/cart'));
      },
    () => {
      console.log(user.cart)
    return;
    },

    {
    },
    );
}


  


// }

// const getTotal=(cart, key)=>{
//     return cart?.reduce((acc, obj)=>{
//         if(obj.hasOwnProperty(key)){
//             return acc+obj[key];
//         }
//         return acc;
      
    
//     },0);

// }

// console.log(total)
const getCartItems = async()=>{
    await db.collection('users').doc(user.id).get()
    .then(person => {
      const array = person.data()
      const cart = array?.cart;
      let sum= 0;
      for(let i=0; i<cart?.length; i++){
        sum+= cart[i].price

      }
      setTotal(sum)
      
     
    })
      


}

  return (
   <>
     <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center', marginTop: '100px'}}>  
       {user?.cart?.length>0?
        <span className='text-white text-4xl'>{user.name}'s Cart {total&&total}</span>
        :
        <span className='text-white text-4xl'>Cart empty </span>}
      </div> 
      <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center', marginTop: '100px', flexWrap:'wrap'}}>
      {user?.cart?.map(item=>{
        
        return(
            <div className='max-w-sm rounded overflow-hidden shadow-lg bg-slate-50 mx-3 my-3 hover:scale-105 ease-in-out duration-100'>
            <img className='w-full p-4 rounded' src={item.image} alt='/'/>
            <div className='px-6 py-4'>
                <div className='font-bold text-xl mb-2'>{item.name}</div>
                <div className='flex justify-between item-center'>
                  <span className='text-xl mb-2'>${item.price}</span>
                  <BsTrash3 onClick={()=>handleDelete(item)} />
                </div>
            </div>
            </div>

            
        )
    })}
   
  </div>
  </>
  )
}

export default ShoppingCart
