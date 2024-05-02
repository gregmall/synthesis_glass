import React from 'react'
import { Typography } from "@material-tailwind/react"
import { ReactTyped } from 'react-typed'

const Home = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center', marginTop: '100px'}}>
       <figure className="relative h-96 w-4/6">
       <img 
        src="https://firebasestorage.googleapis.com/v0/b/synthesisglass-1d07e.appspot.com/o/splash.JPG?alt=media&token=195a92f5-26de-4de1-a903-dad7e54d8a98" 
        className='h-96 w-full rounded-3xl object-cover object-center shadow-xl shadow-blue-gray-900/50'
        alt="Splash JPG"/>
      <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
        <div>
          <Typography variant="h5" color="blue-gray">
          <ReactTyped
          strings={['Welcome to Synthesis Glass!',
          "Made in Portland, Oregon",
          "Highest Quality",
          ]}
          typeSpeed={150}
          backSpeed={70}
          loop
        />
          </Typography>
        </div>
        <Typography variant="h5" color="blue-gray">
          
        </Typography>
      </figcaption>
    </figure>
   
    </div>
  )
}

export default Home;