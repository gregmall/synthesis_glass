import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { db } from '../../config/Config';
import { Vortex } from 'react-loader-spinner';
import { UserContext } from '../../context/UserContextProvider';
import Notiflix from 'notiflix';
const GlassDetail = () => {
    const params = useParams();
    const signedIn=useContext(UserContext)
    const navigate =  useNavigate();
    const [item, setItem] = useState();
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [active, setActive] =useState()
    const [user, setUser] = useState(signedIn)
    const [adding, setAdding]=useState(false)

  
    useEffect(()=>{
        getItem()
        .then(()=>{
        if(user!==null){
          setUser(user?.user)
        }
          setLoading(false)
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const getItem = async()=>{
        console.log('hj')
      
         await db.collection('Products').doc(params.id).get()
        .then(snapshot=>{
            
            let array = [];
            snapshot.data().ProductImage.forEach(item=>{
                array.push({imgLink:item})
            })
            setImages(array)
            setActive(array[0].imgLink)
            setItem({
                id: snapshot.data().ID,
                image: snapshot.data().ProductImage,
                title: snapshot.data().ProductName,
                description: snapshot.data().ProductDescription,
                price: snapshot.data().ProductPrice
            })
        })
    }
const handleClick=async(item)=>{
    setAdding(true)
  
    let previousItems =[]
    console.log(user)
     await db.collection('users').doc(user.id).get()
     .then(snapshot=> {
        previousItems=snapshot.data().cart
     })
try{
    await db.collection('users').doc(user.id).update({cart: [...previousItems, {id: params.id, name: item.title, image: item.image, price: item.price}]})
    .then(()=>{
    setAdding(false)
    Notiflix.Notify.success(`${item.ProductName} added to shopping cart!`)
    navigate('/glass')
  })
}catch(error){

    console.log(error.message)
}
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
        <div className='max-w-xl rounded overflow-hidden bg-slate-50 mx-3 my-3 shadow-2xl' >
             <div className='font-bold text-3xl mb-2 flex justify-center'>{item.title}</div>
        <div>
        <img
          className="w-full p-4 rounded"
          src={active}
          alt=""
        />
        </div>
      <div className="flex justify-center gap-4 max-w-full">
        {images.map(({ imgLink }, index) => (
          <div key={index} className=' flex justify-center'>
            <img
              onClick={() => setActive(imgLink)}
              src={imgLink}
              className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center mx-2 flex-wrap px-1"
              alt="/"
            />
          </div>
        ))}
      </div>
            <div className='px-6 py-4 flex-col'>
              <span className='text-xl mb-2'>${item.price}</span>
              <p className='text-gray-700 text-base'>{item.description}</p>
              {user!==null?
                (adding? 
                  <button button className='my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' disabled onClick={()=>handleClick(item)}>Adding...</button>:
                  <button button className='my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={()=>handleClick(item)}>Add to cart!</button>
                )
              :
              <button  button className='my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={(()=>navigate('/signin'))}>Sign in to purchase!</button>
              } 
            </div>
        </div>
        }
    </div>
    
  )
}

export default GlassDetail