import React, { useState, useContext, useEffect } from 'react'
import { db } from '../config/Config';
import { UserContext } from '../context/UserContextProvider'

import { BsTrash3 } from "react-icons/bs"
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState(user?.cart || []);
 
    const calculateTotal = () => {
      console.log(cartItems)
    return cartItems.reduce((sum, item) => sum + (item.price), 0);
  };

  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem('user'))
    if (userFromStorage === null) {
      navigate('/signin')
    }
  }, [navigate]);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (user?.id) {
        const person = await db.collection('users').doc(user.id).get();
        const array = person.data();
        const cart = array?.cart;
        setCartItems(cart || []);
        
        let sum = 0;
        for (let i = 0; i < cart?.length; i++) {
          sum += cart[i].price;
        }
        setTotal(sum.toFixed(2));
      }
    };
    fetchCartItems();
  }, [user]);

  const handleDelete = (item) => {
    console.log(total)
    Confirm.show(
      'Are you sure you want to remove',
      `${item.name}?`,
      'Yes',
      'No',
      async () => {
        let arr = cartItems;
        arr.forEach((element, index) => {
          if (element.id === item.id) arr.splice(index, 1);
        });
        console.log(arr);

        await db.collection('users').doc(user.id).update({ cart: arr })
          .then(() => navigate('/cart'));
      },
      () => {
        let sum = 0;
        for (let i = 0; i < cartItems?.length; i++) {
          sum += cartItems[i].price;
        }
        setTotal(sum.toFixed(2));
        
        return;
      },
      {}
    );
  };

  return (
    <>
      <div className='flex justify-center'>
        <div className='max-w-full rounded overflow-hidden shadow-lg bg-slate-50 mx-3 my-3  items-center text-center p-4'>
          {cartItems.map((item, key) => {
            return (
              <div key={key} className='flex row-auto'>
                <img className='w-24 h-24 p-4 rounded' src={item.image} alt='/' />
                <div className='px-6 py-4 text-black'>
                  <div className='font-bold mb-2'>{item.name}</div>
                  <div className='flex row'>
                    <span className='text-l mb-2'>${item.price}</span>
                    <BsTrash3 size='14' style={{ marginTop: '4px', marginLeft: '5px' }} onClick={() => handleDelete(item)} cursor='pointer' />
                  </div>
                </div>
              </div>
            )
          })}
          {cartItems.length > 0 ?
           
              <div className='flex-col max-w-sm rounded overflow-hidden shadow-lg bg-slate-50 mx-3 my-3 justify-center items-center text-center p-4'>
                <div className='font-bold border-t my-2'>Total: ${calculateTotal().toFixed(2)}</div>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Stripe Checkout Coming Soon</button>
              </div>
           
            :
            <span className='text-black text-4xl'>Cart empty </span>
          }
        </div>
      </div>
    </>
  )
}

export default ShoppingCart;