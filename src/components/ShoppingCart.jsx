import React, { useState,  useEffect } from 'react'
import { db, auth } from '../config/Config';

import {  signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import {  collection, addDoc, onSnapshot} from 'firebase/firestore';
import { BsTrash3 } from "react-icons/bs"
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = () => {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState(user?.cart || []);
  const [loading, setLoading] = useState(false);
    const calculateTotal = () => {
      console.log(cartItems)
    return cartItems.reduce((sum, item) => sum + (item.price), 0);
  };
useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // Sign in anonymously if no user
        try {
          const userCredential = await signInAnonymously(auth);
          setUser(userCredential.user);
        } catch (error) {
          console.error('Authentication error:', error);
        }
      }
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem('user'))
    if (userFromStorage === null) {
      navigate('/signin')
    }
  }, [navigate]);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (user?.uid) {
        const person = await db.collection('users').doc(user.uid).get();
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

        await db.collection('users').doc(user.uid).update({ cart: arr })
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
   const handleCheckout = async () => {
    if (!user || cartItems.length === 0) return;

    setLoading(true);

    try {
      // Create line items for Stripe
      const line_items = cartItems.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: item.name,
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: 1,
      }));

      // Create a checkout session document in Firestore
      // The Stripe extension watches this collection and creates the session
      const checkoutSessionRef = await addDoc(
        collection(db, 'customers', user.uid, 'checkout_sessions'),
        {
          mode: 'payment',
          line_items: line_items,
          success_url: window.location.origin + '?success=true',
          cancel_url: window.location.origin + '?canceled=true',
          metadata: {
            cartItems: JSON.stringify(cartItems.map(item => ({
              id: item.id,
              name: item.name,
              quantity: item.quantity
            })))
          }
        }
      );

      // Listen for the session to be created by the extension
      const unsubscribe = onSnapshot(checkoutSessionRef, (snap) => {
        const data = snap.data();
        if (data?.url) {
          // Redirect to Stripe Checkout
          window.location.assign(data.url);
          unsubscribe();
        }
        if (data?.error) {
          console.error('Checkout error:', data.error);
          alert('Checkout failed: ' + data.error.message);
          setLoading(false);
          unsubscribe();
        }
      });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to start checkout. Please try again.');
      setLoading(false);
    }
  };

  // Check for success/cancel in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success')) {
     
      alert('Payment successful! Thank you for your purchase.');
      window.history.replaceState({}, '', window.location.pathname);
    }
    if (urlParams.get('canceled')) {
      alert('Checkout canceled. Your cart is still available.');
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []); 

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
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'disabled={loading || !user} onClick={()=>handleCheckout()}>Stripe Checkout Coming Soon</button>
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