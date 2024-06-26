/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { Typography, Carousel } from "@material-tailwind/react"
import { ReactTyped } from 'react-typed'

const Home = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center', marginTop: '20px'}}>
       <div className="relative h-96 w-4/6">
       
      <div className="h-auto justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
        <div className='flex flex-col items-center'>
          <Typography variant="h2" color="blue-gray">
         Welcome to Synthesis Glass
          </Typography>
          <Carousel transition={{ type: "tween", duration: 2 }} autoplay="true"  loop="true" className="rounded-xl" >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/synthesisglass-1d07e.appspot.com/o/IMG_8735.JPG?alt=media&token=165bd96e-4259-43cf-a777-6492befa3914"
              alt="image 1"
              className="h-72 w-full object-cover size-auto"
            />
            <img
              src="https://firebasestorage.googleapis.com/v0/b/synthesisglass-1d07e.appspot.com/o/IMG_8738.JPG?alt=media&token=0301a954-e7c0-4b7b-86cf-37c6f9a2fde4"
              alt="image 2"
              className="h-72 w-full object-cover size-auto"
            />
           
             
             <img
              src="https://firebasestorage.googleapis.com/v0/b/synthesisglass-1d07e.appspot.com/o/IMG_8741.JPG?alt=media&token=0e2adf31-90f8-4041-8d14-dc9b59a62e8b"
              alt="image 3"
              className="h-72 w-full object-cover size-auto"
            />
            
          
        </Carousel>
        </div>
        <Typography variant="h5" color="blue-gray">
        <ReactTyped
          strings={[
          "Made in Portland, Oregon",
          "Highest Quality",
          ]}
          typeSpeed={70}
          backSpeed={70}
          loop
        />
        </Typography>
      </div>
    </div>
   
    </div>
  )
}

export default Home;