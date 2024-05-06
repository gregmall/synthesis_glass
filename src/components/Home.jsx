/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { Typography, Carousel } from "@material-tailwind/react"
import { ReactTyped } from 'react-typed'

const Home = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center', marginTop: '100px'}}>
       <div className="relative h-96 w-4/6">
       
      <div className="h-96 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
        <div className='flex flex-col items-center'>
          <Typography variant="h2" color="blue-gray">
         Welcome to Synthesis Glass
          </Typography>
          <Carousel transition={{ type: "tween", duration: 1 }} autoplay="true"  loop="true" className="rounded-xl">
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
              src="https://firebasestorage.googleapis.com/v0/b/synthesisglass-1d07e.appspot.com/o/IMG_8737.JPG?alt=media&token=1421c626-40ca-4fd6-a08a-7cd59e72d9fe"
              alt="image 3"
              className="h-72 w-full object-cover size-auto"
            />
             <img
              src="https://firebasestorage.googleapis.com/v0/b/synthesisglass-1d07e.appspot.com/o/IMG_8740.JPG?alt=media&token=a992dfcd-5bb2-43ba-89c9-b3be1e9e1e86"
              alt="image 3"
              className="h-72 w-full object-cover size-auto"
            />
             <img
              src="https://firebasestorage.googleapis.com/v0/b/synthesisglass-1d07e.appspot.com/o/IMG_8741.JPG?alt=media&token=0e2adf31-90f8-4041-8d14-dc9b59a62e8b"
              alt="image 3"
              className="h-72 w-full object-cover size-auto"
            />
             <img
              src="https://firebasestorage.googleapis.com/v0/b/synthesisglass-1d07e.appspot.com/o/IMG_8742.JPG?alt=media&token=47c44055-601d-470b-80b3-3c7349b8b6b3"
              alt="image 3"
              className="h-72 w-full object-cover size-auto"
            />
             <img
              src="https://firebasestorage.googleapis.com/v0/b/synthesisglass-1d07e.appspot.com/o/IMG_8746.JPG?alt=media&token=1309b036-488f-4053-ae04-030024b18709"
              alt="image 3"
              className="h-72 w-full object-cover size-auto"
            />
             <img
              src="https://firebasestorage.googleapis.com/v0/b/synthesisglass-1d07e.appspot.com/o/IMG_8750.JPG?alt=media&token=973067ba-9575-4c0b-a19b-f3bf382e1cce"
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