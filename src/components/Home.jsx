/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { Typography, Carousel } from "@material-tailwind/react"


const Home = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center', marginTop: '20px'}}>
       <div className="relative h-96 w-full md:w-4/6" >
       
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
        <Typography variant="h5" color="blue-gray">
          Makers of High Quality Glass
    
        </Typography>
        </div>
        <Typography variant="h6" color="blue-gray">
          <p>Since 1997, Synthesis Glass has created the highest quality, American made glass art using only the finest materials. We pride ourselves in creating functional art that is not only beautiful but highly functional and extremely durable. Synthesis Glass has a reputation for making top dollar pieces at affordable prices.  We are always open to custom work and/or customization of listed items.  Question? Inquiries? <a href='/question-form' className='text-blue-800 hover:text-purple-800'>CLICK HERE</a></p>

        </Typography>
        
      </div>
    </div>
    
   
    </div>
  )
}

export default Home;
