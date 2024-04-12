import React, {useState} from 'react'
import { storage, db } from '../config/Config'
import { useNavigate } from 'react-router-dom'
import Notiflix from 'notiflix'

 const AddProduct = () => {
    
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
   


    const navigate = useNavigate();

    const addProduct =(e)=>{
        e.preventDefault();
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
       
        uploadTask.on('state_changed', snapshot =>{
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
            console.log(progress);
        }, err=>{
            console.log(err.message)
        }
        , ()=>{
            storage.ref('images').child(image.name).getDownloadURL().then(url=>{
                db.collection('Products').add({
                    ProductImage: url,
                    ProductPrice: Number(price),
                    ProductName: name,
                    ProductDescription: description


                }).then(()=>{
                    setName('');
                    setImage(null);
                    setPrice(0);
                    setDescription('');
                    document.getElementById('file').value ='';
                    
                    
                }).finally(()=>{
                    Notiflix.Notify.success(
                        'New Product added! ',
                        
                           
                      
                        {
                          timeout: 4000,
                        },
                      );
                      navigate('/');
                    
                }).catch(err =>console.log(err.message))
            })
        }
        )

    }

    const productImgHandler=(e)=>{
        let selectedFile = e.target.files[0];
        setImage(selectedFile);
        
    }
  return (
    
    <div style={{display:'flex',  justifyContent: 'center'}}>
    
        <div className='p-4 w-full max-w-xs bg-white rounded-md'>
            <h2>Add Product</h2>
        
            <form onSubmit={addProduct} className=' bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <div className="mb-4">
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='product-name'>Name</label>
                
                <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e)=> setName(e.target.value)} value={name}/>
                </div>
                <div className="mb-4">
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='product-description'>Description</label>
                
                <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e)=> setDescription(e.target.value)} value={description}/>
                </div>
                <div class="mb-6">
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='product-price'>Price</label>
                <input  className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'type="number" onChange={(e)=> setPrice(e.target.value)} value={price}/>
                </div>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='product-image'>Image</label>
                <input type="file" id="productImage" accept =".png, .jpg, .jpeg" multiple="multiple" onChange={productImgHandler}/>
                <br/>
                <button className='my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type="submit">Add</button>
            </form>
        
        </div>
        {/* : <Navigate to="/404" />} */}
    </div>
  )
}

export default AddProduct;