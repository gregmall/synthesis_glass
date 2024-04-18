import React from 'react'
import { Link } from 'react-router-dom'

function AdminPage() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center', marginTop: '100px'}}>
          <span className='text-white text-4xl py-2 my-2'>HI BOSS!</span>
          <Link to ="/addproduct" className='text-2xl text-teal-500 hover:text-lime-500'>Add item</Link>
        </div>
      )
}

export default AdminPage