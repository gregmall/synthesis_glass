import React, {useState} from 'react'
import { storage, db } from '../config/Config'
 const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState(null);
    const [error, setError] =useState('');




    const addProduct =(e)=>{
        e.preventDefault();
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
       
        uploadTask.on('state_changed', snapshot =>{
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
            console.log(progress);
        }, err=>{
            setError(err.message)
        }
        , ()=>{
            storage.ref('images').child(image.name).getDownloadURL().then(url=>{
                db.collection('Products').add({
                    ProductImage: url,
                    ProductPrice: Number(price),
                    ProductName: name


                }).then(()=>{
                    setName('');
                    setImage(null);
                    setPrice(0);
                    document.getElementById('file').value ='';
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
    <div className='text-black'>
        <h2>Add Product</h2>
    
        <form onSubmit={addProduct}>
            <label htmlFor='product-name'>Name</label>
            <br />
            <input type="text" onChange={(e)=> setName(e.target.value)} value={name}/>
            <label htmlFor='product-price'>Price</label>
            <input type="number" onChange={(e)=> setPrice(e.target.value)} value={price}/>
            <label htmlFor='product-image'>Image</label>
            <input type="file" id="productImage" accept =".png, .jpg, .jpeg" onChange={productImgHandler}/>
            <br/>
            <button type="submit">Add</button>
        </form>
     
    </div>
  )
}

export default AddProduct;