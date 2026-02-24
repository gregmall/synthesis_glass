// import React, { useContext, } from 'react'
// import {UserContext} from '../../context/UserContextProvider'
// import { db } from '../../config/Config';
// import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
// import  { useNavigate} from 'react-router-dom';

// const Checkout = () => {
 
//   const { user } = useContext(UserContext)
//   const navigate = useNavigate()
  
//   const handleCheckout = () => {
//     Confirm.show(
//       'takes you to 3rd party CC page',
//       `Adding cart items to history`,
//       'Yes',
//       'No',
//       async () => {
//         const date = Date.now();
//         let sum = 0;
  
//         for (let i = 0; i < user.cart?.length; i++) {
//           sum += user.cart[i].price;
//         }
  
//         const array = {
//           timestamp: date,
//           items: user.cart,
//           total: Number(sum.toFixed(2)),
//         };
  
//         try {
//           const userDoc = await db.collection('users').doc(user.id).get();
//           const userData = userDoc.data();
  
//           const updatedHistory = Array.isArray(userData.history)
//             ? [...userData.history, array]
//             : [array];
  
//           await db.collection('users').doc(user.id).update({ history: updatedHistory });
//           await db.collection('users').doc(user.id).update({ cart: [] });
  
//           navigate('/');
//         } catch (error) {
//           console.error('Error during checkout:', error);
//         }
//       },
//       () => {
//         console.log(user.cart);
//         return;
//       },
//       {}
//     );
//   };

//   return (
//     <>
      
//       <div className='flex justify-center mt-10'>
//       <div className='max-w-full rounded overflow-hidden shadow-lg bg-slate-50 mx-3 my-3 flex justify-center flex-col' >
//      {/* <div className='m-2'><p>{clientSecret.message}</p></div> */}
//      <button className='m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={()=>handleCheckout()}>Use STRIPE API</button>
//    </div>
//   </div>
    

//   </>
//   )
// }

// export default Checkout
import  { useState, useEffect } from 'react';

import { db, auth, app } from '../../config/Config';
import {  signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, query, where } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';

// Firebase configuration - REPLACE WITH YOUR CONFIG
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase

const functions = getFunctions(app);

// Sample products
const PRODUCTS = [
  { id: 'prod_1', name: 'Artisan Coffee Mug', price: 24.99, image: '☕', description: 'Handcrafted ceramic mug' },
  { id: 'prod_2', name: 'Leather Notebook', price: 34.99, image: '📓', description: 'Premium leather journal' },
  { id: 'prod_3', name: 'Wireless Earbuds', price: 89.99, image: '🎧', description: 'High-quality audio' },
  { id: 'prod_4', name: 'Desk Lamp', price: 45.99, image: '💡', description: 'Minimalist LED lamp' },
  { id: 'prod_5', name: 'Plant Terrarium', price: 29.99, image: '🌿', description: 'Self-sustaining ecosystem' },
  { id: 'prod_6', name: 'Canvas Tote Bag', price: 1.00, image: '👜', description: 'Organic cotton bag' }
];

export default function StripeCartApp() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkoutSession, setCheckoutSession] = useState(null);
  const [showCart, setShowCart] = useState(false);
  console.log(cart)
