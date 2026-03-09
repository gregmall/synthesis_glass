import React, { useEffect, useState } from 'react'
import { db } from '../../config/Config';
import { collection, getDocs } from "firebase/firestore";

export default function Customers() {
  // const [customers, setCustomers] = useState([]);

  // useEffect(() => {
  //   const fetchCustomers = async () => {
  //     const snapshot = await db.collection('customers').get();
  //     const data = snapshot.docs.map(doc => ([doc.id]));
  //     const payments = await db.collection('customers', data, 'payments').get();
  //     const paymentsData = payments.docs.map(doc => doc.data());
      
  //     setCustomers(data);
  //     console.log(paymentsData);
  //   };

  //   fetchCustomers();
  // }, []);

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
  

    async function fetchPayments() {
      const customerId = "TrCn6sX8erNmc0HQ8sWuwF1mOfP2"
      try {
        setLoading(true);
        const paymentsRef = collection(db, "customers", customerId, "payments");
        const snapshot = await getDocs(paymentsRef);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPayments(data);
        console.log(data);
      } catch (err) {
        console.error("Error fetching payments:", err);
        setError(err);
      } finally {
        setLoading(false);
       
      }
    }

    fetchPayments();
  }, []);

  return (
    <div className='flex justify-center mt-10'>
      <div className='p-4 w-full max-w-lg bg-white rounded-md'>
        <h1 className='border-b-2 mt-4 text-4xl text-center'>Customers</h1>

        {/* {customers.map(customer => {
          const mail = 'mailto:' + customer.email;
          return (
            <React.Fragment key={customer.id}>
              <div>Name: {customer.name}</div>
              <div>Email: <a href={mail} className='text-blue-500 font-bold'>{customer.email}</a></div>
              <div className='border-b-4'>ID: {customer.id}</div>
            </React.Fragment>
          );
        })} */}
      </div>
    </div>
  )
}
