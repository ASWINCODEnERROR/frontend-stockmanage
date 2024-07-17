import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProductList() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/productslist/');
            setProducts(response.data);
            console.log(response.data);

        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleProductClick = (productId) => {
        navigate(`/admin/products/${productId}`);
    };

    const handleAddProduct = () => {
        navigate('/admin/addproduct');
    };

    const handleLogout = () => {
        // Clear local storage
        localStorage.clear();
        // Navigate to logout endpoint or login page
        navigate('/'); // Replace with your logout endpoint or login page route
    };

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Products List</h2>
                <div>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mr-4"
                        onClick={handleAddProduct}
                    >
                        Add Product
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                    <div
                        key={product.id}
                        className="border rounded-lg shadow-lg p-4 cursor-pointer"
                        onClick={() => handleProductClick(product.ProductID)}
                    >
                        <img 
                            src={product.ProductImage} 
                            alt={product.ProductName} 
                            className="w-full h-48 object-cover mb-4 rounded"
                        />
                       
                        <h3 className="text-xl font-semibold mb-2">{product.ProductName}</h3>
                        <p className="text-gray-700 mb-1">Price: ${product.ProductCode}</p>
                        <p className="text-gray-700">Stock: {product.TotalStock}</p>
                        {/* <a href={product?.ProductImage} target='__blank'> {product?.ProductImage}</a> */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
