import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostProdut = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const [productData, setProductData] = useState({
        ProductCode: '',
        ProductName: '',
        ProductImage: null,  
        HSNCode: '',
        TotalStock: 0,
        IsFavourite: false,
        Active: true,
    });
    const userID = parseInt(localStorage.getItem('user_id'), 1000); // Convert to integer
    const yuim = localStorage.getItem('user_id')
    console.log("userID",yuim)
    console.log(typeof(userID))
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userID = parseInt(localStorage.getItem('user_id'), 10); // Convert to integer
        console.log(typeof(userID)); // Ensure userID is an integer
    
        try {
            const formData = new FormData();
            formData.append('ProductID', productData.ProductID);
            formData.append('ProductCode', productData.ProductCode);
            formData.append('ProductName', productData.ProductName);
            formData.append('ProductImage', productData.ProductImage);
            formData.append('HSNCode', productData.HSNCode);
            formData.append('TotalStock', 0);
            formData.append('IsFavourite', productData.IsFavourite);
            formData.append('Active', productData.Active);
            formData.append('CreatedUser', userID); // Use userID variable
    
            // POST request to create product
            const response = await axios.post('http://127.0.0.1:8000/products/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            console.log('Product created successfully!');
            console.log('Created ID:', response.data.createdid); 
            navigate(`/admin/add-variant/${response.data.createdid}`);

        } catch (error) {
            console.error('Error creating product:', error);
        }
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        setProductData({
            ...productData,
            ProductImage: e.target.files[0]
        });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ProductID">Product IDs</label>
            <input 
                type="text" 
                name="ProductID" 
                value={productData.ProductID} 
                onChange={handleChange} 
                placeholder="Product ID" 
                required 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ProductCode">Product Code</label>
            <input 
                type="text" 
                name="ProductCode" 
                value={productData.ProductCode} 
                onChange={handleChange} 
                placeholder="Product Code" 
                required 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ProductName">Product Name</label>
            <input 
                type="text" 
                name="ProductName" 
                value={productData.ProductName} 
                onChange={handleChange} 
                placeholder="Product Name" 
                required 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ProductImage">Product Image</label>
            <input 
                type="file" 
                name="ProductImage" 
                onChange={handleImageChange} 
                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="HSNCode">HSN Code</label>
            <input 
                type="text" 
                name="HSNCode" 
                value={productData.HSNCode} 
                onChange={handleChange} 
                placeholder="HSN Code" 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        {/* <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="TotalStock">Total Stock</label>
            <input 
                type="number" 
                name="TotalStock" 
                value={productData.TotalStock} 
                onChange={handleChange} 
                placeholder="Total Stock" 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div> */}
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="IsFavourite">Is Favourite</label>
            <input 
                type="checkbox" 
                name="IsFavourite" 
                checked={productData.IsFavourite} 
                onChange={(e) => setProductData({ ...productData, IsFavourite: e.target.checked })} 
                className="mr-2 leading-tight"
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Active">Active</label>
            <input 
                type="checkbox" 
                name="Active" 
                checked={productData.Active} 
                onChange={(e) => setProductData({ ...productData, Active: e.target.checked })} 
                className="mr-2 leading-tight"
            />
        </div>
        <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
            Create Product
        </button>
    </form>
    );
};

export default PostProdut;
