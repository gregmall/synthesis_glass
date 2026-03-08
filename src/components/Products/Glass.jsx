import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Button } from "@material-tailwind/react"
import { db } from '../../config/Config';
import { Link } from 'react-router-dom';
import { Vortex } from 'react-loader-spinner';

const PAGE_SIZE = 20;

const FILTER_OPTIONS = [
  { value: '', label: 'ALL' },
  { value: 'chillum', label: 'CHILLUMS' },
  { value: 'pipe', label: 'PIPES' },
];

const VORTEX_COLORS = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'white'];
const VORTEX_WRAPPER_STYLE = {};

const Glass = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getItems = async () => {
      try {
        const products = await db.collection('Products').get();
        setItems(products.docs.map(snap => ({ ...snap.data(), ID: snap.id })));
      } catch (err) {
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };
    getItems();
  }, []);

  const filteredItems = useMemo(
    () => items.filter(item => !filtered || item?.Type === filtered),
    [items, filtered]
  );

  const totalPages = Math.ceil(filteredItems.length / PAGE_SIZE);

  const pagedItems = useMemo(
    () => filteredItems.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filteredItems, page]
  );

  const handleFilterChange = useCallback((value) => {
    setFiltered(value);
    setPage(1);
  }, []);

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          marginTop: '30px',
          marginBottom: '30px',
        }}
      >
        {FILTER_OPTIONS.map(option => (
          <Button
            key={option.value || 'all'}
            color={filtered === option.value ? 'white' : 'blue'}
            onClick={() => handleFilterChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          overflowX: 'auto',
        }}
      >
        {loading ? (
          <Vortex
            visible={true}
            height="80"
            width="80"
            ariaLabel="vortex-loading"
            wrapperStyle={VORTEX_WRAPPER_STYLE}
            wrapperClass="vortex-wrapper"
            colors={VORTEX_COLORS}
          />
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          pagedItems.map(item => (
            <Link to={`/item/${item.ID}`} key={item.ID}>
              <div className='max-w-sm rounded overflow-hidden shadow-lg bg-slate-50 mx-3 my-3 hover:bg-fuchsia-400 ease-in-out duration-100'>
                <img className='w-full p-4 rounded' src={item.ProductImage} alt='/' />
                <div className='px-6 py-4'>
                  <div className='font-bold text-xl mb-2'>{item.ProductName}</div>
                  <span className='text-xl mb-2'>${item.ProductPrice}</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
      {!loading && totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', margin: '30px 0' }}>
          <Button color="blue" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
            Prev
          </Button>
          <span style={{ color: 'white' }}>Page {page} of {totalPages}</span>
          <Button color="blue" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
            Next
          </Button>
        </div>
      )}
    </>
  );
};

export default Glass;
