import React, { useContext } from 'react'
import { UserContext } from '../config/UserContextProvider';
const About = () => {
  const {user}= useContext(UserContext);
  console.log(user)
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center', marginTop: '100px'}}>
      <span className='text-white text-4xl'>hello {user?.id}</span>
    </div>
  )
}

export default About