import React, { useEffect, useState } from 'react'
import { db } from '../../config/Config';

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const snapshot = await db.collection('customers').get();
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      setCustomers(data);
    };

    fetchCustomers();
  }, []);

  return (
    <div className='flex justify-center mt-10'>
      <div className='p-4 w-full max-w-lg bg-white rounded-md'>
        <h1 className='border-b-2 mt-4 text-4xl text-center'>Customers</h1>

        {customers.map(customer => {
          const mail = 'mailto:' + customer.email;
          return (
            <React.Fragment key={customer.id}>
              <div>Name: {customer.name}</div>
              <div>Email: <a href={mail} className='text-blue-500 font-bold'>{customer.email}</a></div>
              <div className='border-b-4'>ID: {customer.id}</div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  )
}
