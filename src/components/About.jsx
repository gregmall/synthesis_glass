import React from 'react'

const About = ({user}) => {
  console.log(user.uid)
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center', marginTop: '100px'}}>
      <span className='text-white text-4xl'>hello {user.uid}</span>
    </div>
  )
}

export default About