import React, { useState } from 'react'
import { auth } from '../config/Config';
import { useNavigate, Link } from 'react-router-dom'
import Notiflix from 'notiflix'

const SignIn = () => {

    const navigate = useNavigate();
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    const handleLogin=(e)=>{
        e.preventDefault();
        // console.log(email, password);
        auth.signInWithEmailAndPassword(email,password).then(()=>{
            
            setEmail('');
            setPassword('');
           
            setTimeout(()=>{
                Notiflix.Notify.success("Success! Navigating to home page")
               
                navigate('/');
            },3000)
        }).catch(error=>console.log(error.message));
    }


  return (
    <div style={{display:'flex',  justifyContent: 'center'}}>
        <div className='p-4 w-full max-w-xs bg-white rounded-md'>
            <h2>Sign In</h2>
        
            <form className=' bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleLogin}>
                
                <div>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" onChange={(e)=> setEmail(e.target.value)} value={email}/>
                </div>
                <div>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" onChange={(e)=> setPassword(e.target.value)} value={password}/>
                </div>
                <div style = {{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                     <button className='my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type="submit">Sign In</button>
                     <span className='text-xs' >Don't have an account? Sign up <Link to ="/signup" className='text-[#00df9a] font-extrabold'>here</Link></span>
                </div>

            </form>
        </div>
    </div>
  )
}

export default SignIn