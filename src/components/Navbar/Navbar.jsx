import React, { useState, useContext,useEffect } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { ReactTyped } from 'react-typed'
import {auth} from '../../config/Config'
import { useNavigate } from 'react-router-dom'
import './Navbar.css';
import { LiaShoppingCartSolid } from "react-icons/lia";
import { UserContext } from '../context/UserContextProvider'
const Navbar = () => {
  const { user }= useContext(UserContext)
  const [nav, setNav] =useState(true)
  const [isAdmin, setIsAdmin] =useState(false);


  
  const navigate=useNavigate();
  
  useEffect(()=>{
    const userFromStorage = JSON.parse(localStorage.getItem('user'))

    if(userFromStorage?.uid===process.env.REACT_APP_ADMIN_ID) setIsAdmin(true)

  },[])



const handleLogout =(e)=>{
  auth.signOut().then(()=>{
    setNav(true)
    window.localStorage.clear()
    setIsAdmin(false)
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
      strings={['Welcome to Synthesis Glass!',
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
            <li className='p-4'><a href="/cart"><LiaShoppingCartSolid /></a></li>
            <li className='p-4'><a href="/">Home</a></li>
            <li className='p-4'><a href="/glass">Glass</a></li>
            <li className='p-4'><a href="https://www.etsy.com/shop/SynthesisGlass" target="blank">Etsy</a></li>
            <li className='p-4'><a href="/about">About</a></li>
            {isAdmin&&<li className='p-4'><a href="/addproduct">Add Item</a></li>}
            {user===null?
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
            <li className='p-4 border-b'><a href="/cart">Cart</a></li>
            {isAdmin&&<li className='p-4 border-b'><a href="/cart">Add Item</a></li>}
            {user===null?
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
