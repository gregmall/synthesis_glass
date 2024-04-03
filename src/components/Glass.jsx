import React, { useState, useEffect } from 'react'

import { Vortex } from 'react-loader-spinner';
import { auth, db } from '../config/Config';
import { useNavigate } from 'react-router-dom';

const Glass = () => {
  const [items, setItems]=useState([]);
  const [loading, setLoading]=useState(true)
  const [user, setUser]= useState(GetCurrentUser())
  const navigate = useNavigate();
  useEffect(()=>{
    getItems();
    
   
  },[]);
  function GetCurrentUser(){
    let user = ''
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                db.collection('users').doc(user.uid).get().then(snapshot=>{
                    setUser({
                      name: snapshot.data().name,
                      role: snapshot.data()?.userRole
                    });
                })
            }
            else{
                setUser(null);

            }
        })
    },[])
    return user;
}
 
  
  const getItems = async()=>{
    const array = [];
    const products = await db.collection('Products').get();
   
    for(const snap of products.docs){
      const data = snap.data();
      data.ID=snap.id;
      array.push({
        ...data
      })
      setItems(array)
    }
    setLoading(false);
  }

console.log(items)
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center',  flexWrap: 'wrap', overflowX:"auto"}}>
      {loading?
      <Vortex
      visible={true}
      height="80"
      width="80"
      ariaLabel="vortex-loading"
      wrapperStyle={{}}
      wrapperClass="vortex-wrapper"
      colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
      />
      :(items.map(item=>{
        return(
        <div className='max-w-sm rounded overflow-hidden shadow-lg bg-slate-50 mx-3 my-3 hover:scale-105 ease-in-out duration-100'>
          <img className='w-full p-4 rounded' src={item.ProductImage} alt='/'/>
          <div className='px-6 py-4'>
            <div className='font-bold text-xl mb-2'>{item.ProductName}</div>
            <span className='text-xl mb-2'>${item.ProductPrice}</span>
            <p className='text-gray-700 text-base'>{item.ProductDescription}</p>
            {user!==null?
              <button button className='my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Add to cart!</button>
            :
              <button  button className='my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={(()=>navigate('/signin'))}>Sign in to purchase!</button>
            }
          </div>

        </div>)
      }))
      }
    </div>
  )
}

export default Glass