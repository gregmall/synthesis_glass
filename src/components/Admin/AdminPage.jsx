import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../config/Config'

function AdminPage() {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    let array = [];

    const feedback = await db.collection('formSubmission').get();

    for (const snap of feedback.docs) {
      const data = snap.data();
      data.ID = snap.id;
      array.push({ ...data });
    }

    // Update state after the loop completes
    setQuestions(array);
  };

  console.log(questions);

  return (
    <div className='flex justify-center mt-10'>
      <div className='p-4 w-full max-w-lg bg-white rounded-md'>
        <div className='text-black text-4xl py-2 my-2'>HI BOSS!</div>
        <Link to="/addproduct" className='text-2xl text-purple-700 hover:text-lime-500'>Add item</Link>
        <h1 className='border-b-2 mt-4'>Form Submissions</h1>
        
        {questions.map(item => {
          let mail = "mailto:" + item.email;
          return (
            <React.Fragment key={item.ID}>
              <div>Name: {item.name}</div>
              <div>Email: <a href={mail} className='text-blue-500 font-bold'>{item.email}</a></div>
              <div>Date: {new Date(item?.date).toLocaleDateString()}</div>
              <div className='border-b-4'>Message: {item.content}</div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default AdminPage;
