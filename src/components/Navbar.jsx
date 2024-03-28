import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { ReactTyped } from 'react-typed'

const Navbar = () => {

  const [nav, setNav] =useState(true)

  const handleNav = () =>{
    setNav(!nav);
  }
  return (
    <>
    <div className='text-white flex justify-between item-center h-24 max-w-[1240px] mx-auto px-4'>
      <div >
        <h1 className='w-full text-3xl font-bold text-[#00df9a]'>Synthesis Glass</h1>
        <ReactTyped
      strings={[
        "American Made",
        "Highest Quality",
        "Since 1997",
      ]}
      typeSpeed={150}
      backSpeed={20}
      loop
    />
        </div>
        <ul className='hidden md:flex'>
            <li className='p-4'><a href="/">Home</a></li>
            <li className='p-4'><a href="/glass">Glass</a></li>
            <li className='p-4'><a href="https://www.etsy.com/shop/SynthesisGlass" target="blank">Buy</a></li>
            <li className='p-4'><a href="/about">About</a></li>
        </ul>
        <div onClick={handleNav} className='mt-4 block md:hidden'>
          {!nav? <AiOutlineClose size={20} />:<AiOutlineMenu size={20}/>}
          
        </div>
        <div className={!nav ? 'fixed left-0 top-0 w-[60%] ease-in-out duration-500': 'fixed left-[-100%]'}>
          <ul className='pt-24 uppercase '>
          <li className='p-4 border-b'><a href="/">Home</a></li>
            <li className='p-4 border-b'><a href="/glass">Glass</a></li>
            <li className='p-4 border-b'><a href="https://www.etsy.com/shop/SynthesisGlass" target="blank">Buy</a></li>
            <li className='p-4'><a href="/about">About</a></li>
          </ul>
        </div>
    </div>

    </>
  )
}

export default Navbar