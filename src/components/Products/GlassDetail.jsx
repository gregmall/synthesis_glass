import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../config/Config';
import { Vortex } from 'react-loader-spinner';

const GlassDetail = () => {
    const params = useParams();
    
    const [item, setItem] = useState();
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [active, setActive] =useState()
    const getItem = async()=>{
        console.log('hj')
      
         await db.collection('Products').doc(params.id).get()
        .then(snapshot=>{
            setItem({
                image: snapshot.data().ProductImage,
                title: snapshot.data().ProductName,
                description: snapshot.data().ProductDescription,
                price: snapshot.data().ProductPrice

            })
            let array = [];
            snapshot.data().ProductImage.forEach(item=>{
                array.push({imgLink:item})
            })
            setImages(array)
            setActive(array[0].imgLink)
        })
       
    }
  
    useEffect(()=>{
    getItem()
    .then(()=>setLoading(false))

    },[])
    
    
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
             <div>
        <img
          className="w-full p-4 rounded"
          src={active}
          alt=""
        />
      </div>
      <div className="grid grid-cols-5 gap-4">
        {images.map(({ imgLink }, index) => (
          <div key={index}>
            <img
              onClick={() => setActive(imgLink)}
              src={imgLink}
              className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
              alt="/"
            />
          </div>
        ))}
      </div>
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