console.log(user)
  // Authenticate user
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
    const fetchCartItems = async () => {
      if (user?.uid) {
        const person = await db.collection('users').doc(user.uid).get();
        const array = person.data();
        const cart = array?.cart;
        setCart(cart || []);
        
        let sum = 0;
        for (let i = 0; i < cart?.length; i++) {
          sum += cart[i].price;
        }
      
      }
    };
    fetchCartItems();
  }, [user]);
  // Add item to cart
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    
    // Show cart briefly when adding items
    setShowCart(true);
    setTimeout(() => setShowCart(false), 2000);
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Update quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Calculate total
  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price), 0);
  };

  // Create Stripe Checkout Session
  const handleCheckout = async () => {
    if (!user || cart.length === 0) return;

    setLoading(true);

    try {
      // Create line items for Stripe
      const line_items = cart.map(item => ({
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
            cartItems: JSON.stringify(cart.map(item => ({
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
      setCart([]);
      alert('Payment successful! Thank you for your purchase.');
      window.history.replaceState({}, '', window.location.pathname);
    }
    if (urlParams.get('canceled')) {
      alert('Checkout canceled. Your cart is still available.');
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);   

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      fontFamily: '"Space Mono", monospace',
      color: '#e8e8e8',
      padding: '20px'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Playfair+Display:wght@700;900&display=swap');
        
        * {
          box-sizing: border-box;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .product-card {
          animation: float 3s ease-in-out infinite;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .product-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 255, 255, 0.3);
        }
        
        .cart-badge {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .checkout-button {
          position: relative;
          overflow: hidden;
        }
        
        .checkout-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }
        
        .checkout-button:hover::before {
          width: 300px;
          height: 300px;
        }
        
        .glitch {
          position: relative;
        }
        
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          left: 2px;
          text-shadow: -2px 0 #00ffff;
          top: 0;
          color: #e8e8e8;
          background: transparent;
          overflow: hidden;
          clip: rect(0, 900px, 0, 0);
          animation: glitch-anim 2s infinite linear alternate-reverse;
        }
        
        @keyframes glitch-anim {
          0% { clip: rect(42px, 9999px, 44px, 0); }
          5% { clip: rect(12px, 9999px, 59px, 0); }
          10% { clip: rect(48px, 9999px, 29px, 0); }
          15% { clip: rect(42px, 9999px, 73px, 0); }
          20% { clip: rect(63px, 9999px, 27px, 0); }
          25% { clip: rect(34px, 9999px, 55px, 0); }
          30% { clip: rect(86px, 9999px, 73px, 0); }
          35% { clip: rect(20px, 9999px, 20px, 0); }
          40% { clip: rect(26px, 9999px, 60px, 0); }
          45% { clip: rect(25px, 9999px, 66px, 0); }
          50% { clip: rect(57px, 9999px, 98px, 0); }
          55% { clip: rect(5px, 9999px, 46px, 0); }
          60% { clip: rect(82px, 9999px, 31px, 0); }
          65% { clip: rect(54px, 9999px, 27px, 0); }
          70% { clip: rect(28px, 9999px, 99px, 0); }
          75% { clip: rect(45px, 9999px, 69px, 0); }
          80% { clip: rect(23px, 9999px, 85px, 0); }
          85% { clip: rect(54px, 9999px, 84px, 0); }
          90% { clip: rect(45px, 9999px, 47px, 0); }
          95% { clip: rect(37px, 9999px, 20px, 0); }
          100% { clip: rect(4px, 9999px, 91px, 0); }
        }
      `}</style>

      {/* Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px',
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '15px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 255, 255, 0.2)'
      }}>
        <h1 className="glitch" data-text="NEON MARKET" style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '48px',
          margin: 0,
          background: 'linear-gradient(45deg, #00ffff, #ff00ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 900,
          letterSpacing: '3px',
          textShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
        }}>
          NEON MARKET
        </h1>
        
        <button
          onClick={() => setShowCart(!showCart)}
          style={{
            background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '25px',
            color: '#1a1a2e',
            fontWeight: 'bold',
            fontSize: '18px',
            cursor: 'pointer',
            fontFamily: '"Space Mono", monospace',
            position: 'relative',
            transition: 'all 0.3s ease',
            boxShadow: '0 5px 15px rgba(0, 255, 255, 0.4)'
          }}
          onMouseEnter={e => {
            e.target.style.transform = 'translateY(-3px)';
            e.target.style.boxShadow = '0 10px 25px rgba(0, 255, 255, 0.6)';
          }}
          onMouseLeave={e => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 5px 15px rgba(0, 255, 255, 0.4)';
          }}
        >
          🛒 Cart ({cart.reduce((sum, item) => sum + item.price, 0)})
          {cart.length > 0 && (
            <span className="cart-badge" style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              background: '#ff00ff',
              color: 'white',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 'bold',
              border: '2px solid #1a1a2e'
            }}>
              {cart.length}
            </span>
          )}
        </button>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '30px',
          marginBottom: '40px'
        }}>
          {PRODUCTS.map((product, index) => (
            <div
              key={product.id}
              className="product-card"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '20px',
                padding: '25px',
                border: '2px solid rgba(0, 255, 255, 0.3)',
                backdropFilter: 'blur(10px)',
                animationDelay: `${index * 0.1}s`,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #00ffff, #ff00ff, #00ffff)',
                backgroundSize: '200% 100%',
                animation: 'gradient 3s ease infinite'
              }}/>
              
              <div style={{
                fontSize: '80px',
                textAlign: 'center',
                marginBottom: '15px',
                filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))'
              }}>
                {product.image}
              </div>
              
              <h3 style={{
                margin: '0 0 10px 0',
                fontSize: '22px',
                color: '#00ffff',
                fontWeight: 'bold'
              }}>
                {product.name}
              </h3>
              
              <p style={{
                margin: '0 0 15px 0',
                fontSize: '14px',
                color: '#b8b8b8',
                lineHeight: '1.5'
              }}>
                {product.description}
              </p>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '20px'
              }}>
                <span style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#ff00ff',
                  textShadow: '0 0 10px rgba(255, 0, 255, 0.5)'
                }}>
                  ${product.price.toFixed(2)}
                </span>
                
                <button
                  onClick={() => addToCart(product)}
                  style={{
                    background: 'linear-gradient(135deg, #ff00ff, #00ffff)',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '20px',
                    color: '#1a1a2e',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '14px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 10px rgba(255, 0, 255, 0.4)'
                  }}
                  onMouseEnter={e => {
                    e.target.style.transform = 'scale(1.1)';
                    e.target.style.boxShadow = '0 6px 15px rgba(255, 0, 255, 0.6)';
                  }}
                  onMouseLeave={e => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = '0 4px 10px rgba(255, 0, 255, 0.4)';
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Sidebar */}
        <div style={{
          position: 'fixed',
          right: showCart ? '0' : '-450px',
          top: 0,
          width: '450px',
          height: '100vh',
          background: 'rgba(26, 26, 46, 0.98)',
          borderLeft: '2px solid rgba(0, 255, 255, 0.5)',
          padding: '30px',
          overflowY: 'auto',
          transition: 'right 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 1000,
          backdropFilter: 'blur(20px)',
          boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.5)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px',
            borderBottom: '2px solid rgba(0, 255, 255, 0.3)',
            paddingBottom: '20px'
          }}>
            <h2 style={{
              margin: 0,
              fontSize: '32px',
              color: '#00ffff',
              fontFamily: '"Playfair Display", serif',
              fontWeight: 900
            }}>
              Your Cart
            </h2>
            <button
              onClick={() => setShowCart(false)}
              style={{
                background: 'transparent',
                border: '2px solid #ff00ff',
                color: '#ff00ff',
                fontSize: '24px',
                cursor: 'pointer',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => {
                e.target.style.background = '#ff00ff';
                e.target.style.color = '#1a1a2e';
                e.target.style.transform = 'rotate(90deg)';
              }}
              onMouseLeave={e => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#ff00ff';
                e.target.style.transform = 'rotate(0deg)';
              }}
            >
              ×
            </button>
          </div>

          {cart.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#b8b8b8'
            }}>
              <div style={{ fontSize: '80px', marginBottom: '20px' }}>🛍️</div>
              <p style={{ fontSize: '18px' }}>Your cart is empty</p>
              <p style={{ fontSize: '14px', marginTop: '10px' }}>Add some items to get started!</p>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: '30px' }}>
                {cart.map(item => (
                  <div key={item.id} style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '15px',
                    padding: '20px',
                    marginBottom: '15px',
                    border: '1px solid rgba(0, 255, 255, 0.2)'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '15px'
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '40px', marginBottom: '10px' }}>{item.image}</div>
                        <h3 style={{
                          margin: '0 0 5px 0',
                          fontSize: '18px',
                          color: '#00ffff'
                        }}>
                          {item.name}
                        </h3>
                        <p style={{
                          margin: 0,
                          fontSize: '20px',
                          color: '#ff00ff',
                          fontWeight: 'bold'
                        }}>
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          background: 'transparent',
                          border: '1px solid #ff00ff',
                          color: '#ff00ff',
                          cursor: 'pointer',
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          fontSize: '18px',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={e => {
                          e.target.style.background = '#ff00ff';
                          e.target.style.color = '#1a1a2e';
                        }}
                        onMouseLeave={e => {
                          e.target.style.background = 'transparent';
                          e.target.style.color = '#ff00ff';
                        }}
                      >
                        ×
                      </button>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px'
                    }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          background: 'rgba(0, 255, 255, 0.2)',
                          border: '1px solid #00ffff',
                          color: '#00ffff',
                          cursor: 'pointer',
                          width: '35px',
                          height: '35px',
                          borderRadius: '8px',
                          fontSize: '20px',
                          fontWeight: 'bold',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={e => e.target.style.background = 'rgba(0, 255, 255, 0.4)'}
                        onMouseLeave={e => e.target.style.background = 'rgba(0, 255, 255, 0.2)'}
                      >
                        -
                      </button>
                      
                      <span style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#e8e8e8',
                        minWidth: '40px',
                        textAlign: 'center'
                      }}>
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          background: 'rgba(0, 255, 255, 0.2)',
                          border: '1px solid #00ffff',
                          color: '#00ffff',
                          cursor: 'pointer',
                          width: '35px',
                          height: '35px',
                          borderRadius: '8px',
                          fontSize: '20px',
                          fontWeight: 'bold',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={e => e.target.style.background = 'rgba(0, 255, 255, 0.4)'}
                        onMouseLeave={e => e.target.style.background = 'rgba(0, 255, 255, 0.2)'}
                      >
                        +
                      </button>
                      
                      <span style={{
                        marginLeft: 'auto',
                        fontSize: '18px',
                        color: '#e8e8e8',
                        fontWeight: 'bold'
                      }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                borderTop: '2px solid rgba(0, 255, 255, 0.3)',
                paddingTop: '20px',
                marginTop: '20px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '25px',
                  fontSize: '28px',
                  fontWeight: 'bold'
                }}>
                  <span style={{ color: '#00ffff' }}>Total:</span>
                  <span style={{
                    color: '#ff00ff',
                    textShadow: '0 0 10px rgba(255, 0, 255, 0.5)'
                  }}>
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>

                <button
                  className="checkout-button"
                  onClick={handleCheckout}
                  disabled={loading || !user}
                  style={{
                    width: '100%',
                    background: loading ? '#666' : 'linear-gradient(135deg, #00ffff, #ff00ff)',
                    border: 'none',
                    padding: '18px',
                    borderRadius: '25px',
                    color: '#1a1a2e',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontFamily: '"Space Mono", monospace',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 25px rgba(0, 255, 255, 0.4)',
                    position: 'relative'
                  }}
                  onMouseEnter={e => {
                    if (!loading) {
                      e.target.style.transform = 'translateY(-3px)';
                      e.target.style.boxShadow = '0 15px 35px rgba(0, 255, 255, 0.6)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!loading) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 10px 25px rgba(0, 255, 255, 0.4)';
                    }
                  }}
                >
                  {loading ? 'Processing...' : '🔒 Secure Checkout with Stripe'}
                </button>

                {!user && (
                  <p style={{
                    marginTop: '15px',
                    fontSize: '12px',
                    color: '#b8b8b8',
                    textAlign: 'center'
                  }}>
                    Authenticating...
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Overlay when cart is open */}
        {showCart && (
          <div
            onClick={() => setShowCart(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              zIndex: 999,
              backdropFilter: 'blur(5px)'
            }}
          />
        )}
      </div>
    </div>
  );
}
