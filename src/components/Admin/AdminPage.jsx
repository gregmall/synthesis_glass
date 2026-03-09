import React from 'react'
import { Link } from 'react-router-dom'


function AdminPage() {

  

  return (
    <div className='flex justify-center mt-10'>
      <div className='p-4 w-full max-w-lg bg-white rounded-md text-center'>
        <div className='text-black text-4xl py-2 mb-4 border-b-2'>Admin Dashboard</div>
        <div className=' mt-4'>
          <Link to="/addproduct" className='text-2xl text-purple-700 hover:text-lime-500 mx-2'>Add item</Link>
          <Link to="/formsubmissions" className='text-2xl text-purple-700 hover:text-lime-500 mx-2'>Form Submissions</Link>
          <Link to="/customers" className='text-2xl text-purple-700 hover:text-lime-500 mx-2'>Orders</Link>
        </div>
       </div>
    </div>
  );
}

export default AdminPage;
