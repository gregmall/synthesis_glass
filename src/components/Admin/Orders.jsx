import React, { useEffect, useState } from 'react'
import { db } from '../../config/Config';
import { useLocation } from 'react-router-dom';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { state } = useLocation();
console.log(customers);
  const users = state?.users;
  useEffect(() => {
    if (!users) {
      setLoading(false);
      return;
    }

    const fetchCustomers = async () => {
      try {
        const snapshot = await db.collection('customers').get();
        const userMap = new Map(users.map(u => [u.id, u]));
        const matched = snapshot.docs.reduce((acc, doc) => {
          const user = userMap.get(doc.id);
          if (user) {
            acc.push({ id: doc.id, ...doc.data(), name: user.name, address: user.shippingAddress, history: user.history?.at(-1) ?? null });
          }
          return acc;
        }, []);
        matched.sort((a, b) => {
          const dateA = a.history ? new Date(a.history.timestamp) : new Date(0);
          const dateB = b.history ? new Date(b.history.timestamp) : new Date(0);
          return dateB - dateA;
        });
        setCustomers(matched);
      } catch (err) {
        setError('Failed to load customers.');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [users]);
  const handleClick = async (order)=>{
    console.log(order);
  } 

  return (
    <div className='flex justify-center mt-10'>
      <div className='p-4 w-full max-w-lg bg-white rounded-md'>
        <h1 className='mt-4 text-4xl text-center'>Customers</h1>
        <h3 className='text-center text-gray-500 mb-6 border-b-2'>Open Orders</h3>  
       

        {loading ? (
          <p className='text-center mt-4'>Loading...</p>
        ) : error ? (
          <p className='text-center mt-4 text-red-500'>{error}</p>
        ) : !users ? (
          <p className='text-center mt-4'>No user data available.</p>
        ) : customers.length === 0 ? (
          <p className='text-center mt-4'>No customers found.</p>
        ) : (
          customers.map(customer => (
            <React.Fragment key={customer.id}>
              <div>Name: {customer.name}</div>
              <div>Email: <a href={`mailto:${customer.email}`} className='text-blue-500 font-bold'>{customer.email}</a></div>
              <div >Last Order: {customer.history ? new Date(customer.history.timestamp).toLocaleDateString() : 'No orders yet'}</div>
              {customer.history.items.map((item, idx) => (
                <div key={idx} className='flex flex-col'>
                  <div className='w-1/2'>{item.name}</div>
                  <div className='w-1/4'><img src={item.image[0]} alt={item.name} className='w-16 h-16 object-cover'/></div>
                </div>
              ))} 
              <div>Total: ${customer.history ? customer.history.total : '0'}</div>
              <div>Address: {customer.address.street}</div>
              <div>City: {customer.address.city}</div>
              <div>State: {customer.address.state}</div>
              <div>Zip: {customer.address.zip}</div> 
              <div className='border-b-2 mb-8 text-teal-500 flex items-center justify-between'>
                <a href={customer.stripeLink} rel='noopener noreferrer' target='_blank'>Link to Payment</a>
                <button className='ml-4 px-2 py-1 mb-2 bg-green-500 text-white rounded' onClick={() => handleClick(
                  {order:{name: customer.name,
                    date: customer.history ? new Date(customer.history.timestamp).toLocaleDateString() : 'No orders yet', 
                  email: customer.email,
                  items: customer.history.items,
                  total: customer.history.total,
                  address: customer.address,
                  stripeLink: customer.stripeLink
                  }}
                )}>Complete Order</button>  
              </div>
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
}
