import React, {useState} from 'react'
import { db } from '../config/Config';
import { Notify } from 'notiflix'
import {
    Card,
    Input,
    Button,
    Typography,
    Textarea,
    Spinner
  } from "@material-tailwind/react";

 const QuestionForm = () => {
    
    const [name, setName] = useState();
    const [email, setEmail]= useState();
    const [content, setContent] = useState();
    const [loading, setLoading] = useState(false)

    const getQuestion = ()=>{ 
        const num =Math.floor(Math.random() * 5)
        const array = ['Do you make bubblers?', 'Can I customize colors?', 'Do you ship to Canada?', 'Do you make 19mm bowls?', 'Do you do repair work?']
        return array[num]
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);
        const today = Date.now();
        const time =  Date.now(today).toLocaleDateString
        console.log(time)
       try{
            await db.collection('formSubmission').add({
                name: name, 
                content: content, 
                email: email,
                date:  time
            })
            .then( setLoading(false))
        }
        catch (error){
            console.log(error.message)
        }
 
    }

   
  return (
    
    <div className='flex  justify-center mt-4'>
        {loading?
        <Spinner />:
    <Card color="white" shadow={false} className='min-w-fit p-11'>
    
      <Typography variant="h4" color="blue-gray">
        Have a Question?
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter any question or comment below. <br/> Please include your email so that we can respond ASAP
      </Typography>
 
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Name
          </Typography>
          <Input
            size="lg"
            placeholder="Ronnie James Dio"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            onChange={(e)=> setName(e.target.value)} value={name}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            size="lg"
            placeholder="LemmieIsGod@rock.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            onChange={(e)=> setEmail(e.target.value)} value={email}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Question/Comment/Inquiry
          </Typography>
          <Textarea
         
            size="lg"
            placeholder={getQuestion()}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            onChange={(e)=> setContent(e.target.value)} value={content}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
       
 
        <Button className="mt-6" fullWidth type='submit'>
          Submit
        </Button>
        </div>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Prefer to email?{" "}
          <a href="mailto:synthesisglass@gmail.com" className='text-blue-500 font-bold'>Click Here</a>
        </Typography>
      </form>
    </Card>
 }
    </div>
  )
}
export default QuestionForm;
