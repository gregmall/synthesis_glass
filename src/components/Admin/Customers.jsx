import React, { useEffect, useState } from 'react'
import { db } from '../../config/Config';
import { useLocation } from 'react-router-dom';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { state } = useLocation();
console.log(customers)
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
        setCustomers(matched);
      } catch (err) {
        setError('Failed to load customers.');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [users]);

  return (
    <div className='flex justify-center mt-10'>
      <div className='p-4 w-full max-w-lg bg-white rounded-md'>
        <h1 className='border-b-2 mt-4 text-4xl text-center'>Customers</h1>

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
              <div className='border-b-8'>Last Order: {customer.history ? new Date(customer.history.timestamp).toLocaleDateString() : 'No orders yet'}</div>
              {customer.history.items.map((item, idx) => (
                <div key={idx} className='flex flex-col my-3'>
                  <div className='w-1/2'>{item.name}</div>
                  <div className='w-1/4'><img src={item.image[0]} alt={item.name} className='w-16 h-16 object-cover'/></div>
                </div>
              ))} 
              <div>Total: ${customer.history ? customer.history.total : '0'}</div>
              <div className='border-t-8'>Address: {customer.address.street}</div>
              <div>City: {customer.address.city}</div>
              <div>State: {customer.address.state}</div>
              <div>Zip: {customer.address.zip}</div> 
              <div className='border-b-2 mb-4 text-teal-500'>
                <a href={customer.stripeLink} rel='noopener noreferrer' target='_blank'>Link to Payment</a>
              </div>
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
}
