import React, { useState } from 'react'
import { db, auth } from '../config/Config';
import { useNavigate,Link } from 'react-router-dom'
import Notiflix from 'notiflix'

 const SignUp = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const Signup =(e)=>{
        e.preventDefault();
        console.log(name, email, password)
        auth.createUserWithEmailAndPassword(email, password).then((cred)=>{
            db.collection('SignedUpUserData').doc(cred.user.uid).set({
                Name: name,
                Email: email,
                Password: password
            }).then(()=>{
                setName('');
                setEmail('');
                setPassword('');
            }).catch(err=>console.log(err.message))
        }).finally(()=>{
            Notiflix.Notify.success(
                'New Product added! Click to go to Sign in',
                function cb() {
                    navigate('/signin');
                },
                {
                  timeout: 4000,
                },
              );
        }).catch(err=>console.log(err.message))
    }


  return (
    <div style={{display:'flex',  justifyContent: 'center'}}>
        <div className='p-4 w-full max-w-xs bg-white rounded-md'>
            <h2>Sign Up</h2>
        
            <form className=' bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={Signup}>
                <div>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Name</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type= "text" onChange={(e)=> setName(e.target.value)} value={name}/>
                </div>
                <div>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" onChange={(e)=> setEmail(e.target.value)} value={email}/>
                </div>
                <div>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" onChange={(e)=> setPassword(e.target.value)} value={password}/>
                </div>
                <div style = {{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                     <button className='my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type="submit">Register!</button>
                     <span className='text-xs' >Already have an account? Sign in <Link to ="/signin" className='text-[#00df9a] font-extrabold'>here</Link></span>
                </div>
            </form>
        </div>
    </div>
  )
}
export default SignUp;