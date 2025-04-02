import React, { useState, useEffect } from 'react'
import { Button } from "@material-tailwind/react"

import { db } from '../../config/Config';
import { Link } from 'react-router-dom';
import { Vortex } from 'react-loader-spinner';

const Glass = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState("");

  useEffect(() => {
    getItems();
    // eslint-disable-next-line no-use-before-define
  }, []);

  const getItems = async () => {
    const array = [];
    const products = await db.collection('Products').get();

    for (const snap of products.docs) {
      const data = snap.data();
      data.ID = snap.id;
      array.push({ ...data });
    }

    setItems(array); // Moved outside the loop
    setLoading(false);
  };

  const filteredItems = items?.filter(
    (item) => item?.Type?.indexOf(filtered) !== -1
  );

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: "space-evenly",
          marginTop: '30px',
          marginBottom: '30px',
        }}
      >
        <Button color={filtered === "" ? "white" : "blue"} onClick={() => setFiltered("")}>
          ALL
        </Button>
        <Button color={filtered === "chillum" ? "white" : "blue"} onClick={() => setFiltered("chillum")}>
          CHILLUMS
        </Button>
        <Button color={filtered === "pipe" ? "white" : "blue"} onClick={() => setFiltered("pipe")}>
          PIPES
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          overflowX: "auto",
        }}
      >
        {loading ? (
          <Vortex
            visible={true}
            height="80"
            width="80"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'white']}
          />
        ) : (
          filteredItems.map((item, key) => {
            return (
              <Link to={`/item/${item.ID}`} key={key}>
                <div className='max-w-sm rounded overflow-hidden shadow-lg bg-slate-50 mx-3 my-3 hover:bg-fuchsia-400 ease-in-out duration-100'>
                  <img className='w-full p-4 rounded' src={item.ProductImage} alt='/' />
                  <div className='px-6 py-4'>
                    <div className='font-bold text-xl mb-2'>{item.ProductName}</div>
                    <span className='text-xl mb-2'>${item.ProductPrice}</span>
                    <p className='text-gray-700 text-base'>{item.ProductDescription}</p>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </>
  );
};

export default Glass;
