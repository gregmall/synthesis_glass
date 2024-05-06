import React from 'react'
import { Typography } from "@material-tailwind/react"
import { ReactTyped } from 'react-typed'

const Home = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center', marginTop: '100px'}}>
       <div className="relative h-96 w-4/6">
       
      <div className="h-96 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
        <div className='flex flex-col items-center'>
          <Typography variant="h2" color="blue-gray">
          <ReactTyped
          strings={['Welcome to Synthesis Glass!',
          "Made in Portland, Oregon",
          "Highest Quality",
          ]}
          typeSpeed={70}
          backSpeed={70}
          loop
        />
          </Typography>
        </div>
        <Typography variant="h5" color="blue-gray">
          
        </Typography>
      </div>
    </div>
   
    </div>
  )
}

export default Home;