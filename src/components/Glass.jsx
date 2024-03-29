import React, { useState, useEffect } from 'react'
import { db } from  '../config/Config'
import { Vortex } from 'react-loader-spinner';

const Glass = () => {
  const [items, setItems]=useState([]);
  const [loading, setLoading]=useState(true)

  useEffect(()=>{
    getItems();
    
   
  },[]);
  console.log(items)
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


  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center', marginTop: '100px', flexWrap: 'wrap', overflowX:"auto"}}>
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
        <div className='max-w-sm rounded overflow-hidden shadow-lg bg-slate-50 mx-3'>
          <img className='w-full' src={item.ProductImage} alt='/'/>
          <div className='px-6 py-4'>
            <div className='font-bold text-xl mb-2'>{item.ProductName}</div>
            <span className='text-xl mb-2'>{item.ProductPrice}</span>
            <p className='text-gray-700 text-base'>{item.ProductDescription}</p>
          </div>

        </div>)
      }))
      }
    </div>
  )
}

export default Glass