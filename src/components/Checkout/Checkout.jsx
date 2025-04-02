import React, { useContext, } from 'react'
import {UserContext} from '../../context/UserContextProvider'
import { db } from '../../config/Config';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import  { useNavigate} from 'react-router-dom';
// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js'
// import CheckoutForm from './CheckoutForm';
const Checkout = () => {
  // const [clientSecret, setClientSecret] = useState("")
  // const stripePromise = loadStripe('pk_test_51PT6bf2MmEPWo5ZYKqKyzWL2etA3IZmlxGwTZQcnc0vrdDn0CNKUDYFwktBKGk8JXsOrvr01BHneFvFE6RGQzezx00jiuSmphH');
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  // const URL = process.env.REACT_APP_URL
  // useEffect(() => {
  //   // Create PaymentIntent as soon as the page loads
  //   console.log('here')
  //   fetch(`${URL}/create-payment-intent`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setClientSecret(data.clientSecret));
  // }, [URL]);

  // const appearance = {
  //   theme: 'stripe',
  // };
  // const options = {
  //   clientSecret,
  //   appearance,
  // };
  const handleCheckout = () => {
    Confirm.show(
      'takes you to 3rd party CC page',
      `Adding cart items to history`,
      'Yes',
      'No',
      async () => {
        const date = Date.now();
        let sum = 0;
  
        for (let i = 0; i < user.cart?.length; i++) {
          sum += user.cart[i].price;
        }
  
        const array = {
          timestamp: date,
          items: user.cart,
          total: Number(sum.toFixed(2)),
        };
  
        try {
          const userDoc = await db.collection('users').doc(user.id).get();
          const userData = userDoc.data();
  
          const updatedHistory = Array.isArray(userData.history)
            ? [...userData.history, array]
            : [array];
  
          await db.collection('users').doc(user.id).update({ history: updatedHistory });
          await db.collection('users').doc(user.id).update({ cart: [] });
  
          navigate('/');
        } catch (error) {
          console.error('Error during checkout:', error);
        }
      },
      () => {
        console.log(user.cart);
        return;
      },
      {}
    );
  };

  return (
    <>
      
      <div className='flex justify-center mt-10'>
      <div className='max-w-full rounded overflow-hidden shadow-lg bg-slate-50 mx-3 my-3 flex justify-center flex-col' >
     {/* <div className='m-2'><p>{clientSecret.message}</p></div> */}
     <button className='m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={()=>handleCheckout()}>Use STRIPE API</button>
   </div>
  </div>
    
    {/* <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements> */}
  </>
  )
}

export default Checkout
