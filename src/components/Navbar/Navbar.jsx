import React, { useState, useEffect } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { ReactTyped } from 'react-typed'
import {auth, db} from '../../config/Config'
import { useNavigate } from 'react-router-dom'
import './Navbar.css';


const Navbar = () => {

  const [nav, setNav] =useState(true)
  const [user, setUser]=useState(GetCurrentUser());
  const [typedData, setTypedData]=useState('Welcome to Synthesis Glass!');
  
  const navigate=useNavigate();
  function GetCurrentUser(){
    let user = ''
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                db.collection('users').doc(user.uid).get().then(snapshot=>{
                  console.log(snapshot.data().uid)
                    setUser({
                      name: snapshot.data().name,
                      role: snapshot.data()?.userRole,
                      id: snapshot.data().id
                    });
                    setTypedData(`Welcome back, ${snapshot.data().name}`)
                    
                })
            }
            else{
                setUser(null);

            }
        })
    },[])
    return user;
}
console.log(user)

const handleLogout =(e)=>{
  auth.signOut().then(()=>{
   navigate('/signin')

  })
}
  const handleNav = () =>{
    setNav(!nav);
  }
  return (
    <>
    <div className='text-white flex justify-between item-center h-24  mx-auto px-4 sticky top-0  bg-gradient-to-r from-[#762a99] to-[#7c0747] bg-no-repeat'>
      <div className="header">
        <h1 className="logo">Synthesis Glass</h1>
        <ReactTyped
      strings={[`${typedData}`,
        "Made in Portland, Oregon",
        "Highest Quality",
        
      ]}
      typeSpeed={150}
      backSpeed={70}
      loop
    />
        </div>
        <ul className='hidden md:flex ' >
            {user?.role==='ADMIN'&& <li className='p-4'><a href="/addproduct">Add Product</a></li>}
            <li className='p-4'><a href="/">Home</a></li>
            <li className='p-4'><a href="/glass">Glass</a></li>
            <li className='p-4'><a href="https://www.etsy.com/shop/SynthesisGlass" target="blank">Etsy</a></li>
            <li className='p-4'><a href="/about">About</a></li>
            {user==null?
              <li className='p-4'><a href="/signin"><button className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Sign In</button></a></li>
            :
              <li className='p-4'><button className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'onClick={handleLogout}>Logout</button></li>
            }
        </ul>
        <div onClick={handleNav} className='mt-4 block md:hidden'>
          {!nav? <AiOutlineClose size={20} />:<AiOutlineMenu size={20}/>}
          
        </div>
        <div className={!nav ? 'fixed left-0 top-0 w-[60%] ease-in-out duration-500 bg-white mt-20 text-black': 'fixed left-[-100%]'}>
          <ul className='uppercase'>
            {user?.role==='ADMIN'&& <li className='p-4 border-b'><a href="/addproduct">Add Product</a></li>}
            <li className='p-4 border-b'><a href="/">Home</a></li>
            <li className='p-4 border-b'><a href="/glass">Glass</a></li>
            <li className='p-4 border-b'><a href="https://www.etsy.com/shop/SynthesisGlass" target="blank">Etsy</a></li>
            <li className='p-4 border-b'><a href="/about">About</a></li>
            {user==null?
              <li className='p-4'><a href="/signin"><button className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Sign In</button></a></li>
            :
              <li className='p-4'><button onClick={handleLogout}>LOGOUT</button></li>
            }
          </ul>
        </div>
    </div>

    </>
  )
}

export default Navbar
