import React, { useState,  useContext, useEffect } from 'react'
import { db } from '../config/Config';
// import { getApp } from "@firebase/app";
import {UserContext} from '../context/UserContextProvider'
import { BsTrash3 } from "react-icons/bs"
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import  { useNavigate} from 'react-router-dom';
import createCheckoutSessions from './Checkout/stripePayment';
// import { getStripePayments } from '@invertase/firestore-stripe-payments';
import { Vortex } from 'react-loader-spinner';
// import { getFunctions, httpsCallable } from "firebase/functions";
// import { getAuth } from 'firebase/auth';


const ShoppingCart = () => {

// const auth = getAuth();

const { user } = useContext(UserContext)
// const app = getApp();
// const createCheckoutSession = async (app, lineItems) => {
//   const functions = getFunctions(app);
//   const createSession = httpsCallable(functions, 'createCheckoutSession');

//   try {
//     const result = await createSession({ line_items: lineItems });
//     window.location.assign(result.data.url);
//   } catch (error) {
//     console.error("Error creating checkout session:", error);
//   }
// };

const [loading, setLoading] = useState(true)
const [products, setProducts] = useState([])
const navigate = useNavigate();
useEffect(()=>{
  let array=[]
   db.collection('products')
  .where('active', '==', true)
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(async function (doc) {
      // console.log(doc.id, ' => ', doc.data());
      const priceSnap = await doc.ref.collection('prices').get();
      priceSnap.docs.forEach((doc) => {
        // console.log(doc.id, ' => ', doc.data());
        array.push(doc.id)
      });
    });
  })
  .finally(()=>{
    setProducts(array)
  });
  console.log(products)
  const userFromStorage = JSON.parse(localStorage.getItem('user'))
  if(userFromStorage===null) {
      navigate('/signin')
    }
},[navigate])


const getCartItems = async()=>{
  await db.collection('users').doc(user?.id).get()
  .then(person => {
    const array = person.data()
    const cart = array?.cart;
    let sum= 0;
    for(let i=0; i<cart?.length; i++){
      sum+= cart[i].price
    }
    
    setTotal(sum.toFixed(2))
  })

}

useEffect(()=>{
  const getStripeId = async()=>{
    const itemArray=[]
    const id =  await db.collection('users').doc(user?.id).get()
    const cart = id.data()?.cart;
  
  for(let i = 0; i<cart?.length; i++){
    itemArray.push({price: cart[i].stripeID, quantity: 1})
  }
  setStripeItems(itemArray)
  setLoading(false)
}
getStripeId();
}, [user?.id])

const [total, setTotal]= useState(getCartItems());
const [stripeItems, setStripeItems] = useState([])



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
// const createCheckoutSessions = async (app, line_items) => {
//   console.log(line_items)
//   const userId = auth.currentUser?.uid;
//   console.log(userId)
//   if (!userId) throw new Error("User is not authenticated");

//   // Add checkout session document to Firestore
//   const functions = getFunctions(app);
//   const createSession = httpsCallable(functions, 'createCheckoutSession');

//   try {
//     const result = await createSession({ line_items: stripeItems });
//     window.location.assign(result.data.url);
//   } catch (error) {
//     console.error("Error creating checkout session:", error);
//   }
// }
const handleCheckout = async()=>{
  await createCheckoutSessions([{price: products[0], quantity: 1}, {price: products[1], quantity: 1}]);
}

  

  return (
   <>
      {loading? 
      <div className='flex align-middle justify-center mt-20'>
        <Vortex
        visible={true}
        height="80"
        width="80"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'white']}
        />
    </div>:
      <div className='flex justify-center'>
      <div className='max-w-full rounded overflow-hidden shadow-lg bg-slate-50 mx-3 my-3 ' >
      {user?.cart?.map((item,key)=>{
        
        return(
            <div  key={key} className='flex row-auto'>
            <img className='w-24 h-24 p-4 rounded' src={item.image} alt='/'/>
            <div className='px-6 py-4 text-black'>
                <div className='font-bold mb-2'>{item.name}</div>
                <div className='flex row'>
                  <span className='text-l mb-2'>${item.price}</span>
                  <BsTrash3 size='14' style={{marginTop: '4px', marginLeft:'5px'}}onClick={()=>handleDelete(item)} cursor='pointer'/>
                </div>
                  
              
            </div>
            </div>

            
        )
        
    })}
    {user?.cart?.length>0?
        <div className='flex-col max-w-sm rounded overflow-hidden shadow-lg bg-slate-50 mx-3 my-3'>
          <div className='font-bold border-t my-2'>Total: ${total}</div>
      
          <button className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={handleCheckout}>CHECKOUT</button>
        </div>
        :
          <span className='text-black text-4xl'>Cart empty </span>
       }
   </div>
  </div>
}
  </>
  )
}

export default ShoppingCart
