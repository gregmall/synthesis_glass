import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../config/Config';
import { Vortex } from 'react-loader-spinner';

const GlassDetail = () => {
    const params = useParams();
    
    const [item, setItem] = useState();
    const [loading, setLoading] = useState(true);


  
    useEffect(()=>{
    getItem()
    .then(()=>setLoading(false))

    },[])
    const getItem = async()=>{
      
         await db.collection('Products').doc(params.id).get()
        .then(snapshot=>{
            setItem({
                image: snapshot.data().ProductImage,
                title: snapshot.data().ProductName,
                description: snapshot.data().ProductDescription,
                price: snapshot.data().ProductPrice

            })
            
        });
       
  
      }
    
  return (
    

    <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center',  flexWrap: 'wrap', overflowX:"auto"}}>
         {loading?
      <Vortex
        visible={true}
        height="80"
        width="80"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClassName="vortex-wrapper"
        colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
      />
      :
        <div className='max-w-sm rounded overflow-hidden shadow-lg bg-slate-50 mx-3 my-3 hover:bg-fuchsia-400 ease-in-out duration-100' >
            <img className='w-full p-4 rounded' src={item.image} alt='/'/>
            <div className='px-6 py-4'>
                <div className='font-bold text-xl mb-2'>{item.name}</div>
                <div className='flex justify-between item-center'>
                <span className='text-xl mb-2'>${item.price}</span>
                
                </div>
            </div>
        </div>}
    </div>
    
  )
}

export default GlassDetail